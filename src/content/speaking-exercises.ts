import { type CEFRLevel } from '../lib/firestore';

// ------------------------------------------------------------------
// Speaking Exercises — uses browser SpeechRecognition API for input
// and SpeechSynthesis for model pronunciation.
// ------------------------------------------------------------------

export interface SpeakingExercise {
  id: string;
  level: CEFRLevel;
  title: string;
  type: 'repeat' | 'respond' | 'describe' | 'role-play';
  description: string;
  /** Sentences for repeat-after-me or model responses */
  sentences: {
    text: string;
    hint?: string;
  }[];
  /** For role-play: alternating lines (system vs user) */
  rolePlayScript?: {
    speaker: 'system' | 'user';
    line: string;
    hint?: string;
  }[];
  topic: string;
  tips?: string[];
}

export const speakingExercises: SpeakingExercise[] = [
  // ==================== A1 ====================
  {
    id: 's-a1-01',
    level: 'A1',
    title: 'Introduce Yourself',
    type: 'repeat',
    description: 'Listen and repeat these self-introduction sentences. Focus on clear pronunciation.',
    sentences: [
      { text: 'Hello, my name is Aarav.', hint: 'Say your own name instead' },
      { text: 'I am from Mumbai.', hint: 'Say your city' },
      { text: 'I am twenty-five years old.' },
      { text: 'I am a software engineer.' },
      { text: 'I like playing cricket and reading books.' },
      { text: 'Nice to meet you.' },
    ],
    topic: 'Introductions',
    tips: [
      'Speak slowly and clearly',
      'Don\'t worry about your accent — focus on being understood',
    ],
  },
  {
    id: 's-a1-02',
    level: 'A1',
    title: 'At a Shop',
    type: 'role-play',
    description: 'Practice a conversation at a shop. The system plays the shopkeeper, you are the customer.',
    rolePlayScript: [
      { speaker: 'system', line: 'Good morning! Welcome to my shop. How can I help you?' },
      { speaker: 'user', line: 'I would like to buy some milk, please.', hint: 'Ask for milk' },
      { speaker: 'system', line: 'Sure! We have full cream and toned milk. Which one would you like?' },
      { speaker: 'user', line: 'I will take toned milk, please.', hint: 'Choose one type' },
      { speaker: 'system', line: 'That will be forty rupees.' },
      { speaker: 'user', line: 'Here you are. Thank you!', hint: 'Pay and thank' },
      { speaker: 'system', line: 'Thank you! Have a nice day!' },
    ],
    sentences: [],
    topic: 'Shopping',
  },
  {
    id: 's-a1-03',
    level: 'A1',
    title: 'Numbers and Time',
    type: 'repeat',
    description: 'Practice saying numbers, prices, and times clearly.',
    sentences: [
      { text: 'The time is half past nine.' },
      { text: 'My phone number is nine eight seven six five four three two one zero.' },
      { text: 'This shirt costs four hundred and fifty rupees.' },
      { text: 'The train arrives at quarter to six.' },
      { text: 'I wake up at seven o\'clock every morning.' },
    ],
    topic: 'Numbers & Time',
    tips: [
      'Practice numbers clearly — they are crucial for daily communication',
      'Indian English often says "four fifty" instead of "four hundred and fifty" — both are fine',
    ],
  },

  // ==================== A2 ====================
  {
    id: 's-a2-01',
    level: 'A2',
    title: 'Asking for Directions',
    type: 'role-play',
    description: 'You are lost and asking a stranger for directions. Practice polite requests.',
    rolePlayScript: [
      { speaker: 'user', line: 'Excuse me, could you help me?', hint: 'Get attention politely' },
      { speaker: 'system', line: 'Of course! Where do you need to go?' },
      { speaker: 'user', line: 'I am looking for the nearest metro station.', hint: 'Say where you want to go' },
      { speaker: 'system', line: 'Go straight for about two hundred metres, then turn right at the traffic signal. The metro station is on your left.' },
      { speaker: 'user', line: 'How long will it take to walk there?', hint: 'Ask about time' },
      { speaker: 'system', line: 'About five to ten minutes on foot.' },
      { speaker: 'user', line: 'Thank you so much for your help!', hint: 'Thank them' },
    ],
    sentences: [],
    topic: 'Directions',
  },
  {
    id: 's-a2-02',
    level: 'A2',
    title: 'Describe Your Daily Routine',
    type: 'describe',
    description: 'Describe what you do on a typical day. Use the sentences as models, then try your own.',
    sentences: [
      { text: 'I usually wake up at six thirty in the morning.' },
      { text: 'After brushing my teeth, I have a cup of tea.' },
      { text: 'I take the bus to work at eight o\'clock.' },
      { text: 'I have lunch at one in the afternoon.' },
      { text: 'I finish work at five and go home.' },
      { text: 'In the evening, I watch television or go for a walk.' },
      { text: 'I go to bed at around ten thirty.' },
    ],
    topic: 'Daily Life',
    tips: [
      'Use time expressions: in the morning, in the afternoon, in the evening',
      'Use adverbs of frequency: always, usually, sometimes, never',
    ],
  },

  // ==================== B1 ====================
  {
    id: 's-b1-01',
    level: 'B1',
    title: 'Express Your Opinion',
    type: 'respond',
    description: 'Read each question, then speak your answer aloud for at least 30 seconds. Use opinion phrases.',
    sentences: [
      { text: 'Do you think social media is good for students?', hint: 'Use: In my opinion... / I believe... / On the other hand...' },
      { text: 'Should school uniforms be mandatory in India?', hint: 'Use: I think... / The advantage is... / However...' },
      { text: 'Is it better to live in a city or a village?', hint: 'Use: From my perspective... / While some people think...' },
    ],
    topic: 'Opinions',
    tips: [
      'Structure your answer: State opinion → Give reason → Give example → Conclude',
      'Use linking words: because, however, therefore, moreover, in addition',
    ],
  },
  {
    id: 's-b1-02',
    level: 'B1',
    title: 'Job Interview Practice',
    type: 'role-play',
    description: 'Practice a job interview. The system is the interviewer.',
    rolePlayScript: [
      { speaker: 'system', line: 'Good morning. Please take a seat. Could you start by telling me about yourself?' },
      { speaker: 'user', line: 'Good morning. My name is... I have been working as a software developer for three years.', hint: 'Introduce yourself professionally' },
      { speaker: 'system', line: 'That sounds interesting. What are your main strengths?' },
      { speaker: 'user', line: 'I am a good team player and I pay attention to detail. I also learn new technologies quickly.', hint: 'Share 2-3 strengths' },
      { speaker: 'system', line: 'Can you tell me about a challenging situation at work and how you handled it?' },
      { speaker: 'user', line: 'In my previous role, we had a tight deadline for a project. I organized the team and we divided the work efficiently. We delivered on time.', hint: 'Use past tense to tell a story' },
      { speaker: 'system', line: 'Very good. Do you have any questions for us?' },
      { speaker: 'user', line: 'Yes, could you tell me about the team I would be working with?', hint: 'Ask a thoughtful question' },
    ],
    sentences: [],
    topic: 'Career',
    tips: [
      'Use the STAR method: Situation, Task, Action, Result',
      'Speak confidently but not too fast',
      'Avoid filler words like "basically", "actually", "like"',
    ],
  },

  // ==================== B2 ====================
  {
    id: 's-b2-01',
    level: 'B2',
    title: 'Give a Mini Presentation',
    type: 'describe',
    description: 'Pick one topic and speak for 2 minutes. Use the structure provided. Record yourself and listen back.',
    sentences: [
      { text: 'Topic: The impact of technology on education in India', hint: 'Use: Today I would like to discuss...' },
      { text: 'Introduction: State the topic and why it matters.', hint: 'Use: This is particularly relevant because...' },
      { text: 'Point 1: Discuss the advantages.', hint: 'Use: One significant advantage is..., Furthermore...' },
      { text: 'Point 2: Discuss the challenges.', hint: 'Use: However, there are also challenges such as...' },
      { text: 'Conclusion: Summarise and give your view.', hint: 'Use: In conclusion, I believe that..., To sum up...' },
    ],
    topic: 'Presentations',
    tips: [
      'Use signposting language: firstly, secondly, moving on to, in conclusion',
      'Pause between main points — don\'t rush',
      'Use examples from Indian context to support your arguments',
    ],
  },
  {
    id: 's-b2-02',
    level: 'B2',
    title: 'Debate: Remote Work',
    type: 'respond',
    description: 'Respond to each statement with a counter-argument. Practice expressing disagreement politely.',
    sentences: [
      { text: 'Working from home reduces productivity because of distractions.', hint: 'Disagree politely: I see your point, however... / While that may be true in some cases...' },
      { text: 'Companies should require employees to come to the office every day.', hint: 'Present alternatives: Rather than..., a more balanced approach would be...' },
      { text: 'Technology has made work-life balance worse, not better.', hint: 'Nuanced response: It depends on... / There are two sides to this...' },
    ],
    topic: 'Work & Society',
    tips: [
      'Acknowledging the other view before disagreeing shows maturity: "While I understand that..., I would argue that..."',
      'Support your counter-argument with evidence or examples',
    ],
  },

  // ==================== C1 ====================
  {
    id: 's-c1-01',
    level: 'C1',
    title: 'Academic Discussion',
    type: 'respond',
    description: 'Respond to each academic prompt with a well-structured spoken answer (60-90 seconds each).',
    sentences: [
      { text: 'Discuss the implications of artificial intelligence on employment in developing countries like India.', hint: 'Use hedging language: It could be argued that... / Evidence suggests... / This is likely to...' },
      { text: 'Evaluate the effectiveness of India\'s digital payment revolution in promoting financial inclusion.', hint: 'Use evaluative language: To a large extent... / The evidence is mixed... / A critical assessment reveals...' },
      { text: 'To what extent should governments regulate social media platforms?', hint: 'Balance arguments: Proponents argue... / Critics, however, contend... / A nuanced perspective suggests...' },
    ],
    topic: 'Academic',
    tips: [
      'Use hedging and cautious language in academic discussions',
      'Reference evidence or examples even in spoken responses',
      'Structure: Context → Analysis → Evaluation → Conclusion',
    ],
  },
  {
    id: 's-c1-02',
    level: 'C1',
    title: 'Pronunciation: Problem Sounds',
    type: 'repeat',
    description: 'Practice sounds that are commonly challenging for Indian English speakers. Listen carefully and repeat.',
    sentences: [
      { text: 'The thick thief thought about three things.', hint: 'Focus on "th" sound — tongue between teeth' },
      { text: 'She sells sea shells by the sea shore.', hint: 'Focus on "sh" vs "s" distinction' },
      { text: 'The vase was very valuable.', hint: 'Focus on "v" sound — upper teeth on lower lip, not "w"' },
      { text: 'I would like a bottle of water.', hint: 'Focus on "w" vs "v": "water" not "vater"' },
      { text: 'The professor asked the students to submit their papers.', hint: 'Focus on "p" with aspiration (puff of air)' },
      { text: 'World, word, work, worm, worth.', hint: 'Focus on the "w" + "er" vowel combination' },
    ],
    topic: 'Pronunciation',
    tips: [
      'Record yourself and compare with the model pronunciation',
      'Indian languages often lack the "th" sound — practice placing your tongue between your teeth',
      'The "v" and "w" distinction is important: "vine" vs "wine"',
    ],
  },

  // ==================== ADDITIONAL A1 EXERCISES ====================
  {
    id: 's-a1-04',
    level: 'A1',
    title: 'Introducing Yourself',
    type: 'repeat',
    description: 'Practice saying basic self-introduction sentences clearly and confidently.',
    sentences: [
      { text: 'Hello, my name is Priya.', hint: 'Start with a clear "Hello"' },
      { text: 'I am from Hyderabad.', hint: 'Pronounce "Hyderabad" clearly' },
      { text: 'I am twenty-five years old.', hint: 'Stress "twenty-five"' },
      { text: 'I work as a software engineer.', hint: 'Clear pronunciation of "engineer"' },
      { text: 'I like playing cricket and watching movies.', hint: 'Pause after "cricket" with "and"' },
      { text: 'Nice to meet you!', hint: 'Friendly and warm tone' },
    ],
    topic: 'Self-Introduction',
    tips: [
      'Don\'t say "Myself Priya" — say "My name is Priya" or "I am Priya"',
      'Speak slowly and clearly',
      'Smile when you introduce yourself!',
    ],
  },
  {
    id: 's-a1-05',
    level: 'A1',
    title: 'Ordering Food',
    type: 'respond',
    description: 'Practice ordering food at a restaurant. Listen to the waiter and respond.',
    sentences: [
      { text: 'Good evening! Welcome to our restaurant. How many people?', hint: 'Say: "Table for two, please."' },
      { text: 'Here is the menu. Would you like something to drink?', hint: 'Say: "I would like a glass of water, please."' },
      { text: 'Are you ready to order?', hint: 'Say: "Yes, I would like the butter chicken and two naan, please."' },
      { text: 'Would you like anything else?', hint: 'Say: "No, thank you. That is all."' },
      { text: 'Here is your bill. That will be six hundred rupees.', hint: 'Say: "Thank you. Here you are."' },
    ],
    topic: 'Restaurant',
    tips: [
      'Use "I would like..." instead of "I want..." — it is more polite',
      'Always say "please" and "thank you"',
      'Practice numbers for the bill amount',
    ],
  },

  // ==================== ADDITIONAL A2 EXERCISES ====================
  {
    id: 's-a2-03',
    level: 'A2',
    title: 'Giving Directions',
    type: 'respond',
    description: 'Practice giving directions to common places. Someone asks you for help — respond clearly.',
    sentences: [
      { text: 'Excuse me, how do I get to the nearest metro station?', hint: 'Say: "Go straight for two hundred metres, then turn left. The station is on your right."' },
      { text: 'Is there a pharmacy near here?', hint: 'Say: "Yes, there is one next to the big supermarket. It is about five minutes walk."' },
      { text: 'Can you tell me where the post office is?', hint: 'Say: "The post office is opposite the park, near the hospital."' },
      { text: 'How far is the railway station from here?', hint: 'Say: "It is about three kilometres. You should take an auto rickshaw."' },
    ],
    topic: 'Navigation',
    tips: [
      'Use direction words: straight, left, right, opposite, next to, near',
      'Give distances: "five minutes walk", "two kilometres"',
      'Suggest transport if it is far: auto, bus, metro',
    ],
  },
  {
    id: 's-a2-04',
    level: 'A2',
    title: 'Talking About Your Hobbies',
    type: 'describe',
    description: 'Describe your hobbies and free-time activities. Speak for at least 30 seconds about each topic.',
    sentences: [
      { text: 'What do you do in your free time?', hint: 'Talk about 2-3 activities you enjoy' },
      { text: 'Describe your favourite hobby.', hint: 'Say when you started, how often you do it, and why you like it' },
      { text: 'What sport do you like to watch or play?', hint: 'Mention the sport, how often, and with whom' },
      { text: 'Do you prefer indoor or outdoor activities? Why?', hint: 'Give your preference and at least two reasons' },
    ],
    topic: 'Hobbies & Interests',
    tips: [
      'Use frequency adverbs: always, usually, sometimes, never',
      'Give reasons using "because" and "so"',
      'Try to speak in full sentences, not just one-word answers',
    ],
  },
  {
    id: 's-a2-05',
    level: 'A2',
    title: 'Making a Phone Call',
    type: 'role-play',
    description: 'Role-play a phone conversation — you are calling to book a doctor\'s appointment.',
    sentences: [],
    rolePlayScript: [
      { speaker: 'system', line: 'Good morning, City Hospital. How can I help you?' },
      { speaker: 'user', line: 'Good morning. I would like to book an appointment with Dr. Patel, please.', hint: 'Speak politely and clearly' },
      { speaker: 'system', line: 'Sure. Is it for a general check-up or a specific problem?' },
      { speaker: 'user', line: 'It is for a general check-up.', hint: 'Keep your response simple and clear' },
      { speaker: 'system', line: 'Dr. Patel is available on Thursday at three PM. Does that work for you?' },
      { speaker: 'user', line: 'Yes, Thursday at three PM is fine. Thank you.', hint: 'Confirm the time and day' },
      { speaker: 'system', line: 'May I have your name and phone number, please?' },
      { speaker: 'user', line: 'My name is Arjun Kumar. My number is nine eight seven six five four three two one zero.', hint: 'Say the phone number digit by digit' },
    ],
    topic: 'Phone Calls',
    tips: [
      'Say phone numbers one digit at a time clearly',
      'Use "I would like to..." for polite requests',
      'Confirm details by repeating the day and time',
    ],
  },

  // ==================== ADDITIONAL B1 EXERCISES ====================
  {
    id: 's-b1-03',
    level: 'B1',
    title: 'Job Interview Practice',
    type: 'respond',
    description: 'Practice answering common job interview questions. Give full, structured answers.',
    sentences: [
      { text: 'Tell me about yourself.', hint: 'Structure: Name → Education → Experience → Skills → Why this job' },
      { text: 'Why do you want to work for our company?', hint: 'Mention company values, growth opportunities, or your interest in their products' },
      { text: 'What are your strengths?', hint: 'Give 2-3 strengths with brief examples' },
      { text: 'What is your biggest weakness?', hint: 'Name a real weakness and explain how you are improving it' },
      { text: 'Where do you see yourself in five years?', hint: 'Talk about growth, learning, and contributing to the company' },
      { text: 'Do you have any questions for us?', hint: 'Ask about team culture, growth opportunities, or projects' },
    ],
    topic: 'Career',
    tips: [
      'Use the STAR method for examples: Situation, Task, Action, Result',
      'Avoid vague answers — be specific with examples',
      'Practice speaking for 1-2 minutes per answer',
      'Don\'t say "I don\'t have any weaknesses" — it sounds dishonest',
    ],
  },
  {
    id: 's-b1-04',
    level: 'B1',
    title: 'Describing a Past Experience',
    type: 'describe',
    description: 'Describe past events and experiences using past tenses. Speak in detail for at least one minute per topic.',
    sentences: [
      { text: 'Describe a memorable trip you took.', hint: 'Where did you go? Who were you with? What did you do? Why was it special?' },
      { text: 'Talk about a challenge you faced and how you overcame it.', hint: 'Use past simple and past continuous: "I was working when..." / "I decided to..."' },
      { text: 'Describe the best meal you have ever had.', hint: 'Where was it? What did you eat? Why was it special?' },
      { text: 'Tell me about a time you helped someone.', hint: 'What happened? How did you feel? What was the result?' },
    ],
    topic: 'Storytelling',
    tips: [
      'Use past simple for completed actions: "I went", "I saw"',
      'Use past continuous for background: "It was raining when I arrived"',
      'Add feelings and opinions to make your story interesting',
      'Use time connectors: first, then, after that, finally',
    ],
  },
  {
    id: 's-b1-05',
    level: 'B1',
    title: 'Expressing Opinions',
    type: 'respond',
    description: 'Practice expressing and supporting your opinions on everyday topics.',
    sentences: [
      { text: 'Do you think social media is good or bad for young people?', hint: 'Start with: "In my opinion..." then give 2 reasons' },
      { text: 'Should schools teach coding to all students?', hint: 'Use: "I believe that... because..."' },
      { text: 'Is it better to live in a city or a village?', hint: 'Compare both and give your preference with reasons' },
      { text: 'What do you think about online shopping vs going to shops?', hint: 'Use: "On one hand... on the other hand..."' },
    ],
    topic: 'Opinions & Arguments',
    tips: [
      'Always support your opinion with reasons or examples',
      'Useful phrases: "I think...", "In my opinion...", "I believe that..."',
      'Show both sides before giving your view',
    ],
  },

  // ==================== ADDITIONAL B2 EXERCISES ====================
  {
    id: 's-b2-03',
    level: 'B2',
    title: 'Presenting Data and Trends',
    type: 'describe',
    description: 'Practice describing graphs, charts, and trends — a key skill for IELTS and professional presentations.',
    sentences: [
      { text: 'Describe a chart showing India\'s GDP growth from 2010 to 2024.', hint: 'Use trend language: "increased steadily", "rose sharply", "experienced a decline in 2020"' },
      { text: 'Explain the trend in smartphone usage in rural India.', hint: 'Use: "There has been a significant increase...", "The figure doubled between..."' },
      { text: 'Describe the shift from cash to digital payments in India.', hint: 'Use comparisons: "while cash transactions declined, UPI payments surged"' },
    ],
    topic: 'Data & Presentations',
    tips: [
      'Key trend words: increased, decreased, remained stable, fluctuated, peaked, plummeted',
      'Use approximate language: roughly, approximately, about, nearly',
      'Structure: Overview → Main trends → Specific data → Conclusion',
    ],
  },
  {
    id: 's-b2-04',
    level: 'B2',
    title: 'Debate: Should Work From Home Be Permanent?',
    type: 'role-play',
    description: 'Participate in a debate about remote work. You will argue FOR permanent work from home.',
    sentences: [],
    rolePlayScript: [
      { speaker: 'system', line: 'Today we debate whether work from home should become permanent. Please present your argument in favour.' },
      { speaker: 'user', line: 'Thank you. I strongly believe that permanent work from home benefits both employees and companies.', hint: 'State your thesis clearly' },
      { speaker: 'system', line: 'But don\'t you think collaboration suffers when people work remotely?' },
      { speaker: 'user', line: 'That is a fair point. However, studies show that productivity actually increases with remote work, and collaboration tools like video conferencing have made virtual teamwork highly effective.', hint: 'Acknowledge the counter-argument, then refute with evidence' },
      { speaker: 'system', line: 'What about the mental health impact of isolation?' },
      { speaker: 'user', line: 'While isolation can be a concern, companies can address this through regular virtual social events and hybrid models. Moreover, eliminating long commutes in cities like Bangalore and Mumbai significantly reduces stress.', hint: 'Address the concern and provide solutions' },
      { speaker: 'system', line: 'Please give your closing statement.' },
      { speaker: 'user', line: 'In conclusion, remote work reduces commute time, increases productivity, and promotes a better quality of life. The evidence strongly supports making it a permanent option.', hint: 'Summarise your key arguments' },
    ],
    topic: 'Debate & Argumentation',
    tips: [
      'Use formal debate language: "I contend that...", "The evidence suggests..."',
      'Acknowledge opposing views before countering them',
      'Provide specific examples or data to support your points',
      'Maintain a respectful and professional tone throughout',
    ],
  },
  {
    id: 's-b2-05',
    level: 'B2',
    title: 'Giving a Short Presentation',
    type: 'describe',
    description: 'Practice giving a 2-minute presentation on a familiar topic. Structure your talk with an introduction, body, and conclusion.',
    sentences: [
      { text: 'Give a 2-minute presentation on the importance of learning English in India.', hint: 'Introduction: Hook → Body: 3 reasons with examples → Conclusion: Summary + call to action' },
      { text: 'Present the pros and cons of social media for students.', hint: 'Start with a question or statistic, then present a balanced view' },
      { text: 'Talk about a recent technology that has changed your life.', hint: 'Describe what it is, how you use it, and why it matters' },
    ],
    topic: 'Presentations',
    tips: [
      'Start with a hook: a question, statistic, or interesting fact',
      'Signpost your talk: "Firstly...", "Moving on to...", "In conclusion..."',
      'Maintain eye contact (or look at the camera) and avoid reading from notes',
      'Aim for 2 minutes — practice with a timer',
    ],
  },

  // ==================== ADDITIONAL C1 EXERCISES ====================
  {
    id: 's-c1-03',
    level: 'C1',
    title: 'Diplomatic Disagreement',
    type: 'respond',
    description: 'Practice disagreeing politely and diplomatically in professional settings.',
    sentences: [
      { text: 'I think we should move all our operations to the cloud immediately without any testing phase.', hint: 'Disagree politely: "I see your point, however, I would suggest that a phased approach might be more prudent..."' },
      { text: 'In my view, English should be the only language used in Indian offices.', hint: 'Challenge respectfully: "While I understand the rationale, I would argue that multilingual policies actually foster inclusivity..."' },
      { text: 'We should cut the marketing budget entirely and rely solely on word of mouth.', hint: 'Counter with evidence: "I appreciate the sentiment, but data consistently shows that a balanced approach yields better results..."' },
      { text: 'I believe AI will completely replace human workers within the next decade.', hint: 'Offer nuance: "That is an interesting perspective. However, most experts suggest that AI will augment rather than replace..."' },
    ],
    topic: 'Professional Communication',
    tips: [
      'Never say "You are wrong." Instead: "I see it differently..." or "I respectfully disagree..."',
      'Acknowledge the other person\'s point before presenting your counter-argument',
      'Use softening language: "Perhaps...", "It might be worth considering...", "I would tend to think..."',
      'Support your disagreement with evidence or logical reasoning',
    ],
  },
  {
    id: 's-c1-04',
    level: 'C1',
    title: 'Summarising Complex Information',
    type: 'describe',
    description: 'Practice summarising complex passages concisely. Read the prompt and provide a 1-minute spoken summary.',
    sentences: [
      { text: 'Summarise the key arguments for and against India\'s reservation system in education.', hint: 'Cover: Historical rationale, current impact, criticisms about merit, defense about equity, possible reforms' },
      { text: 'Explain the concept of Net Zero emissions and why it matters for India.', hint: 'Define Net Zero, India\'s 2070 target, challenges (coal dependency, development needs), opportunities (solar, green hydrogen)' },
      { text: 'Summarise how UPI has transformed financial transactions in India.', hint: 'Cover: What UPI is, scale of adoption, impact on small businesses, financial inclusion, global recognition' },
    ],
    topic: 'Academic & Professional',
    tips: [
      'Start with the main idea, then add 2-3 supporting details',
      'Use concise language — avoid repeating information',
      'Use transition phrases: "The key point is...", "Additionally...", "In essence..."',
      'Aim for 60-90 seconds per summary',
    ],
  },
  {
    id: 's-c1-05',
    level: 'C1',
    title: 'Spontaneous Speaking: Abstract Topics',
    type: 'respond',
    description: 'Develop fluency by speaking spontaneously on abstract topics for 2 minutes each.',
    sentences: [
      { text: 'What does success mean to you? Has your definition changed over time?', hint: 'Explore personal growth, societal vs personal definitions, Indian cultural context' },
      { text: 'Is it possible to be truly objective? Why or why not?', hint: 'Consider journalism, science, human bias, cultural perspectives' },
      { text: 'How has globalisation affected local cultures in India?', hint: 'Discuss food, fashion, language, festivals — both positive and negative effects' },
      { text: 'What role should art and creativity play in education?', hint: 'Consider holistic development, innovation, Indian classical arts, school curriculum' },
    ],
    topic: 'Abstract Discussion',
    tips: [
      'Take 10 seconds to organise your thoughts before speaking',
      'Use a clear structure even for spontaneous speech: Position → Reasoning → Examples → Conclusion',
      'Use sophisticated vocabulary and complex sentence structures',
      'Don\'t worry about being perfect — fluency and coherence matter more',
    ],
  },
];

export function getSpeakingExercisesByLevel(level: string): SpeakingExercise[] {
  return speakingExercises.filter((e) => e.level === level);
}
