import { HelpCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="mb-8" id="vstep-header">
      {/* Editorial Header Block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-[3px] border-black pb-4 mb-6">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-60 mb-1">
            VSTEP Speaking Protocol
          </p>
          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tighter leading-none uppercase text-gray-950">
            Part 2: Solution Discussion
          </h1>
        </div>
        <div className="text-left sm:text-right mt-3 sm:mt-0 flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-60">
            Allocated Exam Time
          </p>
          <p className="text-3xl sm:text-5xl font-display font-black tabular-nums leading-none text-[#D44D5C]">
            04:00
          </p>
        </div>
      </div>
      
      {/* Sub-description paragraph */}
      <p className="text-gray-700 font-sans text-base leading-relaxed max-w-4xl">
        Master the 4-minute decision-making speaking task. Use the proven{" "}
        <strong className="text-gray-950 underline decoration-[#D44D5C] decoration-2 underline-offset-2 font-bold">
          S-O-C-A framework
        </strong>{" "}
        to introduce the situation, justify your choice, reject alternative options, and deliver a polished response.
      </p>
    </header>
  );
}
