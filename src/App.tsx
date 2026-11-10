import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { VideoPlayer } from './components/VideoPlayer';
import { ChapterTimeline } from './components/ChapterTimeline';
import { HistoricalDossier } from './components/HistoricalDossier';
import { HistoricDocumentsModal } from './components/HistoricDocumentsModal';
import { QuizModal } from './components/QuizModal';
import { HistoricalAdvisorModal } from './components/HistoricalAdvisorModal';
import { BIOGRAPHY_CHAPTERS } from './data/biographyData';
import { Play, Sparkles, BookOpen, Award, FileText } from 'lucide-react';

export default function App() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'video' | 'timeline' | 'dossier'>('video');
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState<boolean>(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState<boolean>(false);

  const handleSelectChapter = (idx: number) => {
    setCurrentChapterIndex(idx);
    setActiveTab('dossier');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayChapter = (idx: number) => {
    setCurrentChapterIndex(idx);
    setActiveTab('video');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-200">
      {/* 1. Header adhering strictly to Top Bar Contract */}
      <TopBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenDocuments={() => setIsDocumentsModalOpen(true)}
        onOpenQuiz={() => setIsQuizModalOpen(true)}
        onOpenAdvisor={() => setIsAdvisorModalOpen(true)}
      />

      {/* 2. Main Content Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-12">
        {/* Editorial Sub-header Context Bar */}
        <section className="text-center max-w-3xl mx-auto pt-2 pb-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-amber-400/90 mb-3">
            <span>Documental Histórico Audiovisual</span>
            <span aria-hidden="true">·</span>
            <span>1940 – 1946</span>
            <span aria-hidden="true">·</span>
            <span>Presidencia de México</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-100 tracking-tight leading-tight mb-4">
            Manuel Ávila Camacho: Biografía Narrada
          </h1>

          <p className="text-sm md:text-base text-stone-300 font-light leading-relaxed">
            Explora la vida de «El Presidente Caballero», artífice de la Unidad Nacional, la creación del IMSS y la participación de México en la Segunda Guerra Mundial con el Escuadrón 201.
          </p>

          {/* Tab Quick Filter Bar */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'video'
                  ? 'bg-amber-400 text-stone-950 font-semibold shadow-md'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Video Documental</span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'timeline'
                  ? 'bg-amber-400 text-stone-950 font-semibold shadow-md'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Índice de Capítulos</span>
            </button>

            <button
              onClick={() => setActiveTab('dossier')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'dossier'
                  ? 'bg-amber-400 text-stone-950 font-semibold shadow-md'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Expediente de Archivo</span>
            </button>

            <button
              onClick={() => setIsQuizModalOpen(true)}
              className="px-4 py-2 text-xs font-medium rounded-lg bg-stone-900 text-stone-300 hover:bg-stone-800 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Test de Conocimiento</span>
            </button>
          </div>
        </section>

        {/* 3. Primary Video Stage (Always mounted to preserve playback state, prioritized in video tab) */}
        {activeTab === 'video' && (
          <section className="space-y-8 animate-fadeIn">
            {/* The Cinema Video Screen */}
            <VideoPlayer
              currentChapterIndex={currentChapterIndex}
              onSelectChapter={setCurrentChapterIndex}
              onOpenDocuments={() => setIsDocumentsModalOpen(true)}
              onOpenAdvisor={() => setIsAdvisorModalOpen(true)}
            />

            {/* Quick Chapter Selector Ribbon beneath video */}
            <div className="bg-stone-900/60 p-4 rounded-xl border border-stone-800">
              <div className="text-xs uppercase tracking-wider font-mono text-stone-400 mb-3 flex items-center justify-between">
                <span>Línea de Episodios del Documental</span>
                <span className="text-amber-400">
                  Capítulo actual: {BIOGRAPHY_CHAPTERS[currentChapterIndex].title}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {BIOGRAPHY_CHAPTERS.map((chap, idx) => (
                  <button
                    key={chap.id}
                    onClick={() => setCurrentChapterIndex(idx)}
                    className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                      idx === currentChapterIndex
                        ? 'bg-amber-400 text-stone-950 font-medium ring-2 ring-amber-300'
                        : 'bg-stone-950/70 hover:bg-stone-800 text-stone-300 border border-stone-800/80'
                    }`}
                  >
                    <div className="text-[10px] font-mono opacity-80 mb-0.5">
                      Episodio {String(chap.id).padStart(2, '0')}
                    </div>
                    <div className="text-xs font-serif font-bold line-clamp-1 leading-tight">
                      {chap.title}
                    </div>
                    <div className="text-[10px] opacity-70 mt-1 line-clamp-1">
                      {chap.period}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Key Historical Milestones Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  01. Política de Reconciliación
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-100">
                  Paz Religiosa y Balcón de Expresidentes
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Con la afirmación «Soy creyente» y la reforma al Artículo 3°, Ávila Camacho cerró el cisma religioso y unió a México congregando a rivales históricos como Calles y Cárdenas.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  02. Frente Internacional
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-100">
                  Segunda Guerra Mundial y Escuadrón 201
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Declaró la guerra al Eje en 1942 tras el torpedeo de petroleros. Envió a las «Águilas Aztecas» a Filipinas y pactó el Programa Bracero con Roosevelt en Monterrey.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  03. Estado de Bienestar
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-100">
                  Fundación del IMSS y Era Civil
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Creó el Seguro Social en 1943, desmilitarizó la estructura del partido oficial y entregó la presidencia a Miguel Alemán Valdés, consagrando el fin de los caudillos armados.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 4. Timeline Tab */}
        {activeTab === 'timeline' && (
          <ChapterTimeline
            currentChapterIndex={currentChapterIndex}
            onSelectChapter={handleSelectChapter}
            onPlayChapter={handlePlayChapter}
          />
        )}

        {/* 5. Dossier Tab */}
        {activeTab === 'dossier' && (
          <HistoricalDossier
            currentChapterIndex={currentChapterIndex}
            onSelectChapter={setCurrentChapterIndex}
            onPlayInVideo={handlePlayChapter}
          />
        )}
      </main>

      {/* 6. Modals */}
      <HistoricDocumentsModal
        isOpen={isDocumentsModalOpen}
        onClose={() => setIsDocumentsModalOpen(false)}
      />

      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
      />

      <HistoricalAdvisorModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
      />

      {/* 7. Institutional Footer */}
      <footer className="border-t border-stone-800 bg-stone-950 py-8 px-6 mt-16 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif text-stone-200 font-semibold">
              Manuel Ávila Camacho (1897–1955)
            </span>
            <span aria-hidden="true">·</span>
            <span>Documental Histórico con Narración e Imágenes</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <button
              onClick={() => setIsDocumentsModalOpen(true)}
              className="hover:text-stone-200 transition-colors cursor-pointer"
            >
              Archivo Documental
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsQuizModalOpen(true)}
              className="hover:text-stone-200 transition-colors cursor-pointer"
            >
              Test Histórico
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsAdvisorModalOpen(true)}
              className="hover:text-stone-200 transition-colors cursor-pointer"
            >
              Consultar Historiador
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
