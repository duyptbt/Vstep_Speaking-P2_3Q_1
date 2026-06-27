import { useState } from "react";
import { Topic, OptionDetails } from "../types";
import { ThumbsUp, ThumbsDown, Star, Sparkles, CheckCircle, Info } from "lucide-react";

const LEVEL_PROS_CONS: Record<
  number,
  Record<
    "A" | "B" | "C",
    Record<
      "B1" | "B2" | "C1",
      { pros: string[]; cons: string[] }
    >
  >
> = {
  0: { // Attracting Tourists
    A: {
      C1: {
        pros: [
          "Provides upscale, self-catering accommodation suitable for affluent overnight visitors",
          "Yields continuous, high-margin rental revenue streams for local property owners",
          "Substantially lengthens average tourist dwell time and overall stay duration"
        ],
        cons: [
          "Fails to cultivate an intrinsic reason or landmark draw to visit the city initially",
          "Highly prone to severe vacancy rates during off-peak seasonal low periods",
          "Disrupts local residential real estate markets and inflates rental costs for locals"
        ]
      },
      B2: {
        pros: [
          "Provides comfortable accommodation for overnight visitors",
          "Can generate good rental income for local property owners",
          "Supports longer stays in the city"
        ],
        cons: [
          "Does not create an attractive reason to visit in the first place",
          "Often remains completely empty during low seasons",
          "Can disrupt local residential housing markets"
        ]
      },
      B1: {
        pros: [
          "Gives tourists nice and clean rooms to sleep at night",
          "Helps local homeowners earn more money from rent easily",
          "Encourages visitors to stay in the city for more days"
        ],
        cons: [
          "Does not make tourists want to travel to the city first",
          "Will be empty and have no guests when holidays end",
          "Makes rent more expensive for local people living there"
        ]
      }
    },
    B: {
      C1: {
        pros: [
          "Enriches municipal green infrastructure and elevates the city's aesthetic appeal",
          "Offers zero-cost, equitable access to both tourists and local urbanites",
          "Catalyzes sustainable, low-impact eco-tourism initiatives"
        ],
        cons: [
          "Seldom functions as a primary destination magnet for long-distance travelers",
          "Extremely susceptible to inclement weather patterns and seasonal volatility",
          "Does not directly generate substantial, high-yield municipal tourism revenues"
        ]
      },
      B2: {
        pros: [
          "Enhances the green space and beauty of the city",
          "Free or low-cost to access for both tourists and locals",
          "Promotes eco-friendly and sustainable tourism"
        ],
        cons: [
          "Rarely acts as a primary magnet for long-distance tourists",
          "Highly dependent on pleasant, clear weather",
          "Does not directly generate substantial tourism revenue"
        ]
      },
      B1: {
        pros: [
          "Makes the city look very green, beautiful, and clean",
          "Is totally free and open for everyone to relax",
          "Is good for the environment and nature"
        ],
        cons: [
          "No tourist travels to a new city just to walk in a simple park",
          "Cannot be used on rainy or very cold days",
          "Does not bring any direct money or taxes to the city"
        ]
      }
    },
    C: {
      C1: {
        pros: [
          "Acts as a primary, high-impact landmark destination that draws large crowds",
          "Offers diverse, weather-proof activities (cinemas, shopping, dining) under one roof",
          "Directly generates high tourist spending and municipal tax revenue"
        ],
        cons: [
          "Requires immense initial capital investment and ongoing operating costs",
          "Can cause severe noise pollution and traffic congestion in the surrounding area",
          "Requires continuous maintenance and updates to stay appealing to new audiences"
        ]
      },
      B2: {
        pros: [
          "Acts as a major landmark that draws big crowds of people",
          "Offers diverse, all-weather activities like movies, shopping, and food courts",
          "Generates significant tourist spending and municipal revenue"
        ],
        cons: [
          "Requires high initial investment and maintenance fees",
          "Can cause noise and traffic congestion in surrounding streets",
          "Requires constant updates to remain attractive to visitors"
        ]
      },
      B1: {
        pros: [
          "Has many fun games, shops, and food courts for everyone",
          "People can visit and play even on rainy or hot days",
          "Brings a lot of money when tourists spend here"
        ],
        cons: [
          "Needs a huge amount of money to build and run",
          "Makes the neighborhood crowded, loud, and full of traffic",
          "Must be repaired and changed often to keep people happy"
        ]
      }
    }
  },
  1: { // Rewarding Students
    A: {
      C1: {
        pros: [
          "Triggers a temporary surge in student self-esteem and immediate academic satisfaction",
          "Minimizes friction between educators, students, and anxious parents regarding performance",
          "Can superficially polish school transcripts for competitive university admission procedures"
        ],
        cons: [
          "Severely dilutes academic integrity and degrades the objective signaling value of grades",
          "Nurtures a sense of complacency, diminishing actual learning efforts over time",
          "Creates unrealistic performance expectations for higher education challenges"
        ]
      },
      B2: {
        pros: [
          "Boosts student confidence and makes them feel happy quickly",
          "Reduces arguments between teachers, students, and parents about bad scores",
          "Makes student profiles look better for college applications"
        ],
        cons: [
          "Lowers academic standards and makes grades lose their real meaning",
          "Makes students lazy because they get high marks too easily",
          "Prepares students poorly for the high demands of universities"
        ]
      },
      B1: {
        pros: [
          "Makes students feel very happy and proud of their high marks",
          "Stops parents from worrying or complaining to the teachers",
          "Helps students get into colleges with beautiful report cards"
        ],
        cons: [
          "Is not honest because bad work still gets high marks",
          "Makes students stop studying hard since they get A's anyway",
          "Makes them shocked when they face difficult tests in real life"
        ]
      }
    },
    B: {
      C1: {
        pros: [
          "Serves as an immediate, highly tangible incentive to achieve short-term milestones",
          "Provides clear, unambiguous performance targets that students can actively strive for",
          "Creates exciting, high-energy school environments during reward cycles"
        ],
        cons: [
          "Establishes a purely transactional, extrinsic reward loop that damages learning for its own sake",
          "Imposes an unsustainable, recurring financial burden on public educational institutions",
          "Can cultivate feelings of jealousy or inadequacy among struggling peers"
        ]
      },
      B2: {
        pros: [
          "Provides strong motivation for students to reach goals fast",
          "Sets very clear targets that everyone can understand and see",
          "Makes studying feel fun and like an exciting game"
        ],
        cons: [
          "Makes students transactional, studying only for the physical prize",
          "Is too expensive for schools to buy gifts continuously",
          "Can make other students feel bad if they do not win anything"
        ]
      },
      B1: {
        pros: [
          "Gives students nice gifts like books or pens to study harder",
          "Shows a clear prize so students know exactly what to do",
          "Makes kids excited about going to school to win prizes"
        ],
        cons: [
          "Makes students study only for the gift, not to learn",
          "Costs a lot of money and the school cannot afford it for long",
          "Makes students who do not get gifts feel sad and jealous"
        ]
      }
    },
    C: {
      C1: {
        pros: [
          "Fosters deep, intrinsic motivation and cultivates a healthy growth mindset",
          "Is an infinite, zero-cost pedagogical resource that can be distributed equitably",
          "Nurtures a supportive, low-stress, and collaborative classroom dynamic"
        ],
        cons: [
          "Requires genuine, highly individualized attention from teachers to remain effective",
          "Can be perceived as insincere if distributed too loosely or without specific context",
          "May not satisfy students who are highly driven by tangible tokens"
        ]
      },
      B2: {
        pros: [
          "Builds student confidence and self-worth in a healthy way",
          "Is completely free of charge and can be used by teachers daily",
          "Creates a friendly and encouraging environment in the classroom"
        ],
        cons: [
          "Requires teachers to pay close attention to each student's progress",
          "Can feel fake if the teacher praises everything too easily",
          "Might not work well for students who only want grades or prizes"
        ]
      },
      B1: {
        pros: [
          "Helps students feel valued and loved by their teachers",
          "Does not cost any money so teachers can say 'well done' every day",
          "Makes the classroom a happy, safe, and friendly place"
        ],
        cons: [
          "The teacher has to spend time to check and praise each student",
          "If praised too much for simple things, students will ignore it",
          "Some kids want a physical gift or high mark more than just nice words"
        ]
      }
    }
  },
  2: { // Keeping Fit
    A: {
      C1: {
        pros: [
          "Provides highly controlled, specialized equipment for target muscle development",
          "Offers flexible, 24/7 access regardless of external weather hazards",
          "Accommodates individualized fitness pacing and highly customized training programs"
        ],
        cons: [
          "Prone to low retention rates as the friction of traveling to facilities leads to unused sunk costs",
          "Lacks inherent social accountability or team-oriented enjoyment",
          "Can feel monotonous, repetitive, and isolating over extended periods"
        ]
      },
      B2: {
        pros: [
          "Provides specialized equipment for precise body fitness",
          "Allows people to exercise anytime, unaffected by rain or heat",
          "Allows custom training schedules and private workout plans"
        ],
        cons: [
          "Memberships are often wasted because people get too lazy to go after work",
          "Lacks the fun of team sports and friendly social interaction",
          "Can feel boring, repetitive, and lonely after a few weeks"
        ]
      },
      B1: {
        pros: [
          "Has many modern machines and heavy weights to build muscles",
          "Is inside a building, so rain or bad weather does not matter",
          "You can go whenever you have free time on your own"
        ],
        cons: [
          "Costs a lot of money and people often stop going after a short time",
          "You have to do exercises alone and do not have teammates",
          "Repeating the same movements every day is very boring"
        ]
      }
    },
    B: {
      C1: {
        pros: [
          "Blends vigorous physical exercise with organic social camaraderie and teamwork",
          "Provides rejuvenating exposure to fresh air, natural sunlight, and green spaces",
          "Develops strategic thinking, motor coordination, and competitive drive"
        ],
        cons: [
          "Highly vulnerable to unpredictable weather patterns and seasonal disruptions",
          "Carries a non-trivial risk of acute physical injuries and joint strain",
          "Presents logistically challenging scheduling conflicts for busy professionals"
        ]
      },
      B2: {
        pros: [
          "Combines good physical workout with making friends and teamwork",
          "Allows you to enjoy fresh air, sunshine, and beautiful outdoor nature",
          "Improves your fast reactions and strategic game thinking"
        ],
        cons: [
          "Cannot be played easily on rainy, freezing, or excessively hot days",
          "Has a high risk of injuries like ankle sprains or muscle tears",
          "Is hard to schedule and coordinate with multiple friends or teammates"
        ]
      },
      B1: {
        pros: [
          "Is very fun because you can play games like football with friends",
          "Helps you get fresh air and sunshine instead of staying inside",
          "Makes you move a lot and run around, which is very healthy"
        ],
        cons: [
          "You cannot play if it rains or if it is too cold outside",
          "You can fall down, hurt your legs, or get injured easily",
          "It is very hard to gather enough friends to play together on busy days"
        ]
      }
    },
    C: {
      C1: {
        pros: [
          "Serves as the absolute prerequisite dictating the vast majority of physiological health",
          "Requires zero extra free time, integrating seamlessly into busy professional routines",
          "Provides sustainable metabolic energy, mitigates chronic stress, and regulates weight"
        ],
        cons: [
          "Demands high self-discipline to resist ubiquitous processed food temptations",
          "Can superficially increase weekly grocery expenses for organic or premium ingredients",
          "Lacks the direct cardiovascular or muscular development benefits of physical exercise"
        ]
      },
      B2: {
        pros: [
          "Is the most essential starting point for overall physical health and body weight",
          "Requires no extra hours in the day, fitting perfectly into tight work schedules",
          "Provides steady daily energy and supports a strong immune system"
        ],
        cons: [
          "Needs strong willpower to avoid delicious junk food and sweet drinks",
          "Healthy food and fresh organic meals can sometimes cost more money",
          "Does not build muscles or improve stamina like physical workouts do"
        ]
      },
      B1: {
        pros: [
          "Is the most important thing to keep our body healthy and thin",
          "Does not take extra free time because we must eat anyway every day",
          "Gives us a lot of energy and keeps us from getting sick easily"
        ],
        cons: [
          "Is very hard to say no to fast food, sweets, and bubble tea",
          "Buying fresh vegetables, fruit, and good fish can be expensive",
          "Does not make your muscles strong or help you run faster"
        ]
      }
    }
  }
};

interface TopicCardProps {
  topic: Topic;
  selectedOptionId: "A" | "B" | "C";
  onOptionSelect: (optionId: "A" | "B" | "C") => void;
  band?: "C1" | "B2" | "B1";
}

export default function TopicCard({ topic, selectedOptionId, onOptionSelect, band = "B2" }: TopicCardProps) {
  const [showMatrix, setShowMatrix] = useState(true);

  // Satellite positions and properties for the SVG mental map
  const renderSvgMindMap = () => {
    const centralLabel = topic.label.toUpperCase();
    const ops = topic.options;

    return (
      <div className="bg-[#FDFCFB] border-2 border-black p-4 flex flex-col items-center justify-center overflow-hidden mb-6" id="interactive-mindmap">
        <span className="text-[10px] font-bold text-gray-950 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <Sparkles size={12} className="text-[#D44D5C]" /> Sơ đồ tư duy so sánh (Interactive Mind Map)
        </span>
        
        {/* SVG Stage */}
        <div className="w-full max-w-[600px] aspect-[5/3] min-h-[220px] relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 300"
            className="w-full h-full"
          >
            {/* Connection Lines from Center */}
            <line x1="250" y1="150" x2="250" y2="50" stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />
            <line x1="250" y1="150" x2="80" y2="230" stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />
            <line x1="250" y1="150" x2="420" y2="230" stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />

            {/* Central Node (Problem/Goal) */}
            <g transform="translate(250, 150)">
              <rect
                x="-80"
                y="-30"
                width="160"
                height="60"
                fill="#ffffff"
                stroke="#1a1a1a"
                strokeWidth="2"
              />
              <text
                x="0"
                y="-5"
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill="#1a1a1a"
                fontFamily="sans-serif"
                letterSpacing="0.1em"
              >
                VSTEP PART 2
              </text>
              <text
                x="0"
                y="15"
                textAnchor="middle"
                fontSize="13"
                fontWeight="bold"
                fill="#D44D5C"
                fontFamily="sans-serif"
              >
                {centralLabel}
              </text>
            </g>

            {/* Option A Satellite (Top Center) */}
            <g
              transform="translate(250, 50)"
              className="cursor-pointer group"
              onClick={() => onOptionSelect("A")}
            >
              <rect
                x="-110"
                y="-25"
                width="220"
                height="46"
                fill={selectedOptionId === "A" ? "#FDFCFB" : "#ffffff"}
                stroke={selectedOptionId === "A" ? "#D44D5C" : "#1a1a1a"}
                strokeWidth={selectedOptionId === "A" ? "2.5" : "1"}
                className="transition-all duration-150"
              />
              <rect
                x="-100"
                y="-10"
                width="16"
                height="16"
                fill={selectedOptionId === "A" ? "#D44D5C" : "#1a1a1a"}
              />
              <text
                x="-92"
                y="2.5"
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill="#ffffff"
                fontFamily="sans-serif"
              >
                A
              </text>
              <text
                x="15"
                y="3.5"
                textAnchor="middle"
                fontSize="13"
                fontWeight={selectedOptionId === "A" ? "bold" : "medium"}
                fill="#1a1a1a"
                fontFamily="sans-serif"
              >
                {ops[0].name.length > 25 ? ops[0].name.substring(0, 25) + "..." : ops[0].name}
              </text>
              {topic.recommendedChoice === "A" && (
                <path
                  d="M 100 -25 L 110 -25 L 110 -15 Z"
                  fill="#D44D5C"
                />
              )}
            </g>

            {/* Option B Satellite (Bottom Left) */}
            <g
              transform="translate(80, 230)"
              className="cursor-pointer group"
              onClick={() => onOptionSelect("B")}
            >
              <rect
                x="-70"
                y="-25"
                width="155"
                height="46"
                fill={selectedOptionId === "B" ? "#FDFCFB" : "#ffffff"}
                stroke={selectedOptionId === "B" ? "#D44D5C" : "#1a1a1a"}
                strokeWidth={selectedOptionId === "B" ? "2.5" : "1"}
                className="transition-all duration-150"
              />
              <rect
                x="-60"
                y="-10"
                width="16"
                height="16"
                fill={selectedOptionId === "B" ? "#D44D5C" : "#1a1a1a"}
              />
              <text
                x="-52"
                y="2.5"
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill="#ffffff"
                fontFamily="sans-serif"
              >
                B
              </text>
              <text
                x="25"
                y="3.5"
                textAnchor="middle"
                fontSize="13"
                fontWeight={selectedOptionId === "B" ? "bold" : "medium"}
                fill="#1a1a1a"
                fontFamily="sans-serif"
              >
                {ops[1].name.length > 18 ? ops[1].name.substring(0, 15) + "..." : ops[1].name}
              </text>
              {topic.recommendedChoice === "B" && (
                <path
                  d="M 75 -25 L 85 -25 L 85 -15 Z"
                  fill="#D44D5C"
                />
              )}
            </g>

            {/* Option C Satellite (Bottom Right) */}
            <g
              transform="translate(420, 230)"
              className="cursor-pointer group"
              onClick={() => onOptionSelect("C")}
            >
              <rect
                x="-85"
                y="-25"
                width="165"
                height="46"
                fill={selectedOptionId === "C" ? "#FDFCFB" : "#ffffff"}
                stroke={selectedOptionId === "C" ? "#D44D5C" : "#1a1a1a"}
                strokeWidth={selectedOptionId === "C" ? "2.5" : "1"}
                className="transition-all duration-150"
              />
              <rect
                x="-75"
                y="-10"
                width="16"
                height="16"
                fill={selectedOptionId === "C" ? "#D44D5C" : "#1a1a1a"}
              />
              <text
                x="-67"
                y="2.5"
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill="#ffffff"
                fontFamily="sans-serif"
              >
                C
              </text>
              <text
                x="15"
                y="3.5"
                textAnchor="middle"
                fontSize="13"
                fontWeight={selectedOptionId === "C" ? "bold" : "medium"}
                fill="#1a1a1a"
                fontFamily="sans-serif"
              >
                {ops[2].name.length > 20 ? ops[2].name.substring(0, 18) + "..." : ops[2].name}
              </text>
              {topic.recommendedChoice === "C" && (
                <path
                  d="M 70 -25 L 80 -25 L 80 -15 Z"
                  fill="#D44D5C"
                />
              )}
            </g>
          </svg>
        </div>
        <p className="text-[10px] text-gray-500 mt-2 font-mono uppercase tracking-wider text-center">
          *Chạm vào nút lựa chọn A, B hoặc C để đổi lựa chọn chính của bạn. Sơ đồ sẽ cập nhật tự động.
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white border-2 border-black p-5 mb-6" id="topic-card">
      <div className="border-b-2 border-black/10 pb-4 mb-4">
        <span className="inline-block bg-black text-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest mb-4">
          The Situation
        </span>
        <h2 className="text-lg sm:text-xl font-serif text-[#1A1A1A] font-medium leading-relaxed italic">
          {topic.situation}
        </h2>
      </div>

      {/* SVG Mind Map */}
      {renderSvgMindMap()}

      {/* Matrix Toggle */}
      <div className="flex items-center justify-between mb-4 border-t border-black/10 pt-4">
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest font-mono">
          PHÂN TÍCH CHI TIẾT 3 LỰA CHỌN (PROS & CONS MATRIX) - LEVEL {band}
        </span>
        <button
          onClick={() => setShowMatrix(!showMatrix)}
          className="text-[11px] font-black text-gray-950 uppercase tracking-wider hover:text-[#D44D5C] transition-colors cursor-pointer border-b-2 border-black pb-0.5"
        >
          {showMatrix ? "ẨN PHÂN TÍCH" : "HIỆN PHÂN TÍCH"}
        </button>
      </div>

      {showMatrix && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch" id="options-matrix-grid">
          {topic.options.map((opt) => {
            const isSelected = opt.id === selectedOptionId;
            const isRecommended = opt.id === topic.recommendedChoice;
            
            // Retrieve level-specific pros and cons
            const levelData = LEVEL_PROS_CONS[topic.id]?.[opt.id]?.[band] || { pros: opt.pros, cons: opt.cons };
            const displayPros = levelData.pros;
            const displayCons = levelData.cons;

            return (
              <div
                key={opt.id}
                onClick={() => onOptionSelect(opt.id)}
                className={`p-5 transition-all duration-150 cursor-pointer flex flex-col justify-between relative min-h-[550px] md:min-h-[680px] pb-6 ${
                  isSelected
                    ? "border-2 border-[#D44D5C] bg-[#FDFCFB]"
                    : "border border-gray-300 bg-white hover:border-black/40"
                }`}
                id={`matrix-card-${opt.id}`}
              >
                {/* Top Section / Badges */}
                <div className="flex items-start justify-between">
                  <span className={`w-6 h-6 flex items-center justify-center text-xs font-black square ${
                    isSelected ? "bg-[#D44D5C] text-white" : "bg-black text-white"
                  }`}>
                    {opt.id}
                  </span>
                  
                  <div className="flex flex-col items-end gap-1">
                    {isRecommended && (
                      <span className="bg-[#D44D5C]/10 text-[#D44D5C] text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 border border-[#D44D5C]/30 flex items-center gap-0.5" title="Recommended choice">
                        ★ GỢI Ý B2-C1
                      </span>
                    )}
                    {isSelected && (
                      <span className="bg-black text-white text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5">
                        SELECTED
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Block with clipping for unselected options */}
                <div className={`mt-auto ${!isSelected ? "flex flex-col justify-start" : "flex-1 flex flex-col justify-end"}`}>
                  <h3 className="font-display font-black text-gray-950 text-xs mb-3.5 uppercase tracking-wider leading-snug">
                    {opt.name}
                  </h3>

                  {/* Pros Section */}
                  <div className="space-y-2 mb-4">
                    <span className="text-[10px] uppercase font-bold text-gray-900 tracking-wider block border-b border-black/10 pb-0.5 mb-1.5">ƯU ĐIỂM (PROS)</span>
                    {displayPros.map((pro, index) => (
                      <div key={index} className="flex items-start gap-1.5 text-xs text-gray-700 leading-relaxed">
                        <ThumbsUp size={11} className="text-gray-900 mt-0.5 flex-shrink-0" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>

                  {/* Cons Section */}
                  {isSelected && (
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold text-[#D44D5C] tracking-wider block border-b border-black/10 pb-0.5 mb-1.5">NHƯỢC ĐIỂM (CONS)</span>
                      {displayCons.map((con, index) => (
                        <div key={index} className="flex items-start gap-1.5 text-xs text-gray-700 leading-relaxed">
                          <ThumbsDown size={11} className="text-[#D44D5C] mt-0.5 flex-shrink-0" />
                          <span>{con}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {isRecommended && isSelected && (
                  <div className="mt-3 bg-[#FDFCFB] p-2 border border-dashed border-[#D44D5C]/30 text-[10px] text-gray-700 leading-relaxed flex items-start gap-1 font-sans">
                    <Info size={11} className="mt-0.5 flex-shrink-0 text-[#D44D5C]" />
                    <span>{topic.recommendedExplanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
