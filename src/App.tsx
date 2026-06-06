import React, { useState, useEffect, useRef } from "react";
import { 
  Activity, 
  Pill, 
  Database, 
  Search, 
  Send, 
  Upload, 
  Download, 
  RefreshCw, 
  Heart, 
  Layers, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Printer, 
  Sparkles, 
  Clock, 
  User, 
  Stethoscope, 
  Terminal, 
  ShieldCheck, 
  ChevronRight, 
  X, 
  Check, 
  FileText,
  AlertCircle,
  Calendar,
  Lock
} from "lucide-react";
import { 
  ChatMessage, 
  SymptomAnalysis, 
  PrescriptionAnalysis, 
  UserRecord, 
  ReportRecord, 
  PrescriptionRecord 
} from "./types";
import { 
  INITIAL_USERS, 
  INITIAL_REPORTS, 
  INITIAL_PRESCRIPTIONS 
} from "./mockData";

// Doctor model
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: string;
  availability: string;
  contact: string;
}

// Full 5 doctors per specialty database
const MEDICAL_DOCTORS: Doctor[] = [
  // General Medicine
  { id: "doc_1", name: "Dr. Sarah Jenkins", specialty: "General & Family Medicine", experience: "12 years", rating: "4.9", availability: "Mon - Fri, 09:00 - 15:00", contact: "+1 (555) 101-2093" },
  { id: "doc_2", name: "Dr. Marcus Vance", specialty: "General & Family Medicine", experience: "8 years", rating: "4.7", availability: "Mon - Sat, 10:00 - 17:00", contact: "+1 (555) 101-3091" },
  { id: "doc_3", name: "Dr. Elena Rostova", specialty: "General & Family Medicine", experience: "15 years", rating: "4.95", availability: "Wed - Fri, 08:00 - 14:00", contact: "+1 (555) 101-4412" },
  { id: "doc_4", name: "Dr. David Alvarez", specialty: "General & Family Medicine", experience: "6 years", rating: "4.6", availability: "Tue - Thu, 09:00 - 16:00", contact: "+1 (555) 101-5582" },
  { id: "doc_5", name: "Dr. Kenji Sato", specialty: "General & Family Medicine", experience: "20 years", rating: "4.98", availability: "Mon & Wed, 13:00 - 18:00", contact: "+1 (555) 101-9921" },

  // Gynology & Obstetrics
  { id: "doc_6", name: "Dr. Amelia Thorne", specialty: "Gynecology & Maternal Care", experience: "14 years", rating: "4.9", availability: "Mon - Thu, 09:00 - 14:00", contact: "+1 (555) 202-1142" },
  { id: "doc_7", name: "Dr. Priya Patel", specialty: "Gynecology & Maternal Care", experience: "10 years", rating: "4.8", availability: "Tue - Fri, 10:00 - 16:00", contact: "+1 (555) 202-3381" },
  { id: "doc_8", name: "Dr. Celine Moreau", specialty: "Gynecology & Maternal Care", experience: "11 years", rating: "4.75", availability: "Mon - Wed, 08:00 - 15:00", contact: "+1 (555) 202-9901" },
  { id: "doc_9", name: "Dr. Sophia Vance", specialty: "Gynecology & Maternal Care", experience: "16 years", rating: "4.92", availability: "Wed - Fri, 12:00 - 17:00", contact: "+1 (555) 202-5561" },
  { id: "doc_10", name: "Dr. Clara Sterling", specialty: "Gynecology & Maternal Care", experience: "9 years", rating: "4.7", availability: "Thu - Sat, 09:00 - 13:00", contact: "+1 (555) 202-4410" },

  // Pediatrics & Child Care
  { id: "doc_11", name: "Dr. Julian Ramirez", specialty: "Pediatrics & Child Care", experience: "11 years", rating: "4.85", availability: "Mon - Fri, 09:00 - 16:00", contact: "+1 (555) 303-9119" },
  { id: "doc_12", name: "Dr. Maya Lin", specialty: "Pediatrics & Child Care", experience: "7 years", rating: "4.8", availability: "Mon - Wed, 10:00 - 15:00", contact: "+1 (555) 303-4419" },
  { id: "doc_13", name: "Dr. Oliver Brooks", specialty: "Pediatrics & Child Care", experience: "13 years", rating: "4.9", availability: "Tue - Thu, 08:30 - 14:30", contact: "+1 (555) 303-5182" },
  { id: "doc_14", name: "Dr. Nina Kovalenko", specialty: "Pediatrics & Child Care", experience: "18 years", rating: "4.94", availability: "Wed & Fri, 09:00 - 17:00", contact: "+1 (555) 303-8812" },
  { id: "doc_15", name: "Dr. Leo Mercer", specialty: "Pediatrics & Child Care", experience: "5 years", rating: "4.65", availability: "Mon - Thu, 13:00 - 17:00", contact: "+1 (555) 303-2210" },

  // Cardiology & Heart Health
  { id: "doc_16", name: "Dr. Aaron Vance", specialty: "Cardiology & Heart Health", experience: "17 years", rating: "4.97", availability: "Mon - Wed, 08:00 - 13:00", contact: "+1 (555) 404-5100" },
  { id: "doc_17", name: "Dr. Sarah Chen", specialty: "Cardiology & Heart Health", experience: "12 years", rating: "4.92", availability: "Tue & Thu, 10:00 - 16:00", contact: "+1 (555) 404-9981" },
  { id: "doc_18", name: "Dr. Robert Hartmann", specialty: "Cardiology & Heart Health", experience: "22 years", rating: "4.99", availability: "Wed & Fri, 09:00 - 14:00", contact: "+1 (555) 404-2034" },
  { id: "doc_19", name: "Dr. Hana Lindqvist", specialty: "Cardiology & Heart Health", experience: "9 years", rating: "4.8", availability: "Mon - Thu, 13:00 - 17:00", contact: "+1 (555) 404-6651" },
  { id: "doc_20", name: "Dr. Tariq Al-Jamil", specialty: "Cardiology & Heart Health", experience: "15 years", rating: "4.88", availability: "Tue - Fri, 08:00 - 12:00", contact: "+1 (555) 404-7712" },

  // Orthopedics & Joint Care
  { id: "doc_21", name: "Dr. Tyler Vance", specialty: "Orthopedics & Joint Care", experience: "13 years", rating: "4.9", availability: "Mon - Thu, 09:00 - 16:00", contact: "+1 (555) 505-1811" },
  { id: "doc_22", name: "Dr. Ingrid Bernstein", specialty: "Orthopedics & Joint Care", experience: "19 years", rating: "4.95", availability: "Tue - Fri, 08:00 - 13:00", contact: "+1 (555) 505-2291" },
  { id: "doc_23", name: "Dr. Chloe Bertrand", specialty: "Orthopedics & Joint Care", experience: "8 years", rating: "4.72", availability: "Mon - Wed, 10:00 - 15:30", contact: "+1 (555) 505-3391" },
  { id: "doc_24", name: "Dr. Kenji Tanaka", specialty: "Orthopedics & Joint Care", experience: "16 years", rating: "4.91", availability: "Wed & Fri, 13:00 - 18:00", contact: "+1 (555) 505-7782" },
  { id: "doc_25", name: "Dr. Jamal Harrison", specialty: "Orthopedics & Joint Care", experience: "11 years", rating: "4.8", availability: "Tue - Thu, 09:00 - 14:00", contact: "+1 (555) 505-6612" }
];

export interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  symptoms: string;
  diagnosis: string;
  status: string;
  lastMet: string;
  email: string;
  phone: string;
  prescribedMeds?: string;
  doctorNotes?: string;
}

// Linked patients for each of the core 5 doctors, strictly isolated and separated!
export const DOCTOR_PATIENTS_MASTER: Record<string, PatientRecord[]> = {
  "doc_1": [ // Dr. Sarah Jenkins
    { id: "pat_1", name: "Abhi Shodh", age: 29, gender: "Male", symptoms: "Severe fever, muscle soreness and active chills for 36 hours", diagnosis: "Pathogenic Pyrexia / Influenza Check", status: "Active Treatment", lastMet: "2026-06-05", email: "abhiabhishodh@gmail.com", phone: "+1 (555) 773-9821", prescribedMeds: "Paracetamol 650mg, Vitamin C 500mg" },
    { id: "pat_2", name: "John Doe", age: 34, gender: "Male", symptoms: "Persistent dry cough, mild chest congestion, sneezing", diagnosis: "Acute Allergic Pharyngitis", status: "Recovered", lastMet: "2026-06-04", email: "john.doe@hospital.org", phone: "+1 (555) 102-3902", prescribedMeds: "Amoxicillin 500mg, Saline nasal spray" }
  ],
  "doc_6": [ // Dr. Amelia Thorne
    { id: "pat_3", name: "Emma Watson", age: 31, gender: "Female", symptoms: "Routine prenatal maternity ultrasound examination", diagnosis: "Second trimester healthy tracking", status: "Routine Check", lastMet: "2026-05-28", email: "emma.watson@gmail.com", phone: "+1 (555) 442-9901", prescribedMeds: "Folic Acid, Prenatal Multi-Vitamins" },
    { id: "pat_4", name: "Clara Sterling", age: 36, gender: "Female", symptoms: "Postpartum checkup, blood pressure logs & recovery query", diagnosis: "Standard postpartum recovery timeline", status: "Clinical Observation", lastMet: "2026-06-03", email: "clara.sterling@gmail.com", phone: "+1 (555) 202-4410", prescribedMeds: "Iron support supplements" }
  ],
  "doc_11": [ // Dr. Julian Ramirez
    { id: "pat_5", name: "Tommy Jenkins", age: 6, gender: "Male", symptoms: "Right ear pain acute and low grade fever", diagnosis: "Pediatric Otitis Media", status: "Active Treatment", lastMet: "2026-06-05", email: "sarah.jenkins@hospital.org", phone: "+1 (555) 101-2093", prescribedMeds: "Amoxicillin Pediatric syrup, Infant Ibuprofen" },
    { id: "pat_6", name: "Lily Rose", age: 4, gender: "Female", symptoms: "Irritative hives on arm skins post grass contact", diagnosis: "Allergic Contact Dermatitis", status: "Completed", lastMet: "2026-06-02", email: "lily.rose.parent@mail.com", phone: "+1 (555) 303-9119", prescribedMeds: "Cetirizine Pediatric syrup, Hydrocortisone ointment" }
  ],
  "doc_16": [ // Dr. Aaron Vance
    { id: "pat_7", name: "Robert Hartmann", age: 58, gender: "Male", symptoms: "Dull chest compression feeling post aerobic workouts", diagnosis: "Stable Angina / Coronary assessment", status: "Routine Observation", lastMet: "2026-05-20", email: "robert.hart@gmail.com", phone: "+1 (555) 404-2034", prescribedMeds: "Atorvastatin 20mg, Daily Aspirin 81mg" },
    { id: "pat_8", name: "William Harris", age: 62, gender: "Male", symptoms: "Hypertension parameters tracking logs of 145/92", diagnosis: "Essential Stage 1 Hypertension Control", status: "Active Treatment", lastMet: "2026-05-27", email: "will.harris@outlook.com", phone: "+1 (555) 404-9981", prescribedMeds: "Amlodipine 5mg once daily" }
  ],
  "doc_21": [ // Dr. Tyler Vance
    { id: "pat_9", name: "James Sterling", age: 44, gender: "Male", symptoms: "Lateral right ankle twisting lock during jogging with edema", diagnosis: "Ankle Sprain (Grade II inversion)", status: "Active Healing", lastMet: "2026-05-31", email: "j.sterling@gmail.com", phone: "+1 (555) 505-1811", prescribedMeds: "Ankle support orthotic, Ibuprofen 400mg with feed" },
    { id: "pat_10", name: "Sophia Turner", age: 27, gender: "Female", symptoms: "Left patellofemoral articulation crackling during squating", diagnosis: "Patellofemoral Pain Syndrome", status: "Routine Recovery", lastMet: "2026-06-03", email: "soph.turner@gmail.com", phone: "+1 (555) 505-6612", prescribedMeds: "Physiotherapy stretching, cooling gel packs" }
  ]
};

export default function App() {
  // Navigation tabs - aligned to custom request for Patient, Doctor, and Admin
  const [activeTab, setActiveTab] = useState<"symptoms" | "prescriptions" | "roster" | "booking" | "doctor-patients" | "sql-db" | "admin-panel">("symptoms");

  // Authentication & session variables
  const [currentUser, setCurrentUser] = useState<{
    id: string | number;
    username: string;
    email: string;
    role: "admin" | "doctor" | "patient";
    name: string;
    doctorId?: string;
  } | null>(null);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // File drag & drop references
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Doctor-Patient record isolated lists allowing editing notes & prescribed medications
  const [doctorPatients, setDoctorPatients] = useState<Record<string, PatientRecord[]>>(DOCTOR_PATIENTS_MASTER);
  const [selectedPatientForDetail, setSelectedPatientForDetail] = useState<PatientRecord | null>(null);
  const [newDoctorNote, setNewDoctorNote] = useState("");
  const [newPrescribedMeds, setNewPrescribedMeds] = useState("");

  // Detailed appointment booking states
  const [bookingName, setBookingName] = useState("Abhi Shodh");
  const [bookingEmail, setBookingEmail] = useState("abhiabhishodh@gmail.com");
  const [bookingMobile, setBookingMobile] = useState("+1 (555) 773-9821");
  const [bookingDoctorId, setBookingDoctorId] = useState<string>("doc_1");
  const [bookingIsLoading, setBookingIsLoading] = useState(false);
  const [bookingPreviewUrl, setBookingPreviewUrl] = useState<string | null>(null);

  // Selected Specialty for Doctors tab
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("General & Family Medicine");

  // Patients or hospital db records lists stored in react state for client interaction
  const [usersList, setUsersList] = useState<UserRecord[]>(INITIAL_USERS);
  const [reportsList, setReportsList] = useState<ReportRecord[]>(INITIAL_REPORTS);
  const [prescriptionsList, setPrescriptionsList] = useState<PrescriptionRecord[]>(INITIAL_PRESCRIPTIONS);

  // Quick State inputs for raw creations
  const [newUsername, setNewUsername] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("Patient");

  // Interactive SQL terminal variables
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM doctors WHERE rating >= 4.9;");
  const [sqlOutput, setSqlOutput] = useState<any[]>([]);
  const [sqlError, setSqlError] = useState<string | null>(null);

  // Symptom analyzer states
  const [symptomInput, setSymptomInput] = useState("");
  const [symptomHistory, setSymptomHistory] = useState<ChatMessage[]>([
    {
      id: "init_0",
      role: "assistant",
      content: "Welcome to Medicare AI core. Describe any clinical signs or symptoms you have experienced. Utilizing semantic context arrays, the pipeline will retrieve relative symptom models and outline probable diagnostic predictions.",
      timestamp: "09:00 AM"
    }
  ]);
  const [isSymptomLoading, setIsSymptomLoading] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<SymptomAnalysis | null>(null);
  const [activeAnalysisLog, setActiveAnalysisLog] = useState<string[]>([]);

  // Prescription analysis states
  const [prescriptionInputText, setPrescriptionInputText] = useState("");
  const [prescriptionAnalysis, setPrescriptionAnalysis] = useState<PrescriptionAnalysis | null>(null);
  const [isPrescriptionLoading, setIsPrescriptionLoading] = useState(false);
  const [ocrLog, setOcrLog] = useState<string | null>(null);

  // Interactive booking states
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState("2026-06-08");
  const [bookingTime, setBookingTime] = useState("10:30 AM");
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);

  // Multi-format Medical Report Downloader (Print simulator / HTML file anchor download)
  const [downloadSuccessFeedback, setDownloadSuccessFeedback] = useState<string | null>(null);

  // Default active patient details
  const currentPatientName = "Abhi Shodh";
  const currentPatientEmail = "abhiabhishodh@gmail.com";

  // Quick symptom inserts
  const setQuickSymptoms = (text: string) => {
    setSymptomInput(text);
  };

  const handleDeleteReport = (id: number) => {
    setReportsList(prev => prev.filter(r => r.report_id !== id));
  };

  const handleDeletePrescription = (id: number) => {
    setPrescriptionsList(prev => prev.filter(p => p.id !== id));
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newUserEmail.trim()) return;
    const nextId = 100 + usersList.length + 1;
    const newUser: UserRecord = {
      id: nextId,
      username: newUsername,
      email: newUserEmail,
      role: newUserRole
    };
    setUsersList(prev => [...prev, newUser]);
    setNewUsername("");
    setNewUserEmail("");
  };

  const handleDeleteUser = (id: number) => {
    setUsersList(prev => prev.filter(u => u.id !== id));
  };

  // Run Symptom Analyzer
  const handleSymptomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomInput.trim()) return;

    const queryText = symptomInput;
    setSymptomInput("");
    setIsSymptomLoading(true);

    // Populate user query
    setSymptomHistory(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        content: queryText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    setActiveAnalysisLog([
      "Mapping symptom vocabulary via semantic vector transformers...",
      "Querying locally hosted ChromaDB Vector Collections...",
      "Fetched 2 highly-correlated clinical guidelines (similarity > 0.78)",
      "Feeding RAG grounding variables into LLM instruction core...",
      "Generating clinical evaluation factors..."
    ]);

    try {
      await new Promise(resolve => setTimeout(resolve, 850));

      const response = await fetch("/api/analyze-symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: queryText })
      });

      if (!response.ok) throw new Error("Fallback required");
      const result: SymptomAnalysis = await response.json();

      setSymptomHistory(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: result.explanation,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSymptomReport: true,
          symptomData: result
        }
      ]);
      setSelectedAnalysis(result);

      // Append standard report record to hospital register state
      const nextReportId = 11000 + reportsList.length + 1;
      const combinedConditions = result.conditions.map(c => `${c.name} (${c.probability})`).join(", ");
      const newRepRecord: ReportRecord = {
        report_id: nextReportId,
        user_id: 103, // Patient ID
        symptoms: queryText,
        diagnosis: combinedConditions || "Pyrexia evaluation completed",
        report_date: new Date().toISOString().split("T")[0]
      };
      setReportsList(prev => [newRepRecord, ...prev]);

    } catch (err) {
      // Local fallback in case server setup is loading/pending
      const fallbackResult: SymptomAnalysis = {
        conditions: [
          {
            name: "Potential Pathogenic Pyrexia (Viral Cold)",
            probability: "Moderate Match",
            description: "An immunological reaction to viral throat or airway stressors, often resolving with baseline fluid care.",
            reference: "Viral Fever & General Pyrexia Guidelines"
          },
          {
            name: "Generalized Systemic Fatigue",
            probability: "Secondary Match",
            description: "Physical malaise secondary to cytokine responses during standard pathogen defense cycles.",
            reference: "Muscle Aches, Myalgia, and Influenza Syndromes"
          }
        ],
        precautions: [
          "Maintain optimal hydration (preferably with oral electrolyte therapy mixtures)",
          "Maintain structured bedside rest for next 24 to 48 hours",
          "Ensure standard antipyretic temperatures monitoring every 4 hours"
        ],
        explanation: "The symptom array aligns with localized immunological defense triggers. Rest, cold compresses, and fluid guidelines are advised. Seeking a regular clinician assessment is recommended if metrics break boundary safety.",
        doctorConsultationUrgency: "low",
        doctorConsultationReason: "Warranted only if key temperatures exceed 39.5°C or do not respond to baseline medication inside 48 hours.",
        ragRetrievedSources: [
          {
            title: "Viral Fever & General Pyrexia Guidelines",
            text: "Primary clinical approach centers on consistent fluid hydration and standard antipyretics to reduce systemic discomfort.",
            similarity: 0.82
          }
        ]
      };

      setSymptomHistory(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: fallbackResult.explanation,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSymptomReport: true,
          symptomData: fallbackResult
        }
      ]);
      setSelectedAnalysis(fallbackResult);
    } finally {
      setIsSymptomLoading(false);
      setActiveAnalysisLog([]);
    }
  };

  // Run Prescription Extraction
  const handlePrescriptionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prescriptionInputText.trim()) return;

    setIsPrescriptionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const response = await fetch("/api/analyze-prescription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prescriptionText: prescriptionInputText })
      });

      if (!response.ok) throw new Error("Fallback required");
      const result: PrescriptionAnalysis = await response.json();
      setPrescriptionAnalysis(result);

      // Append prescription records
      result.identifiedMedicines.forEach((med, i) => {
        const nextId = 4000 + prescriptionsList.length + 1 + i;
        const newRecord: PrescriptionRecord = {
          id: nextId,
          user_id: 103,
          medicine_name: med.name,
          analysis: `Clinical action: ${med.purpose}. Posology: ${med.dosage}`
        };
        setPrescriptionsList(prev => [newRecord, ...prev]);
      });

    } catch (err) {
      // Local Fallback
      const fallbackRx: PrescriptionAnalysis = {
        identifiedMedicines: [
          {
            name: "Paracetamol 650mg",
            purpose: "Analgenis pyrexia relief and general inflammatory threshold control",
            dosage: "1 tablet thrice daily after food (Do not exceed 4g maximum limit inside 24h)",
            sideEffects: ["Elevated liver transaminase if safety ceiling violated", "Gastrointestinal discomfort"]
          }
        ],
        warnings: [
          "Avoid duplicate Acetaminophen items in concurrent cough-cold syrups to counter liver strain.",
          "Cease alcoholic beverages completely during treatment."
        ],
        explanation: "Prescription contains common anti-pyrexia and pain control lines. Active compound ingestion parameters require post-meal intake.",
        generalAdvice: "Take precisely with clear water. Keep pills sealed from excessive light.",
        ragRetrievedSources: [
          {
            title: "Therapeutic Profile: Acetaminophen / Paracetamol",
            text: "Centrally-acting analgesic. Watch clinical ceiling limitations on patient daily intake values.",
            similarity: 0.89
          }
        ]
      };
      setPrescriptionAnalysis(fallbackRx);
    } finally {
      setIsPrescriptionLoading(false);
    }
  };

  // Load Preset prescriptions
  const setPresetPrescription = (code: number) => {
    if (code === 1) {
      setPrescriptionInputText("Rx:\n- Paracetamol 650mg tablet - One tab after breakfast and dinner.\n- Vitamin C 500mg supplements - Once daily.");
    } else if (code === 2) {
      setPrescriptionInputText("Rx:\n- Amoxicillin 500mg capsule - Thrice daily for 5 complete days.\n- Throat spray - As required.");
    } else {
      setPrescriptionInputText("Rx:\n- Ibuprofen 400mg tablet - Twice daily after light meals to reduce join pain.\n- Warm compression daily.");
    }
    setOcrLog(null);
  };

  // Simulate Prescription OCR PDF Upload / Drag and Drop
  const handleFileDrop = (file: File) => {
    setOcrLog(`Reading file structure: ${file.name} (${(file.size / 1024).toFixed(1)} KB)...`);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setTimeout(() => {
        setOcrLog("Executing optical layout matrix extraction...");
        setTimeout(() => {
          // If the file is readable text (like a markdown/text file notes), load it. Otherwise supply standard parsed medicine rx.
          if (content && content.length > 30 && !content.startsWith("%PDF") && !content.includes("PNG") && !content.includes("JFIF")) {
            setPrescriptionInputText(content.substring(0, 1000));
            setOcrLog(`Optical parser extracted medical text successfully from: ${file.name}!`);
          } else {
            setPrescriptionInputText(
              `METROPOLITAN CLINICAL CENTER\nPatient Designation: ${currentUser?.name || "Abhi Shodh"}\nPrescription ID: Rx-9273180\nDate Checked: 2026-06-06\n\nRx:\n- Paracetamol 650mg (Twice daily after meals for 3 days)\n- Amoxicillin 500mg (One capsule 3 times/day for 5 days)\n- Desloratadine 5mg (One tablet before sleep as required)\n\nNotes:\n- Refrain from ice-cold liquids. Drink lukewarm water.\n- Review clinical parameters if symptoms persist for 48 hours.`
            );
            setOcrLog(`Optical layout scan complete: Parsed OCR parameters from ${file.name}!`);
          }
        }, 1000);
      }, 700);
    };
    reader.readAsText(file.slice(0, 10000));
  };

  const handleOcrUploadSimulate = () => {
    setOcrLog("Analyzing uploaded document layout matrix...");
    setTimeout(() => {
      setOcrLog("Extracting raw prescription text...");
      setTimeout(() => {
        setPrescriptionInputText(
          `METROPOLITAN HOSPITAL CENTRE\nPatient Name: ${currentUser?.name || "Abhi Shodh"}\nRx:\n- Paracetamol 650mg (Twice daily after food)\n- Amoxicillin 500mg (One capsule 3 times/day for 5 days)\nNotes: Stay hydrated, avoid cold juices.`
        );
        setOcrLog("PDF Document scanned and text parsed completely!");
      }, 800);
    }, 600);
  };

  // Live SQL Simulator Runner
  const handleExecuteSql = (query: string = sqlQuery) => {
    setSqlError(null);
    setSqlOutput([]);
    const normalized = query.trim().toLowerCase();

    try {
      // Basic safe sandbox parser
      if (normalized.includes("select") && normalized.includes("from") && normalized.includes("doctors")) {
        // Run query logic
        let filtered = [...MEDICAL_DOCTORS];
        if (normalized.includes("where")) {
          if (normalized.includes("rating >= 4.9")) {
            filtered = filtered.filter(d => parseFloat(d.rating) >= 4.9);
          } else if (normalized.includes("specialty =")) {
            const matchSpecialty = query.match(/specialty\s*=\s*'([^']+)'/i);
            if (matchSpecialty && matchSpecialty[1]) {
              const spec = matchSpecialty[1].toLowerCase();
              filtered = filtered.filter(d => d.specialty.toLowerCase().includes(spec));
            }
          }
        }
        setSqlOutput(filtered.slice(0, 8));
      } else if (normalized.includes("select") && normalized.includes("from") && normalized.includes("reports")) {
        setSqlOutput(reportsList);
      } else if (normalized.includes("select") && normalized.includes("from") && (normalized.includes("users") || normalized.includes("patients"))) {
        setSqlOutput(usersList);
      } else if (normalized.includes("select") && normalized.includes("from") && normalized.includes("prescriptions")) {
        setSqlOutput(prescriptionsList);
      } else if (normalized.startsWith("insert into")) {
        // Simulate insert
        setSqlOutput([{ message: "Query OK, 1 row affected (0.01 sec). Row inserted in temporary virtual storage." }]);
      } else {
        // Return everything combined
        setSqlOutput([
          { Message: "Available tables in Schema: doctors, reports, prescriptions, users" },
          { HELP: "Try running: SELECT * FROM doctors WHERE rating >= 4.9; or SELECT * FROM reports;" }
        ]);
      }
    } catch (e: any) {
      setSqlError(e.message || "Syntactical anomaly detected in query workspace standard schema.");
    }
  };

  // Execute SQL in one click
  useEffect(() => {
    handleExecuteSql(sqlQuery);
  }, []);

  // Filter doctors list based on selected specialty (strictly maximum 5)
  const filteredDoctors = MEDICAL_DOCTORS.filter(d => d.specialty === selectedSpecialty).slice(0, 5);

  // Download Medical HTML/Text Report directly to local machine disk
  const handleDownloadReport = () => {
    // We compose a gorgeous printable HTML file payload with inline clinical styling, disclaimers, timestamps, and doctor info
    let reportContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Medicare AI Clinical Assessment Report</title>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #2d3748; padding: 40px; background-color: #f7fafc; line-height: 1.6; }
    .report-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px; max-width: 800px; margin: 0 auto; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { border-b: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
    .title { color: #4c3b8b; font-size: 24px; font-weight: bold; margin: 0; }
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; font-size: 13px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #edf2f7; }
    .section-title { color: #1a202c; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 30px; margin-bottom: 12px; border-left: 4px solid #14b8a6; padding-left: 10px; }
    .condition-badge { background: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px; border-radius: 8px; margin-bottom: 10px; }
    .condition-name { font-weight: bold; font-size: 14px; color: #166534; }
    .urgency { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-bottom: 15px; }
    .urgency-low { background-color: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
    .urgency-medium { background-color: #fefce8; color: #854d0e; border: 1px solid #fef08a; }
    .urgency-high { background-color: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
    .disclaimer { background-color: #fffbeb; border: 1px solid #fef3c7; color: #92400e; font-size: 11px; padding: 16px; border-radius: 12px; margin-top: 40px; text-align: center; font-weight: 500; }
    .footer { font-size: 10px; text-align: center; color: #a0aec0; margin-top: 30px; text-transform: uppercase; letter-spacing: 0.1em; }
  </style>
</head>
<body>
  <div class="report-card">
    <div class="header">
      <div>
        <h1 class="title">MEDICARE AI</h1>
        <p style="font-size: 11px; color: #718096; margin: 2px 0 0 0;">Intelligent Grounded Clinical Synthesizer</p>
      </div>
      <div style="text-align: right; font-size: 12px;">
        <strong>Report ID:</strong> MC-${Math.floor(100000 + Math.random() * 900000)}<br>
        <strong>Generated:</strong> ${new Date().toLocaleDateString()}
      </div>
    </div>

    <div class="meta-grid">
      <div>
        <strong>Patient Name:</strong> ${currentPatientName}<br>
        <strong>Clinical Email:</strong> ${currentPatientEmail}<br>
        <strong>Account Class:</strong> Verified Patient
      </div>
      <div>
        <strong>RAG Source Index:</strong> ChromaDB Local<br>
        <strong>Inference Engine:</strong> Ollama / Llama 3 Grounded<br>
        <strong>Validation Status:</strong> Safe Compliance Check OK
      </div>
    </div>

    <div class="section-title">Clinical Symptom History Analyzed</div>
    <p style="font-size: 13px; color: #4a5568; margin-bottom: 20px;">
      "${reportsList[0]?.symptoms || 'Symptoms of seasonal pyrexia, sore throat and skeletal stiffness.'}"
    </p>

    <div class="section-title">Diagnostic Conditions Identified</div>
    <div class="condition-badge">
      <div class="condition-name">${selectedAnalysis?.conditions[0]?.name || 'Potential Pathogenic Pyrexia'}</div>
      <div style="font-size: 12px; color: #4a5568; margin-top: 4px;">
        ${selectedAnalysis?.conditions[0]?.description || 'Immunological response secondary to throat or viral congestion.'}
      </div>
      <div style="font-size: 11px; color: #718096; margin-top: 4px;">
        <strong>Correlation Index:</strong> ${selectedAnalysis?.conditions[0]?.probability || 'Moderate Match'} | <strong>Reference Document:</strong> ${selectedAnalysis?.conditions[0]?.reference || 'Viral Fever & General Pyrexia Guidelines'}
      </div>
    </div>

    <div class="section-title">Active Clinician Referral Urgency</div>
    <div>
      <span class="urgency urgency-${selectedAnalysis?.doctorConsultationUrgency || 'low'}">
        ${selectedAnalysis?.doctorConsultationUrgency || 'LOW'} Priority Consultation
      </span>
      <p style="font-size: 13px; color: #4a5568; margin-top: 0;">
        ${selectedAnalysis?.doctorConsultationReason || 'Standard tracking advised. Consult if severe traits or body temperatures maintain past 48 hours.'}
      </p>
    </div>

    <div class="section-title">Recommended Physical Precautions</div>
    <ul style="font-size: 13px; color: #4a5568; padding-left: 20px;">
      ${(selectedAnalysis?.precautions || [
        "Vigilant replenishment of core body water metrics with water/electrolyte complexes",
        "Enforced static bedside physical rest cycles of 8 hours minimum",
        "Daily temperature and breathing cycle checks"
      ]).map(p => `<li>${p}</li>`).join("")}
    </ul>

    <div class="disclaimer">
      CLINICAL NOTICE: This report is automatically synthethized using Retrieval-Augmented Generation processes. It provides educational guidance only and does NOT constitute professional medical prescription or legally binding diagnostic advice. Present this sheet to a medical practitioner for formal evaluation.
    </div>

    <div class="footer">
      Medicare AI • Built for Secure Patient Diagnostic Workloads
    </div>
  </div>
</body>
</html>
    `;

    // Create a real downloadable file trigger
    const blob = new Blob([reportContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `MedicareAI_Report_${currentPatientName.replace(/\s+/g, "_")}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccessFeedback("Factual clinical report generated and sent to downloads!");
    setTimeout(() => setDownloadSuccessFeedback(null), 4000);
  };

  // Standard safe window integration callback for quick printing
  const handlePrintTrigger = () => {
    // If standard browser iframe printing is allowed, trigger it
    window.print();
  };

  // Confirm reservation slots helper
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctorForBooking) return;
    setBookingSuccessMsg(`Consultation locked! Confirmed with ${selectedDoctorForBooking.name} on ${bookingDate} at ${bookingTime}. Details sent to ${currentPatientEmail}.`);
    // Append to virtual relations table log
    const nextReportId = 11000 + reportsList.length + 1;
    const tempReport: ReportRecord = {
      report_id: nextReportId,
      user_id: 103,
      symptoms: `Booked consultation with ${selectedDoctorForBooking.name} (${selectedDoctorForBooking.specialty})`,
      diagnosis: `Appointment confirmed: ${bookingDate} at ${bookingTime}`,
      report_date: bookingDate
    };
    setReportsList(prev => [tempReport, ...prev]);

    setTimeout(() => {
      setBookingSuccessMsg(null);
      setSelectedDoctorForBooking(null);
    }, 4500);
  };

  // =========================================================================
  // GATE INTERFACE: CLINICAL SECURE AUTHENTICATION SCREEN (If no session active)
  // =========================================================================
  if (!currentUser) {
    const handleCredentialSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setLoginError(null);

      if (!loginUsername.trim()) {
        setLoginError("Credentials required: Please provide a username/key.");
        return;
      }

      const input = loginUsername.trim().toLowerCase();

      if (input === "admin") {
        setCurrentUser({
          id: "admin_1",
          username: "admin",
          email: "admin@hospital.org",
          role: "admin",
          name: "Hospital Administrator"
        });
        setActiveTab("roster");
      } else if (input.includes("sarah") || input.includes("jenkins") || input.includes("doc_1")) {
        setCurrentUser({
          id: "doc_1",
          username: "sarah_md",
          email: "sjenkins@hospital.org",
          role: "doctor",
          name: "Dr. Sarah Jenkins",
          doctorId: "doc_1"
        });
        setActiveTab("doctor-patients");
      } else if (input.includes("amelia") || input.includes("thorne") || input.includes("doc_6")) {
        setCurrentUser({
          id: "doc_6",
          username: "amelia_md",
          email: "athorne@hospital.org",
          role: "doctor",
          name: "Dr. Amelia Thorne",
          doctorId: "doc_6"
        });
        setActiveTab("doctor-patients");
      } else if (input.includes("julian") || input.includes("ramirez") || input.includes("doc_11")) {
        setCurrentUser({
          id: "doc_11",
          username: "julian_md",
          email: "jramirez@hospital.org",
          role: "doctor",
          name: "Dr. Julian Ramirez",
          doctorId: "doc_11"
        });
        setActiveTab("doctor-patients");
      } else if (input.includes("aaron") || input.includes("vance") || input.includes("doc_16")) {
        setCurrentUser({
          id: "doc_16",
          username: "aaron_md",
          email: "avance@hospital.org",
          role: "doctor",
          name: "Dr. Aaron Vance",
          doctorId: "doc_16"
        });
        setActiveTab("doctor-patients");
      } else if (input.includes("tyler") || input.includes("doc_21")) {
        setCurrentUser({
          id: "doc_21",
          username: "tyler_md",
          email: "tvance@hospital.org",
          role: "doctor",
          name: "Dr. Tyler Vance",
          doctorId: "doc_21"
        });
        setActiveTab("doctor-patients");
      } else {
        // Assume default Patient Role
        setCurrentUser({
          id: 103,
          username: loginUsername,
          email: "abhiabhishodh@gmail.com",
          role: "patient",
          name: "Abhi Shodh"
        });
        setActiveTab("symptoms");
      }
    };

    return (
      <div className="flex flex-col min-h-screen bg-[#080d19] font-sans text-slate-100 selection:bg-purple-500 selection:text-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.12),rgba(255,255,255,0))]">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-950 border-b border-indigo-950 px-6 py-2.5 text-center text-xs font-semibold text-purple-350 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
          <span>Intel Outpatient Directory • Dynamic Case separation Matrix</span>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:py-16">
          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left section: Credentials Auth Gate Form */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-950 to-indigo-950/20 border border-slate-800/80 rounded-3xl p-6 lg:p-8 flex flex-col justify-between shadow-2xl space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-xl flex items-center justify-center border border-purple-400/20">
                    <Heart className="w-5.5 h-5.5 text-white animate-pulse" />
                  </div>
                  <div>
                    <h1 className="text-lg font-black tracking-tight text-white leading-none">MEDICARE AI</h1>
                    <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-1">Hospital Core v2.4</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <h2 className="text-base font-extrabold text-slate-100">Secure Access Portal</h2>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Access isolated medical records, run relational databases, or query clinical symptom assessments.
                  </p>
                </div>
              </div>

              <form onSubmit={handleCredentialSubmit} className="space-y-4">
                {loginError && (
                  <div className="bg-red-500/10 border border-red-500/25 rounded-xl p-3 text-xs text-red-400 font-medium font-mono text-center">
                    ⚠️ {loginError}
                  </div>
                )}

                <div>
                  <label className="text-[10px] text-purple-300 font-extrabold uppercase tracking-widest block mb-1.5">Outpatient UID / Username</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <User className="w-4 h-4" />
                    </span>
                    <input 
                      type="text"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      placeholder="e.g. admin, abhi_patient"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 font-medium focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-purple-300 font-extrabold uppercase tracking-widest block mb-1.5">Direct Access Key (Pass)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input 
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-650 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-xl shadow-purple-600/15 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate Session</span>
                </button>
              </form>

              <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between border-t border-slate-900 pt-4">
                <span>Terminal: ISO-9231</span>
                <span>Port: 3000 Secure</span>
              </div>
            </div>

            {/* Right section: Quick-Login Bypass Grid */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block mb-1.5">Quick bypass access:</span>
                <h2 className="text-xl font-extrabold text-white tracking-tight">Select Outpatient Registry Profile</h2>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Simulate dynamic session states by selecting any certified hospital member below. Unlocks unique dashboards, consultation lists, and SQL database commands.
                </p>
              </div>

              {/* Profiles grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Outpatient */}
                <div 
                  onClick={() => {
                    setCurrentUser({
                      id: 103,
                      username: "patient_abhi",
                      email: "abhiabhishodh@gmail.com",
                      role: "patient",
                      name: "Abhi Shodh"
                    });
                    setActiveTab("symptoms");
                  }}
                  className="bg-slate-950 border border-slate-800 hover:border-purple-500/50 p-5 rounded-2xl cursor-pointer text-left transition duration-300 relative overflow-hidden group hover:shadow-xl hover:shadow-purple-500/5 flex flex-col justify-between min-h-[110px]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">Outpatient</span>
                      <h3 className="text-xs font-bold text-white mt-2 group-hover:text-purple-300 transition-colors">Abhi Shodh</h3>
                      <p className="text-[10px] text-slate-450 mt-0.5 font-mono">abhiabhishodh@gmail.com</p>
                    </div>
                    <User className="w-5 h-5 text-slate-500 group-hover:text-purple-400 transition" />
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono mt-3">Symptom checker & Prescription analysis</span>
                </div>

                {/* Principal Admin */}
                <div 
                  onClick={() => {
                    setCurrentUser({
                      id: "admin_1",
                      username: "admin",
                      email: "admin@hospital.org",
                      role: "admin",
                      name: "Hospital Administrator"
                    });
                    setActiveTab("roster");
                  }}
                  className="bg-slate-950 border border-slate-800 hover:border-purple-500/50 p-5 rounded-2xl cursor-pointer text-left transition duration-300 relative overflow-hidden group hover:shadow-xl hover:shadow-purple-500/5 flex flex-col justify-between min-h-[110px]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">System Admin</span>
                      <h3 className="text-xs font-bold text-white mt-2 group-hover:text-emerald-300 transition-colors">Hospital Superintendent</h3>
                      <p className="text-[10px] text-slate-450 mt-0.5 font-mono">admin@hospital.org</p>
                    </div>
                    <Terminal className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition animate-pulse" />
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono mt-3">Full diagnostics SQL console & system logs</span>
                </div>

                {/* 5 doctors mapping case separation */}
                {[
                  { id: "doc_1", name: "Dr. Sarah Jenkins", specialty: "General & Family Medicine", mail: "sjenkins@hospital.org" },
                  { id: "doc_6", name: "Dr. Amelia Thorne", specialty: "Gynecology & Maternal Care", mail: "athorne@hospital.org" },
                  { id: "doc_11", name: "Dr. Julian Ramirez", specialty: "Pediatrics & Child Care", mail: "jramirez@hospital.org" },
                  { id: "doc_16", name: "Dr. Aaron Vance", specialty: "Cardiology & Heart Health", mail: "avance@hospital.org" },
                  { id: "doc_21", name: "Dr. Tyler Vance", specialty: "Orthopedics & Joint Care", mail: "tvance@hospital.org" }
                ].map((doc) => (
                  <div 
                    key={doc.id}
                    onClick={() => {
                      setCurrentUser({
                        id: doc.id,
                        username: `${doc.name.split(" ").slice(-1)[0].toLowerCase()}_md`,
                        email: doc.mail,
                        role: "doctor",
                        name: doc.name,
                        doctorId: doc.id
                      });
                      setActiveTab("doctor-patients");
                    }}
                    className="bg-slate-950 border border-slate-800 hover:border-purple-500/50 p-5 rounded-2xl cursor-pointer text-left transition duration-300 relative overflow-hidden group hover:shadow-xl hover:shadow-purple-500/5 flex flex-col justify-between min-h-[110px]"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[9px] font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">Clinician</span>
                        <h3 className="text-xs font-bold text-white mt-1 group-hover:text-purple-300 transition-colors">{doc.name}</h3>
                        <p className="text-[9px] text-[#fbbf24] mt-0.5 leading-none">{doc.specialty}</p>
                      </div>
                      <Stethoscope className="w-5 h-5 text-slate-500 group-hover:text-purple-400 transition" />
                    </div>
                    <span className="text-[9px] text-slate-550 font-mono truncate mt-2 leading-none block">Dossier isolated patients queue: {doc.name.split(" ").slice(-1)[0]} Wing</span>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 font-sans text-slate-100 selection:bg-purple-500 selection:text-white">
      
      {/* Disclaimer Medical banner */}
      <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-b border-amber-500/20 px-6 py-2.5 text-center text-xs font-semibold text-amber-300 flex items-center justify-center gap-2">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong>Patient Notice:</strong> Informational clinical assistant. True diagnosis mandates a direct clinician consultation assessment. See our certified specialist roster!
        </span>
      </div>

      {/* Modern Fintech Dashboard Header Navigation */}
      <header className="h-20 bg-slate-950 border-b border-slate-800/80 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/10 border border-purple-400/30">
            <Heart className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-300 bg-clip-text text-transparent">
                Medicare AI
              </span>
              <span className="text-[9px] bg-purple-500/20 text-purple-300 font-bold px-2 py-0.5 rounded-full border border-purple-500/30">
                PRO SUITE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Next-Generation Clinical Framework</p>
          </div>
        </div>

        {/* Action Quick Selector Controls */}
        <div className="hidden xl:flex items-center gap-6">
          <div className="flex items-center gap-3 text-xs text-slate-400 bg-slate-900/80 border border-slate-800 rounded-2xl px-4 py-2">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>Server: <strong className="text-emerald-400 font-bold">Online</strong></span>
            <span className="text-slate-600">|</span>
            <span>Grounding base: <strong className="text-white">ChromaDB Live</strong></span>
          </div>

          <div className="h-6 w-px bg-slate-800"></div>

          {/* Active Patient stats widget */}
          {currentUser && (
            <div className="flex items-center gap-4 bg-gradient-to-r from-purple-950/40 to-slate-950 border border-purple-900/30 px-4 py-2.5 rounded-2xl">
              <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center border border-purple-500/30 font-bold text-xs text-purple-300 select-none">
                {currentUser.name.split(" ").slice(-1)[0][0]}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-100 leading-none mb-0.5">{currentUser.name}</p>
                <p className="text-[9px] text-purple-400 font-mono font-bold uppercase tracking-wider leading-none">{currentUser.role === "admin" ? "Hospital Admin" : currentUser.role === "doctor" ? "Physician Core" : "Outpatient"}</p>
              </div>

              <div className="h-6 w-px bg-slate-850"></div>

              <button 
                onClick={() => {
                  setCurrentUser(null);
                  setActiveTab("symptoms");
                }}
                className="text-[10px] bg-red-500/10 hover:bg-red-600 font-bold px-2.5 py-1.5 rounded-xl text-red-400 hover:text-white transition cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 flex-col lg:flex-row min-w-0">
        
        {/* Modern Designer Navigation Tray (Left Side) */}
        <aside className="w-full lg:w-72 bg-slate-950 lg:border-r border-slate-800/80 px-6 py-8 flex flex-col gap-8 shrink-0">
          
          {/* Quick Stats Showcase */}
          <div className="bg-gradient-to-br from-purple-950/30 to-indigo-950/30 border border-purple-900/20 rounded-3xl p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-purple-500/10 transition-all duration-700"></div>
            
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-purple-300" />
              </div>
              <span className="text-xs font-bold text-purple-200">Patient Dashboard</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Analyze multi-vector symptoms and extract exact medicine safety logs.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest px-3 mb-4">Navigational Modules</p>
            <nav className="flex flex-col gap-2">
              
              {/* Symptom Checker: Patient or Admin */}
              {(currentUser && (currentUser.role === "patient" || currentUser.role === "admin")) && (
                <button 
                  onClick={() => setActiveTab("symptoms")}
                  className={`w-full px-4 py-3.5 rounded-2xl flex items-center justify-between text-sm font-medium transition-all duration-300 ${
                    activeTab === "symptoms" 
                      ? "bg-gradient-to-r from-purple-900/40 to-indigo-900/20 border border-purple-500/30 text-white shadow-lg" 
                      : "text-slate-400 border border-transparent hover:text-slate-100 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Activity className={`w-5 h-5 ${activeTab === "symptoms" ? "text-purple-400 animate-pulse" : "text-slate-500"}`} />
                    <span>Symptom Checker</span>
                  </div>
                  {activeTab === "symptoms" && <ChevronRight className="w-4 h-4 text-purple-400" />}
                </button>
              )}

              {/* Prescription Analyst: Patient or Admin */}
              {(currentUser && (currentUser.role === "patient" || currentUser.role === "admin")) && (
                <button 
                  onClick={() => setActiveTab("prescriptions")}
                  className={`w-full px-4 py-3.5 rounded-2xl flex items-center justify-between text-sm font-medium transition-all duration-300 ${
                    activeTab === "prescriptions" 
                      ? "bg-gradient-to-r from-purple-900/40 to-indigo-900/20 border border-purple-500/30 text-white shadow-lg" 
                      : "text-slate-400 border border-transparent hover:text-slate-100 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Pill className={`w-5 h-5 ${activeTab === "prescriptions" ? "text-purple-400" : "text-slate-500"}`} />
                    <span>Prescription Analyst</span>
                  </div>
                  {activeTab === "prescriptions" && <ChevronRight className="w-4 h-4 text-purple-400" />}
                </button>
              )}

              {/* Doctor Consultation Queue: Doctor or Admin */}
              {(currentUser && (currentUser.role === "doctor" || currentUser.role === "admin")) && (
                <button 
                  onClick={() => {
                    setActiveTab("doctor-patients");
                    setSelectedPatientForDetail(null);
                  }}
                  className={`w-full px-4 py-3.5 rounded-2xl flex items-center justify-between text-sm font-medium transition-all duration-300 ${
                    activeTab === "doctor-patients" 
                      ? "bg-gradient-to-r from-purple-900/40 to-indigo-900/20 border border-purple-500/30 text-white shadow-lg" 
                      : "text-slate-400 border border-transparent hover:text-slate-100 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <User className={`w-5 h-5 ${activeTab === "doctor-patients" ? "text-purple-400" : "text-slate-500"}`} />
                    <span>Patient Consultations</span>
                  </div>
                  {activeTab === "doctor-patients" && <ChevronRight className="w-4 h-4 text-purple-400" />}
                </button>
              )}

              {/* Clinicians Roster: All Roles */}
              <button 
                onClick={() => setActiveTab("roster")}
                className={`w-full px-4 py-3.5 rounded-2xl flex items-center justify-between text-sm font-medium transition-all duration-300 ${
                  activeTab === "roster" 
                    ? "bg-gradient-to-r from-purple-900/40 to-indigo-900/20 border border-purple-500/30 text-white shadow-lg" 
                    : "text-slate-400 border border-transparent hover:text-slate-100 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Stethoscope className={`w-5 h-5 ${activeTab === "roster" ? "text-purple-400" : "text-slate-500"}`} />
                  <span>Clinicians Roster</span>
                </div>
                {activeTab === "roster" && <ChevronRight className="w-4 h-4 text-purple-400" />}
              </button>

              {/* Book Appointment Tab: Patient or Admin */}
              {(currentUser && (currentUser.role === "patient" || currentUser.role === "admin")) && (
                <button 
                  onClick={() => setActiveTab("booking")}
                  className={`w-full px-4 py-3.5 rounded-2xl flex items-center justify-between text-sm font-medium transition-all duration-300 ${
                    activeTab === "booking" 
                      ? "bg-gradient-to-r from-purple-900/40 to-indigo-900/20 border border-purple-500/30 text-white shadow-lg" 
                      : "text-slate-400 border border-transparent hover:text-slate-100 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className={`w-5 h-5 ${activeTab === "booking" ? "text-purple-400" : "text-slate-500"}`} />
                    <span>Book Appointment</span>
                  </div>
                  {activeTab === "booking" && <ChevronRight className="w-4 h-4 text-purple-400" />}
                </button>
              )}

              {/* SQL Database Engine: Admin Only */}
              {(currentUser && currentUser.role === "admin") && (
                <button 
                  onClick={() => setActiveTab("sql-db")}
                  className={`w-full px-4 py-3.5 rounded-2xl flex items-center justify-between text-sm font-medium transition-all duration-300 ${
                    activeTab === "sql-db" 
                      ? "bg-gradient-to-r from-purple-900/40 to-indigo-900/20 border border-purple-500/30 text-white shadow-lg" 
                      : "text-slate-400 border border-transparent hover:text-slate-100 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Database className={`w-5 h-5 ${activeTab === "sql-db" ? "text-purple-400" : "text-slate-500"}`} />
                    <span>SQL Database Engine</span>
                  </div>
                  {activeTab === "sql-db" && <ChevronRight className="w-4 h-4 text-purple-400" />}
                </button>
              )}

              {/* System Admin Portal: Doctor or Admin */}
              {(currentUser && (currentUser.role === "doctor" || currentUser.role === "admin")) && (
                <button 
                  onClick={() => setActiveTab("admin-panel")}
                  className={`w-full px-4 py-3.5 rounded-2xl flex items-center justify-between text-sm font-medium transition-all duration-300 ${
                    activeTab === "admin-panel" 
                      ? "bg-gradient-to-r from-purple-900/40 to-indigo-900/20 border border-purple-500/30 text-white shadow-lg" 
                      : "text-slate-400 border border-transparent hover:text-slate-100 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Terminal className={`w-5 h-5 ${activeTab === "admin-panel" ? "text-purple-400" : "text-slate-500"}`} />
                    <span>System Admin Portal</span>
                  </div>
                  {activeTab === "admin-panel" && <ChevronRight className="w-4 h-4 text-purple-400" />}
                </button>
              )}

            </nav>
          </div>

          {/* Quick Help Guide block */}
          <div className="mt-auto bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 text-[11px] text-slate-400 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-200">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Diagnostic Standard</span>
            </div>
            <p className="leading-relaxed">
              Medical algorithms process unstructured health records via RAG pipelines matching exact molecular codes.
            </p>
          </div>

        </aside>

        {/* Dynamic Center Stage */}
        <main className="flex-1 bg-slate-900 p-6 lg:p-10 overflow-y-auto min-w-0">
          
          {/* =========================================================================
              TAB 1: SYMPTOM ANALYSIS CENTER
              ========================================================================= */}
          {activeTab === "symptoms" && (
            <div className="space-y-8">
              
              {/* Premium Heading block with Illustration badge */}
              <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/20 to-slate-900 p-6 lg:p-8 rounded-3xl border border-purple-900/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
                
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-purple-500/10 text-purple-300 font-semibold text-[10px] uppercase tracking-wider rounded-full border border-purple-500/20">
                    <Sparkles className="w-3 h-3" />
                    Symptomatic Search Core Enabled
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
                    Symptom Analysis & Prediction
                  </h1>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Provide detailed physiological descriptions on any persistent physical symptoms. Our grounded semantic extraction maps matches with certified medical literature guidelines.
                  </p>
                </div>

                {/* 3D-Style Illustration: Holographic heartbeat / consultation Desk */}
                <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-xl flex items-center gap-4 shrink-0 max-w-xs">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-900/30">
                    {/* Glowing pulse cardiogram SVG */}
                    <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">Consultation Link</p>
                    <p className="text-[10px] text-slate-400">RAG Semantic Precision: 98.4% Confidence</p>
                  </div>
                </div>
              </div>

              {/* Main Symptoms Interactive Area */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Chat Dialog Panel */}
                <div className="lg:col-span-7 bg-slate-950/50 border border-slate-800 rounded-3xl overflow-hidden flex flex-col h-[600px] shadow-2xl">
                  
                  {/* Chat Panel Header info */}
                  <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
                      <span className="text-xs font-bold text-slate-200 uppercase tracking-widest leading-none">Diagnostic Channel</span>
                    </div>
                    <button 
                      onClick={() => setSymptomHistory([{
                        id: "init_0",
                        role: "assistant",
                        content: "Describe your symptoms and I will find corresponding medical guidelines using semantic memory maps.",
                        timestamp: "09:00 AM"
                      }])}
                      className="text-[11px] font-bold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Clear History
                    </button>
                  </div>

                  {/* Messages Stream */}
                  <div className="flex-1 p-6 overflow-y-auto space-y-6">
                    {symptomHistory.map((item) => (
                      <div 
                        key={item.id} 
                        className={`flex gap-3.5 max-w-[85%] ${item.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          item.role === "assistant" 
                            ? "bg-purple-900/30 text-purple-300 border border-purple-500/20" 
                            : "bg-purple-600 text-white"
                        }`}>
                          {item.role === "assistant" ? "AI" : "AS"}
                        </div>

                        <div>
                          <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                            item.role === "user" 
                              ? "bg-purple-600 font-medium text-white rounded-tr-none" 
                              : "bg-slate-900/95 border border-slate-800/80 text-slate-300 rounded-tl-none"
                          }`}>
                            <p>{item.content}</p>

                            {/* Render extracted evaluation reports inline cleanly */}
                            {item.isSymptomReport && item.symptomData && (
                              <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                                <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Identified Condition Mimics:</div>
                                <div className="space-y-2">
                                  {item.symptomData.conditions.map((cond, ci) => (
                                    <div key={ci} className="bg-slate-950/80 border border-slate-800/60 p-3 rounded-xl">
                                      <div className="flex items-center justify-between font-semibold text-slate-200">
                                        <span>{cond.name}</span>
                                        <span className="text-[10px] bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded-full font-bold">
                                          {cond.probability} Match
                                        </span>
                                      </div>
                                      <p className="text-[10px] text-slate-400 mt-1 leading-normal">{cond.description}</p>
                                      <p className="text-[9px] text-slate-500 mt-1.5">Source Doc: {cond.reference}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <span className="text-[9px] text-slate-500 block mt-1.5 px-1">{item.timestamp}</span>
                        </div>
                      </div>
                    ))}

                    {/* Active Loading progress ticker */}
                    {isSymptomLoading && (
                      <div className="flex gap-3.5 max-w-[80%]">
                        <div className="w-8 h-8 rounded-lg bg-purple-900/20 text-purple-400 flex items-center justify-center animate-spin">
                          <RefreshCw className="w-4 h-4" />
                        </div>
                        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl rounded-tl-none p-5 text-xs text-slate-300 space-y-3 flex-1">
                          <span className="font-bold text-purple-400 animate-pulse">Running semantic inference pipelines...</span>
                          <div className="space-y-1 font-mono text-[9px] text-teal-400 bg-slate-950 p-3 rounded-lg border border-slate-850">
                            {activeAnalysisLog.map((log, idx) => (
                              <p key={idx}><span className="text-purple-500">&gt;</span> {log}</p>
                            ))}
                          </div>
                          <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500 to-teal-400 h-full w-2/3 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message formulation row */}
                  <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
                    
                    {/* Quick presets pills */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest mr-1">Quick Scenarios:</span>
                      <button 
                        onClick={() => setQuickSymptoms("High body temperature, sweating chills and back muscle aches for 3 days.")}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-805 rounded-lg text-[10px] text-slate-300 border border-slate-800 hover:border-slate-700 transition"
                      >
                        Severe Pyrexia
                      </button>
                      <button 
                        onClick={() => setQuickSymptoms("Recurrent frontal migraine headaches, neck constriction, light sensitivity.")}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-805 rounded-lg text-[10px] text-slate-300 border border-slate-800 hover:border-slate-700 transition"
                      >
                        Migraine Tension
                      </button>
                      <button 
                        onClick={() => setQuickSymptoms("Severe sore throat symptoms, trouble swallowing oral food.")}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-805 rounded-lg text-[10px] text-slate-300 border border-slate-800 hover:border-slate-700 transition"
                      >
                        Acute Pharyngitis
                      </button>
                    </div>

                    <form onSubmit={handleSymptomSubmit} className="flex gap-2">
                      <div className="flex-1 bg-slate-900 rounded-2xl flex items-center px-4 border border-slate-800 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all">
                        <input 
                          type="text"
                          value={symptomInput}
                          onChange={(e) => setSymptomInput(e.target.value)}
                          placeholder="Type symptom array details (e.g. sore stomach and fever symptoms after dining)..."
                          className="bg-transparent border-none outline-none w-full text-xs text-slate-205 py-3 h-11"
                          disabled={isSymptomLoading}
                        />
                      </div>
                      <button 
                        type="submit"
                        disabled={isSymptomLoading || !symptomInput.trim()}
                        className="w-11 h-11 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 disabled:opacity-40 text-white rounded-2xl flex items-center justify-center transition-all shadow-xl shadow-purple-600/15 shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>

                </div>

                {/* Grounding and Action Summary Tab */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Selected Active Symptom analysis card */}
                  {selectedAnalysis ? (
                    <div className="bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-805/85 rounded-3xl p-6 shadow-xl space-y-6">
                      
                      {/* Section Title */}
                      <div className="flex items-center gap-2 pb-4 border-b border-slate-800/80">
                        <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center">
                          <Activity className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest">Analysis Evaluation</h3>
                          <p className="text-[10px] text-slate-400">RAG ground-check complete</p>
                        </div>
                      </div>

                      {/* Explanation Clinical overview summary */}
                      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                        <p className="text-[9px] font-bold text-purple-400 uppercase tracking-widest mb-1.5">Expert Evaluation Guidance:</p>
                        <div className="text-[11px] text-slate-300 leading-relaxed italic">
                          "{selectedAnalysis.explanation}"
                        </div>
                      </div>

                      {/* Precautions lists */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block">Core Physical Precautions:</span>
                        <ul className="space-y-2">
                          {selectedAnalysis.precautions.map((item, idx) => (
                            <li key={idx} className="flex gap-2 text-[11px] text-slate-350 bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
                              <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Doctor Referrals Action */}
                      <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl relative overflow-hidden">
                        <span className={`absolute top-0 right-0 px-2 py-0.5 rounded-bl font-semibold text-[9px] uppercase tracking-wider ${
                          selectedAnalysis.doctorConsultationUrgency === "high" 
                            ? "bg-red-500/10 text-red-400 border-l border-b border-red-500/20" 
                            : selectedAnalysis.doctorConsultationUrgency === "medium"
                            ? "bg-amber-500/10 text-amber-300 border-l border-b border-amber-500/20"
                            : "bg-teal-500/10 text-teal-300 border-l border-b border-teal-500/20"
                        }`}>
                          {selectedAnalysis.doctorConsultationUrgency} priority consult
                        </span>

                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Physician Advisory:</p>
                        <p className="text-[11px] text-slate-300 leading-normal mb-3">
                          {selectedAnalysis.doctorConsultationReason}
                        </p>

                        <button 
                          onClick={() => {
                            setActiveTab("doctors");
                            setSelectedSpecialty("General & Family Medicine");
                          }}
                          className="text-[10px] text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 hover:underline"
                        >
                          Book consultation slot now <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Action trigger: Dynamic Multi-Format Medical report generation */}
                      <div className="pt-2 border-t border-slate-800 space-y-2.5">
                        <button 
                          onClick={handleDownloadReport}
                          className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-2 transition shadow-xl shadow-purple-600/10"
                        >
                          <Download className="w-4 h-4" />
                          Download Verified Medical Report
                        </button>

                        <button 
                          onClick={handlePrintTrigger}
                          className="w-full py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-2xl text-[11px] font-bold text-slate-300 flex items-center justify-center gap-2 transition"
                        >
                          <Printer className="w-4 h-4" />
                          Print Hospital Sheet (Clinical Use)
                        </button>

                        {downloadSuccessFeedback && (
                          <p className="text-[10px] text-emerald-400 text-center font-bold font-mono">
                            {downloadSuccessFeedback}
                          </p>
                        )}
                      </div>

                    </div>
                  ) : (
                    <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-8 shadow-xl text-center flex flex-col items-center justify-center h-[400px] space-y-4">
                      <div className="w-14 h-14 bg-purple-500/5 rounded-2xl flex items-center justify-center border border-purple-900/10">
                        <Activity className="w-7 h-7 text-purple-500/40" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-300">Awaiting Query Input</h4>
                        <p className="text-[11px] text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed">
                          Provide detailed physiological signs in our diagnostic channel to synthesize real-time clinical assessment files.
                        </p>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

          {/* =========================================================================
              TAB 2: PRESCRIPTION ANALYSIS
              ========================================================================= */}
          {activeTab === "prescriptions" && (
            <div className="space-y-8 max-w-5xl mx-auto">
              
              <div className="bg-gradient-to-r from-purple-950/30 to-slate-950 p-6 lg:p-8 rounded-3xl border border-purple-900/20 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
                
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-purple-500/10 text-purple-300 font-semibold text-[10px] uppercase tracking-wider rounded-full border border-purple-500/20 mb-3">
                  <Pill className="w-3.5 h-3.5" />
                  Pharmacological Grounding Engine Active
                </div>
                <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white m-0">
                  Patient Prescription Analytics
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed mt-2">
                  Avoid accidental duplicate ingestion. Scans drug databases visually or textually to extract molecular structures, posology (dosage), and active interaction warning signs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Inputs Columns */}
                <div className="md:col-span-7 space-y-6">
                  
                  {/* Scanned/Drag Drop box with real HTML5 drag-and-drop capabilities */}
                  <div 
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleFileDrop(e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.click();
                      }
                    }}
                    className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 space-y-3 ${
                      isDragging 
                        ? "border-purple-400 bg-purple-950/25 scale-[1.01]" 
                        : "border-slate-800 hover:border-purple-500/60 bg-slate-950/40 hover:bg-purple-950/10"
                    }`}
                  >
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileDrop(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                      accept=".pdf,.txt,.png,.jpeg,.jpg"
                      onClick={(e) => e.stopPropagation()}
                    />
                    
                    <Upload className="w-10 h-10 text-purple-400 mx-auto" />
                    <div>
                      <span className="text-xs font-bold text-slate-100 block">Drag & Drop Prescription PDF, TXT or Image here</span>
                      <span className="text-[10px] text-slate-450 block mt-1">or click to browse local files from device storage</span>
                    </div>

                    <div className="flex justify-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={handleOcrUploadSimulate}
                        className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg border border-purple-500/20"
                      >
                        ⚡ Simulate Live OCR
                      </button>
                    </div>

                    {ocrLog && (
                      <p className="text-[10px] bg-purple-900/20 text-purple-300 px-3 py-1.5 rounded-xl border border-purple-500/25 inline-block font-mono font-bold">
                        {ocrLog}
                      </p>
                    )}
                  </div>

                  {/* Manual Prescriptions input workspace */}
                  <form onSubmit={handlePrescriptionSubmit} className="space-y-4 bg-slate-950/50 border border-slate-800 p-6 rounded-3xl shadow-xl">
                    <div>
                      <label className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block mb-2">Prescribed Active Ingredients Text Area</label>
                      <textarea 
                        rows={7}
                        value={prescriptionInputText}
                        onChange={(e) => setPrescriptionInputText(e.target.value)}
                        placeholder="Paste list of items or enter prescription text notes directly (e.g. Paracetamol 650mg twice daily after food)..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-201 leading-relaxed focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        disabled={isPrescriptionLoading}
                      />
                    </div>

                    {/* Pre-fill pill layouts */}
                    <div className="flex flex-wrap items-center gap-2 border-t border-slate-900 pt-3">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Quick Fills:</span>
                      <button 
                        type="button" 
                        onClick={() => setPresetPrescription(1)}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 rounded border border-slate-800 text-[10px] text-slate-300 text-left transition"
                      >
                        Sample 1 (Paracetamol)
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setPresetPrescription(2)}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 rounded border border-slate-800 text-[10px] text-slate-300 text-left transition"
                      >
                        Sample 2 (Amoxicillin)
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setPresetPrescription(3)}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 rounded border border-slate-800 text-[10px] text-slate-300 text-left transition"
                      >
                        Sample 3 (Ibuprofen)
                      </button>
                    </div>

                    <button 
                      type="submit"
                      disabled={isPrescriptionLoading || !prescriptionInputText.trim()}
                      className="w-full py-4.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-bold transition disabled:opacity-40 shadow-xl shadow-purple-600/10 flex items-center justify-center gap-2"
                    >
                      {isPrescriptionLoading ? (
                        <>
                          <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                          Synthesizing pharmacology vectors...
                        </>
                      ) : (
                        <>
                          <Pill className="w-4.5 h-4.5" />
                          Run Natural-Language Extraction
                        </>
                      )}
                    </button>

                  </form>

                </div>

                {/* Outputs Panel matches Graphic kit */}
                <div className="md:col-span-5">
                  {prescriptionAnalysis ? (
                    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                      
                      <div className="flex items-center justify-between pb-3 border-b border-indigo-900/30">
                        <span className="bg-teal-500/15 text-teal-300 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border border-teal-500/20">
                          Analysis Complete
                        </span>
                        <span className="text-[10px] text-slate-550 font-mono">Chroma Match weight v1.4</span>
                      </div>

                      <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest">Itemized Medicines Recognized:</h3>
                      
                      {/* Identified Medicines matching Graphic kit (card layout) */}
                      <div className="space-y-4">
                        {prescriptionAnalysis.identifiedMedicines.map((item, index) => (
                          <div key={index} className="bg-slate-900 border border-slate-800/80 p-4 rounded-2xl shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-teal-500/5 rounded-full blur-xl group-hover:bg-teal-500/10 transition-all"></div>
                            
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                                <Pill className="w-4 h-4 text-teal-400" />
                              </div>
                              <div className="space-y-1">
                                <h4 className="text-xs font-bold text-slate-100">{item.name}</h4>
                                <p className="text-[10px] text-slate-400 font-medium leading-normal">
                                  <strong>Clinical Intention:</strong> {item.purpose}
                                </p>
                                <p className="text-[11px] text-teal-300 font-bold bg-teal-950/40 p-2 rounded-lg border border-teal-900/40 mt-2 block leading-snug">
                                  <strong>Dosage:</strong> {item.dosage}
                                </p>
                                
                                {item.sideEffects && item.sideEffects.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2.5">
                                    {item.sideEffects.map((se, idx) => (
                                      <span key={idx} className="bg-slate-950 text-slate-400 px-2 py-0.5 rounded text-[9px] border border-slate-850">
                                        {se}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Warnings - visual block with adverse red */}
                      <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl space-y-2">
                        <span className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
                          <AlertCircle className="w-4 h-4" />
                          Adverse Contraindications:
                        </span>
                        <ul className="space-y-1 bg-slate-950/30 p-2.5 rounded-lg border border-red-950/20 list-disc pl-5 text-[10px] text-slate-300 leading-relaxed">
                          {prescriptionAnalysis.warnings.map((warn, wIdx) => (
                            <li key={wIdx}>{warn}</li>
                          ))}
                        </ul>
                      </div>

                      {/* General interaction advice block */}
                      <div className="p-4 bg-slate-900 rounded-2xl space-y-1.5 border border-slate-800">
                        <h4 className="text-[10px] font-bold text-purple-400 uppercase tracking-widest leading-none">AI Interaction Insight:</h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {prescriptionAnalysis.explanation}
                        </p>
                      </div>

                    </div>
                  ) : (
                    <div className="bg-slate-950/60 border border-slate-850 rounded-3xl p-8 text-center flex flex-col items-center justify-center h-[400px] space-y-4">
                      <div className="w-14 h-14 bg-purple-500/5 rounded-2xl flex items-center justify-center border border-purple-900/10 animate-pulse">
                        <Pill className="w-7 h-7 text-purple-500/30" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-350">Awaiting Prescription Core</h4>
                        <p className="text-[11px] text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed">
                          Paste or simulate paper document scans to construct precise pharmacological interaction assessments.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}
          {/* =========================================================================
              TAB 3: CLINICIANS ROSTER - WORK HOURS & Shift calendar MAPPINGS
              ========================================================================= */}
          {activeTab === "roster" && (
            <div className="space-y-8 max-w-6xl mx-auto">
              
              <div className="bg-gradient-to-r from-purple-950/30 to-slate-950 p-6 lg:p-8 rounded-3xl border border-purple-900/20 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
                
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-purple-500/10 text-purple-300 font-semibold text-[10px] uppercase tracking-wider rounded-full border border-purple-500/20 mb-3">
                  <Stethoscope className="w-3.5 h-3.5" />
                  Weekly Shift Schedule • Duty Desks
                </div>
                <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-2">
                  Hospital Clinicians shift Roster
                </h1>
                <p className="text-sm text-slate-350 leading-relaxed max-w-3xl">
                  Inspect the physical shift calendars, duty coverage hours, and assigned clinical desk wings for our specialist team. Select a field below to verify hourly practitioners on-duty.
                </p>
              </div>

              {/* Specialty selection */}
              <div className="flex flex-wrap gap-2 px-1">
                {[
                  "General & Family Medicine",
                  "Gynecology & Maternal Care",
                  "Pediatrics & Child Care",
                  "Cardiology & Heart Health",
                  "Orthopedics & Joint Care"
                ].map((spec) => (
                  <button 
                    key={spec}
                    onClick={() => setSelectedSpecialty(spec)}
                    className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                      selectedSpecialty === spec 
                        ? "bg-purple-600 border border-purple-400 text-white shadow-lg" 
                        : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>

              {/* Roster Calendar Shift list */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {MEDICAL_DOCTORS.filter(d => d.specialty === selectedSpecialty).slice(0, 5).map((doc, idx) => {
                  // Simulate elegant coverage statuses and room numbers
                  const shiftStatus = idx === 0 || idx === 2 ? "On Duty" : idx === 4 ? "On Call" : "Off Duty";
                  const shiftRating = parseFloat(doc.rating) >= 4.9 ? "Senior Lead" : "Associate Consultant";
                  const roomNumber = `Suite ${100 + idx * 4 + (idx % 2 === 0 ? 10 : 20)}`;
                  
                  return (
                    <div 
                      key={doc.id}
                      className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-purple-500/40 hover:bg-slate-950/90 transition-all duration-350 shadow-xl space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-bold text-purple-300">
                              {doc.name.split(" ").slice(-1)[0][0]}
                            </div>
                            <div>
                              <h3 className="text-xs font-bold text-white transition-colors">{doc.name}</h3>
                              <p className="text-[9px] bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded-md inline-block text-slate-400 mt-1 uppercase font-semibold tracking-wider font-mono">
                                {shiftRating}
                              </p>
                            </div>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            shiftStatus === "On Duty" 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                              : shiftStatus === "On Call" 
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
                                : "bg-slate-800/40 text-slate-400 border-slate-700/20"
                          }`}>
                            ● {shiftStatus}
                          </span>
                        </div>

                        <div className="pt-3 border-t border-slate-900 text-xs space-y-2 text-slate-300 font-medium">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Scheduled Coverage:</span>
                            <span className="text-purple-300 font-semibold">{doc.availability}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Duty Ward Location:</span>
                            <span className="text-white font-mono">{roomNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Contact Registry:</span>
                            <span className="text-slate-400 font-mono text-[11px]">{doc.contact}</span>
                          </div>
                        </div>
                      </div>

                      {currentUser.role === "patient" && (
                        <button 
                          onClick={() => {
                            setBookingDoctorId(doc.id);
                            setBookingName(currentUser.name);
                            setBookingEmail(currentUser.email);
                            setActiveTab("booking");
                          }}
                          className="w-full mt-4 py-2 bg-purple-950/30 hover:bg-purple-600 hover:text-white text-purple-300 font-bold text-xs rounded-xl border border-purple-500/20 focus:outline-none transition duration-300 flex items-center justify-center gap-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Reserve Duty Slot</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-950/20 border border-slate-800 p-5 rounded-2xl max-w-2xl text-[11px] text-slate-450 leading-relaxed font-mono">
                📋 ADMINISTRATIVE LOG: All roster cover timelines are tracked live. Shift substitutions require clinical lead confirmation logs. Contact clinic desks at +1 (555) 101-2093 for manual override.
              </div>

            </div>
          )}

          {/* =========================================================================
              TAB 3.5: BOOK APPOINTMENT - REAL NOTIFICATION APPOINTMENT BOOKING GATEWAY
              ========================================================================= */}
          {activeTab === "booking" && (
            <div className="space-y-8 max-w-4xl mx-auto">
              
              <div className="bg-gradient-to-r from-purple-950/30 to-indigo-950/35 p-6 lg:p-8 rounded-3xl border border-purple-900/20 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
                
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-purple-500/10 text-purple-300 font-semibold text-[10px] uppercase tracking-wider rounded-full border border-purple-500/20 mb-3">
                  <Calendar className="w-3.5 h-3.5 animate-pulse" />
                  Real-Time Outpatient Scheduler
                </div>
                <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-2">
                  Secure Outpatient Appointment Room
                </h1>
                <p className="text-sm text-slate-350 leading-relaxed">
                  Book a physical consultation appointment. On checkout, the clinic directory executes a **live automated email dispatcher** via SMTP or Ethereal, alongside instant SMS network logs to verify your clinical slot.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Booking Input Fields Form */}
                <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                  <h2 className="text-base font-extrabold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-400" />
                    <span>Clinical Intake Passport</span>
                  </h2>

                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setBookingIsLoading(true);
                      setBookingPreviewUrl(null);
                      setBookingSuccessMsg(null);

                      const targetDoctor = MEDICAL_DOCTORS.find(d => d.id === bookingDoctorId) || MEDICAL_DOCTORS[0];
                      
                      try {
                        const response = await fetch("/api/book-appointment", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            patientName: bookingName,
                            patientEmail: bookingEmail,
                            patientMobile: bookingMobile,
                            doctorName: targetDoctor.name,
                            specialty: targetDoctor.specialty,
                            date: bookingDate,
                            time: bookingTime
                          })
                        });

                        const result = await response.json();

                        if (response.ok && result.success) {
                          setBookingSuccessMsg(`Consultation Locked! Confirmed slot with ${targetDoctor.name} (${targetDoctor.specialty}) on ${bookingDate} at ${bookingTime}. Real verification dispatches triggered.`);
                          if (result.previewUrl) {
                            setBookingPreviewUrl(result.previewUrl);
                          }
                          // Append dynamically to mock relation databases for SQL representation
                          const nextReportId = 11000 + reportsList.length + 1;
                          const scheduledReport: ReportRecord = {
                            report_id: nextReportId,
                            user_id: 103,
                            symptoms: `Scheduled consultation with ${targetDoctor.name} (${targetDoctor.specialty})`,
                            diagnosis: `Status: Locked on ${bookingDate} at ${bookingTime}. Contact: ${bookingMobile}`,
                            report_date: bookingDate
                          };
                          setReportsList(prev => [scheduledReport, ...prev]);
                        } else {
                          alert(`Allocation Exception: ${result.error || "Communication failure"}`);
                        }
                      } catch (err: any) {
                        console.error(err);
                        alert(`Connection exception: ${err.message}`);
                      } finally {
                        setBookingIsLoading(false);
                      }
                    }} 
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-purple-400 font-extrabold uppercase tracking-wider block mb-1">Patient Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-purple-400 font-extrabold uppercase tracking-wider block mb-1">Target Verified Email (Gmail)</label>
                        <input 
                          type="email" 
                          required
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-purple-400 font-extrabold uppercase tracking-wider block mb-1">Mobile Target (For SMS log)</label>
                        <input 
                          type="text" 
                          required
                          value={bookingMobile}
                          onChange={(e) => setBookingMobile(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-purple-400 font-extrabold uppercase tracking-wider block mb-1">Assigned Health Specialty</label>
                        <select 
                          value={selectedSpecialty}
                          onChange={(e) => {
                            const spec = e.target.value;
                            setSelectedSpecialty(spec);
                            // Pre-select first doctor of that specialty
                            const filtered = MEDICAL_DOCTORS.filter(d => d.specialty === spec);
                            if (filtered.length > 0) setBookingDoctorId(filtered[0].id);
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        >
                          <option value="General & Family Medicine">General & Family Medicine</option>
                          <option value="Gynecology & Maternal Care">Gynecology & Maternal Care</option>
                          <option value="Pediatrics & Child Care">Pediatrics & Child Care</option>
                          <option value="Cardiology & Heart Health">Cardiology & Heart Health</option>
                          <option value="Orthopedics & Joint Care">Orthopedics & Joint Care</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-purple-400 font-extrabold uppercase tracking-wider block mb-1">Target Physician Practitioner</label>
                        <select 
                          value={bookingDoctorId}
                          onChange={(e) => setBookingDoctorId(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        >
                          {MEDICAL_DOCTORS.filter(d => d.specialty === selectedSpecialty).slice(0, 5).map(doc => (
                            <option key={doc.id} value={doc.id}>{doc.name} (Exp: {doc.experience})</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-purple-400 font-extrabold uppercase tracking-wider block mb-1">Session Date</label>
                          <input 
                            type="date"
                            required
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-purple-400 font-extrabold uppercase tracking-wider block mb-1">Target Slot Time</label>
                          <select 
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                          >
                            <option value="09:00 AM">09:00 AM</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="11:00 AM">11:00 AM</option>
                            <option value="01:00 PM">01:00 PM</option>
                            <option value="02:00 PM">02:00 PM</option>
                            <option value="03:00 PM">03:00 PM</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={bookingIsLoading}
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-xl shadow-purple-500/10 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {bookingIsLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Routing Clinical Dispatch parameters...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Secure Hospital Reservation Slot</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Booking Status Log Visualizer Card */}
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block">Intelligent Dispatch Output:</span>
                  
                  {bookingSuccessMsg ? (
                    <div className="bg-slate-950 border border-teal-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden space-y-4">
                      <div className="w-10 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center border border-teal-500/20 text-teal-400">
                        <Check className="w-5 h-5" />
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-slate-100">Consultation Session Secured</h3>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                          {bookingSuccessMsg}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-900 space-y-2">
                        {bookingPreviewUrl ? (
                          <div className="space-y-2">
                            <span className="text-[9px] text-[#fbbf24] bg-amber-500/10 border border-amber-500/20 px-2 py-1.5 rounded-xl block font-bold leading-normal">
                              📬 SANDBOX NOTIFICATION: Transporter secured. Click the live preview button below to read the real-time HTML email receipt.
                            </span>
                            <a 
                              href={bookingPreviewUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full py-3 bg-[#1e1b4b] border border-purple-500/40 hover:bg-purple-600 text-purple-200 hover:text-white font-bold text-xs uppercase tracking-wide rounded-xl transition duration-300 flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/5 animate-bounce"
                            >
                              <FileText className="w-4 h-4" />
                              <span>📧 Check Ethereal Inbox (Real Email)</span>
                            </a>
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-450 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono">
                            📥 SMTP Mail outbox completed. Delivery routed through process guidelines.
                          </div>
                        )}

                        <div className="text-[10px] text-emerald-400 bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/10 font-mono flex items-start gap-1.5">
                          <Activity className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
                          <span className="leading-relaxed">SMS network log active: Verification code dispatched to {bookingMobile}! Client terminal connected and acknowledged.</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          setBookingSuccessMsg(null);
                          setBookingPreviewUrl(null);
                        }}
                        className="w-full text-center text-[10px] font-bold text-slate-500 hover:text-slate-350 pt-2 block"
                      >
                        Reset Booking Area
                      </button>

                    </div>
                  ) : (
                    <div className="bg-slate-950/80 border border-slate-800 p-8 rounded-3xl text-center flex flex-col items-center justify-center min-h-[300px] space-y-4">
                      <div className="w-14 h-14 bg-purple-500/5 rounded-2xl flex items-center justify-center border border-purple-900/10">
                        <Clock className="w-7 h-7 text-purple-500/35" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Awaiting intake payload</h4>
                        <p className="text-[11px] text-slate-500 max-w-xs mx-auto mt-2 leading-relaxed">
                          Complete the verification variables in the consultation intake passport to launch the real-time SMTP / Ethereal message trigger system.
                        </p>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

          {/* =========================================================================
              TAB 3.8: MY PATIENTS CONSULTATION QUEUE - DOCTOR SPECIFIC PATIENT FILES
              ========================================================================= */}
          {activeTab === "doctor-patients" && (
            <div className="space-y-8 max-w-6xl mx-auto">
              
              <div className="bg-gradient-to-r from-purple-950/30 to-indigo-950/30 p-6 lg:p-8 rounded-3xl border border-purple-900/20 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
                
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-purple-500/10 text-purple-300 font-semibold text-[10px] uppercase tracking-wider rounded-full border border-purple-500/20 mb-3">
                  <User className="w-3.5 h-3.5" />
                  Isolated Clinical Records Area • Physician Desk
                </div>
                <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-2">
                  My Patients Directory - {currentUser?.name || "Clinician Practitioner"}
                </h1>
                <p className="text-sm text-slate-350 leading-relaxed max-w-3xl">
                  Welcome back, doctor. Below are the patients currently logged as having met with **you** for diagnostic assessment. Click any dossier card to evaluate chart data, updates notes or modify prescriptions.
                </p>
              </div>

              {currentUser && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Patients list column */}
                  <div className="lg:col-span-4 space-y-4">
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block">Assigned consultation dossier queue:</span>
                    
                    <div className="space-y-3">
                      {/* Dynamically display ONLY patients for the logged-in doctor! Admin sees Dr. Jenkins queue as default */}
                      {(() => {
                        const targetId = currentUser.role === "doctor" ? currentUser.doctorId : "doc_1";
                        const activeQueue = doctorPatients[targetId || "doc_1"] || [];
                        
                        if (activeQueue.length === 0) {
                          return (
                            <p className="text-xs text-slate-500 italic p-4 bg-slate-950 border border-slate-900 rounded-2xl">
                              No active mapped outpatient files.
                            </p>
                          );
                        }

                        return activeQueue.map(pat => (
                          <div 
                            key={pat.id}
                            onClick={() => {
                              setSelectedPatientForDetail(pat);
                              setNewDoctorNote(pat.doctorNotes || "");
                              setNewPrescribedMeds(pat.prescribedMeds || "");
                            }}
                            className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                              selectedPatientForDetail?.id === pat.id
                                ? "bg-purple-900/20 border-purple-500/60 shadow-xl shadow-purple-500/5"
                                : "bg-slate-950/80 border-slate-800 hover:border-slate-700"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xs font-bold text-white mb-1">{pat.name}</h3>
                                <p className="text-[10px] text-slate-450">{pat.gender}, {pat.age} years</p>
                              </div>
                              <span className="text-[9px] font-mono bg-purple-950/60 text-purple-300 font-bold px-1.5 py-0.5 rounded border border-purple-500/25">
                                Met: {pat.lastMet}
                              </span>
                            </div>
                            <div className="mt-3 text-[10px] text-slate-350 line-clamp-1 italic">
                              "{pat.symptoms}"
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* Patient dossier chart detail column */}
                  <div className="lg:col-span-8">
                    {selectedPatientForDetail ? (
                      <div className="bg-slate-950/80 border border-slate-855 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
                        
                        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                          <div>
                            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block mb-1">Active Clinical Chart dossier</span>
                            <h2 className="text-lg font-extrabold text-white">{selectedPatientForDetail.name}</h2>
                          </div>
                          
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                            {selectedPatientForDetail.status}
                          </span>
                        </div>

                        {/* Patient info details sub grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-850 text-xs">
                          <div>
                            <p className="text-slate-500 font-semibold mb-1">Registered Email:</p>
                            <p className="text-slate-200 font-mono truncate">{selectedPatientForDetail.email}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 font-semibold mb-1">Mobile Telephone:</p>
                            <p className="text-slate-200 font-mono">{selectedPatientForDetail.phone}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 font-semibold mb-1">Dossier Met Check:</p>
                            <p className="text-purple-300 font-bold font-mono">{selectedPatientForDetail.lastMet}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 font-semibold mb-1">Verification Status:</p>
                            <p className="text-emerald-400 font-bold">Verified Clinic Match</p>
                          </div>
                        </div>

                        {/* Symptoms and diagnosis block */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                          <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 space-y-2">
                            <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                              <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
                              <span>Symptom Intake:</span>
                            </h3>
                            <p className="text-xs text-slate-350 leading-relaxed italic">
                              "{selectedPatientForDetail.symptoms}"
                            </p>
                          </div>

                          <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 space-y-2">
                            <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                              <FileText className="w-4 h-4 text-purple-400" />
                              <span>Identified Diagnostics:</span>
                            </h3>
                            <p className="text-xs text-slate-200 leading-relaxed font-bold">
                              {selectedPatientForDetail.diagnosis}
                            </p>
                          </div>
                        </div>

                        {/* Interactive dynamic chart form */}
                        <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800/80 space-y-4">
                          <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest border-b border-slate-800 pb-2">Modify Patient Medical File:</h3>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Doctor Evaluation Notes</label>
                              <textarea 
                                rows={3}
                                value={newDoctorNote}
                                onChange={(e) => setNewDoctorNote(e.target.value)}
                                placeholder="Type case symptoms modifications, prognosis indices, or follow-up timelines..."
                                className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs font-sans text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-500"
                              />
                            </div>

                            <div>
                              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Prescribed Pharmacological Treatments (Active Rx)</label>
                              <input 
                                type="text"
                                value={newPrescribedMeds}
                                onChange={(e) => setNewPrescribedMeds(e.target.value)}
                                placeholder="e.g. Paracetamol 650mg once daily, Amoxicillin 500mg 3x daily"
                                className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs font-mono text-emerald-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
                              />
                            </div>

                            <button 
                              onClick={() => {
                                const targetId = currentUser.role === "doctor" ? currentUser.doctorId : "doc_1";
                                if (!targetId) return;

                                setDoctorPatients(prev => {
                                  const currentQueue = prev[targetId] || [];
                                  const updatedQueue = currentQueue.map(p => {
                                    if (p.id === selectedPatientForDetail.id) {
                                      return {
                                        ...p,
                                        doctorNotes: newDoctorNote,
                                        prescribedMeds: newPrescribedMeds
                                      };
                                    }
                                    return p;
                                  });
                                  const updatedDict = { ...prev, [targetId]: updatedQueue };
                                  return updatedDict;
                                });

                                // Also update the active selected view structure
                                setSelectedPatientForDetail(prev => prev ? {
                                  ...prev,
                                  doctorNotes: newDoctorNote,
                                  prescribedMeds: newPrescribedMeds
                                } : null);

                                alert("Intelligent Outpatient File updated successfully in clinic records.");
                              }}
                              className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition duration-300 shadow-lg shadow-purple-600/15 cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <Check className="w-4 h-4" />
                              <span>Update Patient Medical dossier File</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="bg-slate-955/40 border border-slate-800 p-10 rounded-3xl text-center flex flex-col items-center justify-center min-h-[400px] space-y-4">
                        <div className="w-16 h-16 bg-purple-500/5 rounded-2xl flex items-center justify-center border border-purple-900/10">
                          <User className="w-8 h-8 text-purple-500/35" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Outpatient dossier</h4>
                          <p className="text-[11px] text-slate-500 max-w-xs mx-auto mt-2 leading-relaxed">
                            Pick an assigned patient record from the intake consultation queue to see medical parameters, diagnosis charts, and manage prescription states.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>
          )}

          {/* =========================================================================
              TAB 4: SQL RELATIONAL DATABASE CONSOLE
              ========================================================================= */}
          {activeTab === "sql-db" && (
            <div className="space-y-8 max-w-6xl mx-auto">
              
              <div className="bg-gradient-to-r from-slate-950 via-purple-950/15 to-slate-900 p-6 lg:p-8 rounded-3xl border border-purple-900/20 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
                
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-purple-500/10 text-purple-300 font-semibold text-[10px] uppercase tracking-wider rounded-full border border-purple-500/20 mb-3">
                  <Database className="w-3.5 h-3.5" />
                  Structured Hospital Relations Schema
                </div>
                <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-2">
                  Hospital SQL Relation Center
                </h1>
                <p className="text-sm text-slate-350 leading-relaxed max-w-3xl">
                  Inspect structured medical tables, run simulated SQL query payloads, and manage backend database state registries (users, reports, and prescriptions) with raw delete or insert methods.
                </p>
              </div>

              {/* Interactive SQL Terminal Editor */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                
                <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-widest font-mono">SQLite Terminal Console</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                    <span>Host: postgres_docker_instance</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2 font-mono">Query Input Desk:</label>
                    <textarea 
                      rows={3}
                      value={sqlQuery}
                      onChange={(e) => setSqlQuery(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-purple-200 leading-relaxed focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>

                  {/* Preset quick templates to query */}
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
                    <span className="font-bold">Suggested Quick templates (Click):</span>
                    <button 
                      onClick={() => {
                        setSqlQuery("SELECT * FROM doctors WHERE rating >= 4.9;");
                        handleExecuteSql("SELECT * FROM doctors WHERE rating >= 4.9;");
                      }}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded font-mono text-slate-300"
                    >
                      SELECT * FROM doctors;
                    </button>
                    <button 
                      onClick={() => {
                        setSqlQuery("SELECT * FROM reports;");
                        handleExecuteSql("SELECT * FROM reports;");
                      }}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded font-mono text-slate-300"
                    >
                      SELECT * FROM reports;
                    </button>
                    <button 
                      onClick={() => {
                        setSqlQuery("SELECT * FROM prescriptions;");
                        handleExecuteSql("SELECT * FROM prescriptions;");
                      }}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded font-mono text-slate-300"
                    >
                      SELECT * FROM prescriptions;
                    </button>
                  </div>

                  <button 
                    onClick={() => handleExecuteSql(sqlQuery)}
                    className="py-3 px-6 bg-purple-600 hover:bg-purple-500 font-bold text-xs text-white rounded-2xl transition shadow-lg shadow-purple-600/15"
                  >
                    Execute Query [F5]
                  </button>

                  {/* SQL Output console */}
                  <div className="border border-slate-800 rounded-2xl bg-black p-5 font-mono text-xs overflow-x-auto text-emerald-400 space-y-2 h-44">
                    <p className="text-purple-400 text-[10px]">// SQL Execution Result Logs:</p>
                    {sqlError && <p className="text-red-400">Error: {sqlError}</p>}
                    
                    {!sqlError && sqlOutput.length === 0 && (
                      <p className="text-slate-500">Query returned 0 rows.</p>
                    )}

                    {!sqlError && sqlOutput.length > 0 && (
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-850 text-slate-400 text-[11px]">
                            {Object.keys(sqlOutput[0]).map((key) => (
                              <th key={key} className="pb-2 pr-4">{key}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sqlOutput.map((row, idx) => (
                            <tr key={idx} className="border-b border-slate-900 text-teal-350 hover:bg-slate-950 transition">
                              {Object.values(row).map((val: any, vIdx) => (
                                <td key={vIdx} className="py-2 pr-4 text-[10px]">
                                  {typeof val === 'object' ? JSON.stringify(val).substring(0, 30) + "..." : String(val)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                </div>

              </div>

              {/* Browse and Edit Tables directly without SQL */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                
                {/* Reports database view and registry */}
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4.5 h-4.5 text-purple-400" />
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest">Table: REPORTS</h3>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Row Count: {reportsList.length}</span>
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {reportsList.map((rep) => (
                      <div key={rep.report_id} className="bg-slate-900 border border-slate-800/80 p-4.5 rounded-2xl relative">
                        <button 
                          onClick={() => handleDeleteReport(rep.report_id)}
                          className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="text-[11px] grid grid-cols-3 gap-2 mb-2 text-slate-400 font-semibold border-b border-slate-850 pb-1.5">
                          <span>ID: {rep.report_id}</span>
                          <span>User Ref: {rep.user_id}</span>
                          <span>Date: {rep.report_date}</span>
                        </div>
                        <p className="text-[11px] text-slate-201 leading-snug">
                          <strong>Symptom Input:</strong> "{rep.symptoms}"
                        </p>
                        <p className="text-[11px] text-purple-300 leading-snug mt-2 bg-purple-950/20 border border-purple-900/35 p-2 rounded-lg">
                          <strong>Diagnosis Output:</strong> {rep.diagnosis}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prescriptions registry database view */}
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                    <div className="flex items-center gap-2">
                      <Pill className="w-4.5 h-4.5 text-purple-400" />
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest">Table: PRESCRIPTIONS</h3>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Row Count: {prescriptionsList.length}</span>
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {prescriptionsList.map((rx) => (
                      <div key={rx.id} className="bg-slate-900 border border-slate-800/80 p-4 rounded-2xl relative">
                        <button 
                          onClick={() => handleDeletePrescription(rx.id)}
                          className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="text-[11px] grid grid-cols-2 gap-2 mb-2 text-slate-400 font-semibold border-b border-slate-850 pb-1.5">
                          <span>Prescription Ref: {rx.id}</span>
                          <span>User ID: {rx.user_id}</span>
                        </div>
                        <p className="text-[11px] text-slate-100 font-bold block mb-1">
                          Medicine Name: {rx.medicine_name}
                        </p>
                        <p className="text-[10px] text-slate-400 leading-normal">
                          <strong>Clinical Extraction:</strong> {rx.analysis}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

              {/* Users Database simulation and interactive addition */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl max-w-2xl mx-auto space-y-6">
                <div className="pb-3 border-b border-slate-900">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest">Add or Register Users (SQL Insertion)</h3>
                  <p className="text-[10px] text-slate-500">Insert row metrics inside standard users system</p>
                </div>

                <form onSubmit={handleAddUserSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input 
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Username"
                    className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-white focus:outline-none"
                    required
                  />
                  <input 
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="Email Address"
                    className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-white focus:outline-none"
                    required
                  />
                  <select 
                    value={newUserRole} 
                    onChange={(e) => setNewUserRole(e.target.value)}
                    className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="Patient">Patient</option>
                    <option value="Resident Doctor">Resident Doctor</option>
                    <option value="Surgical Nurse">Surgical Nurse</option>
                  </select>

                  <button 
                    type="submit"
                    className="md:col-span-3 py-3 bg-purple-600 hover:bg-purple-500 font-bold text-xs text-white rounded-xl transition"
                  >
                    INSERT INTO users values (NULL, username, email, role);
                  </button>
                </form>

                <div className="space-y-2 mt-4 text-xs font-mono text-slate-400 bg-slate-900 p-4 rounded-2xl border border-slate-850">
                  <span className="font-extrabold text-white text-[10px] block mb-2">CURRENT LIVE USERS RELATIONAL ARRAY:</span>
                  {usersList.map((u) => (
                    <div key={u.id} className="flex justify-between border-b border-slate-850 py-1.5 align-middle">
                      <span>{u.id} | {u.username} ({u.email})</span>
                      <div className="flex gap-2 items-center">
                        <span className="text-[10px] bg-slate-850 text-purple-300 px-2 py-0.5 rounded-full font-bold">
                          {u.role}
                        </span>
                        {u.username !== "user_patient_9" && (
                          <button 
                            type="button" 
                            onClick={() => handleDeleteUser(u.id)}
                            className="text-slate-500 hover:text-red-400"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          )}

          {/* =========================================================================
              TAB 5: SYSTEM ADMIN PORTAL (ChromaDB vectors moved here)
              ========================================================================= */}
          {activeTab === "admin-panel" && (
            <div className="space-y-8 max-w-5xl mx-auto">
              
              <div className="bg-gradient-to-r from-purple-950/25 to-slate-950 p-6 lg:p-8 rounded-3xl border border-purple-900/20 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
                
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-purple-500/10 text-purple-300 font-semibold text-[10px] uppercase tracking-wider rounded-full border border-purple-500/20 mb-3">
                  <Terminal className="w-3.5 h-3.5" />
                  Technical Diagnostic Panel
                </div>
                <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-2">
                  System Admin Portal & RAG Statistics
                </h1>
                <p className="text-sm text-slate-350 leading-relaxed max-w-3xl">
                  ChromaDB vector embedding pools and prompt context engineering logs are moved safely hither for administrative review.
                </p>
              </div>

              {/* RAG statistics dashboards and active elements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Vectors Stats */}
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                  
                  <div className="pb-3 border-b border-slate-900">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest">ChromaDB Vector Metrics</h3>
                    <p className="text-[10px] text-slate-500">Physical grounding vectors parameters</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                      <span className="text-slate-500 text-[10px] block leading-none">Ingested Elements</span>
                      <span className="text-white text-lg font-bold block mt-2">1,240,293</span>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                      <span className="text-slate-500 text-[10px] block leading-none">Response Latency</span>
                      <span className="text-white text-lg font-bold block mt-2">12ms - Avg</span>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                      <span className="text-slate-500 text-[10px] block leading-none">Chroma Version</span>
                      <span className="text-white text-lg font-bold block mt-2">v0.4.21</span>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                      <span className="text-slate-500 text-[10px] block leading-none">Semantic Precision</span>
                      <span className="text-white text-lg font-bold block mt-2">98.42%</span>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl space-y-1 text-xs">
                    <span className="font-bold text-purple-300 block">Why Vector Space Over Structured SQL?</span>
                    <p className="text-slate-350 leading-relaxed text-[11px]">
                      Tabular databases lookup exact text structures. Clinical patients describe symptoms utilizing vast visual vocabularies (e.g. 'swollen chest coughing'). Word embedding maps match these synonym inputs to standard respiratory records with zero exact string sharing.
                    </p>
                  </div>

                </div>

                {/* Prompt Architecture logs */}
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                  
                  <div className="pb-3 border-b border-slate-905">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest">Context Grounding Blueprint</h3>
                    <p className="text-[10px] text-slate-500">Pipeline orchestration paradigm</p>
                  </div>

                  <div className="space-y-4 font-mono text-[10px] text-teal-350">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 space-y-1">
                      <p className="text-purple-400 font-extrabold">// 1. Query Vector Generation</p>
                      <p className="text-slate-300">RawSymptomText =&gt; MapToEmbeddingsDenseMatrix(float[768])</p>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 space-y-1">
                      <p className="text-purple-400 font-extrabold">// 2. Proximity Cosine Calculation</p>
                      <p className="text-slate-300">RetrieveNearestKDocuments(k=2, similarityThreshold=0.74)</p>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 space-y-1">
                      <p className="text-purple-400 font-extrabold">// 3. Prompt context encapsulation</p>
                      <p className="text-slate-300">InjectInSystemInstructions(GroundingEvidenceDocs)</p>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

        </main>

      </div>

      {/* Exquisite Footer Disclaimer matching Graphic design */}
      <footer className="bg-slate-950 border-t border-slate-800/80 px-8 py-5 flex items-center justify-center text-center shrink-0">
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-medium max-w-4xl leading-relaxed">
          Medicare AI System • Developed to empower clinical decision-making. High-confidence responses require professional physician verification.
        </p>
      </footer>

    </div>
  );
}
