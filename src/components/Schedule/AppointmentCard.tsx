import React from 'react';
import { Trash2 } from 'lucide-react';
import { Appointment } from '../../types/appointment';

export interface AppointmentCardProps {
  appointment: Appointment;
  onDelete: (id: string, clientName: string, time: string) => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between py-3 px-2 border-b border-hair-border/30 hover:bg-[#252429]/40 rounded-lg transition-colors group">
      <div className="flex items-center gap-4">
        {/* Horário do agendamento */}
        <span className="text-sm font-bold text-white tracking-wider min-w-[50px]">
          {appointment.time}
        </span>

        {/* Nome do cliente */}
        <span className="text-sm text-[#DDDCE2] font-medium group-hover:text-white transition-colors">
          {appointment.clientName}
        </span>
      </div>

      {/* Botão de exclusão com ícone de lixeira amarelo/dourado */}
      <button
        type="button"
        onClick={() => onDelete(appointment.id, appointment.clientName, appointment.time)}
        className="text-hair-gold hover:text-hair-goldLight hover:scale-110 active:scale-95 p-1.5 rounded transition-all focus:outline-none focus:ring-1 focus:ring-hair-gold"
        title={`Cancelar agendamento de ${appointment.clientName}`}
        aria-label={`Excluir agendamento de ${appointment.clientName} às ${appointment.time}`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
