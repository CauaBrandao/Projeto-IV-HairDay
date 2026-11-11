import React from 'react';
import { Calendar } from 'lucide-react';
import { PeriodSection } from './PeriodSection';
import { useSchedule } from '../../hooks/useSchedule';
import { PERIOD_CONFIGS } from '../../utils/periodUtils';
import { formatDateToBR } from '../../utils/dateUtils';

export interface ScheduleViewProps {
  onNotify: (message: string, type: 'success' | 'error') => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ onNotify }) => {
  const {
    selectedDate,
    setSelectedDate,
    getGroupedAppointmentsForDate,
    removeAppointment,
    getTotalAppointmentsCount,
  } = useSchedule();

  const grouped = getGroupedAppointmentsForDate(selectedDate);
  const totalCount = getTotalAppointmentsCount(selectedDate);

  const handleDelete = (id: string, clientName: string, time: string) => {
    removeAppointment(id);
    onNotify(`Agendamento de ${clientName} às ${time} cancelado.`, 'success');
  };

  return (
    <main className="bg-hair-card p-6 md:p-8 rounded-2xl border border-hair-border/60 shadow-xl flex-1 flex flex-col justify-between">
      <div>
        {/* Top Header da Agenda */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-hair-border/50">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Sua agenda
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#2C2920] text-hair-gold border border-hair-gold/30 font-semibold">
                {totalCount} {totalCount === 1 ? 'agendamento' : 'agendamentos'}
              </span>
            </div>
            <p className="text-xs md:text-sm text-hair-textMuted mt-1">
              Consulte os seus cortes de cabelo agendados por dia
            </p>
          </div>

          {/* Seletor de Data do Topo com ícone de calendário (Fiel ao Figma) */}
          <div className="relative inline-block self-start sm:self-auto">
            <div className="flex items-center gap-2 bg-hair-input border border-hair-border hover:border-hair-gold/70 rounded-lg px-3 py-2 text-xs font-medium text-white transition-colors cursor-pointer group shadow-sm">
              <Calendar className="w-4 h-4 text-hair-gold shrink-0" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-white text-xs focus:outline-none cursor-pointer"
                aria-label="Filtrar agendamentos por data"
              />
            </div>
          </div>
        </div>

        {/* Resumo da data selecionada */}
        <div className="py-3 flex items-center justify-between text-xs text-hair-textMuted">
          <span>
            Exibindo agendamentos para:{' '}
            <strong className="text-hair-gold font-medium">
              {formatDateToBR(selectedDate)}
            </strong>
          </span>
        </div>

        {/* Seções de Períodos: Manhã, Tarde e Noite renderizados via map() */}
        <div className="space-y-6 mt-2">
          {PERIOD_CONFIGS.map((periodConfig) => (
            <PeriodSection
              key={periodConfig.id}
              periodConfig={periodConfig}
              appointments={grouped[periodConfig.id] || []}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
