import React from 'react';
import { PERIOD_CONFIGS } from '../../utils/periodUtils';

export interface TimeSlotSelectorProps {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  occupiedTimes: string[];
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedTime,
  onSelectTime,
  occupiedTimes,
}) => {
  return (
    <div className="space-y-4">
      <label className="block text-xs font-medium text-hair-textMuted uppercase tracking-wider">
        Horários
      </label>

      {/* Renderização dos períodos via map() */}
      {PERIOD_CONFIGS.map((period) => (
        <div key={period.id} className="space-y-2">
          <span className="text-xs font-semibold text-hair-textMuted block">
            {period.title}
          </span>

          <div className="grid grid-cols-4 gap-2">
            {/* Renderização dos botões de horários via map() */}
            {period.slots.map((slot) => {
              const isOccupied = occupiedTimes.includes(slot);
              const isSelected = selectedTime === slot;

              return (
                <button
                  key={slot}
                  type="button"
                  disabled={isOccupied}
                  onClick={() => onSelectTime(slot)}
                  className={`py-2 px-2.5 rounded-lg text-xs font-medium border transition-all text-center select-none ${
                    isOccupied
                      ? 'bg-[#1b1b1e] border-[#25242a] text-[#52505a] cursor-not-allowed opacity-60 line-through'
                      : isSelected
                      ? 'bg-[#2a2416] border-hair-gold text-white font-bold ring-1 ring-hair-gold shadow-sm'
                      : 'bg-hair-input border-hair-border text-[#C4C2CA] hover:border-hair-gold/60 hover:text-white cursor-pointer'
                  }`}
                  title={
                    isOccupied
                      ? `Horário ${slot} indisponível`
                      : `Selecionar horário ${slot}`
                  }
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
