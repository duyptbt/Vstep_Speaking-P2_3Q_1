export interface OptionDetails {
  id: "A" | "B" | "C";
  name: string;
  pros: string[];
  cons: string[];
}

export interface BandAnswer {
  s: string; // Situation & Choice
  o: string; // Own Option Advantages
  c: string; // Comparison & Rejection
  a: string; // Conclusion
  note: string; // Vietnamese critique/explanation of the band
  strengths?: string[];
  improvements?: string[];
}

export interface Topic {
  id: number;
  label: string;
  situation: string;
  options: OptionDetails[];
  recommendedChoice: "A" | "B" | "C";
  recommendedExplanation: string;
  followup?: string[];
  bandAnswers: {
    C1: BandAnswer;
    B2: BandAnswer;
    B1: BandAnswer;
  };
}

export interface FrameworkStep {
  id: "s" | "o" | "c" | "a";
  num: string;
  name: string;
  tag: string;
  purpose: string;
  phrases: string[];
  color: string;
  textColor: string;
}

export interface EvaluationResult {
  score: string; // e.g. "B2 (6.5)"
  band: "B1" | "B2" | "C1";
  overallFeedback: string;
  critique: {
    fluency: string;
    vocabulary: string;
    grammar: string;
    coherence: string;
  };
  frameworkAnalysis: {
    s: string; // Feedback on Situation/Choice
    o: string; // Feedback on Option Advantages
    c: string; // Feedback on Comparison/Rejection
    a: string; // Feedback on Conclusion
  };
  revisedVersion: {
    s: string;
    o: string;
    c: string;
    a: string;
  };
}
