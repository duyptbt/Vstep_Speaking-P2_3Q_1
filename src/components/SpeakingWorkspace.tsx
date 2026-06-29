import { useState } from "react";
import { Topic, EvaluationResult, FrameworkStep } from "../types";
import { Sparkles, AlertCircle, Play, RefreshCw, Award, BookOpen, Volume2, CheckCircle2, FileText, Languages } from "lucide-react";

interface SpeakingWorkspaceProps {
  topic: Topic;
  selectedOptionName: string;
  otherOptionsNames: string[];
  steps: FrameworkStep[];
}

export default function SpeakingWorkspace({
  topic,
  selectedOptionName,
  otherOptionsNames,
  steps
}: SpeakingWorkspaceProps) {
  const [draft, setDraft] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overall" | "fluency" | "vocabulary" | "grammar" | "revised">("overall");

  // Speaking metrics calculator
  const wordCount = draft.trim() === "" ? 0 : draft.trim().split(/\s+/).length;
  // Average speaking rate is ~130 words per minute (WPM)
  const estSpeakingSecs = Math.round((wordCount / 130) * 60);
  
  const formatDuration = (secs: number) => {
    if (secs === 0) return "0s";
    const mins = Math.floor(secs / 60);
    const rSecs = secs % 60;
    if (mins > 0) {
      return `${mins}m ${rSecs}s`;
    }
    return `${rSecs}s`;
  };

  const handleEvaluate = async () => {
    if (draft.trim() === "") {
      setError("Vui lòng nhập bản nháp bài nói của bạn trước khi đánh giá.");
      return;
    }

    setEvaluating(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topicLabel: topic.label,
          situation: topic.situation,
          selectedChoiceName: selectedOptionName,
          otherChoicesNames: otherOptionsNames,
          draftText: draft,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Gặp lỗi trong quá trình kết nối với máy chủ AI.");
      }

      const data: EvaluationResult = await response.json();
      setResult(data);
      setActiveTab("overall");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Không thể kết nối với AI. Hãy chắc chắn rằng bạn đã cấu hình GEMINI_API_KEY.");
    } finally {
      setEvaluating(false);
    }
  };

  const handleClear = () => {
    setDraft("");
    setResult(null);
    setError(null);
  };

  const insertTemplate = () => {
    const templateText = `Well, looking at the situation, I believe that choosing ${selectedOptionName} is the most suitable option. First of all, this choice is a great option because it has many benefits. For example, it helps us solve the problem easily and effectively. On the other hand, let's examine the other alternatives. ${otherOptionsNames[0] || "The second option"} is not ideal because it is too expensive and depends too much on other conditions. Also, ${otherOptionsNames[1] || "The third option"} suffers from a major drawback, which is high costs. Therefore, we should rule out these options. To sum up, given its convenience, ${selectedOptionName} is definitely the best option among the three. Thank you for listening.`;
    setDraft(templateText);
    setError(null);
  };

  return (
    <div className="bg-white border-2 border-black p-5" id="speaking-evaluation-workspace">
      <div className="border-b-2 border-black/10 pb-3.5 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-[#D44D5C] text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest mb-1.5">
            <Volume2 size={12} /> AI Speaking Simulator
          </span>
          <h3 className="text-md sm:text-lg font-display font-black text-gray-950 uppercase tracking-tight">
            PHÒNG LUYỆN NÓI & ĐÁNH GIÁ CHUẨN VSTEP (AI SPEAKING DRAFT WORKSPACE)
          </h3>
        </div>
      </div>

      <p className="text-xs text-gray-600 leading-relaxed mb-4">
        Hãy viết hoặc dán kịch bản nói nháp của bạn vào ô dưới đây (hoặc dùng nút <strong>"Chèn bài mẫu gợi ý"</strong> để tham khảo cấu trúc trước). AI sẽ chấm điểm band (B1/B2/C1), sửa lỗi nói, và cung cấp <strong>bản phiên âm phonetic chuẩn quốc tế IPA</strong> cho các từ vựng học thuật bạn vừa sử dụng!
      </p>

      {/* Draft Input Workspace */}
      <div className="space-y-3 mb-5">
        <div className="flex justify-between items-center text-xs text-gray-500 font-bold uppercase tracking-wider font-mono">
          <span>Bản nháp bài nói của bạn (Your Speaking Draft)</span>
          <button 
            onClick={insertTemplate}
            className="text-[#D44D5C] hover:underline flex items-center gap-1 cursor-pointer"
            id="btn-insert-template"
          >
            <BookOpen size={13} /> Chèn bài mẫu gợi ý
          </button>
        </div>

        <textarea
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            if (error) setError(null);
          }}
          placeholder={`Ví dụ: Well, in this scenario, I strongly believe that choosing ${selectedOptionName} is the ultimate way forward...`}
          className="w-full h-44 p-4 border-2 border-black font-serif text-sm leading-relaxed text-gray-950 focus:outline-none focus:border-[#D44D5C] bg-[#FDFCFB] resize-none"
          id="speaking-draft-input"
        />

        {/* Live Speaking Counters */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-black/10 pb-3" id="live-counters">
          <div className="flex gap-4">
            <div className="bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-700">
              Số từ: <span className="font-mono text-gray-950">{wordCount} từ</span>
            </div>
            <div className="bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-700">
              Thời gian nói ước lượng: <span className="font-mono text-gray-950">~{formatDuration(estSpeakingSecs)}</span>
            </div>
          </div>
          
          <div className="text-[10px] text-gray-500 italic">
            *Thời gian lý tưởng cho Part 2 là từ 2:00 đến 3:00 phút (khoảng 150 - 280 từ).
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            onClick={handleClear}
            disabled={evaluating || draft.trim() === ""}
            className="px-4 py-2 border border-black text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
            id="btn-clear-draft"
          >
            Xóa nháp
          </button>

          <button
            onClick={handleEvaluate}
            disabled={evaluating || draft.trim() === ""}
            className="px-5 py-2.5 bg-black text-white border-2 border-black text-xs font-black uppercase tracking-widest hover:bg-[#D44D5C] hover:border-[#D44D5C] transition-all duration-150 cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
            id="btn-evaluate-draft"
          >
            {evaluating ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>AI ĐANG PHÂN TÍCH TIÊU CHÍ NÓI...</span>
              </>
            ) : (
              <>
                <Sparkles size={14} />
                <span>CHẤM ĐIỂM & ĐÁNH GIÁ PHÁT ÂM AI</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border-2 border-red-200 text-xs text-red-900 leading-relaxed mb-6 flex items-start gap-2.5" id="workspace-error">
          <AlertCircle size={15} className="text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Lỗi đánh giá AI:</span> {error}
            <p className="mt-1 text-[11px] text-red-700">Hãy kiểm tra xem tệp cấu hình của bạn đã lưu Secret Key chưa hoặc thử lại sau.</p>
          </div>
        </div>
      )}

      {/* Evaluation Result Panel */}
      {result && (
        <div className="border-2 border-black bg-white p-5 space-y-5 animate-fade-in" id="ai-evaluation-result">
          {/* Header score */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-black text-white p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D44D5C] text-white flex items-center justify-center font-display font-black text-lg">
                V
              </div>
              <div>
                <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest">ƯỚC LƯỢNG KẾT QUẢ NÓI (ESTIMATED BAND SCORE)</span>
                <span className="text-sm font-sans font-bold block text-gray-200">Chuẩn đánh giá năng lực VSTEP B1-B2-C1</span>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest">BAND ĐẠT ĐƯỢC</span>
              <span className="text-3xl font-display font-black text-[#D44D5C]">{result.score}</span>
            </div>
          </div>

          {/* Feedback Tabs */}
          <div className="border-b border-black/10 flex flex-wrap gap-1" id="eval-result-tabs">
            {(["overall", "fluency", "vocabulary", "grammar", "revised"] as const).map((tab) => {
              const active = tab === activeTab;
              const labels = {
                overall: "Tổng quan",
                fluency: "Trôi chảy & Nối ý",
                vocabulary: "Từ vựng & Phát âm IPA",
                grammar: "Sửa ngữ pháp",
                revised: "Bài nói cải thiện"
              };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-t-2 transition-all duration-150 ${
                    active 
                      ? "border-t-[#D44D5C] bg-[#FDFCFB] text-gray-950 font-black border-x border-b border-b-transparent -mb-px" 
                      : "border-t-transparent hover:text-black text-gray-500"
                  }`}
                >
                  {labels[tab]}
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="bg-[#FDFCFB] p-4 border border-black/10 min-h-[160px] leading-relaxed text-sm text-gray-950" id="eval-tab-content">
            
            {activeTab === "overall" && (
              <div className="space-y-4">
                <div className="flex items-start gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-black/5 pb-2">
                  <Award size={14} className="text-[#D44D5C]" />
                  <span>Nhận xét tổng quan bài nói (Overall Speech Critique)</span>
                </div>
                <p className="font-serif italic text-gray-900 leading-relaxed bg-white border border-black/5 p-3.5">
                  "{result.overallFeedback}"
                </p>
                
                {/* SOCA Step Coverage */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {Object.entries(result.frameworkAnalysis).map(([stepId, value]) => {
                    const matchedStep = steps.find(s => s.id === stepId);
                    return (
                      <div key={stepId} className="bg-white p-2.5 border border-black/5 flex flex-col justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider block text-gray-400 mb-1">
                          Step {matchedStep?.num}: {matchedStep?.name}
                        </span>
                        <span className="text-xs font-medium text-gray-800 leading-normal block">
                          {value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "fluency" && (
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-black/5 pb-2">
                  <Languages size={14} className="text-[#D44D5C]" />
                  <span>Độ trôi chảy, nhịp điệu & Trực quan nói (Spoken Fluency)</span>
                </div>
                <p className="text-xs text-gray-800 leading-relaxed font-sans whitespace-pre-line">
                  {result.critique.fluency}
                </p>
                <div className="bg-amber-50 p-3 border border-amber-200 mt-2 text-xs text-gray-700 leading-relaxed">
                  <span className="font-bold text-gray-900 block mb-1">💡 Mẹo độ trôi chảy (Fluency Tip):</span>
                  Trong bài nói thật, hãy cố gắng giữ nhịp điệu đều đặn. Nếu bị bí ý, hãy nói dài các từ chuyển tiếp tự nhiên như "Actually...", "I mean..." hoặc "Well..." thay vì im lặng hoàn toàn.
                </div>
              </div>
            )}

            {activeTab === "vocabulary" && (
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-black/5 pb-2">
                  <Volume2 size={14} className="text-[#D44D5C]" />
                  <span>Vốn từ nói & Hướng dẫn phát âm chuẩn IPA (Vocabulary & Phonetic IPA Guide)</span>
                </div>
                <p className="text-xs text-gray-800 leading-relaxed font-sans whitespace-pre-line bg-white p-3 border border-black/5">
                  {result.critique.vocabulary}
                </p>
                <div className="p-3 bg-blue-50 border border-blue-200 text-xs text-gray-700 leading-relaxed">
                  <span className="font-bold text-blue-900 block mb-1">⚠️ Lưu ý Ngữ âm theo yêu cầu:</span>
                  Hãy đọc kỹ phần phiên âm quốc tế **IPA** ở trên. Tránh nuốt các phụ âm cuối khó như /s/, /z/, /t/, /d/ hoặc tổ hợp phụ âm /ks/, /ts/ để đảm bảo người chấm thi nghe hiểu chính xác bài nói của bạn.
                </div>
              </div>
            )}

            {activeTab === "grammar" && (
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-black/5 pb-2">
                  <FileText size={14} className="text-[#D44D5C]" />
                  <span>Sửa lỗi ngữ pháp & Cấu trúc câu nói (Spoken Grammar Adjustments)</span>
                </div>
                <p className="text-xs text-gray-800 leading-relaxed font-sans whitespace-pre-line">
                  {result.critique.grammar}
                </p>
                <p className="text-xs text-gray-500 italic mt-2">
                  *Ghi chú: Bài nói không đòi hỏi sự hoàn hảo tuyệt đối như bài viết, nhưng việc giữ đúng cấu trúc câu điều kiện, thời thì và sự hòa hợp chủ vị sẽ nâng band điểm đáng kể.
                </p>
              </div>
            )}

            {activeTab === "revised" && (
              <div className="space-y-4">
                <div className="flex items-start gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-black/5 pb-2">
                  <CheckCircle2 size={14} className="text-[#D44D5C]" />
                  <span>Bài nói hoàn chỉnh đã tinh chỉnh (Your Corrected Model Speaking Script)</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  Hãy luyện đọc to (speak out loud) bản nói đã được AI hiệu chỉnh này để tích lũy phản xạ tự nhiên:
                </p>
                
                <div className="space-y-3.5">
                  {steps.map((s) => {
                    const polishedText = result.revisedVersion[s.id] || "";
                    if (!polishedText) return null;
                    return (
                      <div key={s.id} className="border-l-4 p-2.5 bg-white shadow-sm" style={{ borderColor: s.color }}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-1.5 py-0.5 text-[8px] font-bold text-white uppercase tracking-widest" style={{ backgroundColor: s.color }}>
                            Step {s.num}
                          </span>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{s.name}</span>
                        </div>
                        <p className="text-sm font-serif text-gray-900 leading-relaxed font-medium">
                          {polishedText}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
