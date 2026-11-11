import { PeriodConfig, PeriodType, Appointment } from '../types/appointment';

export const PERIOD_CONFIGS: PeriodConfig[] = [
  {
    id: 'morning',
    title: 'Manhã',
    range: '09h - 12h',
    slots: ['09:00', '10:00', '11:00', '12:00'],
  },
  {
    id: 'afternoon',
    title: 'Tarde',
    range: '13h - 18h',
    slots: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  },
  {
    id: 'night',
    title: 'Noite',
    range: '19h - 21h',
    slots: ['19:00', '20:00', '21:00'],
  },
];

/**
 * Determina o período do dia baseado no horário
 */
export function getPeriodFromTime(time: string): PeriodType {
  const hour = parseInt(time.split(':')[0], 10);
  if (hour >= 9 && hour <= 12) return 'morning';
  if (hour >= 13 && hour <= 18) return 'afternoon';
  return 'night';
}

/**
 * Demonstração do uso de reduce():
 * Agrupa os agendamentos filtrados por período (manhã, tarde, noite)
 */
export function groupAppointmentsByPeriod(
  appointments: Appointment[]
): Record<PeriodType, Appointment[]> {
  const initialGroups: Record<PeriodType, Appointment[]> = {
    morning: [],
    afternoon: [],
    night: [],
  };

  return appointments.reduce((acc, curr) => {
    acc[curr.period].push(curr);
    return acc;
  }, initialGroups);
}

/**
 * Demonstração do uso de reduce():
 * Calcula o total de agendamentos ou estatísticas do dia
 */
export function calculateScheduleSummary(appointments: Appointment[]) {
  return appointments.reduce(
    (summary, item) => {
      summary.total += 1;
      summary.byPeriod[item.period] += 1;
      return summary;
    },
    {
      total: 0,
      byPeriod: { morning: 0, afternoon: 0, night: 0 },
    }
  );
}
