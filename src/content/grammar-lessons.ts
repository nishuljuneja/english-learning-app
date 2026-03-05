import { type GrammarLesson } from '../lib/firestore';

// Comprehensive grammar lessons organized by CEFR level
// Each level has structured lessons progressing from simple to complex
// Indian context examples used throughout

export const grammarLessons: GrammarLesson[] = [
  // ==================== A1 GRAMMAR ====================
  {
    id: 'a1-gram-01',
    level: 'A1',
    title: 'The Verb "To Be" (am, is, are)',
    titleTranslations: {
      hi: 'क्रिया "होना" (am, is, are)',
      ta: 'வினைச்சொல் "To Be" (am, is, are)',
      te: 'క్రియ "To Be" (am, is, are)',
      bn: 'ক্রিয়া "To Be" (am, is, are)',
      mr: 'क्रियापद "To Be" (am, is, are)',
      kn: 'ಕ್ರಿಯಾಪದ "To Be" (am, is, are)',
      ml: 'ക്രിയ "To Be" (am, is, are)',
      gu: 'ક્રિયાપદ "To Be" (am, is, are)',
      pa: 'ਕਿਰਿਆ "To Be" (am, is, are)',
      od: 'କ୍ରିୟା "To Be" (am, is, are)',
      en: 'The Verb "To Be" (am, is, are)',
    },
    description: 'Learn when to use am, is, and are to describe people and things.',
    descriptionTranslations: {
      hi: 'लोगों और चीज़ों का वर्णन करने के लिए am, is, और are का उपयोग कब करें, सीखें।',
      ta: 'நபர்களையும் பொருட்களையும் விவரிக்க am, is, are எப்போது பயன்படுத்த வேண்டும் என்று கற்றுக்கொள்ளுங்கள்.',
      te: 'వ్యక్తులు మరియు వస్తువులను వర్ణించడానికి am, is, are ఎప్పుడు ఉపయోగించాలో నేర్చుకోండి.',
      bn: 'মানুষ এবং জিনিসের বর্ণনা করতে am, is, are কখন ব্যবহার করতে হয় শিখুন।',
      mr: 'लोक आणि गोष्टींचे वर्णन करण्यासाठी am, is, are कधी वापरायचे ते शिका.',
      kn: 'ಜನರನ್ನು ಮತ್ತು ವಸ್ತುಗಳನ್ನು ವಿವರಿಸಲು am, is, are ಅನ್ನು ಯಾವಾಗ ಬಳಸಬೇಕೆಂದು ಕಲಿಯಿರಿ.',
      ml: 'ആളുകളെയും കാര്യങ്ങളെയും വിവരിക്കാൻ am, is, are എപ്പോൾ ഉപയോഗിക്കണമെന്ന് പഠിക്കുക.',
      gu: 'લોકો અને વસ્તુઓનું વર્ણન કરવા am, is, are ક્યારે વાપરવું તે શીખો.',
      pa: 'ਲੋਕਾਂ ਅਤੇ ਚੀਜ਼ਾਂ ਦਾ ਵਰਣਨ ਕਰਨ ਲਈ am, is, are ਕਦੋਂ ਵਰਤਣਾ ਹੈ ਸਿੱਖੋ।',
      od: 'ଲୋକ ଏବଂ ଜିନିଷର ବର୍ଣ୍ଣନା କରିବା ପାଇଁ am, is, are କେବେ ବ୍ୟବହାର କରିବେ ଶିଖନ୍ତୁ।',
      en: 'Learn when to use am, is, and are to describe people and things.',
    },
    order: 1,
    content: {
      explanation: `In English, we use "am", "is", and "are" to talk about who we are, what things are, and how things are.

**Rules:**
- **I** → always use **am**
- **He / She / It** → always use **is**
- **We / You / They** → always use **are**

Think of it like this:
- "am" is only for **I** (myself)
- "is" is for **one person or thing** (not yourself)
- "are" is for **more than one, or "you"**`,
      explanationTranslations: {
        hi: `अंग्रेजी में, हम "am", "is", और "are" का उपयोग यह बताने के लिए करते हैं कि हम कौन हैं, चीज़ें क्या हैं, और कैसी हैं।

**नियम:**
- **I (मैं)** → हमेशा **am** लगाएं
- **He / She / It (वह)** → हमेशा **is** लगाएं
- **We / You / They (हम / तुम / वे)** → हमेशा **are** लगाएं`,
        ta: 'ஆங்கிலத்தில், நாம் யார், பொருட்கள் என்ன, எப்படி இருக்கின்றன என்பதைப் பற்றி பேச "am", "is", "are" பயன்படுத்துகிறோம்.',
        te: 'ఆంగ్లంలో, మనం ఎవరో, వస్తువులు ఏమిటో, ఎలా ఉన్నాయో చెప్పడానికి "am", "is", "are" ఉపయోగిస్తాము.',
        bn: 'ইংরেজিতে, আমরা কে, জিনিস কী, কেমন - এসব বলতে "am", "is", "are" ব্যবহার করি।',
        mr: 'इंग्रजीत, आपण कोण आहोत, गोष्टी काय आहेत, कशा आहेत हे सांगण्यासाठी "am", "is", "are" वापरतो.',
        kn: 'ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ, ನಾವು ಯಾರು, ವಸ್ತುಗಳು ಏನು, ಹೇಗಿವೆ ಎಂದು ಹೇಳಲು "am", "is", "are" ಬಳಸುತ್ತೇವೆ.',
        ml: 'ഇംഗ്ലീഷിൽ, നമ്മൾ ആരാണ്, കാര്യങ്ങൾ എന്താണ്, എങ്ങനെയാണ് എന്ന് പറയാൻ "am", "is", "are" ഉപയോഗിക്കുന്നു.',
        gu: 'અંગ્રેજીમાં, આપણે કોણ છીએ, વસ્તુઓ શું છે, કેવી છે તે કહેવા "am", "is", "are" વાપરીએ છીએ.',
        pa: 'ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ, ਅਸੀਂ ਕੌਣ ਹਾਂ, ਚੀਜ਼ਾਂ ਕੀ ਹਨ, ਕਿਵੇਂ ਹਨ ਦੱਸਣ ਲਈ "am", "is", "are" ਵਰਤਦੇ ਹਾਂ।',
        od: 'ଇଂରାଜୀରେ, ଆମେ କିଏ, ଜିନିଷ କ\'ଣ, କେମିତି ସେ କହିବା ପାଇଁ "am", "is", "are" ବ୍ୟବହାର କରୁ।',
        en: '',
      },
      examples: [
        {
          english: 'I am a student.',
          translations: {
            hi: 'मैं एक छात्र हूँ।', ta: 'நான் ஒரு மாணவன்.', te: 'నేను ఒక విద్యార్థిని.',
            bn: 'আমি একজন ছাত্র।', mr: 'मी एक विद्यार्थी आहे.', kn: 'ನಾನು ಒಬ್ಬ ವಿದ್ಯಾರ್ಥಿ.',
            ml: 'ഞാൻ ഒരു വിദ്യാർത്ഥിയാണ്.', gu: 'હું એક વિદ્યાર્થી છું.', pa: 'ਮੈਂ ਇੱਕ ਵਿਦਿਆਰਥੀ ਹਾਂ।',
            od: 'ମୁଁ ଜଣେ ଛାତ୍ର।', en: '',
          },
          highlight: 'am',
        },
        {
          english: 'She is from Chennai.',
          translations: {
            hi: 'वह चेन्नई से है।', ta: 'அவள் சென்னையிலிருந்து.', te: 'ఆమె చెన్నై నుండి.',
            bn: 'সে চেন্নাই থেকে।', mr: 'ती चेन्नईची आहे.', kn: 'ಅವಳು ಚೆನ್ನೈನಿಂದ.',
            ml: 'അവൾ ചെന്നൈയിൽ നിന്നാണ്.', gu: 'તે ચેન્નઈથી છે.', pa: 'ਉਹ ਚੇਨਈ ਤੋਂ ਹੈ।',
            od: 'ସେ ଚେନ୍ନାଇରୁ।', en: '',
          },
          highlight: 'is',
        },
        {
          english: 'They are my friends.',
          translations: {
            hi: 'वे मेरे दोस्त हैं।', ta: 'அவர்கள் என் நண்பர்கள்.', te: 'వాళ్ళు నా స్నేహితులు.',
            bn: 'তারা আমার বন্ধু।', mr: 'ते माझे मित्र आहेत.', kn: 'ಅವರು ನನ್ನ ಸ್ನೇಹಿತರು.',
            ml: 'അവർ എന്റെ സുഹൃത്തുക്കളാണ്.', gu: 'તેઓ મારા મિત્રો છે.', pa: 'ਉਹ ਮੇਰੇ ਦੋਸਤ ਹਨ।',
            od: 'ସେମାନେ ମୋର ବନ୍ଧୁ।', en: '',
          },
          highlight: 'are',
        },
        {
          english: 'The chai is hot.',
          translations: {
            hi: 'चाय गर्म है।', ta: 'டீ சூடாக இருக்கிறது.', te: 'టీ వేడిగా ఉంది.',
            bn: 'চা গরম।', mr: 'चहा गरम आहे.', kn: 'ಚಹಾ ಬಿಸಿಯಾಗಿದೆ.',
            ml: 'ചായ ചൂടാണ്.', gu: 'ચા ગરમ છે.', pa: 'ਚਾਹ ਗਰਮ ਹੈ।',
            od: 'ଚା ଗରମ ଅଛି।', en: '',
          },
          highlight: 'is',
        },
      ],
      tips: [
        {
          text: '💡 Common mistake: Don\'t say "I is" or "She am". In Hindi we use "है" for everything, but in English, the verb changes!',
          translations: {
            hi: '💡 सामान्य गलती: "I is" या "She am" मत कहें। हिंदी में हम सबके लिए "है" कहते हैं, लेकिन अंग्रेजी में क्रिया बदलती है!',
            ta: '💡 பொதுவான தவறு: "I is" அல்லது "She am" என்று சொல்ல வேண்டாம்.',
            te: '💡 సాధారణ తప్పు: "I is" లేదా "She am" అని చెప్పకండి.',
            bn: '💡 সাধারণ ভুল: "I is" বা "She am" বলবেন না।',
            mr: '💡 सामान्य चूक: "I is" किंवा "She am" म्हणू नका.',
            kn: '💡 ಸಾಮಾನ್ಯ ತಪ್ಪು: "I is" ಅಥವಾ "She am" ಎಂದು ಹೇಳಬೇಡಿ.',
            ml: '💡 സാധാരണ തെറ്റ്: "I is" അല്ലെങ്കിൽ "She am" എന്ന് പറയരുത്.',
            gu: '💡 સામાન્ય ભૂલ: "I is" કે "She am" ન કહો.',
            pa: '💡 ਆਮ ਗਲਤੀ: "I is" ਜਾਂ "She am" ਨਾ ਕਹੋ।',
            od: '💡 ସାଧାରଣ ଭୁଲ: "I is" ବା "She am" କହନ୍ତୁ ନାହିଁ।',
            en: '',
          },
        },
      ],
    },
    exercises: [
      {
        id: 'a1-g1-ex1',
        type: 'fill-blank',
        question: 'I _____ happy today.',
        correctAnswer: 'am',
        explanation: '"I" always goes with "am".',
        explanationTranslations: {
          hi: '"I" (मैं) के साथ हमेशा "am" आता है।', ta: '"I" உடன் எப்போதும் "am" வரும்.',
          te: '"I" తో ఎల్లప్పుడూ "am" వస్తుంది.', bn: '"I" এর সাথে সবসময় "am" আসে।',
          mr: '"I" सोबत नेहमी "am" येतो.', kn: '"I" ಜೊತೆ ಯಾವಾಗಲೂ "am" ಬರುತ್ತದೆ.',
          ml: '"I" യോടൊപ്പം എപ്പോഴും "am" വരും.', gu: '"I" સાથે હંમેશા "am" આવે છે.',
          pa: '"I" ਨਾਲ ਹਮੇਸ਼ਾ "am" ਆਉਂਦਾ ਹੈ।', od: '"I" ସହ ସବୁବେଳେ "am" ଆସେ।', en: '',
        },
      },
      {
        id: 'a1-g1-ex2',
        type: 'multiple-choice',
        question: 'Rahul _____ a good cricketer.',
        options: ['am', 'is', 'are', 'be'],
        correctAnswer: 'is',
        explanation: 'Rahul is one person (he), so we use "is".',
        explanationTranslations: {
          hi: 'राहुल एक व्यक्ति है (वह), इसलिए "is" लगता है।', ta: 'ராகுல் ஒரு நபர் (அவன்), அதனால் "is" பயன்படுத்துகிறோம்.',
          te: 'రాహుల్ ఒక వ్యక్తి (అతడు), కాబట్టి "is" వాడతాము.', bn: 'রাহুল একজন (সে), তাই "is" ব্যবহার করি।',
          mr: 'राहुल एक व्यक्ती आहे (तो), म्हणून "is" वापरतो.', kn: 'ರಾಹುಲ್ ಒಬ್ಬ ವ್ಯಕ್ತಿ (ಅವನು), ಆದ್ದರಿಂದ "is" ಬಳಸುತ್ತೇವೆ.',
          ml: 'രാഹുൽ ഒരു വ്യക്തിയാണ് (അവൻ), അതിനാൽ "is" ഉപയോഗിക്കുന്നു.', gu: 'રાહુલ એક વ્યક્તિ છે (તે), તેથી "is" વાપરીએ.',
          pa: 'ਰਾਹੁਲ ਇੱਕ ਵਿਅਕਤੀ ਹੈ (ਉਹ), ਇਸ ਲਈ "is" ਲਗਾਉਂਦੇ ਹਾਂ।', od: 'ରାହୁଲ ଜଣେ ବ୍ୟକ୍ତି (ସେ), ତେଣୁ "is" ବ୍ୟବହାର କରୁ।', en: '',
        },
      },
      {
        id: 'a1-g1-ex3',
        type: 'multiple-choice',
        question: 'We _____ from India.',
        options: ['am', 'is', 'are', 'be'],
        correctAnswer: 'are',
        explanation: '"We" is more than one person, so we use "are".',
        explanationTranslations: {
          hi: '"We" (हम) एक से ज़्यादा लोग हैं, इसलिए "are" लगता है।', ta: '"We" ஒன்றுக்கும் மேற்பட்ட நபர்கள், எனவே "are" பயன்படுத்துகிறோம்.',
          te: '"We" ఒకటి కంటే ఎక్కువ మంది, కాబట్టి "are" వాడతాము.', bn: '"We" একাধিক মানুষ, তাই "are" ব্যবহার করি।',
          mr: '"We" एकापेक्षा जास्त लोक, म्हणून "are" वापरतो.', kn: '"We" ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ವ್ಯಕ್ತಿಗಳು, ಆದ್ದರಿಂದ "are" ಬಳಸುತ್ತೇವೆ.',
          ml: '"We" ഒന്നിലധികം ആളുകൾ, അതിനാൽ "are" ഉപയോഗിക്കുന്നു.', gu: '"We" એક કરતાં વધુ લોકો, તેથી "are" વાપરીએ.',
          pa: '"We" ਇੱਕ ਤੋਂ ਵੱਧ ਲੋਕ, ਇਸ ਲਈ "are" ਲਗਾਉਂਦੇ ਹਾਂ।', od: '"We" ଏକାଧିକ ଲୋକ, ତେଣୁ "are" ବ୍ୟବହାର କରୁ।', en: '',
        },
      },
      {
        id: 'a1-g1-ex4',
        type: 'correct-error',
        question: 'Find the error: "My sister am a doctor."',
        correctAnswer: 'My sister is a doctor.',
        explanation: '"My sister" = "She", so we need "is", not "am".',
        explanationTranslations: {
          hi: '"My sister" (मेरी बहन) = "She" (वह), इसलिए "is" चाहिए, "am" नहीं।',
          ta: '"My sister" = "She", எனவே "is" தேவை, "am" அல்ல.',
          te: '"My sister" = "She", కాబట్టి "is" కావాలి, "am" కాదు.',
          bn: '"My sister" = "She", তাই "is" চাই, "am" নয়।',
          mr: '"My sister" = "She", म्हणून "is" हवे, "am" नाही.',
          kn: '"My sister" = "She", ಆದ್ದರಿಂದ "is" ಬೇಕು, "am" ಅಲ್ಲ.',
          ml: '"My sister" = "She", അതിനാൽ "is" വേണം, "am" അല്ല.',
          gu: '"My sister" = "She", તેથી "is" જોઈએ, "am" નહીં.',
          pa: '"My sister" = "She", ਇਸ ਲਈ "is" ਚਾਹੀਦਾ, "am" ਨਹੀਂ।',
          od: '"My sister" = "She", ତେଣୁ "is" ଦରକାର, "am" ନୁହଁ।',
          en: '',
        },
      },
      {
        id: 'a1-g1-ex5',
        type: 'multiple-choice',
        question: '_____ you from Jaipur?',
        options: ['Am', 'Is', 'Are', 'Be'],
        correctAnswer: 'Are',
        explanation: 'Questions with "you" always use "are": "Are you...?"',
        explanationTranslations: {
          hi: '"you" के साथ हमेशा "are" लगता है: "Are you...?"',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'a1-g1-ex6',
        type: 'fill-blank',
        question: 'It _____ very cold in Shimla today.',
        correctAnswer: 'is',
        explanation: '"It" always goes with "is".',
        explanationTranslations: {
          hi: '"It" के साथ हमेशा "is" आता है।',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'a1-g1-ex7',
        type: 'correct-error',
        question: 'Find the error: "They is my neighbours."',
        correctAnswer: 'They are my neighbours.',
        explanation: '"They" is plural, so we need "are", not "is".',
        explanationTranslations: {
          hi: '"They" बहुवचन है, इसलिए "are" चाहिए, "is" नहीं।',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'a1-g1-ex8',
        type: 'fill-blank',
        question: 'I _____ not hungry right now.',
        correctAnswer: 'am',
        explanation: '"I" always goes with "am" — even in negative: "I am not".',
        explanationTranslations: {
          hi: '"I" के साथ हमेशा "am" — नकारात्मक में भी: "I am not".',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
    ],
  },

  {
    id: 'a1-gram-02',
    level: 'A1',
    title: 'Articles: A, An, The',
    titleTranslations: {
      hi: 'आर्टिकल्स: A, An, The', ta: 'கட்டுரைச் சொற்கள்: A, An, The',
      te: 'ఆర్టికల్స్: A, An, The', bn: 'আর্টিকেল: A, An, The',
      mr: 'उपपद: A, An, The', kn: 'ಲೇಖನಗಳು: A, An, The',
      ml: 'ആർട്ടിക്കിളുകൾ: A, An, The', gu: 'આર્ટિકલ્સ: A, An, The',
      pa: 'ਆਰਟੀਕਲ: A, An, The', od: 'ଆର୍ଟିକଲ: A, An, The', en: 'Articles: A, An, The',
    },
    description: 'Learn when to use a, an, and the before nouns.',
    descriptionTranslations: {
      hi: 'संज्ञा से पहले a, an, और the कब लगाएं, सीखें।',
      ta: 'பெயர்ச்சொற்களுக்கு முன் a, an, the எப்போது பயன்படுத்துவது என்று கற்றுக்கொள்ளுங்கள்.',
      te: 'నామవాచకాల ముందు a, an, the ఎప్పుడు వాడాలో నేర్చుకోండి.',
      bn: 'বিশেষ্যের আগে a, an, the কখন ব্যবহার করতে হয় শিখুন।',
      mr: 'नामापूर्वी a, an, the कधी वापरायचे ते शिका.',
      kn: 'ನಾಮಪದಗಳ ಮುಂದೆ a, an, the ಯಾವಾಗ ಬಳಸಬೇಕೆಂದು ಕಲಿಯಿರಿ.',
      ml: 'നാമങ്ങൾക്ക് മുമ്പ് a, an, the എപ്പോൾ ഉപയോഗിക്കണമെന്ന് പഠിക്കുക.',
      gu: 'નામ પહેલાં a, an, the ક્યારે વાપરવું તે શીખો.',
      pa: 'ਨਾਂਵ ਤੋਂ ਪਹਿਲਾਂ a, an, the ਕਦੋਂ ਲਗਾਉਣਾ ਹੈ ਸਿੱਖੋ।',
      od: 'ବିଶେଷ୍ୟ ପୂର୍ବରୁ a, an, the କେବେ ବ୍ୟବହାର କରିବେ ଶିଖନ୍ତୁ।',
      en: 'Learn when to use a, an, and the before nouns.',
    },
    order: 2,
    content: {
      explanation: `Articles are small but important words that come before nouns.

**"A" and "An"** = used for **any one** thing (not specific)
- **A** → before consonant sounds: a book, a car, a university
- **An** → before vowel sounds: an apple, an egg, an hour

**"The"** = used for a **specific** thing that both speaker and listener know about
- The Taj Mahal (there's only one)
- The book on the table (we know which book)

**No article** needed for general plural or uncountable nouns:
- I like rice. (rice in general)
- Dogs are loyal. (dogs in general)`,
      explanationTranslations: {
        hi: `आर्टिकल्स छोटे लेकिन महत्वपूर्ण शब्द हैं जो संज्ञा से पहले आते हैं।

**"A" और "An"** = किसी भी एक चीज़ के लिए (विशेष नहीं)
- **A** → व्यंजन ध्वनि से पहले: a book, a car
- **An** → स्वर ध्वनि से पहले: an apple, an egg

**"The"** = किसी **विशेष** चीज़ के लिए
- The Taj Mahal (सिर्फ एक है)

हिंदी में ऐसा कोई शब्द नहीं है, इसलिए यह नया लगेगा। अभ्यास से आसान हो जाएगा!`,
        ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
      },
      examples: [
        {
          english: 'I ate an idli for breakfast.',
          translations: {
            hi: 'मैंने नाश्ते में एक इडली खाई।', ta: 'நான் காலை உணவுக்கு ஒரு இட்லி சாப்பிட்டேன்.',
            te: 'నేను అల్పాహారానికి ఒక ఇడ్లీ తిన్నాను.', bn: 'আমি সকালের নাস্তায় একটা ইডলি খেলাম।',
            mr: 'मी नाश्त्याला एक इडली खाल्ली.', kn: 'ನಾನು ಬೆಳಗಿನ ಉಪಾಹಾರಕ್ಕೆ ಒಂದು ಇಡ್ಲಿ ತಿಂದೆ.',
            ml: 'ഞാൻ പ്രഭാതഭക്ഷണത്തിന് ഒരു ഇഡ്ഡലി കഴിച്ചു.', gu: 'મેં નાસ્તામાં એક ઇડલી ખાધી.',
            pa: 'ਮੈਂ ਨਾਸ਼ਤੇ ਵਿੱਚ ਇੱਕ ਇਡਲੀ ਖਾਧੀ।', od: 'ମୁଁ ଜଳଖିଆରେ ଗୋଟିଏ ଇଡ଼ଲି ଖାଇଲି।', en: '',
          },
          highlight: 'an',
        },
        {
          english: 'The Ganges is a holy river.',
          translations: {
            hi: 'गंगा एक पवित्र नदी है।', ta: 'கங்கை ஒரு புனித நதி.',
            te: 'గంగా ఒక పవిత్ర నది.', bn: 'গঙ্গা একটি পবিত্র নদী।',
            mr: 'गंगा ही एक पवित्र नदी आहे.', kn: 'ಗಂಗಾ ಒಂದು ಪವಿತ್ರ ನದಿ.',
            ml: 'ഗംഗ ഒരു പുണ്യനദിയാണ്.', gu: 'ગંગા એક પવિત્ર નદી છે.',
            pa: 'ਗੰਗਾ ਇੱਕ ਪਵਿੱਤਰ ਨਦੀ ਹੈ।', od: 'ଗଙ୍ଗା ଏକ ପବିତ୍ର ନଦୀ।', en: '',
          },
          highlight: 'The',
        },
      ],
      tips: [
        {
          text: '💡 Indian languages like Hindi, Tamil, etc. don\'t have articles. This is one of the trickiest things to learn — but with practice, it becomes natural!',
          translations: {
            hi: '💡 हिंदी जैसी भारतीय भाषाओं में आर्टिकल नहीं होते। यह सीखना मुश्किल लग सकता है — लेकिन अभ्यास से आसान हो जाता है!',
            ta: '💡 தமிழ் போன்ற இந்திய மொழிகளில் articles இல்லை. இது கற்க கடினமாக இருக்கலாம் — ஆனால் பயிற்சியால் இயல்பாகிவிடும்!',
            te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
          },
        },
      ],
    },
    exercises: [
      {
        id: 'a1-g2-ex1',
        type: 'fill-blank',
        question: 'I want _____ apple.',
        correctAnswer: 'an',
        explanation: '"Apple" starts with a vowel sound (a-), so we use "an".',
        explanationTranslations: {
          hi: '"Apple" स्वर ध्वनि (a-) से शुरू होता है, इसलिए "an" लगाते हैं।',
          ta: '"Apple" உயிர் ஒலியில் (a-) தொடங்குகிறது, எனவே "an" பயன்படுத்துகிறோம்.',
          te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'a1-g2-ex2',
        type: 'multiple-choice',
        question: '_____ Qutub Minar is in Delhi.',
        options: ['A', 'An', 'The', '(no article)'],
        correctAnswer: 'The',
        explanation: 'Qutub Minar is a specific, well-known monument — we use "the".',
        explanationTranslations: {
          hi: 'कुतुब मीनार एक विशेष, प्रसिद्ध स्मारक है — हम "the" लगाते हैं।',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'a1-g2-ex3',
        type: 'multiple-choice',
        question: 'She is _____ honest woman.',
        options: ['a', 'an', 'the', '(no article)'],
        correctAnswer: 'an',
        explanation: '"Honest" starts with a vowel sound (the "h" is silent), so we use "an".',
        explanationTranslations: {
          hi: '"Honest" स्वर ध्वनि से शुरू होता है (h मूक है), इसलिए "an" लगाते हैं।',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'a1-g2-ex4',
        type: 'fill-blank',
        question: 'He is _____ university student.',
        correctAnswer: 'a',
        explanation: '"University" starts with a consonant sound (/juː/), so we use "a", not "an".',
        explanationTranslations: {
          hi: '"University" व्यंजन ध्वनि (/juː/) से शुरू होता है, इसलिए "a" लगाते हैं, "an" नहीं।',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'a1-g2-ex5',
        type: 'correct-error',
        question: 'Find the error: "I need a information about the train."',
        correctAnswer: 'I need information about the train.',
        explanation: '"Information" is uncountable — no article "a" or "an" before it.',
        explanationTranslations: {
          hi: '"Information" अगणनीय है — इसके पहले "a" या "an" नहीं लगता।',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'a1-g2-ex6',
        type: 'multiple-choice',
        question: 'Please pass me _____ salt.',
        options: ['a', 'an', 'the', '(no article)'],
        correctAnswer: 'the',
        explanation: 'We say "the salt" because both speaker and listener know which salt (on the table).',
        explanationTranslations: {
          hi: '"the salt" कहते हैं क्योंकि दोनों को पता है कौन सा नमक (मेज़ पर)।',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'a1-g2-ex7',
        type: 'multiple-choice',
        question: '_____ rice is the main food in South India.',
        options: ['A', 'An', 'The', '(no article)'],
        correctAnswer: '(no article)',
        explanation: 'When talking about rice in general, no article is needed.',
        explanationTranslations: {
          hi: 'सामान्य रूप से चावल की बात करते समय कोई article नहीं लगता।',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'a1-g2-ex8',
        type: 'multiple-choice',
        question: 'My father is _____ engineer at Tata Motors.',
        options: ['a', 'an', 'the', '(no article)'],
        correctAnswer: 'an',
        explanation: '"Engineer" starts with a vowel sound (e-), so we use "an".',
        explanationTranslations: {
          hi: '"Engineer" स्वर ध्वनि (e-) से शुरू होता है, इसलिए "an" लगाते हैं।',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
    ],
  },

  // ==================== B1 GRAMMAR ====================
  {
    id: 'b1-gram-01',
    level: 'B1',
    title: 'Present Perfect vs Past Simple',
    titleTranslations: {
      hi: 'प्रेजेंट परफेक्ट बनाम पास्ट सिंपल',
      ta: 'Present Perfect மற்றும் Past Simple',
      te: 'Present Perfect vs Past Simple',
      bn: 'Present Perfect বনাম Past Simple',
      mr: 'Present Perfect विरुद्ध Past Simple',
      kn: 'Present Perfect ವಿರುದ್ಧ Past Simple',
      ml: 'Present Perfect vs Past Simple',
      gu: 'Present Perfect vs Past Simple',
      pa: 'Present Perfect ਬਨਾਮ Past Simple',
      od: 'Present Perfect ବନାମ Past Simple',
      en: 'Present Perfect vs Past Simple',
    },
    description: 'Understand the difference between "I have done" and "I did" — one of the most confusing grammar points for Indian English learners.',
    descriptionTranslations: {
      hi: '"I have done" और "I did" के बीच का अंतर समझें — भारतीय अंग्रेजी सीखने वालों के लिए सबसे भ्रमित करने वाले व्याकरण बिंदुओं में से एक।',
      ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '',
      en: 'Understand the difference between "I have done" and "I did" — one of the most confusing grammar points for Indian English learners.',
    },
    order: 1,
    content: {
      explanation: `This is one of the most common mistakes Indian English speakers make. Let's clear it up!

**Past Simple** ("I did") → for completed actions at a **specific time** in the past
- I visited Jaipur **last year**.
- She finished the project **yesterday**.

**Present Perfect** ("I have done") → for actions that connect past to **now**
- I **have visited** Jaipur three times. (total experience, time not important)
- She **has finished** the project. (it's done now, result matters)
- I **have lived** in Bangalore **since** 2020. (started in past, still true now)

**Key signals:**
| Past Simple | Present Perfect |
|---|---|
| yesterday, last week, in 2020, ago | already, yet, ever, never, just, since, for |

**Common Indian English error:**
❌ "I have visited Jaipur last year." (mixing perfect + specific past time)
✅ "I visited Jaipur last year." OR "I have visited Jaipur (before)."`,
      explanationTranslations: {
        hi: `यह भारतीय अंग्रेजी बोलने वालों की सबसे आम गलतियों में से एक है।

**Past Simple** ("I did") → बीते हुए **निश्चित समय** पर पूरे हुए कामों के लिए
- I visited Jaipur **last year**. (पिछले साल)

**Present Perfect** ("I have done") → ऐसे काम जो अतीत को **अभी** से जोड़ते हैं
- I **have visited** Jaipur three times. (कुल अनुभव, समय महत्वपूर्ण नहीं)

**आम गलती:**
❌ "I have visited Jaipur last year."
✅ "I visited Jaipur last year."`,
        ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
      },
      examples: [
        {
          english: 'I visited the Red Fort when I was in Delhi.',
          translations: {
            hi: 'जब मैं दिल्ली में था तब मैंने लाल किला देखा।',
            ta: 'நான் டெல்லியில் இருந்தபோது செங்கோட்டையைப் பார்வையிட்டேன்.',
            te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
          },
          highlight: 'visited',
        },
        {
          english: 'I have never eaten sushi.',
          translations: {
            hi: 'मैंने कभी सुशी नहीं खाई।',
            ta: 'நான் எப்போதும் சுஷி சாப்பிட்டதில்லை.',
            te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
          },
          highlight: 'have never eaten',
        },
        {
          english: 'She has worked at Infosys for five years.',
          translations: {
            hi: 'वह पाँच साल से इन्फोसिस में काम कर रही है।',
            ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
          },
          highlight: 'has worked',
        },
      ],
      tips: [
        {
          text: '💡 In Indian English, people often overuse Present Perfect. Remember: if you mention a specific past time (yesterday, in 2019, last month), use Past Simple!',
          translations: {
            hi: '💡 भारतीय अंग्रेजी में लोग अक्सर Present Perfect का ज्यादा इस्तेमाल करते हैं। याद रखें: अगर आप कोई विशेष समय बताते हैं (कल, 2019 में), तो Past Simple इस्तेमाल करें!',
            ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
          },
        },
      ],
    },
    exercises: [
      {
        id: 'b1-g1-ex1',
        type: 'multiple-choice',
        question: 'I _____ to Goa last summer.',
        options: ['have gone', 'went', 'have been', 'go'],
        correctAnswer: 'went',
        explanation: '"Last summer" is a specific past time, so we use Past Simple: "went".',
        explanationTranslations: {
          hi: '"Last summer" (पिछली गर्मियों) एक निश्चित समय है, इसलिए Past Simple: "went" लगता है।',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'b1-g1-ex2',
        type: 'multiple-choice',
        question: 'She _____ three interviews this week.',
        options: ['attended', 'has attended', 'attends', 'attending'],
        correctAnswer: 'has attended',
        explanation: '"This week" is not finished yet — the action connects to now, so we use Present Perfect.',
        explanationTranslations: {
          hi: '"This week" (इस हफ्ते) अभी खत्म नहीं हुआ — काम अभी से जुड़ा है, इसलिए Present Perfect लगता है।',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'b1-g1-ex3',
        type: 'correct-error',
        question: 'Find the error: "I have met him yesterday."',
        correctAnswer: 'I met him yesterday.',
        explanation: '"Yesterday" is a specific past time — use Past Simple, not Present Perfect.',
        explanationTranslations: {
          hi: '"Yesterday" (कल) एक निश्चित समय है — Past Simple लगाएं, Present Perfect नहीं।',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      { id: 'b1-g1-ex4', type: 'fill-blank', question: 'I have worked at Wipro _____ 2019.', correctAnswer: 'since', explanation: '"Since" is used with a specific point in time (2019). "For" is used with duration.', explanationTranslations: { hi: '"Since" किसी निश्चित समय बिंदु (2019) के साथ। "For" अवधि के साथ।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g1-ex5', type: 'multiple-choice', question: 'Have you _____ been to Ladakh?', options: ['never', 'ever', 'already', 'yet'], correctAnswer: 'ever', explanation: '"Ever" is used in questions: "Have you ever...?" to ask about life experience.', explanationTranslations: { hi: '"Ever" प्रश्नों में: "Have you ever...?" जीवन अनुभव पूछने के लिए।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g1-ex6', type: 'fill-blank', question: 'She has _____ finished her assignment. She submitted it five minutes ago.', correctAnswer: 'just', explanation: '"Just" means a very short time ago: has just finished.', explanationTranslations: { hi: '"Just" = अभी-अभी: has just finished.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g1-ex7', type: 'correct-error', question: 'Find the error: "I have already ate lunch."', correctAnswer: 'I have already eaten lunch.', explanation: 'Present Perfect uses past participle: have + eaten (not ate).', explanationTranslations: { hi: 'Present Perfect में past participle: have + eaten (ate नहीं)।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g1-ex8', type: 'multiple-choice', question: 'Has the train arrived _____?', options: ['already', 'yet', 'just', 'ever'], correctAnswer: 'yet', explanation: '"Yet" is used in questions and negatives with Present Perfect.', explanationTranslations: { hi: '"Yet" प्रश्नों और नकारात्मक में Present Perfect के साथ।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
    ],
  },

  // ==================== B2 GRAMMAR ====================
  {
    id: 'b2-gram-01',
    level: 'B2',
    title: 'Conditionals: Second and Third',
    titleTranslations: {
      hi: 'कंडीशनल्स: दूसरा और तीसरा', ta: 'நிபந்தனை வாக்கியங்கள்: இரண்டாம் மற்றும் மூன்றாம்',
      te: 'షరతు వాక్యాలు: రెండవ మరియు మూడవ', bn: 'শর্তাধীন: দ্বিতীয় ও তৃতীয়',
      mr: 'Conditionals: दुसरा आणि तिसरा', kn: 'Conditionals: ಎರಡನೇ ಮತ್ತು ಮೂರನೇ',
      ml: 'Conditionals: രണ്ടാമത്തെയും മൂന്നാമത്തെയും', gu: 'Conditionals: બીજું અને ત્રીજું',
      pa: 'Conditionals: ਦੂਜਾ ਅਤੇ ਤੀਜਾ', od: 'Conditionals: ଦ୍ୱିତୀୟ ଏବଂ ତୃତୀୟ',
      en: 'Conditionals: Second and Third',
    },
    description: 'Express hypothetical and unreal situations — "What would you do if...?" and "What would have happened if...?"',
    descriptionTranslations: {
      hi: 'काल्पनिक और अवास्तविक स्थितियों को व्यक्त करें — "अगर... तो क्या करते?" और "अगर... तो क्या होता?"',
      ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '',
      en: '',
    },
    order: 1,
    content: {
      explanation: `**Second Conditional** → Imaginary situations NOW or in the FUTURE (unlikely but possible)
**Structure:** If + past simple, would + base verb

- If I **won** the lottery, I **would buy** a house in Goa.
- If she **spoke** better English, she **would get** promoted.

**Third Conditional** → Imaginary situations in the PAST (impossible, it didn't happen)
**Structure:** If + past perfect, would have + past participle

- If I **had studied** harder, I **would have passed** the IIT exam.
- If it **hadn't rained**, we **would have gone** to the beach.

**Key difference:**
- 2nd: "If I had money..." (I don't have money now, but imagine if I did)
- 3rd: "If I had had money..." (I didn't have money then, and it's too late now)`,
      explanationTranslations: {
        hi: `**Second Conditional** → अभी या भविष्य की काल्पनिक स्थिति
**बनावट:** If + past simple, would + मूल क्रिया
- If I won (अगर मैं जीत जाता), I would buy (मैं खरीदता)

**Third Conditional** → बीते हुए कल की काल्पनिक स्थिति (असंभव, हो नहीं सकता)
**बनावट:** If + past perfect, would have + past participle
- If I had studied harder (अगर मैंने ज्यादा पढ़ाई की होती), I would have passed (मैं पास हो जाता)`,
        ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
      },
      examples: [
        {
          english: 'If I lived in Shimla, I would see snow every winter.',
          translations: {
            hi: 'अगर मैं शिमला में रहता, तो हर सर्दी में बर्फ देखता।',
            ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
          },
          highlight: 'lived ... would see',
        },
        {
          english: 'If she had taken the train, she would have arrived on time.',
          translations: {
            hi: 'अगर उसने ट्रेन ली होती, तो वह समय पर पहुँच जाती।',
            ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
          },
          highlight: 'had taken ... would have arrived',
        },
      ],
      tips: [
        {
          text: '💡 Indian speakers often mix conditionals. "If I would have..." is incorrect! The "if" clause never has "would".',
          translations: {
            hi: '💡 भारतीय बोलने वाले अक्सर conditionals मिला देते हैं। "If I would have..." गलत है! "If" वाले भाग में कभी "would" नहीं आता।',
            ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
          },
        },
      ],
    },
    exercises: [
      {
        id: 'b2-g1-ex1',
        type: 'multiple-choice',
        question: 'If I _____ more time, I would learn Carnatic music.',
        options: ['have', 'had', 'would have', 'having'],
        correctAnswer: 'had',
        explanation: 'Second conditional uses past simple in the "if" clause: "If I had..."',
        explanationTranslations: {
          hi: 'Second conditional में "if" वाले भाग में past simple आता है: "If I had..."',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'b2-g1-ex2',
        type: 'multiple-choice',
        question: 'If he had applied earlier, he _____ the job at TCS.',
        options: ['would get', 'would have got', 'will get', 'got'],
        correctAnswer: 'would have got',
        explanation: 'Third conditional: past hypothetical → would have + past participle.',
        explanationTranslations: {
          hi: 'Third conditional: बीते समय की कल्पना → would have + past participle.',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'b2-g1-ex3',
        type: 'fill-blank',
        question: 'If I _____ the Prime Minister, I would build more hospitals. (be)',
        correctAnswer: 'were',
        explanation: 'Second conditional: If I were... (use "were" for all subjects in formal English).',
        explanationTranslations: {
          hi: 'Second conditional: If I were... (औपचारिक अंग्रेजी में सभी subjects के लिए "were").',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'b2-g1-ex4',
        type: 'multiple-choice',
        question: 'If she had caught the Rajdhani Express, she _____ in Delhi by now.',
        options: ['will be', 'would be', 'would have been', 'is'],
        correctAnswer: 'would be',
        explanation: 'Past condition → present result (mixed conditional): would + base verb.',
        explanationTranslations: {
          hi: 'भूतकाल शर्त → वर्तमान परिणाम: would + base verb.',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'b2-g1-ex5',
        type: 'correct-error',
        question: 'Find the error: "If I would have studied, I would have passed."',
        correctAnswer: 'If I had studied, I would have passed.',
        explanation: 'The "if" clause never uses "would". Use "had + past participle".',
        explanationTranslations: {
          hi: '"if" वाले भाग में कभी "would" नहीं आता। "had + past participle" लगाएं।',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'b2-g1-ex6',
        type: 'fill-blank',
        question: 'If it _____ so much yesterday, the roads would not have been flooded. (rain — 3rd conditional)',
        correctAnswer: 'hadn\'t rained',
        explanation: 'Third conditional negative: If + hadn\'t + past participle.',
        explanationTranslations: {
          hi: 'Third conditional negative: If + hadn\'t + past participle.',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'b2-g1-ex7',
        type: 'multiple-choice',
        question: 'If I spoke Tamil, I _____ this movie without subtitles.',
        options: ['can understand', 'could understand', 'will understand', 'understood'],
        correctAnswer: 'could understand',
        explanation: 'Second conditional: would/could + base verb for imaginary present.',
        explanationTranslations: {
          hi: 'Second conditional: would/could + base verb काल्पनिक वर्तमान के लिए।',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'b2-g1-ex8',
        type: 'multiple-choice',
        question: 'If they had booked the tickets earlier, they _____ the concert.',
        options: ['will attend', 'would attend', 'would have attended', 'attended'],
        correctAnswer: 'would have attended',
        explanation: 'Third conditional: would have + past participle for past hypothetical.',
        explanationTranslations: {
          hi: 'Third conditional: would have + past participle भूतकाल की कल्पना।',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
    ],
  },

  // ==================== C1 GRAMMAR ====================
  {
    id: 'c1-gram-01',
    level: 'C1',
    title: 'Inversion for Emphasis',
    titleTranslations: {
      hi: 'जोर देने के लिए वाक्य-उलटाव', ta: 'வலியுறுத்தலுக்கான Inversion',
      te: 'Emphasis కోసం Inversion', bn: 'জোর দেওয়ার জন্য Inversion',
      mr: 'जोर देण्यासाठी Inversion', kn: 'ಒತ್ತು ನೀಡಲು Inversion',
      ml: 'ഊന്നൽ നൽകാൻ Inversion', gu: 'ભાર આપવા Inversion',
      pa: 'ਜ਼ੋਰ ਦੇਣ ਲਈ Inversion', od: 'ଜୋର ଦେବା ପାଇଁ Inversion',
      en: 'Inversion for Emphasis',
    },
    description: 'Use inverted word order to create emphasis and write in a more sophisticated, formal style.',
    descriptionTranslations: {
      hi: 'जोर देने और अधिक परिष्कृत, औपचारिक शैली में लिखने के लिए उलटे शब्द क्रम का उपयोग करें।',
      ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '',
      en: '',
    },
    order: 1,
    content: {
      explanation: `In formal English writing and speeches, we sometimes put the verb before the subject for emphasis. This is called **inversion**.

**Common patterns:**

1. **Negative adverbs at the start:**
   - Never **have I** seen such beauty. (Normal: I have never seen...)
   - Rarely **does she** make mistakes.
   - Not only **did he** win, but he also broke the record.

2. **"Hardly/Scarcely...when" and "No sooner...than":**
   - Hardly **had** the match begun **when** it started raining.
   - No sooner **had** the PM spoken **than** the opposition protested.

3. **"Were" in conditionals (formal):**
   - **Were** I the PM, I would invest in education. (= If I were the PM)

4. **"So/Such...that":**
   - So impressive **was** his speech **that** the audience gave a standing ovation.`,
      explanationTranslations: {
        hi: `औपचारिक अंग्रेजी लेखन और भाषणों में, हम कभी-कभी जोर देने के लिए कर्ता (subject) से पहले क्रिया (verb) रखते हैं। इसे **inversion** कहते हैं।

**सामान्य पैटर्न:**
1. **नकारात्मक क्रियाविशेषण शुरू में:** Never have I seen... (मैंने कभी नहीं देखा...)
2. **Hardly...when:** Hardly had the match begun when... (मुश्किल से मैच शुरू हुआ था कि...)
3. **"Were" conditionals में:** Were I the PM... (अगर मैं PM होता...)`,
        ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
      },
      examples: [
        {
          english: 'Not only did India win the World Cup, but they also remained unbeaten throughout.',
          translations: {
            hi: 'भारत ने न केवल विश्व कप जीता, बल्कि पूरे टूर्नामेंट में अपराजित भी रहा।',
            ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
          },
          highlight: 'Not only did',
        },
        {
          english: 'Seldom has the Supreme Court delivered such a landmark verdict.',
          translations: {
            hi: 'शायद ही कभी सुप्रीम कोर्ट ने इतना ऐतिहासिक फैसला दिया हो।',
            ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
          },
          highlight: 'Seldom has',
        },
      ],
      tips: [
        {
          text: '💡 Inversion sounds very formal. Use it in essays, presentations, and formal emails — not in casual conversation with friends!',
          translations: {
            hi: '💡 Inversion बहुत औपचारिक लगता है। इसे निबंधों, प्रस्तुतियों, और औपचारिक ईमेल में इस्तेमाल करें — दोस्तों के साथ आम बातचीत में नहीं!',
            ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
          },
        },
      ],
    },
    exercises: [
      {
        id: 'c1-g1-ex1',
        type: 'reorder',
        question: 'Rearrange: "the government / had / scarcely / the budget / announced / when / protests / erupted"',
        correctAnswer: 'Scarcely had the government announced the budget when protests erupted.',
        explanation: 'Pattern: Scarcely + had + subject + past participle + when + clause.',
        explanationTranslations: {
          hi: 'पैटर्न: Scarcely + had + कर्ता + past participle + when + clause.',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'c1-g1-ex2',
        type: 'fill-blank',
        question: 'Never _____ I witnessed such a massive gathering at India Gate.',
        correctAnswer: 'have',
        explanation: 'After "Never" at the start, we invert: Never + have + I.',
        explanationTranslations: {
          hi: 'शुरू में "Never" के बाद, हम उलटते हैं: Never + have + I.',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'c1-g1-ex3',
        type: 'fill-blank',
        question: 'Not only _____ she win the gold medal, but she also set a new record.',
        correctAnswer: 'did',
        explanation: '"Not only" at the start triggers inversion: Not only + did + subject.',
        explanationTranslations: {
          hi: '"Not only" शुरू में inversion लगाता है: Not only + did + subject.',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'c1-g1-ex4',
        type: 'multiple-choice',
        question: 'Rarely _____ such a talented singer in our college.',
        options: ['we have seen', 'have we seen', 'we seen have', 'seen we have'],
        correctAnswer: 'have we seen',
        explanation: '"Rarely" at the start triggers inversion: Rarely + have + we + seen.',
        explanationTranslations: {
          hi: '"Rarely" शुरू में inversion: Rarely + have + we + seen.',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'c1-g1-ex5',
        type: 'fill-blank',
        question: '_____ I to become the CEO, I would restructure the entire department.',
        correctAnswer: 'Were',
        explanation: 'Formal conditional inversion: "Were I to..." = "If I were to..."',
        explanationTranslations: {
          hi: 'औपचारिक conditional inversion: "Were I to..." = "If I were to..."',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'c1-g1-ex6',
        type: 'correct-error',
        question: 'Find the error: "So impressive his speech was that everyone applauded."',
        correctAnswer: 'So impressive was his speech that everyone applauded.',
        explanation: 'Pattern: So + adjective + was + subject + that...',
        explanationTranslations: {
          hi: 'पैटर्न: So + adjective + was + subject + that...',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'c1-g1-ex7',
        type: 'multiple-choice',
        question: 'Hardly _____ the train left the station when the signal turned red.',
        options: ['has', 'had', 'did', 'was'],
        correctAnswer: 'had',
        explanation: '"Hardly...when" pattern: Hardly + had + subject + past participle + when...',
        explanationTranslations: {
          hi: '"Hardly...when" पैटर्न: Hardly + had + subject + past participle + when...',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
      {
        id: 'c1-g1-ex8',
        type: 'fill-blank',
        question: 'Seldom _____ the monsoon arrived so early in Mumbai.',
        correctAnswer: 'has',
        explanation: '"Seldom" at the start triggers inversion: Seldom + has + subject + past participle.',
        explanationTranslations: {
          hi: '"Seldom" शुरू में inversion: Seldom + has + subject + past participle.',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
      },
    ],
  },

  // ==================== A2 GRAMMAR ====================
  {
    id: 'a2-gram-01',
    level: 'A2',
    title: 'Simple Past Tense',
    titleTranslations: {
      hi: 'सिंपल पास्ट टेंस', ta: 'எளிய கடந்த காலம்', te: 'సింపుల్ పాస్ట్ టెన్స్',
      bn: 'সাধারণ অতীত কাল', mr: 'साधा भूतकाळ', kn: 'ಸರಳ ಭೂತಕಾಲ',
      ml: 'ലളിത ഭൂതകാലം', gu: 'સાદો ભૂતકાળ', pa: 'ਸਾਧਾ ਭੂਤਕਾਲ', od: 'ସରଳ ଭୂତକାଳ',
      en: 'Simple Past Tense',
    },
    description: 'Talk about things that happened in the past using regular and irregular verbs.',
    descriptionTranslations: {
      hi: 'नियमित और अनियमित क्रियाओं का उपयोग करके बीती बातों के बारे में बताएं।',
      ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '',
      en: 'Talk about things that happened in the past using regular and irregular verbs.',
    },
    order: 1,
    content: {
      explanation: `The Simple Past Tense is used for actions that started AND finished in the past.

**Regular verbs:** Add **-ed** to the base verb
- walk → walked, play → played, cook → cooked
- If the verb ends in "e": live → lived, dance → danced
- If it ends in consonant + "y": study → studied, carry → carried

**Irregular verbs:** These don't follow the -ed rule (you need to memorise them!)
- go → went, eat → ate, buy → bought, see → saw
- come → came, take → took, make → made, give → gave

**Negatives:** Use **did not (didn't)** + base verb
- I didn't go to school yesterday.
- She didn't eat breakfast.

**Questions:** Use **Did** + subject + base verb?
- Did you watch the match last night?
- Did she finish her homework?`,
      explanationTranslations: {
        hi: `सिंपल पास्ट टेंस उन कामों के लिए इस्तेमाल होता है जो पहले शुरू हुए और खत्म हो गए।

**नियमित क्रियाएं:** मूल क्रिया में **-ed** जोड़ें
- walk → walked, play → played

**अनियमित क्रियाएं:** ये -ed नियम नहीं मानतीं (याद करनी होंगी!)
- go → went, eat → ate, buy → bought

**नकारात्मक:** **did not (didn't)** + मूल क्रिया

**प्रश्न:** **Did** + कर्ता + मूल क्रिया?`,
        ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
      },
      examples: [
        { english: 'I went to the temple yesterday.', translations: { hi: 'मैं कल मंदिर गया।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'went' },
        { english: 'She cooked biryani for dinner last night.', translations: { hi: 'उसने रात के खाने में बिरयानी बनाई।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'cooked' },
        { english: 'Did you take the bus to office?', translations: { hi: 'क्या तुमने ऑफिस बस से ली?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'Did' },
      ],
      tips: [
        { text: '💡 Common Indian English error: "I didn\'t went" is wrong! After "didn\'t", always use the BASE form: "I didn\'t go."', translations: { hi: '💡 "I didn\'t went" गलत है! "didn\'t" के बाद हमेशा मूल रूप: "I didn\'t go."', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      ],
    },
    exercises: [
      { id: 'a2-g1-ex1', type: 'multiple-choice', question: 'She _____ to the market yesterday.', options: ['go', 'goes', 'went', 'going'], correctAnswer: 'went', explanation: '"yesterday" = past, "go" is irregular → went.', explanationTranslations: { hi: '"yesterday" = बीता समय, "go" अनियमित → went.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g1-ex2', type: 'fill-blank', question: 'We _____ cricket in the park last Sunday.', correctAnswer: 'played', explanation: '"play" + ed = "played" (regular verb).', explanationTranslations: { hi: '"play" + ed = "played" (नियमित क्रिया)।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g1-ex3', type: 'multiple-choice', question: 'Did she _____ the exam?', options: ['passed', 'pass', 'passes', 'passing'], correctAnswer: 'pass', explanation: 'After "Did", use base verb: "Did she pass?"', explanationTranslations: { hi: '"Did" के बाद मूल क्रिया: "Did she pass?"', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g1-ex4', type: 'correct-error', question: 'Find the error: "I didn\'t went to school."', correctAnswer: 'I didn\'t go to school.', explanation: 'After "didn\'t", use base form: go (not went).', explanationTranslations: { hi: '"didn\'t" के बाद मूल रूप: go (went नहीं)।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g1-ex5', type: 'fill-blank', question: 'They _____ a new house in Noida last year. (buy)', correctAnswer: 'bought', explanation: '"Buy" is irregular → past form is "bought".', explanationTranslations: { hi: '"Buy" अनियमित है → past form "bought" है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g1-ex6', type: 'multiple-choice', question: '_____ she not come to the party yesterday?', options: ['Was', 'Did', 'Does', 'Is'], correctAnswer: 'Did', explanation: 'Negative question in past: "Did she not...?" or "Didn\'t she...?"', explanationTranslations: { hi: 'Past में negative प्रश्न: "Did she not...?" या "Didn\'t she...?"', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g1-ex7', type: 'correct-error', question: 'Find the error: "We eated dal and roti for dinner."', correctAnswer: 'We ate dal and roti for dinner.', explanation: '"Eat" is irregular → past form is "ate", not "eated".', explanationTranslations: { hi: '"Eat" अनियमित है → past form "ate" है, "eated" नहीं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g1-ex8', type: 'multiple-choice', question: 'When I was a child, I _____ near the Ganga river.', options: ['live', 'lived', 'living', 'am living'], correctAnswer: 'lived', explanation: '"When I was a child" signals past time → Past Simple "lived".', explanationTranslations: { hi: '"When I was a child" बीता समय बताता है → Past Simple "lived".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
    ],
  },
  {
    id: 'a2-gram-02',
    level: 'A2',
    title: 'Comparatives and Superlatives',
    titleTranslations: {
      hi: 'तुलनात्मक और सर्वोत्तम', ta: 'உவமை மற்றும் மிகை உவமை', te: 'కంపారిటివ్స్ & సూపర్లేటివ్స్',
      bn: 'তুলনামূলক ও সর্বোচ্চ', mr: 'तुलनात्मक आणि सर्वोत्तम', kn: 'ತೌಲನಿಕ ಮತ್ತು ಅತ್ಯುತ್ತಮ',
      ml: 'താരതമ്യ & പരമാധി', gu: 'તુલનાત્મક અને સર્વોત્તમ', pa: 'ਤੁਲਨਾਤਮਕ ਅਤੇ ਸਰਵੋਤਮ', od: 'ତୁଳନାତ୍ମକ ଏବଂ ସର୍ବୋତ୍ତମ',
      en: 'Comparatives and Superlatives',
    },
    description: 'Compare people, places, and things using adjectives correctly.',
    descriptionTranslations: {
      hi: 'विशेषणों का सही उपयोग करके लोगों, जगहों और चीज़ों की तुलना करें।',
      ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '',
      en: 'Compare people, places, and things using adjectives correctly.',
    },
    order: 2,
    content: {
      explanation: `**Comparatives** compare TWO things. **Superlatives** say something is the MOST.

**Short adjectives (1-2 syllables):**
- Comparative: add **-er** → tall → taller, fast → faster
- Superlative: add **-est** → tall → the tallest, fast → the fastest

**Long adjectives (3+ syllables):**
- Comparative: **more** + adjective → more beautiful, more expensive
- Superlative: **the most** + adjective → the most beautiful

**Irregular:**
- good → better → the best
- bad → worse → the worst
- far → farther → the farthest

**Key patterns:**
- A is **___er than** B: Mumbai is bigger than Pune.
- A is **more ___ than** B: Delhi is more polluted than Shimla.
- A is **the ___est** of all: Burj Khalifa is the tallest building in the world.`,
      explanationTranslations: {
        hi: `**Comparatives** दो चीज़ों की तुलना करते हैं। **Superlatives** कहते हैं कि कुछ सबसे ज्यादा है।

**छोटे विशेषण:** -er / -est जोड़ें।
**लंबे विशेषण:** more / the most लगाएं।
**अनियमित:** good → better → the best`,
        ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
      },
      examples: [
        { english: 'The Ganges is longer than the Yamuna.', translations: { hi: 'गंगा यमुना से लंबी है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'longer than' },
        { english: 'Bangalore has the best weather in India.', translations: { hi: 'बैंगलोर का मौसम भारत में सबसे अच्छा है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'the best' },
        { english: 'This phone is more expensive than that one.', translations: { hi: 'यह फ़ोन उससे ज़्यादा महंगा है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'more expensive than' },
      ],
      tips: [
        { text: '💡 Never say "more better" or "most tallest"! Use either -er/-est OR more/most — never both together.', translations: { hi: '💡 कभी "more better" या "most tallest" मत कहें! -er/-est या more/most — दोनों एक साथ नहीं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      ],
    },
    exercises: [
      { id: 'a2-g2-ex1', type: 'fill-blank', question: 'Mumbai is _____ than Pune. (big)', correctAnswer: 'bigger', explanation: '"big" is one syllable, double consonant + er = bigger.', explanationTranslations: { hi: '"big" एक अक्षर — consonant दोगुना + er = bigger.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g2-ex2', type: 'multiple-choice', question: 'Mount Everest is _____ mountain in the world.', options: ['the highest', 'higher', 'most high', 'the higher'], correctAnswer: 'the highest', explanation: 'Superlative for "high" = "the highest".', explanationTranslations: { hi: '"high" का Superlative = "the highest".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g2-ex3', type: 'correct-error', question: 'Find the error: "She is more taller than her brother."', correctAnswer: 'She is taller than her brother.', explanation: '"tall" is short — use "taller" not "more taller".', explanationTranslations: { hi: '"tall" छोटा है — "taller" इस्तेमाल करें, "more taller" नहीं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g2-ex4', type: 'fill-blank', question: 'Kolkata is not as _____ as Mumbai. (expensive)', correctAnswer: 'expensive', explanation: '"As...as" is used for equal comparison: "as expensive as".', explanationTranslations: { hi: '"As...as" बराबर तुलना के लिए: "as expensive as".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g2-ex5', type: 'multiple-choice', question: 'This biryani is _____ than the one we had in Lucknow.', options: ['worst', 'worse', 'bad', 'more bad'], correctAnswer: 'worse', explanation: '"Bad" is irregular: bad → worse → the worst.', explanationTranslations: { hi: '"Bad" अनियमित है: bad → worse → the worst.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g2-ex6', type: 'fill-blank', question: 'The Mysore Palace is one of the _____ beautiful buildings in India. (superlative)', correctAnswer: 'most', explanation: '"Beautiful" is a long adjective → superlative = "the most beautiful".', explanationTranslations: { hi: '"Beautiful" लंबा विशेषण है → superlative = "the most beautiful".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g2-ex7', type: 'correct-error', question: 'Find the error: "She is the more intelligent student in the class."', correctAnswer: 'She is the most intelligent student in the class.', explanation: 'Superlative of long adjectives: "the most" (not "the more").', explanationTranslations: { hi: 'लंबे विशेषणों का superlative: "the most" ("the more" नहीं)।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g2-ex8', type: 'multiple-choice', question: 'Sachin is the _____ cricketer India has ever produced.', options: ['good', 'better', 'best', 'most good'], correctAnswer: 'best', explanation: '"Good" is irregular: good → better → the best.', explanationTranslations: { hi: '"Good" अनियमित है: good → better → the best.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
    ],
  },
  {
    id: 'a2-gram-03',
    level: 'A2',
    title: 'Prepositions of Time and Place',
    titleTranslations: {
      hi: 'समय और स्थान के पूर्वसर्ग', ta: 'நேர இட முன்னிடைச்சொற்கள்', te: 'సమయ స్థాన ప్రిపోజిషన్లు',
      bn: 'সময় ও স্থানের পদান্বয়', mr: 'वेळ व ठिकाणाचे शब्दयोगी', kn: 'ಸಮಯ ಸ್ಥಳ ಪ್ರೆಪೊಸಿಶನ್',
      ml: 'സമയ സ്ഥല prepositions', gu: 'સમય સ્થળ Prepositions', pa: 'ਸਮੇਂ ਥਾਂ Prepositions', od: 'ସମୟ ସ୍ଥାନ Prepositions',
      en: 'Prepositions of Time and Place',
    },
    description: 'Master in, on, at for talking about time and location.',
    descriptionTranslations: {
      hi: 'समय और स्थान बताने के लिए in, on, at सीखें।',
      ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '',
      en: 'Master in, on, at for talking about time and location.',
    },
    order: 3,
    content: {
      explanation: `**Prepositions of TIME:**
- **at** → specific times: at 5 o'clock, at noon, at midnight, at night
- **on** → days and dates: on Monday, on 15th August, on Diwali
- **in** → months, years, seasons, parts of day: in January, in 2024, in summer, in the morning

**Prepositions of PLACE:**
- **at** → specific points: at the bus stop, at the door, at home
- **on** → surfaces: on the table, on the wall, on the floor, on MG Road
- **in** → enclosed spaces: in the room, in Mumbai, in India, in the car

**Memory trick:** Think of it as: IN (big) → ON (surface) → AT (point)
- IN India → ON MG Road → AT the shop`,
      explanationTranslations: {
        hi: `**समय:** at = विशिष्ट समय, on = दिन/तारीख, in = महीना/साल/मौसम
**स्थान:** at = विशिष्ट बिंदु, on = सतह, in = बंद जगह
**याद रखें:** IN (बड़ा) → ON (सतह) → AT (बिंदु)`,
        ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
      },
      examples: [
        { english: 'The meeting is at 3 PM on Monday.', translations: { hi: 'मीटिंग सोमवार को 3 बजे है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'at ... on' },
        { english: 'She lives in Delhi, on Rajpath Road.', translations: { hi: 'वह दिल्ली में, राजपथ रोड पर रहती है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'in ... on' },
      ],
      tips: [
        { text: '💡 Indian English often drops prepositions: "I will come Monday" — correct: "I will come on Monday."', translations: { hi: '💡 "I will come Monday" — सही: "I will come on Monday."', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      ],
    },
    exercises: [
      { id: 'a2-g3-ex1', type: 'multiple-choice', question: 'Independence Day is _____ 15th August.', options: ['in', 'on', 'at', 'by'], correctAnswer: 'on', explanation: 'Dates use "on": on 15th August.', explanationTranslations: { hi: 'तारीखों के साथ "on".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g3-ex2', type: 'fill-blank', question: 'I will meet you _____ the train station.', correctAnswer: 'at', explanation: 'Specific point = "at".', explanationTranslations: { hi: 'विशिष्ट स्थान = "at".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g3-ex3', type: 'multiple-choice', question: 'She was born _____ 1998.', options: ['in', 'on', 'at', 'by'], correctAnswer: 'in', explanation: 'Years use "in": in 1998.', explanationTranslations: { hi: 'सालों के साथ "in".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g3-ex4', type: 'fill-blank', question: 'We usually have dinner _____ night.', correctAnswer: 'at', explanation: 'We say "at night" — this is a fixed expression.', explanationTranslations: { hi: '"at night" एक निश्चित अभिव्यक्ति है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g3-ex5', type: 'multiple-choice', question: 'My grandfather goes for a walk _____ the morning.', options: ['at', 'on', 'in', 'by'], correctAnswer: 'in', explanation: 'Parts of the day use "in": in the morning, in the afternoon, in the evening.', explanationTranslations: { hi: 'दिन के हिस्सों के साथ "in": in the morning, in the afternoon.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g3-ex6', type: 'correct-error', question: 'Find the error: "She is sitting in the bus."', correctAnswer: 'She is sitting on the bus.', explanation: 'We say "on the bus" (public transport), but "in the car" (private vehicle).', explanationTranslations: { hi: 'सार्वजनिक वाहन = "on the bus", निजी वाहन = "in the car".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g3-ex7', type: 'multiple-choice', question: 'Amma is _____ home right now.', options: ['in', 'on', 'at', 'by'], correctAnswer: 'at', explanation: '"At home" is a fixed expression for being at the place called home.', explanationTranslations: { hi: '"at home" एक निश्चित अभिव्यक्ति है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g3-ex8', type: 'fill-blank', question: 'Diwali usually falls _____ October or November.', correctAnswer: 'in', explanation: 'Months use "in": in October, in November.', explanationTranslations: { hi: 'महीनों के साथ "in": in October, in November.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
    ],
  },

  // ==================== B1 GRAMMAR (additional) ====================
  {
    id: 'b1-gram-02',
    level: 'B1',
    title: 'Passive Voice',
    titleTranslations: { hi: 'कर्मवाच्य', ta: 'செயல்படு வாக்கியம்', te: 'కర్మణి ప్రయోగం', bn: 'কর্মবাচ্য', mr: 'कर्मणी प्रयोग', kn: 'ಕರ್ಮಣಿ ಪ್ರಯೋಗ', ml: 'കർമണി പ്രയോഗം', gu: 'કર્મણી પ્રયોગ', pa: 'ਕਰਮ ਵਾਚ', od: 'କର୍ମବାଚ୍ୟ', en: 'Passive Voice' },
    description: 'Learn when to focus on the action rather than who does it.',
    descriptionTranslations: { hi: 'सीखें कि कब काम पर ध्यान दें, न कि कौन करता है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
    order: 2,
    content: {
      explanation: `**Active Voice:** Subject does the action → The chef cooks the food.
**Passive Voice:** Action is done to the subject → The food is cooked (by the chef).

**When to use passive:**
- When WHO did it is unknown or unimportant
- In formal writing, news reports, and official notices

**Structure:** Subject + be + past participle (+ by agent)

**Tense examples:**
- Present: Rice **is grown** in India.
- Past: The Taj Mahal **was built** by Shah Jahan.
- Future: The results **will be announced** tomorrow.
- Present Perfect: The homework **has been submitted**.`,
      explanationTranslations: { hi: `**Active Voice:** कर्ता काम करता है।
**Passive Voice:** कर्ता पर काम किया जाता है।

**कब इस्तेमाल करें:** जब कौन ने किया अज्ञात/अमहत्वपूर्ण हो; औपचारिक लेखन में।

**बनावट:** Subject + be + past participle`, ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
      examples: [
        { english: 'Hindi is spoken by millions of people.', translations: { hi: 'हिंदी करोड़ों लोगों द्वारा बोली जाती है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'is spoken' },
        { english: 'The bridge was damaged by the flood.', translations: { hi: 'बाढ़ से पुल क्षतिग्रस्त हो गया।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'was damaged' },
      ],
      tips: [
        { text: '💡 Don\'t overuse passive voice. Active voice is usually clearer and more direct.', translations: { hi: '💡 Passive voice का अधिक उपयोग न करें। Active voice आमतौर पर स्पष्ट होता है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      ],
    },
    exercises: [
      { id: 'b1-g2-ex1', type: 'multiple-choice', question: 'English _____ in many countries.', options: ['speaks', 'is spoken', 'spoke', 'speaking'], correctAnswer: 'is spoken', explanation: 'Passive: is + past participle (spoken).', explanationTranslations: { hi: 'Passive: is + past participle (spoken).', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g2-ex2', type: 'fill-blank', question: 'The Ramayana _____ written by Valmiki.', correctAnswer: 'was', explanation: 'Past passive: was + written.', explanationTranslations: { hi: 'Past passive: was + written.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g2-ex3', type: 'correct-error', question: 'Find the error: "The results will announced tomorrow."', correctAnswer: 'The results will be announced tomorrow.', explanation: 'Future passive: will be + past participle.', explanationTranslations: { hi: 'Future passive: will be + past participle.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g2-ex4', type: 'fill-blank', question: 'Tea _____ grown in Assam and Darjeeling.', correctAnswer: 'is', explanation: 'Present passive for a general fact: Tea is grown...', explanationTranslations: { hi: 'सामान्य तथ्य के लिए present passive: Tea is grown...', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g2-ex5', type: 'multiple-choice', question: 'The Howrah Bridge _____ built in 1943.', options: ['is', 'was', 'were', 'has been'], correctAnswer: 'was', explanation: 'Past passive with specific year: was built in 1943.', explanationTranslations: { hi: 'निश्चित साल के साथ past passive: was built in 1943.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g2-ex6', type: 'correct-error', question: 'Find the error: "The letter was write by my grandmother."', correctAnswer: 'The letter was written by my grandmother.', explanation: 'Passive needs past participle: was written (not write).', explanationTranslations: { hi: 'Passive में past participle चाहिए: was written (write नहीं)।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g2-ex7', type: 'fill-blank', question: 'The new metro line can _____ used by thousands of commuters.', correctAnswer: 'be', explanation: 'Modal passive: can + be + past participle: can be used.', explanationTranslations: { hi: 'Modal passive: can + be + past participle: can be used.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g2-ex8', type: 'multiple-choice', question: 'The Mahabharata _____ by Vyasa.', options: ['wrote', 'was wrote', 'was written', 'written'], correctAnswer: 'was written', explanation: 'Past passive: was + past participle → was written.', explanationTranslations: { hi: 'Past passive: was + past participle → was written.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
    ],
  },

  // ==================== B2 GRAMMAR (additional) ====================
  {
    id: 'b2-gram-02',
    level: 'B2',
    title: 'Relative Clauses',
    titleTranslations: { hi: 'संबंधवाचक उपवाक्य', ta: 'தொடர்பு வாக்கியங்கள்', te: 'రిలేటివ్ క్లాజెస్', bn: 'সম্পর্কসূচক clause', mr: 'संबंधवाचक उपवाक्य', kn: 'ಸಂಬಂಧವಾಚಕ ಒಳವಾಕ್ಯ', ml: 'ബന്ധവാക്യങ്ങൾ', gu: 'સંબંધવાચક ઉપવાક્ય', pa: 'ਸੰਬੰਧਵਾਚਕ ਉਪਵਾਕ', od: 'ସମ୍ବନ୍ଧବାଚକ ଉପବାକ୍ୟ', en: 'Relative Clauses' },
    description: 'Add extra information using who, which, that, where, and whose.',
    descriptionTranslations: { hi: 'who, which, that, where, whose से अतिरिक्त जानकारी जोड़ें।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
    order: 2,
    content: {
      explanation: `Relative clauses give extra information about a noun.

**Defining** (essential — no commas): tells us WHICH one
- The man **who works at Infosys** is my uncle.
- The book **that I bought** was interesting.

**Non-defining** (extra info — with commas): adds details
- My cousin Priya, **who lives in Pune**, is a doctor.
- The Taj Mahal, **which was built in 1632**, attracts millions.

**Which word to use:**
- **who/that** → people
- **which/that** → things
- **where** → places
- **whose** → possession
- **when** → times`,
      explanationTranslations: { hi: `Relative clauses किसी noun के बारे में अतिरिक्त जानकारी देते हैं।

**Defining** (ज़रूरी — बिना comma): कौन सा बताता है।
**Non-defining** (अतिरिक्त — comma के साथ): विवरण जोड़ता है।

who → लोग, which → चीज़ें, where → जगह, whose → अधिकार`, ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
      examples: [
        { english: 'The company where my father works is in Hyderabad.', translations: { hi: 'जिस कंपनी में मेरे पिता काम करते हैं वह हैदराबाद में है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'where' },
        { english: 'The student whose presentation was best won the prize.', translations: { hi: 'जिस छात्र की प्रस्तुति सबसे अच्छी थी उसने पुरस्कार जीता।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'whose' },
      ],
      tips: [
        { text: '💡 "That" can replace "who"/"which" in defining clauses, but NOT in non-defining clauses.', translations: { hi: '💡 "That" defining clauses में who/which की जगह ले सकता है, non-defining में नहीं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      ],
    },
    exercises: [
      { id: 'b2-g2-ex1', type: 'multiple-choice', question: 'The woman _____ called you is my colleague.', options: ['who', 'which', 'where', 'whose'], correctAnswer: 'who', explanation: '"who" for people in defining relative clauses.', explanationTranslations: { hi: 'लोगों के लिए "who"।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b2-g2-ex2', type: 'fill-blank', question: 'Jaipur, _____ is known as the Pink City, attracts many tourists.', correctAnswer: 'which', explanation: 'Non-defining clause about a place/thing → "which".', explanationTranslations: { hi: 'Non-defining clause → "which".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b2-g2-ex3', type: 'multiple-choice', question: 'The restaurant _____ we had dinner was fantastic.', options: ['who', 'which', 'where', 'whose'], correctAnswer: 'where', explanation: '"where" for places.', explanationTranslations: { hi: 'जगहों के लिए "where".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b2-g2-ex4', type: 'fill-blank', question: 'The boy _____ father is a pilot studies in my school.', correctAnswer: 'whose', explanation: '"Whose" shows possession: the boy\'s father → whose father.', explanationTranslations: { hi: '"Whose" अधिकार दिखाता है: लड़के के पिता → whose father.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b2-g2-ex5', type: 'correct-error', question: 'Find the error: "My mother, that is a teacher, lives in Lucknow."', correctAnswer: 'My mother, who is a teacher, lives in Lucknow.', explanation: 'In non-defining clauses (with commas), use "who" for people — not "that".', explanationTranslations: { hi: 'Non-defining clauses (comma के साथ) में लोगों के लिए "who" — "that" नहीं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b2-g2-ex6', type: 'multiple-choice', question: 'The book _____ I borrowed from the library was very interesting.', options: ['who', 'which', 'whose', 'where'], correctAnswer: 'which', explanation: '"Which" (or "that") is used for things in defining clauses.', explanationTranslations: { hi: 'Defining clauses में चीज़ों के लिए "which" या "that".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b2-g2-ex7', type: 'fill-blank', question: 'The man I spoke to _____ my uncle. (relative pronoun omitted)', correctAnswer: 'is', explanation: 'The relative pronoun (who/that) can be omitted when it is the object of the clause.', explanationTranslations: { hi: 'Relative pronoun (who/that) हटा सकते हैं जब वह clause का object हो।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b2-g2-ex8', type: 'multiple-choice', question: 'Chennai, _____ is the capital of Tamil Nadu, has beautiful beaches.', options: ['that', 'which', 'who', 'where'], correctAnswer: 'which', explanation: 'Non-defining clause about a place/thing (as subject) → "which" with commas.', explanationTranslations: { hi: 'Non-defining clause (comma) में जगह/चीज़ के लिए → "which".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
    ],
  },

  // ==================== A1: PRONOUNS ====================
  {
    id: 'a1-gram-03',
    level: 'A1',
    title: 'Pronouns: I, You, He, She, It, We, They',
    titleTranslations: { hi: 'सर्वनाम: I, You, He, She, It, We, They', ta: 'பிரதிபெயர்கள்', te: 'సర్వనామాలు', bn: 'সর্বনাম', mr: 'सर्वनामे', kn: 'ಸರ್ವನಾಮ', ml: 'സർവ്വനാമം', gu: 'સર્વનામ', pa: 'ਪੜਨਾਂਵ', od: 'ସର୍ବନାମ', en: 'Pronouns: I, You, He, She, It, We, They' },
    description: 'Learn personal pronouns — subject, object, and possessive forms.',
    descriptionTranslations: { hi: 'व्यक्तिवाचक सर्वनाम सीखें — कर्ता, कर्म और अधिकारवाचक रूप।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: 'Learn personal pronouns — subject, object, and possessive forms.' },
    order: 3,
    content: {
      explanation: `Pronouns replace nouns so we don't repeat the same word.

**Subject pronouns** (who does the action):
I, you, he, she, it, we, they
- **I** am a student. **She** is my sister. **They** live in Delhi.

**Object pronouns** (who receives the action):
me, you, him, her, it, us, them
- Give **me** the book. I called **her**. Tell **them** to come.

**Possessive adjectives** (ownership before a noun):
my, your, his, her, its, our, their
- **My** name is Ravi. **Their** house is big.

**Possessive pronouns** (ownership without a noun):
mine, yours, his, hers, ours, theirs
- This bag is **mine**. That pen is **yours**.`,
      explanationTranslations: { hi: `सर्वनाम संज्ञा की जगह लेते हैं।

**कर्ता:** I, you, he, she, it, we, they
**कर्म:** me, you, him, her, it, us, them
**अधिकारवाचक (संज्ञा से पहले):** my, your, his, her, its, our, their
**अधिकारवाचक (अकेला):** mine, yours, his, hers, ours, theirs`, ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
      examples: [
        { english: 'She is my best friend. I met her in school.', translations: { hi: 'वह मेरी सबसे अच्छी दोस्त है। मैं उससे स्कूल में मिला।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'She ... her' },
        { english: 'This is our house. It is ours.', translations: { hi: 'यह हमारा घर है। यह हमारा है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'our ... ours' },
      ],
      tips: [
        { text: '💡 Indian English common error: "Myself Ravi" is not correct! Say "My name is Ravi" or "I am Ravi."', translations: { hi: '💡 "Myself Ravi" गलत है! "My name is Ravi" या "I am Ravi" कहें।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      ],
    },
    exercises: [
      { id: 'a1-g3-ex1', type: 'multiple-choice', question: 'Priya is a doctor. _____ works at AIIMS.', options: ['He', 'She', 'It', 'They'], correctAnswer: 'She', explanation: 'Priya is female → She.', explanationTranslations: { hi: 'Priya महिला है → She.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g3-ex2', type: 'fill-blank', question: 'Please give _____ the keys. (I → object form)', correctAnswer: 'me', explanation: 'Object form of "I" is "me".', explanationTranslations: { hi: '"I" का कर्म रूप "me" है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g3-ex3', type: 'multiple-choice', question: 'This is not your bag. It is _____.', options: ['my', 'me', 'mine', 'I'], correctAnswer: 'mine', explanation: 'Without a noun after it → possessive pronoun "mine".', explanationTranslations: { hi: 'बाद में संज्ञा नहीं → "mine".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g3-ex4', type: 'correct-error', question: 'Find the error: "Myself is Rahul."', correctAnswer: 'My name is Rahul.', explanation: '"Myself" cannot be subject. Use "My name is..." or "I am..."', explanationTranslations: { hi: '"Myself" कर्ता नहीं बन सकता। "My name is..." या "I am..." कहें।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g3-ex5', type: 'multiple-choice', question: 'Amit lost _____ wallet on the bus.', options: ['her', 'his', 'their', 'its'], correctAnswer: 'his', explanation: 'Amit is male → possessive adjective "his".', explanationTranslations: { hi: 'Amit पुरुष है → "his" (उसका)।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g3-ex6', type: 'fill-blank', question: 'The cat drank _____ milk. (belonging to the cat)', correctAnswer: 'its', explanation: 'Possessive for "it" (animal/thing) is "its" — no apostrophe.', explanationTranslations: { hi: '"it" का अधिकारवाचक "its" होता है — बिना apostrophe के।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g3-ex7', type: 'multiple-choice', question: 'Neha and Priya are sisters. _____ father is a teacher.', options: ['Her', 'His', 'Their', 'Its'], correctAnswer: 'Their', explanation: 'Neha and Priya = they → possessive "their".', explanationTranslations: { hi: 'Neha और Priya = they → "their" (उनका)।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g3-ex8', type: 'correct-error', question: 'Find the error: "She hurt she while cooking."', correctAnswer: 'She hurt herself while cooking.', explanation: 'When subject and object are the same person, use reflexive pronoun: "herself".', explanationTranslations: { hi: 'जब कर्ता और कर्म एक ही हों, तो reflexive pronoun लगाएं: "herself".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
    ],
  },

  // ==================== A1: SINGULAR & PLURAL NOUNS ====================
  {
    id: 'a1-gram-04',
    level: 'A1',
    title: 'Singular and Plural Nouns',
    titleTranslations: { hi: 'एकवचन और बहुवचन संज्ञा', ta: 'ஒருமை பன்மை', te: 'ఏకవచనం బహువచనం', bn: 'একবচন বহুবচন', mr: 'एकवचन बहुवचन', kn: 'ಏಕವಚನ ಬಹುವಚನ', ml: 'ഏകവചനം ബഹുവചനം', gu: 'એકવચન બહુવચન', pa: 'ਇਕਵਚਨ ਬਹੁਵਚਨ', od: 'ଏକବଚନ ବହୁବଚନ', en: 'Singular and Plural Nouns' },
    description: 'Learn how to make nouns plural — regular and irregular forms.',
    descriptionTranslations: { hi: 'संज्ञाओं को बहुवचन बनाना सीखें — नियमित और अनियमित।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
    order: 4,
    content: {
      explanation: `**Singular** = one thing. **Plural** = more than one.

**Regular rules:**
- Most nouns: add **-s** → book → books, pen → pens
- Ending in s, sh, ch, x, z: add **-es** → bus → buses, dish → dishes
- Ending in consonant + y: change y to **-ies** → city → cities, baby → babies
- Ending in f/fe: change to **-ves** → knife → knives, leaf → leaves

**Irregular plurals** (no rules — memorise!):
- man → men, woman → women, child → children
- tooth → teeth, foot → feet, mouse → mice
- person → people, fish → fish, sheep → sheep

**Uncountable nouns** (no plural!):
- water, rice, information, advice, furniture, luggage
- ❌ "informations" ❌ "furnitures" ❌ "luggages"`,
      explanationTranslations: { hi: `**Singular** = एक। **Plural** = एक से ज़्यादा।

**नियमित:** -s जोड़ें, -es (s/sh/ch/x/z पर), -ies (consonant + y), -ves (f/fe)
**अनियमित:** man→men, child→children, tooth→teeth
**अगणनीय (बहुवचन नहीं):** water, rice, information, advice`, ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
      examples: [
        { english: 'There are three children in the family.', translations: { hi: 'परिवार में तीन बच्चे हैं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'children' },
        { english: 'She bought two knives and five dishes.', translations: { hi: 'उसने दो चाकू और पांच बर्तन खरीदे।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'knives ... dishes' },
      ],
      tips: [
        { text: '💡 Very common Indian English error: "I need some informations" — "information" is uncountable! Say "some information" or "pieces of information."', translations: { hi: '💡 "informations" गलत है! "information" अगणनीय है। "some information" कहें।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      ],
    },
    exercises: [
      { id: 'a1-g4-ex1', type: 'fill-blank', question: 'There are many _____ in the park. (child)', correctAnswer: 'children', explanation: '"child" is irregular → "children".', explanationTranslations: { hi: '"child" अनियमित है → "children".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g4-ex2', type: 'multiple-choice', question: 'Which is the correct plural of "city"?', options: ['citys', 'cities', 'cityes', 'city'], correctAnswer: 'cities', explanation: 'Consonant + y → change y to ies: cities.', explanationTranslations: { hi: 'Consonant + y → y को ies में बदलें: cities.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g4-ex3', type: 'correct-error', question: 'Find the error: "She gave me two advices."', correctAnswer: 'She gave me two pieces of advice.', explanation: '"advice" is uncountable. Use "pieces of advice".', explanationTranslations: { hi: '"advice" अगणनीय है। "pieces of advice" कहें।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g4-ex4', type: 'multiple-choice', question: 'The _____ are grazing in the field.', options: ['sheeps', 'sheep', 'sheepes', 'sheepen'], correctAnswer: 'sheep', explanation: '"sheep" stays the same in plural.', explanationTranslations: { hi: '"sheep" बहुवचन में भी "sheep" ही रहता है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g4-ex5', type: 'fill-blank', question: 'I need to buy two _____ for the kitchen. (dish)', correctAnswer: 'dishes', explanation: 'Nouns ending in -sh: add -es → dish → dishes.', explanationTranslations: { hi: '-sh पर खत्म होने वाली संज्ञा: -es जोड़ें → dish → dishes.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g4-ex6', type: 'multiple-choice', question: 'The dentist checked my _____.', options: ['tooths', 'teeths', 'teeth', 'toothes'], correctAnswer: 'teeth', explanation: '"Tooth" is irregular → plural is "teeth".', explanationTranslations: { hi: '"Tooth" अनियमित है → बहुवचन "teeth" होता है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g4-ex7', type: 'correct-error', question: 'Find the error: "Please carry your luggages carefully."', correctAnswer: 'Please carry your luggage carefully.', explanation: '"Luggage" is uncountable — no plural form. Say "luggage" or "pieces of luggage".', explanationTranslations: { hi: '"Luggage" अगणनीय है — बहुवचन नहीं होता। "luggage" या "pieces of luggage" कहें।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g4-ex8', type: 'multiple-choice', question: 'My _____ hurt after walking all day. (foot, plural)', options: ['foots', 'feets', 'feet', 'foot'], correctAnswer: 'feet', explanation: '"Foot" is irregular → plural is "feet".', explanationTranslations: { hi: '"Foot" अनियमित है → बहुवचन "feet" होता है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
    ],
  },

  // ==================== A1: PRESENT SIMPLE & CONTINUOUS ====================
  {
    id: 'a1-gram-05',
    level: 'A1',
    title: 'Present Simple and Present Continuous',
    titleTranslations: { hi: 'सामान्य वर्तमान और वर्तमान काल', ta: 'நிகழ்கால எளிய & தொடர்', te: 'ప్రెజెంట్ సింపుల్ & కంటిన్యూయస్', bn: 'সাধারণ বর্তমান ও চলমান বর্তমান', mr: 'साधा वर्तमान व चालू वर्तमान', kn: 'ವರ್ತಮಾನ ಸರಳ & ನಿರಂತರ', ml: 'നിലവിലെ ലളിത & തുടർ', gu: 'વર્તમાન સાદો & ચાલુ', pa: 'ਵਰਤਮਾਨ ਸਾਧਾ & ਚਾਲੂ', od: 'ସରଳ ବର୍ତ୍ତମାନ & ଚାଲୁ', en: 'Present Simple and Present Continuous' },
    description: 'Know when to use "I work" vs "I am working" — habits vs right now.',
    descriptionTranslations: { hi: '"I work" vs "I am working" — आदत vs अभी, कब कौन सा इस्तेमाल करें।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
    order: 5,
    content: {
      explanation: `**Present Simple** → habits, facts, routines
- I **work** in Bangalore.
- She **drinks** chai every morning.
- Water **boils** at 100°C.
- Add -s/-es for he/she/it: He work**s**, She go**es**

**Present Continuous** → happening RIGHT NOW or temporary
- I **am working** from home today.
- She **is cooking** dinner right now.
- They **are watching** the cricket match.
- Structure: am/is/are + verb + **-ing**

**Key difference:**
- "I **cook** dinner every day." (habit — always)
- "I **am cooking** dinner now." (right now — this moment)

**Signal words:**
- Simple: always, usually, often, sometimes, every day/week
- Continuous: now, right now, at the moment, currently, today`,
      explanationTranslations: { hi: `**Present Simple** → आदतें, तथ्य, नियमित काम
- I work in Bangalore. She drinks chai every morning.

**Present Continuous** → अभी हो रहा है
- I am working now. She is cooking dinner.

**अंतर:** "I cook" (हमेशा) vs "I am cooking" (अभी)`, ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
      examples: [
        { english: 'He takes the metro to work every day.', translations: { hi: 'वह हर दिन मेट्रो से ऑफिस जाता है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'takes' },
        { english: 'Shh! The baby is sleeping right now.', translations: { hi: 'शश! बच्चा अभी सो रहा है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'is sleeping' },
      ],
      tips: [
        { text: '💡 Common mistake in India: "I am living in Mumbai" when you mean permanently. If it\'s your home, say "I live in Mumbai." Use "am living" only for temporary stays.', translations: { hi: '💡 "I am living in Mumbai" — अगर स्थायी है तो "I live in Mumbai" कहें। "am living" अस्थायी के लिए।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      ],
    },
    exercises: [
      { id: 'a1-g5-ex1', type: 'multiple-choice', question: 'She _____ to office by bus every day.', options: ['is going', 'goes', 'go', 'going'], correctAnswer: 'goes', explanation: '"every day" = habit → Present Simple. He/she/it + goes.', explanationTranslations: { hi: '"every day" = आदत → Present Simple.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g5-ex2', type: 'multiple-choice', question: 'Look! It _____ outside.', options: ['rains', 'is raining', 'rain', 'rained'], correctAnswer: 'is raining', explanation: '"Look!" = happening now → Present Continuous.', explanationTranslations: { hi: '"Look!" = अभी हो रहा है → Present Continuous.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g5-ex3', type: 'fill-blank', question: 'My father _____ tea, not coffee. (drink — habit)', correctAnswer: 'drinks', explanation: 'Habit + he/she/it → drinks (Present Simple with -s).', explanationTranslations: { hi: 'आदत + he/she/it → drinks.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g5-ex4', type: 'correct-error', question: 'Find the error: "I am knowing the answer."', correctAnswer: 'I know the answer.', explanation: '"know" is a state verb — it doesn\'t take continuous form.', explanationTranslations: { hi: '"know" स्थिति क्रिया है — continuous नहीं लेता।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g5-ex5', type: 'fill-blank', question: 'She _____ not like spicy food. (do/does — negative)', correctAnswer: 'does', explanation: 'Negative Present Simple with she/he/it: does not (doesn\'t).', explanationTranslations: { hi: 'She/he/it के साथ negative: does not (doesn\'t).', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g5-ex6', type: 'multiple-choice', question: '_____ you usually take the metro to work?', options: ['Are', 'Do', 'Is', 'Does'], correctAnswer: 'Do', explanation: 'Question with "you" in Present Simple → "Do you...?"', explanationTranslations: { hi: '"you" के साथ Present Simple प्रश्न → "Do you...?"', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g5-ex7', type: 'correct-error', question: 'Find the error: "I am understanding the lesson now."', correctAnswer: 'I understand the lesson now.', explanation: '"Understand" is a state verb — it doesn\'t take continuous form.', explanationTranslations: { hi: '"Understand" स्थिति क्रिया है — continuous रूप नहीं लेती।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a1-g5-ex8', type: 'multiple-choice', question: 'Ravi _____ plays cricket on Sundays.', options: ['always', 'is always', 'always is', 'does always'], correctAnswer: 'always', explanation: 'Frequency adverbs go before the main verb in Present Simple.', explanationTranslations: { hi: 'Frequency adverbs मुख्य क्रिया से पहले आते हैं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
    ],
  },

  // ==================== A2: ADJECTIVES ====================
  {
    id: 'a2-gram-04',
    level: 'A2',
    title: 'Adjectives: Describing People and Things',
    titleTranslations: { hi: 'विशेषण: लोगों और चीज़ों का वर्णन', ta: 'பெயரடைகள்', te: 'విశేషణాలు', bn: 'বিশেষণ', mr: 'विशेषणे', kn: 'ವಿಶೇಷಣ', ml: 'വിശേഷണം', gu: 'વિશેષણ', pa: 'ਵਿਸ਼ੇਸ਼ਣ', od: 'ବିଶେଷଣ', en: 'Adjectives: Describing People and Things' },
    description: 'Use adjectives to describe size, colour, opinion, and more — in the right order.',
    descriptionTranslations: { hi: 'आकार, रंग, राय आदि बताने के लिए विशेषणों का सही क्रम में उपयोग करें।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
    order: 4,
    content: {
      explanation: `Adjectives describe nouns. They come **before** the noun or **after** "be".

**Before a noun:** a **tall** man, a **red** sari, **hot** chai
**After "be":** The movie is **boring**. The food was **delicious**.

**Adjective order** (when using multiple):
Opinion → Size → Age → Shape → Colour → Origin → Material → Purpose
- A **beautiful large old round brown Indian wooden dining** table
- Simplified: "a beautiful big old brown table" — opinion first, then physical.

**Common pairs:**
- -ed = how YOU feel: I am bor**ed**. I am excit**ed**.
- -ing = what CAUSES the feeling: The movie is bor**ing**. The news is excit**ing**.`,
      explanationTranslations: { hi: `विशेषण संज्ञा का वर्णन करते हैं। संज्ञा **से पहले** या "be" **के बाद** आते हैं।

**क्रम:** राय → आकार → उम्र → रंग → उत्पत्ति → सामग्री
**-ed vs -ing:** bored = मुझे बोरियत हुई, boring = बोरिंग चीज़`, ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
      examples: [
        { english: 'She wore a beautiful red silk sari.', translations: { hi: 'उसने एक सुंदर लाल रेशमी साड़ी पहनी।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'beautiful red silk' },
        { english: 'The lecture was boring but the teacher was interested in the topic.', translations: { hi: 'व्याख्यान बोरिंग था लेकिन शिक्षक विषय में रुचि रखते थे।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'boring ... interested' },
      ],
      tips: [
        { text: '💡 Don\'t confuse -ed and -ing: "I am boring" means YOU bore other people! "I am bored" means you feel boredom.', translations: { hi: '💡 "I am boring" = आप दूसरों को बोर करते हैं! "I am bored" = आपको बोरियत हो रही है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      ],
    },
    exercises: [
      { id: 'a2-g4-ex1', type: 'multiple-choice', question: 'The match was very _____. (It made us feel excited)', options: ['excited', 'exciting', 'excite', 'excites'], correctAnswer: 'exciting', explanation: 'The match causes excitement → -ing form.', explanationTranslations: { hi: 'मैच उत्साह का कारण है → -ing.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g4-ex2', type: 'fill-blank', question: 'She bought a _____ Indian cotton kurta. (beautiful)', correctAnswer: 'beautiful', explanation: 'Opinion adjective before origin and material.', explanationTranslations: { hi: 'राय विशेषण उत्पत्ति और सामग्री से पहले।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g4-ex3', type: 'correct-error', question: 'Find the error: "I am very interesting in cricket."', correctAnswer: 'I am very interested in cricket.', explanation: 'YOU feel it → -ed: "interested in". Not "interesting in".', explanationTranslations: { hi: 'आप महसूस करते हैं → -ed: "interested in".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g4-ex4', type: 'multiple-choice', question: 'The journey was very _____. I fell asleep. (tire)', options: ['tired', 'tiring', 'tire', 'tires'], correctAnswer: 'tiring', explanation: 'The journey causes tiredness → -ing form: "tiring".', explanationTranslations: { hi: 'यात्रा थकान का कारण है → -ing: "tiring".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g4-ex5', type: 'fill-blank', question: 'We were _____ by the magic show at the mela. (amaze)', correctAnswer: 'amazed', explanation: 'We feel amazement → -ed form: "amazed".', explanationTranslations: { hi: 'हमें आश्चर्य हुआ → -ed: "amazed".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g4-ex6', type: 'correct-error', question: 'Find the error: "The instructions were confusing, so I was confusing too."', correctAnswer: 'The instructions were confusing, so I was confused too.', explanation: 'Instructions cause confusion → confusing. You feel confusion → confused.', explanationTranslations: { hi: 'निर्देश भ्रम का कारण → confusing। आप भ्रमित हैं → confused.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g4-ex7', type: 'multiple-choice', question: 'She wore a _____ green silk sari at the wedding. (adjective order)', options: ['beautiful', 'green beautiful silk', 'silk beautiful green', 'beautiful silk green'], correctAnswer: 'beautiful', explanation: 'Correct order: opinion (beautiful) → colour (green) → material (silk).', explanationTranslations: { hi: 'सही क्रम: राय (beautiful) → रंग (green) → सामग्री (silk).', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g4-ex8', type: 'fill-blank', question: 'The horror movie was _____. I was so scared. (frighten)', correctAnswer: 'frightening', explanation: 'The movie causes fear → -ing form: "frightening".', explanationTranslations: { hi: 'फ़िल्म डर का कारण → -ing: "frightening".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
    ],
  },

  // ==================== A2: ADVERBS ====================
  {
    id: 'a2-gram-05',
    level: 'A2',
    title: 'Adverbs: How, When, Where, How Often',
    titleTranslations: { hi: 'क्रिया विशेषण: कैसे, कब, कहां, कितनी बार', ta: 'வினையுரிச்சொற்கள்', te: 'క్రియా విశేషణాలు', bn: 'ক্রিয়া বিশেষণ', mr: 'क्रियाविशेषण', kn: 'ಕ್ರಿಯಾವಿಶೇಷಣ', ml: 'ക്രിയാവിശേഷണം', gu: 'ક્રિયાવિશેષણ', pa: 'ਕਿਰਿਆ ਵਿਸ਼ੇਸ਼ਣ', od: 'କ୍ରିୟା ବିଶେଷଣ', en: 'Adverbs: How, When, Where, How Often' },
    description: 'Modify verbs and adjectives — learn manner, frequency, time and place adverbs.',
    descriptionTranslations: { hi: 'क्रियाओं और विशेषणों को संशोधित करें — तरीका, आवृत्ति, समय और स्थान।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
    order: 5,
    content: {
      explanation: `Adverbs describe HOW, WHEN, WHERE, or HOW OFTEN something happens.

**Manner (how?):** Add **-ly** to adjective
- slow → slowly, quick → quickly, careful → carefully
- She speaks English **fluently**.
- He drives **carefully** in the rain.

**Frequency (how often?):** Position = before main verb, after "be"
- always, usually, often, sometimes, rarely, never
- I **always** drink chai in the morning.
- She is **never** late for work.

**Time (when?):** today, yesterday, tomorrow, soon, already, yet, still
**Place (where?):** here, there, everywhere, outside, upstairs

**Irregular adverbs (no -ly!):**
- good → **well** (NOT goodly!)
- fast → **fast** (NOT fastly!)
- hard → **hard** (hardly = barely, different meaning!)`,
      explanationTranslations: { hi: `क्रिया विशेषण बताते हैं कैसे, कब, कहां, कितनी बार।

**तरीका:** adjective + ly → slowly, carefully
**आवृत्ति:** always, usually, often, sometimes, never
**अनियमित:** good → well, fast → fast`, ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
      examples: [
        { english: 'She speaks Hindi fluently but writes English slowly.', translations: { hi: 'वह हिंदी धाराप्रवाह बोलती है लेकिन अंग्रेजी धीरे लिखती है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'fluently ... slowly' },
        { english: 'I usually take the 8 AM train.', translations: { hi: 'मैं आमतौर पर सुबह 8 बजे की ट्रेन लेता हूं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'usually' },
      ],
      tips: [
        { text: '💡 "He played good" is wrong! "Good" is an adjective. Say "He played well." Good describes nouns, well describes verbs.', translations: { hi: '💡 "He played good" गलत है! "He played well" कहें। Good = विशेषण, well = क्रिया विशेषण।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      ],
    },
    exercises: [
      { id: 'a2-g5-ex1', type: 'fill-blank', question: 'She sings very _____. (beautiful)', correctAnswer: 'beautifully', explanation: 'Describing how she sings → adverb: beautifully.', explanationTranslations: { hi: 'कैसे गाती है → क्रिया विशेषण: beautifully.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g5-ex2', type: 'multiple-choice', question: 'He did _____ on the exam.', options: ['good', 'well', 'goodly', 'betterly'], correctAnswer: 'well', explanation: '"good" → "well" (irregular adverb).', explanationTranslations: { hi: '"good" → "well" (अनियमित)।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g5-ex3', type: 'multiple-choice', question: 'She is _____ late for class.', options: ['never', 'not', 'no', 'none'], correctAnswer: 'never', explanation: 'Frequency adverb after "be": She is never late.', explanationTranslations: { hi: '"be" के बाद frequency adverb: She is never late.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g5-ex4', type: 'correct-error', question: 'Find the error: "He runs very fastly."', correctAnswer: 'He runs very fast.', explanation: '"fast" is already an adverb. Don\'t add -ly!', explanationTranslations: { hi: '"fast" पहले से adverb है। -ly मत जोड़ें!', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g5-ex5', type: 'multiple-choice', question: 'She played the sitar very _____.', options: ['good', 'well', 'goodly', 'better'], correctAnswer: 'well', explanation: '"Good" is adjective, "well" is adverb. To describe how she played → "well".', explanationTranslations: { hi: '"Good" विशेषण है, "well" क्रिया विशेषण। कैसे बजाया → "well".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g5-ex6', type: 'fill-blank', question: 'He is not tall _____ to reach the top shelf.', correctAnswer: 'enough', explanation: '"Enough" comes after adjectives and adverbs: tall enough.', explanationTranslations: { hi: '"Enough" विशेषण/क्रिया विशेषण के बाद आता है: tall enough.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g5-ex7', type: 'correct-error', question: 'Find the error: "The chai is too much hot to drink."', correctAnswer: 'The chai is too hot to drink.', explanation: '"Too" + adjective directly — don\'t add "much" in between.', explanationTranslations: { hi: '"Too" + विशेषण सीधे — बीच में "much" न जोड़ें।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g5-ex8', type: 'multiple-choice', question: 'She _____ eats breakfast before 7 AM.', options: ['usually', 'usual', 'use', 'used'], correctAnswer: 'usually', explanation: '"Usually" is a frequency adverb placed before the main verb.', explanationTranslations: { hi: '"Usually" frequency adverb है, मुख्य क्रिया से पहले आता है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
    ],
  },

  // ==================== A2: FUTURE TENSES ====================
  {
    id: 'a2-gram-06',
    level: 'A2',
    title: 'Future: Will, Going To, Present Continuous',
    titleTranslations: { hi: 'भविष्य काल: Will, Going To, Present Continuous', ta: 'எதிர்காலம்', te: 'భవిష్యత్ కాలం', bn: 'ভবিষ্যৎ কাল', mr: 'भविष्यकाळ', kn: 'ಭವಿಷ್ಯತ್ ಕಾಲ', ml: 'ഭാവികാലം', gu: 'ભવિષ્ય કાળ', pa: 'ਭਵਿੱਖ ਕਾਲ', od: 'ଭବିଷ୍ୟତ କାଳ', en: 'Future: Will, Going To, Present Continuous' },
    description: 'Three ways to talk about the future — and when to use each one.',
    descriptionTranslations: { hi: 'भविष्य बताने के तीन तरीके — और कब कौन सा इस्तेमाल करें।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
    order: 6,
    content: {
      explanation: `**1. Will** → spontaneous decisions, predictions, promises
- I think it **will rain** tomorrow.
- "The phone is ringing!" — "I **will** get it."
- I **will** always love you.

**2. Going to** → plans already decided, evidence-based predictions
- I **am going to** visit Goa next month. (already planned)
- Look at those clouds! It **is going to** rain. (evidence)

**3. Present Continuous** → fixed arrangements with time/place
- I **am meeting** Priya at 5 PM tomorrow. (arranged, confirmed)
- We **are flying** to Chennai on Friday.

**Quick guide:**
| Situation | Use |
| Sudden decision | will |
| Planned intention | going to |
| Fixed arrangement | Present Continuous |`,
      explanationTranslations: { hi: `**will** → अचानक फैसला, भविष्यवाणी, वादा
**going to** → पहले से तय योजना, सबूत-आधारित भविष्यवाणी
**Present Continuous** → पक्का arrangement (समय/जगह तय)`, ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
      examples: [
        { english: 'I am going to learn coding this summer.', translations: { hi: 'मैं इस गर्मी में कोडिंग सीखने वाला हूं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'am going to learn' },
        { english: 'We are flying to Jaipur on Saturday.', translations: { hi: 'हम शनिवार को जयपुर उड़ रहे हैं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'are flying' },
      ],
      tips: [
        { text: '💡 In Indian English, "I will go tomorrow" is often used for everything. But if you\'ve already booked a ticket, "I am going tomorrow" or "I am going to go" is more accurate!', translations: { hi: '💡 अगर टिकट बुक हो चुकी है तो "I am going tomorrow" ज़्यादा सही है!', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      ],
    },
    exercises: [
      { id: 'a2-g6-ex1', type: 'multiple-choice', question: '"Oh no, I forgot my wallet!" — "Don\'t worry, I _____ pay."', options: ['am going to', 'will', 'am paying', 'pay'], correctAnswer: 'will', explanation: 'Spontaneous decision → will.', explanationTranslations: { hi: 'अचानक फैसला → will.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g6-ex2', type: 'multiple-choice', question: 'We _____ visit the Taj Mahal next week. We already booked the hotel.', options: ['will', 'are going to', 'visit', 'visited'], correctAnswer: 'are going to', explanation: 'Already planned → going to.', explanationTranslations: { hi: 'पहले से तय → going to.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g6-ex3', type: 'fill-blank', question: 'I _____ dinner with my boss tomorrow at 7 PM. (have — fixed arrangement)', correctAnswer: 'am having', explanation: 'Fixed arrangement with time → Present Continuous.', explanationTranslations: { hi: 'पक्का arrangement → Present Continuous.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g6-ex4', type: 'fill-blank', question: 'I promise I _____ help you with your homework.', correctAnswer: 'will', explanation: 'Promises use "will": I will help you.', explanationTranslations: { hi: 'वादे के लिए "will": I will help you.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g6-ex5', type: 'multiple-choice', question: 'Look at those dark clouds! It _____ rain heavily.', options: ['will', 'is going to', 'rains', 'rained'], correctAnswer: 'is going to', explanation: 'Evidence-based prediction (dark clouds) → going to.', explanationTranslations: { hi: 'सबूत-आधारित भविष्यवाणी (काले बादल) → going to.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g6-ex6', type: 'correct-error', question: 'Find the error: "We will going to visit Agra next weekend."', correctAnswer: 'We are going to visit Agra next weekend.', explanation: 'Don\'t mix "will" with "going to". Use either "will visit" or "are going to visit".', explanationTranslations: { hi: '"will" और "going to" मिलाएं नहीं। "will visit" या "are going to visit" कहें।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g6-ex7', type: 'multiple-choice', question: 'I think India _____ the next cricket World Cup.', options: ['is winning', 'wins', 'will win', 'is going to win'], correctAnswer: 'will win', explanation: '"I think" + prediction about future → will.', explanationTranslations: { hi: '"I think" + भविष्यवाणी → will.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'a2-g6-ex8', type: 'fill-blank', question: 'We _____ the Rajdhani Express to Delhi tomorrow. The tickets are confirmed. (take — fixed arrangement)', correctAnswer: 'are taking', explanation: 'Fixed arrangement with confirmed tickets → Present Continuous.', explanationTranslations: { hi: 'टिकट confirmed है → Present Continuous: "are taking".', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
    ],
  },

  // ==================== B1: MODAL VERBS ====================
  {
    id: 'b1-gram-03',
    level: 'B1',
    title: 'Modal Verbs: Can, Could, Must, Should, May, Might',
    titleTranslations: { hi: 'Modal क्रियाएं: Can, Could, Must, Should, May, Might', ta: 'மாதிரி வினைச்சொற்கள்', te: 'మోడల్ వెర్బ్స్', bn: 'Modal ক্রিয়া', mr: 'Modal क्रियापदे', kn: 'ಮೋಡಲ್ ಕ್ರಿಯಾಪದ', ml: 'Modal ക്രിയകൾ', gu: 'Modal ક્રિયાપદ', pa: 'Modal ਕਿਰਿਆ', od: 'Modal କ୍ରିୟାପଦ', en: 'Modal Verbs' },
    description: 'Express ability, permission, obligation, possibility and advice.',
    descriptionTranslations: { hi: 'क्षमता, अनुमति, बाध्यता, संभावना और सलाह व्यक्त करें।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
    order: 3,
    content: {
      explanation: `Modal verbs come before the main verb (in base form). No -s, no -ing, no -ed!

**Can** → ability, informal permission
- I **can** speak three languages.
- **Can** I sit here?

**Could** → past ability, polite requests, possibility
- I **could** swim when I was five.
- **Could** you help me, please?

**Must** → strong obligation (your own feeling), logical conclusion
- I **must** study for the exam. (I feel it's necessary)
- He **must** be at home. (I'm sure)

**Have to** → external obligation (rules, laws)
- You **have to** wear a helmet in India. (it's the law)

**Should** → advice, recommendation
- You **should** drink more water.

**May / Might** → possibility (might = less sure)
- It **may** rain today. (possible)
- He **might** come to the party. (less certain)`,
      explanationTranslations: { hi: `**Can** = क्षमता, अनौपचारिक अनुमति
**Could** = भूतकाल की क्षमता, विनम्र अनुरोध
**Must** = मजबूत बाध्यता, तार्किक निष्कर्ष
**Have to** = बाहरी नियम
**Should** = सलाह
**May/Might** = संभावना`, ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
      examples: [
        { english: 'You must carry your Aadhaar card for verification.', translations: { hi: 'सत्यापन के लिए आपको आधार कार्ड ले जाना होगा।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'must' },
        { english: 'You should visit Kerala during the monsoon — it is beautiful!', translations: { hi: 'मानसून में केरल ज़रूर जाएं — बहुत सुंदर है!', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'should' },
      ],
      tips: [
        { text: '💡 "Must" and "have to" are different! Must = your own feeling. Have to = external rule. "I must lose weight" (I want to) vs "I have to wear uniform" (school rule).', translations: { hi: '💡 Must = अपनी भावना। Have to = बाहरी नियम।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      ],
    },
    exercises: [
      { id: 'b1-g3-ex1', type: 'multiple-choice', question: 'You _____ wear a helmet while riding a bike. (law)', options: ['should', 'might', 'have to', 'can'], correctAnswer: 'have to', explanation: 'External obligation (law) → have to.', explanationTranslations: { hi: 'बाहरी नियम (कानून) → have to.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g3-ex2', type: 'fill-blank', question: 'You _____ see a doctor. You look very sick. (advice)', correctAnswer: 'should', explanation: 'Giving advice → should.', explanationTranslations: { hi: 'सलाह देना → should.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g3-ex3', type: 'multiple-choice', question: 'Take an umbrella. It _____ rain later.', options: ['must', 'might', 'can', 'has to'], correctAnswer: 'might', explanation: 'Less certain possibility → might.', explanationTranslations: { hi: 'कम निश्चित संभावना → might.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g3-ex4', type: 'correct-error', question: 'Find the error: "She can to swim very well."', correctAnswer: 'She can swim very well.', explanation: 'After modals, use base verb — no "to"!', explanationTranslations: { hi: 'Modals के बाद base verb — "to" नहीं!', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g3-ex5', type: 'multiple-choice', question: 'You _____ park here. It is a no-parking zone.', options: ['mustn\'t', 'don\'t have to', 'shouldn\'t', 'can\'t'], correctAnswer: 'mustn\'t', explanation: '"Mustn\'t" means it is forbidden/not allowed. "Don\'t have to" means not necessary.', explanationTranslations: { hi: '"Mustn\'t" = मना है। "Don\'t have to" = ज़रूरी नहीं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g3-ex6', type: 'fill-blank', question: 'You _____ wear a tie tomorrow. It is a casual day.', correctAnswer: 'don\'t have to', explanation: '"Don\'t have to" means it is not necessary (but you can if you want).', explanationTranslations: { hi: '"Don\'t have to" = ज़रूरी नहीं (लेकिन चाहें तो कर सकते हैं)।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g3-ex7', type: 'multiple-choice', question: 'The train has stopped. There _____ be a problem on the track.', options: ['must', 'could', 'should', 'will'], correctAnswer: 'could', explanation: '"Could" expresses possibility when we are not sure.', explanationTranslations: { hi: '"Could" संभावना व्यक्त करता है जब निश्चित नहीं हैं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g3-ex8', type: 'correct-error', question: 'Find the error: "May I to borrow your pen?"', correctAnswer: 'May I borrow your pen?', explanation: 'After modals, use base verb without "to": May I borrow...', explanationTranslations: { hi: 'Modals के बाद "to" के बिना base verb: May I borrow...', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
    ],
  },

  // ==================== B1: SUBJECT-VERB AGREEMENT ====================
  {
    id: 'b1-gram-04',
    level: 'B1',
    title: 'Subject-Verb Agreement',
    titleTranslations: { hi: 'कर्ता-क्रिया सामंजस्य', ta: 'எழுவாய் பயனிலை இணக்கம்', te: 'కర్త-క్రియ ఏకీభావం', bn: 'কর্তা-ক্রিয়া সামঞ্জস্য', mr: 'कर्ता-क्रियापद सुसंगती', kn: 'ಕರ್ತೃ-ಕ್ರಿಯಾ ಹೊಂದಾಣಿಕೆ', ml: 'കർതൃ-ക്രിയ ഐക്യം', gu: 'કર્તા-ક્રિયા સંગતિ', pa: 'ਕਰਤਾ-ਕਿਰਿਆ ਸੰਗਤੀ', od: 'କର୍ତା-କ୍ରିୟା ସାମଞ୍ଜସ୍ୟ', en: 'Subject-Verb Agreement' },
    description: 'Make sure your verb matches your subject — singular with singular, plural with plural.',
    descriptionTranslations: { hi: 'सुनिश्चित करें कि क्रिया कर्ता से मेल खाए — एकवचन के साथ एकवचन, बहुवचन के साथ बहुवचन।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
    order: 4,
    content: {
      explanation: `The verb must agree with the subject in number (singular/plural).

**Basic rule:** Singular subject → singular verb (with -s). Plural subject → plural verb (no -s).
- The boy **runs**. The boys **run**.
- She **has** a car. They **have** a car.

**Tricky cases:**
- **Everyone, someone, nobody, each** → SINGULAR
  - Everyone **is** here. Each student **has** a book.
- **The news, mathematics, physics** → SINGULAR (look plural but aren't!)
  - The news **is** shocking.
- **People, police, children** → PLURAL
  - The police **are** investigating.
- **Either...or / Neither...nor** → verb agrees with NEAREST subject
  - Neither the students nor the teacher **was** ready.
- **A lot of / some of / most of** → depends on the noun after "of"
  - A lot of water **is** wasted. A lot of people **are** waiting.`,
      explanationTranslations: { hi: `क्रिया को कर्ता से मिलना चाहिए।

**मूल नियम:** Singular → -s (runs, has). Plural → no -s (run, have).
**मुश्किल:** Everyone/each → singular. People/police → plural.
**Either...or:** निकटतम कर्ता से मिलाएं।`, ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
      examples: [
        { english: 'The news about the elections is surprising.', translations: { hi: 'चुनाव की खबर चौंकाने वाली है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'news ... is' },
        { english: 'Each of the players has to bring their own kit.', translations: { hi: 'हर खिलाड़ी को अपनी किट लानी होगी।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'Each ... has' },
      ],
      tips: [
        { text: '💡 "The team are..." or "The team is..."? In Indian/British English, collective nouns can be plural when referring to individuals: "The team are arguing among themselves."', translations: { hi: '💡 भारतीय/ब्रिटिश अंग्रेजी में collective nouns व्यक्तियों के लिए plural हो सकते हैं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      ],
    },
    exercises: [
      { id: 'b1-g4-ex1', type: 'multiple-choice', question: 'Everyone in the class _____ excited about the trip.', options: ['is', 'are', 'were', 'be'], correctAnswer: 'is', explanation: '"Everyone" is always singular → is.', explanationTranslations: { hi: '"Everyone" हमेशा singular → is.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g4-ex2', type: 'fill-blank', question: 'Mathematics _____ my favourite subject.', correctAnswer: 'is', explanation: '"Mathematics" is singular despite ending in -s.', explanationTranslations: { hi: '"Mathematics" -s पर खत्म होने के बावजूद singular है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g4-ex3', type: 'correct-error', question: 'Find the error: "The police has arrested the thief."', correctAnswer: 'The police have arrested the thief.', explanation: '"Police" is always plural → have.', explanationTranslations: { hi: '"Police" हमेशा plural → have.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g4-ex4', type: 'multiple-choice', question: 'Either Priya or her sisters _____ coming to the party.', options: ['is', 'are', 'was', 'has'], correctAnswer: 'are', explanation: 'Either...or — verb agrees with the nearest subject: "sisters" (plural) → are.', explanationTranslations: { hi: 'Either...or — क्रिया निकटतम कर्ता से मिलती है: "sisters" (बहुवचन) → are.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g4-ex5', type: 'fill-blank', question: 'Neither the teacher nor the students _____ aware of the change.', correctAnswer: 'were', explanation: 'Neither...nor — verb matches the nearest subject: "students" (plural) → were.', explanationTranslations: { hi: 'Neither...nor — "students" (बहुवचन) → were.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g4-ex6', type: 'correct-error', question: 'Find the error: "A lot of water are wasted every day."', correctAnswer: 'A lot of water is wasted every day.', explanation: '"A lot of" + uncountable noun (water) → singular verb: is.', explanationTranslations: { hi: '"A lot of" + अगणनीय (water) → singular: is.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g4-ex7', type: 'multiple-choice', question: 'The committee _____ announced its decision.', options: ['have', 'has', 'are', 'were'], correctAnswer: 'has', explanation: 'Collective noun "committee" acting as one unit → singular verb: has.', explanationTranslations: { hi: 'Collective noun "committee" एक इकाई → singular: has.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g4-ex8', type: 'fill-blank', question: 'Each of the students _____ a textbook.', correctAnswer: 'has', explanation: '"Each" is always singular → has.', explanationTranslations: { hi: '"Each" हमेशा singular → has.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
    ],
  },

  // ==================== B1: CONJUNCTIONS ====================
  {
    id: 'b1-gram-05',
    level: 'B1',
    title: 'Conjunctions: Connecting Ideas',
    titleTranslations: { hi: 'समुच्चयबोधक: विचारों को जोड़ना', ta: 'இணைப்புச்சொற்கள்', te: 'సంయోజకాలు', bn: 'সংযোজক', mr: 'उभयान्वयी अव्यय', kn: 'ಸಂಯೋಜಕ', ml: 'സംയോജകം', gu: 'સંયોજક', pa: 'ਸੰਜੋਗੀ', od: 'ସଂଯୋଜକ', en: 'Conjunctions: Connecting Ideas' },
    description: 'Link sentences and ideas using and, but, so, because, although, however, etc.',
    descriptionTranslations: { hi: 'and, but, so, because, although, however आदि से वाक्य और विचार जोड़ें।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
    order: 5,
    content: {
      explanation: `**Coordinating** (join equal parts): and, but, or, so, yet, for, nor (FANBOYS)
- I like tea **and** coffee.
- She studied hard **but** failed the exam.
- It was raining, **so** we stayed home.

**Subordinating** (one part depends on the other):
- **because / since / as** → reason: I stayed home **because** it rained.
- **although / even though** → contrast: **Although** he was tired, he kept working.
- **if / unless** → condition: **If** you study, you will pass.
- **when / while / before / after** → time: Call me **when** you arrive.

**Linking adverbs** (join ideas between sentences — use ; or .):
- however, therefore, moreover, nevertheless, furthermore
- It was expensive**; however,** the quality was excellent.`,
      explanationTranslations: { hi: `**Coordinating (FANBOYS):** and, but, or, so, yet
**Subordinating:** because, although, if, when, while, before, after
**Linking adverbs:** however, therefore, moreover, nevertheless`, ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
      examples: [
        { english: 'Although Delhi is polluted, millions of people love living there.', translations: { hi: 'हालांकि दिल्ली प्रदूषित है, लाखों लोग वहां रहना पसंद करते हैं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'Although' },
        { english: 'The train was late; therefore, we missed the meeting.', translations: { hi: 'ट्रेन देर से आई; इसलिए, हम मीटिंग चूक गए।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'therefore' },
      ],
      tips: [
        { text: '💡 Don\'t start too many sentences with "Because..." in formal writing. Instead, put the main clause first: "We stayed home because it rained."', translations: { hi: '💡 औपचारिक लेखन में "Because..." से बहुत सारे वाक्य शुरू न करें।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      ],
    },
    exercises: [
      { id: 'b1-g5-ex1', type: 'multiple-choice', question: 'She likes cricket _____ her brother prefers football.', options: ['and', 'but', 'so', 'because'], correctAnswer: 'but', explanation: 'Contrast between two preferences → but.', explanationTranslations: { hi: 'दो विरोधी बातें → but.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g5-ex2', type: 'fill-blank', question: '_____ it was very hot, we went for a walk. (contrast)', correctAnswer: 'Although', explanation: 'Contrast (surprising result) → Although.', explanationTranslations: { hi: 'विरोधाभास (अप्रत्याशित) → Although.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g5-ex3', type: 'multiple-choice', question: 'I will call you _____ I reach Pune.', options: ['although', 'because', 'when', 'but'], correctAnswer: 'when', explanation: 'Time conjunction → when.', explanationTranslations: { hi: 'समय सूचक → when.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g5-ex4', type: 'multiple-choice', question: 'He missed the train _____ he woke up late.', options: ['so', 'because', 'but', 'although'], correctAnswer: 'because', explanation: '"Because" gives the reason: He missed it because he woke up late.', explanationTranslations: { hi: '"Because" कारण बताता है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g5-ex5', type: 'fill-blank', question: '_____ it was raining heavily, the match continued.', correctAnswer: 'Even though', explanation: '"Even though" shows contrast — surprising result despite a condition.', explanationTranslations: { hi: '"Even though" विरोधाभास दिखाता है — शर्त के बावजूद अप्रत्याशित परिणाम।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g5-ex6', type: 'multiple-choice', question: 'You will fail _____ you study harder.', options: ['if', 'unless', 'because', 'so'], correctAnswer: 'unless', explanation: '"Unless" = "if not". You will fail if you don\'t study harder.', explanationTranslations: { hi: '"Unless" = "if not"। अगर ज्यादा पढ़ाई नहीं करोगे तो फेल हो जाओगे।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g5-ex7', type: 'fill-blank', question: 'You can borrow my bike _____ you return it by evening.', correctAnswer: 'as long as', explanation: '"As long as" means "on the condition that".', explanationTranslations: { hi: '"As long as" = इस शर्त पर कि।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b1-g5-ex8', type: 'correct-error', question: 'Find the error: "I was cooking while my mother was watch TV."', correctAnswer: 'I was cooking while my mother was watching TV.', explanation: '"While" connects two simultaneous actions — both need continuous form.', explanationTranslations: { hi: '"While" दो एक साथ चल रही क्रियाएं जोड़ता है — दोनों continuous में।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
    ],
  },

  // ==================== B2: REPORTED SPEECH ====================
  {
    id: 'b2-gram-03',
    level: 'B2',
    title: 'Reported (Indirect) Speech',
    titleTranslations: { hi: 'अप्रत्यक्ष कथन', ta: 'அறிவிப்பு வாக்கியம்', te: 'పరోక్ష వాక్యం', bn: 'পরোক্ষ উক্তি', mr: 'अप्रत्यक्ष भाषण', kn: 'ಪರೋಕ್ಷ ನುಡಿ', ml: 'പരോക്ഷ ഭാഷണം', gu: 'પરોક્ષ કથન', pa: 'ਪਰੋਕਸ਼ ਬੋਲੀ', od: 'ପରୋକ୍ଷ ଭାଷଣ', en: 'Reported (Indirect) Speech' },
    description: 'Report what someone said by changing tenses, pronouns and time references.',
    descriptionTranslations: { hi: 'किसी ने क्या कहा यह बताने के लिए काल, सर्वनाम और समय बदलें।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
    order: 3,
    content: {
      explanation: `**Direct:** "I am tired," she said.
**Reported:** She said (that) she **was** tired.

**Tense backshift:**
- am/is → was, are → were
- do/does → did, have/has → had
- will → would, can → could
- Past Simple → Past Perfect: "I went" → He said he **had gone**

**Pronoun changes:** I → he/she, my → his/her, we → they

**Time/place changes:**
- today → that day, tomorrow → the next day
- yesterday → the day before, here → there, this → that

**Reporting questions:**
- Yes/No: She asked **if/whether** I was coming.
- Wh-: He asked **where** I lived. (no question mark!)

**Reporting commands:**
- "Sit down!" → He told me **to sit down**.
- "Don't run!" → She told them **not to run**.`,
      explanationTranslations: { hi: `**Direct → Reported:** काल एक पीछे जाता है।
am→was, will→would, can→could
I→he/she, today→that day, tomorrow→the next day
प्रश्न: asked if/whether... आदेश: told + to + verb`, ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
      examples: [
        { english: '"I will call you tomorrow," Rahul said. → Rahul said he would call me the next day.', translations: { hi: '"मैं कल फ़ोन करूंगा," राहुल ने कहा। → राहुल ने कहा कि वह अगले दिन फ़ोन करेगा।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'would ... the next day' },
        { english: '"Where do you live?" she asked. → She asked where I lived.', translations: { hi: '"तुम कहाँ रहते हो?" उसने पूछा। → उसने पूछा कि मैं कहाँ रहता हूँ।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'asked where I lived' },
      ],
      tips: [
        { text: '💡 In reported speech, don\'t use question word order! "She asked where did I live" ❌ → "She asked where I lived" ✅', translations: { hi: '💡 Reported speech में प्रश्न शब्द क्रम मत रखें! "She asked where I lived" ✅', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      ],
    },
    exercises: [
      { id: 'b2-g3-ex1', type: 'multiple-choice', question: '"I am going to the market," she said. → She said she _____ going to the market.', options: ['is', 'was', 'has been', 'will be'], correctAnswer: 'was', explanation: 'am → was (tense backshift).', explanationTranslations: { hi: 'am → was (काल एक पीछे).', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b2-g3-ex2', type: 'fill-blank', question: '"Where is the station?" he asked. → He asked where the station _____.', correctAnswer: 'was', explanation: 'is → was in reported speech, no question order.', explanationTranslations: { hi: 'is → was, प्रश्न क्रम नहीं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b2-g3-ex3', type: 'correct-error', question: 'Find the error: "She asked where did I live."', correctAnswer: 'She asked where I lived.', explanation: 'Reported questions don\'t use question word order.', explanationTranslations: { hi: 'Reported questions में प्रश्नवाचक क्रम नहीं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b2-g3-ex4', type: 'fill-blank', question: 'The teacher told the students _____ open their books. (command)', correctAnswer: 'to', explanation: 'Reported commands: told + person + to + base verb.', explanationTranslations: { hi: 'Reported commands: told + व्यक्ति + to + base verb.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b2-g3-ex5', type: 'multiple-choice', question: '"Can you help me?" she asked. → She asked if I _____ help her.', options: ['can', 'could', 'will', 'may'], correctAnswer: 'could', explanation: 'Modal backshift: can → could in reported speech.', explanationTranslations: { hi: 'Modal backshift: can → could reported speech में।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b2-g3-ex6', type: 'correct-error', question: 'Find the error: "She said that she will come tomorrow."', correctAnswer: 'She said that she would come the next day.', explanation: 'will → would, tomorrow → the next day in reported speech.', explanationTranslations: { hi: 'will → would, tomorrow → the next day reported speech में।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b2-g3-ex7', type: 'fill-blank', question: '"Don\'t touch the wire!" he warned us. → He warned us _____ touch the wire.', correctAnswer: 'not to', explanation: 'Reported negative command: told/warned + not to + base verb.', explanationTranslations: { hi: 'Reported negative command: told/warned + not to + base verb.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'b2-g3-ex8', type: 'multiple-choice', question: '"I met her yesterday," he said. → He said he had met her _____.', options: ['yesterday', 'the day before', 'today', 'that day'], correctAnswer: 'the day before', explanation: '"Yesterday" becomes "the day before" in reported speech.', explanationTranslations: { hi: '"Yesterday" → "the day before" reported speech में।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
    ],
  },

  // ==================== C1: MIXED CONDITIONALS ====================
  {
    id: 'c1-gram-02',
    level: 'C1',
    title: 'Mixed Conditionals and Wish Clauses',
    titleTranslations: { hi: 'मिश्रित शर्त वाक्य और Wish', ta: 'கலப்பு நிபந்தனைகள்', te: 'మిశ్రమ షరతులు', bn: 'মিশ্র শর্তমূলক', mr: 'मिश्र अटी वाक्ये', kn: 'ಮಿಶ್ರ ಷರತು', ml: 'മിശ്ര നിബന്ധന', gu: 'મિશ્ર શરત', pa: 'ਮਿਸ਼ਰ ਸ਼ਰਤ', od: 'ମିଶ୍ର ସର୍ତ୍ତ', en: 'Mixed Conditionals and Wish Clauses' },
    description: 'Express regrets and hypothetical situations mixing past and present.',
    descriptionTranslations: { hi: 'भूतकाल और वर्तमान को मिलाकर पछतावा और काल्पनिक स्थितियां व्यक्त करें।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
    order: 2,
    content: {
      explanation: `**Mixed Conditional Type 1:** Past condition → Present result
If + Past Perfect → would + base verb
- If I **had studied** medicine, I **would be** a doctor now.
- If she **hadn't moved** to Bangalore, she **wouldn't have** this job.

**Mixed Conditional Type 2:** Present condition → Past result
If + Past Simple → would have + past participle
- If I **were** taller, I **would have been** selected for the basketball team.
- If he **spoke** better English, he **would have got** the promotion.

**Wish clauses:**
- I wish + Past Simple → present regret: I wish I **knew** the answer.
- I wish + Past Perfect → past regret: I wish I **had listened** to my parents.
- I wish + would → annoyance/future desire: I wish it **would stop** raining.
- If only → stronger version of wish: If only I **had** more time!`,
      explanationTranslations: { hi: `**Mixed Type 1:** अगर भूतकाल में... → वर्तमान परिणाम
**Mixed Type 2:** अगर वर्तमान में... → भूतकाल का परिणाम
**Wish:** Past Simple = वर्तमान पछतावा, Past Perfect = भूतकाल पछतावा`, ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
      examples: [
        { english: 'If I had taken the IIT entrance exam, I would be an engineer now.', translations: { hi: 'अगर मैंने IIT की परीक्षा दी होती, तो अब इंजीनियर होता।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'had taken ... would be' },
        { english: 'I wish I had learned to code in college.', translations: { hi: 'काश मैंने कॉलेज में कोडिंग सीखी होती।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' }, highlight: 'wish ... had learned' },
      ],
      tips: [
        { text: '💡 Use "were" (not "was") in wish/if clauses: "I wish I were taller" is formal/correct. "I wish I was" is accepted in informal speech.', translations: { hi: '💡 Wish/if clauses में "were" (न कि "was"): "I wish I were" औपचारिक/सही है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      ],
    },
    exercises: [
      { id: 'c1-g2-ex1', type: 'fill-blank', question: 'If I _____ harder at school, I would have a better job now. (study)', correctAnswer: 'had studied', explanation: 'Past condition → present result = had + past participle.', explanationTranslations: { hi: 'भूतकाल शर्त → वर्तमान परिणाम = had + past participle.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'c1-g2-ex2', type: 'multiple-choice', question: 'I wish I _____ more time to travel. (present regret)', options: ['have', 'had', 'would have', 'having'], correctAnswer: 'had', explanation: 'Wish + Past Simple for present regrets.', explanationTranslations: { hi: 'Wish + Past Simple = वर्तमान पछतावा.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'c1-g2-ex3', type: 'multiple-choice', question: 'If she spoke fluent English, she _____ got the international posting last year.', options: ['will have', 'would have', 'had', 'has'], correctAnswer: 'would have', explanation: 'Present condition → past result = would have + past participle.', explanationTranslations: { hi: 'वर्तमान शर्त → भूतकाल परिणाम = would have + past participle.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'c1-g2-ex4', type: 'fill-blank', question: 'If only I _____ more time to prepare for the UPSC exam!', correctAnswer: 'had', explanation: '"If only" + Past Simple = strong present wish/regret. Same as "I wish I had..."', explanationTranslations: { hi: '"If only" + Past Simple = मजबूत वर्तमान इच्छा/पछतावा।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'c1-g2-ex5', type: 'multiple-choice', question: 'I wish my neighbours _____ stop playing loud music at night.', options: ['will', 'would', 'could', 'should'], correctAnswer: 'would', explanation: '"I wish + would" expresses annoyance or a desire for someone to change.', explanationTranslations: { hi: '"I wish + would" झुंझलाहट या बदलाव की इच्छा व्यक्त करता है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'c1-g2-ex6', type: 'correct-error', question: 'Find the error: "I wish I didn\'t eat so much at the wedding last night."', correctAnswer: 'I wish I hadn\'t eaten so much at the wedding last night.', explanation: 'For past regrets: wish + Past Perfect (hadn\'t eaten).', explanationTranslations: { hi: 'भूतकाल का पछतावा: wish + Past Perfect (hadn\'t eaten).', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'c1-g2-ex7', type: 'multiple-choice', question: 'If he were more confident, he _____ that job interview last week.', options: ['will pass', 'would pass', 'would have passed', 'passed'], correctAnswer: 'would have passed', explanation: 'Mixed conditional: present condition (were confident) → past result (would have passed).', explanationTranslations: { hi: 'Mixed conditional: वर्तमान शर्त → भूतकाल परिणाम: would have passed.', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
      { id: 'c1-g2-ex8', type: 'fill-blank', question: 'If only she _____ accepted the scholarship when it was offered. (regret about the past)', correctAnswer: 'had', explanation: '"If only" + Past Perfect for past regrets: If only she had accepted...', explanationTranslations: { hi: '"If only" + Past Perfect भूतकाल पछतावा: If only she had accepted...', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' } },
    ],
  },
];

export function getGrammarLessonsByLevel(level: string): GrammarLesson[] {
  return grammarLessons.filter((l) => l.level === level).sort((a, b) => a.order - b.order);
}

export function getGrammarLessonById(id: string): GrammarLesson | undefined {
  return grammarLessons.find((l) => l.id === id);
}
