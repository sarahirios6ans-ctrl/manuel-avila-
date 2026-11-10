import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Sliders,
  Tv,
  Subtitles,
  Sparkles,
  Info
} from 'lucide-react';
import { Chapter, BIOGRAPHY_CHAPTERS } from '../data/biographyData';
import { speechNarrationEngine, documentaryAtmosphere } from '../utils/narrationEngine';

interface VideoPlayerProps {
  currentChapterIndex: number;
  onSelectChapter: (index: number) => void;
  onOpenDocuments: () => void;
  onOpenAdvisor: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  currentChapterIndex,
  onSelectChapter,
  onOpenDocuments,
  onOpenAdvisor,
}) => {
  const chapter = BIOGRAPHY_CHAPTERS[currentChapterIndex];
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(true);
  const [ambientVolume, setAmbientVolume] = useState<number>(0.25);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [vintageFilter, setVintageFilter] = useState<boolean>(false);
  const [aspectRatio43, setAspectRatio43] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>('');
  const [showControls, setShowControls] = useState<boolean>(true);
  const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);
  const tickerRef = useRef<number | null>(null);

  // Sync ambient sound volume
  useEffect(() => {
    documentaryAtmosphere.setVolume(ambientVolume);
  }, [ambientVolume]);

  // Calculate current subtitle based on current time
  useEffect(() => {
    if (!chapter || !chapter.subtitles) return;
    const activeSub = chapter.subtitles.find(
      (s) => currentTimeSec >= s.startSec && currentTimeSec < s.startSec + s.durationSec
    );
    setCurrentSubtitle(activeSub ? activeSub.text : '');
  }, [currentTimeSec, chapter]);

  // Handle voice speech trigger
  const triggerVoiceNarration = useCallback(
    (startSec = 0) => {
      if (!isVoiceEnabled || !chapter) {
        speechNarrationEngine.stop();
        return;
      }

      // If starting mid-way, adjust text or speak remaining
      let textToRead = chapter.narrationText;
      if (startSec > 0 && chapter.subtitles) {
        const remainingSubs = chapter.subtitles.filter((s) => s.startSec + s.durationSec > startSec);
        if (remainingSubs.length > 0) {
          textToRead = remainingSubs.map((s) => s.text).join(' ');
        }
      }

      speechNarrationEngine.setRate(playbackSpeed);
      speechNarrationEngine.speak(
        textToRead,
        undefined,
        () => {
          // Finished reading narration
        },
        () => {
          // Voice failed or unsupported
        }
      );
    },
    [chapter, isVoiceEnabled, playbackSpeed]
  );

  // Auto-advance ticker when playing
  useEffect(() => {
    if (isPlaying) {
      documentaryAtmosphere.start();
      const intervalMs = 250;
      const stepSec = (intervalMs / 1000) * playbackSpeed;

      tickerRef.current = window.setInterval(() => {
        setCurrentTimeSec((prev) => {
          const next = prev + stepSec;
          if (next >= chapter.durationSec) {
            // Chapter ended
            if (currentChapterIndex < BIOGRAPHY_CHAPTERS.length - 1) {
              onSelectChapter(currentChapterIndex + 1);
              return 0;
            } else {
              setIsPlaying(false);
              speechNarrationEngine.stop();
              documentaryAtmosphere.stop();
              return chapter.durationSec;
            }
          }
          return next;
        });
      }, intervalMs);
    } else {
      if (tickerRef.current) clearInterval(tickerRef.current);
      speechNarrationEngine.stop();
      documentaryAtmosphere.stop();
    }

    return () => {
      if (tickerRef.current) clearInterval(tickerRef.current);
    };
  }, [isPlaying, playbackSpeed, chapter.durationSec, currentChapterIndex, onSelectChapter]);

  // Reset or change chapter
  useEffect(() => {
    setCurrentTimeSec(0);
    if (isPlaying) {
      triggerVoiceNarration(0);
    } else {
      speechNarrationEngine.stop();
    }
  }, [currentChapterIndex, isPlaying, triggerVoiceNarration]);

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      speechNarrationEngine.stop();
      documentaryAtmosphere.stop();
    } else {
      setIsPlaying(true);
      triggerVoiceNarration(currentTimeSec);
      documentaryAtmosphere.start();
    }
  };

  // Seek time
  const handleSeek = (newTimeSec: number) => {
    const clamped = Math.max(0, Math.min(chapter.durationSec, newTimeSec));
    setCurrentTimeSec(clamped);
    if (isPlaying) {
      triggerVoiceNarration(clamped);
    }
  };

  // Skip 10 seconds back/forward
  const handleSkip = (seconds: number) => {
    handleSeek(currentTimeSec + seconds);
  };

  // Keyboard shortcut handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleSkip(10);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleSkip(-10);
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        setIsVoiceEnabled((v) => !v);
      } else if (e.code === 'KeyC') {
        e.preventDefault();
        setShowSubtitles((s) => !s);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Fullscreen support
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Auto-hide controls when mouse is inactive
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
        setShowSettingsMenu(false);
      }, 3500);
    }
  };

  // Format time mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = (currentTimeSec / chapter.durationSec) * 100;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full overflow-hidden bg-black text-white select-none transition-all duration-300 rounded-xl border border-stone-800 shadow-2xl ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-0' : 'aspect-video max-w-6xl mx-auto'
      }`}
    >
      {/* 1. VISUAL LAYER (High-res Historical Photography with Ken Burns) */}
      <div
        className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-stone-950 ${
          aspectRatio43 ? 'max-w-[80%] mx-auto shadow-2xl' : ''
        }`}
      >
        <img
          key={chapter.image}
          src={chapter.image}
          alt={chapter.imageAlt}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isPlaying ? (currentChapterIndex % 2 === 0 ? 'animate-kenburns-1' : 'animate-kenburns-2') : 'scale-100'
          } ${vintageFilter ? 'vintage-projector' : ''}`}
        />

        {/* Cinematic Vignette & Shadow Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60 pointer-events-none" />

        {/* Vintage Archival Film Grain Overlay */}
        {vintageFilter && (
          <div className="absolute inset-0 archival-grain opacity-60 mix-blend-overlay pointer-events-none film-flicker" />
        )}

        {/* Chapter Header Card (Upper Left) */}
        <div
          className={`absolute top-6 left-6 max-w-xl transition-opacity duration-300 pointer-events-none ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-amber-300/90 font-medium mb-1">
            <span>Capítulo {String(chapter.id).padStart(2, '0')} / 08</span>
            <span aria-hidden="true">·</span>
            <span>{chapter.period}</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-300">Biografía Histórica</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-100 tracking-tight leading-tight drop-shadow-md">
            {chapter.title}
          </h2>
          <p className="text-xs md:text-sm text-stone-300 font-light mt-1 drop-shadow line-clamp-1">
            {chapter.subtitle}
          </p>
        </div>

        {/* Archival Photo Caption Watermark (Upper Right) */}
        <div
          className={`absolute top-6 right-6 hidden md:block max-w-xs text-right transition-opacity duration-300 pointer-events-none ${
            showControls ? 'opacity-90' : 'opacity-0'
          }`}
        >
          <div className="text-[11px] font-sans text-stone-400 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded border border-stone-800/80">
            {chapter.imageCaption}
          </div>
        </div>

        {/* Center Play Button Overlay on Pause */}
        {!isPlaying && (
          <button
            onClick={handleTogglePlay}
            aria-label="Reproducir documental"
            className="absolute z-20 group flex items-center justify-center w-20 h-20 rounded-full bg-stone-900/80 backdrop-blur-md border border-amber-400/40 text-amber-300 hover:bg-amber-500 hover:text-stone-950 hover:scale-105 active:scale-95 transition-all shadow-2xl cursor-pointer"
          >
            <Play className="w-8 h-8 ml-1 fill-current" />
          </button>
        )}

        {/* 2. SUBTITLES / CLOSED CAPTIONS OVERLAY */}
        {showSubtitles && currentSubtitle && (
          <div className="absolute bottom-20 md:bottom-24 inset-x-4 md:inset-x-12 z-20 text-center pointer-events-none">
            <span className="inline-block px-4 py-2 rounded-lg bg-black/80 backdrop-blur-md border border-stone-700/60 text-stone-100 text-sm md:text-base lg:text-lg font-serif tracking-wide leading-relaxed shadow-lg max-w-3xl">
              {currentSubtitle}
            </span>
          </div>
        )}
      </div>

      {/* 3. CONTROL BAR OVERLAY (Fade on Idle) */}
      <div
        className={`absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black via-black/90 to-transparent pt-12 pb-4 px-4 md:px-6 transition-opacity duration-300 ${
          showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Interactive Timeline Scrubber */}
        <div className="relative mb-3 group cursor-pointer">
          {/* Track background */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = clickX / rect.width;
              handleSeek(ratio * chapter.durationSec);
            }}
            className="relative h-2 w-full bg-stone-800 rounded-full overflow-hidden hover:h-2.5 transition-all"
          >
            {/* Progress Fill */}
            <div
              className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-300 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Subtitle beat notches */}
          <div className="absolute inset-x-0 top-0 h-2 pointer-events-none flex justify-between">
            {chapter.subtitles.map((sub) => {
              const subPercent = (sub.startSec / chapter.durationSec) * 100;
              return (
                <div
                  key={sub.id}
                  style={{ left: `${subPercent}%` }}
                  className="absolute top-0 bottom-0 w-[2px] bg-stone-600/40"
                  title={sub.text}
                />
              );
            })}
          </div>
        </div>

        {/* Primary Controls Row */}
        <div className="flex items-center justify-between gap-4">
          {/* Left: Playback & Chapter Navigation */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={handleTogglePlay}
              aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
              className="p-2 md:p-2.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-100 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>

            <button
              onClick={() => handleSkip(-10)}
              aria-label="Retroceder 10 segundos"
              title="Retroceder 10s (←)"
              className="p-2 text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (currentChapterIndex > 0) {
                  onSelectChapter(currentChapterIndex - 1);
                }
              }}
              disabled={currentChapterIndex === 0}
              aria-label="Capítulo anterior"
              title="Capítulo anterior"
              className="p-2 text-stone-400 hover:text-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (currentChapterIndex < BIOGRAPHY_CHAPTERS.length - 1) {
                  onSelectChapter(currentChapterIndex + 1);
                }
              }}
              disabled={currentChapterIndex === BIOGRAPHY_CHAPTERS.length - 1}
              aria-label="Siguiente capítulo"
              title="Siguiente capítulo"
              className="p-2 text-stone-400 hover:text-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Timecode */}
            <div className="text-xs font-mono text-stone-300 ml-1">
              <span className="text-amber-300 font-semibold">{formatTime(currentTimeSec)}</span>
              <span className="text-stone-500 mx-1">/</span>
              <span className="text-stone-400">{formatTime(chapter.durationSec)}</span>
            </div>
          </div>

          {/* Center: Audio Voiceover Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-stone-900/70 border border-stone-800 rounded-lg text-xs">
            {isVoiceEnabled ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-stone-300 font-medium">Voz en Español Activa</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-stone-500" />
                <span className="text-stone-400">Voz Silenciada</span>
              </>
            )}
          </div>

          {/* Right: Audio, CC, Aspect, Settings, Fullscreen */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Voice Narration Toggle */}
            <button
              onClick={() => {
                setIsVoiceEnabled((v) => {
                  const next = !v;
                  speechNarrationEngine.setMuted(!next);
                  if (next && isPlaying) {
                    triggerVoiceNarration(currentTimeSec);
                  }
                  return next;
                });
              }}
              title={isVoiceEnabled ? 'Silenciar voz del narrador (M)' : 'Activar voz del narrador (M)'}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isVoiceEnabled ? 'text-amber-400 bg-amber-400/10' : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Subtitles Toggle */}
            <button
              onClick={() => setShowSubtitles((s) => !s)}
              title={showSubtitles ? 'Ocultar subtítulos (C)' : 'Mostrar subtítulos (C)'}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                showSubtitles ? 'text-amber-400 bg-amber-400/10' : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              <Subtitles className="w-4 h-4" />
            </button>

            {/* Vintage Filter Toggle */}
            <button
              onClick={() => setVintageFilter((v) => !v)}
              title={vintageFilter ? 'Modo HD Restaurado' : 'Filtro Noticiario 1940s (Sepia y Grano)'}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                vintageFilter ? 'text-amber-400 bg-amber-400/10' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Tv className="w-4 h-4" />
            </button>

            {/* Speed Selector */}
            <button
              onClick={() => {
                const speeds = [0.75, 1.0, 1.25, 1.5];
                const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                setPlaybackSpeed(next);
                speechNarrationEngine.setRate(next);
                if (isPlaying) {
                  triggerVoiceNarration(currentTimeSec);
                }
              }}
              title="Velocidad de reproducción"
              className="px-2 py-1 text-xs font-mono font-medium rounded bg-stone-800/80 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
            >
              {playbackSpeed}x
            </button>

            {/* Settings Popover Button */}
            <div className="relative">
              <button
                onClick={() => setShowSettingsMenu((s) => !s)}
                title="Configuración de audio y visual"
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  showSettingsMenu ? 'bg-stone-700 text-amber-300' : 'text-stone-400 hover:text-stone-100'
                }`}
              >
                <Sliders className="w-4 h-4" />
              </button>

              {/* Popover Menu */}
              {showSettingsMenu && (
                <div className="absolute right-0 bottom-full mb-2 w-72 p-4 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl text-xs space-y-4">
                  <div className="font-semibold text-stone-200 border-b border-stone-800 pb-2">
                    Ajustes del Reproductor
                  </div>

                  {/* Ambient Music Slider */}
                  <div>
                    <div className="flex justify-between text-stone-400 mb-1">
                      <span>Banda Sonora y Gramófono</span>
                      <span className="font-mono">{Math.round(ambientVolume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={ambientVolume}
                      onChange={(e) => setAmbientVolume(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  {/* Aspect Ratio Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Aspecto Cinematográfico 4:3</span>
                    <button
                      onClick={() => setAspectRatio43((a) => !a)}
                      className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                        aspectRatio43 ? 'bg-amber-500 text-stone-950 font-medium' : 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      {aspectRatio43 ? '4:3 Archivo' : '16:9 HD'}
                    </button>
                  </div>

                  {/* Primary source link */}
                  <div className="pt-2 border-t border-stone-800 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setShowSettingsMenu(false);
                        onOpenDocuments();
                      }}
                      className="text-left text-amber-300 hover:text-amber-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Ver documentos y discursos oficiales</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowSettingsMenu(false);
                        onOpenAdvisor();
                      }}
                      className="text-left text-amber-300 hover:text-amber-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Preguntarle al Historiador IA</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              title="Pantalla completa (F)"
              className="p-2 rounded-lg text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
