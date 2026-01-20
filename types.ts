
export enum Specialty {
  GASTRO = 'Gastroenterología',
  ENDOSCOPY = 'Endoscopia Digestiva',
  CLINICAL = 'Clínica Médica'
}

export enum Modality {
  PRESENTIAL = 'Presencial',
  VIRTUAL = 'Virtual (Zoom / Google Meet)'
}

export interface AppointmentRequest {
  specialty: Specialty;
  modality: Modality;
  name: string;
  email: string;
  phone: string;
  reason: string;
  date: string;
  time: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
