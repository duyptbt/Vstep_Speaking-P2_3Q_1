import { useState } from "react";
import { FrameworkStep, BandAnswer } from "../types";
import { Copy, Check, MessageSquare, ClipboardCheck } from "lucide-react";

interface SocaFrameworkProps {
  steps: FrameworkStep[];
  activeStepId: "s" | "o" | "c" | "a";
  onSelectStep: (stepId: "s" | "o" | "c" | "a") => void;
  activeAnswer: BandAnswer;
}

export default function SocaFramework({
  steps,
  activeStepId,
  onSelectStep,
  activeAnswer
}: SocaFrameworkProps) {
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);

  const activeStep = steps.find((s) => s.id === activeStepId) || steps[0];

  // Helper to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhrase(text);
    setTimeout(() => setCopiedPhrase(null), 2000);
  };

  return (
    <div className="bg-white border-2 border-black p-5 mb-6" id="soca-framework-container">
      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">
        Khung Lập luận S-O-C-A (S-O-C-A Structural Framework) — chạm từng bước để xem chi tiết
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5" id="soca-steps-grid">
        {steps.map((s) => {
          const isActive = s.id === activeStepId;
          return (
            <button
              key={s.id}
              onClick={() => onSelectStep(s.id)}
              className={`p-3 border-2 text-left transition-all duration-150 cursor-pointer ${
                isActive
                  ? "border-[#D44D5C] bg-[#FDFCFB]"
                  : "border-black/20 bg-white hover:border-black"
              }`}
              id={`soca-step-btn-${s.id}`}
            >
              <div
                className="text-[10px] font-bold uppercase tracking-wider mb-1"
                style={{ color: isActive ? "#D44D5C" : "rgba(0,0,0,0.5)" }}
              >
                Bước {s.num}
              </div>
              <div className="font-display font-black text-gray-950 text-sm mb-0.5 uppercase">
                {s.name}
              </div>
              <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider truncate">
                {s.tag}
              </div>
            </button>
          );
        })}
      </div>

      {/* Step Detail Panel */}
      <div
        className="border-2 border-black border-l-[6px] border-l-[#D44D5C] p-5 transition-all duration-150 animate-fade-in bg-[#FDFCFB]"
        id="soca-step-detail-panel"
      >
        {/* Step Header */}
        <div className="flex items-center gap-3 mb-3 border-b border-black/10 pb-3">
          <div
            className="w-8 h-8 flex items-center justify-center font-display font-black text-sm text-white"
            style={{ backgroundColor: "#D44D5C" }}
          >
            {activeStep.num}
          </div>
          <div>
            <h4 className="font-display font-black text-gray-950 text-base leading-none mb-1 uppercase">
              {activeStep.name}
            </h4>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              {activeStep.tag}
            </span>
          </div>
        </div>

        {/* Purpose */}
        <p className="text-sm text-gray-800 leading-relaxed mb-4">
          {activeStep.purpose}
        </p>

        {/* Useful Phrases */}
        <div className="mb-4">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2.5">
            Cụm từ hữu ích (Useful Templates) — chạm để sao chép
          </span>
          <div className="flex flex-wrap gap-1.5" id="soca-useful-phrases">
            {activeStep.phrases.map((phrase, i) => {
              const isCopied = copiedPhrase === phrase;
              return (
                <button
                  key={i}
                  onClick={() => copyToClipboard(phrase)}
                  className="px-3 py-1.5 border border-black bg-white hover:bg-black hover:text-white text-left text-xs text-gray-950 font-sans leading-relaxed flex items-center gap-1.5 cursor-pointer transition-colors max-w-full"
                  title="Click to copy template"
                >
                  {isCopied ? (
                    <Check size={12} className="text-[#D44D5C] flex-shrink-0" />
                  ) : (
                    <ClipboardCheck size={12} className="text-gray-500 flex-shrink-0" />
                  )}
                  <span className="truncate">{phrase}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Excerpt */}
        <div className="bg-white border border-black/10 p-3.5">
          <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
            <MessageSquare size={12} className="text-[#D44D5C]" />
            <span>Trích câu trả lời mẫu (From Selected Sample Answer)</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed italic font-serif">
            "{activeAnswer[activeStepId]?.trim()}"
          </p>
        </div>
      </div>
    </div>
  );
}
