import { useScheduleContext } from '../context/ScheduleContext';

/**
 * Custom Hook para acesso às operações e estado de agendamentos
 */
export const useSchedule = () => {
  return useScheduleContext();
};
