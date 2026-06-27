import { Topic, FrameworkStep } from "./types";

export const FRAMEWORK_STEPS: FrameworkStep[] = [
  {
    id: "s",
    num: "S",
    name: "Situation & Choice",
    tag: "State position & introduce options",
    purpose: "Begin with a strong, clear opening. Paraphrase the given situation and state which of the three options you have selected as the best solution.",
    phrases: [
      "In this situation, we are presented with three options: ..., ..., and ... In my view, ... is the most outstanding choice.",
      "Well, faced with the decision of ..., I would definitely opt for ..., as it is far superior to the other alternatives.",
      "Regarding the scenario of ..., among the three suggested solutions, I strongly believe that ... is the best course of action.",
      "To address the situation of ..., I would choose ... for several compelling reasons."
    ],
    color: "#2563EB",
    textColor: "#1E40AF"
  },
  {
    id: "o",
    num: "O",
    name: "Own Option Advantages",
    tag: "Explain benefits of your choice",
    purpose: "Elaborate on the advantages of your chosen option. Provide 2-3 logical benefits with explanations, concrete details, or real-life examples.",
    phrases: [
      "The primary advantage of this choice is that ...",
      "First and foremost, ... offers significant benefits because ...",
      "Another crucial point in favor of ... is that ...",
      "For instance, from my own experience, ... can easily lead to ...",
      "This is highly effective because it directly addresses the problem of ..."
    ],
    color: "#16A34A",
    textColor: "#166534"
  },
  {
    id: "c",
    num: "C",
    name: "Comparison & Rejection",
    tag: "Analyze and reject the other two options",
    purpose: "Critique the other two alternatives. Explain why they are less effective, more expensive, or impractical compared to your chosen option.",
    phrases: [
      "On the other hand, let's examine the other alternatives. Firstly, ... is not ideal because ...",
      "Regarding ..., although it has some merits, it suffers from a major drawback, which is ...",
      "As for ..., it is simply not as viable or cost-effective as my chosen solution.",
      "Unlike my choice, both of these options are highly dependent on ...",
      "Therefore, we should rule out ... and ... because they fail to ..."
    ],
    color: "#D97706",
    textColor: "#92400E"
  },
  {
    id: "a",
    num: "A",
    name: "Conclusion",
    tag: "Summarize and land the ending",
    purpose: "Reiterate your decision briefly and wind up your speech naturally. Land your ending cleanly before your time expires.",
    phrases: [
      "To wrap up, while all options have certain values, ... remains the most complete and logical solution.",
      "All in all, given its long-term benefits and practicality, ... is undoubtedly the optimal path to take.",
      "So personally, I rest my case that ... is the best choice among the three.",
      "For these reasons, I am fully convinced that ... is the ultimate way forward."
    ],
    color: "#9333EA",
    textColor: "#6B21A8"
  }
];

export const TOPICS: Topic[] = [
  {
    id: 0,
    label: "Attracting Tourists",
    situation: "Situation: A city wants to attract more tourists. Here are some of the things that can be done: building holiday flats, providing parks, and building entertainment centers. Which do you think is the best idea? Why?",
    recommendedChoice: "C",
    recommendedExplanation: "Building entertainment centers provides the highest economic return and the strongest tourist draw because they are indoor, all-weather attractions that keep visitors engaged and spending money.",
    options: [
      {
        id: "A",
        name: "Building holiday flats",
        pros: ["Provides comfortable accommodation for overnight visitors", "Can generate rental income for local property owners", "Supports longer stays in the city"],
        cons: ["Does not create a reason to visit in the first place", "Often remains empty during low seasons", "Can disrupt local residential housing markets"]
      },
      {
        id: "B",
        name: "Providing parks",
        pros: ["Enhances the green space and beauty of the city", "Free or low-cost to access for both tourists and locals", "Promotes eco-friendly and sustainable tourism"],
        cons: ["Rarely acts as a primary magnet for long-distance tourists", "Highly dependent on pleasant weather", "Does not directly generate substantial tourism revenue"]
      },
      {
        id: "C",
        name: "Building entertainment centers",
        pros: ["Acts as a primary landmark destination that draws large crowds", "Offers diverse, weather-proof activities (cinemas, shopping, dining)", "Directly generates high tourist spending and municipal tax revenue"],
        cons: ["Requires high initial capital investment and operating costs", "Can cause noise and traffic congestion in the surrounding area", "Requires continuous maintenance and updates to stay appealing"]
      }
    ],
    bandAnswers: {
      C1: {
        s: "Well, when we look at how to get more tourists to visit a city, we've got three main choices here: building holiday flats, adding more parks, or putting up entertainment centers. If you ask me, building entertainment centers is definitely the way to go because it really pulls people in and keeps them coming back.",
        o: "The main reason is that a modern entertainment center is a destination in itself. It acts like a massive magnet for both day-trippers and long-distance travelers. Since these places are indoors and weather-proof—packed with things like cinemas, virtual reality zones, and great places to eat—visitors can easily spend the whole day there. And when they stay longer, they spend more money, which gives a huge boost to our local shops and restaurants.",
        c: "Now, if we look at the other two options, they have some pretty clear drawbacks. Building holiday flats, to me, is like putting the cart before the horse. After all, flats are just places to sleep—they only work if people already want to visit the city in the first place. If there's nothing to do, those rooms will just sit empty. On the other hand, public parks are fantastic for locals to relax, but let's be honest, nobody is going to travel a long distance just to see a basic park. Plus, if the weather turns bad, a park is basically useless for tourism.",
        a: "So, to wrap things up, while parks are great for the community and flats are good for overnight stays, only entertainment centers have that strong appeal to really put a city on the map for tourists.",
        note: "C1 — Đây là câu trả lời nói tự nhiên xuất sắc đạt điểm tuyệt đối (9.0-10.0). Văn phong nói cực kỳ lưu loát, sử dụng lối diễn đạt tự nhiên chuẩn bản xứ (definitely the way to go, pulls people in, let's be honest, put a city on the map) kết hợp khéo léo với thành ngữ 'putting the cart before the horse'."
      },
      B2: {
        s: "When thinking about how to get more tourists to visit a city, we can choose between building holiday flats, adding parks, or building entertainment centers. Personally, I believe that building entertainment centers is the best option.",
        o: "To start with, these entertainment complexes act as major landmarks that can easily draw big crowds. They offer a ton of different activities under one roof, like modern movie theaters, indoor games, and food courts. This appeals to both families and young people, making it a year-round attraction. For instance, a major leisure mall always keeps visitors busy for hours, which generates lots of revenue for the city.",
        c: "On the other hand, the other choices aren't quite as effective. Building holiday flats is fine, but they are pretty much useless if the city doesn't have fun activities to keep tourists there in the first place. Also, while providing parks is a nice touch for locals to relax, tourists rarely travel to a new city just to walk in a normal park. Plus, parks depend too much on clear weather, so they will be empty on rainy days.",
        a: "All in all, entertainment centers give the highest economic return and the strongest tourist appeal, so it's the smartest choice.",
        note: "B2 — Câu trả lời tự nhiên đạt chuẩn B2 (6.5-8.0). Sử dụng lối nói gãy gọn, từ nối tự nhiên (To start with, On the other hand, Plus). Lập luận thực tế, rành mạch và dễ hiểu."
      },
      B1: {
        s: "Today I want to talk about how a city can get more tourists. We have three ideas: building holiday flats, providing parks, and building entertainment centers. In my opinion, building entertainment centers is the best idea.",
        o: "First, entertainment centers have many fun activities. Tourists can watch movies, play games, and go shopping in one place. This is very exciting for young people and families. For example, my city has a big shopping center and it is always crowded on weekends.",
        c: "Second, I don't choose holiday flats because they are just for sleeping. Tourists want to go out and have fun, not just stay in rooms. Also, providing parks is nice, but it is too quiet. If the weather is bad or raining, tourists cannot do anything in the parks.",
        a: "So, I think building entertainment centers is the most effective way to attract tourists. Thank you for listening.",
        note: "B1 — Câu trả lời đạt chuẩn B1 (4.0-5.5). Nói trôi chảy ở mức cơ bản, từ vựng đơn giản, cấu trúc câu trực diện và tự nhiên cho việc nói."
      }
    }
  },
  {
    id: 1,
    label: "Rewarding Students",
    situation: "Situation: A high school wants to motivate its students to study harder. There are three suggestions: giving high grades, giving gifts, and giving compliments. Which do you think is the best idea? Why?",
    recommendedChoice: "C",
    recommendedExplanation: "Giving compliments (verbal praise) is the most sustainable and effective motivator because it builds genuine intrinsic motivation, is completely free, and avoids the negative competition or pressure of the other choices.",
    options: [
      {
        id: "A",
        name: "Giving high grades",
        pros: ["Directly boosts school record and university applications", "Highly valued by parents and academic systems", "Easy for teachers to track and distribute"],
        cons: ["Can lead to inflation of grades and loss of educational standards", "May cause extreme stress and unhealthy rivalry among classmates", "Encourages memorization rather than actual deep learning"]
      },
      {
        id: "B",
        name: "Giving physical gifts",
        pros: ["Creates an immediate, exciting reward that students love", "Provides a concrete symbol of success", "Can be practical items like books, pens, or technological tools"],
        cons: ["Highly expensive for schools to maintain long-term", "Rewards only a few top performers, discouraging the rest", "Can make students work solely for material gain rather than self-improvement"]
      },
      {
        id: "C",
        name: "Giving compliments",
        pros: ["Completely free and can be given instantly and continuously", "Builds long-term intrinsic motivation and healthy self-esteem", "Recognizes effort and progress, not just end results"],
        cons: ["Must be specific and sincere, or students will dismiss it as fake", "Can feel less exciting than receiving a physical laptop or gift card", "Requires teachers to actively monitor and praise every individual student"]
      }
    ],
    bandAnswers: {
      C1: {
        s: "Well, when we think about how to motivate high school students to study harder, we have three main ideas here: giving high grades, offering physical gifts, or giving compliments. In my view, using compliments and honest praise is definitely the most effective and sustainable way to go.",
        o: "The biggest reason is that compliments build what we call 'intrinsic motivation'—which is the inner drive to learn because you actually want to, not just for a prize. When a teacher praises a student's hard work rather than just how smart they are, it helps them build a real growth mindset. On top of that, praise is a totally free and unlimited resource. Teachers can praise anyone who shows progress, not just the top-performing students. This makes the whole classroom feel supportive and encouraging.",
        c: "Now, looking at the other two ideas, they have some serious downsides. First, giving out high grades too easily is a bad idea because it ruins the value of grades. If everyone gets an A, then an A doesn't mean anything anymore, and students will stop trying. As for physical gifts, that creates a bad habit where students only study for the prize. Once you stop giving gifts, their motivation disappears. Plus, let's be honest, buying gifts for hundreds of students is just too expensive for any school to keep up.",
        a: "So, to sum up, while grades are useful and gifts can be exciting for a moment, compliments are the only approach that builds a real, long-term love for learning.",
        note: "C1 — Thí sinh trình bày cực kỳ tự nhiên, kết cấu chặt chẽ như một bài nói trôi chảy thực thụ. Kết hợp hài hòa giữa từ vựng tâm lý giáo dục (growth mindset, intrinsic motivation) và các từ đệm tự nhiên (Well, On top of that, let's be honest, to sum up)."
      },
      B2: {
        s: "To motivate high school students to study harder, there are three options: giving high grades, giving gifts, or giving compliments. In my opinion, giving compliments is the best and most effective choice.",
        o: "First of all, compliments are very powerful because they build a student's confidence. When a teacher notices a student's hard work and praises them in front of the class, the student feels valued and respected. This makes them want to study even harder to keep up that good image. Additionally, giving compliments is free of charge, so teachers can use it daily for any student who makes progress, not just the top ones.",
        c: "On the other hand, the other ideas have big disadvantages. Giving high grades easily is dangerous because students will stop trying once they know they will get an A anyway. It makes grades lose their real meaning. Likewise, giving physical gifts is very expensive. The school cannot afford to buy gifts for hundreds of students constantly, and it might make students study only when there is a gift.",
        a: "For these reasons, I believe that verbal compliments are the healthiest and most practical motivator for students.",
        note: "B2 — Bài nói đạt chuẩn B2 (6.5-8.0) với phong cách nói chuyện lưu loát, tự nhiên. Trình bày cực kỳ gãy gọn, lập luận thuyết phục tập trung vào tính khả thi tài chính và tâm lý học sinh."
      },
      B1: {
        s: "High schools want to help students study harder. There are three ways: giving high grades, giving gifts, and giving compliments. I think giving compliments is the best way.",
        o: "First, compliments make students very happy. When a teacher says 'well done', the student feels happy and wants to study more. It is very simple and easy to do. Every teacher can give compliments to many students every day.",
        c: "Second, giving high grades is not good because if everyone gets high grades, nobody will know who is really good. It is not fair. Also, giving gifts is too expensive for the school. If the school has no money, they cannot buy gifts anymore. Students will stop studying hard when there are no gifts.",
        a: "In conclusion, compliments are the best because they are free and helpful. Thank you.",
        note: "B1 — Đạt yêu cầu giao tiếp ở mức cơ bản. Từ vựng đơn giản, nói trôi chảy dễ hiểu, giải thích rõ ràng được bản chất vấn đề bằng các câu nói trực diện."
      }
    }
  },
  {
    id: 2,
    label: "Keeping Fit",
    situation: "Situation: A young office worker wants to improve their health and physical fitness. The following suggestions are made: going to the gym, playing outdoor sports, and eating a balanced diet. Which do you think is the best idea? Why?",
    recommendedChoice: "C",
    recommendedExplanation: "Eating a balanced diet is the fundamental cornerstone of health. Nutrition accounts for up to 70-80% of body composition and energy levels, making it more critical and sustainable than exercise alone, especially for busy office workers.",
    options: [
      {
        id: "A",
        name: "Going to the gym",
        pros: ["Provides professional equipment for strength training", "Weather-proof indoor environment with structured classes", "Personal trainers can guide correct form and safety"],
        cons: ["Requires monthly membership fees which can be expensive", "Can be boring and repetitive, leading to quick loss of interest", "Requires traveling to a specific location, consuming extra time"]
      },
      {
        id: "B",
        name: "Playing outdoor sports",
        pros: ["Highly fun, social, and interactive (e.g., football, tennis)", "Provides fresh air, sunlight, and natural environment", "Improves cardiovascular health and team coordination"],
        cons: ["Depends entirely on clear, favorable weather", "Higher risk of sports injuries (sprains, fractures)", "Requires organizing other people and renting court spaces"]
      },
      {
        id: "C",
        name: "Eating a balanced diet",
        pros: ["Directly impacts energy levels, immune system, and weight management", "Can be practiced seamlessly at home or office without equipment", "Saves long-term medical costs and improves mental focus"],
        cons: ["Requires high self-discipline to resist unhealthy fast food", "Preparing healthy meals can be time-consuming", "Organic or fresh whole food ingredients can be more costly"]
      }
    ],
    bandAnswers: {
      C1: {
        s: "To help busy office workers stay fit and healthy, we can look at three main options: going to the gym, playing outdoor sports, or eating a balanced diet. While regular exercise is definitely important, I strongly believe that eating a balanced diet is the most essential foundation for our long-term health.",
        o: "The main reason is that nutrition is the biggest factor when it comes to our health, directly affecting our energy levels and immune system. If you think about it, an office worker sits at a desk for eight hours a day, so even a quick workout can't undo the damage of eating junk food. Eating healthy, home-cooked meals gives us stable energy throughout the day, reduces work stress, and helps manage weight easily—without needing to spend hours of our busy schedule at the gym.",
        c: "On the other hand, the other fitness options often fall flat because of our busy lives. For instance, gym memberships usually end up as wasted money because, let's face it, traveling to the gym after a long, exhausting workday is just too hard. As for outdoor sports, they are great for making friends, but they depend completely on good weather and carry a real risk of injury. It is also quite a headache to coordinate schedules with other busy people.",
        a: "So, to wrap things up, although exercise is a great addition, proper nutrition is the ultimate starting point. Eating a balanced diet is simply the most practical and sustainable way to stay fit.",
        note: "C1 — Câu trả lời có nhịp điệu nói xuất sắc, thực tế và dễ ứng dụng. Vừa tự nhiên vừa chứa các từ vựng học thuật chất lượng cao (essential foundation, immune system, stable energy, fall flat, coordinate schedules, proper nutrition)."
      },
      B2: {
        s: "If a busy office worker wants to stay healthy and fit, they can choose between going to the gym, playing sports outdoors, or eating a balanced diet. Personally, I believe that eating a balanced diet is the best option.",
        o: "The main reason is that nutrition plays the most important role in our health. No matter how much you exercise, you cannot stay healthy if you only eat fast food. A balanced diet gives you the right nutrients and vitamins to work productively without feeling tired. It is also very convenient because you can choose healthy options directly during lunch breaks or prepare them easily at home.",
        c: "In contrast, the other choices are harder to maintain. Going to the gym is often expensive, and many office workers are too tired to go there after work. In fact, many people waste money on gym cards they never use. Outdoor sports are also difficult because they depend on good weather. If it rains or is too hot, you cannot play. You also need to find partners to play with, which is hard to schedule.",
        a: "Overall, eating healthy is the base of good health, making it the most logical starting point for any office worker.",
        note: "B2 — Bài nói cực kỳ thực tế, đánh giá đúng tâm lý 'lười đi tập' của dân văn phòng. Văn phong nói trôi chảy, lập luận thuyết phục và tự nhiên."
      },
      B1: {
        s: "Office workers want to have good health. They can go to the gym, play sports outside, or eat healthy food. I think eating healthy food is the best idea.",
        o: "First, food is very important for our body. If we eat good food like vegetables, fruit, and fish, we will have much energy. We will not get sick easily. We can do this every day at home easily.",
        c: "Second, going to the gym is not good because it costs a lot of money. Many office workers have no time to go to the gym because they work too much. Also, playing sports outside is difficult when it rains. You cannot play football when the weather is bad. You also need many friends to play together.",
        a: "In conclusion, eating a balanced diet is the best way to keep fit because it is easy and cheap. Thank you.",
        note: "B1 — Các luận điểm rực rỡ tính thực tế dẫu từ vựng đơn giản. Câu văn ngắn nhưng nối tiếp hợp lý, giải thích trôi chảy được lí do vì sao ăn uống lại là ưu tiên đầu tiên."
      }
    }
  }
];
