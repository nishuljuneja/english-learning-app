import { type CEFRLevel } from '../lib/firestore';

// ------------------------------------------------------------------
// Listening Exercises — uses browser SpeechSynthesis API to read text
// aloud. Exercises include dictation, gap-fill, and comprehension.
// ------------------------------------------------------------------

export interface ListeningExercise {
  id: string;
  level: CEFRLevel;
  title: string;
  type: 'dictation' | 'gap-fill' | 'comprehension';
  /** The full text that will be spoken aloud (hidden from user) */
  transcript: string;
  /** For gap-fill: the transcript with ___N___ placeholders */
  gapText?: string;
  /** For gap-fill: the correct words for each gap */
  gaps?: string[];
  /** For comprehension: questions asked after listening */
  questions?: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  /** For dictation: sentences spoken one at a time */
  sentences?: string[];
  topic: string;
  duration: string;
  speechRate?: number; // 0.5–2.0, default 0.9
}

export const listeningExercises: ListeningExercise[] = [
  // ==================== A1 ====================
  {
    id: 'l-a1-01',
    level: 'A1',
    title: 'At the Train Station',
    type: 'dictation',
    transcript: 'Excuse me. Where is the train to Delhi? Platform number three. Thank you very much. The train leaves at ten o clock.',
    sentences: [
      'Excuse me.',
      'Where is the train to Delhi?',
      'Platform number three.',
      'Thank you very much.',
      'The train leaves at ten o clock.',
    ],
    topic: 'Travel',
    duration: '2 min',
    speechRate: 0.8,
  },
  {
    id: 'l-a1-02',
    level: 'A1',
    title: 'Ordering Food',
    type: 'gap-fill',
    transcript: 'I would like two cups of tea and one plate of samosa please. How much does it cost? It costs fifty rupees. Here you go. Thank you.',
    gapText: 'I would like two cups of ___1___ and one plate of ___2___ please. How much does it ___3___? It costs ___4___ rupees. Here you go. Thank you.',
    gaps: ['tea', 'samosa', 'cost', 'fifty'],
    topic: 'Food & Drink',
    duration: '2 min',
    speechRate: 0.8,
  },
  {
    id: 'l-a1-03',
    level: 'A1',
    title: 'Meeting a New Friend',
    type: 'comprehension',
    transcript: 'Hello, my name is Priya. I am from Bangalore. I am a teacher. I teach English at a school. I like reading books and watching movies. My favourite colour is blue. I have one brother and one sister.',
    questions: [
      { question: 'What is Priya\'s job?', options: ['Doctor', 'Teacher', 'Engineer', 'Student'], correctAnswer: 'Teacher' },
      { question: 'Where is Priya from?', options: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai'], correctAnswer: 'Bangalore' },
      { question: 'What is her favourite colour?', options: ['Red', 'Green', 'Blue', 'Yellow'], correctAnswer: 'Blue' },
      { question: 'How many siblings does she have?', options: ['None', 'One', 'Two', 'Three'], correctAnswer: 'Two' },
    ],
    topic: 'Introductions',
    duration: '2 min',
    speechRate: 0.8,
  },

  // ==================== A2 ====================
  {
    id: 'l-a2-01',
    level: 'A2',
    title: 'A Phone Call',
    type: 'comprehension',
    transcript: 'Hello, this is Ravi calling from ABC Company. I would like to speak to Mr. Sharma please. I am sorry, Mr. Sharma is in a meeting right now. Can I take a message? Yes, please tell him that the meeting tomorrow has been moved to three o clock instead of two o clock. Sure, I will pass on the message. Thank you, goodbye.',
    questions: [
      { question: 'Who is calling?', options: ['Mr. Sharma', 'Ravi', 'The receptionist', 'The manager'], correctAnswer: 'Ravi' },
      { question: 'Why can\'t Mr. Sharma talk?', options: ['He is on holiday', 'He is in a meeting', 'He is sick', 'He left the office'], correctAnswer: 'He is in a meeting' },
      { question: 'What time is the meeting now?', options: ['1 o\'clock', '2 o\'clock', '3 o\'clock', '4 o\'clock'], correctAnswer: '3 o\'clock' },
    ],
    topic: 'Business',
    duration: '3 min',
    speechRate: 0.85,
  },
  {
    id: 'l-a2-02',
    level: 'A2',
    title: 'Giving Directions',
    type: 'gap-fill',
    transcript: 'Go straight on this road for about two hundred metres. Then turn left at the traffic signal. You will see a big temple on your right side. The hospital is just next to the temple. It takes about ten minutes to walk there.',
    gapText: 'Go ___1___ on this road for about two hundred metres. Then turn ___2___ at the traffic signal. You will see a big ___3___ on your right side. The ___4___ is just next to the temple. It takes about ___5___ minutes to walk there.',
    gaps: ['straight', 'left', 'temple', 'hospital', 'ten'],
    topic: 'Directions',
    duration: '3 min',
    speechRate: 0.85,
  },
  {
    id: 'l-a2-03',
    level: 'A2',
    title: 'Weekend Plans',
    type: 'dictation',
    transcript: 'This weekend I am going to visit my grandparents. They live in a small village near Jaipur. We will eat delicious food and play cricket in the evening.',
    sentences: [
      'This weekend I am going to visit my grandparents.',
      'They live in a small village near Jaipur.',
      'We will eat delicious food and play cricket in the evening.',
    ],
    topic: 'Daily Life',
    duration: '2 min',
    speechRate: 0.85,
  },

  // ==================== B1 ====================
  {
    id: 'l-b1-01',
    level: 'B1',
    title: 'Job Interview Tips',
    type: 'comprehension',
    transcript: 'Preparing for a job interview can be stressful, but with the right preparation, you can feel confident. First, research the company thoroughly. Know what they do, who their customers are, and what their values are. Second, practice common interview questions with a friend or family member. Questions like tell me about yourself and what are your strengths and weaknesses are almost always asked. Third, dress professionally. In India, formal attire like a shirt and trousers for men or a salwar suit or formal dress for women is usually appropriate. Finally, arrive at least fifteen minutes early. Being late creates a very bad first impression. Remember, the interviewer wants you to succeed, so be yourself and stay positive.',
    questions: [
      { question: 'What should you research before an interview?', options: ['The salary range', 'The company, its customers and values', 'The interviewer\'s background', 'Other job openings'], correctAnswer: 'The company, its customers and values' },
      { question: 'How early should you arrive?', options: ['5 minutes', '10 minutes', '15 minutes', '30 minutes'], correctAnswer: '15 minutes' },
      { question: 'What creates a bad first impression?', options: ['Being nervous', 'Asking questions', 'Being late', 'Wearing traditional clothes'], correctAnswer: 'Being late' },
    ],
    topic: 'Career',
    duration: '4 min',
    speechRate: 0.9,
  },
  {
    id: 'l-b1-02',
    level: 'B1',
    title: 'News Report: Monsoon Season',
    type: 'gap-fill',
    transcript: 'The monsoon season has arrived in Kerala, bringing heavy rainfall across the southern state. The India Meteorological Department has issued a warning for the next seventy two hours. Several districts have reported flooding, and over five thousand people have been moved to relief camps. Schools in affected areas will remain closed until further notice. The government has deployed rescue teams and is distributing food and clean water to those affected.',
    gapText: 'The ___1___ season has arrived in Kerala, bringing heavy ___2___ across the southern state. The India Meteorological Department has issued a ___3___ for the next seventy two hours. Several districts have reported ___4___, and over five thousand people have been moved to relief camps. Schools in affected areas will remain ___5___ until further notice.',
    gaps: ['monsoon', 'rainfall', 'warning', 'flooding', 'closed'],
    topic: 'News & Weather',
    duration: '4 min',
    speechRate: 0.9,
  },
  {
    id: 'l-b1-03',
    level: 'B1',
    title: 'Booking a Hotel Room',
    type: 'dictation',
    transcript: 'I would like to book a double room for three nights. Do you have any rooms available from the fifteenth to the eighteenth of March? Does the room include breakfast? Is there free wifi in the hotel?',
    sentences: [
      'I would like to book a double room for three nights.',
      'Do you have any rooms available from the fifteenth to the eighteenth of March?',
      'Does the room include breakfast?',
      'Is there free wifi in the hotel?',
    ],
    topic: 'Travel',
    duration: '3 min',
    speechRate: 0.9,
  },

  // ==================== B2 ====================
  {
    id: 'l-b2-01',
    level: 'B2',
    title: 'Climate Change Discussion',
    type: 'comprehension',
    transcript: 'Climate change is arguably the most pressing challenge of our generation. The scientific consensus is clear. Human activities, particularly the burning of fossil fuels and deforestation, have significantly increased the concentration of greenhouse gases in the atmosphere. India is especially vulnerable to the effects of climate change. Rising temperatures are affecting agricultural productivity, glacial melting in the Himalayas threatens water security for millions, and extreme weather events like cyclones and heatwaves are becoming more frequent and intense. However, India is also making significant strides in renewable energy. The country has become one of the largest producers of solar energy in the world, and the government has set ambitious targets for reducing carbon emissions by twenty thirty.',
    questions: [
      { question: 'What is the main cause of increased greenhouse gases?', options: ['Natural cycles', 'Volcanic activity', 'Burning fossil fuels and deforestation', 'Solar radiation'], correctAnswer: 'Burning fossil fuels and deforestation' },
      { question: 'How does glacial melting affect India?', options: ['It increases tourism', 'It threatens water security', 'It improves agriculture', 'It creates new jobs'], correctAnswer: 'It threatens water security' },
      { question: 'What progress has India made?', options: ['Built nuclear plants', 'Become a leader in solar energy', 'Stopped using fossil fuels', 'Planted the most trees globally'], correctAnswer: 'Become a leader in solar energy' },
    ],
    topic: 'Environment',
    duration: '5 min',
    speechRate: 0.95,
  },
  {
    id: 'l-b2-02',
    level: 'B2',
    title: 'University Lecture: Economics',
    type: 'gap-fill',
    transcript: 'The concept of supply and demand is fundamental to understanding how markets work. When demand for a product increases but supply remains constant, prices tend to rise. Conversely, when supply exceeds demand, prices generally fall. In the Indian context, we can observe this clearly with agricultural commodities. During harvest season, when supply is abundant, prices for crops like wheat and rice tend to decrease. However, during off season or when there is a drought, reduced supply leads to significant price increases.',
    gapText: 'The concept of ___1___ and demand is fundamental to understanding how markets work. When demand for a product increases but supply remains ___2___, prices tend to rise. ___3___, when supply exceeds demand, prices generally fall. In the Indian context, we can observe this clearly with agricultural ___4___. During harvest season, when supply is ___5___, prices for crops like wheat and rice tend to decrease.',
    gaps: ['supply', 'constant', 'Conversely', 'commodities', 'abundant'],
    topic: 'Economics',
    duration: '5 min',
    speechRate: 0.95,
  },

  // ==================== C1 ====================
  {
    id: 'l-c1-01',
    level: 'C1',
    title: 'TED-Style Talk: Innovation in India',
    type: 'comprehension',
    transcript: 'What makes India unique in the global innovation landscape is a concept we call jugaad, or frugal innovation. While Silicon Valley focuses on cutting edge technology with massive budgets, Indian innovators have historically excelled at finding creative, low cost solutions to complex problems. Consider the Jaipur Foot, a prosthetic limb that costs a fraction of Western equivalents but provides remarkable mobility. Or the Mitticool, a clay refrigerator that works without electricity. These innovations emerge from necessity and demonstrate that constraints can actually fuel creativity rather than hinder it. The challenge now is to scale these innovations while maintaining their accessibility. As India positions itself as a global technology hub, the question is not whether we can innovate, but whether we can do so inclusively, ensuring that the benefits reach the seven hundred million Indians who still live in rural areas.',
    questions: [
      { question: 'What is "jugaad"?', options: ['A coding framework', 'Frugal innovation', 'A government scheme', 'A startup accelerator'], correctAnswer: 'Frugal innovation' },
      { question: 'What is special about the Jaipur Foot?', options: ['It uses AI', 'It costs much less than Western alternatives', 'It was invented in Silicon Valley', 'It runs on solar power'], correctAnswer: 'It costs much less than Western alternatives' },
      { question: 'According to the speaker, what fuels creativity?', options: ['Large budgets', 'Government support', 'Constraints', 'Competition'], correctAnswer: 'Constraints' },
      { question: 'What is the key challenge mentioned?', options: ['Getting funding', 'Scaling innovations inclusively', 'Competing with China', 'Training more engineers'], correctAnswer: 'Scaling innovations inclusively' },
    ],
    topic: 'Innovation & Society',
    duration: '6 min',
    speechRate: 1.0,
  },
  {
    id: 'l-c1-02',
    level: 'C1',
    title: 'Academic Lecture: Constitutional Law',
    type: 'dictation',
    transcript: 'The Indian Constitution is the longest written constitution of any sovereign nation. It was drafted over a period of nearly three years. The fundamental rights enshrined in Part Three guarantee individual liberties against state overreach.',
    sentences: [
      'The Indian Constitution is the longest written constitution of any sovereign nation.',
      'It was drafted over a period of nearly three years.',
      'The fundamental rights enshrined in Part Three guarantee individual liberties against state overreach.',
    ],
    topic: 'Law & Government',
    duration: '4 min',
    speechRate: 1.0,
  },

  // ==================== ADDITIONAL A1 EXERCISES ====================
  {
    id: 'l-a1-04',
    level: 'A1',
    title: 'Introducing Yourself',
    type: 'dictation',
    transcript: 'Hello. My name is Anita. I am from Jaipur. I am twenty years old. I am a student. I like reading books. Nice to meet you.',
    sentences: [
      'Hello. My name is Anita.',
      'I am from Jaipur.',
      'I am twenty years old.',
      'I am a student. I like reading books.',
      'Nice to meet you.',
    ],
    topic: 'Everyday Life',
    duration: '2 min',
    speechRate: 0.7,
  },
  {
    id: 'l-a1-05',
    level: 'A1',
    title: 'At the Grocery Shop',
    type: 'gap-fill',
    transcript: 'Good morning. I need one kilo of rice and half a kilo of sugar. How much does it cost? It costs one hundred and fifty rupees. Here you are. Thank you. Have a nice day.',
    gapText: 'Good morning. I need one ___1___ of rice and ___2___ a kilo of sugar. How much does it ___3___? It costs one hundred and fifty ___4___. Here you are. Thank you. Have a ___5___ day.',
    gaps: ['kilo', 'half', 'cost', 'rupees', 'nice'],
    topic: 'Shopping',
    duration: '2 min',
    speechRate: 0.7,
  },
  {
    id: 'l-a1-06',
    level: 'A1',
    title: 'My Family',
    type: 'comprehension',
    transcript: 'My name is Ravi. I have a big family. My father is a teacher. My mother is a nurse. I have one brother and two sisters. My brother is older than me. My sisters are younger. We live in a small house in Lucknow. We are very happy together.',
    questions: [
      { question: 'What is Ravi\'s father\'s job?', options: ['Doctor', 'Teacher', 'Engineer', 'Driver'], correctAnswer: 'Teacher' },
      { question: 'How many sisters does Ravi have?', options: ['One', 'Two', 'Three', 'None'], correctAnswer: 'Two' },
      { question: 'Where does the family live?', options: ['Delhi', 'Mumbai', 'Lucknow', 'Jaipur'], correctAnswer: 'Lucknow' },
    ],
    topic: 'Family',
    duration: '2 min',
    speechRate: 0.7,
  },

  // ==================== ADDITIONAL A2 EXERCISES ====================
  {
    id: 'l-a2-04',
    level: 'A2',
    title: 'Planning a Weekend Trip',
    type: 'comprehension',
    transcript: 'This weekend, Meera and her friends are planning to go to Rishikesh. They are going to take the early morning bus on Saturday. The journey takes about six hours from Delhi. They want to try river rafting and visit the famous temples. They will stay in a hostel near the river. The rooms cost eight hundred rupees per night. They plan to return on Sunday evening.',
    questions: [
      { question: 'Where are they going?', options: ['Shimla', 'Rishikesh', 'Manali', 'Goa'], correctAnswer: 'Rishikesh' },
      { question: 'How long is the journey from Delhi?', options: ['Two hours', 'Four hours', 'Six hours', 'Eight hours'], correctAnswer: 'Six hours' },
      { question: 'What activity do they want to try?', options: ['Skiing', 'Paragliding', 'River rafting', 'Surfing'], correctAnswer: 'River rafting' },
      { question: 'How much does a room cost per night?', options: ['500 rupees', '800 rupees', '1000 rupees', '1200 rupees'], correctAnswer: '800 rupees' },
    ],
    topic: 'Travel & Plans',
    duration: '3 min',
    speechRate: 0.85,
  },
  {
    id: 'l-a2-05',
    level: 'A2',
    title: 'A Phone Conversation',
    type: 'dictation',
    transcript: 'Hello, this is Amit calling. Can I speak to Mr. Sharma please? I am sorry, he is not available right now. Can I take a message? Yes, please tell him to call me back. My number is nine eight seven six five four three two one zero. Thank you, I will pass on the message.',
    sentences: [
      'Hello, this is Amit calling.',
      'Can I speak to Mr. Sharma please?',
      'I am sorry, he is not available right now.',
      'Can I take a message?',
      'Yes, please tell him to call me back.',
      'My number is nine eight seven six five four three two one zero.',
      'Thank you, I will pass on the message.',
    ],
    topic: 'Communication',
    duration: '3 min',
    speechRate: 0.85,
  },
  {
    id: 'l-a2-06',
    level: 'A2',
    title: 'Describing Daily Routine',
    type: 'gap-fill',
    transcript: 'I usually wake up at six thirty in the morning. First, I brush my teeth and take a shower. Then I have breakfast with my family. I leave for office at eight o clock. I work from nine to five. After work, I go to the gym for one hour. I have dinner at eight and go to bed by ten thirty.',
    gapText: 'I usually wake up at six thirty in the ___1___. First, I brush my ___2___ and take a shower. Then I have ___3___ with my family. I leave for office at ___4___ o clock. I work from nine to ___5___. After work, I go to the ___6___ for one hour. I have dinner at eight and go to ___7___ by ten thirty.',
    gaps: ['morning', 'teeth', 'breakfast', 'eight', 'five', 'gym', 'bed'],
    topic: 'Daily Life',
    duration: '3 min',
    speechRate: 0.85,
  },

  // ==================== ADDITIONAL B1 EXERCISES ====================
  {
    id: 'l-b1-04',
    level: 'B1',
    title: 'Job Interview Tips',
    type: 'comprehension',
    transcript: 'When preparing for a job interview in India, there are several things you should keep in mind. First, research the company thoroughly before the interview. Know their products, recent news, and company culture. Second, dress formally unless told otherwise. In most Indian companies, a formal shirt and trousers are expected. Third, arrive at least fifteen minutes early. Punctuality shows professionalism. During the interview, maintain eye contact and speak clearly. When asked about your weaknesses, be honest but show how you are working to improve. Finally, always send a thank you email after the interview. This small gesture can make a big difference.',
    questions: [
      { question: 'What should you do before the interview?', options: ['Buy new clothes', 'Research the company', 'Call the HR manager', 'Practice coding'], correctAnswer: 'Research the company' },
      { question: 'How early should you arrive?', options: ['5 minutes', '10 minutes', '15 minutes', '30 minutes'], correctAnswer: '15 minutes' },
      { question: 'What should you do when asked about weaknesses?', options: ['Say you have none', 'Be honest and show improvement efforts', 'Change the topic', 'Ask the interviewer about their weaknesses'], correctAnswer: 'Be honest and show improvement efforts' },
      { question: 'What should you do after the interview?', options: ['Call them every day', 'Send a thank you email', 'Send a gift', 'Visit the office again'], correctAnswer: 'Send a thank you email' },
    ],
    topic: 'Career & Work',
    duration: '4 min',
    speechRate: 0.9,
  },
  {
    id: 'l-b1-05',
    level: 'B1',
    title: 'Indian Festival: Diwali',
    type: 'gap-fill',
    transcript: 'Diwali is the festival of lights and one of the most important celebrations in India. People clean and decorate their homes weeks before the festival. On the night of Diwali, families light diyas and candles to welcome Goddess Lakshmi. Children enjoy bursting crackers, although many cities now encourage eco-friendly celebrations. Families exchange sweets and gifts with neighbours and relatives. Traditional sweets like gulab jamun and barfi are prepared at home. The festival reminds us that light always wins over darkness.',
    gapText: 'Diwali is the festival of ___1___ and one of the most important ___2___ in India. People clean and ___3___ their homes weeks before the festival. On the night of Diwali, families light ___4___ and candles to welcome Goddess Lakshmi. Children enjoy bursting ___5___, although many cities now encourage eco-friendly celebrations. Families exchange ___6___ and gifts with neighbours and relatives. Traditional sweets like gulab jamun and barfi are prepared at home. The festival reminds us that light always wins over ___7___.',
    gaps: ['lights', 'celebrations', 'decorate', 'diyas', 'crackers', 'sweets', 'darkness'],
    topic: 'Culture & Festivals',
    duration: '4 min',
    speechRate: 0.9,
  },

  // ==================== ADDITIONAL B2 EXERCISES ====================
  {
    id: 'l-b2-03',
    level: 'B2',
    title: 'Climate Change and India',
    type: 'comprehension',
    transcript: 'India faces unique challenges when it comes to climate change. As the third largest emitter of greenhouse gases globally, the country must balance economic development with environmental responsibility. Rising temperatures have led to more frequent heat waves, particularly in Rajasthan and central India, where temperatures regularly exceed forty five degrees in summer. The monsoon patterns are also shifting, causing both devastating floods in some regions and severe droughts in others. The agricultural sector, which employs nearly half of India\'s workforce, is particularly vulnerable. However, India has also made significant progress in renewable energy. The country\'s solar capacity has increased dramatically, and India now has one of the world\'s largest solar parks in Gujarat.',
    questions: [
      { question: 'What is India\'s position in global greenhouse gas emissions?', options: ['First', 'Second', 'Third', 'Fifth'], correctAnswer: 'Third' },
      { question: 'What percentage of India\'s workforce is in agriculture?', options: ['About 25%', 'About 40%', 'About 50%', 'About 60%'], correctAnswer: 'About 50%' },
      { question: 'What has happened to monsoon patterns?', options: ['They stopped completely', 'They are shifting', 'They became more regular', 'No change'], correctAnswer: 'They are shifting' },
      { question: 'Where is one of the world\'s largest solar parks?', options: ['Rajasthan', 'Tamil Nadu', 'Gujarat', 'Maharashtra'], correctAnswer: 'Gujarat' },
    ],
    topic: 'Environment & Science',
    duration: '5 min',
    speechRate: 0.95,
  },
  {
    id: 'l-b2-04',
    level: 'B2',
    title: 'News Report: Digital India',
    type: 'gap-fill',
    transcript: 'The Digital India initiative has transformed how citizens interact with government services. Launched in two thousand fifteen, the programme aims to bridge the digital divide between urban and rural India. The introduction of the Unified Payments Interface, commonly known as UPI, has revolutionised financial transactions. India now processes over ten billion digital transactions per month, making it the global leader in real-time digital payments. The Aadhaar biometric system has enabled direct benefit transfers, reducing corruption and ensuring subsidies reach the intended beneficiaries. Critics, however, raise concerns about data privacy and the exclusion of those without digital literacy.',
    gapText: 'The Digital India initiative has ___1___ how citizens interact with government services. Launched in two thousand fifteen, the programme aims to bridge the digital ___2___ between urban and rural India. The introduction of the Unified Payments ___3___, commonly known as UPI, has revolutionised financial transactions. India now processes over ten ___4___ digital transactions per month, making it the global leader in real-time digital payments. The Aadhaar ___5___ system has enabled direct benefit transfers, reducing ___6___ and ensuring subsidies reach the intended beneficiaries. Critics, however, raise concerns about data ___7___ and the exclusion of those without digital literacy.',
    gaps: ['transformed', 'divide', 'Interface', 'billion', 'biometric', 'corruption', 'privacy'],
    topic: 'Technology & Society',
    duration: '5 min',
    speechRate: 0.95,
  },
  {
    id: 'l-b2-05',
    level: 'B2',
    title: 'Business English: Negotiation',
    type: 'dictation',
    transcript: 'In Indian business culture, negotiations tend to be relationship oriented rather than purely transactional. Building trust over multiple meetings is considered essential. It is common for discussions to begin with personal conversations before moving to business matters. Decision making often involves multiple stakeholders and can take longer than in Western contexts.',
    sentences: [
      'In Indian business culture, negotiations tend to be relationship oriented rather than purely transactional.',
      'Building trust over multiple meetings is considered essential.',
      'It is common for discussions to begin with personal conversations before moving to business matters.',
      'Decision making often involves multiple stakeholders and can take longer than in Western contexts.',
    ],
    topic: 'Business',
    duration: '4 min',
    speechRate: 0.95,
  },

  // ==================== ADDITIONAL C1 EXERCISES ====================
  {
    id: 'l-c1-03',
    level: 'C1',
    title: 'Philosophical Debate: Tradition vs Modernity',
    type: 'comprehension',
    transcript: 'The tension between tradition and modernity in India manifests in virtually every aspect of contemporary life. On one hand, India is home to Silicon Valley calibre technology companies and a burgeoning space programme that has successfully launched missions to Mars and the Moon. On the other hand, centuries old traditions of arranged marriage, joint family living, and caste based social hierarchies continue to shape daily existence for hundreds of millions. Some scholars argue that this duality is not contradictory but complementary, that India\'s ability to simultaneously embrace technological innovation while preserving cultural heritage represents a unique form of modernity. Others contend that certain traditional practices must be critically examined and reformed to align with contemporary values of equality and individual autonomy. The question that emerges is whether modernisation necessarily requires the abandonment of tradition, or whether a synthesis is both possible and desirable.',
    questions: [
      { question: 'What examples of modernity are mentioned?', options: ['Tourism growth', 'Tech companies and space programme', 'Military strength', 'Sports achievements'], correctAnswer: 'Tech companies and space programme' },
      { question: 'What do some scholars argue about India\'s duality?', options: ['It is harmful', 'It is contradictory', 'It is complementary', 'It is temporary'], correctAnswer: 'It is complementary' },
      { question: 'What do critics say about traditional practices?', options: ['They should all be preserved', 'They should be critically examined', 'They are irrelevant', 'They are already reformed'], correctAnswer: 'They should be critically examined' },
      { question: 'What is the central question of the passage?', options: ['Should India become Western?', 'Is tradition obsolete?', 'Can modernisation and tradition coexist?', 'Is technology bad for society?'], correctAnswer: 'Can modernisation and tradition coexist?' },
    ],
    topic: 'Philosophy & Society',
    duration: '6 min',
    speechRate: 1.0,
  },
  {
    id: 'l-c1-04',
    level: 'C1',
    title: 'Academic Lecture: Linguistic Diversity',
    type: 'gap-fill',
    transcript: 'India is home to approximately one thousand six hundred and fifty two languages, making it one of the most linguistically diverse nations on Earth. The Constitution recognises twenty two scheduled languages, but this barely scratches the surface of the country\'s remarkable variety. The phenomenon of multilingualism is not exceptional in India but rather the norm. An average urban Indian typically navigates between three or four languages daily, switching effortlessly between their mother tongue at home, the regional language for local interactions, Hindi for national communication, and English for professional or academic purposes. This cognitive flexibility, which linguists term code switching, represents a sophisticated intellectual ability that monolingual societies often fail to appreciate.',
    gapText: 'India is home to approximately one thousand six hundred and fifty two ___1___, making it one of the most linguistically ___2___ nations on Earth. The Constitution recognises twenty two ___3___ languages, but this barely scratches the surface of the country\'s remarkable variety. The phenomenon of ___4___ is not exceptional in India but rather the norm. An average urban Indian typically navigates between three or four languages daily, switching ___5___ between their mother tongue at home, the regional language for local interactions, Hindi for national communication, and English for professional or ___6___ purposes. This cognitive flexibility, which linguists term code ___7___, represents a sophisticated intellectual ability that monolingual societies often fail to appreciate.',
    gaps: ['languages', 'diverse', 'scheduled', 'multilingualism', 'effortlessly', 'academic', 'switching'],
    topic: 'Linguistics',
    duration: '5 min',
    speechRate: 1.0,
  },
];

export function getListeningExercisesByLevel(level: string): ListeningExercise[] {
  return listeningExercises.filter((e) => e.level === level);
}
