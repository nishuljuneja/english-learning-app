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
        type: 'multiple-choice',
        question: 'How many brothers does Anita have?',
        questionTranslations: {
          hi: 'अनिता के कितने भाई हैं?', ta: 'அனிதாவுக்கு எத்தனை சகோதரர்கள்?',
          te: 'అనితకు ఎంత మంది సోదరులు?', bn: 'অনিতার কতজন ভাই?',
          mr: 'अनिताला किती भाऊ?', kn: 'ಅನಿತಾಗೆ ಎಷ್ಟು ಸಹೋದರರು?',
          ml: 'അനിതയ്ക്ക് എത്ര സഹോദരന്മാർ?', gu: 'અનિતાને કેટલા ભાઈ?',
          pa: 'ਅਨੀਤਾ ਦੇ ਕਿੰਨੇ ਭਰਾ ਹਨ?', od: 'ଅନିତାର କେତେ ଭାଇ?', en: '',
        },
        options: ['None', 'One', 'Two', 'Three'],
        correctAnswer: 'One',
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
        type: 'multiple-choice',
        question: 'Where did Ravi meet Mrs. Sharma?',
        questionTranslations: {
          hi: 'रवि ने श्रीमती शर्मा से कहाँ मुलाकात की?', ta: '',
          te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: ['At the tea stall', 'At the fruit stall', 'On his way home', 'At the vegetable shop'],
        correctAnswer: 'On his way home',
        explanation: 'The passage says he met Mrs. Sharma "on his way home."',
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
        type: 'multiple-choice',
        question: 'Which of the following is NOT mentioned as a challenge for Indian Railways?',
        questionTranslations: {
          hi: 'निम्नलिखित में से कौन भारतीय रेलवे की चुनौती के रूप में उल्लेखित नहीं है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: ['Trains are often delayed', 'Ticket prices are too high', 'Stations can be overcrowded', 'Cleanliness is sometimes a concern'],
        correctAnswer: 'Ticket prices are too high',
        explanation: 'The passage mentions delays, overcrowding, and cleanliness — but not ticket prices.',
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
        type: 'multiple-choice',
        question: 'Which is mentioned as a focus area for startups expanding to smaller cities?',
        questionTranslations: {
          hi: 'छोटे शहरों में विस्तार करने वाले स्टार्टअप का ध्यान किस क्षेत्र पर है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: ['Social media marketing', 'Agricultural supply chains', 'International trade', 'Real estate development'],
        correctAnswer: 'Agricultural supply chains',
        explanation: 'The passage mentions agricultural supply chains as one of the "uniquely Indian problems" being addressed.',
      },
    ],
  },

  // ==================== C1 ====================
  {
    id: 'c1-read-01',
    level: 'C1',
    title: 'The Right to Privacy in the Digital Age',
    content: `In August 2017, a nine-judge bench of the Supreme Court of India unanimously declared that the right to privacy is a fundamental right protected under the Indian Constitution. The landmark judgement in Justice K. S. Puttaswamy v. Union of India was precipitated by challenges to Aadhaar, the world's largest biometric identification system, which assigns a unique twelve-digit number to every resident.

The ruling established that privacy encompasses bodily autonomy, informational self-determination, and the sanctity of personal choices—including what one eats, whom one associates with, and how one expresses identity. Writing for the majority, Justice D. Y. Chandrachud observed that "the right to privacy is an intrinsic part of the right to life and personal liberty under Article 21."

Yet the practical implications have proved far more complex than the legal pronouncement itself. The subsequent Personal Data Protection Bill underwent multiple drafts over five years before evolving into the Digital Personal Data Protection Act of 2023. Critics argue that the legislation grants the government sweeping exemptions, permitting state agencies to process personal data without consent on grounds of national security. Proponents counter that a regulatory framework, however imperfect, is preferable to the legal vacuum that preceded it.

Meanwhile, India's data economy continues to expand at a staggering pace. With over 800 million internet users—most accessing the web via affordable smartphones—the country generates vast quantities of data daily. Fintech applications, e-commerce platforms, and telemedicine services have been transformative, particularly for rural populations historically excluded from formal banking and healthcare. However, this digitisation has also introduced new vulnerabilities: data breaches, algorithmic discrimination, and the pervasive surveillance architecture enabled by cross-linked databases.

The tension between technological progress and individual privacy is unlikely to be resolved definitively. What the Puttaswamy judgement accomplished was to shift the burden of justification onto the state, requiring that any intrusion into privacy satisfy the tests of legality, necessity, and proportionality. Whether future legislation and judicial interpretation will uphold this standard remains one of the defining questions of Indian constitutional governance in the twenty-first century.`,
    wordCount: 290,
    topic: 'Law & Technology',
    indianContext: true,
    vocabulary: ['unanimous', 'precipitated', 'biometric', 'autonomy', 'self-determination', 'sanctity', 'intrinsic', 'sweeping', 'exemptions', 'proportionality'],
    questions: [
      {
        id: 'c1-r1-q1',
        type: 'multiple-choice',
        question: 'What was the immediate catalyst for the Supreme Court ruling on the right to privacy?',
        questionTranslations: {
          hi: 'निजता के अधिकार पर सुप्रीम कोर्ट के फैसले का तात्कालिक कारण क्या था?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: [
          'A petition against social media companies',
          'Challenges to the Aadhaar biometric ID system',
          'A data breach at a government agency',
          'International pressure from the United Nations',
        ],
        correctAnswer: 'Challenges to the Aadhaar biometric ID system',
        explanation: 'The passage states the judgement "was precipitated by challenges to Aadhaar."',
      },
      {
        id: 'c1-r1-q2',
        type: 'multiple-choice',
        question: 'According to the passage, what is a major criticism of the Digital Personal Data Protection Act of 2023?',
        questionTranslations: {
          hi: '2023 के डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम की एक प्रमुख आलोचना क्या है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: [
          'It is too strict on businesses',
          'It does not cover rural populations',
          'It grants the government broad exemptions to process data without consent',
          'It was passed without parliamentary debate',
        ],
        correctAnswer: 'It grants the government broad exemptions to process data without consent',
        explanation: 'The passage mentions critics argue the legislation "grants the government sweeping exemptions, permitting state agencies to process personal data without consent."',
      },
      {
        id: 'c1-r1-q3',
        type: 'multiple-choice',
        question: 'According to the Puttaswamy judgement, who bears the burden of justification for privacy intrusions?',
        questionTranslations: {
          hi: 'पुट्टस्वामी फैसले के अनुसार, निजता के हनन के औचित्य का भार किस पर है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: ['The citizen whose privacy is affected', 'The state', 'The judiciary', 'Private companies'],
        correctAnswer: 'The state',
        explanation: 'The passage says the judgement "shift[ed] the burden of justification onto the state."',
      },
      {
        id: 'c1-r1-q4',
        type: 'multiple-choice',
        question: 'Which is NOT one of the three tests for privacy intrusion under the Puttaswamy standard?',
        questionTranslations: {
          hi: 'पुट्टस्वामी मानक के तहत निजता के हनन की कौन सी परीक्षा नहीं है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: ['Legality', 'Efficiency', 'Necessity', 'Proportionality'],
        correctAnswer: 'Efficiency',
        explanation: 'The three tests are legality, necessity, and proportionality — not efficiency.',
      },
    ],
  },

  // ==================== A1 - Additional ====================
  {
    id: 'a1-read-02',
    level: 'A1',
    title: 'My School Day',
    content: `My name is Rohan. I am 10 years old. I go to a school in Jaipur. My school is near my house. I walk to school every day.

My school starts at 8 o'clock in the morning. I wake up at 6:30. First, I brush my teeth and take a bath. Then I eat breakfast. My mother makes parathas and gives me a glass of milk.

At school, I have many subjects. I like Maths and English. My favourite teacher is Mrs. Gupta. She teaches us English. She is very kind. I also like Art class because I can draw and paint.

During lunch, I eat the food my mother packs. I usually have rice, dal, and sabzi. After lunch, I play with my friends. We play cricket in the ground.

School finishes at 2 o'clock. I come home and drink water. Then I do my homework. In the evening, I play outside with my neighbours.`,
    wordCount: 150,
    topic: 'Daily Routine',
    indianContext: true,
    vocabulary: ['school', 'morning', 'breakfast', 'subject', 'favourite', 'homework'],
    questions: [
      {
        id: 'a1-r2-q1',
        type: 'multiple-choice',
        question: 'How does Rohan go to school?',
        questionTranslations: { hi: 'रोहन स्कूल कैसे जाता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['By bus', 'By auto-rickshaw', 'He walks', 'His father drives him'],
        correctAnswer: 'He walks',
        explanation: 'The passage says "I walk to school every day."',
      },
      {
        id: 'a1-r2-q2',
        type: 'multiple-choice',
        question: 'What does Rohan eat for breakfast?',
        questionTranslations: { hi: 'रोहन नाश्ते में क्या खाता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Rice and dal', 'Parathas and milk', 'Bread and eggs', 'Idli and chutney'],
        correctAnswer: 'Parathas and milk',
        explanation: 'The passage says "My mother makes parathas and gives me a glass of milk."',
      },
      {
        id: 'a1-r2-q3',
        type: 'multiple-choice',
        question: 'Who is Mrs. Gupta?',
        questionTranslations: { hi: 'श्रीमती गुप्ता कौन हैं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Rohan\'s mother', 'The Maths teacher', 'The English teacher', 'The school principal'],
        correctAnswer: 'The English teacher',
        explanation: 'The passage says "My favourite teacher is Mrs. Gupta. She teaches us English."',
      },
      {
        id: 'a1-r2-q4',
        type: 'multiple-choice',
        question: 'What time does Rohan\'s school finish?',
        questionTranslations: { hi: 'रोहन का स्कूल कितने बजे ख़त्म होता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['12 o\'clock', '1 o\'clock', '2 o\'clock', '3 o\'clock'],
        correctAnswer: '2 o\'clock',
        explanation: 'The passage says "School finishes at 2 o\'clock."',
      },
    ],
  },
  {
    id: 'a1-read-03',
    level: 'A1',
    title: 'At the Doctor',
    content: `Yesterday, Meera was not feeling well. She had a headache and a fever. Her mother took her to Dr. Khan's clinic.

The clinic is on MG Road. It is a small clinic. There were five people waiting. Meera and her mother sat on chairs and waited.

After twenty minutes, it was Meera's turn. Dr. Khan asked, "What is the problem?" Meera said, "I have a headache and I feel hot." Dr. Khan checked her temperature. It was 101 degrees. He also looked at her throat.

Dr. Khan said, "You have a viral fever. It is nothing serious. Take this medicine three times a day. Drink lots of water and rest at home. Don't go to school for two days."

Meera's mother bought the medicine from the shop next to the clinic. It cost ₹120. At home, Meera drank warm soup and slept. After two days, she felt much better.`,
    wordCount: 145,
    topic: 'Health',
    indianContext: true,
    vocabulary: ['doctor', 'clinic', 'fever', 'medicine', 'temperature', 'rest'],
    questions: [
      {
        id: 'a1-r3-q1',
        type: 'multiple-choice',
        question: 'Why did Meera go to the doctor?',
        questionTranslations: { hi: 'मीरा डॉक्टर के पास क्यों गई?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['She fell down', 'She had a headache and fever', 'She had a stomach ache', 'She broke her arm'],
        correctAnswer: 'She had a headache and fever',
        explanation: 'The passage says "She had a headache and a fever."',
      },
      {
        id: 'a1-r3-q2',
        type: 'multiple-choice',
        question: 'What was Meera\'s temperature?',
        questionTranslations: { hi: 'मीरा का तापमान कितना था?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['99 degrees', '100 degrees', '101 degrees', '102 degrees'],
        correctAnswer: '101 degrees',
        explanation: 'The passage says "It was 101 degrees."',
      },
      {
        id: 'a1-r3-q3',
        type: 'multiple-choice',
        question: 'How long should Meera stay at home?',
        questionTranslations: { hi: 'मीरा को कितने दिन घर पर रहना चाहिए?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['One day', 'Two days', 'Three days', 'One week'],
        correctAnswer: 'Two days',
        explanation: 'The doctor said "Don\'t go to school for two days."',
      },
      {
        id: 'a1-r3-q4',
        type: 'multiple-choice',
        question: 'How much did the medicine cost?',
        questionTranslations: { hi: 'दवाई की कीमत कितनी थी?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['₹80', '₹100', '₹120', '₹150'],
        correctAnswer: '₹120',
        explanation: 'The passage says "It cost ₹120."',
      },
    ],
  },
  {
    id: 'a1-read-04',
    level: 'A1',
    title: 'My Favourite Festival',
    content: `Diwali is my favourite festival. It comes in October or November. It is the festival of lights. People all over India celebrate Diwali.

Before Diwali, my family cleans the whole house. We also paint the walls. My mother buys new curtains. We put rangoli at the door. My sister makes very beautiful rangoli with colours.

On Diwali day, we wear new clothes. In the morning, we do puja. My father lights diyas in every room. My mother makes sweets — she makes gulab jamun and barfi. They are very tasty.

In the evening, we light candles and diyas outside the house. It looks very beautiful. Then we burst some crackers. My neighbours also come and give us sweets. We give them sweets too.

At night, my whole family sits together. We eat dinner and sweets. We are very happy. I love Diwali because everyone is together and happy.`,
    wordCount: 150,
    topic: 'Festivals & Culture',
    indianContext: true,
    vocabulary: ['festival', 'celebrate', 'lights', 'sweets', 'beautiful', 'together'],
    questions: [
      {
        id: 'a1-r4-q1',
        type: 'multiple-choice',
        question: 'When does Diwali come?',
        questionTranslations: { hi: 'दिवाली कब आती है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['January or February', 'March or April', 'July or August', 'October or November'],
        correctAnswer: 'October or November',
        explanation: 'The passage says "It comes in October or November."',
      },
      {
        id: 'a1-r4-q2',
        type: 'multiple-choice',
        question: 'Who makes the rangoli?',
        questionTranslations: { hi: 'रंगोली कौन बनाता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['The narrator\'s mother', 'The narrator\'s sister', 'The narrator\'s father', 'The neighbours'],
        correctAnswer: 'The narrator\'s sister',
        explanation: 'The passage says "My sister makes very beautiful rangoli with colours."',
      },
      {
        id: 'a1-r4-q3',
        type: 'multiple-choice',
        question: 'What sweets does the mother make?',
        questionTranslations: { hi: 'माँ कौन सी मिठाई बनाती हैं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Jalebi and ladoo', 'Gulab jamun and barfi', 'Rasgulla and sandesh', 'Kheer and halwa'],
        correctAnswer: 'Gulab jamun and barfi',
        explanation: 'The passage says "she makes gulab jamun and barfi."',
      },
      {
        id: 'a1-r4-q4',
        type: 'multiple-choice',
        question: 'What does the family put at the door?',
        questionTranslations: { hi: 'परिवार दरवाज़े पर क्या रखता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Flowers', 'Candles', 'Rangoli', 'A lamp'],
        correctAnswer: 'Rangoli',
        explanation: 'The passage says "We put rangoli at the door."',
      },
    ],
  },

  // ==================== A2 - Additional ====================
  {
    id: 'a2-read-02',
    level: 'A2',
    title: 'Cooking Biryani',
    content: `Last weekend, Farah decided to cook chicken biryani for her family. Biryani is a popular rice dish in India. It takes a long time to prepare, but it is worth it.

First, Farah went to the market and bought the ingredients. She needed basmati rice, chicken, onions, tomatoes, yoghurt, and many spices like cumin, cardamom, and bay leaves. She also bought fresh mint and coriander leaves.

At home, she washed the rice and soaked it in water for 30 minutes. While the rice was soaking, she cut the onions and marinated the chicken with yoghurt and spices. She fried the onions until they were golden brown. Then she added the chicken and cooked it slowly.

Next, she boiled the rice until it was half-cooked. She layered the rice over the chicken in a big pot. She added saffron milk on top for colour and flavour. She covered the pot tightly and cooked it on a very low flame for 25 minutes.

When she opened the pot, the smell was amazing. The family sat down together and ate the biryani with raita and salad. Everyone loved it. Farah's father said it was the best biryani he had ever eaten.`,
    wordCount: 195,
    topic: 'Food & Cooking',
    indianContext: true,
    vocabulary: ['ingredients', 'marinated', 'soaked', 'layered', 'flavour', 'recipe'],
    questions: [
      {
        id: 'a2-r2-q1',
        type: 'multiple-choice',
        question: 'How long did Farah soak the rice?',
        questionTranslations: { hi: 'फ़राह ने चावल कितनी देर भिगोए?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['10 minutes', '20 minutes', '30 minutes', '1 hour'],
        correctAnswer: '30 minutes',
        explanation: 'The passage says "soaked it in water for 30 minutes."',
      },
      {
        id: 'a2-r2-q2',
        type: 'multiple-choice',
        question: 'What did Farah add on top for colour?',
        questionTranslations: { hi: 'फ़राह ने रंग के लिए ऊपर क्या डाला?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Turmeric powder', 'Food colouring', 'Saffron milk', 'Red chilli powder'],
        correctAnswer: 'Saffron milk',
        explanation: 'The passage says "She added saffron milk on top for colour and flavour."',
      },
      {
        id: 'a2-r2-q3',
        type: 'multiple-choice',
        question: 'What did the family eat with the biryani?',
        questionTranslations: { hi: 'परिवार ने बिरयानी के साथ क्या खाया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Naan and chutney', 'Raita and salad', 'Pickle and papad', 'Roti and dal'],
        correctAnswer: 'Raita and salad',
        explanation: 'The passage says "ate the biryani with raita and salad."',
      },
      {
        id: 'a2-r2-q4',
        type: 'multiple-choice',
        question: 'How long was the final cooking on low flame?',
        questionTranslations: { hi: 'धीमी आँच पर आख़िरी बार कितनी देर पकाया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['15 minutes', '20 minutes', '25 minutes', '30 minutes'],
        correctAnswer: '25 minutes',
        explanation: 'The passage says "cooked it on a very low flame for 25 minutes."',
      },
    ],
  },
  {
    id: 'a2-read-03',
    level: 'A2',
    title: 'The Cricket Match',
    content: `Last Sunday, there was a big cricket match between India and Australia. Vikram and his friends were very excited. They decided to watch the match together at Vikram's house.

The match started at 2 o'clock in the afternoon. India won the toss and chose to bat first. The Indian team scored 287 runs in 50 overs. Rohit Sharma played very well and scored 98 runs, but he missed his century by just 2 runs. Everyone was disappointed for him.

During the break, Vikram's mother brought snacks — samosas, chips, and cold drinks. The friends talked about the first innings and predicted what would happen next.

In the second innings, Australia started well. But then Indian bowlers took three quick wickets. The crowd in the stadium was cheering loudly. At home, Vikram and his friends were shouting too.

In the end, Australia needed 15 runs from the last over, but they could only score 8. India won the match by 6 runs! Everyone was very happy. Vikram and his friends celebrated with loud cheers and more snacks.

It was a wonderful Sunday.`,
    wordCount: 180,
    topic: 'Sports',
    indianContext: true,
    vocabulary: ['match', 'score', 'innings', 'wickets', 'celebrate', 'disappointed'],
    questions: [
      {
        id: 'a2-r3-q1',
        type: 'multiple-choice',
        question: 'What did India choose to do after winning the toss?',
        questionTranslations: { hi: 'टॉस जीतने के बाद भारत ने क्या चुना?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Bowl first', 'Bat first', 'Field first', 'Take a break'],
        correctAnswer: 'Bat first',
        explanation: 'The passage says "India won the toss and chose to bat first."',
      },
      {
        id: 'a2-r3-q2',
        type: 'multiple-choice',
        question: 'How many runs did Rohit Sharma score?',
        questionTranslations: { hi: 'रोहित शर्मा ने कितने रन बनाए?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['87 runs', '92 runs', '98 runs', '100 runs'],
        correctAnswer: '98 runs',
        explanation: 'The passage says "scored 98 runs, but he missed his century by just 2 runs."',
      },
      {
        id: 'a2-r3-q3',
        type: 'multiple-choice',
        question: 'By how many runs did India win?',
        questionTranslations: { hi: 'भारत ने कितने रन से जीत हासिल की?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['2 runs', '4 runs', '6 runs', '8 runs'],
        correctAnswer: '6 runs',
        explanation: 'The passage says "India won the match by 6 runs!"',
      },
      {
        id: 'a2-r3-q4',
        type: 'multiple-choice',
        question: 'What did Vikram\'s mother bring during the break?',
        questionTranslations: { hi: 'ब्रेक में विक्रम की माँ ने क्या लाया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Biryani and raita', 'Pizza and juice', 'Samosas, chips, and cold drinks', 'Sandwiches and tea'],
        correctAnswer: 'Samosas, chips, and cold drinks',
        explanation: 'The passage says "samosas, chips, and cold drinks."',
      },
    ],
  },
  {
    id: 'a2-read-04',
    level: 'A2',
    title: 'A New Mobile Phone',
    content: `Priya wanted to buy a new mobile phone. Her old phone was three years old and very slow. She saved money from her job for four months.

She went to the electronics shop on Commercial Street with her friend Neha. The shop had many phones from different brands — Samsung, Xiaomi, Realme, and Apple. An Apple phone was ₹80,000, which was too expensive for Priya.

The salesman showed her several phones between ₹15,000 and ₹20,000. She liked a Samsung phone with a good camera and large battery. The battery could last two days on one charge. The phone also had 128 GB storage.

Neha suggested a Xiaomi phone that was ₹3,000 cheaper and had similar features. But Priya liked the Samsung camera better. She decided to buy the Samsung phone for ₹18,000.

The salesman also suggested a phone cover and screen protector for ₹500. Priya thought it was a good idea and bought them too. She paid using UPI from her bank account.

Priya was very happy with her new phone. The first thing she did was take a selfie with Neha and post it on Instagram.`,
    wordCount: 180,
    topic: 'Technology & Shopping',
    indianContext: true,
    vocabulary: ['electronics', 'brands', 'features', 'battery', 'storage', 'expensive'],
    questions: [
      {
        id: 'a2-r4-q1',
        type: 'multiple-choice',
        question: 'How long did Priya save money?',
        questionTranslations: { hi: 'प्रिया ने कितने महीने पैसे बचाए?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Two months', 'Three months', 'Four months', 'Six months'],
        correctAnswer: 'Four months',
        explanation: 'The passage says "She saved money from her job for four months."',
      },
      {
        id: 'a2-r4-q2',
        type: 'multiple-choice',
        question: 'Why did Priya not buy the Apple phone?',
        questionTranslations: { hi: 'प्रिया ने Apple फ़ोन क्यों नहीं ख़रीदा?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It was too heavy', 'It had a small screen', 'It was too expensive', 'It had no camera'],
        correctAnswer: 'It was too expensive',
        explanation: 'The passage says the Apple phone "was too expensive for Priya."',
      },
      {
        id: 'a2-r4-q3',
        type: 'multiple-choice',
        question: 'How much did the Samsung phone cost?',
        questionTranslations: { hi: 'Samsung फ़ोन की कीमत कितनी थी?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['₹15,000', '₹17,000', '₹18,000', '₹20,000'],
        correctAnswer: '₹18,000',
        explanation: 'The passage says "She decided to buy the Samsung phone for ₹18,000."',
      },
      {
        id: 'a2-r4-q4',
        type: 'multiple-choice',
        question: 'How did Priya pay for the phone?',
        questionTranslations: { hi: 'प्रिया ने फ़ोन का भुगतान कैसे किया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Cash', 'Credit card', 'UPI', 'EMI'],
        correctAnswer: 'UPI',
        explanation: 'The passage says "She paid using UPI from her bank account."',
      },
    ],
  },

  // ==================== B1 - Additional ====================
  {
    id: 'b1-read-02',
    level: 'B1',
    title: 'Street Food Culture in India',
    content: `India is famous for its street food. From the golgappas of Delhi to the vada pav of Mumbai, from the kathi rolls of Kolkata to the dosas of Chennai, every city has its own special street food identity.

Street food in India is not just about taste — it is about the experience. Watching a vendor skilfully prepare your dish on a tiny cart, the sizzle of oil, the aroma of fresh spices, and the crowd of hungry people around you create a unique atmosphere.

One reason street food is so popular is its affordability. A plate of chole bhature or a serving of pav bhaji costs between ₹30 and ₹80, making it accessible to almost everyone. Students, office workers, families, and even tourists regularly eat street food.

However, street food also raises concerns about hygiene. The food is prepared in open areas, and not all vendors follow clean practices. In recent years, the Food Safety and Standards Authority of India (FSSAI) has been working to improve hygiene standards. Many cities have introduced "clean street food hubs" where vendors are trained and regularly inspected.

Despite the hygiene concerns, the demand for street food continues to grow. Food bloggers and YouTube channels have made famous street food stalls even more popular. Some vendors now accept digital payments, have social media accounts, and even franchise their businesses.

Street food is deeply connected to India's culture. It brings people together across social and economic barriers: a billionaire and a student might eat at the same chaat stall. This democratic nature of street food is what makes it truly special.`,
    wordCount: 240,
    topic: 'Food & Culture',
    indianContext: true,
    vocabulary: ['vendor', 'affordability', 'hygiene', 'accessible', 'franchise', 'democratic'],
    questions: [
      {
        id: 'b1-r2-q1',
        type: 'multiple-choice',
        question: 'According to the passage, what makes street food accessible to most people?',
        questionTranslations: { hi: 'लेख के अनुसार, स्ट्रीट फ़ूड को अधिकतर लोगों के लिए सुलभ क्या बनाता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Its taste', 'Its affordability', 'Its hygiene standards', 'Its availability online'],
        correctAnswer: 'Its affordability',
        explanation: 'The passage says a serving "costs between ₹30 and ₹80, making it accessible to almost everyone."',
      },
      {
        id: 'b1-r2-q2',
        type: 'multiple-choice',
        question: 'What is the FSSAI doing about street food?',
        questionTranslations: { hi: 'FSSAI स्ट्रीट फ़ूड के बारे में क्या कर रहा है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Banning street food', 'Improving hygiene standards', 'Reducing prices', 'Opening new restaurants'],
        correctAnswer: 'Improving hygiene standards',
        explanation: 'The passage says FSSAI "has been working to improve hygiene standards."',
      },
      {
        id: 'b1-r2-q3',
        type: 'multiple-choice',
        question: 'What does the author mean by the "democratic nature" of street food?',
        questionTranslations: { hi: 'लेखक "स्ट्रीट फ़ूड के लोकतांत्रिक स्वभाव" से क्या मतलब रखता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It is part of election campaigns', 'People vote for their favourite stalls', 'People from all backgrounds eat at the same stalls', 'It is regulated by the government'],
        correctAnswer: 'People from all backgrounds eat at the same stalls',
        explanation: 'The passage says "a billionaire and a student might eat at the same chaat stall."',
      },
      {
        id: 'b1-r2-q4',
        type: 'multiple-choice',
        question: 'How has social media affected street food vendors?',
        questionTranslations: { hi: 'सोशल मीडिया ने स्ट्रीट फ़ूड विक्रेताओं को कैसे प्रभावित किया है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It has reduced their business', 'It has made famous stalls even more popular', 'It has forced them to close', 'It has increased food prices'],
        correctAnswer: 'It has made famous stalls even more popular',
        explanation: 'The passage says "Food bloggers and YouTube channels have made famous street food stalls even more popular."',
      },
    ],
  },
  {
    id: 'b1-read-03',
    level: 'B1',
    title: 'Social Media and Indian Youth',
    content: `Social media has transformed how young Indians communicate, learn, and spend their free time. Platforms like Instagram, YouTube, WhatsApp, and X (formerly Twitter) have millions of users in India, with a large percentage being under 25 years old.

For many young people, social media is a source of information and inspiration. Students use YouTube to learn everything from mathematics to cooking. Young entrepreneurs use Instagram to market their small businesses. Activists use social media to raise awareness about important issues like climate change, education, and gender equality.

However, social media also has a darker side. Many young people spend too much time scrolling through their phones, which affects their sleep, studies, and mental health. Cyberbullying is a growing problem, especially among teenagers. Fake news spreads quickly on platforms like WhatsApp, and it can be difficult to tell what is true and what is false.

Experts recommend that young people should limit their screen time to two hours per day. They should also think critically about the content they see and not believe everything they read online. Parents play an important role in guiding their children about safe internet use.

Some schools in India have started digital literacy programmes to teach students how to use social media responsibly. These programmes cover topics like online safety, recognising fake news, and managing screen time effectively.

Despite the challenges, social media remains a powerful tool for connection and creativity. The key is to use it wisely and maintain a healthy balance between online and offline life.`,
    wordCount: 230,
    topic: 'Technology & Society',
    indianContext: true,
    vocabulary: ['transformed', 'entrepreneurs', 'awareness', 'cyberbullying', 'literacy', 'responsibly'],
    questions: [
      {
        id: 'b1-r3-q1',
        type: 'multiple-choice',
        question: 'According to experts, how much daily screen time is recommended for young people?',
        questionTranslations: { hi: 'विशेषज्ञों के अनुसार, युवाओं के लिए दैनिक स्क्रीन समय कितना अनुशंसित है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['One hour', 'Two hours', 'Three hours', 'Four hours'],
        correctAnswer: 'Two hours',
        explanation: 'The passage says experts recommend limiting "screen time to two hours per day."',
      },
      {
        id: 'b1-r3-q2',
        type: 'multiple-choice',
        question: 'Which is NOT mentioned as a negative effect of social media?',
        questionTranslations: { hi: 'सोशल मीडिया के नकारात्मक प्रभाव के रूप में किसका उल्लेख नहीं किया गया है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Cyberbullying', 'Spread of fake news', 'Financial fraud', 'Affects sleep and studies'],
        correctAnswer: 'Financial fraud',
        explanation: 'The passage mentions cyberbullying, fake news, and effects on sleep/studies — but not financial fraud.',
      },
      {
        id: 'b1-r3-q3',
        type: 'multiple-choice',
        question: 'What have some schools introduced to address social media concerns?',
        questionTranslations: { hi: 'कुछ स्कूलों ने सोशल मीडिया की चिंताओं को दूर करने के लिए क्या शुरू किया है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Banning phones in school', 'Digital literacy programmes', 'Social media exams', 'Counselling for every student'],
        correctAnswer: 'Digital literacy programmes',
        explanation: 'The passage says "Some schools in India have started digital literacy programmes."',
      },
      {
        id: 'b1-r3-q4',
        type: 'multiple-choice',
        question: 'How do young entrepreneurs use social media?',
        questionTranslations: { hi: 'युवा उद्यमी सोशल मीडिया का उपयोग कैसे करते हैं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['To apply for government jobs', 'To market their small businesses', 'To find investment from banks', 'To take online exams'],
        correctAnswer: 'To market their small businesses',
        explanation: 'The passage says "Young entrepreneurs use Instagram to market their small businesses."',
      },
    ],
  },
  {
    id: 'b1-read-04',
    level: 'B1',
    title: 'The Monsoon Season',
    content: `The monsoon is one of the most important seasons in India. It usually arrives in June and lasts until September. For a largely agricultural country, the monsoon is the lifeline of the economy.

Around 60% of India's farmland depends on rain for irrigation. If the monsoon arrives on time and brings enough rain, crops grow well and food prices remain stable. A weak monsoon can lead to drought, crop failure, and rising food costs, which affects millions of farmers and their families.

But the monsoon is more than just economics. It has a deep emotional and cultural significance. After months of scorching summer heat, the first rain brings immense relief and joy. Children dance in the rain, the air smells fresh, and the landscape turns green almost overnight. Bollywood movies and Indian poetry are full of romantic images of the monsoon.

However, heavy monsoon rains also bring serious problems. Flooding is common in many cities, especially Mumbai, Chennai, and Kolkata. Roads become waterlogged, trains stop running, and people struggle to get to work. In rural areas, floods can destroy homes and crops. Landslides in hilly regions like Uttarakhand and Himachal Pradesh cause loss of life every year.

Climate change has made the monsoon more unpredictable. Some years, the monsoon is delayed; other years, certain regions receive too much rain while others receive too little. Scientists are studying how global warming will affect future monsoon patterns.

The monsoon remains at the heart of Indian life — it is celebrated, feared, and deeply respected.`,
    wordCount: 240,
    topic: 'Environment & Agriculture',
    indianContext: true,
    vocabulary: ['monsoon', 'irrigation', 'drought', 'scorching', 'waterlogged', 'unpredictable'],
    questions: [
      {
        id: 'b1-r4-q1',
        type: 'multiple-choice',
        question: 'What percentage of India\'s farmland depends on rain?',
        questionTranslations: { hi: 'भारत की कितनी प्रतिशत कृषि भूमि बारिश पर निर्भर है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['40%', '50%', '60%', '75%'],
        correctAnswer: '60%',
        explanation: 'The passage says "Around 60% of India\'s farmland depends on rain."',
      },
      {
        id: 'b1-r4-q2',
        type: 'multiple-choice',
        question: 'Which is NOT mentioned as a city that faces flooding?',
        questionTranslations: { hi: 'बाढ़ का सामना करने वाले शहर के रूप में किसका उल्लेख नहीं है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Mumbai', 'Chennai', 'Bangalore', 'Kolkata'],
        correctAnswer: 'Bangalore',
        explanation: 'The passage mentions Mumbai, Chennai, and Kolkata — but not Bangalore.',
      },
      {
        id: 'b1-r4-q3',
        type: 'multiple-choice',
        question: 'What happens if the monsoon is weak?',
        questionTranslations: { hi: 'अगर मानसून कमज़ोर हो तो क्या होता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Floods in cities', 'Drought and crop failure', 'More tourism', 'Lower temperatures'],
        correctAnswer: 'Drought and crop failure',
        explanation: 'The passage says "A weak monsoon can lead to drought, crop failure, and rising food costs."',
      },
      {
        id: 'b1-r4-q4',
        type: 'multiple-choice',
        question: 'How has climate change affected the monsoon?',
        questionTranslations: { hi: 'जलवायु परिवर्तन ने मानसून को कैसे प्रभावित किया है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It has made it more predictable', 'It has shortened the season', 'It has made it more unpredictable', 'It has eliminated flooding'],
        correctAnswer: 'It has made it more unpredictable',
        explanation: 'The passage says "Climate change has made the monsoon more unpredictable."',
      },
    ],
  },

  // ==================== B2 - Additional ====================
  {
    id: 'b2-read-02',
    level: 'B2',
    title: 'India\'s Space Programme: Punching Above Its Weight',
    content: `In September 2014, India made history when its Mars Orbiter Mission, known as Mangalyaan, successfully entered Mars' orbit on its first attempt. What made this achievement even more remarkable was its cost: approximately ₹450 crore (about $74 million) — less than the budget of many Hollywood science fiction films. This frugal approach to space exploration has become a defining characteristic of the Indian Space Research Organisation (ISRO).

ISRO's origins trace back to 1962, when India's space programme began with rockets transported on bicycles and assembled in a church near Thumba, Kerala. Since then, it has evolved into one of the world's most capable and cost-effective space agencies. The Polar Satellite Launch Vehicle (PSLV) has become a workhorse, launching over 300 foreign satellites for 36 countries, generating significant revenue.

In 2023, India achieved another milestone with the Chandrayaan-3 mission, which successfully landed a rover near the Moon's south pole. India became only the fourth country to achieve a soft landing on the Moon and the first to land near the south pole, a region believed to contain water ice crucial for future space exploration.

ISRO's success challenges the assumption that space exploration is exclusively for wealthy nations. By emphasising ingenious engineering over expensive technology, and by developing most components domestically, ISRO has demonstrated that innovation does not always require massive budgets.

However, the organisation faces challenges. Critics argue that India, with significant poverty and infrastructure gaps, should prioritise development spending over space exploration. ISRO officials counter that satellite technology directly benefits citizens through weather forecasting, communication in remote areas, disaster management, and GPS navigation.`,
    wordCount: 250,
    topic: 'Science & Technology',
    indianContext: true,
    vocabulary: ['frugal', 'milestone', 'ingenious', 'domestically', 'aspiration', 'pragmatism'],
    questions: [
      {
        id: 'b2-r2-q1',
        type: 'multiple-choice',
        question: 'What was notable about the cost of Mangalyaan?',
        questionTranslations: { hi: 'मंगलयान की लागत में क्या उल्लेखनीय था?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It was the most expensive mission ever', 'It cost less than many Hollywood films', 'It was funded entirely by private companies', 'It was paid for by other countries'],
        correctAnswer: 'It cost less than many Hollywood films',
        explanation: 'The passage says the cost was "less than the budget of many Hollywood science fiction films."',
      },
      {
        id: 'b2-r2-q2',
        type: 'multiple-choice',
        question: 'What was significant about Chandrayaan-3\'s landing location?',
        questionTranslations: { hi: 'चंद्रयान-3 के लैंडिंग स्थान में क्या महत्वपूर्ण था?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It was the first landing on the Moon', 'It was the first landing near the south pole', 'It discovered life on the Moon', 'It landed on Mars instead'],
        correctAnswer: 'It was the first landing near the south pole',
        explanation: 'The passage says India was "the first to land near the south pole."',
      },
      {
        id: 'b2-r2-q3',
        type: 'multiple-choice',
        question: 'How do ISRO officials justify the space programme\'s costs?',
        questionTranslations: { hi: 'ISRO अधिकारी अंतरिक्ष कार्यक्रम की लागत को कैसे उचित ठहराते हैं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It creates jobs for engineers', 'Satellite technology directly benefits citizens', 'It attracts foreign investment', 'It improves India\'s military strength'],
        correctAnswer: 'Satellite technology directly benefits citizens',
        explanation: 'The passage mentions benefits like "weather forecasting, communication in remote areas, disaster management, and GPS navigation."',
      },
      {
        id: 'b2-r2-q4',
        type: 'multiple-choice',
        question: 'Where did India\'s early space programme begin?',
        questionTranslations: { hi: 'भारत का प्रारंभिक अंतरिक्ष कार्यक्रम कहाँ शुरू हुआ?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Bangalore', 'Sriharikota', 'Thumba, Kerala', 'Ahmedabad'],
        correctAnswer: 'Thumba, Kerala',
        explanation: 'The passage describes rockets "assembled in a church near Thumba, Kerala."',
      },
    ],
  },
  {
    id: 'b2-read-03',
    level: 'B2',
    title: 'The Gig Economy in Urban India',
    content: `At any given moment in a major Indian city, thousands of delivery riders are navigating through traffic, carrying food, groceries, and packages to customers' doors. These workers form the backbone of India's rapidly growing gig economy — a labour market characterised by short-term, flexible jobs rather than permanent employment.

Apps like Swiggy, Zomato, Urban Company, and Ola have created enormous employment opportunities. According to a NITI Aayog report, India had approximately 7.7 million gig workers in 2020, and this number is expected to grow to 23.5 million by 2030. For many workers, especially those migrating from rural areas, these platforms offer a way to earn money without needing formal qualifications.

The appeal of gig work lies in its flexibility. Workers can choose when and how much they work. A college student might deliver food in the evenings, while a homemaker might offer salon services through Urban Company during the day.

However, the gig economy has a less appealing side. Workers are classified as "partners" rather than employees, which means they receive no health insurance, paid leave, provident fund, or job security. Working conditions can be demanding. Delivery riders face dangerous road conditions and pressure to meet tight deadlines. Average earnings, once fuel and vehicle maintenance are deducted, often fall below minimum wage levels.

The Indian government has begun addressing these concerns. The Code on Social Security, 2020, includes provisions for extending social security benefits to gig workers, though implementation has been slow.`,
    wordCount: 230,
    topic: 'Economy & Labour',
    indianContext: true,
    vocabulary: ['gig economy', 'characterised', 'flexibility', 'provisions', 'implementation', 'qualifications'],
    questions: [
      {
        id: 'b2-r3-q1',
        type: 'multiple-choice',
        question: 'How many gig workers is India expected to have by 2030?',
        questionTranslations: { hi: '2030 तक भारत में कितने गिग कर्मचारी होने की उम्मीद है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['7.7 million', '15 million', '23.5 million', '50 million'],
        correctAnswer: '23.5 million',
        explanation: 'The passage says this number "is expected to grow to 23.5 million by 2030."',
      },
      {
        id: 'b2-r3-q2',
        type: 'multiple-choice',
        question: 'Why are gig workers classified as "partners" rather than employees?',
        questionTranslations: { hi: 'गिग कर्मचारियों को कर्मचारी के बजाय "भागीदार" क्यों वर्गीकृत किया जाता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['They own shares in the company', 'To avoid providing employment benefits', 'Because they invest in the business', 'They work in equal partnerships'],
        correctAnswer: 'To avoid providing employment benefits',
        explanation: 'The passage explains this classification means workers receive "no health insurance, paid leave, provident fund, or job security."',
      },
      {
        id: 'b2-r3-q3',
        type: 'multiple-choice',
        question: 'What legislative step has the Indian government taken for gig workers?',
        questionTranslations: { hi: 'भारत सरकार ने गिग कर्मचारियों के लिए क्या विधायी कदम उठाया है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Banned all gig work', 'Introduced the Code on Social Security, 2020', 'Made gig work illegal for students', 'Required all gig workers to form unions'],
        correctAnswer: 'Introduced the Code on Social Security, 2020',
        explanation: 'The passage mentions "The Code on Social Security, 2020, includes provisions for extending social security benefits."',
      },
      {
        id: 'b2-r3-q4',
        type: 'multiple-choice',
        question: 'What makes gig work earnings lower than expected?',
        questionTranslations: { hi: 'गिग कार्य की कमाई अपेक्षा से कम क्या बनाती है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['High tax rates', 'Fuel and vehicle maintenance costs', 'Platform subscription fees', 'Government fines'],
        correctAnswer: 'Fuel and vehicle maintenance costs',
        explanation: 'The passage says "once fuel and vehicle maintenance are deducted, [earnings] often fall below minimum wage."',
      },
    ],
  },
  {
    id: 'b2-read-04',
    level: 'B2',
    title: 'Mental Health Awareness in India',
    content: `For decades, mental health has been one of the most neglected areas of healthcare in India. Cultural stigma, a severe shortage of professionals, and limited public awareness have meant that millions of Indians suffering from conditions like depression, anxiety, and PTSD go untreated.

India has fewer than 1 psychiatrist per 100,000 people, compared to about 16 per 100,000 in countries like the United States. The situation is even worse in rural areas, where mental health services are virtually nonexistent.

Cultural attitudes play a major role. In many communities, mental illness is attributed to personal weakness, supernatural causes, or family shame. These attitudes discourage people from seeking help and perpetuate a cycle of suffering in silence.

However, there are encouraging signs of change. The Mental Healthcare Act of 2017 was a landmark legislation that gave every citizen the right to access mental healthcare. Helplines like iCall and Vandrevala Foundation provide free counselling services. Companies, particularly in the IT sector, are introducing employee wellness programmes that include mental health support.

Social media has also played a positive role. Celebrities and public figures speaking openly about their struggles with depression and anxiety have helped normalise conversations about mental health. Youth-led organisations are conducting awareness campaigns in schools and colleges.

The path forward requires training more mental health professionals, integrating mental health into primary healthcare, and fundamentally shifting cultural perceptions. While progress is slow, the conversation has begun — and that itself represents a significant step forward.`,
    wordCount: 230,
    topic: 'Health & Society',
    indianContext: true,
    vocabulary: ['stigma', 'perpetuate', 'landmark', 'normalise', 'systemic', 'well-being'],
    questions: [
      {
        id: 'b2-r4-q1',
        type: 'multiple-choice',
        question: 'How many psychiatrists does India have per 100,000 people?',
        questionTranslations: { hi: 'भारत में प्रति 1,00,000 लोगों पर कितने मनोचिकित्सक हैं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Fewer than 1', 'About 5', 'About 10', 'About 16'],
        correctAnswer: 'Fewer than 1',
        explanation: 'The passage says "India has fewer than 1 psychiatrist per 100,000 people."',
      },
      {
        id: 'b2-r4-q2',
        type: 'multiple-choice',
        question: 'What did the Mental Healthcare Act of 2017 establish?',
        questionTranslations: { hi: '2017 के मानसिक स्वास्थ्य अधिनियम ने क्या स्थापित किया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Free medicine for all patients', 'The right to access mental healthcare', 'Mandatory counselling in schools', 'Ban on mental health stigma'],
        correctAnswer: 'The right to access mental healthcare',
        explanation: 'The passage says the Act "gave every citizen the right to access mental healthcare."',
      },
      {
        id: 'b2-r4-q3',
        type: 'multiple-choice',
        question: 'Which sector is mentioned as introducing employee wellness programmes?',
        questionTranslations: { hi: 'कौन सा क्षेत्र कर्मचारी कल्याण कार्यक्रम शुरू करने के लिए उल्लेखित है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Agriculture', 'Manufacturing', 'IT sector', 'Government services'],
        correctAnswer: 'IT sector',
        explanation: 'The passage says "Companies, particularly in the IT sector, are introducing employee wellness programmes."',
      },
      {
        id: 'b2-r4-q4',
        type: 'multiple-choice',
        question: 'How has social media helped the mental health conversation?',
        questionTranslations: { hi: 'सोशल मीडिया ने मानसिक स्वास्थ्य की बातचीत में कैसे मदद की है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['By providing medical prescriptions', 'By celebrities speaking openly about their struggles', 'By replacing professional therapy', 'By banning negative content'],
        correctAnswer: 'By celebrities speaking openly about their struggles',
        explanation: 'The passage says celebrities "speaking openly about their struggles... have helped normalise conversations."',
      },
    ],
  },

  // ==================== C1 - Additional ====================
  {
    id: 'c1-read-02',
    level: 'C1',
    title: 'Artificial Intelligence and India\'s Workforce',
    content: `India stands at a peculiar crossroads in the global AI revolution. As both one of the world's largest outsourcing destinations and a nation grappling with unemployment, it faces a dual reality: AI promises to transform India into a technological powerhouse, yet it simultaneously threatens to displace the very workforce that has driven the country's economic growth over the past three decades.

The Information Technology sector, which employs over 5 million people and contributes approximately 7.5% to India's GDP, is particularly exposed. Generative AI tools can now perform tasks that previously required teams of junior software developers, data entry operators, and customer support agents. A McKinsey report estimated that 50% of current work activities in India are technically automatable with existing technology.

However, the narrative of wholesale displacement oversimplifies a more complex reality. History suggests that technological revolutions create new categories of employment even as they eliminate others. The advent of ATMs, for instance, did not reduce the number of bank employees in India; instead, it freed them to undertake more complex, relationship-driven roles.

India has several structural advantages in this transition. Its demographic profile — with a median age of approximately 28 years — means the workforce is more adaptable than that of ageing societies. The country's strength in mathematics and engineering education provides a foundation for reskilling towards AI-adjacent roles. Moreover, India's vast informal economy, comprising nearly 90% of employment, operates in sectors where AI automation is far less immediately applicable.

The critical challenge lies in the pace and equity of transition. While elite institutions like the IITs pivot seamlessly towards AI curricula, the majority of India's engineering colleges lack the infrastructure and faculty to deliver quality AI education. Without deliberate policy intervention, the AI revolution risks exacerbating India's already significant inequalities.`,
    wordCount: 280,
    topic: 'Technology & Economy',
    indianContext: true,
    vocabulary: ['automatable', 'augment', 'demographic', 'exacerbating', 'curricula', 'displacement'],
    questions: [
      {
        id: 'c1-r2-q1',
        type: 'multiple-choice',
        question: 'According to the McKinsey report cited, what percentage of Indian work activities are automatable?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['25%', '35%', '50%', '75%'],
        correctAnswer: '50%',
        explanation: 'The passage cites "50% of current work activities in India are technically automatable."',
      },
      {
        id: 'c1-r2-q2',
        type: 'multiple-choice',
        question: 'What example does the author use to argue that technology doesn\'t always eliminate jobs?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['The decline of call centres', 'The introduction of ATMs in banks', 'The rise of smartphone factories', 'The growth of online education'],
        correctAnswer: 'The introduction of ATMs in banks',
        explanation: 'The passage uses the ATM example, noting ATMs "did not reduce the number of bank employees."',
      },
      {
        id: 'c1-r2-q3',
        type: 'multiple-choice',
        question: 'What structural advantage does India\'s informal economy provide against AI displacement?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It is already highly automated', 'It operates in sectors where AI automation is less applicable', 'Workers are already trained in AI', 'It is protected by labour unions'],
        correctAnswer: 'It operates in sectors where AI automation is less applicable',
        explanation: 'The passage says the informal economy "operates in sectors where AI automation is far less immediately applicable."',
      },
      {
        id: 'c1-r2-q4',
        type: 'multiple-choice',
        question: 'What gap does the passage identify in India\'s education system regarding AI?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['IITs do not teach AI courses', 'Most engineering colleges lack infrastructure for quality AI education', 'Students prefer arts over engineering', 'There are too many AI graduates'],
        correctAnswer: 'Most engineering colleges lack infrastructure for quality AI education',
        explanation: 'The passage says "the majority of India\'s engineering colleges lack the infrastructure and faculty."',
      },
    ],
  },
  {
    id: 'c1-read-03',
    level: 'C1',
    title: 'Climate Change and India\'s Coastline',
    content: `India possesses one of the world's longest coastlines, stretching approximately 7,500 kilometres across nine states and four union territories. Over 170 million people live in these coastal zones. As global temperatures rise and sea levels climb, this vast strip of land has become one of the country's most vulnerable frontiers.

The IPCC projects that global sea levels could rise by 0.3 to 1.1 metres by 2100. For India, even a modest rise of half a metre would be catastrophic. A 2019 study published in Nature Communications estimated that approximately 36 million Indians currently live on land that will be below the annual flood level by 2050.

Mumbai, India's financial capital, illustrates the stakes vividly. Built on reclaimed land, the city already experiences devastating flooding during heavy monsoon rains. Rising sea levels will compound this vulnerability exponentially. The city's iconic Marine Drive, dense slum settlements like Dharavi, and critical infrastructure including the international airport sit perilously close to sea level.

The Sundarbans, the world's largest mangrove forest straddling West Bengal and Bangladesh, faces an existential threat. Several islands have already been submerged, displacing thousands of residents. The mangroves themselves — which serve as natural barriers against cyclones — are retreating as salinity levels increase and coastlines erode.

India's response has been a mixture of adaptation and mitigation strategies. The National Action Plan on Climate Change includes a dedicated coastal management mission. Kerala, after devastating floods in 2018 and 2019, has pioneered community-based disaster resilience programmes.

Yet critics argue that these efforts remain piecemeal and inadequately funded relative to the scale of the challenge.`,
    wordCount: 250,
    topic: 'Environment & Climate',
    indianContext: true,
    vocabulary: ['vulnerability', 'reclaimed', 'exponentially', 'existential', 'mitigation', 'piecemeal'],
    questions: [
      {
        id: 'c1-r3-q1',
        type: 'multiple-choice',
        question: 'How many Indians are estimated to live on land that will be below flood level by 2050?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['10 million', '20 million', '36 million', '50 million'],
        correctAnswer: '36 million',
        explanation: 'The passage cites "approximately 36 million Indians" on such land.',
      },
      {
        id: 'c1-r3-q2',
        type: 'multiple-choice',
        question: 'Why is Mumbai particularly vulnerable to sea-level rise?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It has no flood barriers', 'It was built on reclaimed land', 'It has the highest population in India', 'It receives the most rainfall in India'],
        correctAnswer: 'It was built on reclaimed land',
        explanation: 'The passage says "Built on reclaimed land, the city already experiences devastating flooding."',
      },
      {
        id: 'c1-r3-q3',
        type: 'multiple-choice',
        question: 'What is happening to the Sundarbans mangroves?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['They are expanding rapidly', 'They are being deforested for timber', 'They are retreating due to rising salinity and erosion', 'They are being protected successfully'],
        correctAnswer: 'They are retreating due to rising salinity and erosion',
        explanation: 'The passage says mangroves "are retreating as salinity levels increase and coastlines erode."',
      },
      {
        id: 'c1-r3-q4',
        type: 'multiple-choice',
        question: 'Which state is mentioned as pioneering community-based disaster resilience?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Maharashtra', 'Tamil Nadu', 'West Bengal', 'Kerala'],
        correctAnswer: 'Kerala',
        explanation: 'The passage says "Kerala... has pioneered community-based disaster resilience programmes."',
      },
    ],
  },
  {
    id: 'c1-read-04',
    level: 'C1',
    title: 'The Paradox of Indian Democracy',
    content: `India is the world's largest democracy by population, conducting elections of a scale and complexity unmatched anywhere on Earth. The 2024 general election involved approximately 970 million eligible voters, nearly a million polling stations, and an exercise spanning six weeks. Yet this remarkable democratic machinery coexists with persistent challenges that suggest the distance between procedural democracy and substantive democracy remains considerable.

On one hand, India's democratic credentials are genuinely impressive. Power has transferred peacefully between parties at both national and state levels. Voter turnout, averaging around 67% in recent general elections, is higher than in many established Western democracies. The Election Commission of India is widely regarded as one of the most competent electoral bodies in the developing world.

On the other hand, the quality of democratic governance presents a more complicated picture. The centralisation of executive power, the use of colonial-era sedition and public safety laws to curtail dissent, and the growing nexus between political parties and corporate interests raise legitimate concerns.

Perhaps the most striking paradox lies in representation. India's Parliament and state assemblies have become increasingly dominated by wealthy candidates. An analysis by the Association for Democratic Reforms found that over 40% of Members of Parliament in 2024 had declared criminal cases against them. The cost of contesting elections has soared to levels that effectively exclude ordinary citizens from political participation.

Federalism — the distribution of power between the Centre and states — adds another layer of complexity. While the Constitution envisions cooperative federalism, the reality often involves tension over fiscal resources and legislative authority.

Indian democracy defies simplistic narratives. It is simultaneously vibrant and flawed, resilient and fragile, evolving and constrained by historical legacies.`,
    wordCount: 260,
    topic: 'Politics & Governance',
    indianContext: true,
    vocabulary: ['procedural', 'substantive', 'centralisation', 'sedition', 'self-perpetuating', 'federalism'],
    questions: [
      {
        id: 'c1-r4-q1',
        type: 'multiple-choice',
        question: 'How many eligible voters were involved in the 2024 Indian general election?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['500 million', '750 million', '970 million', '1.2 billion'],
        correctAnswer: '970 million',
        explanation: 'The passage states "approximately 970 million eligible voters."',
      },
      {
        id: 'c1-r4-q2',
        type: 'multiple-choice',
        question: 'What does the passage identify as a barrier to ordinary citizens entering politics?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Lack of education', 'The high cost of contesting elections', 'Age restrictions', 'Religious requirements'],
        correctAnswer: 'The high cost of contesting elections',
        explanation: 'The passage says "The cost of contesting elections has soared to levels that effectively exclude ordinary citizens."',
      },
      {
        id: 'c1-r4-q3',
        type: 'multiple-choice',
        question: 'What percentage of MPs in 2024 had declared criminal cases against them?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Over 15%', 'Over 25%', 'Over 40%', 'Over 60%'],
        correctAnswer: 'Over 40%',
        explanation: 'The passage cites "over 40% of Members of Parliament in 2024 had declared criminal cases."',
      },
      {
        id: 'c1-r4-q4',
        type: 'multiple-choice',
        question: 'What is the average voter turnout mentioned for recent Indian general elections?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Around 45%', 'Around 55%', 'Around 67%', 'Around 80%'],
        correctAnswer: 'Around 67%',
        explanation: 'The passage says "Voter turnout, averaging around 67% in recent general elections."',
      },
    ],
  },

  // ==================== A1 - Set 3 (05–08) ====================
  {
    id: 'a1-read-05',
    level: 'A1',
    title: 'My Favourite Festival',
    content: `My favourite festival is Diwali. Diwali comes in October or November. It is the festival of lights.

Before Diwali, we clean our house. My mother and I make rangoli at the door. My father buys new diyas and candles. We also buy sweets and dry fruits.

On Diwali night, we light the diyas. The whole house looks very beautiful. We wear new clothes. My grandmother gives me money as a gift. We eat many sweets like ladoo and barfi.

After dinner, we go to the terrace. We watch the fireworks in the sky. The sky looks colourful. I feel very happy on Diwali. It is the best day of the year.`,
    wordCount: 120,
    topic: 'Festivals',
    indianContext: true,
    vocabulary: ['festival', 'clean', 'candle', 'beautiful', 'fireworks'],
    questions: [
      {
        id: 'a1-r5-q1',
        type: 'multiple-choice',
        question: 'When does Diwali come?',
        questionTranslations: { hi: 'दिवाली कब आती है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['January or February', 'March or April', 'October or November', 'December'],
        correctAnswer: 'October or November',
        explanation: 'The passage says "Diwali comes in October or November."',
      },
      {
        id: 'a1-r5-q2',
        type: 'multiple-choice',
        question: 'What does the family make at the door?',
        questionTranslations: { hi: 'परिवार दरवाज़े पर क्या बनाता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['A painting', 'Rangoli', 'A sign', 'Flowers'],
        correctAnswer: 'Rangoli',
        explanation: 'The passage says "My mother and I make rangoli at the door."',
      },
      {
        id: 'a1-r5-q3',
        type: 'multiple-choice',
        question: 'Who gives money as a gift?',
        questionTranslations: { hi: 'पैसे उपहार में कौन देता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Her father', 'Her mother', 'Her grandmother', 'Her teacher'],
        correctAnswer: 'Her grandmother',
        explanation: 'The passage says "My grandmother gives me money as a gift."',
      },
    ],
  },
  {
    id: 'a1-read-06',
    level: 'A1',
    title: 'The Vegetable Seller',
    content: `Every morning, a vegetable seller comes to our street. His name is Ramu Kaka. He pushes a big cart. The cart has many vegetables.

He has tomatoes, potatoes, onions, and spinach. He also has green chillies and coriander. The vegetables are fresh. He brings them from the mandi.

My mother buys vegetables every day. Today she bought one kilo of tomatoes and half a kilo of beans. She paid fifty rupees. Ramu Kaka also gave her some free coriander.

Ramu Kaka is a kind man. He gives extra vegetables to old people. Everyone in our neighbourhood likes him. He comes at 7 o'clock and leaves at 10 o'clock.`,
    wordCount: 115,
    topic: 'Community',
    indianContext: true,
    vocabulary: ['vegetable', 'morning', 'fresh', 'kind', 'neighbourhood'],
    questions: [
      {
        id: 'a1-r6-q1',
        type: 'multiple-choice',
        question: 'How does Ramu Kaka carry his vegetables?',
        questionTranslations: { hi: 'रामू काका सब्ज़ियाँ कैसे ले जाते हैं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['In a bag', 'On a bicycle', 'On a big cart', 'In a truck'],
        correctAnswer: 'On a big cart',
        explanation: 'The passage says "He pushes a big cart."',
      },
      {
        id: 'a1-r6-q2',
        type: 'multiple-choice',
        question: 'Where does Ramu Kaka get his vegetables?',
        questionTranslations: { hi: 'रामू काका सब्ज़ियाँ कहाँ से लाते हैं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['From a shop', 'From the mandi', 'From his garden', 'From the mall'],
        correctAnswer: 'From the mandi',
        explanation: 'The passage says "He brings them from the mandi."',
      },
      {
        id: 'a1-r6-q3',
        type: 'multiple-choice',
        question: 'What does Ramu Kaka do for old people?',
        questionTranslations: { hi: 'रामू काका बूढ़े लोगों के लिए क्या करते हैं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['He gives them free delivery', 'He gives them extra vegetables', 'He visits their homes', 'He cooks for them'],
        correctAnswer: 'He gives them extra vegetables',
        explanation: 'The passage says "He gives extra vegetables to old people."',
      },
    ],
  },
  {
    id: 'a1-read-07',
    level: 'A1',
    title: 'A Letter to My Friend',
    content: `Dear Priya,

How are you? I am fine. I am writing this letter from my new house. We moved to Lucknow last month.

My new house is bigger than the old one. It has four rooms and a nice balcony. From the balcony, I can see a big garden. There are many trees and flowers.

My new school is good. The teachers are nice. I have made two new friends. Their names are Kavya and Simran. We sit together in class.

I miss you very much. Please come to visit me in the holidays. We can go to the zoo. Lucknow also has very good chaat.

Write back soon!
Your friend,
Deepa`,
    wordCount: 120,
    topic: 'Friendship',
    indianContext: true,
    vocabulary: ['letter', 'house', 'balcony', 'garden', 'visit'],
    questions: [
      {
        id: 'a1-r7-q1',
        type: 'multiple-choice',
        question: 'Where did Deepa move to?',
        questionTranslations: { hi: 'दीपा कहाँ गई?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Delhi', 'Jaipur', 'Lucknow', 'Kanpur'],
        correctAnswer: 'Lucknow',
        explanation: 'The letter says "We moved to Lucknow last month."',
      },
      {
        id: 'a1-r7-q2',
        type: 'multiple-choice',
        question: 'How many new friends did Deepa make?',
        questionTranslations: { hi: 'दीपा ने कितने नए दोस्त बनाए?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['One', 'Two', 'Three', 'Four'],
        correctAnswer: 'Two',
        explanation: 'The letter says "I have made two new friends."',
      },
      {
        id: 'a1-r7-q3',
        type: 'multiple-choice',
        question: 'Where does Deepa want to go with Priya?',
        questionTranslations: { hi: 'दीपा प्रिया के साथ कहाँ जाना चाहती है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['To the park', 'To the zoo', 'To the cinema', 'To the market'],
        correctAnswer: 'To the zoo',
        explanation: 'The letter says "We can go to the zoo."',
      },
    ],
  },
  {
    id: 'a1-read-08',
    level: 'A1',
    title: 'Travelling by Train',
    content: `Last week, my family went to visit my grandparents. They live in Varanasi. We went by train.

We went to the railway station early in the morning. My father had two tickets. The train was very long. It had many compartments. We found our seats and sat down.

The train started at 7:15 AM. I sat near the window. I could see fields, villages, and rivers outside. The trees looked very green.

A man came and sold chai and samosas. My mother bought chai for my father and me. The samosa was hot and tasty. I also bought a magazine from a seller.

We reached Varanasi at 3 o'clock. My grandfather was waiting at the station. I was very happy to see him.`,
    wordCount: 130,
    topic: 'Travel',
    indianContext: true,
    vocabulary: ['train', 'ticket', 'station', 'window', 'magazine'],
    questions: [
      {
        id: 'a1-r8-q1',
        type: 'multiple-choice',
        question: 'Where do the grandparents live?',
        questionTranslations: { hi: 'दादा-दादी कहाँ रहते हैं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Delhi', 'Agra', 'Varanasi', 'Allahabad'],
        correctAnswer: 'Varanasi',
        explanation: 'The passage says "They live in Varanasi."',
      },
      {
        id: 'a1-r8-q2',
        type: 'multiple-choice',
        question: 'What did the man sell on the train?',
        questionTranslations: { hi: 'ट्रेन में आदमी ने क्या बेचा?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Biryani and juice', 'Chai and samosas', 'Bread and butter', 'Fruits and sweets'],
        correctAnswer: 'Chai and samosas',
        explanation: 'The passage says "A man came and sold chai and samosas."',
      },
      {
        id: 'a1-r8-q3',
        type: 'multiple-choice',
        question: 'What time did the family reach Varanasi?',
        questionTranslations: { hi: 'परिवार वाराणसी कितने बजे पहुँचा?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['12 o\'clock', '1 o\'clock', '2 o\'clock', '3 o\'clock'],
        correctAnswer: '3 o\'clock',
        explanation: 'The passage says "We reached Varanasi at 3 o\'clock."',
      },
    ],
  },

  // ==================== A2 - Set 3 (05–08) ====================
  {
    id: 'a2-read-05',
    level: 'A2',
    title: 'Learning to Cook',
    content: `Sneha is 16 years old and lives in Hyderabad. She has always loved eating her mother's food, but she never tried cooking. Last month, her mother got sick and had to rest. So Sneha decided to learn cooking.

First, she tried to make rice. It was easy. She washed the rice, added water, and put it on the stove. But she added too much water, and the rice became very soft. Her father laughed and said, "It's okay, you will learn."

The next day, she watched a YouTube video about making dal. She followed the instructions carefully. This time, the dal was perfect. Her mother tasted it and said, "Very good, Sneha!"

Now Sneha can cook five dishes. She can make rice, dal, upma, poha, and Maggi. She wants to learn to make biryani next. Her mother is proud of her. Sneha says, "Cooking is like a science experiment. You need to measure everything correctly."`,
    wordCount: 160,
    topic: 'Life Skills',
    indianContext: true,
    vocabulary: ['decided', 'instructions', 'perfectly', 'measure', 'proud'],
    questions: [
      {
        id: 'a2-r5-q1',
        type: 'multiple-choice',
        question: 'Why did Sneha start learning to cook?',
        questionTranslations: { hi: 'स्नेहा ने खाना बनाना क्यों शुरू किया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['She was bored', 'Her mother got sick', 'She wanted to be a chef', 'Her school gave homework'],
        correctAnswer: 'Her mother got sick',
        explanation: 'The passage says "her mother got sick and had to rest."',
      },
      {
        id: 'a2-r5-q2',
        type: 'multiple-choice',
        question: 'What was wrong with Sneha\'s first attempt at making rice?',
        questionTranslations: { hi: 'स्नेहा के पहले चावल बनाने में क्या गलती हुई?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['She burned it', 'She added too much water', 'She forgot to wash it', 'She cooked it too long'],
        correctAnswer: 'She added too much water',
        explanation: 'The passage says "she added too much water, and the rice became very soft."',
      },
      {
        id: 'a2-r5-q3',
        type: 'multiple-choice',
        question: 'How many dishes can Sneha cook now?',
        questionTranslations: { hi: 'स्नेहा अब कितने व्यंजन बना सकती है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Three', 'Four', 'Five', 'Six'],
        correctAnswer: 'Five',
        explanation: 'The passage lists five dishes: rice, dal, upma, poha, and Maggi.',
      },
      {
        id: 'a2-r5-q4',
        type: 'multiple-choice',
        question: 'What does Sneha compare cooking to?',
        questionTranslations: { hi: 'स्नेहा खाना पकाने की तुलना किससे करती है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['A game', 'Art class', 'A science experiment', 'A prayer'],
        correctAnswer: 'A science experiment',
        explanation: 'The passage says "Cooking is like a science experiment."',
      },
    ],
  },
  {
    id: 'a2-read-06',
    level: 'A2',
    title: 'The Cricket Match',
    content: `Last Sunday, there was a cricket match in our colony. It was between Gali Number 4 and Gali Number 7. I play for Gali Number 4.

The match started at 4 o'clock in the evening. The ground was a small park near the temple. We used a tennis ball and a wooden bat. Gali Number 7 won the toss and chose to bat first.

They scored 85 runs in 10 overs. Their best batsman, Sahil, hit three sixes. We were worried because 85 was a big target.

When we batted, I opened the innings with my friend Karan. I scored 34 runs, and Karan scored 28. Our team scored 87 runs and won by two runs! Everyone was very excited.

After the match, Sahil's mother brought cold lassi for both teams. We sat together and talked about the best moments. Colony cricket is the most fun.`,
    wordCount: 150,
    topic: 'Sports',
    indianContext: true,
    vocabulary: ['match', 'colony', 'scored', 'target', 'innings'],
    questions: [
      {
        id: 'a2-r6-q1',
        type: 'multiple-choice',
        question: 'Where was the cricket match played?',
        questionTranslations: { hi: 'क्रिकेट मैच कहाँ खेला गया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['At a school', 'In a stadium', 'In a park near the temple', 'On the road'],
        correctAnswer: 'In a park near the temple',
        explanation: 'The passage says "The ground was a small park near the temple."',
      },
      {
        id: 'a2-r6-q2',
        type: 'multiple-choice',
        question: 'How many runs did Gali Number 7 score?',
        questionTranslations: { hi: 'गली नंबर 7 ने कितने रन बनाए?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['75', '80', '85', '87'],
        correctAnswer: '85',
        explanation: 'The passage says "They scored 85 runs in 10 overs."',
      },
      {
        id: 'a2-r6-q3',
        type: 'multiple-choice',
        question: 'By how many runs did Gali Number 4 win?',
        questionTranslations: { hi: 'गली नंबर 4 ने कितने रनों से जीता?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['One run', 'Two runs', 'Three runs', 'Five runs'],
        correctAnswer: 'Two runs',
        explanation: 'The passage says "won by two runs" (87 minus 85).',
      },
      {
        id: 'a2-r6-q4',
        type: 'multiple-choice',
        question: 'What did Sahil\'s mother bring after the match?',
        questionTranslations: { hi: 'साहिल की माँ मैच के बाद क्या लाईं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Chai', 'Cold lassi', 'Samosas', 'Ice cream'],
        correctAnswer: 'Cold lassi',
        explanation: 'The passage says "Sahil\'s mother brought cold lassi for both teams."',
      },
    ],
  },
  {
    id: 'a2-read-07',
    level: 'A2',
    title: 'The New Neighbour',
    content: `Last week, a new family moved into the house next to ours. They came from Chennai. The family has four members—Mr. and Mrs. Iyer, and their two children, Arun and Divya.

On the first day, my mother made some gulab jamun and we took it to their house. Mrs. Iyer was very happy. She said, "Thank you! In Chennai we eat sweet pongal, but I love gulab jamun too."

Arun is my age. He is 14 years old. He likes playing football. I like cricket, but I said I would try football with him. We played together in the evening. It was fun, but I was very tired!

Divya is 10 years old. She is learning Bharatanatyam dance. My sister also learns dance, so they became friends quickly.

Now we visit each other's houses often. Mrs. Iyer makes us filter coffee and dosas. My mother makes them rajma-chawal. We have become a big happy family of neighbours.`,
    wordCount: 165,
    topic: 'Community',
    indianContext: true,
    vocabulary: ['neighbour', 'moved', 'members', 'quickly', 'often'],
    questions: [
      {
        id: 'a2-r7-q1',
        type: 'multiple-choice',
        question: 'Where did the new family come from?',
        questionTranslations: { hi: 'नया परिवार कहाँ से आया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Mumbai', 'Kolkata', 'Chennai', 'Bangalore'],
        correctAnswer: 'Chennai',
        explanation: 'The passage says "They came from Chennai."',
      },
      {
        id: 'a2-r7-q2',
        type: 'multiple-choice',
        question: 'What did the narrator\'s mother take to the new family?',
        questionTranslations: { hi: 'कथाकार की माँ नए परिवार के लिए क्या ले गईं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Ladoo', 'Gulab jamun', 'Cake', 'Samosa'],
        correctAnswer: 'Gulab jamun',
        explanation: 'The passage says "my mother made some gulab jamun."',
      },
      {
        id: 'a2-r7-q3',
        type: 'multiple-choice',
        question: 'What dance is Divya learning?',
        questionTranslations: { hi: 'दिव्या कौन सा नृत्य सीख रही है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Kathak', 'Bharatanatyam', 'Odissi', 'Garba'],
        correctAnswer: 'Bharatanatyam',
        explanation: 'The passage says "She is learning Bharatanatyam dance."',
      },
    ],
  },
  {
    id: 'a2-read-08',
    level: 'A2',
    title: 'A Visit to the Post Office',
    content: `Yesterday, my grandfather asked me to go to the post office. He wanted to send a letter to his brother in Shimla. He gave me the letter and some money.

The post office is on Main Road, near the SBI bank. I walked there in ten minutes. There were about five people waiting in line.

When my turn came, I gave the letter to the man at the counter. He weighed it and said, "It needs a five-rupee stamp." I bought the stamp and gave it to him. He put a round ink mark on the stamp. This is called a postmark.

I also bought two postcards for my grandfather. Each postcard cost fifty paise. Then I came back home.

My grandfather was happy. He said, "When I was young, we wrote letters every week. Now everyone uses WhatsApp. But a letter is special." I think he is right. A real letter feels different.`,
    wordCount: 155,
    topic: 'Daily Life',
    indianContext: true,
    vocabulary: ['post office', 'stamp', 'counter', 'weighed', 'postcard'],
    questions: [
      {
        id: 'a2-r8-q1',
        type: 'multiple-choice',
        question: 'Where did the grandfather want to send the letter?',
        questionTranslations: { hi: 'दादाजी पत्र कहाँ भेजना चाहते थे?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Delhi', 'Dehradun', 'Shimla', 'Manali'],
        correctAnswer: 'Shimla',
        explanation: 'The passage says "He wanted to send a letter to his brother in Shimla."',
      },
      {
        id: 'a2-r8-q2',
        type: 'multiple-choice',
        question: 'How much did the stamp cost?',
        questionTranslations: { hi: 'टिकट की कीमत कितनी थी?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Two rupees', 'Five rupees', 'Ten rupees', 'Twenty rupees'],
        correctAnswer: 'Five rupees',
        explanation: 'The passage says "It needs a five-rupee stamp."',
      },
      {
        id: 'a2-r8-q3',
        type: 'multiple-choice',
        question: 'What does the grandfather think about letters compared to WhatsApp?',
        questionTranslations: { hi: 'दादाजी WhatsApp की तुलना में पत्रों के बारे में क्या सोचते हैं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['WhatsApp is better', 'Letters are special', 'Both are the same', 'He does not like either'],
        correctAnswer: 'Letters are special',
        explanation: 'The grandfather says "But a letter is special."',
      },
    ],
  },

  // ==================== B1 - Set 3 (05–08) ====================
  {
    id: 'b1-read-05',
    level: 'B1',
    title: 'The Rise of Street Food Culture in India',
    content: `India's street food culture has always been vibrant, but in recent years it has experienced a remarkable transformation. What was once considered cheap food for working-class people is now celebrated as a culinary art form.

Cities like Delhi, Mumbai, Kolkata, and Ahmedabad are famous for their street food. Chandni Chowk in Delhi, for example, has been serving paranthas, jalebis, and chole bhature for over a century. In Mumbai, vada pav—a spicy potato fritter in a bread bun—has become the city's unofficial symbol.

The transformation has been accelerated by social media. Food bloggers and YouTubers have made local vendors famous overnight. A humble momos seller in Lajpat Nagar can now have millions of views. This attention has brought both opportunities and challenges. While some vendors have been able to expand their businesses, others struggle with the sudden rush of customers.

Food safety has also become an important topic. Many cities now require street food vendors to obtain licences and follow hygiene guidelines. The FSSAI has introduced the "Clean Street Food Hub" certification programme to ensure quality standards.

Despite these changes, the heart of Indian street food remains the same—affordable, flavourful, and deeply connected to regional identity. Whether it's puchka in Kolkata or pani puri in Pune, these dishes carry centuries of tradition on a small plate.`,
    wordCount: 210,
    topic: 'Food & Culture',
    indianContext: true,
    vocabulary: ['vibrant', 'transformation', 'culinary', 'accelerated', 'certification', 'hygiene'],
    questions: [
      {
        id: 'b1-r5-q1',
        type: 'multiple-choice',
        question: 'What is vada pav described as in the passage?',
        questionTranslations: { hi: 'पैसेज में वड़ा पाव को क्या बताया गया है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['A traditional sweet', 'Mumbai\'s unofficial symbol', 'A North Indian dish', 'A modern invention'],
        correctAnswer: 'Mumbai\'s unofficial symbol',
        explanation: 'The passage calls vada pav "the city\'s unofficial symbol."',
      },
      {
        id: 'b1-r5-q2',
        type: 'multiple-choice',
        question: 'What has accelerated the transformation of street food culture?',
        questionTranslations: { hi: 'स्ट्रीट फ़ूड संस्कृति के बदलाव को किसने तेज़ किया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Government policies', 'Social media', 'Foreign tourists', 'Restaurant chains'],
        correctAnswer: 'Social media',
        explanation: 'The passage says "The transformation has been accelerated by social media."',
      },
      {
        id: 'b1-r5-q3',
        type: 'multiple-choice',
        question: 'What is the FSSAI\'s "Clean Street Food Hub" programme about?',
        questionTranslations: { hi: 'FSSAI का "क्लीन स्ट्रीट फ़ूड हब" कार्यक्रम किसके बारे में है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Promoting organic food', 'Ensuring quality standards', 'Training chefs', 'Reducing prices'],
        correctAnswer: 'Ensuring quality standards',
        explanation: 'The passage mentions FSSAI introduced the programme "to ensure quality standards."',
      },
    ],
  },
  {
    id: 'b1-read-06',
    level: 'B1',
    title: 'Working from Home: The New Normal',
    content: `When the COVID-19 pandemic forced offices to close in 2020, millions of Indians suddenly found themselves working from home. What began as a temporary arrangement has permanently changed the way many people work.

Bangalore's IT sector was among the first to adopt remote working. Companies like Infosys, Wipro, and TCS allowed employees to work from anywhere. Many workers moved back to their hometowns—smaller cities like Mangalore, Indore, and Coimbatore—where the cost of living is much lower. This trend has been called "reverse migration."

The benefits of working from home are clear. Workers save time and money on commuting. They can spend more time with their families. A survey by Nasscom found that 70% of tech workers preferred a hybrid model—working from home three days a week and going to the office two days.

However, there are disadvantages too. Many employees report feeling isolated and find it difficult to separate work from personal life. Working long hours without a proper break has led to what psychologists call "burnout." Some managers also worry about reduced collaboration and creativity.

Companies are now experimenting with different models. Some have adopted a fully remote policy, while others require employees to come to the office on certain days. The future of work in India is likely to be flexible, with no single approach suiting everyone.`,
    wordCount: 210,
    topic: 'Work & Technology',
    indianContext: true,
    vocabulary: ['pandemic', 'temporary', 'arrangement', 'hybrid', 'isolated', 'collaboration'],
    questions: [
      {
        id: 'b1-r6-q1',
        type: 'multiple-choice',
        question: 'What is "reverse migration" as described in the passage?',
        questionTranslations: { hi: 'पैसेज में "रिवर्स माइग्रेशन" का क्या मतलब है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Companies moving to smaller cities', 'Workers returning to their hometowns', 'People moving abroad', 'Offices relocating to villages'],
        correctAnswer: 'Workers returning to their hometowns',
        explanation: 'The passage says workers "moved back to their hometowns" and calls this "reverse migration."',
      },
      {
        id: 'b1-r6-q2',
        type: 'multiple-choice',
        question: 'What percentage of tech workers preferred a hybrid model?',
        questionTranslations: { hi: 'कितने प्रतिशत टेक कर्मचारी हाइब्रिड मॉडल पसंद करते हैं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['50%', '60%', '70%', '80%'],
        correctAnswer: '70%',
        explanation: 'The passage says "70% of tech workers preferred a hybrid model."',
      },
      {
        id: 'b1-r6-q3',
        type: 'multiple-choice',
        question: 'Which is NOT mentioned as a disadvantage of working from home?',
        questionTranslations: { hi: 'घर से काम करने का कौन सा नुकसान नहीं बताया गया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Feeling isolated', 'Lower salary', 'Burnout', 'Reduced collaboration'],
        correctAnswer: 'Lower salary',
        explanation: 'The passage mentions isolation, burnout, and reduced collaboration but not lower salary.',
      },
    ],
  },
  {
    id: 'b1-read-07',
    level: 'B1',
    title: 'The Indian Railways Experience',
    content: `The Indian Railways is one of the largest railway networks in the world, carrying over 23 million passengers every day across more than 7,000 stations. For many Indians, train travel is not just a mode of transport—it is an experience.

A long-distance train journey in India is a social event. Strangers share food, stories, and opinions. The chai wallah walks through the compartment calling "Chai, Chai!" every few minutes. Families spread out elaborate home-cooked meals, and it is common for fellow passengers to be offered food.

The Indian Railways offers several classes of travel. The most affordable is General or Unreserved, where seats are not guaranteed. Sleeper Class provides reserved berths at reasonable prices and is the most popular for long journeys. For those seeking more comfort, AC 3-Tier, AC 2-Tier, and First Class AC are available at higher prices.

Technology has significantly improved the booking experience. The IRCTC website and mobile app allow passengers to book tickets, check PNR status, and even order food to be delivered at the next station. The introduction of Vande Bharat Express trains—semi-high-speed trains with modern amenities—has been a recent milestone.

Despite modernisation efforts, challenges remain. Delays are common, especially during the monsoon season. Many rural stations lack basic facilities. Yet, for most Indians, the train journey remains an irreplaceable part of the country's cultural fabric.`,
    wordCount: 220,
    topic: 'Transport & Culture',
    indianContext: true,
    vocabulary: ['network', 'elaborate', 'reserved', 'amenities', 'milestone', 'irreplaceable'],
    questions: [
      {
        id: 'b1-r7-q1',
        type: 'multiple-choice',
        question: 'How many passengers does Indian Railways carry daily?',
        questionTranslations: { hi: 'भारतीय रेलवे रोज़ कितने यात्रियों को ले जाता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Over 10 million', 'Over 15 million', 'Over 23 million', 'Over 30 million'],
        correctAnswer: 'Over 23 million',
        explanation: 'The passage says "carrying over 23 million passengers every day."',
      },
      {
        id: 'b1-r7-q2',
        type: 'multiple-choice',
        question: 'Which class of travel is described as most popular for long journeys?',
        questionTranslations: { hi: 'लंबी यात्राओं के लिए कौन सा वर्ग सबसे लोकप्रिय बताया गया है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['General', 'Sleeper Class', 'AC 3-Tier', 'First Class AC'],
        correctAnswer: 'Sleeper Class',
        explanation: 'The passage says Sleeper Class "is the most popular for long journeys."',
      },
      {
        id: 'b1-r7-q3',
        type: 'multiple-choice',
        question: 'What are Vande Bharat Express trains described as?',
        questionTranslations: { hi: 'वंदे भारत एक्सप्रेस ट्रेनों को क्या बताया गया है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Luxury tourist trains', 'Semi-high-speed trains with modern amenities', 'Freight trains', 'Local suburban trains'],
        correctAnswer: 'Semi-high-speed trains with modern amenities',
        explanation: 'The passage describes them as "semi-high-speed trains with modern amenities."',
      },
      {
        id: 'b1-r7-q4',
        type: 'multiple-choice',
        question: 'When are delays especially common?',
        questionTranslations: { hi: 'देरी विशेष रूप से कब होती है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['During summer', 'During the monsoon season', 'During festivals', 'During winter'],
        correctAnswer: 'During the monsoon season',
        explanation: 'The passage says "Delays are common, especially during the monsoon season."',
      },
    ],
  },
  {
    id: 'b1-read-08',
    level: 'B1',
    title: 'The Solar Energy Revolution in Indian Villages',
    content: `In many parts of rural India, electricity supply has traditionally been unreliable. Power cuts lasting several hours were common, affecting everything from children's study time to farmers' ability to pump water. However, solar energy is now changing this situation.

The Indian government's push for renewable energy has brought solar panels to thousands of villages. Under schemes like the PM-KUSUM programme, farmers can install solar pumps for irrigation, reducing their dependence on diesel and unpredictable grid electricity.

Take the example of Dharnai village in Bihar. In 2014, it became India's first fully solar-powered village. Before solar panels were installed, villagers used kerosene lamps for lighting. Children studied under dim, smoky light. Now, every household has clean, bright electricity. A community solar micro-grid powers the village, and excess energy is stored in batteries.

The impact goes beyond lighting. Women's self-help groups in Rajasthan have started small businesses—stitching, pickle-making, and mobile repair shops—that depend on reliable electricity. Students can now study at night and charge their phones to access online learning.

Challenges remain. Solar panels require maintenance, and many villages lack trained technicians. The initial cost is still high for individual families, though government subsidies have helped. Battery storage technology needs further improvement for cloudy days and monsoon months.

Despite these obstacles, solar energy represents a genuine path to energy independence for rural India.`,
    wordCount: 220,
    topic: 'Energy & Rural Development',
    indianContext: true,
    vocabulary: ['unreliable', 'renewable', 'irrigation', 'micro-grid', 'subsidies', 'independence'],
    questions: [
      {
        id: 'b1-r8-q1',
        type: 'multiple-choice',
        question: 'What distinction does Dharnai village in Bihar hold?',
        questionTranslations: { hi: 'बिहार के धरनई गाँव की क्या विशेषता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['First village with internet', 'First fully solar-powered village', 'Largest village in India', 'First smart village'],
        correctAnswer: 'First fully solar-powered village',
        explanation: 'The passage says it "became India\'s first fully solar-powered village."',
      },
      {
        id: 'b1-r8-q2',
        type: 'multiple-choice',
        question: 'What did villagers use for lighting before solar panels?',
        questionTranslations: { hi: 'सोलर पैनल से पहले ग्रामीण रोशनी के लिए क्या इस्तेमाल करते थे?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Candles', 'Kerosene lamps', 'Battery torches', 'Generator lights'],
        correctAnswer: 'Kerosene lamps',
        explanation: 'The passage says "villagers used kerosene lamps for lighting."',
      },
      {
        id: 'b1-r8-q3',
        type: 'multiple-choice',
        question: 'Which is NOT mentioned as a challenge for solar energy in villages?',
        questionTranslations: { hi: 'गाँवों में सौर ऊर्जा की चुनौती के रूप में क्या नहीं बताया गया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Lack of technicians', 'High initial cost', 'Government opposition', 'Battery storage limitations'],
        correctAnswer: 'Government opposition',
        explanation: 'The passage mentions lack of technicians, high cost, and battery limitations, but says the government actively supports solar energy.',
      },
    ],
  },

  // ==================== B2 - Set 3 (05–08) ====================
  {
    id: 'b2-read-05',
    level: 'B2',
    title: 'The Business of Bollywood',
    content: `The Indian film industry, popularly known as Bollywood, produces more films annually than any other film industry in the world. In 2023 alone, over 1,800 films were produced across various Indian languages, with Hindi-language cinema accounting for the largest share. The industry's annual revenue exceeds ₹19,000 crore, making it a significant contributor to India's economy and cultural soft power.

Bollywood's business model has undergone a dramatic shift in the past decade. Traditionally, box office collections were the primary source of revenue. A film's success was measured almost entirely by how much money it earned in theatres. However, the advent of Over-The-Top (OTT) platforms like Netflix, Amazon Prime Video, and Disney+ Hotstar has fundamentally altered this equation. Today, digital rights for a major film can fetch ₹50-100 crore—sometimes more than the film earns in theatres.

This shift has had both positive and negative consequences. On the positive side, smaller, content-driven films that might have struggled to find theatrical audiences have flourished on streaming platforms. Filmmakers can now tell unconventional stories without worrying about opening-weekend box office pressure. Films like "The Lunchbox" and "Court" found massive audiences through digital distribution.

On the other hand, the theatrical experience has suffered. Single-screen cinemas across small towns have been closing at an alarming rate, replaced by multiplexes that charge higher ticket prices. This has effectively priced out a significant segment of the audience—the very demographic that sustained Bollywood for decades.

The industry also faces increasing competition from regional cinema. Telugu and Tamil films have broken Hindi cinema's dominance in the pan-Indian market, with blockbusters like "RRR" and "KGF Chapter 2" outperforming most Hindi releases. This has forced Bollywood to rethink its content strategy and invest more heavily in spectacle and visual effects.`,
    wordCount: 270,
    topic: 'Entertainment & Economy',
    indianContext: true,
    vocabulary: ['annually', 'revenue', 'advent', 'fundamentally', 'unconventional', 'demographic', 'dominance'],
    questions: [
      {
        id: 'b2-r5-q1',
        type: 'multiple-choice',
        question: 'How has the primary revenue model of Bollywood changed?',
        questionTranslations: { hi: 'बॉलीवुड का प्राथमिक राजस्व मॉडल कैसे बदला है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['From TV to cinema', 'From box office to OTT digital rights', 'From music to merchandise', 'From domestic to international markets'],
        correctAnswer: 'From box office to OTT digital rights',
        explanation: 'The passage says OTT platforms have "fundamentally altered" the equation, with digital rights sometimes earning more than theatrical revenue.',
      },
      {
        id: 'b2-r5-q2',
        type: 'multiple-choice',
        question: 'What has happened to single-screen cinemas?',
        questionTranslations: { hi: 'सिंगल-स्क्रीन सिनेमाघरों का क्या हुआ?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['They have been modernised', 'They have been closing and replaced by multiplexes', 'They have become more popular', 'The government has protected them'],
        correctAnswer: 'They have been closing and replaced by multiplexes',
        explanation: 'The passage says single-screen cinemas "have been closing at an alarming rate, replaced by multiplexes."',
      },
      {
        id: 'b2-r5-q3',
        type: 'multiple-choice',
        question: 'How have regional films like "RRR" affected Bollywood?',
        questionTranslations: { hi: '"RRR" जैसी क्षेत्रीय फ़िल्मों ने बॉलीवुड को कैसे प्रभावित किया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['They inspired more Hindi remakes', 'They broke Hindi cinema\'s pan-Indian dominance', 'They reduced OTT subscriptions', 'They increased ticket prices'],
        correctAnswer: 'They broke Hindi cinema\'s pan-Indian dominance',
        explanation: 'The passage says Telugu and Tamil films "have broken Hindi cinema\'s dominance in the pan-Indian market."',
      },
      {
        id: 'b2-r5-q4',
        type: 'multiple-choice',
        question: 'Which is mentioned as a positive effect of OTT platforms?',
        questionTranslations: { hi: 'OTT प्लेटफ़ॉर्म का कौन सा सकारात्मक प्रभाव बताया गया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Higher ticket prices', 'More film awards', 'Content-driven films finding larger audiences', 'Actors earning more money'],
        correctAnswer: 'Content-driven films finding larger audiences',
        explanation: 'The passage says "smaller, content-driven films… have flourished on streaming platforms."',
      },
    ],
  },
  {
    id: 'b2-read-06',
    level: 'B2',
    title: 'Water Crisis and Conservation in Urban India',
    content: `In 2019, Chennai became an international headline when its four main reservoirs ran almost completely dry, leaving nearly ten million residents scrambling for water. The crisis, which saw water being transported by trains from hundreds of kilometres away, was a stark reminder of the water challenges facing India's rapidly growing cities.

India is home to 18% of the world's population but possesses only 4% of its freshwater resources. Urban water demand is projected to double by 2030, driven by population growth, industrialisation, and rising living standards. The gap between supply and demand is widening at an unsustainable rate.

The causes of urban water scarcity are well documented. Rapid and unplanned urbanisation has led to the destruction of natural water bodies. Bangalore, once known as the "city of a thousand lakes," has lost over 85% of its lakes to encroachment and real estate development. Groundwater extraction has reached dangerous levels in several cities, with water tables dropping by several metres each decade.

However, there are encouraging examples of conservation. Rainwater harvesting, made mandatory in Chennai after the 2019 crisis, has shown promising results. The city's groundwater levels have improved measurably. Jaipur has implemented a comprehensive water recycling programme for industrial use. Several housing societies in Pune have installed greywater treatment systems that recycle water from kitchens and bathrooms for gardening.

Individual action matters too. Simple measures—fixing leaking taps, using bucket baths instead of showers, and installing low-flow fixtures—can reduce household water consumption by up to 40%. The challenge is not merely technical but demands a fundamental shift in how urban Indians value and use this finite resource.`,
    wordCount: 260,
    topic: 'Environment & Urban Planning',
    indianContext: true,
    vocabulary: ['reservoir', 'scrambling', 'unsustainable', 'encroachment', 'mandatory', 'comprehensive', 'finite'],
    questions: [
      {
        id: 'b2-r6-q1',
        type: 'multiple-choice',
        question: 'What happened in Chennai in 2019?',
        questionTranslations: { hi: '2019 में चेन्नई में क्या हुआ?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['A major flood', 'Its reservoirs ran nearly dry', 'A new dam was built', 'Water prices were reduced'],
        correctAnswer: 'Its reservoirs ran nearly dry',
        explanation: 'The passage says "its four main reservoirs ran almost completely dry."',
      },
      {
        id: 'b2-r6-q2',
        type: 'multiple-choice',
        question: 'What percentage of the world\'s freshwater does India possess?',
        questionTranslations: { hi: 'भारत के पास विश्व के ताज़े पानी का कितना प्रतिशत है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['2%', '4%', '10%', '18%'],
        correctAnswer: '4%',
        explanation: 'The passage states India "possesses only 4% of its freshwater resources."',
      },
      {
        id: 'b2-r6-q3',
        type: 'multiple-choice',
        question: 'What happened to Bangalore\'s lakes?',
        questionTranslations: { hi: 'बैंगलोर की झीलों का क्या हुआ?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['They have been cleaned', 'Over 85% were lost to encroachment', 'New lakes were created', 'They were converted to parks'],
        correctAnswer: 'Over 85% were lost to encroachment',
        explanation: 'The passage says Bangalore "has lost over 85% of its lakes to encroachment and real estate development."',
      },
      {
        id: 'b2-r6-q4',
        type: 'multiple-choice',
        question: 'By how much can simple household measures reduce water consumption?',
        questionTranslations: { hi: 'सरल घरेलू उपाय पानी की खपत कितनी कम कर सकते हैं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Up to 10%', 'Up to 20%', 'Up to 30%', 'Up to 40%'],
        correctAnswer: 'Up to 40%',
        explanation: 'The passage says simple measures "can reduce household water consumption by up to 40%."',
      },
    ],
  },
  {
    id: 'b2-read-07',
    level: 'B2',
    title: 'India\'s Space Programme: From Humble Beginnings to Mars',
    content: `When India's first sounding rocket was launched from Thumba, Kerala, in 1963, the components were transported on bicycles and the rocket was assembled in what had been a church. Six decades later, the Indian Space Research Organisation (ISRO) is recognised as one of the most cost-effective and innovative space agencies in the world.

ISRO's approach has always been pragmatic rather than prestige-driven. The organisation's primary mandate has been to use space technology for national development—weather forecasting for farmers, communication satellites for remote areas, and earth observation for disaster management. This focus on practical applications has given India's space programme a distinct identity.

The Mars Orbiter Mission (Mangalyaan) in 2013 was a watershed moment. India became the first Asian nation to reach Mars orbit, and it did so on its first attempt—at a cost of approximately $74 million, less than the budget of many Hollywood science fiction films. The mission demonstrated that frugal engineering could achieve extraordinary results.

The Chandrayaan-3 mission in August 2023 further cemented India's position when it became the first country to successfully land a spacecraft near the Moon's south pole. The Pragyan rover transmitted valuable data about lunar soil composition, including the presence of sulphur and other elements.

Looking ahead, ISRO's Gaganyaan programme aims to send Indian astronauts—called "gagannauts"—into orbit. The organisation is also developing a reusable launch vehicle to reduce the cost of accessing space. With the government opening the space sector to private companies through IN-SPACe, a new generation of Indian space startups is emerging, potentially transforming the country into a global space hub.`,
    wordCount: 260,
    topic: 'Science & Technology',
    indianContext: true,
    vocabulary: ['pragmatic', 'mandate', 'watershed', 'frugal', 'cemented', 'composition', 'reusable'],
    questions: [
      {
        id: 'b2-r7-q1',
        type: 'multiple-choice',
        question: 'How were components of India\'s first rocket transported?',
        questionTranslations: { hi: 'भारत के पहले रॉकेट के हिस्से कैसे ले जाए गए?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['By truck', 'By helicopter', 'On bicycles', 'By train'],
        correctAnswer: 'On bicycles',
        explanation: 'The passage says "the components were transported on bicycles."',
      },
      {
        id: 'b2-r7-q2',
        type: 'multiple-choice',
        question: 'What does the passage identify as ISRO\'s primary mandate?',
        questionTranslations: { hi: 'पैसेज में ISRO का प्राथमिक उद्देश्य क्या बताया गया है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Competing with NASA', 'Space tourism', 'Using space technology for national development', 'Military defence'],
        correctAnswer: 'Using space technology for national development',
        explanation: 'The passage says ISRO\'s mandate is "to use space technology for national development."',
      },
      {
        id: 'b2-r7-q3',
        type: 'multiple-choice',
        question: 'What was historically significant about the Chandrayaan-3 landing?',
        questionTranslations: { hi: 'चंद्रयान-3 की लैंडिंग ऐतिहासिक रूप से क्यों महत्वपूर्ण थी?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['First mission to orbit the Moon', 'First landing near the Moon\'s south pole', 'Cheapest lunar mission ever', 'First crewed lunar mission'],
        correctAnswer: 'First landing near the Moon\'s south pole',
        explanation: 'The passage says India "became the first country to successfully land a spacecraft near the Moon\'s south pole."',
      },
      {
        id: 'b2-r7-q4',
        type: 'multiple-choice',
        question: 'What are Indian astronauts called under the Gaganyaan programme?',
        questionTranslations: { hi: 'गगनयान कार्यक्रम में भारतीय अंतरिक्ष यात्रियों को क्या कहा जाता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Cosmonauts', 'Taikonauts', 'Gagannauts', 'Vyomanauts'],
        correctAnswer: 'Gagannauts',
        explanation: 'The passage says astronauts are "called gagannauts."',
      },
    ],
  },
  {
    id: 'b2-read-08',
    level: 'B2',
    title: 'The Gig Economy and Young India',
    content: `India's gig economy—comprising freelance, contract, and platform-based work—has grown exponentially in recent years. According to a NITI Aayog report, India had approximately 7.7 million gig workers in 2021, a number projected to reach 23.5 million by 2030. For many young Indians, gig work is not just a stopgap but a deliberate career choice.

The most visible face of the gig economy is the delivery ecosystem. Apps like Zomato, Swiggy, Urban Company, and Dunzo employ millions of delivery partners and service providers. For a young person without a college degree, these platforms offer immediate income and flexible hours—an attractive alternative to irregular factory or construction work.

However, this flexibility comes at a cost. Gig workers are typically classified as independent contractors rather than employees, which means they receive no paid leave, health insurance, or pension benefits. A delivery rider working twelve-hour shifts in Delhi's summer heat or Bangalore's monsoon rains has no safety net if they fall ill or their vehicle breaks down.

Simultaneously, a more affluent segment of the gig economy is thriving. Freelance graphic designers, content writers, software developers, and digital marketers are earning competitive incomes through platforms like Upwork, Fiverr, and Toptal. Many are based in tier-2 cities—Jaipur, Kochi, Bhopal—serving international clients at globally competitive rates while enjoying a lower cost of living.

The government has begun addressing some of these issues. The Code on Social Security, 2020, for the first time recognises gig and platform workers and envisages social security schemes for them. Whether implementation will match legislation remains to be seen, but the recognition itself marks an important step.`,
    wordCount: 260,
    topic: 'Economy & Employment',
    indianContext: true,
    vocabulary: ['exponentially', 'stopgap', 'deliberate', 'contractors', 'affluent', 'envisages', 'implementation'],
    questions: [
      {
        id: 'b2-r8-q1',
        type: 'multiple-choice',
        question: 'How many gig workers is India projected to have by 2030?',
        questionTranslations: { hi: '2030 तक भारत में कितने गिग कर्मचारी होने का अनुमान है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['7.7 million', '15 million', '23.5 million', '50 million'],
        correctAnswer: '23.5 million',
        explanation: 'The passage says the number is "projected to reach 23.5 million by 2030."',
      },
      {
        id: 'b2-r8-q2',
        type: 'multiple-choice',
        question: 'What is the key disadvantage of gig work mentioned?',
        questionTranslations: { hi: 'गिग काम का मुख्य नुकसान क्या बताया गया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Low pay', 'No employee benefits like health insurance or paid leave', 'Boring work', 'Too much training required'],
        correctAnswer: 'No employee benefits like health insurance or paid leave',
        explanation: 'The passage says gig workers "receive no paid leave, health insurance, or pension benefits."',
      },
      {
        id: 'b2-r8-q3',
        type: 'multiple-choice',
        question: 'What is significant about the Code on Social Security, 2020?',
        questionTranslations: { hi: 'सामाजिक सुरक्षा संहिता 2020 में क्या महत्वपूर्ण है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It banned gig work', 'It guaranteed minimum wages for gig workers', 'It recognised gig workers for the first time', 'It provided free healthcare'],
        correctAnswer: 'It recognised gig workers for the first time',
        explanation: 'The passage says the Code "for the first time recognises gig and platform workers."',
      },
    ],
  },

  // ==================== C1 - Set 3 (05–08) ====================
  {
    id: 'c1-read-05',
    level: 'C1',
    title: 'The Paradox of India\'s Education System',
    content: `India produces more than 1.5 million engineers and over 300,000 MBA graduates annually, yet a McKinsey study found that only 25% of engineering graduates and approximately 10% of general graduates are considered employable by multinational corporations. This paradox—an abundance of degree holders coexisting with a severe skills deficit—lies at the heart of India's education crisis.

The roots of this dysfunction are structural. India's higher education system, which serves over 40 million students across roughly 1,000 universities and 42,000 colleges, was designed in the post-independence era to produce a limited administrative elite. It was never architected for mass education in a knowledge economy. The emphasis has remained overwhelmingly on rote memorisation and examination performance rather than on critical thinking, problem-solving, or practical skills.

The consequences manifest in multiple ways. Corporate India spends an estimated $2 billion annually on retraining fresh graduates who arrive technically competent on paper but lack the ability to apply knowledge in professional contexts. The IT industry, India's flagship success story, has long maintained training academies—effectively bridging the gap that universities fail to address.

The National Education Policy (NEP) 2020 represents the most ambitious attempt at systemic reform in decades. It proposes a multidisciplinary approach, flexibility in course selection, and the integration of vocational training from secondary school onwards. The policy also emphasises education in the mother tongue through the early years—a departure from the English-medium orthodoxy that has dominated aspirational middle-class thinking.

However, implementation remains the critical variable. India's education governance is divided between central and state authorities, creating a fragmented system where policy intentions frequently diverge from ground-level realities. Many state universities lack the funding, faculty, and institutional autonomy necessary to implement meaningful reform. The gap between the NEP's vision and its realisation may well define the trajectory of India's human capital development for decades to come.`,
    wordCount: 290,
    topic: 'Education & Economy',
    indianContext: true,
    vocabulary: ['paradox', 'coexisting', 'dysfunction', 'architected', 'rote', 'manifest', 'multidisciplinary', 'orthodoxy', 'diverge', 'trajectory'],
    questions: [
      {
        id: 'c1-r5-q1',
        type: 'multiple-choice',
        question: 'According to the McKinsey study, what percentage of engineering graduates are employable?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['10%', '25%', '50%', '75%'],
        correctAnswer: '25%',
        explanation: 'The passage says "only 25% of engineering graduates… are considered employable."',
      },
      {
        id: 'c1-r5-q2',
        type: 'multiple-choice',
        question: 'What does the passage identify as the primary emphasis of India\'s higher education?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Research and innovation', 'Rote memorisation and exam performance', 'Practical skills training', 'International collaboration'],
        correctAnswer: 'Rote memorisation and exam performance',
        explanation: 'The passage says the emphasis "has remained overwhelmingly on rote memorisation and examination performance."',
      },
      {
        id: 'c1-r5-q3',
        type: 'multiple-choice',
        question: 'What departure does the NEP 2020 make regarding language?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Making English compulsory', 'Emphasising mother-tongue education in early years', 'Removing Hindi requirement', 'Introducing Sanskrit'],
        correctAnswer: 'Emphasising mother-tongue education in early years',
        explanation: 'The passage says NEP "emphasises education in the mother tongue through the early years."',
      },
      {
        id: 'c1-r5-q4',
        type: 'multiple-choice',
        question: 'What does the passage identify as the main barrier to NEP implementation?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Student resistance', 'Fragmented governance between central and state authorities', 'Corporate opposition', 'Lack of technology'],
        correctAnswer: 'Fragmented governance between central and state authorities',
        explanation: 'The passage says "education governance is divided between central and state authorities, creating a fragmented system."',
      },
    ],
  },
  {
    id: 'c1-read-06',
    level: 'C1',
    title: 'Linguistic Diversity and the Politics of Language in India',
    content: `India's linguistic landscape is staggering in its complexity. The 2011 Census recorded 19,569 distinct languages and dialects, of which 121 had more than 10,000 speakers. The Eighth Schedule of the Constitution recognises 22 official languages, yet many communities feel their mother tongues remain marginalised in administrative, educational, and digital domains.

The tension between Hindi and regional languages has been a persistent fault line in Indian politics. The anti-Hindi agitations in Tamil Nadu in the 1960s—during which students and protesters self-immolated—led to the indefinite continuation of English as an official language of the Union government alongside Hindi. This compromise acknowledged a fundamental reality: in a multilingual democracy, no single language can serve as a neutral lingua franca without alienating significant populations.

The digital age has introduced new dimensions to this debate. While English dominates India's technology sector and global-facing economy, the explosion of vernacular content on platforms like YouTube, ShareChat, and Koo demonstrates that regional language users constitute the majority of India's internet population. Google's investment in Indian language AI and the development of large language models trained on Hindi, Tamil, Bengali, and other languages suggest that technology may eventually bridge the digital language divide.

However, the economic dimension of language remains stark. English proficiency in India continues to correlate strongly with socioeconomic mobility. Studies by the Centre for Economic Data and Analysis show that English-speaking Indians earn, on average, 34% more than their non-English-speaking counterparts. This creates a paradox: while there is a democratic imperative to strengthen regional languages, the economic incentive structure overwhelmingly favours English.

The NEP 2020's three-language formula attempts to navigate this terrain by encouraging proficiency in the mother tongue, Hindi or English, and a third language. Whether this policy can reconcile the competing claims of cultural identity, democratic inclusion, and economic aspiration remains one of independent India's most enduring challenges.`,
    wordCount: 290,
    topic: 'Language & Society',
    indianContext: true,
    vocabulary: ['staggering', 'marginalised', 'agitations', 'self-immolated', 'lingua franca', 'vernacular', 'correlate', 'socioeconomic', 'imperative', 'reconcile'],
    questions: [
      {
        id: 'c1-r6-q1',
        type: 'multiple-choice',
        question: 'How many distinct languages and dialects did the 2011 Census record?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['121', '1,652', '19,569', '22'],
        correctAnswer: '19,569',
        explanation: 'The passage says "The 2011 Census recorded 19,569 distinct languages and dialects."',
      },
      {
        id: 'c1-r6-q2',
        type: 'multiple-choice',
        question: 'What led to English continuing as an official Union language?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['A Supreme Court ruling', 'Anti-Hindi agitations in Tamil Nadu', 'A national referendum', 'British colonial legacy laws'],
        correctAnswer: 'Anti-Hindi agitations in Tamil Nadu',
        explanation: 'The passage connects the anti-Hindi agitations in Tamil Nadu to the "indefinite continuation of English."',
      },
      {
        id: 'c1-r6-q3',
        type: 'multiple-choice',
        question: 'How much more do English-speaking Indians earn on average?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['15% more', '25% more', '34% more', '50% more'],
        correctAnswer: '34% more',
        explanation: 'The passage says "English-speaking Indians earn, on average, 34% more."',
      },
      {
        id: 'c1-r6-q4',
        type: 'multiple-choice',
        question: 'What is the NEP 2020 three-language formula?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Hindi, English, and Sanskrit', 'Mother tongue, Hindi or English, and a third language', 'Hindi, English, and French', 'Regional language, Hindi, and computer science'],
        correctAnswer: 'Mother tongue, Hindi or English, and a third language',
        explanation: 'The passage describes it as "proficiency in the mother tongue, Hindi or English, and a third language."',
      },
    ],
  },
  {
    id: 'c1-read-07',
    level: 'C1',
    title: 'The Informal Economy: India\'s Hidden Engine',
    content: `Estimates suggest that India's informal sector—encompassing unregistered businesses, self-employed workers, casual labourers, and home-based producers—accounts for approximately 80% of total employment and contributes nearly 50% of the country's GDP. Yet this vast economic engine operates largely invisible to formal regulatory frameworks, tax systems, and social security mechanisms.

The scale of informality is a direct consequence of India's development trajectory. Rapid economic growth since the 1991 liberalisation primarily benefited the organised corporate sector, which generates employment that is capital-intensive rather than labour-intensive. The much-anticipated structural transformation—where workers transition from low-productivity agriculture to high-productivity manufacturing—has been incomplete. Instead, workers have moved from agriculture into informal services: street vending, domestic work, construction labour, and small-scale trading.

Demonetisation in 2016 and the implementation of the Goods and Services Tax (GST) in 2017 were partly motivated by the desire to formalise the economy. However, these policies had a disproportionately negative impact on informal workers who operated on cash transactions and lacked the digital infrastructure and accounting capacity to comply with GST requirements. The pandemic subsequently devastated the informal sector, with millions of migrant workers losing their livelihoods overnight during the lockdown—a humanitarian crisis that exposed the absence of any meaningful safety net.

The challenge of formalisation is not merely administrative; it is fundamentally about redesigning economic incentives. For a street vendor in Varanasi or a construction worker in Gurgaon, the perceived costs of formal registration—taxation, regulatory compliance, and loss of flexibility—outweigh the benefits. Until the state can offer tangible returns for formalisation—accessible credit, insurance, skill development, and pension—the informal economy will continue to function as a parallel universe, sustaining lives but perpetuating vulnerability.

The question facing Indian policymakers is not whether to formalise—the economic and humanitarian imperatives are clear—but how to do so without destroying the very livelihoods they seek to protect.`,
    wordCount: 300,
    topic: 'Economics & Policy',
    indianContext: true,
    vocabulary: ['encompassing', 'regulatory', 'trajectory', 'liberalisation', 'disproportionately', 'comply', 'humanitarian', 'tangible', 'perpetuating', 'imperatives'],
    questions: [
      {
        id: 'c1-r7-q1',
        type: 'multiple-choice',
        question: 'What proportion of India\'s employment does the informal sector account for?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['About 40%', 'About 60%', 'About 80%', 'About 95%'],
        correctAnswer: 'About 80%',
        explanation: 'The passage says the informal sector "accounts for approximately 80% of total employment."',
      },
      {
        id: 'c1-r7-q2',
        type: 'multiple-choice',
        question: 'Why has India\'s structural transformation been incomplete, according to the passage?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Workers moved to agriculture', 'Economic growth was capital-intensive, not labour-intensive', 'Manufacturing exports declined', 'The service sector collapsed'],
        correctAnswer: 'Economic growth was capital-intensive, not labour-intensive',
        explanation: 'The passage says growth "primarily benefited the organised corporate sector, which generates employment that is capital-intensive rather than labour-intensive."',
      },
      {
        id: 'c1-r7-q3',
        type: 'multiple-choice',
        question: 'How did demonetisation affect informal workers?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It helped them save money', 'It had a disproportionately negative impact on them', 'It created new jobs', 'It had no effect'],
        correctAnswer: 'It had a disproportionately negative impact on them',
        explanation: 'The passage says these policies "had a disproportionately negative impact on informal workers."',
      },
      {
        id: 'c1-r7-q4',
        type: 'multiple-choice',
        question: 'According to the passage, what must the state offer to encourage formalisation?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Tax holidays', 'Accessible credit, insurance, skill development, and pension', 'Free office space', 'Government contracts'],
        correctAnswer: 'Accessible credit, insurance, skill development, and pension',
        explanation: 'The passage says the state must offer "accessible credit, insurance, skill development, and pension."',
      },
    ],
  },
  {
    id: 'c1-read-08',
    level: 'C1',
    title: 'The Ethics of Artificial Intelligence in Indian Healthcare',
    content: `India's healthcare system serves 1.4 billion people with roughly one doctor for every 1,000 citizens—well below the WHO-recommended ratio of one to 250. In this context of chronic resource scarcity, artificial intelligence has emerged as a potentially transformative tool, capable of extending diagnostic capability to areas where specialist physicians simply do not exist.

AI diagnostic systems developed by Indian startups like Qure.ai, Niramai, and SigTuple are already being deployed in government hospitals and primary health centres. Qure.ai's chest X-ray analysis tool, for instance, can detect tuberculosis, pneumonia, and lung nodules with accuracy rates approaching those of experienced radiologists. In a country where tuberculosis kills over 300,000 people annually—many because of delayed or missed diagnoses—such technology is not merely convenient but life-saving.

Niramai's thermal imaging system for breast cancer screening represents another breakthrough. Traditional mammography requires expensive equipment and trained technicians, making it inaccessible in rural areas. Niramai's portable, radiation-free device uses an AI algorithm to identify abnormalities from thermal images, enabling early detection in settings where conventional screening is unfeasible.

Yet the deployment of AI in healthcare raises profound ethical questions that India has barely begun to address. The algorithms are trained primarily on datasets from Western populations, whose disease manifestations, genetic profiles, and physiological norms may differ significantly from Indian demographics. A skin cancer detection algorithm trained predominantly on Caucasian skin, for example, may perform poorly on darker Indian skin tones. This bias is not merely theoretical—it has been documented in multiple studies and represents a genuine risk of harm.

Data privacy presents another challenge. Medical records fed into AI systems contain the most intimate details of a person's life. India's Digital Personal Data Protection Act provides a framework, but its enforcement mechanisms remain untested in the healthcare domain. The question of informed consent—whether patients genuinely understand that their medical data may be processed by algorithms—is particularly acute in rural settings where digital literacy remains low.

The path forward likely requires a regulatory framework specifically designed for AI in healthcare—one that mandates algorithmic transparency, requires validation on Indian datasets, and establishes clear accountability when AI systems produce incorrect diagnoses. Without such guardrails, the promise of AI-enhanced healthcare risks becoming another instance of technological advancement that benefits some while leaving others behind.`,
    wordCount: 340,
    topic: 'Technology & Ethics',
    indianContext: true,
    vocabulary: ['chronic', 'diagnostic', 'deployed', 'radiologists', 'mammography', 'algorithm', 'manifestations', 'physiological', 'accountability', 'guardrails'],
    questions: [
      {
        id: 'c1-r8-q1',
        type: 'multiple-choice',
        question: 'What is India\'s approximate doctor-to-population ratio?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['1:250', '1:500', '1:1,000', '1:2,000'],
        correctAnswer: '1:1,000',
        explanation: 'The passage says "roughly one doctor for every 1,000 citizens."',
      },
      {
        id: 'c1-r8-q2',
        type: 'multiple-choice',
        question: 'What is the key advantage of Niramai\'s breast cancer screening system?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It is cheaper than an X-ray', 'It is portable, radiation-free, and works in rural settings', 'It requires no AI', 'It was developed by the government'],
        correctAnswer: 'It is portable, radiation-free, and works in rural settings',
        explanation: 'The passage describes it as a "portable, radiation-free device" enabling "early detection in settings where conventional screening is unfeasible."',
      },
      {
        id: 'c1-r8-q3',
        type: 'multiple-choice',
        question: 'Why might Western-trained AI algorithms underperform in India?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Indian computers are slower', 'Indian disease manifestations, genetics, and skin tones differ', 'India lacks internet connectivity', 'Doctors refuse to use them'],
        correctAnswer: 'Indian disease manifestations, genetics, and skin tones differ',
        explanation: 'The passage notes that "disease manifestations, genetic profiles, and physiological norms may differ significantly from Indian demographics."',
      },
      {
        id: 'c1-r8-q4',
        type: 'multiple-choice',
        question: 'What does the author argue is needed for responsible AI deployment in healthcare?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Banning AI in rural areas', 'A specific regulatory framework requiring transparency and Indian dataset validation', 'Replacing all doctors with AI', 'Free AI access for everyone'],
        correctAnswer: 'A specific regulatory framework requiring transparency and Indian dataset validation',
        explanation: 'The passage calls for "a regulatory framework specifically designed for AI in healthcare—one that mandates algorithmic transparency, requires validation on Indian datasets."',
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
