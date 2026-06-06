import { InterviewQA, UserRecord, ReportRecord, PrescriptionRecord } from "./types";

export const INTERVIEW_QUESTIONS: InterviewQA[] = [
  {
    id: "q_1",
    category: "Architecture",
    question: "Why did you choose Retrieval-Augmented Generation (RAG)?",
    answer: "Without RAG, LLMs answer only from their static training data, leading to hallucinations of unsafe symptoms and dosing. RAG retrieves factual, updated clinical documentation first, injecting it as grounding context. This makes outcomes highly accurate, explainable, and directly decreases medical hallucinations."
  },
  {
    id: "q_2",
    category: "Database",
    question: "Why ChromaDB for the medical knowledge index?",
    answer: "Traditional relational databases store strictly tabular structured data, whereas medical guidelines are unstructured textbooks, research papers, and profiles. ChromaDB acts as a vector database, converting sentence meanings into vector embeddings. This allows semantic searches, matching synonym symptoms (e.g. 'high temperature') directly to active guidelines (e.g. 'Fever') even with zero lexical keywords sharing."
  },
  {
    id: "q_3",
    category: "Architecture",
    question: "Why use Ollama instead of a web OpenAI API in the architecture proposal?",
    answer: "Ollama executes the LLM locally on the machine. This provides absolute patient privacy (no health diagnostic data is sent to external tech conglomerates), incurs zero operational API tokens cost, and allows critical offline healthcare operations in areas with intermittent internet access."
  },
  {
    id: "q_4",
    category: "System Design",
    question: "What is the biggest challenge in this kind of medical AI application?",
    answer: "Balancing safety-critical compliance with AI flexibility is the ultimate challenge. Medical guidelines must be strictly retrieved without the LLM hallucinating alternative unsafe home cures or incorrect drug dosages. To mitigate this, we clamp the temperature parameters to zero, build strict negative constraints into system instructions, and enforce safety disclaimers."
  },
  {
    id: "q_5",
    category: "Machine Learning",
    question: "How do embeddings and semantic search actually function under the hood?",
    answer: "Embeddings feed clinical terms through a specialized transformer which maps them to dense arrays of floats. Words sharing conceptual semantic dimensions (e.g., 'chill', 'shivering', 'cold') are positioned close to each other in multidimensional vector space. Similarity is measured via Cosine Distance, allowing the nearest guide to be identified instantly."
  },
  {
    id: "q_6",
    category: "Next Steps",
    question: "How would you expand and improve this Medicare AI project in a clinical setting?",
    answer: "For real healthcare deployment, key upgrades would include: 1) True OCR scanning engines for handwritten physician prescriptions, 2) Multi-lingual translation to bridge medical care for remote communities, 3) Disease forecasting modeling using structured patient vital charts, and 4) Direct EHR clinical pipeline synchronization."
  }
];

export const INITIAL_USERS: UserRecord[] = [
  { id: 101, username: "john_doe", email: "john.doe@hospital.org", role: "Resident Doctor" },
  { id: 102, username: "nurse_rachel", email: "rachel.n@medical.com", role: "Surgical Nurse" },
  { id: 103, username: "user_patient_9", email: "abhiabhishodh@gmail.com", role: "Patient" }
];

export const INITIAL_REPORTS: ReportRecord[] = [
  {
    report_id: 11001,
    user_id: 103,
    symptoms: "Fever, muscle soreness and active chills for 36 hours.",
    diagnosis: "Pyrexia secondary to probable viral syndrome. High RAG confidence match with pyrexia guidelines.",
    report_date: "2026-06-05"
  },
  {
    report_id: 11002,
    user_id: 101,
    symptoms: "Persistent dry cough, mild chest congestion, sneezing.",
    diagnosis: "Acute Pharyngitis / Allergic response. Recommended warm rinses and saline checks.",
    report_date: "2026-06-04"
  }
];

export const INITIAL_PRESCRIPTIONS: PrescriptionRecord[] = [
  {
    id: 4001,
    user_id: 103,
    medicine_name: "Paracetamol 650mg + Ibuprofen 400mg",
    analysis: "Targeted pyrexia control & painkiller relief. Dose: Paracetamol twice daily after meals, watch daily total liver threshold (4000mg maximum)."
  },
  {
    id: 4002,
    user_id: 101,
    medicine_name: "Amoxicillin 500mg",
    analysis: "Anti-bacterial throat infection control. Dose: Three times daily with food, mandate full 5-day cycle."
  }
];

export const MOCK_RAG_CONCEPTS = [
  {
    title: "1. Natural Language Input",
    desc: "User enters a raw human symptom query, e.g., 'high chest shivering'."
  },
  {
    title: "2. Vector Embedding",
    desc: "The query characters are vectorized into multi-dimensional float arrays."
  },
  {
    title: "3. ChromaDB Querying",
    desc: "Performs semantic cosine similarity search to retrieve matched medical reference files."
  },
  {
    title: "4. LLM Context Fusion",
    desc: "Fuses retrieved clinical references directly into the LLM system instruction payload."
  },
  {
    title: "5. Context-Grounded Response",
    desc: "LLM outputs accurate medical assessments while fully mitigating hallucination risks."
  }
];
