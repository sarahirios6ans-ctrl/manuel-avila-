import React, { useState } from 'react';
import { X, FileText, Calendar, BookOpen } from 'lucide-react';
import { HISTORIC_DOCUMENTS } from '../data/biographyData';

interface HistoricDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoricDocumentsModal: React.FC<HistoricDocumentsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(HISTORIC_DOCUMENTS[0].id);

  if (!isOpen) return null;

  const currentDoc = HISTORIC_DOCUMENTS.find((d) => d.id === selectedDocId) || HISTORIC_DOCUMENTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/80">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-serif font-bold text-stone-100">
              Sala de Documentos y Decretos Históricos
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Selector Ribbon */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-stone-950/40 border-b border-stone-800/80 overflow-x-auto text-xs">
          {HISTORIC_DOCUMENTS.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setSelectedDocId(doc.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedDocId === doc.id
                  ? 'bg-amber-400 text-stone-950 font-semibold'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {doc.title.split(' ')[0]} {doc.title.split(' ')[1]} ({doc.date.split(' ').pop()})
            </button>
          ))}
        </div>

        {/* Document Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-stone-300">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentDoc.date}</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-400 uppercase">{currentDoc.type}</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-100">
              {currentDoc.title}
            </h3>
          </div>

          <div className="p-3.5 bg-stone-950/70 border border-stone-800 rounded-lg text-xs text-stone-400 italic">
            <span className="font-semibold text-stone-300">Contexto Histórico:</span> {currentDoc.context}
          </div>

          <div className="border-t border-stone-800 pt-4">
            <div className="prose prose-invert max-w-none text-stone-200 font-serif leading-relaxed whitespace-pre-line text-sm md:text-base">
              {currentDoc.fullText}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-stone-800 bg-stone-950/60 flex items-center justify-between text-xs text-stone-400">
          <span>Fuente: Archivo General de la Nación (AGN) · Presidencia de la República</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
