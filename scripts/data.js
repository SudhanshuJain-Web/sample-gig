// ==========================================================================
// GigSaathi AI - Data Store & Multilingual Translations
// 10 Pre-configured Gig & Informal Workers, Sample Documents, Welfare Schemes,
// and Complete Multi-Language Lexicon with Speech Synthesis Codes.
// ==========================================================================

const MAX_WORKERS_ALLOWED = 10;

const WORKERS_LIST = [
  {
    id: "worker-01",
    name: "Raju Kumar",
    phone: "9876543210",
    role: "Pick & Drop Partner",
    platform: "Zomato & Swiggy",
    vehicle: "Splendor 100cc",
    city: "New Delhi",
    avatar: "🛵",
    lang: "hi",
    todayGross: 980,
    fuelCost: 280,
    deductions: 140,
    hoursWorked: 8.5,
    activeDisputes: 1
  },
  {
    id: "worker-02",
    name: "Sunita Devi",
    phone: "9876543211",
    role: "Daily Wage Cook & Helper",
    platform: "Direct Household / Local Gig",
    vehicle: "Public Transit / Walking",
    city: "Lucknow",
    avatar: "👩‍🍳",
    lang: "hi",
    todayGross: 750,
    fuelCost: 60,
    deductions: 0,
    hoursWorked: 7.0,
    activeDisputes: 0
  },
  {
    id: "worker-03",
    name: "Ramesh Yadav",
    phone: "9876543212",
    role: "Auto-Rickshaw & Cab Driver",
    platform: "Uber, Ola & Rapido",
    vehicle: "Bajaj CNG Auto",
    city: "Mumbai",
    avatar: "🛺",
    lang: "hi",
    todayGross: 1450,
    fuelCost: 420,
    deductions: 210,
    hoursWorked: 10.0,
    activeDisputes: 2
  },
  {
    id: "worker-04",
    name: "Mohammed Arif",
    phone: "9876543213",
    role: "Logistics & Courier Delivery",
    platform: "Amazon Flex & Porter",
    vehicle: "Mahindra Bolero Pickup",
    city: "Hyderabad",
    avatar: "🚚",
    lang: "te",
    todayGross: 1850,
    fuelCost: 620,
    deductions: 180,
    hoursWorked: 9.0,
    activeDisputes: 0
  },
  {
    id: "worker-05",
    name: "Kavita Sharma",
    phone: "9876543214",
    role: "10-Min Quick Commerce Rider",
    platform: "Zepto & Blinkit",
    vehicle: "Ola S1 EV Scooter",
    city: "Bengaluru",
    avatar: "⚡",
    lang: "en",
    todayGross: 1120,
    fuelCost: 45, // EV charging
    deductions: 250, // Cancellation penalty
    hoursWorked: 8.0,
    activeDisputes: 1
  },
  {
    id: "worker-06",
    name: "Amit Patel",
    phone: "9876543215",
    role: "Skilled Daily Electrician",
    platform: "Urban Company & Self",
    vehicle: "Honda Activa",
    city: "Ahmedabad",
    avatar: "🔧",
    lang: "gu",
    todayGross: 1600,
    fuelCost: 190,
    deductions: 320, // Platform commission
    hoursWorked: 8.0,
    activeDisputes: 0
  },
  {
    id: "worker-07",
    name: "Vikram Singh",
    phone: "9876543216",
    role: "Dark Store Picker & Loader",
    platform: "Instamart Warehouse",
    vehicle: "Bicycle / Metro",
    city: "Gurugram",
    avatar: "📦",
    lang: "hinglish",
    todayGross: 820,
    fuelCost: 40,
    deductions: 0,
    hoursWorked: 8.0,
    activeDisputes: 0
  },
  {
    id: "worker-08",
    name: "Lakshmi Murugan",
    phone: "9876543217",
    role: "Sanitation & Daily Maintenance",
    platform: "Civic Contractor Gig",
    vehicle: "Bus Transit",
    city: "Chennai",
    avatar: "🧹",
    lang: "ta",
    todayGross: 700,
    fuelCost: 50,
    deductions: 0,
    hoursWorked: 7.5,
    activeDisputes: 1
  },
  {
    id: "worker-09",
    name: "Gurpreet Singh",
    phone: "9876543218",
    role: "Commercial Tempo Driver",
    platform: "Porter & Uncle Delivery",
    vehicle: "Tata Ace Diesel",
    city: "Ludhiana",
    avatar: "🚛",
    lang: "hi",
    todayGross: 2100,
    fuelCost: 750,
    deductions: 310,
    hoursWorked: 11.0,
    activeDisputes: 1
  },
  {
    id: "worker-10",
    name: "Pooja Verma",
    phone: "9876543219",
    role: "Pick & Drop Weekend Partner",
    platform: "Swiggy Instamart",
    vehicle: "TVS Jupiter",
    city: "Pune",
    avatar: "🛵",
    lang: "mr",
    todayGross: 890,
    fuelCost: 210,
    deductions: 90,
    hoursWorked: 6.5,
    activeDisputes: 0
  }
];

// Sample Documents for Multimodal / Plain-Language Analysis
const SAMPLE_DOCS = [
  {
    id: "doc-1",
    title: "Unfair Order Cancellation Penalty Slip",
    category: "Payout Slip",
    platform: "Food Delivery App",
    rawText: `WEEKLY PAYOUT SETTLEMENT - WEEK 41
Gross Deliveries (42 trips): ₹3,240.00
Customer Tips: ₹180.00
Fuel Incentive: ₹200.00
SUBTOTAL: ₹3,620.00
--- DEDUCTIONS & PENALTIES ---
Order #ZO-8991201 Cancellation: -₹350.00
Customer Unreachable Wait Time Default: -₹100.00
Uniform & Bag Depreciation Fee: -₹75.00
Negative Balance Carryover: -₹150.00
TOTAL DEDUCTION: -₹675.00
FINAL TRANSFERABLE AMOUNT: ₹2,945.00
Note: Dispute window closes in 48 hours. Appeals via automated chatbot only.`,
    simpleExplanation: "इस पर्ची में कंपनी ने आपके ₹675 काट लिए हैं! ₹350 एक कैंसल ऑर्डर के काटे गए हैं जबकि आपने कस्टमर का इंतज़ार किया था। ₹75 बैग और वर्दी की फीस काटी है। आपका असली मेहनताना कम हो गया है।",
    redFlags: [
      "₹350 की भारी पेनाल्टी उस ऑर्डर पर जहां ग्राहक ने फोन नहीं उठाया।",
      "₹100 का अतिरिक्त वेट-टाइम डिफ़ॉल्ट जुर्माना बिना किसी प्रूफ के।",
      "केवल 48 घंटे की बहुत छोटी अपील समय-सीमा दी गई है।"
    ],
    recommendedAction: "तुरंत 'न्याय ड्राफ़्टर' से Hub Lead को WhatsApp मैसेज भेजें और Order #ZO-8991201 के कॉल रिकॉर्ड्स व GPS लोकेशन का स्क्रीनशॉट लगाएं।"
  },
  {
    id: "doc-2",
    title: "Account Temporary Deactivation Notice",
    category: "Algorithm Notice",
    platform: "Ride Hailing & Delivery App",
    rawText: `NOTICE OF ACCOUNT RESTRICTION
Dear Partner ID #DRV-449102,
Your account has been temporarily restricted from accepting trips starting 16-Oct-2026 21:00 hrs.
Reason: Low Order Acceptance Rate (38%) during High Surge Window & Multiple Customer Discard flags.
Resolution: Complete partner training modules within 7 days. Repeated violations will result in permanent device IMEI blacklist.
Legal: As an independent contractor, platform terms apply.`,
    simpleExplanation: "कंपनी के कंप्यूटर अल्गोरिद्म ने बिना किसी मैनेजर की जांच के आपकी आईडी ब्लॉक कर दी है! वजह यह बताई है कि आपने भारी बारिश या जाम के समय कम ट्रिप्स स्वीकार कीं।",
    redFlags: [
      "अल्गोरिद्म ने ट्रैफिक, बारिश या सुरक्षा कारणों को अनदेखा कर दिया।",
      "स्थायी IMEI ब्लैकलिस्ट की अनुचित धमकी दी गई है जो आपके आजीविका के अधिकार का उल्लंघन है।"
    ],
    recommendedAction: "राज्य गिग वर्कर्स वेलफेयर बोर्ड और कंपनी के ग्रीवेंस ऑफिसर को 'Right to Work' के तहत औपचारिक अपील तुरंत भेजें।"
  },
  {
    id: "doc-3",
    title: "Traffic Police No-Parking e-Challan",
    category: "Legal Challan",
    platform: "Traffic Police Department",
    rawText: `VIRTUAL TRAFFIC COURT NOTICE
Challan No: DL-TC-2026-88190
Vehicle No: DL 4S BD 1192 (Two Wheeler)
Violation: Sec 177/122 Motor Vehicles Act - Obstruction / Illegal Parking outside Cyber Mall.
Fine Amount: ₹1,000.00
Due Date: 15-Nov-2026
Camera Evidence Captured: 15-Oct-2026 20:14:02 IST.`,
    simpleExplanation: "जब आप डिलीवरी पार्सल लेने 2 मिनट के लिए रुके थे, कैमरे ने आपकी बाइक का ₹1,000 का नो-पार्किंग चालान काट दिया है।",
    redFlags: [
      "₹1,000 का चालान एक गिग वर्कर की पूरे दिन की आधी कमाई के बराबर है।",
      "गिग डिलीवरी ड्रॉप-ऑफ के लिए समर्पित पार्किंग बे (Delivery Bay) की कमी का खामियाजा वर्कर भुगत रहा है।"
    ],
    recommendedAction: "कंपनी डिलीवरी ऐप से 'Proof of Active Delivery' (उस समय का एक्टिव पिकअप स्टेटस) डाउनलोड करें और वर्चुअल कोर्ट में 'Commercial Drop-off' का क्लेम प्रस्तुत करें।"
  },
  {
    id: "doc-4",
    title: "Medical Insurance Claim Rejection",
    category: "Insurance Notice",
    platform: "Group Health Insurer",
    rawText: `CLAIM DISALLOWANCE LETTER
Ref: CLM-ACC-901192 | Partner ID: #9876543210
Hospitalization Period: 12-Oct-2026 to 14-Oct-2026 (Knee Fracture)
Claim Amount Claimed: ₹38,500.00
Claim Status: REJECTED
Reason: Exclusion Clause 4.B - 'Accident occurred during transit between delivery shift and residence; rider was logged off active delivery order at 23:42 hrs.'`,
    simpleExplanation: "बीमा कंपनी ने अस्पताल के ₹38,500 देने से मना कर दिया है, यह कहकर कि आपका एक्सीडेंट डिलीवरी खत्म करके घर लौटते वक्त हुआ था और ऐप बंद था!",
    redFlags: [
      "बीमा कंपनी 'Transit to Home' (घर वापसी) को ऑन-ड्यूटी नहीं मान रही है जबकि कई अदालतों ने इसे कार्य से जुड़ा माना है।",
      "e-Shram और राज्य गिग वेलफेयर बोर्ड के तहत 24-घंटे का ₹2 लाख का एक्सीडेंट कवर मान्य होता है।"
    ],
    recommendedAction: "e-Shram कार्ड के तहत PMSBY ₹2 लाख क्लेम फॉर्म भरें और स्टेट लेबर कमिश्नर को शिकायत पत्र भेजें।"
  }
];

// Welfare Schemes & Government Protections
const WELFARE_SCHEMES = [
  {
    id: "sch-1",
    name: "e-Shram Card (ई-श्रम कार्ड)",
    agency: "Ministry of Labour & Employment, Govt of India",
    benefit: "₹2,00,000 Free Accidental Insurance",
    description: "भारत के सभी असंगठित एवं गिग कामगारों के लिए नेशनल डेटाबेस पहचान पत्र। दुर्घटना मृत्यु या पूर्ण अपंगता पर ₹2 लाख और आंशिक अपंगता पर ₹1 लाख की सहायता।",
    eligibility: "उम्र 16 से 59 वर्ष, EPFO या ESIC का सदस्य न हो, गिग या दैनिक वेतन कामगार हो।",
    docsRequired: ["आधार कार्ड (Aadhaar)", "आधार से लिंक मोबाइल नंबर", "बैंक खाता विवरण (IFSC)"],
    officialUrl: "https://eshram.gov.in",
    actionText: "ई-श्रम स्टेटस व आवेदन गाइड"
  },
  {
    id: "sch-2",
    name: "Ayushman Bharat PM-JAY (आयुष्मान भारत)",
    agency: "National Health Authority",
    benefit: "₹5,00,000 Free Cashless Hospital Treatment",
    description: "गंभीर बीमारी, ऑपरेशन या अस्पताल में भर्ती होने पर प्रति परिवार प्रति वर्ष ₹5 लाख तक का पूरी तरह मुफ़्त इलाज। सरकारी और प्राइवेट सूचीबद्ध अस्पतालों में मान्य।",
    eligibility: "SECC सूची में दर्ज परिवार या असंगठित श्रमिक कार्डधारक।",
    docsRequired: ["राशन कार्ड / आधार कार्ड", "पारिवारिक समग्र आईडी"],
    officialUrl: "https://beneficiary.nha.gov.in",
    actionText: "मुफ़्त अस्पताल पात्रता जांचें"
  },
  {
    id: "sch-3",
    name: "PM Suraksha Bima Yojana (PMSBY)",
    agency: "Central Govt & Public Banks",
    benefit: "₹2,00,000 Cover for just ₹20/Year",
    description: "मात्र ₹20 प्रति वर्ष के प्रीमियम पर ₹2 लाख का दुर्घटना बीमा। बैंक खाते से ऑटो-डेबिट होता है। सड़क दुर्घटना में चोट या मृत्यु पर परिवार को आर्थिक संबल।",
    eligibility: "18 से 70 वर्ष की आयु, किसी भी बचत बैंक खाते से लिंक।",
    docsRequired: ["बैंक पासबुक", "आधार कार्ड", "सरल सहमति फॉर्म"],
    officialUrl: "https://jansuraksha.gov.in",
    actionText: "बैंक ऑटो-डेबिट निर्देश"
  },
  {
    id: "sch-4",
    name: "State Platform Gig Workers Welfare Act",
    agency: "State Labour Welfare Boards (Rajasthan / Karnataka / Telangana)",
    benefit: "Statutory Social Security & Dispute Tribunal",
    description: "गिग कंपनियों पर 1-2% कल्याणकारी सेस (Fee) लगाकर वर्कर्स के लिए पेंशन, मातृत्व लाभ, दुर्घटना सुरक्षा और बिना नोटिस आईडी ब्लॉक के खिलाफ कानूनी ट्रिब्यूनल।",
    eligibility: "राज्य में किसी भी एग्रीगेटर (Swiggy, Zomato, Uber, Ola, Blinkit) पर एक्टिव आईडी।",
    docsRequired: ["गिग कंपनी पार्टनर आईडी प्रूफ", "निवास प्रमाण पत्र"],
    officialUrl: "https://labour.rajasthan.gov.in",
    actionText: "राज्य बोर्ड में पंजीकरण"
  },
  {
    id: "sch-5",
    name: "Platform In-App Partner Insurance",
    agency: "Aggregator Platforms (Swiggy / Zomato / Uber)",
    benefit: "₹5L to ₹10L On-Trip Accidental Insurance",
    description: "जब आप ऑर्डर पिकअप या डिलीवरी पर होते हैं, तब कंपनी की पॉलिसी के तहत आपातकालीन ओपीडी, अस्पताल भर्ती और एक्सीडेंटल कवर मिलता है।",
    eligibility: "ऑर्डर/ट्रिप के समय ऐप पर ऑनलाइन या 'Active Order' स्थिति में होना।",
    docsRequired: ["ऑर्डर आईडी स्क्रीनशॉट", "FIR या पुलिस डीडीआर", "अस्पताल डिस्चार्ज समरी"],
    officialUrl: "https://help.zomato.com",
    actionText: "कंपनी बीमा क्लेम प्रक्रिया"
  }
];

// Multilingual Interface Dictionaries
const TRANSLATIONS = {
  en: {
    appTitle: "GigSaathi AI",
    appSub: "GenAI Guardian for Gig & Informal Workers",
    readPageBtn: "🔊 Listen to Page",
    stopAudioBtn: "⏹ Stop Audio",
    navEarnings: "Earnings Tracking",
    navSafety: "Safety Practices",
    navWelfare: "Rights & Welfare",
    navDocs: "Document Help",
    navGrievance: "Grievance Drafter",
    quotaLabel: "Active Workers: 10 / 10 Max",
    loginHeading: "Worker Sign-In Portal",
    loginSub: "Select your profile or enter phone to access your personalized GenAI Co-pilot",
    grossEarnings: "Gross Earned",
    platformCuts: "Platform Deductions",
    netEarnings: "Real Net Pay",
    hourlyRate: "True Hourly Rate",
    aiAdviceTitle: "AI Financial Co-pilot Insights",
    safetyChecklistTitle: "Daily Pre-Shift & Field Safety Checklist",
    emergencySosTitle: "One-Touch Emergency SOS Dispatch",
    sosTriggerText: "TAP SOS FOR HELP",
    docsUploadTitle: "Document & Penalty Jargon Decrypter",
    docsUploadSub: "Select a sample document or upload your pay slip, challan, or deactivation notice",
    grievanceTitle: "Grievance & Dispute AI Drafter",
    grievanceSub: "Generate high-impact appeal letters for unfair deactivation, penalty deductions, and disputes",
    copyDraftBtn: "📋 Copy Text",
    sendWhatsappBtn: "💬 Send via WhatsApp",
    speechLangCode: "en-US"
  },
  hi: {
    appTitle: "गिग साथी AI",
    appSub: "गिग और दैनिक वेतन कामगारों का AI साथी",
    readPageBtn: "🔊 यह पेज सुनें (बोलकर)",
    stopAudioBtn: "⏹ आवाज़ रोकें",
    navEarnings: "कमाई हिसाब",
    navSafety: "सुरक्षा नियम",
    navWelfare: "हक और सरकारी योजनाएँ",
    navDocs: "कागज़ सहायता",
    navGrievance: "न्याय ड्राफ़्टर",
    quotaLabel: "पंजीकृत कामगार: 10 / 10 अधिकतम",
    loginHeading: "कामगार लॉग-इन पोर्टल",
    loginSub: "अपनी प्रोफ़ाइल चुनें या मोबाइल नंबर से अपने निजी AI साथी में प्रवेश करें",
    grossEarnings: "कुल सकल कमाई",
    platformCuts: "कंपनी व पेनाल्टी कटौती",
    netEarnings: "असली शुद्ध कमाई (Net)",
    hourlyRate: "प्रति घंटा असली कमाई",
    aiAdviceTitle: "AI वित्तीय सलाहकार सुझाव",
    safetyChecklistTitle: "दैनिक काम और सड़क सुरक्षा चेकलिस्ट",
    emergencySosTitle: "एक-टच आपातकालीन SOS सहायता",
    sosTriggerText: "मदद के लिए SOS दबाएं",
    docsUploadTitle: "कागज़ व जुर्माना सरल अनुवादक",
    docsUploadSub: "सैंपल डॉक्यूमेंट चुनें या अपनी पे-स्लिप, चालान या ब्लॉक नोटिस की जांच करें",
    grievanceTitle: "न्याय व शिकायत AI ड्राफ़्टर",
    grievanceSub: "गलत आईडी ब्लॉक, अनुचित कटौती या ग्राहक विवाद के खिलाफ 1-क्लिक में पत्र तैयार करें",
    copyDraftBtn: "📋 टेक्स्ट कॉपी करें",
    sendWhatsappBtn: "💬 व्हाट्सएप पर भेजें",
    speechLangCode: "hi-IN"
  },
  hinglish: {
    appTitle: "GigSaathi AI",
    appSub: "Gig & Daily Wage Workers ka AI Guardian",
    readPageBtn: "🔊 Yeh Page Suniye (Voice)",
    stopAudioBtn: "⏹ Voice Band Karein",
    navEarnings: "Kamai Hisaab",
    navSafety: "Safety Practices",
    navWelfare: "Haq Aur Schemes",
    navDocs: "Kagaz Help",
    navGrievance: "Nyaya Drafter",
    quotaLabel: "Active Workers: 10 / 10 Max",
    loginHeading: "Worker Log-In Portal",
    loginSub: "Apna profile select karein aur personalized AI saathi start karein",
    grossEarnings: "Kul Gross Kamai",
    platformCuts: "Platform Katoti & Penalty",
    netEarnings: "Asli Net In-Hand",
    hourlyRate: "Per Hour Asli Rate",
    aiAdviceTitle: "AI Financial Co-pilot Tips",
    safetyChecklistTitle: "Daily Shift Safety Checklist",
    emergencySosTitle: "One-Touch Emergency SOS Alert",
    sosTriggerText: "HELP KE LIYE SOS DABAYE",
    docsUploadTitle: "Kagaz & Challan Plain Language Checker",
    docsUploadSub: "Sample slips ya apni pay slip upload karke aasaan bhasha me samjhein",
    grievanceTitle: "Dispute & Appeal AI Drafter",
    grievanceSub: "ID deactivation aur cut payout ke khilaaf strong appeal draft banayein",
    copyDraftBtn: "📋 Copy Karein",
    sendWhatsappBtn: "💬 WhatsApp pe Bhejein",
    speechLangCode: "hi-IN"
  },
  ta: {
    appTitle: "கிக் சாதி AI",
    appSub: "கிக் & தினக்கூலி தொழிலாளர்களின் AI வழிகாட்டி",
    readPageBtn: "🔊 இந்தப் பக்கத்தைக் கேளுங்கள்",
    stopAudioBtn: "⏹ ஆடியோவை நிறுத்து",
    navEarnings: "வருமானக் கணக்கு",
    navSafety: "பாதுகாப்பு முறைகள்",
    navWelfare: "உரிமைகள் & நலத்திட்டங்கள்",
    navDocs: "ஆவண உதவி",
    navGrievance: "புகார் தயாரிப்பாளர்",
    quotaLabel: "செயலில் உள்ள தொழிலாளர்கள்: 10 / 10 அதிகபட்சம்",
    loginHeading: "தொழிலாளர் உள்நுழைவு",
    loginSub: "உங்கள் சுயவிவரத்தைத் தேர்ந்தெடுக்கவும் அல்லது உங்கள் கணக்கை அணுகவும்",
    grossEarnings: "மொத்த வருமானம்",
    platformCuts: "கட்டணக் கழிவுகள்",
    netEarnings: "உண்மையான நிகர வருமானம்",
    hourlyRate: "மணிநேர வருமானம்",
    aiAdviceTitle: "AI நிதி வழிகாட்டல்",
    safetyChecklistTitle: "தினசரி பாதுகாப்பு சரிபார்ப்பு",
    emergencySosTitle: "அவசர SOS உதவி",
    sosTriggerText: "உதவிக்கு SOS அழுத்தவும்",
    docsUploadTitle: "ஆவண விளக்கம்",
    docsUploadSub: "சம்பள ரசீது அல்லது நோட்டீஸ்களை எளிய தமிழில் புரிந்து கொள்ளுங்கள்",
    grievanceTitle: "முறையீட்டு வரைவு",
    grievanceSub: "தவறான கணக்கு முடக்கம் மற்றும் பிடித்தங்களுக்கு எதிரான மனு",
    copyDraftBtn: "📋 நகலெடு",
    sendWhatsappBtn: "💬 வாட்ஸ்அப்பில் அனுப்பு",
    speechLangCode: "ta-IN"
  },
  te: {
    appTitle: "గిగ్ సాథీ AI",
    appSub: "గిగ్ & రోజువారీ వేతన కార్మికుల AI సహచరుడు",
    readPageBtn: "🔊 ఈ పేజీని వినండి",
    stopAudioBtn: "⏹ ఆడియోను ఆపండి",
    navEarnings: "ఆదాయ లెక్కలు",
    navSafety: "భద్రతా పద్ధతులు",
    navWelfare: "హక్కులు & సంక్షేమ పథకాలు",
    navDocs: "పత్రాల సహాయం",
    navGrievance: "ఫిర్యాదు డ్రాఫ్టర్",
    quotaLabel: "కార్మికులు: 10 / 10 గరిష్టం",
    loginHeading: "కార్మికుల లాగిన్ పోర్టల్",
    loginSub: "మీ ప్రొఫైల్‌ను ఎంచుకోండి లేదా మీ AI సహాయకుడిని పొందండి",
    grossEarnings: "మొత్తం ఆదాయం",
    platformCuts: "ప్లాట్‌ఫారమ్ కోతలు",
    netEarnings: "నికర చేతికి అందే మొత్తం",
    hourlyRate: "గంట రేటు",
    aiAdviceTitle: "AI ఆర్థిక సూచనలు",
    safetyChecklistTitle: "భద్రతా తనిఖీ జాబితా",
    emergencySosTitle: "అత్యవసర SOS సహాయం",
    sosTriggerText: "సహాయం కోసం SOS నొక్కండి",
    docsUploadTitle: "పత్రాల వివరణ",
    docsUploadSub: "కఠినమైన నోటీసులను సులభమైన తెలుగులో అర్థం చేసుకోండి",
    grievanceTitle: "వివాద పరిష్కార లేఖ",
    grievanceSub: "అన్యాయమైన ఐడి రద్దు లేదా కోతలపై అప్పీల్ రూపొందించండి",
    copyDraftBtn: "📋 కాపీ చేయండి",
    sendWhatsappBtn: "💬 వాట్సాప్‌లో పంపండి",
    speechLangCode: "te-IN"
  },
  bn: {
    appTitle: "গিগ সাথী AI",
    appSub: "গিগ ও দৈনিক মজুরি কর্মীদের এআই সহায়ক",
    readPageBtn: "🔊 এই পৃষ্ঠাটি শুনুন",
    stopAudioBtn: "⏹ অডিও বন্ধ করুন",
    navEarnings: "উপার্জন হিসাব",
    navSafety: "নিরাপত্তা নিয়ম",
    navWelfare: "অধিকার ও প্রকল্প",
    navDocs: "নথিপত্র সহায়তা",
    navGrievance: "অভিযোগ ড্রাফটার",
    quotaLabel: "সক্রিয় কর্মী: ১০ / ১০ সর্বোচ্চ",
    loginHeading: "কর্মী লগইন পোর্টাল",
    loginSub: "আপনার প্রোফাইল বেছে নিন এবং এআই সহায়ক শুরু করুন",
    grossEarnings: "মোট উপার্জন",
    platformCuts: "প্ল্যাটফর্ম কর্তন",
    netEarnings: "আসল নিট আয়",
    hourlyRate: "প্রতি ঘণ্টার আয়",
    aiAdviceTitle: "এআই পরামর্শ ও দিকনির্দেশনা",
    safetyChecklistTitle: "দৈনিক নিরাপত্তা তালিকা",
    emergencySosTitle: "জরুরি SOS সহায়তা",
    sosTriggerText: "সাহায্যের জন্য SOS টিপুন",
    docsUploadTitle: "নথিপত্র সরলীকরণ",
    docsUploadSub: "পে-স্লিপ বা জরিমানা নোটিশ সহজ বাংলায় বুঝুন",
    grievanceTitle: "অভিযোগ পত্র ড্রাফটার",
    grievanceSub: "আইডি ব্লক ও কাটা টাকার বিরুদ্ধে শক্তিশালী আবেদন তৈরি করুন",
    copyDraftBtn: "📋 কপি করুন",
    sendWhatsappBtn: "💬 হোয়াটসঅ্যাপে পাঠান",
    speechLangCode: "bn-IN"
  },
  mr: {
    appTitle: "गिग साथी AI",
    appSub: "गिग व रोजंदारी कामगारांचा AI मार्गदर्शक",
    readPageBtn: "🔊 हे पान ऐका (ध्वनी)",
    stopAudioBtn: "⏹ आवाज थांबवा",
    navEarnings: "कमाईचा हिशोब",
    navSafety: "सुरक्षा नियम",
    navWelfare: "हक्क आणि कल्याणकारी योजना",
    navDocs: "कागदपत्र मदत",
    navGrievance: "तक्रार मसुदा",
    quotaLabel: "नोंदणीकृत कामगार: १० / १० कमाल",
    loginHeading: "कामगार लॉगिन पोर्टल",
    loginSub: "आपले प्रोफाईल निवडा व वैयक्तिक AI सहाय्यक वापरा",
    grossEarnings: "एकूण कमाई",
    platformCuts: "कंपनी व दंड कपात",
    netEarnings: "खरे निव्वळ उत्पन्न",
    hourlyRate: "तासाचा दर",
    aiAdviceTitle: "AI आर्थिक सल्ला",
    safetyChecklistTitle: "दैनिक सुरक्षा चेकलिस्ट",
    emergencySosTitle: "तातडीची SOS मदत",
    sosTriggerText: "मदतीसाठी SOS दाबा",
    docsUploadTitle: "कागदपत्र सुलभीकरण",
    docsUploadSub: "पगार पावती किंवा चलन सोप्या मराठीत समजून घ्या",
    grievanceTitle: "तक्रार व अपील मसुदा",
    grievanceSub: "आयडी ब्लॉक व चुकीच्या कपातीविरोधात अधिकृत पत्र तयार करा",
    copyDraftBtn: "📋 कॉपी करा",
    sendWhatsappBtn: "💬 व्हॉट्सॲपवर पाठवा",
    speechLangCode: "mr-IN"
  },
  kn: {
    appTitle: "ಗಿಗ್ ಸಾಥಿ AI",
    appSub: "ಗಿಗ್ ಮತ್ತು ದಿನಗೂಲಿ ಕಾರ್ಮಿಕರ AI ಸಹಾಯಕ",
    readPageBtn: "🔊 ಈ ಪುಟವನ್ನು ಆಲಿಸಿ",
    stopAudioBtn: "⏹ ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ",
    navEarnings: "ಗಳಿಕೆಯ ಲೆಕ್ಕಾಚಾರ",
    navSafety: "ಸುರಕ್ಷತಾ ಕ್ರಮಗಳು",
    navWelfare: "ಹಕ್ಕುಗಳು ಮತ್ತು ಯೋಜನೆಗಳು",
    navDocs: "ದಾಖಲೆಗಳ ಸಹಾಯ",
    navGrievance: "ದೂರು ಪತ್ರ ರಚನೆ",
    quotaLabel: "ಸಕ್ರಿಯ ಕಾರ್ಮಿಕರು: 10 / 10 ಗರಿಷ್ಠ",
    loginHeading: "ಕಾರ್ಮಿಕರ ಲಾಗಿನ್ ಪೋರ್ಟಲ್",
    loginSub: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು AI ಸಹಾಯ ಪಡೆಯಿರಿ",
    grossEarnings: "ಒಟ್ಟು ಗಳಿಕೆ",
    platformCuts: "ಕಡಿತಗಳು",
    netEarnings: "ನಿವ್ವಳ ಆದಾಯ",
    hourlyRate: "ಗಂಟೆಯ ದರ",
    aiAdviceTitle: "AI ಆರ್ಥಿಕ ಸಲಹೆಗಳು",
    safetyChecklistTitle: "ದೈನಂದಿನ ಸುರಕ್ಷತಾ ಪಟ್ಟಿ",
    emergencySosTitle: "ತುರ್ತು SOS ನೆರವು",
    sosTriggerText: "ಸಹಾಯಕ್ಕಾಗಿ SOS ಒತ್ತಿರಿ",
    docsUploadTitle: "ದಾಖಲೆ ವಿವರಣೆ",
    docsUploadSub: "ವೇತನ ಚೀಟಿ ಮತ್ತು ನೋಟಿಸ್‌ಗಳನ್ನು ಸರಳ ಕನ್ನಡದಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
    grievanceTitle: "ದೂರು ಡ್ರಾಫ್ಟರ್",
    grievanceSub: "ತಪ್ಪಾದ ಐಡಿ ಅಮಾನತು ವಿರುದ್ಧ ಅಧಿಕೃತ ಮೇಲ್ಮನವಿ ಸಿದ್ಧಪಡಿಸಿ",
    copyDraftBtn: "📋 ನಕಲಿಸಿ",
    sendWhatsappBtn: "💬 ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಕಳುಹಿಸಿ",
    speechLangCode: "kn-IN"
  },
  gu: {
    appTitle: "ગિગ સાથી AI",
    appSub: "ગિગ અને દૈનિક વેતન શ્રમિકોનો AI સાથી",
    readPageBtn: "🔊 આ પેજ સાંભળો",
    stopAudioBtn: "⏹ અવાજ બંધ કરો",
    navEarnings: "કમાણી હિસાબ",
    navSafety: "સુરક્ષા નિયમો",
    navWelfare: "હકો અને સરકારી યોજનાઓ",
    navDocs: "દસ્તાવેજ સહાય",
    navGrievance: "ફરિયાદ ડ્રાફ્ટિંગ",
    quotaLabel: "નોંધાયેલા કામદારો: 10 / 10 મહત્તમ",
    loginHeading: "શ્રમિક લૉગિન પોર્ટલ",
    loginSub: "તમારી પ્રોફાઇલ પસંદ કરો અને તમારો AI સહાયક મેળવો",
    grossEarnings: "કુલ કમાણી",
    platformCuts: "પ્લેટફોર્મ કપાત",
    netEarnings: "વાસ્તવિક ચોખ્ખી કમાણી",
    hourlyRate: "કલાક દીઠ દર",
    aiAdviceTitle: "AI નાણાકીય માર્ગદર્શન",
    safetyChecklistTitle: "દૈનિક સુરક્ષા યાદી",
    emergencySosTitle: "કટોકટી SOS સહાય",
    sosTriggerText: "મદદ માટે SOS દબાવો",
    docsUploadTitle: "દસ્તાવેજ સમજૂતી",
    docsUploadSub: "પે-સ્લિપ અથવા ચલણ સરળ ગુજરાતીમાં સમજો",
    grievanceTitle: "ફરિયાદ પત્ર તૈયાર કરો",
    grievanceSub: "ખોટા આઈડી બ્લોક અથવા કપાત સામે મજબૂત અરજી બનાવો",
    copyDraftBtn: "📋 કૉપિ કરો",
    sendWhatsappBtn: "💬 વ્હોટ્સએપ પર મોકલો",
    speechLangCode: "gu-IN"
  }
};
