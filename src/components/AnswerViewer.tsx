import { useState, useEffect } from "react";
import { Topic, BandAnswer, FrameworkStep } from "../types";
import { Sparkles, BarChart2, Eye, EyeOff, AlertTriangle, Trophy, Info } from "lucide-react";

interface RubricDetail {
  discourse: string;
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
      discourse: "Cấu trúc SOCA 4 bước cực kỳ mạch lạc, chặt chẽ. Chuyển ý chuyên nghiệp bằng trạng từ liên kết cao cấp.",
      lexical: "Vốn từ học thuật phong phú, đa dạng, kết hợp collocations chuẩn xác theo ngữ cảnh.",
      grammar: "Sử dụng linh hoạt các cấu trúc phức tạp (câu điều kiện trộn, đảo ngữ, mệnh đề phân từ rút gọn).",
      pron: "Một số từ nâng cấp có thể khó phát âm chuẩn: 'strategic' /strəˈtiː.dʒɪk/ (trọng âm âm tiết thứ 2), 'catalyst' /ˈkæt.əl.ɪst/ (nguyên âm đầu /æ/ bẹt), 'integrity' /ɪnˈteɡ.rə.ti/ (trọng âm âm tiết thứ 2)."
    },
    B2: {
      discourse: "Bố cục rõ ràng, phân định rành mạch các phần lập luận và bác bỏ bằng từ nối hiệu quả.",
      lexical: "Sử dụng từ vựng phong phú để diễn tả đa dạng khía cạnh chủ đề, có một số collocations tự nhiên.",
      grammar: "Phối hợp tốt câu đơn và câu phức ghép, hạn chế tối đa lỗi cấu trúc.",
      pron: "Phát âm nhìn chung rõ ràng, có ngữ điệu tự nhiên và biết nhấn đúng trọng âm của các từ quen thuộc."
    },
    B1: {
      discourse: "Lập luận cơ bản, dễ hiểu theo trình tự các bước gợi ý. Từ liên kết ở mức đơn giản.",
      lexical: "Sử dụng từ vựng quen thuộc liên quan tới chủ đề, đôi chỗ còn lặp từ nhưng vẫn đảm bảo diễn đạt đủ ý chính.",
      grammar: "Sử dụng câu đơn giản và câu ghép cơ bản. Có thể mắc một số lỗi ngữ pháp nhỏ không gây hiểu nhầm.",
      pron: "Phát âm các từ cơ bản rõ ràng. Cần chú ý phát âm đúng âm đuôi để tránh lỗi nuốt âm khi trình bày."
    }
  };

  // Custom highlights and specific pronunciation help based on topic
  if (topicId === 0) { // Attracting Tourists
    if (band === "C1") {
      return {
        ...common.C1,
        pron: "Trọng âm và cách phát âm của các từ vựng học thuật trong bài mẫu: **interventions** /ˌɪn.təˈven.ʃənz/ (trọng âm phụ ở /ˌɪn/, trọng âm chính ở âm tiết thứ ba /ˈven/), **lucrative** /ˈluː.krə.tɪv/ (nguyên âm /uː/ dài, trọng âm thứ nhất), **catalyst** /ˈkæt.əl.ɪst/ (nguyên âm đầu /æ/ bẹt, âm 'y' phát âm là /ɪ/), **inclement** /ɪnˈklem.ənt/ (trọng âm rơi vào âm tiết thứ hai).",
        vocabularyHighlights: ["strategic interventions (can thiệp chiến lược)", "lucrative catalyst (chất xúc tác sinh lợi)", "dwell time (thời gian lưu trú)", "inclement weather (thời tiết khắc nghiệt)"],
        grammarHighlights: ["Phép đảo ngữ: 'only entertainment centers possess...'", "Phép so sánh tương phản cấu trúc song song: 'while parks foster..., only entertainment centers...'"],
        tacticalAdvice: "Hãy chú ý làm nổi bật cụm từ 'puts the cart before the horse' khi chuẩn bị lập luận để tạo chiều sâu phản biện."
      };
    }
    if (band === "B2") {
      return {
        ...common.B2,
        pron: "Lưu ý phát âm các từ: **regardless** /rɪˈɡɑːd.ləs/ (trọng âm âm tiết thứ hai, tránh nuốt âm đuôi /s/), **engaged** /ɪnˈɡeɪdʒd/ (chú ý âm /ɡ/ và đuôi /dʒd/ dứt khoát), **weather** /ˈweð.ər/ (phát âm rõ phụ âm /ð/ hữu thanh), **landmarks** /ˈlænd.mɑːks/ (âm cuối /ks/ rõ ràng).",
        vocabularyHighlights: ["boost tourism (thúc đẩy du lịch)", "major landmarks (địa danh lớn)", "regardless of the weather (bất kể thời tiết)", "engaged for hours (hào hứng hàng giờ)"],
        grammarHighlights: ["Mệnh đề quan hệ xác định: 'leisure malls always keep visitors engaged...'", "Cấu trúc tương phản: 'While building holiday flats..., providing parks is...'"],
        tacticalAdvice: "Sử dụng các từ chuyển ý 'To begin with', 'On the other hand' một cách dứt khoát để làm rõ mạch lập luận của bạn."
      };
    }
    return {
      ...common.B1,
      pron: "Chú ý phát âm âm đuôi: **activities** /ækˈtɪv.ə.tiz/ (trọng âm âm tiết thứ hai, chú ý âm đuôi /z/), **crowded** /ˈkraʊ.dɪd/ (đuôi '-ed' đọc rõ thành /ɪd/), **fun** /fʌn/ (nguyên âm ngắn /ʌ/, tránh nhầm lẫn với /u/ hay 'un').",
      vocabularyHighlights: ["fun activities (hoạt động vui vẻ)", "exciting for young people (thú vị cho người trẻ)", "always crowded (luôn đông đúc)"],
      grammarHighlights: ["Câu đơn ngắn gọn, trực diện.", "Liên từ đơn giản: 'Firstly', 'Secondly', 'Also'."],
      tacticalAdvice: "Cố gắng ghi nhớ các trạng từ liên kết ý, phát âm rõ âm đuôi như 's' trong 'tourists', 'movies' và 'activities'."
    };
  }

  if (topicId === 1) { // Rewarding Students
    if (band === "C1") {
      return {
        ...common.C1,
        pron: "Trọng âm của các từ vựng cao cấp trong bài mẫu: **pedagogical** /ˌped.əˈɡɒdʒ.ɪ.kəl/ (trọng âm phụ ở /ˌped/, trọng âm chính ở âm tiết thứ ba /ˈɡɒdʒ/), **integrity** /ɪnˈteɡ.rə.ti/ (trọng âm âm tiết thứ hai), **intrinsic** /ɪnˈtrɪn.zɪk/ (trọng âm âm tiết thứ hai, chú ý âm đuôi /k/), **transactional** /trænˈzæk.ʃən.əl/ (nguyên âm bẹt /æ/ ở âm tiết thứ hai).",
        vocabularyHighlights: ["pedagogical flaws (thiót sót sư phạm)", "academic integrity (sự liêm chính học thuật)", "intrinsic motivation (động lực nội tại)", "transactional reward loop (vòng lặp phần thưởng giao dịch)"],
        grammarHighlights: ["Cấu trúc giả định / điều kiện phức tạp: 'if high marks are handed out easily, they...'", "Mệnh đề danh từ: 'When a teacher praises a student's specific effort rather than...'"],
        tacticalAdvice: "Sử dụng lối hành văn mạch lạc, chặt chẽ. Ngắt câu rõ ràng sau các liên từ bổ trợ như 'Conversely', 'Meanwhile'."
      };
    }
    if (band === "B2") {
      return {
        ...common.B2,
        pron: "Lưu ý phát âm đúng các từ: **valued** /ˈvæl.juːd/ (âm /uː/ dài, có âm đuôi /d/), **compliments** /ˈkɒm.plɪ.mənts/ (trọng âm âm tiết đầu, đuôi /ts/ phát âm dứt khoát), **metrics** /ˈmet.rɪks/ (âm đuôi /ks/ rõ ràng), **confidence** /ˈkɒn.fɪ.dəns/ (âm tiết đầu là nguyên âm ngắn /ɒ/, kết thúc bằng /s/).",
        vocabularyHighlights: ["build confidence (xây dựng sự tự tin)", "feel valued and respected (cảm thấy được trân trọng)", "free of charge (miễn phí)", "academic metrics (thước đo học thuật)"],
        grammarHighlights: ["Cấu trúc tương quan: 'once they know they will get an A anyway...'", "Câu phức với 'because': 'compliments are very powerful because they build...'"],
        tacticalAdvice: "Tập trung làm nổi bật các từ chỉ cảm xúc tích cực như 'valued', 'respected', 'confidence' để bài lập luận sinh động hơn."
      };
    }
    return {
      ...common.B1,
      pron: "Chú ý phát âm các từ cơ bản: **harder** /ˈhɑː.dər/ (nguyên âm /ɑː/ kéo dài), **compliment** /ˈkɒm.plɪ.mənt/ (chú ý trọng âm thứ nhất, đuôi /nt/ dứt khoát), **happy** /ˈhæp.i/ (nguyên âm bẹt /æ/ mở rộng miệng, không đọc thành 'he-pi').",
      vocabularyHighlights: ["study harder (học chăm hơn)", "very happy (rất vui)", "too expensive (quá đắt)"],
      grammarHighlights: ["Cấu trúc cơ bản 'When...': 'When a teacher says..., the student feels...'", "Cấu trúc nguyên nhân - kết quả cơ bản: 'If the school has no money, they...'"],
      tacticalAdvice: "Diễn đạt rõ ràng, rành mạch. Đảm bảo chú ý phát âm đúng âm 't' trong 'compliment' và 's' trong 'students'."
    };
  }

  if (topicId === 2) { // Keeping Fit
    if (band === "C1") {
      return {
        ...common.C1,
        pron: "Trọng âm của các từ vựng học thuật trong bài: **sedentary** /ˈsed.ən.tər.i/ (trọng âm rơi vào âm tiết đầu tiên /ˈsed/), **modification** /ˌmɒd.ɪ.fɪˈkeɪ.ʃən/ (trọng âm chính rơi vào âm tiết /ˈkeɪ/), **indispensable** /ˌɪn.dɪˈspen.sə.bəl/ (trọng âm rơi vào âm tiết /ˈspen/), **sunk** /sʌŋk/ (chú ý âm mũi /ŋ/ và phụ âm cuối /k/).",
        vocabularyHighlights: ["sedentary lifestyle (lối sống ít vận động)", "dietary modification (điều chỉnh chế độ ăn)", "indispensable foundation (nền tảng không thể thiếu)", "unusable sunk costs (chi phí chìm không dùng đến)"],
        grammarHighlights: ["Cấu trúc phân từ hoàn thành: 'For an office worker bound to a desk...'", "Mệnh đề nhượng bộ phức hợp: 'While physical exertion is vital, I would contend that...'"],
        tacticalAdvice: "Thể hiện tư duy phản biện cao bằng cách nhấn trọng âm chính xác ở các từ 'indispensable' và 'counteract' khi phát âm nhẩm."
      };
    }
    if (band === "B2") {
      return {
        ...common.B2,
        pron: "Chú ý phát âm các từ: **productively** /prəˈdʌk.tɪv.li/ (trọng âm rơi vào âm tiết thứ hai /ˈdʌk/), **exhausting** /ɪɡˈzɔː.stɪŋ/ (âm 'h' câm, âm đầu phát âm là /ɪɡ/, âm sau có nguyên âm /ɔː/), **starting** /ˈstɑː.tɪŋ/ (nguyên âm /ɑː/ kéo dài), **nutrition** /njuːˈtrɪʃ.ən/ (trọng âm rơi vào âm tiết thứ hai /ˈtrɪʃ/).",
        vocabularyHighlights: ["stay healthy (giữ sức khỏe)", "work productively (làm việc hiệu quả)", "exhausting workday (ngày làm việc mệt mỏi)", "logical starting point (điểm khởi đầu hợp lý)"],
        grammarHighlights: ["Phép so sánh: 'nutrition plays the most important role...'", "Cấu trúc tương phản: 'In contrast, the other choices are...'"],
        tacticalAdvice: "Xây dựng các câu lập luận thực tế, có thể liên hệ câu chuyện trải nghiệm cá nhân của dân văn phòng để tăng tính thuyết phục."
      };
    }
    return {
      ...common.B1,
      pron: "Cách phát âm âm đuôi gió khó: **healthy** /ˈhel.θi/ (thổi hơi nhẹ ở âm răng-môi /θ/), **health** /helθ/ (âm cuối /θ/ thổi hơi dứt khoát không có /i/), **costs** /kɒsts/ (bật đủ tổ hợp phụ âm đuôi /sts/ ở cuối từ).",
      vocabularyHighlights: ["good health (sức khỏe tốt)", "eat healthy (ăn uống lành mạnh)", "costs a lot of money (tốn nhiều tiền)"],
      grammarHighlights: ["Cấu trúc điều kiện đơn giản: 'If we eat good food..., we will have...'", "Câu đơn giản: 'We can do this every day...'"],
      tacticalAdvice: "Chú ý phát âm chuẩn xác âm đuôi 'th' trong 'health' và 'healthy' để tránh mắc lỗi ngữ âm."
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
      note: "Hướng dẫn xây dựng kịch bản: Hãy dựa vào khung sườn cấu trúc SOCA ở trên để tự luyện tập và phát triển mạch ý tưởng nhé!"
    };
  };

  const activeAnswer = getDisplayAnswer();

  // Reset custom answers and errors when topic, option, or band changes
  useEffect(() => {
    setCustomAnswer(null);
    setGenError(null);
  }, [topic, selectedOptionId, band]);

  // Indicative scores based on band
  const getIndicativeScores = () => {
    if (band === "C1") {
      return [
        { label: "Discourse & Organization", val: 9.0, color: "bg-[#D44D5C]" },
        { label: "Lexical Resource", val: 9.0, color: "bg-[#D44D5C]" },
        { label: "Grammatical Range", val: 8.5, color: "bg-[#D44D5C]" }
      ];
    }
    if (band === "B2") {
      return [
        { label: "Discourse & Organization", val: 7.5, color: "bg-[#D44D5C]" },
        { label: "Lexical Resource", val: 7.0, color: "bg-[#D44D5C]" },
        { label: "Grammatical Range", val: 7.0, color: "bg-[#D44D5C]" }
      ];
    }
    return [
      { label: "Discourse & Organization", val: 5.0, color: "bg-[#D44D5C]" },
      { label: "Lexical Resource", val: 5.0, color: "bg-[#D44D5C]" },
      { label: "Grammatical Range", val: 5.0, color: "bg-[#D44D5C]" }
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
        </div>
      </div>

      {/* Answer Area */}
      <div className="mb-4">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2.5 flex items-center justify-between">
          <span>Kịch bản mẫu ({band} Level Script) — chạm đoạn để xem giải thích</span>
          {!isRecommendedChoice && (
            <span className="text-[#D44D5C] font-bold flex items-center gap-1 uppercase tracking-wider">
              <AlertTriangle size={10} /> Khung sườn gợi ý phía dưới
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
                <span className="animate-pulse text-[#D44D5C]">Trí tuệ nhân tạo Gemini đang lập luận kịch bản mẫu...</span>
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
      {!isRecommendedChoice && (
        <div className="p-4 mb-5 border-2 border-black border-dotted flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 border-gray-400">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-none mt-0.5 bg-gray-200 text-gray-700">
              <Info size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Khung sườn Gợi ý lập luận SOCA
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed mt-0.5">
                Bạn đang chọn phương án khác với lựa chọn gợi ý mặc định. Hãy dựa vào khung sườn cấu trúc SOCA chi tiết ở trên để tự luyện tập và xây dựng kịch bản một cách tốt nhất nhé!
              </p>
            </div>
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
                    🧩 Discourse & Organization (Mạch lạc & Bố cục)
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed font-sans">
                    {rubric.discourse}
                  </p>
                </div>
                <div className="bg-white p-3 border border-black/10">
                  <span className="block text-[10px] text-gray-950 font-black uppercase tracking-wider mb-1">
                    📚 Lexical Resource (Vốn từ vựng)
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed font-sans">
                    {rubric.lexical}
                  </p>
                </div>
                <div className="bg-white p-3 border border-black/10">
                  <span className="block text-[10px] text-gray-950 font-black uppercase tracking-wider mb-1">
                    ⚡ Grammatical Range (Ngữ pháp & Cấu trúc)
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed font-sans">
                    {rubric.grammar}
                  </p>
                </div>
                <div className="bg-white p-3 border border-[#D44D5C]/30 bg-[#FDFCFB]">
                  <span className="block text-[10px] text-[#D44D5C] font-black uppercase tracking-wider mb-1">
                    🎯 Tricky Pronunciation (Từ vựng dễ phát âm sai)
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
                    Mẹo lập luận đạt điểm cao (Tactical Argumentation Advice)
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
