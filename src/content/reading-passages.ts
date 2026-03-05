import { type ReadingPassage } from '../lib/firestore';

// Reading passages set in Indian contexts, organized by CEFR level
// Topics are relevant to Indian daily life, culture, and current affairs

export const readingPassages: ReadingPassage[] = [
  // ==================== A1 ====================
  {
    id: 'a1-read-01',
    level: 'A1',
    title: 'My Family',
    content: `My name is Anita. I am from Pune. I am 25 years old. I live with my family.

My family is not very big. I have a father, a mother, and one brother. My father's name is Rajesh. He is a shopkeeper. My mother's name is Sunita. She is a homemaker. She makes very good food. My brother's name is Amit. He is 20 years old. He is a college student.

We have a small house. It has three rooms. We also have a dog. His name is Moti. He is brown and white.

Every morning, my mother makes chai for everyone. We drink chai together. On Sundays, we go to the park. I love my family very much.`,
    wordCount: 120,
    topic: 'Family',
    indianContext: true,
    vocabulary: ['family', 'shopkeeper', 'homemaker', 'student', 'morning'],
    questions: [
      {
        id: 'a1-r1-q1',
        type: 'multiple-choice',
        question: 'Where is Anita from?',
        questionTranslations: {
          hi: 'अनिता कहाँ से है?', ta: 'அனிதா எங்கிருந்து வருகிறாள்?',
          te: 'అనిత ఎక్కడి నుండి?', bn: 'অনিতা কোথা থেকে?',
          mr: 'अनिता कुठून आहे?', kn: 'ಅನಿತಾ ಎಲ್ಲಿಂದ?',
          ml: 'അനിത എവിടെ നിന്ന്?', gu: 'અનિતા ક્યાંથી છે?',
          pa: 'ਅਨੀਤਾ ਕਿੱਥੋਂ ਹੈ?', od: 'ଅନିତା କେଉଁଠାରୁ?', en: 'Where is Anita from?',
        },
        options: ['Mumbai', 'Pune', 'Delhi', 'Chennai'],
        correctAnswer: 'Pune',
        explanation: 'The passage says "I am from Pune."',
      },
      {
        id: 'a1-r1-q2',
        type: 'true-false',
        question: 'Anita has two brothers.',
        questionTranslations: {
          hi: 'अनिता के दो भाई हैं।', ta: 'அனிதாவுக்கு இரண்டு சகோதரர்கள் உள்ளனர்.',
          te: 'అనితకు ఇద్దరు సోదరులు ఉన్నారు.', bn: 'অনিতার দুই ভাই আছে।',
          mr: 'अनिताला दोन भाऊ आहेत.', kn: 'ಅನಿತಾಗೆ ಇಬ್ಬರು ಸಹೋದರರಿದ್ದಾರೆ.',
          ml: 'അനിതയ്ക്ക് രണ്ട് സഹോദരന്മാരുണ്ട്.', gu: 'અનિતાને બે ભાઈ છે.',
          pa: 'ਅਨੀਤਾ ਦੇ ਦੋ ਭਰਾ ਹਨ।', od: 'ଅନିତାର ଦୁଇ ଭାଇ ଅଛନ୍ତି।', en: 'Anita has two brothers.',
        },
        correctAnswer: 'False',
        explanation: 'The passage says "I have... one brother."',
      },
      {
        id: 'a1-r1-q3',
        type: 'multiple-choice',
        question: 'What does the family do every morning?',
        questionTranslations: {
          hi: 'परिवार हर सुबह क्या करता है?', ta: 'குடும்பம் ஒவ்வொரு காலையும் என்ன செய்கிறது?',
          te: 'కుటుంబం ప్రతి ఉదయం ఏం చేస్తుంది?', bn: 'পরিবার প্রতি সকালে কী করে?',
          mr: 'कुटुंब दर सकाळी काय करतो?', kn: 'ಕುಟುಂಬ ಪ್ರತಿ ಬೆಳಿಗ್ಗೆ ಏನು ಮಾಡುತ್ತದೆ?',
          ml: 'കുടുംബം ഓരോ രാവിലെയും എന്താണ് ചെയ്യുന്നത്?', gu: 'પરિવાર દર સવારે શું કરે છે?',
          pa: 'ਪਰਿਵਾਰ ਹਰ ਸਵੇਰੇ ਕੀ ਕਰਦਾ ਹੈ?', od: 'ପରିବାର ପ୍ରତିଦିନ ସକାଳେ କ\'ଣ କରେ?', en: '',
        },
        options: ['Go to the park', 'Drink chai together', 'Watch TV', 'Go to school'],
        correctAnswer: 'Drink chai together',
        explanation: 'The passage says "We drink chai together."',
      },
    ],
  },

  // ==================== A2 ====================
  {
    id: 'a2-read-01',
    level: 'A2',
    title: 'A Trip to the Market',
    content: `Last Saturday, Ravi went to the local market in his neighbourhood. He needed to buy vegetables and fruits for the week.

First, he went to the vegetable seller. He bought two kilos of tomatoes, one kilo of onions, and some green chillies. The vegetables were fresh and not very expensive. He paid ₹150 for everything.

Then, he walked to the fruit stall. He saw many fruits — mangoes, bananas, apples, and guavas. Mangoes were his favourite, but they were expensive because it was not mango season. He bought one dozen bananas for ₹60 and one kilo of apples for ₹200.

After shopping, Ravi stopped at a small tea stall. He had a cup of masala chai and ate two samosas. It was a good morning.

On his way home, he met his neighbour, Mrs. Sharma. She asked him about the prices at the market. He told her that tomatoes were cheap this week.`,
    wordCount: 160,
    topic: 'Shopping & Daily Life',
    indianContext: true,
    vocabulary: ['market', 'neighbourhood', 'vegetables', 'expensive', 'favourite', 'season', 'dozen'],
    questions: [
      {
        id: 'a2-r1-q1',
        type: 'multiple-choice',
        question: 'Why were mangoes expensive?',
        questionTranslations: {
          hi: 'आम महंगे क्यों थे?', ta: 'மாம்பழங்கள் ஏன் விலை அதிகமாக இருந்தன?',
          te: 'మామిడి పండ్లు ఎందుకు ఖరీదు?', bn: 'আম দামি কেন ছিল?',
          mr: 'आंबे महाग का होते?', kn: 'ಮಾವಿನಹಣ್ಣುಗಳು ಏಕೆ ದುಬಾರಿ?',
          ml: 'മാങ്ങ എന്തുകൊണ്ട് ചെലവേറിയതായിരുന്നു?', gu: 'કેરી મોંઘી કેમ હતી?',
          pa: 'ਅੰਬ ਮਹਿੰਗੇ ਕਿਉਂ ਸਨ?', od: 'ଆମ୍ବ ମହଙ୍ଗା କାହିଁକି ଥିଲା?', en: '',
        },
        options: [
          'They were imported',
          'It was not mango season',
          'The quality was very good',
          'The seller was expensive',
        ],
        correctAnswer: 'It was not mango season',
        explanation: 'The passage says "they were expensive because it was not mango season."',
      },
      {
        id: 'a2-r1-q2',
        type: 'multiple-choice',
        question: 'How much did Ravi spend on vegetables?',
        questionTranslations: {
          hi: 'रवि ने सब्जियों पर कितना ख़र्च किया?', ta: 'ரவி காய்கறிகளுக்கு எவ்வளவு செலவு செய்தார்?',
          te: 'రవి కూరగాయలకు ఎంత ఖర్చు చేశాడు?', bn: 'রবি সবজিতে কত খরচ করল?',
          mr: 'रवीने भाज्यांवर किती खर्च केला?', kn: 'ರವಿ ತರಕಾರಿಗಳಿಗೆ ಎಷ್ಟು ಖರ್ಚು ಮಾಡಿದ?',
          ml: 'രവി പച്ചക്കറികൾക്ക് എത്ര ചെലവഴിച്ചു?', gu: 'રવિએ શાકભાજી પર કેટલો ખર્ચ કર્યો?',
          pa: 'ਰਵੀ ਨੇ ਸਬਜ਼ੀਆਂ \'ਤੇ ਕਿੰਨਾ ਖ਼ਰਚ ਕੀਤਾ?', od: 'ରବି ପରିବା ଉପରେ କେତେ ଖର୍ଚ୍ଚ କଲେ?', en: '',
        },
        options: ['₹60', '₹150', '₹200', '₹410'],
        correctAnswer: '₹150',
        explanation: 'The passage says "He paid ₹150 for everything" (the vegetables).',
      },
      {
        id: 'a2-r1-q3',
        type: 'true-false',
        question: 'Ravi met Mrs. Sharma at the tea stall.',
        questionTranslations: {
          hi: 'रवि ने श्रीमती शर्मा से चाय की दुकान पर मुलाकात की।', ta: '',
          te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        correctAnswer: 'False',
        explanation: 'He met Mrs. Sharma "on his way home", not at the tea stall.',
      },
    ],
  },

  // ==================== B1 ====================
  {
    id: 'b1-read-01',
    level: 'B1',
    title: 'The Indian Railway Experience',
    content: `Indian Railways is one of the largest railway networks in the world. Every day, millions of people travel by train across the country. For most Indians, the train is not just a mode of transport — it is an experience.

If you have ever taken a long-distance train in India, you know what I mean. The journey begins at the station, which is always busy and full of energy. Vendors walk along the platform selling chai, samosas, and magazines. Families arrive with large bags and small children. There is an announcement on the loudspeaker, but it is often difficult to understand.

Once the train starts moving, the real experience begins. Strangers become friends within minutes. People share food with each other — this is a uniquely Indian habit that surprises many foreign travellers. Someone will always offer you a piece of their homemade paratha or a cup of chai.

The landscape changes as the train moves through different states. You might see green paddy fields in Bengal, dry deserts in Rajasthan, or coconut trees in Kerala. The train becomes a moving window into India's diversity.

However, Indian Railways also faces challenges. Trains are often delayed, stations can be overcrowded, and cleanliness is sometimes a concern. The government has been working on modernising the system with newer trains like the Vande Bharat Express.

Despite these challenges, there is something magical about an Indian train journey. It connects people from different backgrounds, languages, and cultures. For many Indians, some of their best memories are from train journeys.`,
    wordCount: 240,
    topic: 'Travel & Culture',
    indianContext: true,
    vocabulary: ['network', 'vendor', 'announcement', 'landscape', 'diversity', 'modernising', 'challenges'],
    questions: [
      {
        id: 'b1-r1-q1',
        type: 'multiple-choice',
        question: 'According to the passage, what surprises foreign travellers about Indian trains?',
        questionTranslations: {
          hi: 'लेख के अनुसार, भारतीय ट्रेनों के बारे में विदेशी यात्रियों को क्या हैरान करता है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: [
          'The speed of the trains',
          'People sharing food with strangers',
          'The number of stations',
          'The cost of tickets',
        ],
        correctAnswer: 'People sharing food with strangers',
        explanation: 'The passage says sharing food "is a uniquely Indian habit that surprises many foreign travellers."',
      },
      {
        id: 'b1-r1-q2',
        type: 'multiple-choice',
        question: 'What is the Vande Bharat Express an example of?',
        questionTranslations: {
          hi: 'वंदे भारत एक्सप्रेस किसका उदाहरण है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: [
          'A traditional train',
          'The government modernising railways',
          'A train that goes to all states',
          'The cheapest train in India',
        ],
        correctAnswer: 'The government modernising railways',
        explanation: 'The passage mentions Vande Bharat as an example of "modernising the system."',
      },
      {
        id: 'b1-r1-q3',
        type: 'short-answer',
        question: 'Name two challenges that Indian Railways faces, according to the passage.',
        questionTranslations: {
          hi: 'लेख के अनुसार, भारतीय रेलवे के सामने दो चुनौतियों का नाम बताएं।',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        correctAnswer: 'Delays and overcrowding (or cleanliness)',
        explanation: 'The passage mentions three challenges: delays, overcrowding, and cleanliness.',
      },
    ],
  },

  // ==================== B2 ====================
  {
    id: 'b2-read-01',
    level: 'B2',
    title: 'The Rise of India\'s Startup Ecosystem',
    content: `Over the past decade, India has emerged as one of the world's most vibrant startup ecosystems. Cities like Bangalore, Hyderabad, Mumbai, and Delhi-NCR have become hotbeds of innovation, attracting billions of dollars in venture capital and producing dozens of "unicorns" — startups valued at over one billion dollars.

Several factors have contributed to this remarkable growth. First, India's large and young population provides both a massive consumer base and a talented workforce. With over 1.5 million engineers graduating annually, the country has no shortage of technical talent. Second, the rapid penetration of smartphones and affordable data plans has created a digital infrastructure that startups can leverage.

The government has also played a facilitating role through initiatives like "Startup India" and reforms to make it easier to register and operate businesses. Additionally, the success of early Indian startups like Flipkart, Ola, and Zomato has inspired a new generation of entrepreneurs and demonstrated that world-class companies can be built in India.

However, the ecosystem is not without its challenges. Many startups struggle with profitability, and the "growth at all costs" mentality has led to several high-profile failures. The regulatory environment, while improving, can still be complex and unpredictable. Furthermore, there is a significant urban-rural divide, with most startup activity concentrated in a few metropolitan cities.

Despite these hurdles, the trajectory remains positive. Indian startups are increasingly expanding into tier-2 and tier-3 cities, addressing uniquely Indian problems such as agricultural supply chains, vernacular education, and financial inclusion. The next phase of India's startup story will likely be defined by companies that combine innovation with sustainability and social impact.`,
    wordCount: 260,
    topic: 'Business & Economy',
    indianContext: true,
    vocabulary: ['ecosystem', 'venture capital', 'unicorn', 'leverage', 'profitability', 'regulatory', 'trajectory'],
    questions: [
      {
        id: 'b2-r1-q1',
        type: 'multiple-choice',
        question: 'What does the term "unicorn" refer to in the context of this passage?',
        questionTranslations: {
          hi: 'इस लेख के संदर्भ में "यूनिकॉर्न" शब्द का क्या अर्थ है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: [
          'A mythical creature',
          'A startup valued at over $1 billion',
          'A government initiative',
          'A type of venture capital fund',
        ],
        correctAnswer: 'A startup valued at over $1 billion',
        explanation: 'The passage defines unicorns as "startups valued at over one billion dollars."',
      },
      {
        id: 'b2-r1-q2',
        type: 'multiple-choice',
        question: 'According to the passage, what is one criticism of the startup ecosystem?',
        questionTranslations: {
          hi: 'लेख के अनुसार, स्टार्टअप पारिस्थितिकी तंत्र की एक आलोचना क्या है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: [
          'Too many engineers in India',
          'The "growth at all costs" mentality',
          'Too much government regulation',
          'Lack of smartphone users',
        ],
        correctAnswer: 'The "growth at all costs" mentality',
        explanation: 'The passages mentions "the \'growth at all costs\' mentality has led to several high-profile failures."',
      },
      {
        id: 'b2-r1-q3',
        type: 'short-answer',
        question: 'What areas are Indian startups focusing on as they expand beyond big cities?',
        questionTranslations: {
          hi: 'बड़े शहरों से आगे विस्तार करते हुए भारतीय स्टार्टअप किन क्षेत्रों पर ध्यान दे रहे हैं?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        correctAnswer: 'Agricultural supply chains, vernacular education, and financial inclusion.',
        explanation: 'The passage mentions these three areas as "uniquely Indian problems" being addressed.',
      },
    ],
  },
];

export function getReadingPassagesByLevel(level: string): ReadingPassage[] {
  return readingPassages.filter((p) => p.level === level);
}

export function getReadingPassageById(id: string): ReadingPassage | undefined {
  return readingPassages.find((p) => p.id === id);
}
