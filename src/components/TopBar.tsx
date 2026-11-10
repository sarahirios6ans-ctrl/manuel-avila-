import React from 'react';
import { Sparkles } from 'lucide-react';

interface TopBarProps {
  activeTab: 'video' | 'timeline' | 'dossier';
  onSelectTab: (tab: 'video' | 'timeline' | 'dossier') => void;
  onOpenDocuments: () => void;
  onOpenQuiz: () => void;
  onOpenAdvisor: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  onOpenDocuments,
  onOpenQuiz,
  onOpenAdvisor,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-stone-800 bg-stone-950/95 sticky top-0 z-40 backdrop-blur-md">
      {/* Zone 1: Single text element wordmark */}
      <button
        onClick={() => onSelectTab('video')}
        className="text-lg md:text-xl font-serif font-bold tracking-tight text-stone-100 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
      >
        Ávila Camacho: Documental
      </button>

      {/* Zone 2: 4-5 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-400">
        <button
          onClick={() => onSelectTab('video')}
          className={`hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'video' ? 'text-amber-300 font-semibold' : ''
          }`}
        >
          Video Narrado
        </button>
        <button
          onClick={() => onSelectTab('timeline')}
          className={`hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'timeline' ? 'text-amber-300 font-semibold' : ''
          }`}
        >
          Capítulos Históricos
        </button>
        <button
          onClick={() => onSelectTab('dossier')}
          className={`hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'dossier' ? 'text-amber-300 font-semibold' : ''
          }`}
        >
          Expediente de Archivo
        </button>
        <button
          onClick={onOpenDocuments}
          className="hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Discursos y Leyes
        </button>
        <button
          onClick={onOpenQuiz}
          className="hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Test Histórico
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenAdvisor}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow cursor-pointer font-sans"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Consultar al Historiador</span>
        </button>
      </div>
    </header>
  );
};
