import React from 'react';
import { Play, Clock, BookOpen } from 'lucide-react';
import { BIOGRAPHY_CHAPTERS } from '../data/biographyData';

interface ChapterTimelineProps {
  currentChapterIndex: number;
  onSelectChapter: (index: number) => void;
  onPlayChapter: (index: number) => void;
}

export const ChapterTimeline: React.FC<ChapterTimelineProps> = ({
  currentChapterIndex,
  onSelectChapter,
  onPlayChapter,
}) => {
  return (
    <section className="py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-stone-800 pb-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
            Estructura Documental · 8 Capítulos
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-100 tracking-tight">
            Los Episodios de su Vida y Mandato
          </h2>
        </div>
        <p className="text-stone-400 text-sm max-w-md font-light">
          Selecciona cualquier episodio para sintonizar el video documental con su narración sincronizada e imágenes históricas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {BIOGRAPHY_CHAPTERS.map((chap, idx) => {
          const isActive = idx === currentChapterIndex;
          return (
            <div
              key={chap.id}
              className={`group flex flex-col justify-between rounded-xl overflow-hidden bg-stone-900 border transition-all duration-300 ${
                isActive
                  ? 'border-amber-400/80 ring-1 ring-amber-400/50 shadow-xl shadow-amber-950/20'
                  : 'border-stone-800 hover:border-stone-700'
              }`}
            >
              {/* Image Preview Container with hover play button */}
              <div className="relative aspect-video w-full overflow-hidden bg-stone-950">
                <img
                  src={chap.image}
                  alt={chap.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Chapter tag overlay */}
                <div className="absolute top-3 left-3 text-[11px] font-mono tracking-wider px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-stone-700 text-amber-300">
                  Episodio {String(chap.id).padStart(2, '0')}
                </div>

                {/* Duration */}
                <div className="absolute top-3 right-3 text-[11px] font-mono text-stone-300 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  <Clock className="w-3 h-3" />
                  <span>{chap.durationSec}s</span>
                </div>

                {/* Hover Play Button */}
                <button
                  onClick={() => onPlayChapter(idx)}
                  aria-label={`Reproducir capítulo ${chap.title}`}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-amber-400/90 hover:bg-amber-300 text-stone-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-90 group-hover:scale-100 shadow-xl cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>

              {/* Text Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-amber-400/90 mb-1">
                    {chap.period}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-1 mb-2">
                    {chap.title}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {chap.summary}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectChapter(idx)}
                    className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Ver Expediente</span>
                  </button>
                  <button
                    onClick={() => onPlayChapter(idx)}
                    className="text-xs font-medium text-amber-300 hover:text-amber-200 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Reproducir</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
