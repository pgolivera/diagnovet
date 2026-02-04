export type Language = "es" | "en" | "pt";

export const translations: Record<Language, Record<string, string>> = {
  es: {
    // Header & Navigation
    "nav.dashboard": "Panel",
    "nav.viewer": "Visor",

    // Dashboard
    "dashboard.title": "Panel de Control",
    "dashboard.newReport": "Nuevo Reporte",
    "dashboard.totalReports": "Total Reportes",
    "dashboard.allTimeReports": "Reportes totales",
    "dashboard.completed": "Completados",
    "dashboard.finalizedReports": "Reportes finalizados",
    "dashboard.processing": "Procesando",
    "dashboard.inProgress": "En progreso",
    "dashboard.needsReview": "Requiere Revisión",
    "dashboard.awaitingReview": "Esperando revisión",
    "dashboard.recentReports": "Reportes Recientes",
    "dashboard.noReports": "Sin reportes aún. Crea tu primer reporte para comenzar.",

    // Viewer
    "viewer.images": "Imágenes",
    "viewer.noImagesLoaded": "Sin imágenes cargadas",
    "viewer.dropImages": "Arrastra imágenes aquí o haz clic para subir",
    "viewer.supportedFormats": "Formatos soportados: JPEG, PNG, DICOM",

    // AI Panel
    "aiPanel.examConfiguration": "Configuración del Examen",
    "aiPanel.examType": "Tipo de Examen",
    "aiPanel.initialObservations": "Observaciones Iniciales",
    "aiPanel.enterObservations": "Ingresa las observaciones iniciales...",
    "aiPanel.analyzeWithAI": "Analizar con IA",
    "aiPanel.analyzing": "Analizando...",
    "aiPanel.aiFindings": "Hallazgos de IA",
    "aiPanel.selectExamType": "Selecciona tipo de examen y haz clic en Analizar",
    "aiPanel.uploadImages": "Sube imágenes para iniciar el análisis",
    "aiPanel.finding1": "Tamaño y ecogenicidad del órgano normal",
    "aiPanel.finding2": "No se detectaron colecciones de líquido anormales",
    "aiPanel.finding3": "Patrón parenquimatoso regular observado",
    "aiPanel.organ.liver": "Hígado",
    "aiPanel.organ.abdomen": "Abdomen",
    "aiPanel.organ.spleen": "Bazo",

    // Exam Types
    "examType.abdominal": "Abdominal",
    "examType.cervical": "Cervical",
    "examType.gestational": "Gestacional",
    "examType.ocular": "Ocular",
    "examType.thoracic": "Torácico",

    // Status
    "status.completed": "Completado",
    "status.processing": "Procesando",
    "status.needsReview": "Requiere Revisión",
    "status.error": "Error",

    // Species
    "species.canine": "canino",
    "species.feline": "felino",
    "species.equine": "equino",
    "species.other": "otro",

    // Auth
    "auth.login": "Iniciar Sesión",
    "auth.logout": "Cerrar Sesión",
    "auth.signIn": "Iniciar Sesión",
    "auth.signUp": "Registrarse",
    "auth.email": "Correo Electrónico",
    "auth.emailPlaceholder": "tu@correo.com",
    "auth.password": "Contraseña",
    "auth.fullName": "Nombre Completo",
    "auth.namePlaceholder": "Juan Pérez",
    "auth.rememberMe": "Recordarme",
    "auth.forgotPassword": "¿Olvidaste tu contraseña?",
    "auth.signInWithGoogle": "Iniciar sesión con Google",
    "auth.signUpWithGoogle": "Registrarse con Google",
    "auth.noAccount": "¿No tienes cuenta?",
    "auth.alreadyHaveAccount": "¿Ya tienes cuenta?",
    "auth.invalidEmail": "Por favor ingresa un correo electrónico válido.",
    "auth.passwordMinLength": "La contraseña debe tener al menos 6 caracteres.",
    "auth.nameRequired": "El nombre es requerido.",
    "auth.receiveUpdates": "Quiero recibir actualizaciones por correo electrónico.",
    "auth.resetPassword": "Restablecer Contraseña",
    "auth.resetPasswordDescription": "Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.",
    "auth.resetEmailSent": "Te hemos enviado un correo con instrucciones para restablecer tu contraseña.",
    "auth.emailAddress": "Correo Electrónico",

    // Common
    "common.or": "o",
    "common.cancel": "Cancelar",
    "common.continue": "Continuar",
  },
  en: {
    // Header & Navigation
    "nav.dashboard": "Dashboard",
    "nav.viewer": "Viewer",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.newReport": "New Report",
    "dashboard.totalReports": "Total Reports",
    "dashboard.allTimeReports": "All time reports",
    "dashboard.completed": "Completed",
    "dashboard.finalizedReports": "Finalized reports",
    "dashboard.processing": "Processing",
    "dashboard.inProgress": "In progress",
    "dashboard.needsReview": "Needs Review",
    "dashboard.awaitingReview": "Awaiting review",
    "dashboard.recentReports": "Recent Reports",
    "dashboard.noReports": "No reports yet. Create your first report to get started.",

    // Viewer
    "viewer.images": "Images",
    "viewer.noImagesLoaded": "No images loaded",
    "viewer.dropImages": "Drop images here or click to upload",
    "viewer.supportedFormats": "Supported formats: JPEG, PNG, DICOM",

    // AI Panel
    "aiPanel.examConfiguration": "Exam Configuration",
    "aiPanel.examType": "Exam Type",
    "aiPanel.initialObservations": "Initial Observations",
    "aiPanel.enterObservations": "Enter initial observations...",
    "aiPanel.analyzeWithAI": "Analyze with AI",
    "aiPanel.analyzing": "Analyzing...",
    "aiPanel.aiFindings": "AI Findings",
    "aiPanel.selectExamType": "Select exam type and click Analyze",
    "aiPanel.uploadImages": "Upload images to start analysis",
    "aiPanel.finding1": "Normal organ size and echogenicity",
    "aiPanel.finding2": "No abnormal fluid collections detected",
    "aiPanel.finding3": "Regular parenchymal pattern observed",
    "aiPanel.organ.liver": "Liver",
    "aiPanel.organ.abdomen": "Abdomen",
    "aiPanel.organ.spleen": "Spleen",

    // Exam Types
    "examType.abdominal": "Abdominal",
    "examType.cervical": "Cervical",
    "examType.gestational": "Gestational",
    "examType.ocular": "Ocular",
    "examType.thoracic": "Thoracic",

    // Status
    "status.completed": "Completed",
    "status.processing": "Processing",
    "status.needsReview": "Needs Review",
    "status.error": "Error",

    // Species
    "species.canine": "canine",
    "species.feline": "feline",
    "species.equine": "equine",
    "species.other": "other",

    // Auth
    "auth.login": "Login",
    "auth.logout": "Logout",
    "auth.signIn": "Sign in",
    "auth.signUp": "Sign up",
    "auth.email": "Email",
    "auth.emailPlaceholder": "your@email.com",
    "auth.password": "Password",
    "auth.fullName": "Full Name",
    "auth.namePlaceholder": "John Doe",
    "auth.rememberMe": "Remember me",
    "auth.forgotPassword": "Forgot your password?",
    "auth.signInWithGoogle": "Sign in with Google",
    "auth.signUpWithGoogle": "Sign up with Google",
    "auth.noAccount": "Don't have an account?",
    "auth.alreadyHaveAccount": "Already have an account?",
    "auth.invalidEmail": "Please enter a valid email address.",
    "auth.passwordMinLength": "Password must be at least 6 characters long.",
    "auth.nameRequired": "Name is required.",
    "auth.receiveUpdates": "I want to receive updates via email.",
    "auth.resetPassword": "Reset Password",
    "auth.resetPasswordDescription": "Enter your email address and we'll send you a link to reset your password.",
    "auth.resetEmailSent": "We've sent you an email with instructions to reset your password.",
    "auth.emailAddress": "Email Address",

    // Common
    "common.or": "or",
    "common.cancel": "Cancel",
    "common.continue": "Continue",
  },
  pt: {
    // Header & Navigation
    "nav.dashboard": "Painel",
    "nav.viewer": "Visualizador",

    // Dashboard
    "dashboard.title": "Painel de Controle",
    "dashboard.newReport": "Novo Relatório",
    "dashboard.totalReports": "Total de Relatórios",
    "dashboard.allTimeReports": "Relatórios totais",
    "dashboard.completed": "Concluídos",
    "dashboard.finalizedReports": "Relatórios finalizados",
    "dashboard.processing": "Processando",
    "dashboard.inProgress": "Em andamento",
    "dashboard.needsReview": "Precisa Revisão",
    "dashboard.awaitingReview": "Aguardando revisão",
    "dashboard.recentReports": "Relatórios Recentes",
    "dashboard.noReports": "Sem relatórios ainda. Crie seu primeiro relatório para começar.",

    // Viewer
    "viewer.images": "Imagens",
    "viewer.noImagesLoaded": "Sem imagens carregadas",
    "viewer.dropImages": "Arraste imagens aqui ou clique para enviar",
    "viewer.supportedFormats": "Formatos suportados: JPEG, PNG, DICOM",

    // AI Panel
    "aiPanel.examConfiguration": "Configuração do Exame",
    "aiPanel.examType": "Tipo de Exame",
    "aiPanel.initialObservations": "Observações Iniciais",
    "aiPanel.enterObservations": "Digite as observações iniciais...",
    "aiPanel.analyzeWithAI": "Analisar com IA",
    "aiPanel.analyzing": "Analisando...",
    "aiPanel.aiFindings": "Descobertas da IA",
    "aiPanel.selectExamType": "Selecione o tipo de exame e clique em Analisar",
    "aiPanel.uploadImages": "Envie imagens para iniciar a análise",
    "aiPanel.finding1": "Tamanho e ecogenicidade do órgão normais",
    "aiPanel.finding2": "Nenhuma coleção de líquido anormal detectada",
    "aiPanel.finding3": "Padrão parenquimatoso regular observado",
    "aiPanel.organ.liver": "Fígado",
    "aiPanel.organ.abdomen": "Abdômen",
    "aiPanel.organ.spleen": "Baço",

    // Exam Types
    "examType.abdominal": "Abdominal",
    "examType.cervical": "Cervical",
    "examType.gestational": "Gestacional",
    "examType.ocular": "Ocular",
    "examType.thoracic": "Torácico",

    // Status
    "status.completed": "Concluído",
    "status.processing": "Processando",
    "status.needsReview": "Precisa Revisão",
    "status.error": "Erro",

    // Species
    "species.canine": "canino",
    "species.feline": "felino",
    "species.equine": "equino",
    "species.other": "outro",

    // Auth
    "auth.login": "Entrar",
    "auth.logout": "Sair",
    "auth.signIn": "Entrar",
    "auth.signUp": "Cadastrar",
    "auth.email": "E-mail",
    "auth.emailPlaceholder": "seu@email.com",
    "auth.password": "Senha",
    "auth.fullName": "Nome Completo",
    "auth.namePlaceholder": "João Silva",
    "auth.rememberMe": "Lembrar de mim",
    "auth.forgotPassword": "Esqueceu sua senha?",
    "auth.signInWithGoogle": "Entrar com Google",
    "auth.signUpWithGoogle": "Cadastrar com Google",
    "auth.noAccount": "Não tem conta?",
    "auth.alreadyHaveAccount": "Já tem conta?",
    "auth.invalidEmail": "Por favor, insira um endereço de e-mail válido.",
    "auth.passwordMinLength": "A senha deve ter pelo menos 6 caracteres.",
    "auth.nameRequired": "O nome é obrigatório.",
    "auth.receiveUpdates": "Quero receber atualizações por e-mail.",
    "auth.resetPassword": "Redefinir Senha",
    "auth.resetPasswordDescription": "Digite seu e-mail e enviaremos um link para redefinir sua senha.",
    "auth.resetEmailSent": "Enviamos um e-mail com instruções para redefinir sua senha.",
    "auth.emailAddress": "Endereço de E-mail",

    // Common
    "common.or": "ou",
    "common.cancel": "Cancelar",
    "common.continue": "Continuar",
  },
};
