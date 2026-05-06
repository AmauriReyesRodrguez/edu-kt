const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const allowedOrigins = [
  'http://localhost:4200',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Aura Learn API is running' });
});

// --- ADMIN STATS ---
app.get('/api/admin/stats', async (req, res) => {
  try {
    const totalCourses = await prisma.course.count();
    const totalUsers = await prisma.user.count();
    const totalEnrollments = await prisma.enrollment.count();

    res.json({
      coursesCount: totalCourses,
      usersCount: totalUsers,
      enrollmentsCount: totalEnrollments
    });
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    res.status(500).json({ error: 'Error fetching stats' });
  }
});


// --- CONTACT ---
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Nombre, correo y mensaje son obligatorios.' });
  }

  const mailOptions = {
    from: `"EDÚ-KT Contacto" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER,
    replyTo: email,
    subject: `[EDÚ-KT] ${subject || 'Nuevo mensaje de contacto'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
        <div style="background: #FF6B00; padding: 20px 30px;">
          <h2 style="color: white; margin: 0;">📩 Nuevo Mensaje de Contacto</h2>
          <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0;">Desde la plataforma EDÚ-KT</p>
        </div>
        <div style="padding: 30px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Nombre:</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Correo:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Asunto:</td><td style="padding: 8px 0;">${subject || 'Sin asunto'}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <h4 style="color: #333; margin-bottom: 10px;">Mensaje:</h4>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 8px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        <div style="background: #f5f5f5; padding: 15px 30px; text-align: center; color: #999; font-size: 12px;">
          EDÚ-KT — "Edúcate hoy y asegura el mañana."
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: '¡Mensaje enviado con éxito!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'No se pudo enviar el mensaje. Inténtalo de nuevo.' });
  }
});

// --- COURSES ---

// Get all courses with levels and lessons
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        levels: {
          orderBy: { order: 'asc' },
          include: {
            lessons: { orderBy: { order: 'asc' } },
            exam: true
          }
        }
      }
    });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching courses' });
  }
});

// Update a course
app.put('/api/courses/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, category, themeColor, isActive, levels } = req.body;

  try {
    // 1. Update basic course info
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: { title, description, category, themeColor, isActive }
    });

    // 2. Sync levels and lessons if provided
    if (levels && Array.isArray(levels)) {
      for (const level of levels) {
        // Upsert level
        const updatedLevel = await prisma.level.upsert({
          where: { id: level.id.startsWith('lvl-') ? '00000000-0000-0000-0000-000000000000' : level.id }, // Fake UUID for new to force create
          update: { title: level.title, order: level.order },
          create: {
            title: level.title,
            order: level.order,
            courseId: id
          }
        });

        if (level.lessons && Array.isArray(level.lessons)) {
          for (const lesson of level.lessons) {
            await prisma.lesson.upsert({
              where: { id: lesson.id.startsWith('les-') ? '00000000-0000-0000-0000-000000000000' : lesson.id },
              update: {
                title: lesson.title,
                content: lesson.content,
                videoUrl: lesson.videoUrl,
                documents: lesson.documents,
                order: lesson.order,
                levelId: updatedLevel.id
              },
              create: {
                title: lesson.title,
                content: lesson.content,
                videoUrl: lesson.videoUrl,
                documents: lesson.documents,
                order: lesson.order,
                levelId: updatedLevel.id
              }
            });
          }
        }

        // Upsert Exam
        if (level.exam && level.exam.questions) {
          await prisma.exam.upsert({
            where: { levelId: updatedLevel.id },
            update: { questions: level.exam.questions },
            create: {
              questions: level.exam.questions,
              levelId: updatedLevel.id
            }
          });
        } else if (level.exam === null) {
          try {
            await prisma.exam.delete({
              where: { levelId: updatedLevel.id }
            });
          } catch (e) {
            // If it doesn't exist, ignore
          }
        }
      }

    }

    res.json({ message: 'Curso y currículo actualizado exitosamente', course: updatedCourse });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Error updating course' });
  }
});

// --- AUTH ---

// Helper for password strength
function isStrongPassword(password) {
  // At least 8 characters, must contain letters and numbers (Medium)
  return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
}

// Register
app.post('/api/register', async (req, res) => {
  const { email, password, name, role, selectedCourseId } = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({ 
      error: 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres e incluir letras y números.' 
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password, // Ideally use bcrypt here
        name,
        role: role || 'USER'
      }
    });

    // Auto-enroll if a course was selected during registration
    if (selectedCourseId) {
      await prisma.enrollment.create({
        data: {
          userId: user.id,
          courseId: selectedCourseId
        }
      });
    }

    // Create an audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'REGISTRO',
        status: 'EXITOSO',
        details: { email: user.email }
      }
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Google Login
app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const { email, name, sub } = payload;

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Create user if doesn't exist
      user = await prisma.user.create({
        data: {
          email,
          name,
          password: `google_${sub}`, // Dummy password
          role: 'USER'
        }
      });

      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'REGISTRO_GOOGLE',
          status: 'EXITOSO',
          details: { email }
        }
      });
    } else {
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'LOGIN_GOOGLE',
          status: 'EXITOSO',
          details: { email }
        }
      });
    }

    res.json({ user });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ error: 'Token de Google inválido' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || user.password !== password) {
      // Log failed attempt
      await prisma.auditLog.create({
        data: {
          action: 'LOGIN',
          status: 'FALLIDO',
          details: { email }
        }
      });
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Log successful login
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN',
        status: 'EXITOSO'
      }
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el login' });
  }
});

// --- USERS & PROFILE ---

// Get user profile
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        fullName: true,
        documentId: true,
        phone: true,
        avatarUrl: true,
        role: true,
        createdAt: true
      }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
});

// Update user profile
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, fullName, documentId, phone, avatarUrl } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, fullName, documentId, phone, avatarUrl }
    });
    res.json(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Error al actualizar el perfil' });
  }
});

// --- EXAM RESULTS ---

// Save exam result
app.post('/api/exam-results', async (req, res) => {
  const { userId, examId, score, passed } = req.body;
  try {
    const result = await prisma.examResult.upsert({
      where: { userId_examId: { userId, examId } },
      update: { score, passed },
      create: { userId, examId, score, passed }
    });

    // Recalculate course progress
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: { level: true }
    });
    if (exam) {
      await recalculateProgress(userId, exam.level.courseId);
    }

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar el resultado del examen' });
  }
});

// Get user exam results
app.get('/api/users/:userId/exam-results', async (req, res) => {
  const { userId } = req.params;
  try {
    const results = await prisma.examResult.findMany({
      where: { userId },
      include: {
        exam: {
          include: {
            level: {
              include: {
                course: true
              }
            }
          }
        }
      }
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener resultados de exámenes' });
  }
});

// --- AUDIT LOGS ---
app.get('/api/audit-logs', async (req, res) => {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { timestamp: 'desc' },
      include: { user: true }
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching logs' });
  }
});

// --- PROGRESS ---

// Get all completed lessons for a user
app.get('/api/users/:userId/progress', async (req, res) => {
  const { userId } = req.params;
  try {
    const progress = await prisma.progress.findMany({
      where: { userId, completed: true },
      select: { lessonId: true }
    });
    res.json(progress.map(p => p.lessonId));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching progress' });
  }
});

// Toggle lesson completion and update enrollment progress
app.post('/api/progress/toggle', async (req, res) => {
  const { userId, lessonId, completed } = req.body;
  try {
    // 1. Update/Create progress record
    await prisma.progress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: { completed },
      create: { userId, lessonId, completed }
    });

    // Recalculate course progress using helper
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { level: true }
    });
    const courseId = lesson.level.courseId;
    const progressPercent = await recalculateProgress(userId, courseId);

    res.json({ progress: progressPercent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error toggling progress' });
  }
});

async function recalculateProgress(userId, courseId) {
  // 1. Get all lessons and exams for the course
  const lessons = await prisma.lesson.findMany({
    where: { level: { courseId } },
    select: { id: true }
  });
  const exams = await prisma.exam.findMany({
    where: { level: { courseId } },
    select: { id: true }
  });

  const totalItems = lessons.length + exams.length;
  if (totalItems === 0) return 0;

  // 2. Get completed lessons
  const completedLessonsCount = await prisma.progress.count({
    where: {
      userId,
      completed: true,
      lessonId: { in: lessons.map(l => l.id) }
    }
  });

  // 3. Get passed exams
  const passedExamsCount = await prisma.examResult.count({
    where: {
      userId,
      passed: true,
      examId: { in: exams.map(e => e.id) }
    }
  });

  const progressPercent = Math.round(((completedLessonsCount + passedExamsCount) / totalItems) * 100);

  // 4. Update Enrollment
  await prisma.enrollment.update({
    where: { userId_courseId: { userId, courseId } },
    data: { progress: progressPercent }
  });

  return progressPercent;
}

// --- ENROLLMENTS ---

// Get all enrollments for a user
app.get('/api/users/:userId/enrollments', async (req, res) => {
  const { userId } = req.params;
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: { course: true }
    });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching enrollments' });
  }
});

app.post('/api/enrollments', async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    const enrollment = await prisma.enrollment.create({
      data: { userId, courseId }
    });
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: 'Error al inscribirse' });
  }
});

// --- ANNOUNCEMENTS ---

// Get active announcements
app.get('/api/announcements', async (req, res) => {
  try {
    const now = new Date();
    const announcements = await prisma.announcement.findMany({
      where: {
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: now } }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching announcements' });
  }
});

// Get ALL announcements (for admin panel)
app.get('/api/announcements/all', async (req, res) => {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching all announcements' });
  }
});

app.post('/api/announcements', async (req, res) => {
  const { type, text, courseId, expiresAt } = req.body;
  try {
    const announcement = await prisma.announcement.create({
      data: {
        text,
        type: type || 'global',
        courseId: type === 'specific' ? courseId : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null
      }
    });
    res.status(201).json(announcement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al publicar anuncio' });
  }
});

app.delete('/api/announcements/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.announcement.delete({ where: { id } });
    res.json({ message: 'Anuncio eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar anuncio' });
  }
});

// --- ADMIN USER MANAGEMENT ---

// Get all users (Admin only)
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        fullName: true,
        role: true,
        createdAt: true,
        _count: {
          select: { enrollments: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Delete user (Admin only)
app.delete('/api/admin/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Audit log before deleting
    await prisma.auditLog.create({
      data: {
        action: 'ELIMINAR_USUARIO',
        status: 'EXITOSO',
        details: { userIdToDelete: id }
      }
    });

    await prisma.user.delete({ where: { id } });
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

// Update user role (Admin only)
app.put('/api/admin/users/:id/role', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role }
    });

    await prisma.auditLog.create({
      data: {
        action: 'CAMBIAR_ROL',
        status: 'EXITOSO',
        details: { targetUserId: id, newRole: role }
      }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cambiar rol del usuario' });
  }
});


// === RECUPERACIÓN DE CONTRASEÑA ===

// Paso 1: Solicitar recuperación (genera token y envía correo real)
app.post('/api/recover', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email requerido.' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    // Siempre responder OK para no revelar si el email existe o no
    if (!user) return res.json({ message: 'Si el correo existe, recibirás un enlace.' });

    // Invalidar tokens previos para ese email
    await prisma.passwordResetToken.updateMany({
      where: { email, used: false },
      data: { used: true }
    });

    // Generar token único y con expiración de 1 hora
    const crypto = require('crypto');
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    await prisma.passwordResetToken.create({
      data: { token, email, expiresAt }
    });

    // Construir enlace de reset (apunta al frontend)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
    const resetLink = `${frontendUrl}?reset_token=${token}`;

    // Enviar correo real con Nodemailer
    await transporter.sendMail({
      from: `"EDÚ-KT Plataforma" <${process.env.MAIL_USER}>`,
      to: email,
      subject: '🔑 Recupera tu contraseña - EDÚ-KT',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #FF6B00; font-size: 28px; margin: 0;">EDÚ-KT</h1>
            <p style="color: #666; margin-top: 5px;">Plataforma de Aprendizaje</p>
          </div>
          <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <h2 style="color: #333; margin-top: 0;">Recuperación de Contraseña</h2>
            <p style="color: #555; line-height: 1.6;">Hola <strong>${user.name || user.email}</strong>,</p>
            <p style="color: #555; line-height: 1.6;">Recibimos una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el botón a continuación para crear una nueva contraseña:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" 
                 style="background: #FF6B00; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">
                🔑 Restablecer Contraseña
              </a>
            </div>
            <p style="color: #999; font-size: 13px;">Este enlace expira en <strong>1 hora</strong>. Si no solicitaste este cambio, puedes ignorar este correo.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #bbb; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} EDÚ-KT. Todos los derechos reservados.</p>
          </div>
        </div>
      `
    });

    res.json({ message: 'Si el correo existe, recibirás un enlace.' });
  } catch (error) {
    console.error('Error en recuperación de contraseña:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud.' });
  }
});

// Paso 2: Restablecer contraseña usando el token
app.post('/api/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ error: 'Token y contraseña requeridos.' });
  if (newPassword.length < 6) return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });

  try {
    const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });

    if (!resetToken) return res.status(400).json({ error: 'Token inválido.' });
    if (resetToken.used) return res.status(400).json({ error: 'Este enlace ya fue utilizado.' });
    if (new Date() > resetToken.expiresAt) return res.status(400).json({ error: 'El enlace ha expirado. Solicita uno nuevo.' });

    // Encriptar nueva contraseña (simple hash para coherencia con el sistema actual)
    const bcrypt = require('bcryptjs');
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(newPassword, 10);
    } catch (e) {
      // Si no tiene bcrypt, guardamos en texto (mismo patrón que el login actual)
      hashedPassword = newPassword;
    }

    // Actualizar contraseña del usuario
    await prisma.user.update({
      where: { email: resetToken.email },
      data: { password: hashedPassword, failedLoginAttempts: 0, lockoutUntil: null }
    });

    // Marcar token como usado
    await prisma.passwordResetToken.update({
      where: { token },
      data: { used: true }
    });

    res.json({ message: 'Contraseña actualizada con éxito. Ya puedes iniciar sesión.' });
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    res.status(500).json({ error: 'Error al restablecer la contraseña.' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
