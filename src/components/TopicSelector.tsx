import { Topic } from "../types";

interface TopicSelectorProps {
  topics: Topic[];
  activeId: number;
  onSelect: (id: number) => void;
}

export default function TopicSelector({ topics, activeId, onSelect }: TopicSelectorProps) {
  return (
    <div className="mb-6" id="topic-selector-container">
      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">
        Chọn chủ đề luyện tập (Select Practice Topic)
      </div>
      <div className="flex flex-wrap gap-2" id="topic-selector-pills">
        {topics.map((t) => {
          const isActive = t.id === activeId;
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-150 border-2 cursor-pointer ${
                isActive
                  ? "bg-[#D44D5C] border-[#D44D5C] text-white shadow-none"
                  : "bg-white border-black text-gray-950 hover:bg-black hover:text-white"
              }`}
              id={`topic-pill-${t.id}`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
