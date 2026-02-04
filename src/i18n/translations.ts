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
  },
};
