import React from 'react';
import { Sun, SunMedium, Moon } from 'lucide-react';
import { Appointment, PeriodConfig } from '../../types/appointment';
import { AppointmentCard } from './AppointmentCard';

export interface PeriodSectionProps {
  periodConfig: PeriodConfig;
  appointments: Appointment[];
  onDelete: (id: string, clientName: string, time: string) => void;
}

export const PeriodSection: React.FC<PeriodSectionProps> = ({
  periodConfig,
  appointments,
  onDelete,
}) => {
  // Ícone representativo por período
  const renderPeriodIcon = () => {
    switch (periodConfig.id) {
      case 'morning':
        return <Sun className="w-4 h-4 text-hair-gold shrink-0" />;
      case 'afternoon':
        return <SunMedium className="w-4 h-4 text-hair-gold shrink-0" />;
      case 'night':
        return <Moon className="w-4 h-4 text-hair-gold shrink-0" />;
    }
  };

  return (
    <section className="space-y-2">
      {/* Cabeçalho do Período */}
      <div className="flex items-center justify-between pb-2 border-b border-hair-border/60">
        <div className="flex items-center gap-2">
          {renderPeriodIcon()}
          <h3 className="text-sm font-semibold text-white tracking-wide">
            {periodConfig.title}
          </h3>
        </div>
        <span className="text-xs text-hair-textMuted tracking-wider font-medium">
          {periodConfig.range}
        </span>
      </div>

      {/* Listagem de agendamentos do período */}
      <div className="pt-1">
        {appointments.length > 0 ? (
          <div className="space-y-0.5">
            {/* Renderização da lista de agendamentos via map() */}
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onDelete={onDelete}
              />
            ))}
          </div>
        ) : (
          <div className="py-4 text-center border border-dashed border-hair-border/40 rounded-lg my-1">
            <p className="text-xs text-hair-textSubtle italic">
              Nenhum agendamento para este período
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
