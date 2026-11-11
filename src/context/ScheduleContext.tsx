import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Appointment,
  NewAppointmentDTO,
  PeriodType,
  ScheduleContextType,
} from '../types/appointment';
import {
  FIGMA_DEFAULT_DATE,
} from '../utils/dateUtils';
import {
  getPeriodFromTime,
  groupAppointmentsByPeriod,
} from '../utils/periodUtils';

const STORAGE_KEY = '@HairDay:appointments_v1';

// Dados iniciais fiéis ao protótipo do Figma
const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    clientName: 'Ryan Dorwart',
    date: FIGMA_DEFAULT_DATE,
    time: '11:00',
    period: 'morning',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-2',
    clientName: 'Livia Curtis',
    date: FIGMA_DEFAULT_DATE,
    time: '13:00',
    period: 'afternoon',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-3',
    clientName: 'Randy Calzoni',
    date: FIGMA_DEFAULT_DATE,
    time: '14:00',
    period: 'afternoon',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-4',
    clientName: 'Marley Franci',
    date: FIGMA_DEFAULT_DATE,
    time: '16:00',
    period: 'afternoon',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-5',
    clientName: 'Jaylon Korsgaard',
    date: FIGMA_DEFAULT_DATE,
    time: '17:00',
    period: 'afternoon',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-6',
    clientName: 'Maria Horwitz',
    date: FIGMA_DEFAULT_DATE,
    time: '21:00',
    period: 'night',
    createdAt: new Date().toISOString(),
  },
];

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const ScheduleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // useState para gerenciar os agendamentos com carregamento do LocalStorage
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Erro ao ler localStorage:', err);
    }
    return INITIAL_APPOINTMENTS;
  });

  // useState para gerenciar a data selecionada atualmente no filtro da agenda
  const [selectedDate, setSelectedDate] = useState<string>(FIGMA_DEFAULT_DATE);

  // Sincroniza com localStorage sempre que houver alteração na lista de agendamentos
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    } catch (err) {
      console.error('Erro ao salvar no localStorage:', err);
    }
  }, [appointments]);

  /**
   * Adiciona um novo agendamento com validações estritas
   */
  const addAppointment = (data: NewAppointmentDTO): { success: boolean; error?: string } => {
    const trimmedName = data.clientName.trim();
    if (!trimmedName) {
      return { success: false, error: 'Por favor, informe o nome do cliente.' };
    }

    if (!data.date) {
      return { success: false, error: 'Por favor, selecione uma data válida.' };
    }

    if (!data.time) {
      return { success: false, error: 'Por favor, selecione um horário.' };
    }

    // Validação de conflito de horário na data
    const isSlotOccupied = appointments.some(
      (item) => item.date === data.date && item.time === data.time
    );

    if (isSlotOccupied) {
      return {
        success: false,
        error: `O horário ${data.time} já está agendado para o dia selecionado.`,
      };
    }

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      clientName: trimmedName,
      date: data.date,
      time: data.time,
      period: getPeriodFromTime(data.time),
      createdAt: new Date().toISOString(),
    };

    setAppointments((prev) => [...prev, newAppointment]);
    return { success: true };
  };

  /**
   * Remove um agendamento existente pelo ID utilizando filter()
   */
  const removeAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
  };

  /**
   * Retorna agendamentos de uma data específica ordenados por horário utilizando filter()
   */
  const getAppointmentsForDate = (date: string): Appointment[] => {
    return appointments
      .filter((appointment) => appointment.date === date)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  /**
   * Retorna os horários já ocupados em determinada data utilizando filter() e map()
   */
  const getOccupiedTimesForDate = (date: string): string[] => {
    return appointments
      .filter((appointment) => appointment.date === date)
      .map((appointment) => appointment.time);
  };

  /**
   * Retorna agendamentos agrupados por período (manhã, tarde, noite) usando reduce()
   */
  const getGroupedAppointmentsForDate = (date: string): Record<PeriodType, Appointment[]> => {
    const forDate = getAppointmentsForDate(date);
    return groupAppointmentsByPeriod(forDate);
  };

  /**
   * Calcula a quantidade total de agendamentos para a data usando reduce()
   */
  const getTotalAppointmentsCount = (date: string): number => {
    return appointments
      .filter((apt) => apt.date === date)
      .reduce((acc) => acc + 1, 0);
  };

  return (
    <ScheduleContext.Provider
      value={{
        appointments,
        selectedDate,
        setSelectedDate,
        addAppointment,
        removeAppointment,
        getAppointmentsForDate,
        getOccupiedTimesForDate,
        getGroupedAppointmentsForDate,
        getTotalAppointmentsCount,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export const useScheduleContext = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useScheduleContext deve ser utilizado dentro de um ScheduleProvider');
  }
  return context;
};
