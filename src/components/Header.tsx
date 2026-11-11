import React from 'react';
import { Scissors } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center gap-2 mb-6">
      <div className="flex items-center gap-2 font-bold text-2xl tracking-tight text-white select-none">
        <span>HairDay</span>
        <Scissors className="w-5 h-5 text-hair-gold rotate-90" strokeWidth={2.5} />
      </div>
    </header>
  );
};
