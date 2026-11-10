import React, { useState } from 'react';
import { X, CheckCircle, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';
import { BIOGRAPHY_QUIZ, QuizQuestion } from '../data/biographyData';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQ: QuizQuestion = BIOGRAPHY_QUIZ[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < BIOGRAPHY_QUIZ.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/80">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-serif font-bold text-stone-100">
              Evaluación Histórica: Manuel Ávila Camacho
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isFinished ? (
            <div>
              {/* Question counter & progress */}
              <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-3">
                <span>Pregunta {currentIdx + 1} de {BIOGRAPHY_QUIZ.length}</span>
                <span>Aciertos: {score}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-amber-400 transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / BIOGRAPHY_QUIZ.length) * 100}%` }}
                />
              </div>

              {/* Question text */}
              <h3 className="text-xl font-serif font-bold text-stone-100 mb-6 leading-snug">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((option, optIdx) => {
                  let stateStyle = 'bg-stone-800/80 border-stone-700 hover:border-amber-400/80 text-stone-200';

                  if (isAnswered) {
                    if (optIdx === currentQ.correctIndex) {
                      stateStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-medium';
                    } else if (selectedOption === optIdx) {
                      stateStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                    } else {
                      stateStyle = 'opacity-50 border-stone-800 text-stone-400';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={isAnswered}
                      className={`w-full p-4 text-left text-sm rounded-xl border transition-all flex items-center justify-between cursor-pointer ${stateStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswered && optIdx === currentQ.correctIndex && (
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {isAnswered && selectedOption === optIdx && optIdx !== currentQ.correctIndex && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation note when answered */}
              {isAnswered && (
                <div className="p-4 bg-stone-950/80 border border-stone-800 rounded-xl mb-6 text-xs text-stone-300 leading-relaxed">
                  <div className="font-semibold text-amber-300 mb-1">Contexto Histórico:</div>
                  {currentQ.explanation}
                </div>
              )}

              {/* Next button */}
              {isAnswered && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-sm transition-all cursor-pointer shadow-lg"
                  >
                    <span>{currentIdx < BIOGRAPHY_QUIZ.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 mx-auto flex items-center justify-center mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-100 mb-2">
                ¡Evaluación Completada!
              </h3>
              <p className="text-sm text-stone-400 mb-6">
                Has obtenido <span className="text-amber-400 font-bold text-lg">{score}</span> de{' '}
                <span className="font-bold text-lg">{BIOGRAPHY_QUIZ.length}</span> respuestas correctas.
              </p>

              <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl text-stone-300 text-sm max-w-md mx-auto mb-8 font-serif">
                {score >= 5
                  ? '¡Excelente conocimiento! Dominas los hitos clave de la administración de Manuel Ávila Camacho y su papel en la Segunda Guerra Mundial.'
                  : score >= 3
                  ? '¡Buen intento! Tienes nociones sólidas de su política de Unidad Nacional y la época del Milagro Mexicano.'
                  : 'Te invitamos a ver los capítulos del documental audiovisual para conocer todos los detalles de su biografía.'}
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Repetir Test</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-sm transition-colors cursor-pointer"
                >
                  Volver al Video
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
