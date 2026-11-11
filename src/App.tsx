import React, { useState } from 'react';
import { Header } from './components/Header';
import { BookingForm } from './components/Sidebar/BookingForm';
import { ScheduleView } from './components/Schedule/ScheduleView';
import { Toast } from './components/Toast';

export const App: React.FC = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  return (
    <div className="min-h-screen bg-hair-bg text-white flex flex-col justify-between p-4 sm:p-6 lg:p-10">
      <div className="max-w-6xl mx-auto w-full">
        {/* Top Header */}
        <Header />

        {/* Layout Principal com Sidebar e Lista de Agendamentos (Responsivo) */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
          <BookingForm onNotify={showNotification} />
          <ScheduleView onNotify={showNotification} />
        </div>
      </div>

      {/* Rodapé Informativo */}
      <footer className="mt-12 text-center text-xs text-hair-textSubtle py-4 border-t border-hair-border/30">
        <p>
          Projeto IV — HairDay | Sistema de Agendamentos • React, TypeScript, Vite & Tailwind CSS
        </p>
      </footer>

      {/* Notificação Toast Reutilizável */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default App;

