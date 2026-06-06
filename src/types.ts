export type UrgencyLevel = 'low' | 'medium' | 'high';

export interface SymptomAnalysis {
  conditions: {
    name: string;
    probability: string; // e.g. "Moderate", "Low", "Symptomatic match"
    description: string;
    reference: string; // RAG reference/source
  }[];
  precautions: string[];
  explanation: string;
  doctorConsultationUrgency: UrgencyLevel;
  doctorConsultationReason: string;
  ragRetrievedSources: {
    title: string;
    text: string;
    similarity: number;
  }[];
}

export interface MedicineEntry {
  name: string;
  purpose: string;
  dosage: string;
  sideEffects: string[];
}

export interface PrescriptionAnalysis {
  identifiedMedicines: MedicineEntry[];
  warnings: string[];
  explanation: string;
  generalAdvice: string;
  ragRetrievedSources: {
    title: string;
    text: string;
    similarity: number;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isSymptomReport?: boolean;
  symptomData?: SymptomAnalysis;
  isPrescriptionReport?: boolean;
  prescriptionData?: PrescriptionAnalysis;
}

// Database visualization schemas
export interface UserRecord {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface ReportRecord {
  report_id: number;
  user_id: number;
  symptoms: string;
  diagnosis: string;
  report_date: string;
}

export interface PrescriptionRecord {
  id: number;
  user_id: number;
  medicine_name: string;
  analysis: string;
}

export interface InterviewQA {
  id: string;
  question: string;
  answer: string;
  category: string;
}
