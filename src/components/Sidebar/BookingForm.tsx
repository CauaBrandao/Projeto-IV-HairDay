import React, { useState } from 'react';
import { Calendar, User, Clock } from 'lucide-react';
import { TimeSlotSelector } from './TimeSlotSelector';
import { useSchedule } from '../../hooks/useSchedule';

export interface BookingFormProps {
  onNotify: (message: string, type: 'success' | 'error') => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onNotify }) => {
  const {
    selectedDate,
    setSelectedDate,
    getOccupiedTimesForDate,
    addAppointment,
  } = useSchedule();

  const [formDate, setFormDate] = useState<string>(selectedDate);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientName, setClientName] = useState<string>('');
  const [errors, setErrors] = useState<{ name?: string; time?: string; date?: string }>({});

  // Atualiza a data do formulário e sincroniza com a agenda
  const handleDateChange = (newDate: string) => {
    setFormDate(newDate);
    setSelectedDate(newDate);
    // Se o horário selecionado estiver ocupado na nova data, desmarca
    setSelectedTime(null);
  };

  const occupiedTimes = getOccupiedTimesForDate(formDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; time?: string; date?: string } = {};

    if (!formDate) {
      newErrors.date = 'Selecione uma data.';
    }

    if (!selectedTime) {
      newErrors.time = 'Selecione um horário disponível.';
    }

    if (!clientName.trim()) {
      newErrors.name = 'Informe o nome do cliente.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      onNotify('Preencha todos os campos obrigatórios.', 'error');
      return;
    }

    setErrors({});

    const result = addAppointment({
      clientName,
      date: formDate,
      time: selectedTime!,
    });

    if (result.success) {
      onNotify(`Agendamento de ${clientName} às ${selectedTime} confirmado!`, 'success');
      setClientName('');
      setSelectedTime(null);
    } else {
      onNotify(result.error || 'Erro ao realizar agendamento.', 'error');
    }
  };

  return (
    <aside className="bg-hair-card p-6 md:p-8 rounded-2xl border border-hair-border/60 shadow-xl flex flex-col justify-between w-full lg:w-[420px] shrink-0">
      <div>
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Agende um atendimento
          </h2>
          <p className="text-xs md:text-sm text-hair-textMuted mt-1 leading-relaxed">
            Selecione data, horário e informe o nome do cliente para criar o agendamento
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Campo Data */}
          <div>
            <label
              htmlFor="date-input"
              className="block text-xs font-medium text-hair-textMuted uppercase tracking-wider mb-2"
            >
              Data
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-hair-textMuted">
                <Calendar className="w-4 h-4 text-hair-gold" />
              </div>
              <input
                id="date-input"
                type="date"
                value={formDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 bg-hair-input border rounded-lg text-sm text-white focus:outline-none focus:ring-1 transition-all ${
                  errors.date
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-hair-border focus:border-hair-gold focus:ring-hair-gold'
                }`}
              />
            </div>
            {errors.date && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.date}</span>
            )}
          </div>

          {/* Seleção de Horários */}
          <div>
            <TimeSlotSelector
              selectedTime={selectedTime}
              onSelectTime={(time) => {
                setSelectedTime(time);
                if (errors.time) {
                  setErrors((prev) => ({ ...prev, time: undefined }));
                }
              }}
              occupiedTimes={occupiedTimes}
            />
            {errors.time && (
              <span className="text-xs text-rose-400 mt-2 block flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {errors.time}
              </span>
            )}
          </div>

          {/* Campo Cliente */}
          <div>
            <label
              htmlFor="client-name"
              className="block text-xs font-medium text-hair-textMuted uppercase tracking-wider mb-2"
            >
              Cliente
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-hair-textMuted">
                <User className="w-4 h-4" />
              </div>
              <input
                id="client-name"
                type="text"
                placeholder="Helena Souza"
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                  if (errors.name) {
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }
                }}
                className={`w-full pl-10 pr-4 py-2.5 bg-hair-input border rounded-lg text-sm text-white placeholder-hair-textSubtle focus:outline-none focus:ring-1 transition-all ${
                  errors.name
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-hair-border focus:border-hair-gold focus:ring-hair-gold'
                }`}
              />
            </div>
            {errors.name && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.name}</span>
            )}
          </div>

          {/* Botão de Agendamento */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-hair-gold hover:bg-hair-goldHover active:scale-[0.99] text-[#141416] font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-150 shadow-md cursor-pointer mt-4"
          >
            AGENDAR
          </button>
        </form>
      </div>
    </aside>
  );
};

