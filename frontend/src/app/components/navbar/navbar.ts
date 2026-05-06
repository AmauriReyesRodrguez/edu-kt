import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  @Input() currentUser: { 
    email: string, 
    name: string, 
    role: 'USER' | 'ADMIN',
    avatarUrl?: string 
  } | null = null;
  @Output() viewChange = new EventEmitter<'landing' | 'admin' | 'audit' | 'login' | 'register' | 'recovery' | 'course' | 'profile' | 'about' | 'contact' | 'terms'>();
  @Output() onLogout = new EventEmitter<void>();

  isDarkMode = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }

  changeView(view: 'landing' | 'admin' | 'audit' | 'login' | 'register' | 'recovery' | 'course' | 'profile' | 'about' | 'contact' | 'terms') {
    this.viewChange.emit(view);
  }

  logout() {
    this.onLogout.emit();
  }
}
