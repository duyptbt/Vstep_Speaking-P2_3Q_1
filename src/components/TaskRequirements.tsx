import { useState, useEffect, useRef } from "react";
import { Clock, Play, Pause, RotateCcw, AlertCircle, Info } from "lucide-react";

export default function TaskRequirements() {
  const [timeState, setTimeState] = useState<"idle" | "prep" | "speaking" | "finished">("idle");
  const [seconds, setSeconds] = useState(60); // Default: 60s prep
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeState === "prep" || timeState === "speaking") {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            if (timeState === "prep") {
              // Automatically transition to speaking
              setTimeState("speaking");
              return 180; // 3 minutes (180s) speaking time
            } else {
              setTimeState("finished");
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeState]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  };

  const startPrep = () => {
    setTimeState("prep");
    setSeconds(60);
  };

  const startSpeaking = () => {
    setTimeState("speaking");
    setSeconds(180);
  };

  const pauseTimer = () => {
    if (timeState === "prep" || timeState === "speaking") {
      const savedState = timeState;
      setTimeState("idle");
    }
  };

  const resetTimer = () => {
    setTimeState("idle");
    setSeconds(60);
  };

  return (
    <div className="bg-white border-2 border-black p-5 mb-6" id="requirements-panel">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gray-950 uppercase tracking-widest mb-3">
            <Info size={14} className="text-[#D44D5C]" />
            <span>Task Guidelines & Requirements</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#FDFCFB] p-3 border border-black/10">
              <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total Duration</span>
              <span className="text-sm font-bold text-gray-950">4.0 Minutes</span>
            </div>
            <div className="bg-[#FDFCFB] p-3 border border-black/10">
              <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">⏳ Preparation</span>
              <span className="text-sm font-bold text-gray-950">1.0 Min (60s)</span>
            </div>
            <div className="bg-[#FDFCFB] p-3 border border-black/10">
              <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">💬 Speaking Time</span>
              <span className="text-sm font-bold text-gray-950">3.0 Mins (180s)</span>
            </div>
          </div>
        </div>

        {/* PRACTICE TIMER UNIT */}
        <div className="bg-white border-2 border-black p-4 flex items-center gap-4 md:w-80 w-full justify-between" id="practice-timer">
          <div className="flex items-center gap-3">
            <div className={`p-2 ${timeState === "prep" ? "bg-[#D44D5C]/10 text-[#D44D5C]" : timeState === "speaking" ? "bg-black text-white" : "bg-gray-100 text-gray-500"}`}>
              <Clock size={20} />
            </div>
            <div>
              <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                {timeState === "prep" ? "Preparation" : timeState === "speaking" ? "Speaking" : timeState === "finished" ? "Done" : "Practice Timer"}
              </span>
              <span className="text-2xl font-display font-black tracking-tight text-gray-950">
                {formatTime(seconds)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {timeState === "idle" && (
              <button
                onClick={startPrep}
                className="p-2 border border-black hover:bg-black hover:text-white transition-colors"
                title="Start 60s Prep"
                id="btn-start-prep"
              >
                <Play size={16} />
              </button>
            )}
            {(timeState === "prep" || timeState === "speaking") && (
              <button
                onClick={pauseTimer}
                className="p-2 border border-black hover:bg-[#D44D5C] hover:text-white transition-colors"
                title="Pause"
                id="btn-pause-timer"
              >
                <Pause size={16} />
              </button>
            )}
            {timeState === "idle" && seconds !== 60 && (
              <button
                onClick={() => setTimeState("prep")}
                className="p-2 border border-black hover:bg-black hover:text-white transition-colors"
                title="Resume"
                id="btn-resume-timer"
              >
                <Play size={16} />
              </button>
            )}
            <button
              onClick={resetTimer}
              className="p-2 border border-black hover:bg-red-600 hover:text-white transition-colors text-red-600"
              title="Reset Timer"
              id="btn-reset-timer"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {timeState === "prep" && (
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-950 bg-amber-50 p-2.5 border border-amber-300">
          <AlertCircle size={14} className="flex-shrink-0 text-[#D44D5C]" />
          <span>Giai đoạn chuẩn bị: Đọc kỹ tình huống, xem bản đồ so sánh bên dưới để phác thảo nhanh ý tưởng nói.</span>
        </div>
      )}
      {timeState === "speaking" && (
        <div className="mt-3 flex items-center gap-2 text-xs text-white bg-black p-2.5 border border-black">
          <AlertCircle size={14} className="flex-shrink-0 text-[#D44D5C]" />
          <span>Giai đoạn nói: Trình bày bài thi dựa trên khung S-O-C-A. Tránh ngập ngừng lâu, giữ tốc độ đều đặn.</span>
        </div>
      )}
      {timeState === "finished" && (
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-950 bg-[#D44D5C]/10 p-2.5 border border-[#D44D5C]">
          <AlertCircle size={14} className="flex-shrink-0 text-[#D44D5C]" />
          <span>Hết giờ nói! Hãy tham khảo câu trả lời mẫu hoặc viết bài nháp vào ô kiểm tra bên dưới để AI đánh giá nhé.</span>
        </div>
      )}
    </div>
  );
}
