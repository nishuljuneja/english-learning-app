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
    ],
  },
];

export function getGrammarLessonsByLevel(level: string): GrammarLesson[] {
  return grammarLessons.filter((l) => l.level === level).sort((a, b) => a.order - b.order);
}

export function getGrammarLessonById(id: string): GrammarLesson | undefined {
  return grammarLessons.find((l) => l.id === id);
}
