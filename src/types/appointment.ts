export type PeriodType = 'morning' | 'afternoon' | 'night';

export interface Appointment {
  id: string;
  clientName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  period: PeriodType;
  createdAt: string;
}

export interface PeriodConfig {
  id: PeriodType;
  title: string;
  range: string;
  slots: string[];
}

export interface NewAppointmentDTO {
  clientName: string;
  date: string;
  time: string;
}

export interface ScheduleContextType {
  appointments: Appointment[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  addAppointment: (data: NewAppointmentDTO) => { success: boolean; error?: string };
  removeAppointment: (id: string) => void;
  getAppointmentsForDate: (date: string) => Appointment[];
  getOccupiedTimesForDate: (date: string) => string[];
  getGroupedAppointmentsForDate: (date: string) => Record<PeriodType, Appointment[]>;
  getTotalAppointmentsCount: (date: string) => number;
}
