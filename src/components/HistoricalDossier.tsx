import React from 'react';
import { Play, Calendar, Quote, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { Chapter, BIOGRAPHY_CHAPTERS } from '../data/biographyData';

interface HistoricalDossierProps {
  currentChapterIndex: number;
  onSelectChapter: (index: number) => void;
  onPlayInVideo: (index: number) => void;
}

export const HistoricalDossier: React.FC<HistoricalDossierProps> = ({
  currentChapterIndex,
  onSelectChapter,
  onPlayInVideo,
}) => {
  const chapter: Chapter = BIOGRAPHY_CHAPTERS[currentChapterIndex];

  return (
    <article className="py-8 max-w-5xl mx-auto">
      {/* Chapter pagination header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-800">
        <button
          onClick={() => {
            if (currentChapterIndex > 0) onSelectChapter(currentChapterIndex - 1);
          }}
          disabled={currentChapterIndex === 0}
          className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-stone-400 hover:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Episodio Anterior</span>
        </button>

        <div className="text-xs tracking-widest uppercase font-mono text-amber-400">
          Episodio {String(chapter.id).padStart(2, '0')} de 08 · {chapter.period}
        </div>

        <button
          onClick={() => {
            if (currentChapterIndex < BIOGRAPHY_CHAPTERS.length - 1)
              onSelectChapter(currentChapterIndex + 1);
          }}
          disabled={currentChapterIndex === BIOGRAPHY_CHAPTERS.length - 1}
          className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-stone-400 hover:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <span>Siguiente Episodio</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Chapter Title & Subtitle */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-100 tracking-tight mb-3">
          {chapter.title}
        </h1>
        <p className="text-lg md:text-xl text-stone-300 font-light font-serif italic max-w-3xl">
          «{chapter.subtitle}»
        </p>
      </div>

      {/* Media Presentation + Accession Definition List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
        {/* Left: Image with frame */}
        <div className="lg:col-span-8 rounded-xl overflow-hidden bg-stone-900 border border-stone-800 shadow-xl">
          <div className="relative aspect-video w-full overflow-hidden">
            <img
              src={chapter.image}
              alt={chapter.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

            <button
              onClick={() => onPlayInVideo(currentChapterIndex)}
              className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-medium text-xs rounded-lg shadow-lg transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Ver en el Video Narrado</span>
            </button>
          </div>
          <div className="p-4 bg-stone-900/90 text-xs text-stone-400 border-t border-stone-800/80">
            <span className="font-semibold text-stone-300">Fotografía de Archivo:</span>{' '}
            {chapter.imageCaption}
          </div>
        </div>

        {/* Right: Key Facts Definition List */}
        <div className="lg:col-span-4 bg-stone-900/60 rounded-xl p-5 border border-stone-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 pb-2 border-b border-stone-800">
            <Calendar className="w-3.5 h-3.5" />
            <span>Ficha Histórica</span>
          </div>

          <dl className="space-y-3 text-xs">
            {chapter.keyFacts.map((fact, idx) => (
              <div key={idx} className="pb-2 border-b border-stone-800/60 last:border-0">
                <dt className="text-stone-400 uppercase tracking-wider text-[11px] font-sans">
                  {fact.label}
                </dt>
                <dd className="font-medium text-stone-200 mt-0.5 text-sm font-serif">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Narration Transcript / Editorial Reading Column */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-10">
        <div className="md:col-span-8 space-y-6 text-stone-300 leading-relaxed font-sans text-base">
          <div className="border-b border-stone-800 pb-2 text-xs uppercase tracking-widest font-mono text-stone-400">
            Transcripción de la Narración Audiovisual
          </div>

          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-amber-400 text-stone-200 text-lg leading-relaxed font-serif">
            {chapter.narrationText}
          </p>

          {/* Historical Significance Box */}
          <div className="p-5 rounded-xl bg-stone-900 border border-stone-800/80 mt-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              <Award className="w-4 h-4" />
              <span>Trascendencia en la Historia de México</span>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed">
              {chapter.historicalSignificance}
            </p>
          </div>
        </div>

        {/* Right side: Primary Quote */}
        {chapter.quote && (
          <div className="md:col-span-4 flex flex-col justify-start">
            <div className="p-6 rounded-xl bg-amber-950/20 border border-amber-800/30 text-amber-100/90 relative">
              <Quote className="w-8 h-8 text-amber-500/40 mb-3" />
              <blockquote className="font-serif italic text-lg leading-snug mb-4">
                «{chapter.quote.text}»
              </blockquote>
              <div className="text-xs font-sans font-medium text-amber-300">
                — {chapter.quote.author}
              </div>
              <div className="text-[11px] text-amber-300/60 mt-0.5">
                {chapter.quote.context}
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
