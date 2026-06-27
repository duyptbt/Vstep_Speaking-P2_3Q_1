import { useState, useEffect } from "react";
import { Topic, BandAnswer, FrameworkStep } from "../types";
import { Sparkles, BarChart2, Eye, EyeOff, AlertTriangle, RefreshCw, Trophy, Info } from "lucide-react";

interface RubricDetail {
  fluency: string;
  lexical: string;
  grammar: string;
  pron: string;
  vocabularyHighlights?: string[];
  grammarHighlights?: string[];
  tacticalAdvice?: string;
}

const getDetailedRubric = (band: "C1" | "B2" | "B1", topicId: number): RubricDetail => {
  const common = {
    C1: {
      fluency: "Nói trôi chảy tự nhiên, mạch lạc, tốc độ lý tưởng. Các ý kết nối chặt chẽ bằng từ nối cao cấp.",
      lexical: "Vốn từ học thuật, thành ngữ phong phú, chính xác theo ngữ cảnh.",
      grammar: "Sử dụng đa dạng các cấu trúc phức tạp (câu điều kiện, mệnh đề phân từ, đảo ngữ).",
      pron: "Nhấn trọng âm rõ ràng, ngữ điệu tự nhiên, biểu cảm chuyên nghiệp."
    },
    B2: {
      fluency: "Duy trì tốc độ nói ổn định, thỉnh thoảng có ngập ngừng nhỏ để chọn từ nhưng không ảnh hưởng giao tiếp.",
      lexical: "Từ vựng phong phú, diễn đạt tốt chủ đề nhưng hạn chế về thành ngữ học thuật.",
      grammar: "Phối hợp nhuần nhuyễn câu đơn và câu ghép, ít lỗi ngữ pháp gây khó hiểu.",
      pron: "Phát âm rõ, dễ nghe, có nhịp điệu tương tốt."
    },
    B1: {
      fluency: "Tốc độ nói trung bình, còn ngập ngừng hoặc lặp từ. Liên kết ý bằng các từ nối đơn giản.",
      lexical: "Từ vựng cơ bản, đủ diễn tả ý chính, đôi chỗ bị lặp từ.",
      grammar: "Sử dụng chủ yếu câu đơn hoặc câu ghép cơ bản, có một số lỗi ngữ pháp nhỏ.",
      pron: "Phát âm rõ ràng các từ cơ bản, đôi chỗ còn nhầm lẫn âm đuôi hoặc trọng âm."
    }
  };

  // Custom highlights based on topic
  if (topicId === 0) { // Attracting Tourists
    if (band === "C1") {
      return {
        ...common.C1,
        vocabularyHighlights: ["strategic interventions (can thiệp chiến lược)", "lucrative catalyst (chất xúc tác sinh lợi)", "dwell time (thời gian lưu trú)", "inclement weather (thời tiết khắc nghiệt)"],
        grammarHighlights: ["Phép đảo ngữ: 'only entertainment centers possess...'", "Phép so sánh tương phản cấu trúc song song: 'while parks foster..., only entertainment centers...'"],
        tacticalAdvice: "Hãy chú ý nhấn mạnh vào cụm từ 'puts the cart before the horse' với ngữ điệu châm biếm nhẹ để tạo ấn tượng mạnh với giám khảo."
      };
    }
    if (band === "B2") {
      return {
        ...common.B2,
        vocabularyHighlights: ["boost tourism (thúc đẩy du lịch)", "major landmarks (địa danh lớn)", "regardless of the weather (bất kể thời tiết)", "engaged for hours (hào hứng hàng giờ)"],
        grammarHighlights: ["Mệnh đề quan hệ xác định: 'leisure malls always keep visitors engaged...'", "Cấu trúc tương phản: 'While building holiday flats..., providing parks is...'"],
        tacticalAdvice: "Sử dụng các từ chuyển ý 'To begin with', 'On the other hand' một cách dứt khoát để ngắt các phần lập luận rõ ràng."
      };
    }
    return {
      ...common.B1,
      vocabularyHighlights: ["fun activities (hoạt động vui vẻ)", "exciting for young people (thú vị cho người trẻ)", "always crowded (luôn đông đúc)"],
      grammarHighlights: ["Câu đơn ngắn gọn, trực diện.", "Liên từ đơn giản: 'Firstly', 'Secondly', 'Also'."],
      tacticalAdvice: "Cố gắng giữ nhịp thở đều, đọc rõ âm đuôi như 's' trong 'tourists', 'movies' và 'activities'."
    };
  }

  if (topicId === 1) { // Rewarding Students
    if (band === "C1") {
      return {
        ...common.C1,
        vocabularyHighlights: ["pedagogical flaws (thiếu sót sư phạm)", "academic integrity (sự liêm chính học thuật)", "intrinsic motivation (động lực nội tại)", "transactional reward loop (vòng lặp phần thưởng giao dịch)"],
        grammarHighlights: ["Cấu trúc giả định / điều kiện phức tạp: 'if high marks are handed out easily, they...'", "Mệnh đề danh từ: 'When a teacher praises a student's specific effort rather than...'"],
        tacticalAdvice: "Sử dụng giọng nói điềm tĩnh, chuyên nghiệp. Ngắt nghỉ đúng chỗ sau các liên từ bổ trợ như 'Conversely', 'Meanwhile'."
      };
    }
    if (band === "B2") {
      return {
        ...common.B2,
        vocabularyHighlights: ["build confidence (xây dựng sự tự tin)", "feel valued and respected (cảm thấy được trân trọng)", "free of charge (miễn phí)", "academic metrics (thước đo học thuật)"],
        grammarHighlights: ["Cấu trúc tương quan: 'once they know they will get an A anyway...'", "Câu phức với 'because': 'compliments are very powerful because they build...'"],
        tacticalAdvice: "Nhấn mạnh các từ chỉ cảm xúc tích cực như 'valued', 'respected', 'confidence' để bài nói sinh động."
      };
    }
    return {
      ...common.B1,
      vocabularyHighlights: ["study harder (học chăm hơn)", "very happy (rất vui)", "too expensive (quá đắt)"],
      grammarHighlights: ["Cấu trúc cơ bản 'When...': 'When a teacher says..., the student feels...'", "Cấu trúc nguyên nhân - kết quả cơ bản: 'If the school has no money, they...'"],
      tacticalAdvice: "Nói rõ ràng, rành mạch. Đảm bảo phát âm đúng âm 't' trong 'compliment' và 's' trong 'students'."
    };
  }

  if (topicId === 2) { // Keeping Fit
    if (band === "C1") {
      return {
        ...common.C1,
        vocabularyHighlights: ["sedentary lifestyle (lối sống ít vận động)", "dietary modification (điều chỉnh chế độ ăn)", "indispensable foundation (nền tảng không thể thiếu)", "unusable sunk costs (chi phí chìm không dùng đến)"],
        grammarHighlights: ["Cấu trúc phân từ hoàn thành: 'For an office worker bound to a desk...'", "Mệnh đề nhượng bộ phức hợp: 'While physical exertion is vital, I would contend that...'"],
        tacticalAdvice: "Thể hiện tư duy phản biện cao bằng cách nhấn giọng ở từ 'indispensable' và 'counteract'."
      };
    }
    if (band === "B2") {
      return {
        ...common.B2,
        vocabularyHighlights: ["stay healthy (giữ sức khỏe)", "work productively (làm việc hiệu quả)", "exhausting workday (ngày làm việc mệt mỏi)", "logical starting point (điểm khởi đầu hợp lý)"],
        grammarHighlights: ["Phép so sánh: 'nutrition plays the most important role...'", "Cấu trúc tương phản: 'In contrast, the other choices are...'"],
        tacticalAdvice: "Nói với tốc độ tự nhiên, kể câu chuyện trải nghiệm cá nhân của dân văn phòng để tăng độ truyền cảm."
      };
    }
    return {
      ...common.B1,
      vocabularyHighlights: ["good health (sức khỏe tốt)", "eat healthy (ăn uống lành mạnh)", "costs a lot of money (tốn nhiều tiền)"],
      grammarHighlights: ["Cấu trúc điều kiện đơn giản: 'If we eat good food..., we will have...'", "Câu đơn giản: 'We can do this every day...'"],
      tacticalAdvice: "Tập trung nói đúng âm đuôi 'th' trong 'health' và 'healthy', tránh nuốt âm."
    };
  }

  return common[band];
};

interface AnswerViewerProps {
  topic: Topic;
  selectedOptionId: "A" | "B" | "C";
  selectedOptionName: string;
  otherOptionsNames: string[];
  onSelectStep: (stepId: "s" | "o" | "c" | "a") => void;
  steps: FrameworkStep[];
  band: "C1" | "B2" | "B1";
  setBand: (band: "C1" | "B2" | "B1") => void;
}

export default function AnswerViewer({
  topic,
  selectedOptionId,
  selectedOptionName,
  otherOptionsNames,
  onSelectStep,
  steps,
  band,
  setBand
}: AnswerViewerProps) {
  const [highlightOn, setHighlightOn] = useState(true);
  const [customAnswer, setCustomAnswer] = useState<BandAnswer | null>(null);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  // Determine active answer source (either pre-written if choice matches recommendedChoice, or custom generated, or fallback)
  const isRecommendedChoice = selectedOptionId === topic.recommendedChoice;
  
  const getDisplayAnswer = (): BandAnswer => {
    if (customAnswer) {
      return customAnswer;
    }
    // If the selected choice matches the recommended choice, we can show our polished static answers!
    if (isRecommendedChoice) {
      return topic.bandAnswers[band];
    }
    
    // Otherwise, generate a guide outline structure to assist them with the custom choice
    return {
      s: `State your choice clearly: "In this situation, I believe that choosing ${selectedOptionName} is the most optimal option." Paraphrase the scenario to demonstrate your lexical range.`,
      o: `Elaborate on the key benefits of ${selectedOptionName}. Use specific supporting reasons (e.g., cost-effectiveness, convenience, or long-term positive impact) to justify your stance.`,
      c: `Contrast and systematically reject the other options (${otherOptionsNames.join(" and ")}). Point out their key flaws, such as high expenses, weather dependency, or lack of practicality.`,
      a: `Conclude with a confident summary: "All in all, while the other choices have some merits, ${selectedOptionName} is undeniably the most logical decision."`,
      note: "Hướng dẫn tự luyện nói: Hãy dựa vào khung sườn cấu trúc SOCA ở trên để tự triển khai ý nói. Để AI tự động viết kịch bản chi tiết và phân tích từ vựng cao cấp cho bạn, hãy cấu hình GEMINI_API_KEY ở mục Settings > Secrets của không gian làm việc nhé!"
    };
  };

  const activeAnswer = getDisplayAnswer();

  // Call server-side endpoint to generate a custom answer
  const generateCustomAnswer = async () => {
    setGenerating(true);
    setGenError(null);
    try {
      const response = await fetch("/api/generate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicLabel: topic.label,
          situation: topic.situation,
          selectedChoiceName: selectedOptionName,
          otherChoicesNames: otherOptionsNames,
          band: band
        })
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to generate answer.");
      }
      const data = await response.json();
      setCustomAnswer({
        s: data.s,
        o: data.o,
        c: data.c,
        a: data.a,
        note: data.note
      });
    } catch (error: any) {
      console.error(error);
      setGenError(error.message || "Không thể kết nối đến máy chủ. Vui lòng đảm bảo đã cấu hình GEMINI_API_KEY.");
    } finally {
      setGenerating(false);
    }
  };

  // Auto-generate custom answer when choice is not the recommended choice
  useEffect(() => {
    if (!isRecommendedChoice) {
      setCustomAnswer(null);
      setGenError(null);
      generateCustomAnswer();
    } else {
      setCustomAnswer(null);
      setGenError(null);
    }
  }, [topic, selectedOptionId, band]);

  // Indicative scores based on band
  const getIndicativeScores = () => {
    if (band === "C1") {
      return [
        { label: "Fluency & Coherence", val: 9.0, color: "bg-[#D44D5C]" },
        { label: "Lexical Resource", val: 9.0, color: "bg-[#D44D5C]" },
        { label: "Grammatical Range", val: 8.5, color: "bg-[#D44D5C]" },
        { label: "Pronunciation (Stress/Intonation)", val: 9.0, color: "bg-[#D44D5C]" }
      ];
    }
    if (band === "B2") {
      return [
        { label: "Fluency & Coherence", val: 7.5, color: "bg-[#D44D5C]" },
        { label: "Lexical Resource", val: 7.0, color: "bg-[#D44D5C]" },
        { label: "Grammatical Range", val: 7.0, color: "bg-[#D44D5C]" },
        { label: "Pronunciation (Stress/Intonation)", val: 7.5, color: "bg-[#D44D5C]" }
      ];
    }
    return [
      { label: "Fluency & Coherence", val: 5.0, color: "bg-[#D44D5C]" },
      { label: "Lexical Resource", val: 5.0, color: "bg-[#D44D5C]" },
      { label: "Grammatical Range", val: 5.0, color: "bg-[#D44D5C]" },
      { label: "Pronunciation (Stress/Intonation)", val: 5.5, color: "bg-[#D44D5C]" }
    ];
  };

  const scores = getIndicativeScores();

  return (
    <div className="bg-white border-2 border-black p-5 mb-6" id="answer-viewer-panel">
      {/* Compare Band Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-2">
            So sánh chất lượng câu trả lời (Compare Band Quality)
          </span>
          <div className="flex gap-1.5" id="band-quality-selector-tabs">
            {(["C1", "B2", "B1"] as const).map((b) => {
              const active = b === band;
              return (
                <button
                  key={b}
                  onClick={() => {
                    setBand(b);
                    setCustomAnswer(null); // Clear custom answer so user can regenerate if they want
                  }}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-150 border-2 cursor-pointer ${
                    active
                      ? "bg-[#D44D5C] border-[#D44D5C] text-white font-black"
                      : "bg-white border-black text-gray-950 hover:bg-black hover:text-white"
                  }`}
                  id={`band-tab-${b}`}
                >
                  {b === "C1" ? "C1 (8.5–10.0)" : b === "B2" ? "B2 (6.0–8.0)" : "B1 (4.0–5.5)"}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button Container */}
        <div className="flex flex-wrap gap-2 self-start sm:self-auto">
          {/* Highlight Toggle Button */}
          <button
            onClick={() => setHighlightOn(!highlightOn)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-black text-[11px] font-bold uppercase tracking-widest text-gray-950 bg-white hover:bg-black hover:text-white transition-colors cursor-pointer"
            id="btn-toggle-highlight"
          >
            {highlightOn ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{highlightOn ? "Tắt màu cấu trúc" : "Bật màu cấu trúc"}</span>
          </button>

          {/* Regenerate Button */}
          {!isRecommendedChoice && (customAnswer || genError) && (
            <button
              onClick={generateCustomAnswer}
              disabled={generating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#D44D5C] text-[11px] font-bold uppercase tracking-widest text-white bg-[#D44D5C] hover:bg-black hover:border-black transition-colors cursor-pointer disabled:opacity-50"
              id="btn-regenerate-ai"
            >
              <RefreshCw size={14} className={generating ? "animate-spin" : ""} />
              <span>{generating ? "Đang viết..." : "AI Lập luận lại"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Answer Area */}
      <div className="mb-4">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2.5 flex items-center justify-between">
          <span>Kịch bản nói mẫu ({band} Level Script) — chạm đoạn để xem giải thích</span>
          {!isRecommendedChoice && !customAnswer && (
            <span className="text-[#D44D5C] font-bold flex items-center gap-1 uppercase tracking-wider">
              <AlertTriangle size={10} /> Khung sườn nói mẫu phía dưới
            </span>
          )}
        </div>

        <div
          className="bg-[#FDFCFB] border-2 border-black p-5 text-gray-950 font-sans text-base leading-relaxed space-y-4 min-h-[220px]"
          id="model-answer-speech-text"
        >
          {generating ? (
            <div className="space-y-4 py-2" id="ai-generating-loader-shimmer">
              {steps.map((s) => (
                <div key={s.id} className="animate-pulse flex flex-col md:flex-row md:items-start gap-3 p-2 bg-white border-l-4 border-dashed rounded-none" style={{ borderColor: s.color }}>
                  <span
                    className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white flex-shrink-0 self-start mt-0.5"
                    style={{ backgroundColor: s.color }}
                  >
                    Step {s.num}
                  </span>
                  <div className="flex-1 space-y-2 py-0.5">
                    <div className="h-4 bg-gray-200/80 rounded w-full"></div>
                    <div className="h-4 bg-gray-200/50 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest pt-3 border-t border-black/5">
                <Sparkles size={14} className="animate-spin text-[#D44D5C]" />
                <span className="animate-pulse text-[#D44D5C]">Trí tuệ nhân tạo Gemini đang lập luận bài nói mẫu...</span>
              </div>
            </div>
          ) : (
            steps.map((s) => {
              const textSegment = activeAnswer[s.id];
              const bgHighlight = highlightOn ? `${s.color}25` : "transparent";
              const borderHighlight = highlightOn ? `4px solid ${s.color}` : "none";

              return (
                <p
                  key={s.id}
                  onClick={() => onSelectStep(s.id)}
                  className="hover:bg-black/5 transition-colors p-2 cursor-pointer flex flex-col md:flex-row md:items-start gap-2.5 group relative"
                  title={`Click to view details for Step ${s.num}`}
                  style={{
                    backgroundColor: bgHighlight,
                    borderLeft: borderHighlight
                  }}
                >
                  {/* Step Indicator Badge */}
                  <span
                    className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase flex-shrink-0 self-start mt-0.5 text-white"
                    style={{ backgroundColor: s.color }}
                  >
                    Step {s.num}
                  </span>
                  
                  {/* Segment Text */}
                  <span className="text-gray-950 flex-1 font-serif select-all font-medium animate-fade-in">
                    {textSegment}
                  </span>
                </p>
              );
            })
          )}
        </div>
      </div>

      {/* Information Banner for Custom Choices */}
      {!isRecommendedChoice && !generating && (
        <div className={`p-4 mb-5 border-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 ${customAnswer ? "bg-amber-50/40 border-dashed border-[#D44D5C]" : "bg-gray-50 border-dotted border-gray-400"}`}>
          <div className="flex items-start gap-2.5">
            <div className={`p-1.5 rounded-none mt-0.5 ${customAnswer ? "bg-amber-100 text-amber-800" : "bg-gray-200 text-gray-700"}`}>
              {customAnswer ? <Sparkles size={16} className="text-[#D44D5C]" /> : <Info size={16} />}
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                {customAnswer ? "Kịch bản AI Cá Nhân Hóa (Gemini Live-Crafted)" : "Khung sườn Gợi ý nói chuẩn SOCA"}
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed mt-0.5">
                {customAnswer ? (
                  <>
                    Kịch bản mẫu Band <strong>{band}</strong> tự động thiết kế riêng theo lựa chọn <strong>Option {selectedOptionId} ({selectedOptionName})</strong>.
                  </>
                ) : (
                  <>
                    Đang hiển thị hướng dẫn tự phát triển ý. Nếu muốn AI viết kịch bản chi tiết bằng tiếng Anh, vui lòng cấu hình <strong>GEMINI_API_KEY</strong> trong Settings.
                  </>
                )}
              </p>
            </div>
          </div>
          
          <button
            onClick={generateCustomAnswer}
            disabled={generating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-black hover:bg-[#D44D5C] text-white text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer disabled:opacity-50 flex-shrink-0"
            id="btn-banner-ai-action"
          >
            <RefreshCw size={12} className={generating ? "animate-spin" : ""} />
            <span>{customAnswer ? "Tạo lại bài mới" : "Thử tạo bằng AI"}</span>
          </button>
        </div>
      )}

      {/* Error Message */}
      {genError && (
        <div className="bg-white border-2 border-red-600 text-red-600 p-3.5 text-xs mb-5 flex items-start gap-2 animate-fade-in">
          <AlertTriangle size={15} className="mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold uppercase tracking-wider">Lỗi tạo bài:</span> {genError}
          </div>
        </div>
      )}

      {/* Legend Map */}
      {highlightOn && (
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5 border-t border-black/10 pt-3" id="soca-color-legends">
          {steps.map((s) => (
            <div key={s.id} className="flex items-center gap-1.5 text-xs text-gray-600 font-bold uppercase tracking-wider">
              <span
                className="w-3 h-3 inline-block"
                style={{ backgroundColor: s.color, border: `1.5px solid #1a1a1a` }}
              ></span>
              <span>
                <strong>{s.num}</strong> — {s.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Explanation Critique Box */}
      <div className="bg-[#FDFCFB] border-2 border-black p-5 mb-5" id="explanation-critique-box">
        <h4 className="text-[11px] font-bold text-[#D44D5C] uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-black/10 pb-2">
          <Trophy size={14} /> ĐÁNH GIÁ CHI TIẾT THEO CHUẨN VSTEP (GRADE EVALUATION BREAKDOWN)
        </h4>
        
        {/* Overall Assessment */}
        <div className="mb-4">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
            Nhận xét tổng quát (Overall Rating)
          </span>
          <p className="text-sm text-gray-950 leading-relaxed font-sans font-medium bg-white border border-black/10 p-3">
            {activeAnswer.note}
          </p>
        </div>

        {/* Detailed Rubric Analysis & Highlights */}
        {(() => {
          const rubric = getDetailedRubric(band, topic.id);
          return (
            <div className="space-y-4">
              {/* VSTEP Criteria Standard Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white p-3 border border-black/10">
                  <span className="block text-[10px] text-[#D44D5C] font-black uppercase tracking-wider mb-1">
                    🗣️ Fluency & Coherence
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed font-sans">
                    {rubric.fluency}
                  </p>
                </div>
                <div className="bg-white p-3 border border-black/10">
                  <span className="block text-[10px] text-gray-950 font-black uppercase tracking-wider mb-1">
                    📚 Lexical Resource
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed font-sans">
                    {rubric.lexical}
                  </p>
                </div>
                <div className="bg-white p-3 border border-black/10">
                  <span className="block text-[10px] text-gray-950 font-black uppercase tracking-wider mb-1">
                    ⚡ Grammatical Range
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed font-sans">
                    {rubric.grammar}
                  </p>
                </div>
                <div className="bg-white p-3 border border-black/10">
                  <span className="block text-[10px] text-[#D44D5C] font-black uppercase tracking-wider mb-1">
                    🎯 Pronunciation Guide
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed font-sans">
                    {rubric.pron}
                  </p>
                </div>
              </div>

              {/* Specific Text Highlights (Vocab, Grammar, Tactics) */}
              {rubric.vocabularyHighlights && (
                <div className="bg-white p-4 border border-black/10">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">
                    Từ vựng nâng cấp trong bài mẫu (Key Vocabulary Hits)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {rubric.vocabularyHighlights.map((v, idx) => (
                      <span key={idx} className="bg-black text-white px-2 py-1 text-[11px] font-mono font-bold">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {rubric.grammarHighlights && (
                <div className="bg-white p-4 border border-black/10">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">
                    Cấu trúc ngữ pháp nổi bật (Grammar & Sentence Highlights)
                  </span>
                  <ul className="list-disc pl-4 space-y-1">
                    {rubric.grammarHighlights.map((g, idx) => (
                      <li key={idx} className="text-xs text-gray-800 leading-relaxed font-sans font-medium">
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {rubric.tacticalAdvice && (
                <div className="bg-white p-3.5 border border-[#D44D5C]/30 border-l-[4px] border-l-[#D44D5C]">
                  <span className="text-[10px] font-bold text-[#D44D5C] uppercase tracking-widest block mb-1">
                    Mẹo nói đạt điểm cao (Tactical Speaking Advice)
                  </span>
                  <p className="text-xs text-gray-800 leading-relaxed font-sans italic">
                    "{rubric.tacticalAdvice}"
                  </p>
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* Indicative Scoring Grid */}
      <div id="indicative-scoring-grid">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1">
          <BarChart2 size={13} className="text-[#D44D5C]" />
          <span>Điểm số tham khảo theo tiêu chí (Indicative Criteria Scoring)</span>
        </div>
        <div className="bg-[#FDFCFB] border-2 border-black p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {scores.map((s, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-gray-700 text-[10px]">{s.label}</span>
                <span className="font-display font-black text-gray-950">{s.val.toFixed(1)}/10</span>
              </div>
              <div className="h-2 bg-gray-200 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${s.color}`}
                  style={{ width: `${(s.val / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
