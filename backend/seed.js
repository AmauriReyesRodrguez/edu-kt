const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el sembrado de datos (Seed)...');

  // Limpiar datos existentes
  await prisma.progress.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.examResult.deleteMany({});
  await prisma.exam.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.level.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.user.deleteMany({});

  // Crear un usuario Admin
  await prisma.user.create({
    data: {
      email: 'admin@edukt.com',
      password: 'admin123',
      name: 'Administrador',
      role: 'ADMIN'
    }
  });

  const courses = [
    {
        "title": "Auxiliar de Enfermería",
        "description": "Cuidados básicos de salud, asistencia médica profesional y primeros auxilios.",
        "color": "#C62828",
        "category": "Salud",
        "thumbnail": "assets/courses/enfermeria.png",
        "levels": [
            {
                "title": "Anatomía Humana y Fisiología Básica",
                "lessons": [
                    {
                        "title": "Sistemas del cuerpo humano",
                        "content": "Aprenderás sobre: Sistemas del cuerpo humano",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Xzhcv1wjZAE?si=UpVARfDoD5jAgbox\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Signos vitales y su medición",
                        "content": "Aprenderás sobre: Signos vitales y su medición",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/holIflCR2MA?si=cg5rED0nGjbjsxbK\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Terminología médica básica",
                        "content": "Aprenderás sobre: Terminología médica básica",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/XkT8OHov4ao?si=xOBaKV27dX4krXs3\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Cuál es la unidad anatómica y funcional fundamental de todos los seres vivos?",
                            "options": ["El tejido", "El órgano", "La célula", "El sistema"],
                            "correctIndex": 2
                        },
                        {
                            "question": "¿Qué rango de frecuencia cardíaca (pulso) se considera normal en un adulto en reposo?",
                            "options": ["40 a 60 latidos por minuto", "60 a 100 latidos por minuto", "100 a 120 latidos por minuto", "120 a 140 latidos por minuto"],
                            "correctIndex": 1
                        },
                        {
                            "question": "El prefijo médico 'Taqui-' significa:",
                            "options": ["Lento", "Rápido", "Debajo de", "Alrededor de"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Cuidados Básicos del Paciente",
                "lessons": [
                    {
                        "title": "Higiene y confort del paciente",
                        "content": "Aprenderás sobre: Higiene y confort del paciente",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/bHug4E4dlbg?si=fMwiEhVMWHXygTr1\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Movilización y prevención de úlceras",
                        "content": "Aprenderás sobre: Movilización y prevención de úlceras",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/-_76jlSaMZg?si=N4f6_oC-ZdUGmZlB\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Alimentación y nutrición asistida",
                        "content": "Aprenderás sobre: Alimentación y nutrición asistida",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/21Dtpf3_gpk?si=f5l578byi-0NqfEC\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Cuál es el principal objetivo del baño en cama o higiene del paciente?",
                            "options": ["Curar enfermedades de la piel", "Eliminar células muertas, bacterias y promover el confort", "Sustituir el tratamiento médico", "Bajar la fiebre rápidamente"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Cada cuánto tiempo se recomienda realizar cambios posturales en pacientes encamados para prevenir úlceras por presión?",
                            "options": ["Cada 12 horas", "Cada 8 horas", "Cada 2 a 3 horas", "Una vez al día"],
                            "correctIndex": 2
                        },
                        {
                            "question": "¿En qué posición debe colocarse al paciente (si no hay contraindicaciones) para asistirle en la alimentación oral?",
                            "options": ["Posición de decúbito supino", "Posición de decúbito prono", "Posición de Fowler o semi-Fowler", "Posición de Trendelenburg"],
                            "correctIndex": 2
                        }
                    ]
                }
            },
            {
                "title": "Primeros Auxilios y Emergencias",
                "lessons": [
                    {
                        "title": "Reanimación cardiopulmonar (RCP)",
                        "content": "Aprenderás sobre: Reanimación cardiopulmonar (RCP)",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/7SBBka5fwW8?si=w1Ibf6FG1YISb3YU\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Manejo de heridas, quemaduras y hemorragias",
                        "content": "Aprenderás sobre: Manejo de heridas, quemaduras y hemorragias",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/U3Bjw_2N4f0?si=jeJbtruDy35IVcHr\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Protocolos de actuación en emergencias (Triage)",
                        "content": "Aprenderás sobre: Protocolos de actuación en emergencias (Triage)",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/mBW_Ff8YiPM?si=LKcA-OCna33e1HFE\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "En la Reanimación Cardiopulmonar (RCP) básica en adultos, ¿cuál es la relación recomendada de compresiones y ventilaciones?",
                            "options": ["15 compresiones y 2 ventilaciones", "30 compresiones y 2 ventilaciones", "50 compresiones y 5 ventilaciones", "Solamente ventilaciones"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Ante una hemorragia externa importante, ¿cuál debe ser la primera medida de primeros auxilios?",
                            "options": ["Aplicar un torniquete inmediatamente", "Lavar la herida con alcohol", "Aplicar presión directa sobre la herida con apósitos limpios", "Elevar la extremidad y esperar"],
                            "correctIndex": 2
                        },
                        {
                            "question": "En el sistema de Triage prehospitalario (START), ¿qué color se asigna a un paciente que requiere atención inmediata y tiene compromiso vital?",
                            "options": ["Verde", "Amarillo", "Rojo", "Negro"],
                            "correctIndex": 2
                        }
                    ]
                }
            },
            {
                "title": "Ética Profesional y Procedimientos Clínicos",
                "lessons": [
                    {
                        "title": "Derechos del paciente y ética médica",
                        "content": "Aprenderás sobre: Derechos del paciente y ética médica",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/DFL--FzYAMA?si=uuVt619ltnbiuuFc\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Preparación de medicación y vías",
                        "content": "Aprenderás sobre: Preparación de medicación y vías",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/LHX8Y7pqBbc?si=-fvD7AosGAtXA70a\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Control de infecciones y bioseguridad",
                        "content": "Aprenderás sobre: Control de infecciones y bioseguridad",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/cPURaQ7kQK8?si=UJPzCtEja6-n3fnR\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "El principio ético que exige guardar el secreto sobre la información médica del paciente se conoce como:",
                            "options": ["Autonomía", "Confidencialidad", "Justicia", "Beneficencia"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Antes de administrar cualquier medicamento, ¿qué se debe verificar según los 'correctos' de la administración?",
                            "options": ["Paciente correcto, medicamento correcto, dosis correcta, vía correcta, hora correcta", "Solamente que sea el paciente correcto", "Que la medicina esté en oferta", "El color de la pastilla únicamente"],
                            "correctIndex": 0
                        },
                        {
                            "question": "¿Cuál es la medida más importante y efectiva para prevenir las infecciones asociadas a la atención de la salud (IAAS)?",
                            "options": ["El uso doble de guantes", "El lavado de manos", "La desinfección de paredes", "Usar bata estéril siempre"],
                            "correctIndex": 1
                        }
                    ]
                }
            }
        ]
    },
    {
        "title": "Cajero Bancario Computarizado",
        "description": "Capacitación en operaciones bancarias, sistemas financieros y manejo de caja computarizada.",
        "color": "#2E7D32",
        "category": "Finanzas y Banca",
        "thumbnail": "assets/courses/cajero.png",
        "levels": [
            {
                "title": "Introducción al Sistema Bancario",
                "lessons": [
                    {
                        "title": "Estructura del sistema financiero",
                        "content": "Aprenderás sobre: Estructura del sistema financiero",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/R2QAhRzlhiY?si=Yl00-4W3Gq7sGMu1\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Productos y servicios bancarios",
                        "content": "Aprenderás sobre: Productos y servicios bancarios",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/8pZJ5hdfDPQ?si=gdpC9Kg9JecGgeG3\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Rol y responsabilidades del cajero",
                        "content": "Aprenderás sobre: Rol y responsabilidades del cajero",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/m26mbB7c1a4?si=rVRUQRh7GC11t6M6\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Cuál es la principal función de un banco comercial dentro del sistema financiero?",
                            "options": ["Emitir moneda nacional", "Intermediar entre quienes tienen excedentes de dinero y quienes lo necesitan", "Cobrar impuestos para el gobierno", "Asegurar vehículos y propiedades"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Cuál de los siguientes es un producto pasivo para el banco?",
                            "options": ["Un préstamo hipotecario", "Una tarjeta de crédito", "Una cuenta de ahorros", "Un sobregiro bancario"],
                            "correctIndex": 2
                        },
                        {
                            "question": "Además de procesar transacciones, ¿cuál es una responsabilidad clave del cajero bancario moderno?",
                            "options": ["Aprobar créditos hipotecarios", "Brindar una excelente atención al cliente y detectar oportunidades comerciales", "Diseñar las campañas de marketing del banco", "Contratar nuevo personal para la sucursal"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Operaciones de Caja y Manejo de Efectivo",
                "lessons": [
                    {
                        "title": "Apertura, cuadre y cierre de caja",
                        "content": "Aprenderás sobre: Apertura, cuadre y cierre de caja",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/uHQRWkfK22U?si=aYzVS8E44DW6l-lL\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Detección de billetes y monedas falsas",
                        "content": "Aprenderás sobre: Detección de billetes y monedas falsas",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/DFPdGpv-5Cc?si=kEQCc_7ZaWmnZIwZ\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Procesamiento de depósitos y retiros",
                        "content": "Aprenderás sobre: Procesamiento de depósitos y retiros",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/-Dwwbp_pII8?si=oG1_jABC633QFxZz\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Qué significa hacer el 'cuadre de caja' al final del turno?",
                            "options": ["Limpiar la estación de trabajo", "Verificar que el saldo físico de dinero coincida con el saldo que indica el sistema", "Cambiar la clave del ordenador", "Contar solo los billetes de alta denominación"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Al recibir un fajo de billetes de un cliente, ¿cuál es el procedimiento correcto?",
                            "options": ["Guardarlo directamente en la gaveta", "Contarlo a la vista del cliente antes de registrar la transacción", "Pedirle al cliente que lo cuente él mismo en voz alta", "Pasarlo por el detector de billetes falsos sin contarlo"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Una característica de seguridad común en los billetes modernos para evitar su falsificación es:",
                            "options": ["Tinta que cambia de color al inclinar el billete", "El uso de papel bond normal", "Que todos tienen el mismo tamaño exacto", "Que carecen de número de serie"],
                            "correctIndex": 0
                        }
                    ]
                }
            },
            {
                "title": "Sistemas Computarizados Bancarios",
                "lessons": [
                    {
                        "title": "Navegación en software bancario",
                        "content": "Aprenderás sobre: Navegación en software bancario",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/gVT7ru_NsbE?si=V0KcW7kzFolRw1QV\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Registro de transacciones electrónicas",
                        "content": "Aprenderás sobre: Registro de transacciones electrónicas",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/caa6gpjMnk8?si=F7WsejI2NnpJakW0\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Pago de servicios y transferencias",
                        "content": "Aprenderás sobre: Pago de servicios y transferencias",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/XlHYUqwnIpk?si=EkOFRu1JDEcNXFGl\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "Para realizar una transferencia interbancaria (ACH) se requiere generalmente:",
                            "options": ["El número de cuenta del destinatario y la cédula del remitente", "El nombre completo del gerente del banco", "Solo el número telefónico del destinatario", "La fecha de cumpleaños del remitente"],
                            "correctIndex": 0
                        },
                        {
                            "question": "En el software bancario, un 'Lote' (Batch) se refiere a:",
                            "options": ["Un paquete de dinero físico", "Un grupo de transacciones procesadas juntas en el sistema", "El grupo de clientes que espera en la fila", "Los billetes falsos retenidos"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Qué debe hacer un cajero si el sistema bancario se cae temporalmente?",
                            "options": ["Cerrar la sucursal y mandar a los clientes a casa", "Seguir el protocolo de contingencia del banco (ej. procesamiento manual si está autorizado)", "Ir al descanso", "Procesar transacciones de memoria y registrarlas mañana"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Normativas, Seguridad y Prevención de Fraude",
                "lessons": [
                    {
                        "title": "Leyes de secreto bancario y privacidad",
                        "content": "Aprenderás sobre: Leyes de secreto bancario y privacidad",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/xnlLHMwBZZc?si=hpd-VLaI6dmT7c-_\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Prevención de lavado de activos (PLA/FT)",
                        "content": "Aprenderás sobre: Prevención de lavado de activos (PLA/FT)",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/T1mptA5gAcQ?si=GF3BpvZtGCSUtv0r\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Protocolos de seguridad ante asaltos",
                        "content": "Aprenderás sobre: Protocolos de seguridad ante asaltos",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/JVZlVnOGUoU?si=FuD3Ytk1wYHqEPUv\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Cuál es la regla de oro durante un asalto en la sucursal bancaria?",
                            "options": ["Intentar desarmar al asaltante", "Proteger la vida y no oponer resistencia", "Huir corriendo hacia la calle", "Esconder el dinero rápidamente"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Una operación inusual o fraccionada para evadir los límites de reporte legal suele ser un indicador de:",
                            "options": ["Lavado de activos o blanqueo de capitales", "Falla técnica del cajero", "Un cliente muy organizado", "Errores del sistema central"],
                            "correctIndex": 0
                        },
                        {
                            "question": "El secreto bancario prohíbe:",
                            "options": ["Hablar con compañeros sobre procedimientos", "Revelar información sobre las cuentas y saldos de los clientes a terceros no autorizados", "Decir en qué banco trabajas", "Contar billetes frente al cliente"],
                            "correctIndex": 1
                        }
                    ]
                }
            }
        ]
    },
    {
        "title": "Estilismo en Cejas y Pestañas",
        "description": "Diseño de mirada, técnicas de lifting, extensiones y perfilado profesional.",
        "color": "#6A1B9A",
        "category": "Belleza y Estilismo",
        "thumbnail": "assets/courses/estilista_pestanias.png",
        "levels": [
            {
                "title": "Visagismo y Diseño de Mirada",
                "lessons": [
                    {
                        "title": "Morfología del rostro y tipos de ojos",
                        "content": "Aprenderás sobre: Morfología del rostro y tipos de ojos",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Am78AFUV0EE?si=ubiSQdnHyhs0e5wS\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Diseño de cejas con calibrador (Mapping)",
                        "content": "Aprenderás sobre: Diseño de cejas con calibrador (Mapping)",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/yxtDFNZhUeA?si=bWYXdSR1PZUSP62v\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Herramientas y preparación de la piel",
                        "content": "Aprenderás sobre: Herramientas y preparación de la piel",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/y_4k2Kzf1gg?si=jnI9FiWygI5ZWUdJ\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿En qué consiste la técnica de 'Mapping' o visagismo de cejas?",
                            "options": ["En teñir las cejas del color del cabello", "En tomar medidas específicas del rostro para diseñar la ceja ideal según su morfología", "En depilar completamente la ceja y dibujarla con maquillaje", "En aplicar extensiones en cada vello de la ceja"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Según las reglas del visagismo, ¿dónde debería estar el punto más alto (arco) de la ceja?",
                            "options": ["Alineado con la aleta de la nariz y el centro del ojo o el borde externo del iris", "En el centro exacto de la frente", "Donde termina el ojo", "Justo encima del lagrimal"],
                            "correctIndex": 0
                        },
                        {
                            "question": "¿Por qué es importante preparar y limpiar correctamente la piel antes de un diseño de cejas?",
                            "options": ["Para que el hilo o cera duelan menos", "Para retirar exceso de grasa, maquillaje e impurezas, evitando infecciones y mejorando la adherencia de tintes", "Para cambiar el tono de piel del cliente", "Solo por estética y relajación del cliente"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Técnicas de Perfilado y Depilación de Cejas",
                "lessons": [
                    {
                        "title": "Depilación con cera y pinza",
                        "content": "Aprenderás sobre: Depilación con cera y pinza",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/t9r6b7_D8Zs?si=iPwfpgRQ2TcNmi1c\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Técnica de depilación con hilo (Threading)",
                        "content": "Aprenderás sobre: Técnica de depilación con hilo (Threading)",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Uz8o3mFDUnI?si=5_ULigjftNGSPGcr\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Maquillaje y sombreado temporal",
                        "content": "Aprenderás sobre: Maquillaje y sombreado temporal",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/ouTw2fYI_Z4?si=H_FWyZZDUzXVD-75\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Cuál es una ventaja principal de la depilación con hilo (Threading) frente a la cera?",
                            "options": ["Es completamente indolora", "Extrae el vello de raíz sin irritar agresivamente ni arrancar la capa superficial de la piel", "Es más rápida que cualquier otro método", "El vello no vuelve a crecer jamás"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Al utilizar cera tibia para depilar, ¿en qué dirección se debe retirar la banda o cera?",
                            "options": ["Hacia arriba, directo al techo", "En la misma dirección del crecimiento del vello", "En dirección contraria al crecimiento del vello, manteniendo la piel tensa", "Hacia los lados suavemente"],
                            "correctIndex": 2
                        },
                        {
                            "question": "El maquillaje temporal para cejas (sombras o pomadas) tiene como objetivo:",
                            "options": ["Rellenar huecos y definir la forma diseñada sin ser permanente", "Cambiar la estructura ósea del cliente", "Hacer crecer vello nuevo", "Evitar tener que depilar las cejas"],
                            "correctIndex": 0
                        }
                    ]
                }
            },
            {
                "title": "Extensiones y Lifting de Pestañas",
                "lessons": [
                    {
                        "title": "Ciclo de vida y cuidado de las pestañas",
                        "content": "Aprenderás sobre: Ciclo de vida y cuidado de las pestañas",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/hLr_g7cz2d8?si=5XdDy6Dvjap9d1IS\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Proceso paso a paso del Lifting (Rizado)",
                        "content": "Aprenderás sobre: Proceso paso a paso del Lifting (Rizado)",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/KElbabnL4WA?si=zE8VgEQqVAqkRmT6\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Aplicación de extensiones técnica clásica (pelo a pelo)",
                        "content": "Aprenderás sobre: Aplicación de extensiones técnica clásica (pelo a pelo)",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/tN0Q5ua1tGg?si=T9wqm6s9v2K6mntf\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿En qué se diferencia la técnica de extensiones de pestañas 'clásica' (pelo a pelo) del volumen?",
                            "options": ["En la clásica se adhieren tres extensiones por cada pestaña natural", "En la clásica se adhiere una sola extensión a una pestaña natural, aportando longitud y no volumen extra", "La técnica clásica se aplica sobre la piel del párpado", "Solo se usa para pestañas inferiores"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Qué ocurre si no se respeta la distancia de 1 a 2 milímetros de separación entre la piel del párpado y la extensión de pestaña?",
                            "options": ["El adhesivo puede taponar los folículos, causar irritación y alergias severas", "La extensión dura más tiempo", "La pestaña natural crece más rápido", "Se logra un efecto de volumen ruso"],
                            "correctIndex": 0
                        },
                        {
                            "question": "¿Cuál es la función del parche de hidrogel colocado debajo del ojo durante la aplicación?",
                            "options": ["Hidratar profundamente el ojo", "Aislar las pestañas inferiores para que no se peguen con las superiores", "Medir la longitud de las pestañas", "Oscurecer la zona de las ojeras"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Laminado, Tintes y Técnicas Avanzadas",
                "lessons": [
                    {
                        "title": "Laminado (planchado) de cejas",
                        "content": "Aprenderás sobre: Laminado (planchado) de cejas",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/DEwXkrtwMrs?si=VRXWV6Pd3joBT1hq\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Aplicación de henna y tintes semipermanentes",
                        "content": "Aprenderás sobre: Aplicación de henna y tintes semipermanentes",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/JlpHxNiVKoY?si=avDCFa2xf-l--eap\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Volumen ruso y técnicas de volumen",
                        "content": "Aprenderás sobre: Volumen ruso y técnicas de volumen",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/6ueIEai5kwc?si=lM5jjs9O4mdiucE3\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Cuál es el objetivo principal del Laminado (o planchado) de cejas?",
                            "options": ["Eliminar el vello de la ceja por completo", "Alisar, direccionar y fijar los vellos rebeldes para dar un aspecto de mayor grosor y definición", "Pintar la piel permanentemente", "Ocultar cicatrices en la frente"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Al aplicar Henna en las cejas, ¿qué efecto proporciona que no logran los tintes tradicionales de pestañas?",
                            "options": ["La Henna tiñe tanto el vello como la piel debajo, creando un efecto de sombreado o maquillaje temporal", "La Henna aclara el vello oscuro", "La Henna hace que las cejas crezcan onduladas", "Se lava con agua instantáneamente"],
                            "correctIndex": 0
                        },
                        {
                            "question": "En la técnica de Volumen Ruso de pestañas, ¿qué significa el término 'Abanico' (Fan)?",
                            "options": ["La herramienta usada para secar el adhesivo", "El instrumento de medición del ojo", "Un grupo de 2 o más extensiones muy finas unidas en la base que se aplican a una sola pestaña natural", "La forma final de la ceja terminada"],
                            "correctIndex": 2
                        }
                    ]
                }
            }
        ]
    },
    {
        "title": "Uñas Acrílicas",
        "description": "Técnicas avanzadas de aplicación, esculpido y diseño artístico de uñas acrílicas.",
        "color": "#E91E63",
        "category": "Belleza y Estilismo",
        "thumbnail": "assets/courses/unias.png",
        "levels": [
            {
                "title": "Anatomía de la Uña y Bioseguridad",
                "lessons": [
                    {
                        "title": "Estructura y salud de la uña natural",
                        "content": "Aprenderás sobre: Estructura y salud de la uña natural",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/gIBoWdAmBpM?si=FpP_cN5IvWtiejXF\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Protocolos de esterilización e higiene",
                        "content": "Aprenderás sobre: Protocolos de esterilización e higiene",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/2IZeoClbV78?si=iNVmBMteSMR-p1ng\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Preparación correcta de la uña",
                        "content": "Aprenderás sobre: Preparación correcta de la uña",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/MWcUdTHXNwQ?si=hV-mMMlywT_uIHqc\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Cuál es la función de la matriz de la uña?",
                            "options": ["Producir las células que forman la placa ungueal (uña)", "Darle color a la uña", "Almacenar el esmalte", "Evitar que la uña crezca"],
                            "correctIndex": 0
                        },
                        {
                            "question": "¿Qué producto químico se aplica después del limado superficial para deshidratar la uña y equilibrar su pH antes del acrílico?",
                            "options": ["Aceite de cutícula", "Nail Prep (Deshidratador)", "Agua con jabón", "Acetona pura"],
                            "correctIndex": 1
                        },
                        {
                            "question": "En la esterilización de herramientas metálicas (como el empujador de cutícula), ¿qué equipo garantiza la eliminación total de microorganismos y esporas?",
                            "options": ["El esterilizador UV", "Lavar con agua caliente", "El Autoclave o esterilizador de calor seco", "Rociar con alcohol al 70%"],
                            "correctIndex": 2
                        }
                    ]
                }
            },
            {
                "title": "Técnicas de Aplicación Acrílica",
                "lessons": [
                    {
                        "title": "Conocimiento de monómeros y polímeros",
                        "content": "Aprenderás sobre: Conocimiento de monómeros y polímeros",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/UwyM3Bemf10?si=Kz9fV1ejoCfX8VI9\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Control de perlas de acrílico",
                        "content": "Aprenderás sobre: Control de perlas de acrílico",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/T3KVZ5QUusg?si=9wclvFpXQzK8mbQ6\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Colocación de tips y moldes esculturales",
                        "content": "Aprenderás sobre: Colocación de tips y moldes esculturales",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/eseIbqr2Xjc?si=NvJEyvg8wlGHGLnq\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Qué reacción química ocurre cuando se mezcla el polvo acrílico (polímero) con el líquido (monómero)?",
                            "options": ["Condensación", "Polimerización", "Evaporación", "Oxidación"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Para lograr una perla de acrílico perfecta, la proporción recomendada de líquido y polvo generalmente es:",
                            "options": ["Mucha más cantidad de líquido que de polvo", "Mucho más polvo que líquido", "Proporción equilibrada (ej. 1.5 a 1) para que no quede ni muy húmeda ni muy seca", "Solo depende de la temperatura del salón"],
                            "correctIndex": 2
                        },
                        {
                            "question": "Al aplicar un molde o forma escultural, ¿qué es fundamental para que la estructura tenga resistencia y no se rompa fácilmente?",
                            "options": ["Que el molde esté flojo", "Que el molde encaje perfectamente debajo del borde libre formando una curva C adecuada", "Cortar el molde por la mitad", "Usar mucho pegamento"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Esculpido y Modelado Avanzado",
                "lessons": [
                    {
                        "title": "Técnicas de limado y pulido",
                        "content": "Aprenderás sobre: Técnicas de limado y pulido",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/PyaOAuTEC5g?si=ZfXkQQnUaOCDbaN_\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Estructuras avanzadas (Almond, Stiletto, Coffin)",
                        "content": "Aprenderás sobre: Estructuras avanzadas (Almond, Stiletto, Coffin)",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/KdKDJVKXSYc?si=ggxikQ5WCgWmxKMu\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Encapsulado y difuminado (Baby Boomer)",
                        "content": "Aprenderás sobre: Encapsulado y difuminado (Baby Boomer)",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/YVZKxMiv5ko?si=Ndgk39syDluxI4wl\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Qué gramaje de lima es el más adecuado para desvanecer escalones de acrílico y dar forma inicial a la estructura sin dañar la uña natural?",
                            "options": ["Lima 100/100", "Lima 240/240", "Bloque pulidor (Sponge)", "Lima de metal"],
                            "correctIndex": 0
                        },
                        {
                            "question": "La punta de uña 'Coffin' o 'Ballerina' se caracteriza por:",
                            "options": ["Ser completamente redonda", "Tener los laterales rectos que se estrechan hacia una punta cuadrada", "Ser muy afilada como una aguja", "Ser corta y ovalada"],
                            "correctIndex": 1
                        },
                        {
                            "question": "En la técnica de 'Baby Boomer', ¿qué efecto se busca lograr?",
                            "options": ["Un color sólido negro", "Uñas transparentes con flores", "Un difuminado o degradado sutil, típicamente de color blanco en la punta hacia un tono nude/rosa en la base", "Pintar cada uña de un color distinto"],
                            "correctIndex": 2
                        }
                    ]
                }
            },
            {
                "title": "Diseño Artístico y Nail Art",
                "lessons": [
                    {
                        "title": "Teoría del color aplicada a las uñas",
                        "content": "Aprenderás sobre: Teoría del color aplicada a las uñas",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/MNKRUoKcWb0?si=VjiJA_bdD_mkhASp\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Diseños a mano alzada y 3D básico",
                        "content": "Aprenderás sobre: Diseños a mano alzada y 3D básico",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/cOAuY1qpySs?si=lDJeH-nCSftflQ-1\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Aplicación de cristalería y efectos",
                        "content": "Aprenderás sobre: Aplicación de cristalería y efectos",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/BHgOOoalF1U?si=ZhakVzE2NCmdVSst\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "Según la teoría del color, ¿qué colores forman los colores primarios?",
                            "options": ["Naranja, Verde, Violeta", "Rojo, Amarillo, Azul", "Blanco, Negro, Gris", "Rosa, Celeste, Lila"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Qué material es ideal para realizar diseños en 3D sobre la uña terminada?",
                            "options": ["Esmalte tradicional", "Gel de construcción autonivelante", "Acrílico de colores de secado rápido esculpido con un pincel para 3D", "Top coat"],
                            "correctIndex": 2
                        },
                        {
                            "question": "Para asegurar que la cristalería (pedrería) no se caiga rápidamente, el método más recomendado es pegarla con:",
                            "options": ["Esmalte transparente regular", "Gel de construcción o pegamento en resina específico para cristales", "Agua", "Aceite de cutícula"],
                            "correctIndex": 1
                        }
                    ]
                }
            }
        ]
    },
    {
        "title": "Facial y Maquillaje",
        "description": "Tratamientos faciales, técnicas de maquillaje profesional para eventos y editorial.",
        "color": "#D81B60",
        "category": "Belleza y Estilismo",
        "thumbnail": "assets/courses/maquillaje.png",
        "levels": [
            {
                "title": "Tipos de Piel y Tratamientos Faciales",
                "lessons": [
                    {
                        "title": "Diagnóstico de tipos y condiciones de la piel",
                        "content": "Aprenderás sobre: Diagnóstico de tipos y condiciones de la piel",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/EfDe9RzcdCY?si=34R3c27WaW1oGImT\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Limpieza facial profunda y exfoliación",
                        "content": "Aprenderás sobre: Limpieza facial profunda y exfoliación",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/ZOFvFBs_Lhg?si=_V9A7dE9t_dCCY86\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Mascarillas, aparatología básica y masajes faciales",
                        "content": "Aprenderás sobre: Mascarillas, aparatología básica y masajes faciales",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/lVZiQjWFDQA?si=sgxzIa1N0Y4SEygD\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Cuál es la característica principal de una piel de tipo 'grasa'?",
                            "options": ["Poros invisibles y falta de brillo", "Exceso de producción de sebo, poros dilatados y propensión al acné", "Descamación constante y tirantez", "Textura fina como el papel"],
                            "correctIndex": 1
                        },
                        {
                            "question": "El propósito de la exfoliación en una limpieza facial profunda es:",
                            "options": ["Hidratar la piel", "Eliminar las células muertas del estrato córneo para renovar la piel y mejorar la absorción de productos", "Maquillar imperfecciones", "Cerrar los poros permanentemente"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Para qué sirve el vapor de ozono en la aparatología facial básica?",
                            "options": ["Para congelar la piel", "Para dilatar los poros, oxigenar la piel y facilitar la extracción de comedones por su efecto bactericida", "Para aplicar color a las mejillas", "Para eliminar manchas oscuras instantáneamente"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Maquillaje Social y Correcciones",
                "lessons": [
                    {
                        "title": "Preparación de la piel y aplicación de base",
                        "content": "Aprenderás sobre: Preparación de la piel y aplicación de base",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/MnWKrG3HuV8?si=UFbgmJZBGQgJ6RvP\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Visagismo, contouring y correcciones de color",
                        "content": "Aprenderás sobre: Visagismo, contouring y correcciones de color",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/1uV0zO9heJQ?si=en7Y1qBiJxpAoKg5\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Maquillaje de día y de noche (Social)",
                        "content": "Aprenderás sobre: Maquillaje de día y de noche (Social)",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/51oD9RmLI_U?si=y5a8rBL7onPIJgv3\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "En la teoría del color para correcciones (colorimetría), ¿qué color de corrector neutraliza las ojeras o manchas de tono azulado/morado?",
                            "options": ["Corrector verde", "Corrector lila", "Corrector salmón, naranja o amarillo", "Corrector blanco"],
                            "correctIndex": 2
                        },
                        {
                            "question": "El objetivo del 'Contouring' o técnica del claro-oscuro es:",
                            "options": ["Aplicar un solo tono en todo el rostro", "Crear dimensiones resaltando puntos de luz (volumen) y ocultando o afinando zonas con sombras (profundidad)", "Pintar los labios de colores oscuros", "Sellar el maquillaje"],
                            "correctIndex": 1
                        },
                        {
                            "question": "La principal diferencia entre un maquillaje de día y uno de noche suele ser:",
                            "options": ["El maquillaje de día utiliza tonos más suaves, naturales y mates, mientras que el de noche permite mayor intensidad, dramatismo y brillos", "El de día requiere pestañas postizas gigantes y el de noche no", "El de día se hace sin base de maquillaje", "No hay ninguna diferencia"],
                            "correctIndex": 0
                        }
                    ]
                }
            },
            {
                "title": "Maquillaje para Eventos y Novias",
                "lessons": [
                    {
                        "title": "Entrevista y prueba de maquillaje para novias",
                        "content": "Aprenderás sobre: Entrevista y prueba de maquillaje para novias",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Qvs_b4lwgnI?si=KceXj5qu7wVGuuJx\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Técnicas de larga duración (Waterproof)",
                        "content": "Aprenderás sobre: Técnicas de larga duración (Waterproof)",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/W56vrxpCnRk?si=eKONpIKySDo9hEUR\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Maquillaje para madrinas y cortejo",
                        "content": "Aprenderás sobre: Maquillaje para madrinas y cortejo",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/GCVgFFiMQkI?si=k8pnROTTFmrxktpO\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Por qué es crucial la 'Prueba de Maquillaje' previa a la boda para una novia?",
                            "options": ["Solo para cobrar más", "Para diseñar el look ideal en base a sus gustos, probar la durabilidad de los productos y evitar alergias o sorpresas el día del evento", "Para enseñarle a maquillarse sola", "Para gastar los productos vencidos"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Qué producto es esencial utilizar antes de la base para garantizar la técnica Waterproof (a prueba de agua) y la larga duración del maquillaje?",
                            "options": ["Agua micelar", "Un primer (prebase) adecuado al tipo de piel y productos de fijación en spray", "Crema corporal", "Sombra de ojos en polvo"],
                            "correctIndex": 1
                        },
                        {
                            "question": "En el maquillaje para el cortejo o madrinas, la regla general de etiqueta indica que:",
                            "options": ["Deben ir maquilladas más llamativas que la novia", "Su maquillaje debe ser elegante pero armónico, sin opacar a la novia", "No deben usar base", "Deben usar exclusivamente sombras negras"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Maquillaje Editorial y Tendencias",
                "lessons": [
                    {
                        "title": "Ojos ahumados (Smokey eyes) y Cut crease",
                        "content": "Aprenderás sobre: Ojos ahumados (Smokey eyes) y Cut crease",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/RiWGgr4RiRU?si=X6X6CQ4afSilcvPJ\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Delineados gráficos y uso de color",
                        "content": "Aprenderás sobre: Delineados gráficos y uso de color",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/tq4Gumvm-_A?si=zNLFQU7RMzRJycuR\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Maquillaje para fotografía y pasarela",
                        "content": "Aprenderás sobre: Maquillaje para fotografía y pasarela",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/pb9X2EPSBeg?si=y8KwlywVK60eLc1d\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "La técnica de 'Cut Crease' (corte de cuenca) se caracteriza por:",
                            "options": ["Difuminar todos los colores hasta que no se distingan", "Marcar y limpiar la cuenca del ojo con corrector para crear un contraste agudo y definido entre el párpado móvil y el fijo", "No utilizar sombras, solo delineador", "Aplicar rubor en los ojos"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Qué factor técnico altera drásticamente cómo se ve el maquillaje en fotografía o pasarela?",
                            "options": ["El tipo de zapatos del modelo", "La iluminación (flashes, luces de estudio) que tiende a 'comer' o disminuir la intensidad del color hasta en un 30%", "El color de uñas del maquillador", "La hora del día al aire libre exclusivamente"],
                            "correctIndex": 1
                        },
                        {
                            "question": "A diferencia del maquillaje social, el maquillaje editorial permite:",
                            "options": ["Ser extremadamente sutil e imperceptible", "Explorar la creatividad sin límites, usando texturas inusuales, colores vibrantes y formas exageradas (Avant-garde)", "Usar solo tonos marrones", "Omitir la preparación de la piel"],
                            "correctIndex": 1
                        }
                    ]
                }
            }
        ]
    },
    {
        "title": "Secretaria Recepcionista y Servicio al Cliente",
        "description": "Domina las habilidades de oficina, gestión administrativa y atención al cliente profesional.",
        "color": "#1565C0",
        "category": "Administración",
        "thumbnail": "assets/courses/secretaria.png",
        "levels": [
            {
                "title": "Fundamentos de la Administración de Oficina",
                "lessons": [
                    {
                        "title": "El rol de la secretaria",
                        "content": "Aprenderás sobre: El rol de la secretaria",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/vSaLOaMlnBY?si=KVKvCDe7LNEUb-ml\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Organización del espacio y tiempo",
                        "content": "Aprenderás sobre: Organización del espacio y tiempo",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/pXBSYcWYGoQ?si=6t5P0g9w8dNFGa75\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Ética y presentación profesional",
                        "content": "Aprenderás sobre: Ética y presentación profesional",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/v97WAu3ZW7Q?si=Mn0dfYGgLoKt61EA\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Cuál es uno de los roles principales de una secretaria o recepcionista en una organización moderna?",
                            "options": ["Ser la única encargada de limpiar la oficina", "Ser el primer punto de contacto de la empresa, gestionando el flujo de información y proyectando la imagen corporativa", "Tomar decisiones estratégicas financieras", "Reparar los equipos de cómputo"],
                            "correctIndex": 1
                        },
                        {
                            "question": "En la organización del tiempo, ¿qué significa priorizar tareas?",
                            "options": ["Hacer todas las tareas al mismo tiempo", "Hacer primero lo que más nos gusta", "Clasificar las tareas según su urgencia e importancia para gestionar el tiempo de forma eficiente", "Delegar todas las tareas a los compañeros"],
                            "correctIndex": 2
                        },
                        {
                            "question": "La ética profesional de una secretaria incluye fundamentalmente:",
                            "options": ["La confidencialidad y el manejo discreto de la información sensible de la empresa", "Llegar tarde frecuentemente", "Hablar de los problemas personales con los clientes", "Ignorar las directrices del jefe directo"],
                            "correctIndex": 0
                        }
                    ]
                }
            },
            {
                "title": "Comunicación Empresarial y Protocolo",
                "lessons": [
                    {
                        "title": "Redacción de documentos comerciales",
                        "content": "Aprenderás sobre: Redacción de documentos comerciales",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/vUnv5fTTa1c?si=-06-VtHFJ3iSyyUq\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Comunicación telefónica y etiqueta",
                        "content": "Aprenderás sobre: Comunicación telefónica y etiqueta",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/opf4K_vwTog?si=VdFa-5T7C8n1UR0m\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Protocolo en atención presencial",
                        "content": "Aprenderás sobre: Protocolo en atención presencial",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/zU7_YI8oC7k?si=rZyYf-fHvPvHjKCh\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "Al redactar un correo electrónico comercial formal, es indispensable incluir:",
                            "options": ["Muchos emojis y colores", "Un asunto claro, saludo formal, cuerpo conciso del mensaje y firma con datos de contacto", "Solamente el archivo adjunto sin texto", "Bromas para romper el hielo"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Cuál es la regla de oro en la etiqueta de comunicación telefónica empresarial?",
                            "options": ["Dejar sonar el teléfono más de 10 veces antes de contestar", "Contestar antes del tercer timbre, identificar a la empresa, dar el nombre de quien habla y ofrecer ayuda amablemente", "Poner al cliente en espera sin avisarle", "Hablar mientras se come"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Al recibir a un visitante en la recepción (atención presencial), lo correcto es:",
                            "options": ["Ignorarlo hasta terminar de escribir un mensaje de texto", "Hacer contacto visual inmediato, saludar cordialmente, preguntar su nombre y el motivo de su visita", "Pedirle que espere afuera de la oficina", "Hablarle en voz alta desde lejos"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Gestión Documental y Herramientas Digitales",
                "lessons": [
                    {
                        "title": "Sistemas de archivo físico y digital",
                        "content": "Aprenderás sobre: Sistemas de archivo físico y digital",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/vcnAyMqnfhY?si=i0UdPbFaztVXwulb\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Uso de Microsoft Word y Excel básico",
                        "content": "Aprenderás sobre: Uso de Microsoft Word y Excel básico",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/xXvL5RwU1sw?si=CZFpiqf20zS1LXTR\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Gestión de correos y agendas electrónicas",
                        "content": "Aprenderás sobre: Gestión de correos y agendas electrónicas",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/QuH8L7eY7yc?si=oQ7a3HrePB2fSr5r\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Por qué es vital mantener un sistema de archivo físico y digital bien organizado?",
                            "options": ["Para que la oficina se vea bonita", "Para garantizar la recuperación rápida y precisa de información importante, ahorrando tiempo y evitando pérdida de documentos", "Para esconder documentos de los jefes", "Para gastar menos papel"],
                            "correctIndex": 1
                        },
                        {
                            "question": "En Microsoft Word, la herramienta 'Combinar correspondencia' es muy útil en la oficina para:",
                            "options": ["Crear hojas de cálculo financieras complejas", "Editar fotografías y logos de la empresa", "Crear y enviar cartas o etiquetas personalizadas de forma masiva a una lista de contactos", "Diseñar la página web de la empresa"],
                            "correctIndex": 2
                        },
                        {
                            "question": "Al gestionar la agenda electrónica del jefe o del departamento, se debe tener especial cuidado con:",
                            "options": ["El color del fondo de la agenda", "Evitar el solapamiento (cruces) de reuniones, calcular tiempos de traslado y coordinar zonas horarias si aplica", "Anotar únicamente las reuniones los días viernes", "Borrar todas las citas pasadas inmediatamente"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Servicio al Cliente y Resolución de Conflictos",
                "lessons": [
                    {
                        "title": "Principios del servicio de excelencia",
                        "content": "Aprenderás sobre: Principios del servicio de excelencia",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/p1G3dt0isCg?si=zGn-fjTnjGzRcjhb\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Manejo de quejas y clientes difíciles",
                        "content": "Aprenderás sobre: Manejo de quejas y clientes difíciles",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/wpSBLTr1UFI?si=JPvb53C41PYqIXgD\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Fidelización y seguimiento post-atención",
                        "content": "Aprenderás sobre: Fidelización y seguimiento post-atención",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/gCeE0igj9kc?si=tNDb1MTjep_PThvI\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Cuál es la base de un 'servicio de excelencia'?",
                            "options": ["Dar siempre la razón al cliente, aunque se equivoque", "Superar las expectativas del cliente, mostrando empatía, cortesía y eficiencia resolutiva", "Ofrecer descuentos a todos los clientes", "Atender lo más rápido posible sin importar la calidad"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Cuál es la técnica adecuada para manejar a un cliente molesto o quejumbroso?",
                            "options": ["Escuchar activamente sin interrumpir, mantener la calma, empatizar con su frustración y proponer una solución clara", "Levantar la voz para imponer respeto", "Culpar a otro departamento", "Ignorarlo hasta que se calme solo"],
                            "correctIndex": 0
                        },
                        {
                            "question": "¿Para qué sirve el seguimiento post-atención (post-venta)?",
                            "options": ["Para pedir donaciones", "Para verificar que el cliente quedó satisfecho con la solución, fortaleciendo la confianza y la fidelidad hacia la empresa", "Solo para enviar publicidad invasiva", "Para cumplir con un requisito legal únicamente"],
                            "correctIndex": 1
                        }
                    ]
                }
            }
        ]
    },
    {
        "title": "Inglés Básico",
        "description": "Fundamentos del idioma inglés para comunicación esencial en el entorno personal y laboral.",
        "color": "#283593",
        "category": "Idiomas",
        "thumbnail": "assets/courses/ingles.png",
        "levels": [
            {
                "title": "Alfabeto, Pronunciación y Gramática Básica",
                "lessons": [
                    {
                        "title": "El alfabeto y los sonidos del inglés",
                        "content": "Aprenderás sobre: El alfabeto y los sonidos del inglés",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/I2SaZnEjmZw?si=PIWbnelk71DHFnYt\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Artículos, pronombres y verbo To Be",
                        "content": "Aprenderás sobre: Artículos, pronombres y verbo To Be",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/8u0cqCp49qw?si=cX6pZ6u4qUpeWRps\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Presente simple: afirmativo, negativo e interrogativo",
                        "content": "Aprenderás sobre: Presente simple: afirmativo, negativo e interrogativo",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Q8uM69aN95E?si=PoIx_bGQOHl4UoI-\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Cuál es la forma correcta del verbo 'To Be' para el pronombre 'He' (Él)?",
                            "options": ["Am", "Are", "Is", "Be"],
                            "correctIndex": 2
                        },
                        {
                            "question": "En el presente simple (Present Simple), ¿qué auxiliar se usa para hacer una pregunta con los pronombres 'I, You, We, They'?",
                            "options": ["Does", "Do", "Are", "Is"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Cuál es la traducción correcta de 'Ellos son mis amigos'?",
                            "options": ["They is my friends", "We are my friends", "They are my friends", "He are my friends"],
                            "correctIndex": 2
                        }
                    ]
                }
            },
            {
                "title": "Vocabulario Cotidiano y Frases Esenciales",
                "lessons": [
                    {
                        "title": "Días y meses",
                        "content": "Aprenderás sobre: Días y meses",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/5o9rgTQCYtU?si=ckHZDUXtFYZeYM-4\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "La familia, el hogar y el trabajo",
                        "content": "Aprenderás sobre: La familia, el hogar y el trabajo",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/TZ6eC2EMstQ?si=gtX5m_zkjZGqCqTF\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Saludos, presentaciones y frases de cortesía",
                        "content": "Aprenderás sobre: Saludos, presentaciones y frases de cortesía",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/ppaIJuPyzEc?si=-rha2aCjBIZkzKdA\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "Si alguien te dice 'Nice to meet you' (Encantado de conocerte), una respuesta educada común es:",
                            "options": ["Goodbye", "Nice to meet you too", "What is your name?", "I am fine"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Cómo se dice 'Jueves' en inglés?",
                            "options": ["Tuesday", "Friday", "Thursday", "Wednesday"],
                            "correctIndex": 2
                        },
                        {
                            "question": "¿Cuál de las siguientes palabras significa 'Hermano' en inglés?",
                            "options": ["Father", "Sister", "Uncle", "Brother"],
                            "correctIndex": 3
                        }
                    ]
                }
            },
            {
                "title": "Lectura, Escritura y Comprensión Auditiva",
                "lessons": [
                    {
                        "title": "Comprensión de textos cortos en inglés",
                        "content": "Aprenderás sobre: Comprensión de textos cortos en inglés",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/fBx7_0349m4?si=nLA3AhiuY0vpGcml\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Escritura de oraciones y párrafos sencillos",
                        "content": "Aprenderás sobre: Escritura de oraciones y párrafos sencillos",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/h-mdJt22aOQ?si=gWe6eOlkr7zqxqni\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Ejercicios de escucha: canciones y diálogos",
                        "content": "Aprenderás sobre: Ejercicios de escucha: canciones y diálogos",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Dyseutv1HjQ?si=OJz28x43-IHWTLjn\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "Lee la siguiente oración y complétala: 'She ____ reading a book in the living room.'",
                            "options": ["am", "is", "are", "do"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Qué significa la palabra 'Listen' en español?",
                            "options": ["Hablar", "Escribir", "Escuchar", "Cantar"],
                            "correctIndex": 2
                        },
                        {
                            "question": "Si un texto dice 'The dog is brown and small', ¿qué sabemos sobre el perro?",
                            "options": ["Que es negro y grande", "Que es marrón y pequeño", "Que es blanco y ruidoso", "Que está corriendo rápido"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Conversación Práctica y Situaciones Reales",
                "lessons": [
                    {
                        "title": "Inglés en el trabajo: entrevistas y correos",
                        "content": "Aprenderás sobre: Inglés en el trabajo: entrevistas y correos",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/QWlFFWAT_O8?si=vGKY9w0oxkvzXp21\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Situaciones cotidianas: tienda, banco, aeropuerto",
                        "content": "Aprenderás sobre: Situaciones cotidianas: tienda, banco, aeropuerto",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/16tEitdsgXc?si=e4AMvmglq18HJ1_i\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Práctica de diálogos y role-play",
                        "content": "Aprenderás sobre: Práctica de diálogos y role-play",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/GiceHe_lZFY?si=zEFHYhnvEiq_vLM-\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "Estás en una tienda y quieres saber el precio de una camisa. ¿Qué preguntas?",
                            "options": ["Where is the shirt?", "How much is this shirt?", "What time is it?", "Do you like shirts?"],
                            "correctIndex": 1
                        },
                        {
                            "question": "En una entrevista de trabajo te dicen 'Tell me about yourself'. ¿Qué te están pidiendo?",
                            "options": ["Que les hables sobre ti mismo", "Que les digas la hora", "Que deletrees tu nombre", "Que les des tu número de teléfono"],
                            "correctIndex": 0
                        },
                        {
                            "question": "Estás en un restaurante y quieres pedir la cuenta. ¿Cómo lo dices?",
                            "options": ["The menu, please", "Where is the bathroom?", "The bill (or check), please", "More water, please"],
                            "correctIndex": 2
                        }
                    ]
                }
            }
        ]
    },
    {
        "title": "Auxiliar en Farmacia",
        "description": "Gestión farmacéutica, atención en dispensación de medicamentos y normativas sanitarias.",
        "color": "#00897B",
        "category": "Salud",
        "thumbnail": "assets/courses/farmacia.png",
        "levels": [
            {
                "title": "Introducción a la Farmacología",
                "lessons": [
                    {
                        "title": "Conceptos básicos de medicamentos",
                        "content": "Aprenderás sobre: Conceptos básicos de medicamentos",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/d5O8ZGwTlag?si=sLLYNw-IcBzSSAoi\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Vías de administración de fármacos",
                        "content": "Aprenderás sobre: Vías de administración de fármacos",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/uAZeLSVG3W0?si=ODDwpHS0hiMCbnfT\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Lectura e interpretación de recetas",
                        "content": "Aprenderás sobre: Lectura e interpretación de recetas",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/X66H0-sdaKA?si=7YzuQNsV3zUe8dpt\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Qué estudia la Farmacocinética?",
                            "options": ["El efecto que hace el fármaco en el cuerpo", "Lo que el organismo le hace al fármaco (absorción, distribución, metabolismo y excreción)", "El diseño del empaque del medicamento", "El costo de las medicinas"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Cuál de las siguientes es una vía de administración de fármacos parenteral?",
                            "options": ["Vía Oral (cápsulas)", "Vía Sublingual", "Vía Intravenosa (inyección en la vena)", "Vía Tópica (crema)"],
                            "correctIndex": 2
                        },
                        {
                            "question": "En una receta médica, ¿qué significa la abreviatura 'c/8h'?",
                            "options": ["Tomar 8 pastillas juntas", "Tomar el medicamento cada 8 horas", "Que el tratamiento dura 8 horas en total", "Que cuesta 8 dólares"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Dispensación y Clasificación de Medicamentos",
                "lessons": [
                    {
                        "title": "Grupos farmacológicos principales",
                        "content": "Aprenderás sobre: Grupos farmacológicos principales",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/kvHMSlfeAqg?si=fCecYS0Fbf-KqCbr\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Medicamentos genéricos vs de marca",
                        "content": "Aprenderás sobre: Medicamentos genéricos vs de marca",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/1OQ00aTGqbw?si=c9mFihpCS2OESspM\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Proceso seguro de dispensación",
                        "content": "Aprenderás sobre: Proceso seguro de dispensación",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/NsOPkDXeI1Y?si=A1UvdJHYu82S6G_M\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿A qué grupo farmacológico pertenecen medicamentos como el Ibuprofeno o el Diclofenaco?",
                            "options": ["Antibióticos", "Antihistamínicos", "AINEs (Antiinflamatorios no esteroideos)", "Antidepresivos"],
                            "correctIndex": 2
                        },
                        {
                            "question": "¿Cuál es la principal diferencia entre un medicamento de marca y uno genérico?",
                            "options": ["El genérico no funciona", "Tienen el mismo principio activo y eficacia, pero el genérico suele ser más económico al no pagar patentes ni marketing", "El genérico es solo para animales", "El de marca no tiene efectos secundarios"],
                            "correctIndex": 1
                        },
                        {
                            "question": "En el proceso seguro de dispensación, si tienes dudas sobre la letra del médico en la receta, ¿qué debes hacer?",
                            "options": ["Adivinar y entregar el medicamento que suene parecido", "Contactar al médico que prescribió o consultar con el farmacéutico regente para evitar un error de medicación fatal", "Darle al paciente vitaminas", "Decirle al paciente que elija él mismo"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Atención al Paciente y Farmacovigilancia",
                "lessons": [
                    {
                        "title": "Comunicación efectiva en mostrador",
                        "content": "Aprenderás sobre: Comunicación efectiva en mostrador",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/TuLk7xuZ-6o?si=rzZsRXAiCmF8dIe3\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Identificación de reacciones adversas",
                        "content": "Aprenderás sobre: Identificación de reacciones adversas",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/L3UdW02KLc8?si=EX83qaylTqRl_hyE\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Educación sobre uso de medicamentos",
                        "content": "Aprenderás sobre: Educación sobre uso de medicamentos",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/2IazyBnFHZs?si=Je9lhGjkXbZbVVLI\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Qué es la Farmacovigilancia?",
                            "options": ["La vigilancia de que no roben en la farmacia", "La ciencia y actividades relativas a la detección, evaluación, comprensión y prevención de los efectos adversos de los medicamentos", "Vigilar que los medicamentos estén limpios", "Revisar las recetas médicas únicamente"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Si un paciente reporta una erupción cutánea grave inmediatamente después de tomar un nuevo antibiótico, podría ser indicio de:",
                            "options": ["Que el medicamento está haciendo efecto", "Una Reacción Adversa al Medicamento (RAM) o alergia grave que debe reportarse y evaluarse por un médico", "Falta de vitaminas", "Sed"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Al educar al paciente sobre el uso de su medicamento, es fundamental indicarle:",
                            "options": ["Que puede dejar de tomarlo en cuanto se sienta mejor, especialmente si son antibióticos", "La dosis correcta, la frecuencia, si debe tomarlo con comidas o en ayunas, y la importancia de completar el tratamiento", "Que lo comparta con su familia si tienen los mismos síntomas", "Que tire la caja a la basura"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Gestión de Inventario y Normativas Sanitarias",
                "lessons": [
                    {
                        "title": "Control de stock y fechas de caducidad",
                        "content": "Aprenderás sobre: Control de stock y fechas de caducidad",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/e6b1FAV3aao?si=NmI7jF73o2DEHc2R\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Manejo de medicamentos controlados",
                        "content": "Aprenderás sobre: Manejo de medicamentos controlados",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Kn8K7dPlP9g?si=Dx3yQCuf_tXo_bp-\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Legislación y buenas prácticas",
                        "content": "Aprenderás sobre: Legislación y buenas prácticas",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/jXvyJdka5NM?si=F9AEbT0EDUU-f2MA\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Qué método se utiliza comúnmente en las farmacias para organizar los medicamentos y evitar caducidades (Método FEFO/FIFO)?",
                            "options": ["El primero que caduca es el primero que sale (First Expired, First Out)", "Guardar los más nuevos adelante y los viejos atrás", "Mezclarlos todos al azar", "Vender siempre primero los más caros"],
                            "correctIndex": 0
                        },
                        {
                            "question": "En cuanto al manejo de medicamentos controlados (ej. psicotrópicos, estupefacientes), ¿cuál es una norma estricta?",
                            "options": ["Pueden venderse libremente si el paciente insiste", "Deben estar guardados bajo llave, requieren receta médica especial retenida y se debe llevar un libro de control exhaustivo", "Se pueden regalar muestras médicas", "No tienen fecha de caducidad"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Las 'Buenas Prácticas de Almacenamiento' en una farmacia exigen:",
                            "options": ["Mantener los medicamentos a temperatura y humedad controlada para asegurar su estabilidad", "Dejar los medicamentos bajo el sol directo", "Guardar la comida en la misma nevera que la insulina", "Mantener los medicamentos en el suelo"],
                            "correctIndex": 0
                        }
                    ]
                }
            }
        ]
    },
    {
        "title": "Reparación y Mantenimiento de Celulares",
        "description": "Servicio técnico de hardware y software para dispositivos móviles de todas las marcas.",
        "color": "#E65100",
        "category": "Tecnología",
        "thumbnail": "assets/courses/celulares.png",
        "levels": [
            {
                "title": "Electrónica Básica y Componentes Móviles",
                "lessons": [
                    {
                        "title": "Ley de Ohm y circuitos básicos",
                        "content": "Aprenderás sobre: Ley de Ohm y circuitos básicos",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Az9YgKQ_UH4?si=XOmVU8_PUJlDfjWu\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Componentes internos del smartphone (placa, batería, pantalla)",
                        "content": "Aprenderás sobre: Componentes internos del smartphone (placa, batería, pantalla)",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/ih8TdEh-dpc?si=ntUAuk-75sPlWAJD\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Uso seguro del multímetro y herramientas de servicio",
                        "content": "Aprenderás sobre: Uso seguro del multímetro y herramientas de servicio",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Z1pxudDk-BM?si=p86twoXdYshFTc9E\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "Según la Ley de Ohm, ¿cuál es la relación básica entre Voltaje (V), Corriente (I) y Resistencia (R)?",
                            "options": ["V = I / R", "V = I x R", "I = V x R", "R = V x I"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Para qué se utiliza principalmente el multímetro en la reparación de celulares?",
                            "options": ["Para cargar la batería más rápido", "Para medir magnitudes eléctricas como voltaje, continuidad y resistencia, ayudando a diagnosticar fallas", "Para soldar componentes a la placa base", "Para actualizar el software del teléfono"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Si mides 'continuidad' en un circuito cerrado y en buen estado con el multímetro, ¿qué debería suceder?",
                            "options": ["El multímetro apaga el celular", "El multímetro emitirá un pitido (beep) indicando que la corriente puede fluir libremente", "El multímetro marcará 0 Voltios", "El multímetro se reiniciará"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Diagnóstico y Reparación de Hardware",
                "lessons": [
                    {
                        "title": "Proceso de desmontaje sin daños",
                        "content": "Aprenderás sobre: Proceso de desmontaje sin daños",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/mnAjqsA-mkk?si=zcbLz_zBDwRAj2Kh\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Cambio de pantalla, botones y conectores",
                        "content": "Aprenderás sobre: Cambio de pantalla, botones y conectores",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/6oRQdtt4g3I?si=gkpXOHT1gFnL4ArG\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Reparación de cámaras, altavoces y micrófonos",
                        "content": "Aprenderás sobre: Reparación de cámaras, altavoces y micrófonos",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/bnttvL56_kg?si=zNC-JiM00dnZUpzY\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Qué herramienta es indispensable para aflojar el adhesivo de las pantallas o tapas traseras sin romperlas?",
                            "options": ["Un martillo", "Una plancha de calor o pistola de calor aplicada a temperatura controlada", "Un destornillador plano", "Pegamento líquido"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Al conectar una pantalla nueva para probarla antes de pegarla definitivamente, ¿qué precaución principal debes tomar?",
                            "options": ["Asegurarse de que el equipo esté apagado y la batería desconectada para evitar cortocircuitos en la placa base", "Conectarla mientras el equipo está cargando", "Echarle agua a los conectores para limpiarlos", "Pegarla primero y luego probarla"],
                            "correctIndex": 0
                        },
                        {
                            "question": "Si el usuario reporta que no lo escuchan cuando hace llamadas, ¿qué componente de hardware es el principal sospechoso?",
                            "options": ["El altavoz (buzzer)", "El motor de vibración", "El micrófono inferior", "La cámara frontal"],
                            "correctIndex": 2
                        }
                    ]
                }
            },
            {
                "title": "Software, Sistemas Operativos y Desbloqueo",
                "lessons": [
                    {
                        "title": "Flasheo e instalación de firmware (Android/iOS)",
                        "content": "Aprenderás sobre: Flasheo e instalación de firmware (Android/iOS)",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Y0Cf3fAeLgU?si=DyUTciKjnNszU0yc\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Restablecimiento de fábrica y solución de fallas de software",
                        "content": "Aprenderás sobre: Restablecimiento de fábrica y solución de fallas de software",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/szgUGJmwCwQ?si=DHfzowOh4hUhYixQ\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Desbloqueo de red y bypass de FRP",
                        "content": "Aprenderás sobre: Desbloqueo de red y bypass de FRP",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/iiltHl_r-jw?si=wLNF54uJt-lj2bym\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Qué significa 'Flashear' un dispositivo móvil?",
                            "options": ["Tomarle una foto con flash", "Limpiar la pantalla con alcohol", "Reinstalar o actualizar el sistema operativo (firmware) utilizando software especializado", "Cambiar la batería"],
                            "correctIndex": 2
                        },
                        {
                            "question": "¿Qué es el bloqueo FRP (Factory Reset Protection) en Android?",
                            "options": ["Un bloqueo que impide instalar aplicaciones de juegos", "Un sistema de seguridad que, tras un reseteo de fábrica no autorizado, exige ingresar la cuenta de Google vinculada previamente", "Un código para usar internet gratis", "Un bloqueo de la tarjeta SIM"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Para forzar un reinicio (Hard Reset) desde el modo Recovery en un celular Android que no pasa del logo, generalmente se utiliza una combinación de:",
                            "options": ["Tocar la pantalla 10 veces", "Botones físicos (Ej: Volumen Arriba + Encendido)", "Llamar al servicio al cliente", "Conectar audífonos"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Micro-soldadura y Reparaciones Avanzadas",
                "lessons": [
                    {
                        "title": "Uso seguro de la estación de soldadura",
                        "content": "Aprenderás sobre: Uso seguro de la estación de soldadura",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/yyjzvgMboqE?si=WjCrW-qEb4C673qE\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Cambio de IC de carga y chips secundarios",
                        "content": "Aprenderás sobre: Cambio de IC de carga y chips secundarios",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/hW1c8jU7q5Q?si=jT89rzprOiGjTbUx\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Diagnóstico de fallas en placa base",
                        "content": "Aprenderás sobre: Diagnóstico de fallas en placa base",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/cIAZOPFhHes?si=VGONwp-aWkikzcSs\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Qué es un 'IC' en la placa base de un teléfono?",
                            "options": ["Integrated Circuit (Circuito Integrado), un microchip que controla funciones específicas como carga, audio o táctil", "Internet Connection (Conexión a Internet)", "Internal Camera (Cámara Interna)", "Un tipo de batería"],
                            "correctIndex": 0
                        },
                        {
                            "question": "En micro-soldadura, ¿para qué se utiliza el 'Flux' (fundente)?",
                            "options": ["Para limpiar la pantalla", "Para ayudar a que el estaño fluya correctamente, limpiar la oxidación y evitar soldaduras frías o puentes", "Para pegar el cristal protector", "Para aislar eléctricamente los componentes"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Qué método se utiliza frecuentemente para detectar un cortocircuito en la placa base que genera calor?",
                            "options": ["Meter el teléfono al congelador", "Aplicar rocío congelante (Rosin) o usar una cámara térmica para ver qué componente se calienta al inyectar voltaje", "Oler la placa", "Usar una lupa simple"],
                            "correctIndex": 1
                        }
                    ]
                }
            }
        ]
    },
    {
        "title": "Estilista en Belleza",
        "description": "Formación integral en técnicas de estilismo, corte, colorimetría y cuidado capilar profesional.",
        "color": "#AD1457",
        "category": "Belleza y Estilismo",
        "thumbnail": "assets/courses/estilista_belleza.png",
        "levels": [
            {
                "title": "Fundamentos del Estilismo y Cosmetología",
                "lessons": [
                    {
                        "title": "Bioseguridad e higiene en el salón",
                        "content": "Aprenderás sobre: Bioseguridad e higiene en el salón",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/xapbBoSQW8Q?si=XCrd2AY1SlRiDIW0\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Herramientas y productos profesionales",
                        "content": "Aprenderás sobre: Herramientas y productos profesionales",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/zhtF4iUC-YA?si=zq6ZXjfGbeoIiKF4\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Anatomía capilar y tipos de cabello",
                        "content": "Aprenderás sobre: Anatomía capilar y tipos de cabello",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/6gf2_uU_dAI?si=ijkmV69KGRIxwo6K\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Cuál es la capa más externa del cabello que lo protege y determina su porosidad?",
                            "options": ["La médula", "La corteza", "La cutícula", "El folículo"],
                            "correctIndex": 2
                        },
                        {
                            "question": "¿Qué significa que un cabello tenga 'porosidad alta'?",
                            "options": ["Que repele el agua y los químicos", "Que la cutícula está muy abierta, absorbe líquidos rápidamente pero también pierde hidratación y color con facilidad", "Que el cabello es muy brillante y sano", "Que crece muy rápido"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Por qué es crucial la bioseguridad en el salón de belleza?",
                            "options": ["Para que el salón huela bien", "Para prevenir la transmisión de enfermedades infecciosas, hongos y bacterias entre clientes y estilistas", "Para cobrar más caro", "Para evitar que el cabello se caiga"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Técnicas de Corte y Peinado",
                "lessons": [
                    {
                        "title": "Cortes básicos y visagismo",
                        "content": "Aprenderás sobre: Cortes básicos y visagismo",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/GYGnnzTI24g?si=DUIj8SmZuXAzT3z5\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Técnicas de secado y cepillado (Brushing)",
                        "content": "Aprenderás sobre: Técnicas de secado y cepillado (Brushing)",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/v0FY86rGVmw?si=pOYP4Y7J1taNOllr\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Peinados sociales y trenzados",
                        "content": "Aprenderás sobre: Peinados sociales y trenzados",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/3XTeGh_CAao?si=kYWUmSfpClwJ8eMg\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "En el corte de cabello, ¿qué efecto se logra al cortar en un ángulo de 90 grados?",
                            "options": ["Un corte completamente recto y pesado", "Un efecto de capas (Layering) que distribuye el volumen uniformemente", "Un corte al ras con máquina", "Rizos permanentes"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Qué es el 'visagismo' aplicado al corte de cabello?",
                            "options": ["Cortar el cabello con los ojos cerrados", "El estudio de la forma del rostro del cliente para diseñar un corte que resalte sus facciones y disimule imperfecciones", "La técnica de usar tijeras dentadas", "Un tipo de tinte rubio"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Para realizar un 'Brushing' (secado y moldeado) que aporte volumen en la raíz, ¿cómo se debe dirigir el aire del secador?",
                            "options": ["Hacia abajo aplastando el cabello", "En dirección contraria al crecimiento del cabello (levantando la raíz)", "Solo en las puntas", "Con aire frío únicamente"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Colorimetría y Tratamientos Capilares",
                "lessons": [
                    {
                        "title": "Teoría del color y estrella de Oswald",
                        "content": "Aprenderás sobre: Teoría del color y estrella de Oswald",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/ghTeLDyTiV8?si=0snTe5ehb9jE6LdQ\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Técnicas de aplicación de tinte y decoloración",
                        "content": "Aprenderás sobre: Técnicas de aplicación de tinte y decoloración",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/ZyT7hmm7Azw?si=fDwaLE-ZK1Zk6evP\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Tratamientos de hidratación y keratina",
                        "content": "Aprenderás sobre: Tratamientos de hidratación y keratina",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/7d8QvoAz6x8?si=1ZGSN19ToW724YEn\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "Según la Estrella de Oswald en colorimetría, ¿qué color neutraliza los reflejos amarillos no deseados en una decoloración?",
                            "options": ["El verde", "El rojo", "El violeta / morado", "El azul"],
                            "correctIndex": 2
                        },
                        {
                            "question": "¿Qué función cumple el peróxido de hidrógeno (agua oxigenada) al mezclarlo con un tinte permanente?",
                            "options": ["Lavar el cabello", "Abrir la cutícula y oxidar los pigmentos para revelar el nuevo color", "Hacer que huela bien", "Alisar el cabello permanentemente"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Cuál es la diferencia principal entre un tratamiento de hidratación profunda y un alisado de Keratina tradicional?",
                            "options": ["Ninguna, son el mismo producto", "La hidratación devuelve agua y nutrientes sin cambiar la estructura, mientras que la Keratina (con formol o derivados) sella y alisa modificando la estructura capilar", "La hidratación tiñe el cabello y la Keratina no", "La Keratina se aplica en frío y la hidratación en caliente"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Tendencias y Estilismo Avanzado",
                "lessons": [
                    {
                        "title": "Cortes de tendencia y texturización",
                        "content": "Aprenderás sobre: Cortes de tendencia y texturización",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Mh03j4AMGsc?si=asCDW8X9SpUyjuFK\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Balayage y técnicas de iluminación",
                        "content": "Aprenderás sobre: Balayage y técnicas de iluminación",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/vGCjvkX06Cg?si=AkqQR6a2cso9ZyQt\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Asesoría de imagen integral",
                        "content": "Aprenderás sobre: Asesoría de imagen integral",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/cFw60zcL4M4?si=go4aSdD-Qim5NpP6\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Qué es la técnica de coloración 'Balayage'?",
                            "options": ["Teñir el cabello de un solo color negro", "Una técnica francesa de barrido a mano alzada que crea un degradado natural de luz de medios a puntas", "Poner mechas con gorro de plástico", "Decolorar todo el cabello desde la raíz"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Al texturizar un cabello abundante y grueso, ¿qué herramienta o técnica es más adecuada para restar volumen sin quitar largo?",
                            "options": ["Una máquina de afeitar", "Tijeras de entresacar (dentadas) o técnica de 'point cutting'", "Secador a máxima potencia", "Tijeras curvas"],
                            "correctIndex": 1
                        },
                        {
                            "question": "En la asesoría de imagen integral, ¿qué es la 'Colorimetría Personal' (Test de color)?",
                            "options": ["Elegir el color de tinte que está más barato", "Determinar qué paleta de colores (cálidos, fríos, estaciones) favorece más a la piel, ojos y cabello natural del cliente", "Pintar las uñas del mismo color que la ropa", "Medir la altura del cliente"],
                            "correctIndex": 1
                        }
                    ]
                }
            }
        ]
    },
    {
        "title": "Informática Básica",
        "description": "Uso de herramientas digitales, Windows, paquetes de oficina e introducción a internet.",
        "color": "#0277BD",
        "category": "Tecnología",
        "thumbnail": "assets/courses/informatica.png",
        "levels": [
            {
                "title": "Introducción a la Computadora y Windows",
                "lessons": [
                    {
                        "title": "Partes de la computadora y su función",
                        "content": "Aprenderás sobre: Partes de la computadora y su función",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/-1clqsilLQ0?si=CO0L-FFlIVF8uJab\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Manejo del escritorio, archivos y carpetas en Windows",
                        "content": "Aprenderás sobre: Manejo del escritorio, archivos y carpetas en Windows",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/rMOFWyYnehE?si=Ce0xsctoDw_nQm0u\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Configuración básica del sistema y accesibilidad",
                        "content": "Aprenderás sobre: Configuración básica del sistema y accesibilidad",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/IGJ701gjlqY?si=8Gb30mYek97vYU9D\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Cuál de las siguientes es una parte fundamental del hardware de una computadora?",
                            "options": ["El sistema operativo Windows", "Microsoft Word", "La Memoria RAM", "Un archivo PDF"],
                            "correctIndex": 2
                        },
                        {
                            "question": "¿Para qué sirve el 'Escritorio' en Windows?",
                            "options": ["Para limpiar la pantalla", "Es la pantalla principal que aparece tras encender el equipo, donde se organizan iconos, accesos directos y la barra de tareas", "Para navegar en internet", "Para imprimir documentos"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Qué función cumple el Panel de Control o la ventana de Configuración en Windows?",
                            "options": ["Jugar videojuegos", "Permite ajustar las opciones del sistema como el idioma, la conexión a internet, cuentas de usuario y opciones de accesibilidad", "Crear hojas de cálculo", "Enviar correos electrónicos"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Microsoft Word y Procesamiento de Texto",
                "lessons": [
                    {
                        "title": "Creación y formato de documentos",
                        "content": "Aprenderás sobre: Creación y formato de documentos",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/K7PIfBYB6ps?si=cE5YJcjvYZhB1iB5\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Inserción de imágenes, tablas y encabezados",
                        "content": "Aprenderás sobre: Inserción de imágenes, tablas y encabezados",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/7fUG-Y6j1dg?si=yOr5bxxqwku5DEsS\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Revisión ortográfica, impresión y guardado en PDF",
                        "content": "Aprenderás sobre: Revisión ortográfica, impresión y guardado en PDF",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/QQkCWhXffnk?si=CMxZn1jcmXmMawDV\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Qué herramienta de Microsoft Word se utiliza para cambiar el tipo de letra (fuente), tamaño y color del texto?",
                            "options": ["La pestaña de Diseño de Página", "El grupo 'Fuente' en la pestaña Inicio", "La herramienta de Insertar Tabla", "El botón de Guardar como PDF"],
                            "correctIndex": 1
                        },
                        {
                            "question": "En Word, ¿para qué sirve el atajo de teclado 'Ctrl + C' seguido de 'Ctrl + V'?",
                            "options": ["Para guardar e imprimir", "Para Copiar y Pegar texto o imágenes", "Para borrar todo el documento", "Para buscar palabras con errores ortográficos"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Por qué es recomendable guardar un documento final en formato PDF antes de enviarlo por correo?",
                            "options": ["Para que el archivo pese más", "Para evitar que el formato, las fuentes y las imágenes se muevan o se modifiquen al abrirlo en otra computadora", "Para que solo se pueda ver en blanco y negro", "Para traducirlo automáticamente"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Microsoft Excel y Hojas de Cálculo",
                "lessons": [
                    {
                        "title": "Estructura de la hoja de cálculo y tipos de datos",
                        "content": "Aprenderás sobre: Estructura de la hoja de cálculo y tipos de datos",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/OrS-IUyiQuY?si=xnQ-dC6W_PCeMoO4\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Fórmulas básicas: SUMA, PROMEDIO, MAX, MIN",
                        "content": "Aprenderás sobre: Fórmulas básicas: SUMA, PROMEDIO, MAX, MIN",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/9eTxxrRVF2Q?si=r_r3zhUJOHxVjxTS\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Creación de tablas, filtros y gráficos sencillos",
                        "content": "Aprenderás sobre: Creación de tablas, filtros y gráficos sencillos",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/ghyGNJKjPsQ?si=JxT5iXS8OhkWSj3Z\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Cómo se identifica la celda ubicada en la tercera columna y quinta fila de una hoja de cálculo en Excel?",
                            "options": ["3E", "C5", "5C", "Fila 5 Columna 3"],
                            "correctIndex": 1
                        },
                        {
                            "question": "En Excel, todas las fórmulas matemáticas deben comenzar obligatoriamente con el símbolo:",
                            "options": ["#", "@", "=", "+"],
                            "correctIndex": 2
                        },
                        {
                            "question": "Si tienes una lista de 100 empleados en Excel y solo quieres ver a los del departamento de 'Ventas', ¿qué herramienta debes utilizar?",
                            "options": ["La herramienta de Filtros", "La fórmula SUMA", "Cambiar el color de las celdas a mano", "Insertar un gráfico circular"],
                            "correctIndex": 0
                        }
                    ]
                }
            },
            {
                "title": "Internet, Correo Electrónico y Herramientas en la Nube",
                "lessons": [
                    {
                        "title": "Navegación segura en internet y motores de búsqueda",
                        "content": "Aprenderás sobre: Navegación segura en internet y motores de búsqueda",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/6gqLoQ8YaRg?si=-qvYOsCOs7cze7UY\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Creación y gestión de correo electrónico profesional",
                        "content": "Aprenderás sobre: Creación y gestión de correo electrónico profesional",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/YJIHZaPtWmU?si=gjSCKMIbptFFY5Mq\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Uso de Google Drive, Docs y herramientas colaborativas",
                        "content": "Aprenderás sobre: Uso de Google Drive, Docs y herramientas colaborativas",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/ftAzRtcKaDU?si=ShPrqSdNZV3kprXy\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Cuál de las siguientes acciones es una práctica de 'Navegación Segura' en internet?",
                            "options": ["Hacer clic en anuncios parpadeantes que dicen 'Ganaste un premio'", "Dar las contraseñas bancarias a quien las pida por correo", "Verificar que la dirección web comience con 'https://' y tenga un ícono de candado en páginas donde se ingresan datos sensibles", "Descargar archivos de páginas desconocidas"],
                            "correctIndex": 2
                        },
                        {
                            "question": "En un correo electrónico (Email), ¿qué significa la opción 'CC' (Con Copia)?",
                            "options": ["Crear un Correo Nuevo", "Enviar una copia del mensaje a otras personas de forma visible para todos los destinatarios", "Borrar el correo inmediatamente", "Cerrar la Cuenta"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Cuál es la principal ventaja de utilizar herramientas en la nube como Google Drive o Docs?",
                            "options": ["No necesitan conexión a internet jamás", "Permiten almacenar archivos de forma remota, acceder a ellos desde cualquier dispositivo con internet y trabajar colaborativamente en tiempo real", "Sirven exclusivamente para ver películas", "Consumen toda la Memoria RAM de la computadora local"],
                            "correctIndex": 1
                        }
                    ]
                }
            }
        ]
    },
    {
        "title": "Barbería Profesional",
        "description": "Cortes clásicos y modernos, técnicas de afeitado, diseño de barba y estilismo masculino.",
        "color": "#37474F",
        "category": "Belleza y Estilismo",
        "thumbnail": "assets/courses/barberia.png",
        "levels": [
            {
                "title": "Fundamentos de Barbería y Herramientas",
                "lessons": [
                    {
                        "title": "Historia y ética profesional",
                        "content": "Aprenderás sobre: Historia y ética profesional",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/R2X006QywSo?si=7b240DaAtoAtcOE6\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Herramientas y su uso correcto",
                        "content": "Aprenderás sobre: Herramientas y su uso correcto",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/sA-WJGgxYsc?si=RhxFalRWWxzzCDpI\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Mantenimiento y desinfección de equipos",
                        "content": "Aprenderás sobre: Mantenimiento y desinfección de equipos",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/_LimB7O3-9s?si=s1WnfR35zjKgQ3ms\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Cuál es la herramienta principal utilizada por los barberos para realizar cortes degradados (fades)?",
                            "options": ["Tijeras de entresacar", "Máquina clipper (cortadora) con diferentes peines guía", "Navaja de afeitar", "Secador de pelo"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Por qué es obligatorio el uso de productos como Barbicide o esterilizadores UV en una barbería?",
                            "options": ["Para que las herramientas se vean brillantes", "Para desinfectar las herramientas de corte y peines, eliminando bacterias, virus y hongos y evitar contagios entre clientes", "Para afilar las cuchillas de la máquina", "Para limpiar el piso del local"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Al usar la máquina clipper, ¿qué función cumple la palanca de ajuste lateral?",
                            "options": ["Apagar la máquina", "Ajustar la longitud de corte de la cuchilla, permitiendo crear transiciones suaves (fades) al abrir o cerrar la cuchilla", "Cambiar la velocidad del motor", "Cambiar el color de la máquina"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Técnicas de Corte Clásico y Moderno",
                "lessons": [
                    {
                        "title": "Cortes a tijera y técnicas de peine",
                        "content": "Aprenderás sobre: Cortes a tijera y técnicas de peine",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/ZeDgyrJ3-X8?si=1zfQWIt0zZkb1pWs\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Técnicas de desvanecido (Fade y Taper)",
                        "content": "Aprenderás sobre: Técnicas de desvanecido (Fade y Taper)",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/5oavPq0BIqo?si=tVS5hqSOy8dJWbf0\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Texturización y estilos modernos",
                        "content": "Aprenderás sobre: Texturización y estilos modernos",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/PwRhviMZbwk?si=ZNOwEZktKfxVUJvg\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "La técnica de 'Fade' (Desvanecido) se define como:",
                            "options": ["Cortar todo el cabello al mismo largo", "Una transición gradual de cabello muy corto (o rasurado) en la base, aumentando suavemente la longitud hacia la parte superior", "Pintar el cabello de blanco", "Hacer trenzas pegadas al cuero cabelludo"],
                            "correctIndex": 1
                        },
                        {
                            "question": "En el corte de cabello masculino, ¿qué técnica se usa con la tijera para quitar peso o volumen sin modificar el largo del cabello?",
                            "options": ["Corte recto a 0 grados", "Texturizado (entresacado) con tijera dentada o técnica de 'point cutting'", "Rasurar con navaja", "Usar la máquina clipper sin peine"],
                            "correctIndex": 1
                        },
                        {
                            "question": "En un corte clásico tipo 'Pompadour', la característica principal es:",
                            "options": ["Estar completamente rapado", "Tener un flequillo largo peinado hacia arriba y hacia atrás creando volumen o tupé en la parte frontal", "Tener el cabello largo hasta los hombros", "Tener líneas rapadas en toda la cabeza"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Afeitado Profesional y Diseño de Barba",
                "lessons": [
                    {
                        "title": "Preparación de piel y toallas calientes",
                        "content": "Aprenderás sobre: Preparación de piel y toallas calientes",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/lhsS3JnykKM?si=UFXF7kostKLIqLtx\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Afeitado tradicional a navaja",
                        "content": "Aprenderás sobre: Afeitado tradicional a navaja",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/H2l_raVxo3E?si=elhQDhadt01ZKRqk\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Perfilado, rebaje y cuidado de barbas",
                        "content": "Aprenderás sobre: Perfilado, rebaje y cuidado de barbas",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/zF9thdMK_po?si=On6i5fXt7y20BPb4\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Cuál es el propósito de aplicar una toalla caliente sobre el rostro antes del afeitado tradicional?",
                            "options": ["Hacer que el cliente se duerma", "Abrir los poros, suavizar el vello facial y relajar la piel para un afeitado más apurado y sin irritaciones", "Secar el cabello", "Enfriar la cara"],
                            "correctIndex": 1
                        },
                        {
                            "question": "Al afeitar con navaja libre, la piel debe estar siempre:",
                            "options": ["Seca y suelta", "Tensa (estirada) con la mano libre y lubricada con gel o espuma de afeitar para evitar cortes", "Cubierta de polvo de talco", "Sin ningún producto aplicado"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Dónde se suele marcar la línea del cuello (neckline) al perfilar una barba?",
                            "options": ["En la línea de la mandíbula exactamente", "Uno o dos dedos por encima de la nuez de Adán (manzana de Adán), creando una curva suave hacia las orejas", "Debajo del labio", "En la clavícula"],
                            "correctIndex": 1
                        }
                    ]
                }
            },
            {
                "title": "Estilismo Masculino y Gestión del Negocio",
                "lessons": [
                    {
                        "title": "Productos de acabado y peinado",
                        "content": "Aprenderás sobre: Productos de acabado y peinado",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/CNrng3cdsLQ?si=QAgfsYUwnFokaQy4\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Asesoría de imagen facial",
                        "content": "Aprenderás sobre: Asesoría de imagen facial",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/YfGRhf5onZ0?si=7ITP451JNUKR4meD\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    },
                    {
                        "title": "Marketing y fidelización en barbería",
                        "content": "Aprenderás sobre: Marketing y fidelización en barbería",
                        "videoUrl": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/TP8Q0y1aTSY?si=cmKRHrd_vD-t_EA8\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
                        "documents": []
                    }
                ],
                "exam": {
                    "questions": [
                        {
                            "question": "¿Qué tipo de producto de acabado es ideal para un cabello fino que busca un look mate y natural con textura?",
                            "options": ["Gel fijador brillante", "Pomada a base de agua muy brillante", "Polvos voluminizadores o cera mate", "Aceite de argán en abundancia"],
                            "correctIndex": 2
                        },
                        {
                            "question": "En la asesoría de imagen masculina, si un cliente tiene un rostro redondo, ¿qué tipo de corte de cabello le favorecería más para equilibrar sus facciones?",
                            "options": ["Un corte muy redondeado tipo taza", "Un corte con volumen en la parte superior y laterales ajustados o cortos para alargar visualmente el rostro", "Dejar crecer el cabello a los lados y rapar la parte superior", "No cortarse el cabello"],
                            "correctIndex": 1
                        },
                        {
                            "question": "¿Cuál es una estrategia efectiva para la fidelización de clientes en una barbería?",
                            "options": ["Cambiar los precios todos los días", "Ignorar a los clientes mientras esperan", "Ofrecer un servicio consistente de alta calidad, mantener el lugar limpio, recordar las preferencias del cliente y usar programas de lealtad", "Cerrar el local en horas pico"],
                            "correctIndex": 2
                        }
                    ]
                }
            }
        ]
    }
];

  for (const c of courses) {
    await prisma.course.create({
      data: {
        title: c.title,
        description: c.description,
        category: c.category,
        themeColor: c.color,
        thumbnail: c.thumbnail,
        isActive: true,
        levels: {
          create: c.levels.map((levelData, index) => {
            const levelObj = {
              title: levelData.title,
              order: index + 1,
              lessons: {
                create: levelData.lessons.map((lesson, i) => ({
                  title: lesson.title,
                  content: lesson.content,
                  videoUrl: lesson.videoUrl,
                  documents: lesson.documents,
                  order: i + 1
                }))
              }
            };
            
            if (levelData.exam) {
              levelObj.exam = {
                create: {
                  questions: levelData.exam.questions
                }
              };
            }
            
            return levelObj;
          })
        }
      }
    });
    console.log(`  ✅ ${c.title} (${c.category})`);
  }

  console.log('\n¡Datos sembrados con éxito! Se han creado 12 cursos con 4 niveles cada uno.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
