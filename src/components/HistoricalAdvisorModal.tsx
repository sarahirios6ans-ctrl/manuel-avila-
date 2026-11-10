import React, { useState } from 'react';
import { X, Sparkles, Send, Loader2, BookOpen } from 'lucide-react';
import { askHistoricalExpert } from '../utils/geminiChat';

interface HistoricalAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoricalAdvisorModal: React.FC<HistoricalAdvisorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [question, setQuestion] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: 'Bienvenido al Archivo Histórico de la Presidencia de Manuel Ávila Camacho (1940–1946). Puedes preguntarme acerca de su biografía, la Unidad Nacional, el Escuadrón 201 en la Segunda Guerra Mundial, la fundación del IMSS, la relación con Cárdenas y Roosevelt o cualquier duda que desees profundizar.',
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleAsk = async (textToAsk?: string) => {
    const q = textToAsk || question;
    if (!q.trim() || isLoading) return;

    const userMsg = q.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setQuestion('');
    setIsLoading(true);

    try {
      const answer = await askHistoricalExpert(userMsg);
      setMessages((prev) => [...prev, { role: 'assistant', text: answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Disculpa, no fue posible consultar el archivo en este instante. Por favor intenta de nuevo con otra pregunta sobre Ávila Camacho.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    '¿Por qué declaró México la guerra a Alemania en 1942?',
    '¿Qué papel jugó el Escuadrón 201 en Filipinas?',
    '¿Qué significó su famosa frase «Soy creyente»?',
    '¿Cómo fue la histórica reunión con Roosevelt en Monterrey?',
    '¿Por qué le apodaban «El Presidente Caballero»?',
    '¿Cómo se fundó el IMSS en 1943?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/80">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-100">
                Consultar al Historiador
              </h2>
              <p className="text-[11px] text-stone-400">
                Especialista en la época de Manuel Ávila Camacho (1940-1946)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-sm">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-amber-500 text-stone-950 font-medium'
                    : 'bg-stone-950/80 border border-stone-800 text-stone-200 font-sans whitespace-pre-line'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 bg-stone-950/80 border border-stone-800 text-amber-300 rounded-2xl px-4 py-3 text-xs">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Consultando fuentes documentales...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-6 py-2 bg-stone-950/40 border-t border-stone-800/60 overflow-x-auto flex items-center gap-2">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(s)}
              disabled={isLoading}
              className="text-[11px] px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 whitespace-nowrap transition-colors cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/80 flex items-center gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAsk();
            }}
            placeholder="Pregunta sobre su gobierno, la guerra o su legado..."
            className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-xs md:text-sm text-stone-100 focus:outline-none focus:border-amber-400 placeholder:text-stone-500"
          />
          <button
            onClick={() => handleAsk()}
            disabled={!question.trim() || isLoading}
            className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-stone-950 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
