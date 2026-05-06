import { Component, OnInit, inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { CourseCardComponent } from './components/course-card/course-card';
import { SafePipe } from './pipes/safe.pipe';
import { firstValueFrom } from 'rxjs';
import { jsPDF } from 'jspdf';
import * as QRCode from 'qrcode';

import { ProgressBarComponent } from './components/progress-bar/progress-bar';
import { environment } from '../environments/environment';

declare var google: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, HeroComponent, CourseCardComponent, SafePipe, ProgressBarComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private zone = inject(NgZone);
  private apiUrl = environment.apiUrl;

  googleClientId = '186248269087-dghsoiv0prplvaf1gnbchlvbq10qnpsl.apps.googleusercontent.com';

  isTogglingProgress = false;

  view: 'landing' | 'admin' | 'audit' | 'login' | 'register' | 'recovery' | 'reset-password' | 'course' | 'profile' | 'about' | 'contact' | 'terms' = 'landing';

  // Enrollment & Course View
  enrolledCourseIds: string[] = [];
  activeCourse: any = null;
  activeLevelIndex = 0;
  activeLessonIndex = 0;
  activeView: 'lesson' | 'exam' = 'lesson';
  completedLessonIds: string[] = [];

  // Password visibility toggles
  showLoginPassword = false;
  showRegPassword = false;
  showRegConfirmPassword = false;
  showResetPassword = false;

  // Recovery & Reset
  recoveryEmail = '';
  recoverySent = false;
  isRecovering = false;
  resetToken = '';
  newPassword = '';
  confirmNewPassword = '';
  isResetting = false;
  resetError = '';
  currentUser: { 
    id: string, 
    email: string, 
    name: string, 
    fullName?: string,
    avatarUrl?: string,
    role: 'USER' | 'ADMIN' 
  } | null = null;

  profileData = {
    fullName: '',
    avatarUrl: ''
  };

  // Categorías
  categories: string[] = ['Todas'];
  selectedCategory: string = 'Todas';

  // Anuncios
  globalAnnouncement: string | null = null;
  announcementType: 'global' | 'specific' = 'global';
  announcementText: string = '';
  selectedCourseIdForAnnouncement: string = '';
  announcementExpiresAt: string = '';
  allAnnouncements: any[] = [];

  // Admin Navigation
  adminTab: 'courses' | 'announcements' | 'users' | 'audit' = 'courses';
  adminStats: any = null;
  allUsers: any[] = [];
  contactForm = { name: '', email: '', subject: '', message: '' };
  isSendingMessage = false;
  messageSent = false;
  messageError = '';

  // Modal de Edición de Cursos
  editingCourse: any = null;
  showEditModal = false;
  editTab: 'info' | 'levels' | 'exam' = 'info';

  // Nivel/Lección en edición
  editingLevelIndex: number | null = null;
  editingLessonIndex: number | null = null;

  // Exam state
  currentExam: any = null;
  examAnswers: any = {};
  examScore: number | null = null;
  showExamResult = false;

  createCourseBase(id: string, title: string, desc: string, color: string, cat: string, thumbnail: string | null = null, announcement: string | null = null, isActive = true) {
    return { id, title, description: desc, progress: 0, themeColor: color, category: cat, thumbnail, announcement, isActive, levels: [] as any[] };
  }

  featuredCourses: any[] = [];

  auditLogs = [
    {
      user: { email: 'admin@edukt.com' },
      action: 'LOGIN',
      status: 'EXITOSO',
      timestamp: new Date('2026-05-03T10:30:00'),
      ip: '192.168.1.10',
      device: 'MacBook Pro - Chrome'
    },
    {
      user: { email: 'admin@edukt.com' },
      action: 'MODIFICAR_CURSO',
      status: 'EXITOSO',
      timestamp: new Date('2026-05-03T11:15:00'),
      ip: '192.168.1.10',
      device: 'MacBook Pro - Chrome'
    },
    {
      user: { email: 'usuario@correo.com' },
      action: 'LOGIN',
      status: 'FALLIDO',
      timestamp: new Date('2026-05-03T11:20:00'),
      ip: '185.20.14.5',
      device: 'iPhone 13 - Safari'
    },
    {
      user: { email: 'admin@edukt.com' },
      action: 'ELIMINAR_USUARIO',
      status: 'EXITOSO',
      timestamp: new Date('2026-05-03T12:00:00'),
      ip: '192.168.1.10',
      device: 'MacBook Pro - Chrome'
    }
  ];

  async ngOnInit() {
    // Check for reset_token in URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('reset_token');
    if (token) {
      this.resetToken = token;
      this.setView('reset-password');
      // Clean URL without reloading
      window.history.replaceState({}, document.title, '/');
    }

    await this.loadCourses();
    await this.loadActiveAnnouncements();
    if (this.currentUser) {
      await this.loadUserProgress();
      if (this.currentUser.role === 'ADMIN') {
        await this.loadAllAnnouncements();
      }
    }
    this.cdr.detectChanges();
    this.initGoogleLogin();
  }

  initGoogleLogin() {
    if (typeof google === 'undefined') {
      setTimeout(() => this.initGoogleLogin(), 500);
      return;
    }

    google.accounts.id.initialize({
      client_id: this.googleClientId,
      callback: (response: any) => this.handleGoogleLogin(response)
    });
  }

  async handleGoogleLogin(response: any) {
    try {
      const data = await firstValueFrom(this.http.post<any>(`${this.apiUrl}/auth/google`, {
        token: response.credential
      }));
      this.currentUser = data.user;
      await this.loadUserProgress();
      this.setView('landing');
    } catch (error) {
      console.error('Error in Google Login:', error);
      alert('Error al iniciar sesión con Google.');
    } finally {
      this.cdr.detectChanges();
    }
  }

  renderGoogleButton() {
    const btn = document.getElementById('googleBtn');
    if (btn && typeof google !== 'undefined') {
      google.accounts.id.renderButton(btn, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'pill'
      });
    } else if (btn) {
      setTimeout(() => this.renderGoogleButton(), 500);
    }
  }

  async loadActiveAnnouncements() {
    try {
      const announcements = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/announcements`));
      // Prioritize global announcements
      const global = announcements.find(a => a.type === 'global');
      if (global) {
        this.globalAnnouncement = global.text;
      }
      
      // Assign course announcements
      this.featuredCourses.forEach(course => {
        const announcement = announcements.find(a => a.type === 'specific' && a.courseId === course.id);
        if (announcement) {
          course.announcement = announcement.text;
        } else {
          course.announcement = null;
        }
      });
    } catch (error) {
      console.error('Error loading active announcements:', error);
    } finally {
      this.cdr.detectChanges();
    }
  }

  async loadAllAnnouncements() {
    try {
      this.allAnnouncements = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/announcements/all`));
    } catch (error) {
      console.error('Error loading all announcements:', error);
    } finally {
      this.cdr.detectChanges();
    }
  }

  async loadUserProgress() {
    if (!this.currentUser) return;
    try {
      this.completedLessonIds = await firstValueFrom(this.http.get<string[]>(`${this.apiUrl}/users/${this.currentUser.id}/progress`));
      
      // Load enrollments to update course progress on cards
      const enrollments: any[] = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/users/${this.currentUser.id}/enrollments`));
      this.enrolledCourseIds = enrollments.map(e => e.courseId);

      // Load exam results
      this.examResults = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/users/${this.currentUser.id}/exam-results`));
      
      // Update featuredCourses with progress from enrollments
      this.featuredCourses.forEach(course => {
        const enrollment = enrollments.find(e => e.courseId === course.id);
        if (enrollment) {
          course.progress = enrollment.progress;
        }
      });
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      this.cdr.detectChanges();
    }
  }

  async loadCourses() {
    try {
      this.featuredCourses = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/courses`));
      // Extraer categorías únicas
      const cats = new Set(this.featuredCourses.map(c => c.category || 'General'));
      this.categories = ['Todas', ...Array.from(cats)];
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      this.cdr.detectChanges();
    }
  }

  async loadAuditLogs() {
    try {
      this.auditLogs = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/audit-logs`));
      this.searchLogs();
    } catch (error) {
      console.error('Error loading logs:', error);
    } finally {
      this.cdr.detectChanges();
    }
  }

  filteredLogs = [...this.auditLogs];
  searchTerm = '';
  filterAction = '';

  // Auth State
  loginData = { email: '', password: '' };
  loginError = '';
  isLoggingIn = false;

  // Register State
  registerData = { name: '', email: '', password: '', confirmPassword: '', selectedCourseId: '', isAdmin: false };
  registerError = '';
  passwordStrength = 0; // 0=none, 1=weak, 2=medium, 3=strong
  isRegistering = false;

  setView(newView: 'landing' | 'admin' | 'audit' | 'login' | 'register' | 'recovery' | 'course' | 'profile' | 'about' | 'contact' | 'terms') {
    this.view = newView;
    if (newView === 'audit' || (newView === 'admin' && this.adminTab === 'audit')) {
      this.loadAuditLogs();
    }
    if (newView === 'admin') {
      this.loadAdminStats();
      if (this.adminTab === 'users') this.loadAllUsers();
      if (this.adminTab === 'audit') this.loadAuditLogs();
      if (this.adminTab === 'announcements') this.loadAllAnnouncements();
      if (this.adminTab === 'courses') this.loadAdminStats();
    }

    if (newView === 'login') {
      setTimeout(() => this.renderGoogleButton(), 0);
    }

    if (newView === 'profile') {
      this.syncProfileData();
    }
    this.showLoginPassword = false;
    this.showRegPassword = false;
    this.showRegConfirmPassword = false;
    this.cdr.detectChanges();
    if (newView === 'login') {
      this.loginData = { email: '', password: '' };
      this.loginError = '';
    } else if (newView === 'register') {
      this.registerData = { name: '', email: '', password: '', confirmPassword: '', selectedCourseId: '', isAdmin: false };
      this.registerError = '';
      this.passwordStrength = 0;
    } else if (newView === 'recovery') {
      this.recoveryEmail = '';
      this.recoverySent = false;
    }
  }

  logout() {
    this.currentUser = null;
    this.setView('landing');
  }

  async sendRecoveryEmail() {
    if (!this.recoveryEmail) return;
    this.isRecovering = true;
    this.cdr.detectChanges();

    try {
      await firstValueFrom(this.http.post(`${this.apiUrl}/recover`, { email: this.recoveryEmail }));
      this.recoverySent = true;
      
      this.auditLogs.unshift({
        user: { email: this.recoveryEmail }, action: 'RECUPERAR_CONTRASEÑA', status: 'EXITOSO',
        timestamp: new Date(), ip: '127.0.0.1', device: 'Web Browser'
      });
      this.searchLogs();
    } catch (error) {
      console.error('Error enviando recuperación:', error);
      alert('Error al procesar la solicitud.');
    } finally {
      this.isRecovering = false;
      this.cdr.detectChanges();
    }
  }

  async submitResetPassword() {
    if (this.isResetting) return;
    this.resetError = '';

    if (!this.newPassword || !this.confirmNewPassword) {
      this.resetError = 'Por favor, completa todos los campos.';
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      this.resetError = 'Las contraseñas no coinciden.';
      return;
    }

    if (this.newPassword.length < 6) {
      this.resetError = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    this.isResetting = true;
    this.cdr.detectChanges();

    try {
      const response: any = await firstValueFrom(this.http.post(`${this.apiUrl}/reset-password`, {
        token: this.resetToken,
        newPassword: this.newPassword
      }));
      
      alert(response.message);
      this.setView('login');
      this.resetToken = '';
      this.newPassword = '';
      this.confirmNewPassword = '';
    } catch (error: any) {
      this.resetError = error.error?.error || 'Error al restablecer la contraseña.';
    } finally {
      this.isResetting = false;
      this.cdr.detectChanges();
    }
  }

  isEnrolled(courseId: string): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  enterCourse(courseId: string) {
    const course = this.featuredCourses.find(c => c.id === courseId);
    if (!course || !course.isActive) return;
    this.activeCourse = course;
    this.activeLevelIndex = 0;
    this.activeLessonIndex = 0;
    this.setView('course');
  }

  async enrollInCourse() {
    if (!this.activeCourse || !this.currentUser) return;
    if (!this.isEnrolled(this.activeCourse.id)) {
      try {
        await firstValueFrom(this.http.post(`${this.apiUrl}/enrollments`, {
          userId: this.currentUser.id,
          courseId: this.activeCourse.id
        }));
        this.enrolledCourseIds = [...this.enrolledCourseIds, this.activeCourse!.id];
      } catch (error) {
        console.error('Error enrolling:', error);
        alert('Error al inscribirse al curso');
      } finally {
        this.cdr.detectChanges();
      }
    }
  }

  formatVideoUrl(url: string): string {
    if (!url) return '';
    // Handle standard youtube URL
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Handle youtu.be short URL
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Si ya es un enlace de embed (como el iframe que da YT), extraer el src
    if (url.includes('<iframe') && url.includes('src="')) {
      return url.split('src="')[1].split('"')[0];
    }
    return url;
  }

  // --- PROGRESS TRACKING ---

  isLessonCompleted(lessonId: string): boolean {
    return this.completedLessonIds.includes(lessonId);
  }

  async toggleLessonCompletion(lessonId: string) {
    if (!this.currentUser || this.isTogglingProgress) return;
    this.isTogglingProgress = true;
    this.cdr.detectChanges();

    const isCurrentlyCompleted = this.isLessonCompleted(lessonId);
    const newState = !isCurrentlyCompleted;

    try {
      const response: any = await firstValueFrom(this.http.post(`${this.apiUrl}/progress/toggle`, {
        userId: this.currentUser.id,
        lessonId: lessonId,
        completed: newState
      }));

      if (newState) {
        if (!this.completedLessonIds.includes(lessonId)) {
          this.completedLessonIds = [...this.completedLessonIds, lessonId];
        }
      } else {
        this.completedLessonIds = this.completedLessonIds.filter(id => id !== lessonId);
      }

      if (this.activeCourse) {
        this.activeCourse.progress = response.progress;
      }
      const courseInList = this.featuredCourses.find(c => c.id === (this.activeCourse?.id || ''));
      if (courseInList) {
        courseInList.progress = response.progress;
      }
    } catch (error) {
      console.error('Error toggling lesson completion:', error);
    } finally {
      this.isTogglingProgress = false;
      this.cdr.detectChanges();
    }
  }

  // --- NAVIGATION ---
  
  canGoPrev(): boolean {
    return this.activeLessonIndex > 0 || this.activeLevelIndex > 0;
  }

  canGoNext(): boolean {
    if (!this.activeCourse) return false;
    const currentLevel = this.activeCourse.levels[this.activeLevelIndex];
    const isLastLessonInLevel = this.activeLessonIndex >= (currentLevel?.lessons?.length - 1);
    const isLastLevel = this.activeLevelIndex >= (this.activeCourse.levels.length - 1);
    
    return !(isLastLessonInLevel && isLastLevel);
  }

  prevLesson() {
    if (this.activeLessonIndex > 0) {
      this.activeLessonIndex--;
    } else if (this.activeLevelIndex > 0) {
      this.activeLevelIndex--;
      this.activeLessonIndex = this.activeCourse!.levels[this.activeLevelIndex].lessons.length - 1;
    }
    this.cdr.detectChanges();
  }

  nextLesson() {
    if (!this.activeCourse) return;
    const currentLevel = this.activeCourse.levels[this.activeLevelIndex];
    
    if (this.activeLessonIndex < currentLevel.lessons.length - 1) {
      this.activeLessonIndex++;
    } else if (this.activeLevelIndex < this.activeCourse.levels.length - 1) {
      this.activeLevelIndex++;
      this.activeLessonIndex = 0;
    }
    this.cdr.detectChanges();
  }

  isExamPassed(examId: string): boolean {
    return this.examResults.some(r => r.examId === examId && r.passed);
  }

  getLevelProgress(level: any): number {
    const lessons = level.lessons || [];
    const hasExam = !!level.exam;
    
    const totalItems = lessons.length + (hasExam ? 1 : 0);
    if (totalItems === 0) return 0;

    const completedLessons = lessons.filter((l: any) => this.isLessonCompleted(l.id)).length;
    const examPassed = hasExam && this.isExamPassed(level.exam.id) ? 1 : 0;

    return Math.round(((completedLessons + examPassed) / totalItems) * 100);
  }


  async handleLogin() {
    if (this.isLoggingIn) return;

    if (!this.loginData.email || !this.loginData.password) {
      this.loginError = 'Por favor, completa todos los campos.';
      return;
    }

    this.isLoggingIn = true;
    this.loginError = '';
    this.cdr.detectChanges();

    try {
      const user: any = await firstValueFrom(this.http.post(`${this.apiUrl}/login`, this.loginData));
      this.currentUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        role: user.role
      };
      this.syncProfileData();
      if (user.role === 'ADMIN') {
        this.setView('admin');
      } else {
        await this.loadUserProgress();
        this.setView('landing');
      }
    } catch (error: any) {
      this.loginError = error.error?.error || 'Error al iniciar sesión. Verifica tus credenciales.';
    } finally {
      this.isLoggingIn = false;
      this.cdr.detectChanges();
    }
  }

  checkPasswordStrength() {
    const pw = this.registerData.password;
    if (!pw) {
      this.passwordStrength = 0;
      return;
    }
    
    let strength = 1; // Débil
    
    // Media: 8+ caracteres Y (letras Y números)
    if (pw.length >= 8 && /[a-zA-Z]/.test(pw) && /[0-9]/.test(pw)) {
      strength = 2;
    }
    
    // Fuerte: 10+ caracteres, mayúsculas, minúsculas, números y símbolos
    if (pw.length >= 10 && /[a-z]/.test(pw) && /[A-Z]/.test(pw) && /[0-9]/.test(pw) && /[^a-zA-Z0-9]/.test(pw)) {
      strength = 3;
    }
    
    this.passwordStrength = strength;
  }

  async handleRegister() {
    if (this.isRegistering) return;
    this.registerError = '';

    // Validar campos vacíos
    if (!this.registerData.name || !this.registerData.email || !this.registerData.password || !this.registerData.confirmPassword) {
      this.registerError = 'Por favor, completa todos los campos obligatorios.';
      return;
    }

    // Validar coincidencia de contraseñas
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.registerError = 'Las contraseñas no coinciden.';
      return;
    }

    if (this.passwordStrength < 2) {
      this.registerError = 'La contraseña es demasiado débil. Se requiere una contraseña de nivel medio o superior (mínimo 8 caracteres, letras y números).';
      return;
    }

    this.isRegistering = true;
    this.cdr.detectChanges();

    try {
      const role = this.registerData.isAdmin ? 'ADMIN' : 'USER';
      const user: any = await firstValueFrom(this.http.post(`${this.apiUrl}/register`, {
        email: this.registerData.email,
        password: this.registerData.password,
        name: this.registerData.name,
        role: role,
        selectedCourseId: this.registerData.selectedCourseId
      }));
      this.currentUser = { id: user.id, email: user.email, name: user.name, role: user.role };
      await this.loadUserProgress();
      this.setView('landing');
    } catch (error: any) {
      this.registerError = error.error?.error || 'Error al registrar usuario.';
    } finally {
      this.isRegistering = false;
      this.cdr.detectChanges();
    }
  }

  deleteCourse(id: string) {
    this.featuredCourses = this.featuredCourses.filter(c => c.id !== id);
  }

  // === Edición de Cursos (Modal) ===
  editCourse(course: any) {
    this.editingCourse = JSON.parse(JSON.stringify(course));
    if (!this.editingCourse.levels) this.editingCourse.levels = [];
    this.editTab = 'info';
    this.editingLevelIndex = null;
    this.editingLessonIndex = null;
    this.showEditModal = true;
  }

  async saveCourse() {
    if (!this.editingCourse) return;
    try {
      await firstValueFrom(this.http.put(`${this.apiUrl}/courses/${this.editingCourse.id}`, this.editingCourse));
      await this.loadCourses();
      this.closeEditModal();
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Error al guardar el curso');
    } finally {
      this.cdr.detectChanges();
    }
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingCourse = null;
    this.editingLevelIndex = null;
    this.editingLessonIndex = null;
  }

  // --- Niveles ---
  addLevel() {
    if (!this.editingCourse) return;
    this.editingCourse.levels.push({
      id: 'lvl-' + Date.now(),
      title: 'Nuevo Nivel',
      order: this.editingCourse.levels.length + 1,
      lessons: [],
      exam: null
    });
  }

  removeLevel(lvlIdx: number) {
    this.editingCourse.levels.splice(lvlIdx, 1);
    if (this.editingLevelIndex === lvlIdx) {
      this.editingLevelIndex = null;
      this.editingLessonIndex = null;
    }
  }

  selectLevel(lvlIdx: number) {
    this.editingLevelIndex = lvlIdx;
    this.editingLessonIndex = null;
  }

  // --- Lecciones ---
  addLesson(lvlIdx: number) {
    this.editingCourse.levels[lvlIdx].lessons.push({
      id: 'les-' + Date.now(),
      title: 'Nueva Lección',
      content: '',
      videoUrl: '',
      documents: [] as any[],
      order: this.editingCourse.levels[lvlIdx].lessons.length + 1
    });
  }

  removeLesson(lvlIdx: number, lesIdx: number) {
    this.editingCourse.levels[lvlIdx].lessons.splice(lesIdx, 1);
    if (this.editingLessonIndex === lesIdx) this.editingLessonIndex = null;
  }

  selectLesson(lesIdx: number) {
    this.editingLessonIndex = lesIdx;
  }

  // --- Documentos ---
  addDocument(lvlIdx: number, lesIdx: number) {
    const lesson = this.editingCourse.levels[lvlIdx].lessons[lesIdx];
    if (!lesson.documents) lesson.documents = [];
    lesson.documents.push({ title: 'Nuevo Documento', url: '' });
  }

  removeDocument(lvlIdx: number, lesIdx: number, docIdx: number) {
    this.editingCourse.levels[lvlIdx].lessons[lesIdx].documents.splice(docIdx, 1);
  }

  // --- Exámenes ---
  addExamToLevel(lvlIdx: number) {
    this.editingCourse.levels[lvlIdx].exam = {
      id: 'exam-' + Date.now(),
      questions: []
    };
  }

  removeExam(lvlIdx: number) {
    this.editingCourse.levels[lvlIdx].exam = null;
  }

  addQuestion(lvlIdx: number) {
    const exam = this.editingCourse.levels[lvlIdx].exam;
    if (!exam) return;
    exam.questions.push({
      question: '',
      options: ['', '', '', ''],
      correctIndex: 0
    });
  }

  removeQuestion(lvlIdx: number, qIdx: number) {
    this.editingCourse.levels[lvlIdx].exam.questions.splice(qIdx, 1);
  }

  trackByIndex(index: number): number {
    return index;
  }


  async publishAnnouncement() {
    if (!this.announcementText.trim()) return;

    try {
      await firstValueFrom(this.http.post(`${this.apiUrl}/announcements`, {
        type: this.announcementType,
        text: this.announcementText,
        courseId: this.selectedCourseIdForAnnouncement,
        expiresAt: this.announcementExpiresAt || null
      }));

      await this.loadActiveAnnouncements();
      if (this.currentUser?.role === 'ADMIN') {
        await this.loadAllAnnouncements();
      }
      
      this.announcementText = '';
      this.announcementExpiresAt = '';
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error publishing announcement:', error);
      alert('Error al publicar anuncio');
    }
  }

  async deleteAnnouncement(id: string) {
    if (!confirm('¿Estás seguro de eliminar este anuncio?')) return;
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/announcements/${id}`));
      await this.loadActiveAnnouncements();
      await this.loadAllAnnouncements();
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  }

  getCourseTitle(courseId: string): string {
    const course = this.featuredCourses.find(c => c.id === courseId);
    return course ? course.title : 'Desconocido';
  }

  clearGlobalAnnouncement() {
    this.globalAnnouncement = null;
  }

  searchLogs() {
    this.filteredLogs = this.auditLogs.filter(log => {
      const userEmail = (typeof log.user === 'object' && log.user !== null) ? log.user.email : (log.user || '');
      const matchesSearch = userEmail.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                            log.action.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesAction = this.filterAction ? log.action === this.filterAction : true;
      
      return matchesSearch && matchesAction;
    });
  }

  printAudit() {
    window.print();
  }

  // --- PROFILE & CERTIFICATES ---

  examResults: any[] = [];

  syncProfileData() {
    if (!this.currentUser) return;
    this.profileData = {
      fullName: this.currentUser.fullName || '',
      avatarUrl: this.currentUser.avatarUrl || ''
    };
  }

  async updateProfile() {
    if (!this.currentUser) return;
    try {
      const updated: any = await firstValueFrom(this.http.put(`${this.apiUrl}/users/${this.currentUser.id}`, {
        name: this.currentUser.name,
        ...this.profileData
      }));
      this.currentUser = { ...this.currentUser, ...updated };
      alert('Perfil actualizado con éxito');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil');
    } finally {
      this.cdr.detectChanges();
    }
  }

  onAvatarChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileData.avatarUrl = e.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  getAverageGrade(courseId: string): number {
    const courseResults = this.examResults.filter(r => r.exam.level.courseId === courseId);
    if (courseResults.length === 0) return 0;
    const total = courseResults.reduce((sum, r) => sum + r.score, 0);
    return Math.round(total / courseResults.length);
  }

  async generateCertificate(course: any) {
    if (!this.currentUser) return;

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const primaryColor = [255, 107, 0]; // #FF6B00

    // --- Sidebar Izquierda (Estilo Imagen) ---
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 60, pageHeight, 'F');

    // Círculo blanco con Logo en Sidebar
    doc.setFillColor(255, 255, 255);
    doc.circle(30, pageHeight / 2, 18, 'F');
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(1);
    doc.circle(30, pageHeight / 2, 22, 'S');

    // Logo oficial dentro del círculo de la Sidebar
    try {
      doc.addImage('assets/brand/logo_sin_eslogan.png', 'PNG', 11, pageHeight / 2 - 12.5, 38, 25);
    } catch (e) {
      // Fallback si la imagen no carga
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('EDÚ', 30, pageHeight / 2 - 1, { align: 'center' });
      doc.setTextColor(0, 0, 0);
      doc.text('-KT', 30, pageHeight / 2 + 3, { align: 'center' });
    }

    // --- Contenido Principal (Fondo Blanco) ---
    doc.setTextColor(40, 40, 40);
    
    // Título Principal (Reemplaza "CONSTANCIA")
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('CERTIFICADO', 75, 30);

    // ID de Validación (Reemplaza "FOLIO")
    const validationId = (this.currentUser.id.substring(0, 8) + '-' + course.id.substring(0, 8)).toUpperCase();
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`ID DE VALIDACIÓN : ${validationId}`, 75, 40);

    // QR Code (Top Right)
    const verificationUrl = `https://edukt.com/verify?id=${validationId}`;
    const qrUrl = await QRCode.toDataURL(verificationUrl);
    doc.addImage(qrUrl, 'PNG', pageWidth - 50, 15, 35, 35);
    doc.setDrawColor(230, 230, 230);
    doc.rect(pageWidth - 52, 13, 39, 39, 'S');

    // Texto Central
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text('PARA ACREDITAR QUE', 75, 65);

    // Nombre del Alumno
    doc.setFontSize(36);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    const displayName = this.currentUser.fullName || this.currentUser.name || 'Estudiante';
    doc.text(displayName, 75, 85);

    // Curso
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('CURSA', 75, 105);

    doc.setFontSize(28);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text(course.title, 75, 125);

    // Stats (Avance y Puntaje)
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const average = this.getAverageGrade(course.id) || 100;
    doc.text(`PRESENTANDO A LA FECHA UN AVANCE DE ${course.progress}% Y UN PUNTAJE DE ${average / 10}.`, 75, 150);

    // Fecha de Emisión (Reemplaza "FECHA Y HORA")
    doc.text(`FECHA DE EMISIÓN : ${new Date().toLocaleDateString('es-ES').toUpperCase()} - ${new Date().toLocaleTimeString('es-ES')}`, 75, 165);

    // Horas (Equivalente)
    const hours = (course.levels?.length || 1) * 4; // Estimación simple
    doc.text(`VALOR EDUCATIVO EQUIVALENTE A ${hours} HORAS AL 100%.`, 75, 180);

    // Footer de Verificación
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Para verificar la autenticidad de este documento escanea el código QR o dirígete a:', 75, 240);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(verificationUrl, 75, 245);

    // Guardar
    doc.save(`Certificado_${course.title.replace(/\s+/g, '_')}.pdf`);
  }

  // --- EXAMS ---
  startExam(exam: any) {
    this.currentExam = exam;
    this.examAnswers = {};
    this.examScore = null;
    this.showExamResult = false;
  }

  async submitExam() {
    if (!this.currentExam || !this.currentUser) return;

    let correct = 0;
    this.currentExam.questions.forEach((q: any, i: number) => {
      if (this.examAnswers[i] === q.correctIndex) {
        correct++;
      }
    });

    const score = Math.round((correct / this.currentExam.questions.length) * 100);
    const passed = score >= 70;

    try {
      await firstValueFrom(this.http.post(`${this.apiUrl}/exam-results`, {
        userId: this.currentUser.id,
        examId: this.currentExam.id,
        score,
        passed
      }));
      this.examScore = score;
      this.showExamResult = true;
      await this.loadUserProgress();
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Error al enviar el examen');
    } finally {
      this.cdr.detectChanges();
    }
  }

  closeExam() {
    this.currentExam = null;
    this.examScore = null;
    this.showExamResult = false;
  }

  // --- ADMIN STATS ---
  async loadAdminStats() {
    try {
      this.adminStats = await firstValueFrom(this.http.get<any>(`${this.apiUrl}/admin/stats`));
    } catch (error) {
      console.error('Error loading admin stats:', error);
    } finally {
      this.cdr.detectChanges();
    }
  }

  // --- ADMIN USERS ---
  async loadAllUsers() {
    try {
      this.allUsers = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/admin/users`));
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      this.cdr.detectChanges();
    }
  }

  async deleteUser(id: string) {
    if (id === this.currentUser?.id) return alert('No puedes eliminarte a ti mismo.');
    if (!confirm('¿Estás seguro de eliminar este usuario? Esta acción es irreversible.')) return;
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/admin/users/${id}`));
      this.allUsers = this.allUsers.filter(u => u.id !== id);
      alert('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  async updateUserRole(id: string, newRole: string) {
    if (id === this.currentUser?.id) return alert('No puedes cambiar tu propio rol.');
    try {
      await firstValueFrom(this.http.put(`${this.apiUrl}/admin/users/${id}/role`, { role: newRole }));
      const user = this.allUsers.find(u => u.id === id);
      if (user) user.role = newRole;
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Error al actualizar el rol.');
      this.loadAllUsers(); // Reload to revert select if failed
    }
  }

  // --- CONTACT & ABOUT ---
  async sendMessage() {
    let { name, email, subject, message } = this.contactForm;

    // Si hay usuario logueado, usar sus datos reales
    if (this.currentUser) {
      name = this.currentUser.fullName || this.currentUser.name;
      email = this.currentUser.email;
    }

    if (!name || !email || !message) {
      this.messageError = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    this.isSendingMessage = true;
    this.messageError = '';
    this.cdr.detectChanges();

    try {
      await firstValueFrom(
        this.http.post(`${this.apiUrl}/contact`, { name, email, subject, message })
      );
      this.messageSent = true;
      this.contactForm = { name: '', email: '', subject: '', message: '' };
      this.cdr.detectChanges();
      setTimeout(() => {
        this.messageSent = false;
        this.cdr.detectChanges();
      }, 3000);
    } catch (err: any) {
      this.messageError = err?.error?.error || 'No se pudo enviar el mensaje. Inténtalo más tarde.';
    } finally {
      this.isSendingMessage = false;
      this.cdr.detectChanges();
    }
  }

  setAdminTab(tab: 'courses' | 'announcements' | 'users' | 'audit') {
    this.adminTab = tab;
    this.loadAdminStats();
    if (tab === 'audit') this.loadAuditLogs();
    if (tab === 'users') this.loadAllUsers();
    if (tab === 'announcements') this.loadAllAnnouncements();
    this.cdr.detectChanges();
  }
}
