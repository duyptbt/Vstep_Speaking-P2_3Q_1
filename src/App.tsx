import { useState } from "react";
import Header from "./components/Header";
import TaskRequirements from "./components/TaskRequirements";
import TopicSelector from "./components/TopicSelector";
import TopicCard from "./components/TopicCard";
import SocaFramework from "./components/SocaFramework";
import AnswerViewer from "./components/AnswerViewer";
import { TOPICS, FRAMEWORK_STEPS } from "./data";
import { BookOpen, ThumbsUp, HelpCircle, FileText, Settings, Award } from "lucide-react";

export default function App() {
  const [activeTopicId, setActiveTopicId] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<"A" | "B" | "C">("C");
  const [activeStepId, setActiveStepId] = useState<"s" | "o" | "c" | "a">("s");
  const [band, setBand] = useState<"C1" | "B2" | "B1">("B2");

  const activeTopic = TOPICS.find((t) => t.id === activeTopicId) || TOPICS[0];

  // Helper when changing topic: reset state cleanly
  const handleTopicSelect = (id: number) => {
    setActiveTopicId(id);
    const nextTopic = TOPICS.find((t) => t.id === id) || TOPICS[0];
    setSelectedOptionId(nextTopic.recommendedChoice);
    setActiveStepId("s");
  };

  const handleOptionSelect = (optionId: "A" | "B" | "C") => {
    setSelectedOptionId(optionId);
    setActiveStepId("s");
  };

  const activeOption = activeTopic.options.find((o) => o.id === selectedOptionId) || activeTopic.options[0];
  const otherOptions = activeTopic.options.filter((o) => o.id !== selectedOptionId);

  const activeAnswer = activeTopic.bandAnswers.B2; // Fallback for reference if needed

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2d2a25] font-sans antialiased">
      {/* Outer Shell Wrapper with fluid, centered desktop constraint */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 md:py-10">
        
        {/* HEADER COMPONENT */}
        <Header />

        {/* GUIDELINES & REQUIREMENTS TIMED COMPONENT */}
        <TaskRequirements />

        {/* MAIN BODY GRID - Elegant double-column on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Topic selector, topic situation, option matrix, mindmaps */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* TOPIC SELECTOR */}
            <TopicSelector
              topics={TOPICS}
              activeId={activeTopicId}
              onSelect={handleTopicSelect}
            />

            {/* TOPIC CARD WITH INTERACTIVE SVG & MATRIX */}
            <TopicCard
              topic={activeTopic}
              selectedOptionId={selectedOptionId}
              onOptionSelect={handleOptionSelect}
              band={band}
            />

            {/* VSTEP SPEAKING STUDY STRATEGIES CARD */}
            <div className="bg-white border-2 border-black p-5" id="study-strategies-card">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-3.5">
                Chiến lược đạt B2-C1 Part 2 (Exam Strategies)
              </span>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-black text-white flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                    1
                  </div>
                  <div className="text-xs leading-relaxed">
                    <strong className="text-gray-950 block font-display font-black mb-0.5 uppercase tracking-wider text-[10px]">
                      Hành văn tự nhiên, tránh rập khuôn (Express naturally, avoid clichés)
                    </strong>
                    <span className="text-gray-600">
                      Hãy dùng các cụm từ đệm liên kết tự nhiên như <em className="font-serif">"Honestly...", "In my opinion...", "Well, to tell you the truth..."</em>. Điều này giúp kịch bản lập luận của bạn mềm mại, sinh động và thuyết phục hơn là học thuộc lòng theo khuôn mẫu.
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-black text-white flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                    2
                  </div>
                  <div className="text-xs leading-relaxed">
                    <strong className="text-gray-950 block font-display font-black mb-0.5 uppercase tracking-wider text-[10px]">
                      Dẫn chứng thực tế cá nhân (Use personalized examples)
                    </strong>
                    <span className="text-gray-600">
                      Đưa các câu chuyện ngắn của chính bạn: <em className="font-serif">"From my experience...", "In my neighborhood..."</em>. Việc này giúp lập luận chân thực, sinh động và không lo bị bí ý tưởng giữa chừng.
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-black text-white flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                    3
                  </div>
                  <div className="text-xs leading-relaxed">
                    <strong className="text-gray-950 block font-display font-black mb-0.5 uppercase tracking-wider text-[10px]">
                      Câu ngắn liên kết chặt chẽ (Keep it simple and well-linked)
                    </strong>
                    <span className="text-gray-600">
                      Bạn không cần viết những câu ghép quá dài dễ bị rối cấu trúc và sai ngữ pháp. Hãy dùng các câu ngắn gọn nhưng liên kết chắc chắn bằng <em className="font-serif">"Because...", "And...", "But...", "However..."</em>.
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-black text-white flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                    4
                  </div>
                  <div className="text-xs leading-relaxed">
                    <strong className="text-gray-950 block font-display font-black mb-0.5 uppercase tracking-wider text-[10px]">
                      Luôn bác bỏ 2 phương án còn lại (Rule out the alternatives)
                    </strong>
                    <span className="text-gray-600">
                      Đây là yêu cầu bắt buộc của lập luận Part 2. Bài chuẩn bị của bạn sẽ bị đánh giá thấp nếu chỉ tập trung nêu ưu điểm của lựa chọn chính mà bỏ quên việc giải thích vì sao 2 lựa chọn kia không tối ưu.
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: SOCA framework, model answers & AI evaluation workspace */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* SOCA FRAMEWORK STEP SELECTION */}
            <SocaFramework
              steps={FRAMEWORK_STEPS}
              activeStepId={activeStepId}
              onSelectStep={setActiveStepId}
              activeAnswer={activeTopic.bandAnswers.B2}
            />

            {/* ANSWER COMPARATOR AND AI ANSWER GENERATOR */}
            <AnswerViewer
              topic={activeTopic}
              selectedOptionId={selectedOptionId}
              selectedOptionName={activeOption.name}
              otherOptionsNames={otherOptions.map((o) => o.name)}
              onSelectStep={setActiveStepId}
              steps={FRAMEWORK_STEPS}
              band={band}
              setBand={setBand}
            />

          </div>

        </div>

        {/* FOOTER */}
        <footer className="mt-16 pt-6 border-t border-black/10 text-center text-[10px] text-gray-500 font-mono uppercase tracking-wider" id="app-footer">
          <p className="flex items-center justify-center gap-1.5 flex-wrap">
            <span>VSTEP Speaking Part 2 Training Tool</span>
            <span>·</span>
            <span>Powered by Gemini 2.5 Flash</span>
            <span>·</span>
            <span>Designed for B1, B2 & C1 Excellence</span>
          </p>
        </footer>

      </div>
    </div>
  );
}
