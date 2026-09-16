export type Tone = "success" | "warning" | "neutral" | "info" | "danger";
export interface User {
  name: string;
  cpf: string;
  email: string;
  phone: string;
}
export interface Property {
  id: string;
  name: string;
  region: string;
  area: number;
  identifier: string;
  status: string;
  occurrence?: string;
}
export interface Movement {
  date: string;
  title: string;
  description: string;
}
export interface Process {
  id: string;
  protocol: string;
  type: string;
  propertyId: string;
  status: string;
  openedAt: string;
  stage: number;
  movements: Movement[];
  message: string;
}
export interface Pending {
  id: string;
  processId: string;
  propertyId: string;
  title: string;
  reason: string;
  instruction: string;
  deadline: string;
  resolved: boolean;
  documentId?: string;
}
export type DocumentCategory =
  | "Pessoais"
  | "Do imóvel"
  | "Regularização"
  | "Certidões"
  | "Contratos"
  | "Comprovantes"
  | "Requerimentos";
export interface CitizenDocument {
  id: string;
  name: string;
  category: DocumentCategory;
  status: "Válido" | "Recebido" | "Atualização necessária";
  issuedAt: string;
  propertyId?: string;
  fileName?: string;
  uri?: string;
}
export interface Payment {
  id: string;
  propertyId: string;
  description: string;
  value: number;
  dueAt: string;
  status: "Em aberto" | "Vencido" | "Pago";
  paidAt?: string;
}
export interface Notice {
  id: string;
  number: string;
  title: string;
  region: string;
  deadline: string;
  status: "Em andamento" | "Encerrado";
  description: string;
  relatedPropertyId?: string;
  following: boolean;
}
export interface CitizenAlert {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "Processo" | "Pendência" | "Boleto" | "Edital" | "Atendimento";
  href: string;
  read: boolean;
}
export interface News {
  id: string;
  title: string;
  date: string;
  category: string;
  body: string;
}
export interface Attachment {
  name: string;
  uri?: string;
  documentId?: string;
}
export interface RequestDraft {
  step: number;
  service: string;
  propertyId: string;
  attachments: Attachment[];
  message: string;
}
export interface Appointment {
  id: string;
  reason: string;
  unit: string;
  date: string;
  time: string;
}
export interface Preferences {
  process: boolean;
  payments: boolean;
  notices: boolean;
  offline: boolean;
}
export interface AppData {
  user: User;
  properties: Property[];
  processes: Process[];
  pending: Pending[];
  documents: CitizenDocument[];
  payments: Payment[];
  notices: Notice[];
  alerts: CitizenAlert[];
  news: News[];
  draft: RequestDraft | null;
  appointments: Appointment[];
  preferences: Preferences;
}
