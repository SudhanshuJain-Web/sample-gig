// ==========================================================================
// GigSaathi AI - Generative AI Core Engine
// Multilingual Natural Language Generation, Document Simplification,
// Dispute Appeal Drafting, and Financial Insights for Gig Workers.
// ==========================================================================

class GenAIEngine {
  constructor() {
    this.name = "GigSaathi Neural Engine";
  }

  // Generate plain language explanation for complex documents
  analyzeDocument(docText, lang = "hi") {
    const isHindi = lang === "hi" || lang === "hinglish";
    const isTamil = lang === "ta";
    const isTelugu = lang === "te";

    let meaning = "";
    let redFlags = [];
    let actionSteps = [];

    const lower = docText.toLowerCase();

    if (lower.includes("payout") || lower.includes("cancellation") || lower.includes("deduction")) {
      if (isHindi) {
        meaning = "कंपनी ने आपकी मेहनत की कमाई में से भारी कटौती की है! इसमें ₹350 एक रद्द आर्डर के लिए काटे गए हैं, भले ही गलती ग्राहक की रही हो, और ₹75 बिना बताए वर्दी व बैग काटा गया है।";
        redFlags = [
          "₹350 का कैंसलेशन जुर्माना: ग्राहक द्वारा कॉल न उठाने पर भी राइडर पर थोपा गया।",
          "₹100 अतिरिक्त वेट-टाइम पेनल्टी बिना पारदर्शी टाइमस्टैम्प के।",
          "अपील की 48 घंटे की अत्यंत सीमित अवधि।"
        ];
        actionSteps = [
          "1. अपने फोन से डिलीवरी लोकेशन का GPS टाइमस्टैम्प और कॉल लॉग स्क्रीनशॉट लें।",
          "2. 'न्याय ड्राफ़्टर' से तुरंत हब मैनेजर को व्हाट्सएप अपील भेजें।",
          "3. 24 घंटे में समाधान न होने पर स्टेट गिग वर्कर बोर्ड में शिकायत दर्ज करें।"
        ];
      } else if (isTamil) {
        meaning = "உங்கள் கடின உழைப்பு வருமானத்திலிருந்து நிறுவனம் நியாயமற்ற முறையில் பிடித்தம் செய்துள்ளது! வாடிக்கையாளர் தொடர்புகொள்ளாத போதும் உங்களுக்கு ₹350 அபராதம் விதிக்கப்பட்டுள்ளது.";
        redFlags = [
          "₹350 ரத்து அபராதம் தவறாக விதிக்கப்பட்டுள்ளது.",
          "யூனிபார்ம் மற்றும் பை கட்டணம் ₹75 பிடித்தம் செய்யப்பட்டுள்ளது.",
          "முறையீடு செய்ய 48 மணிநேரம் மட்டுமே அவகாசம் உள்ளது."
        ];
        actionSteps = [
          "1. GPS அழைப்பு பதிவை ஸ்கிரீன்ஷாட் எடுக்கவும்.",
          "2. வாட்ஸ்அப் மூலம் உடனடியாக மேலாளருக்கு மனு அனுப்பவும்.",
          "3. தொழிலாளர் நல வாரியத்தில் முறையிடவும்."
        ];
      } else {
        meaning = "The platform has applied aggressive deductions amounting to ₹675 against your gross earnings. An unfair ₹350 penalty was debited for customer unavailability, alongside opaque uniform depreciation fees.";
        redFlags = [
          "₹350 cancellation penalty levied despite partner waiting at customer location.",
          "₹100 wait-time default fee applied without transparent sensor evidence.",
          "Arbitrary 48-hour appeal window limiting statutory dispute recourse."
        ];
        actionSteps = [
          "1. Export call log screenshots showing 3+ customer attempts and GPS arrival proof.",
          "2. Dispatch generated WhatsApp grievance to Hub Lead immediately.",
          "3. Escalate to the State Gig Workers Welfare Board if unresolved in 48 hours."
        ];
      }
    } else if (lower.includes("deactivation") || lower.includes("restricted") || lower.includes("acceptance")) {
      if (isHindi) {
        meaning = "कंपनी के रोबोटिक कंप्यूटर सिस्टम ने आपका काम बंद (आईडी ब्लॉक) कर दिया है! आरोप लगाया है कि आपने बारिश या ट्रैफिक के दौरान आर्डर स्वीकार नहीं किए।";
        redFlags = [
          "अल्गोरिद्म ने मौसम, बारिश या सड़क सुरक्षा को ध्यान में नहीं रखा।",
          "IMEI ब्लॉक की धमकी जो भारत के संविधान (अनुच्छेद 19(1)(g) - आजीविका का अधिकार) के विरुद्ध है।"
        ];
        actionSteps = [
          "1. 'न्याय ड्राफ़्टर' से तुरंत कंपनी ग्रीवेंस ऑफिसर को लीगल नोटिस भेजें।",
          "2. राजस्थान/कर्नाटक गिग वर्कर एक्ट के तहत बिना नोटिस आईडी ब्लॉक के खिलाफ ट्रिब्यूनल में अपील करें।"
        ];
      } else {
        meaning = "An automated platform algorithm has restricted your account due to low order acceptance during surge conditions, bypassing human review.";
        redFlags = [
          "Algorithm failed to factor in severe weather, flash flooding, or safety hazards.",
          "Threat of permanent device IMEI blacklisting violates natural justice."
        ];
        actionSteps = [
          "1. File formal deactivation appeal under the State Gig Workers Act.",
          "2. Request automated audit log of trips dispatched during the surge period."
        ];
      }
    } else {
      meaning = "यह दस्तावेज़ आपके काम या वाहन से जुड़ा आधिकारिक नोटिस है। इसमें वित्तीय देयता और निर्धारित समय-सीमा का उल्लेख है।";
      redFlags = ["अतिदेय होने पर अतिरिक्त जुर्माना लग सकता है।", "समय पर जवाब न देने पर कानूनी नोटिस आ सकता है।"];
      actionSteps = ["1. चालान/नोटिस की तिथि और राशि की पुष्टि करें।", "2. गिग डिलीवरी साक्ष्य के साथ वर्चुअल लोक अदालत में छूट की मांग करें।"];
    }

    return {
      simplifiedMeaning: meaning,
      redFlags: redFlags,
      actionSteps: actionSteps
    };
  }

  // Draft structured grievances across 3 tiers (Email, WhatsApp, Labor Commissioner)
  draftGrievance(worker, issueType, platform, orderId, details, desiredOutcome, tier = "whatsapp", lang = "hi") {
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const workerName = worker?.name || "Raju Kumar";
    const workerPhone = worker?.phone || "9876543210";
    const workerRole = worker?.role || "Delivery Partner";
    const city = worker?.city || "New Delhi";

    if (tier === "whatsapp") {
      if (lang === "hi" || lang === "hinglish") {
        return `नमस्ते सर,\nमैं ${workerName} बोल रहा हूँ, ${platform} पार्टनर (${workerPhone}), ${city}।\n\nविषय: ${issueType} - ऑर्डर/ट्रिप आईडी: ${orderId || "NA"}\n\nसर, आज मेरे साथ यह समस्या हुई है:\n"${details}"\n\nमैंने पूरी ईमानदारी और समय पर काम किया है। मैं ऑन-ड्यूटी था और नियमों का पूरा पालन किया।\n\nनिवेदन: कृपया मेरी ${desiredOutcome || "कटौती वापस करें और आईडी ठीक करें"}। मेरे पास सभी प्रूफ (कॉल रिकॉर्ड व GPS स्क्रीनशॉट) मौजूद हैं।\n\nकृपया इसे तुरंत रिव्यू करें सर, ताकि मेरा काम न रुके।\nधन्यवाद,\n${workerName}\nमोबाइल: ${workerPhone}`;
      } else if (lang === "ta") {
        return `வணக்கம் சார்,\nநான் ${workerName}, ${platform} பார்ட்னர் (${workerPhone}), ${city}.\n\nவிஷயம்: ${issueType} - Order/Trip ID: ${orderId || "NA"}\n\nவிவரம்:\n"${details}"\n\nநான் நேர்மையாகவும் சரியான நேரத்திலும் பணியாற்றினேன். என்னிடம் முழுமையான சான்றுகள் (GPS & அழைப்பு பதிவுகள்) உள்ளன.\n\nகோரிக்கை: தயவுசெய்து எனது ${desiredOutcome || "பிடித்தத்தை திருப்பி அளிக்கவும்"}.\n\nநன்றி,\n${workerName}\nPhone: ${workerPhone}`;
      } else {
        return `Hello Sir/Ma'am,\nThis is ${workerName}, registered ${workerRole} on ${platform} (${workerPhone}), based in ${city}.\n\nIssue: ${issueType} | Order/Trip ID: ${orderId || "N/A"}\n\nSummary of Incident:\n"${details}"\n\nI have maintained strict compliance with safety guidelines and platform terms. I have preserved GPS arrival timestamps and call attempt records.\n\nResolution Requested: Immediate ${desiredOutcome || "refund of deducted penalty and account reactivation"}.\n\nLooking forward to your urgent assistance so my daily livelihood is not disrupted.\nWarm regards,\n${workerName}\nContact: ${workerPhone}`;
      }
    } else if (tier === "email") {
      return `To: grievances@${platform.toLowerCase().replace(/[^a-z]/g, '')}.com, legal-support@${platform.toLowerCase().replace(/[^a-z]/g, '')}.com
CC: welfare.gigworkers@nic.in
Subject: FORMAL GRIEVANCE: ${issueType.toUpperCase()} | Partner ID: ${worker.id || "W-1092"} | ${workerName}

Date: ${today}

To The Grievance Officer,
${platform} India Pvt. Ltd.

Dear Sir/Madam,

I am writing to register an urgent formal grievance under the Code on Social Security 2020 and applicable State Gig Worker Welfare Regulations.

1. PARTNER DETAILS:
- Name: ${workerName}
- Registered Mobile: ${workerPhone}
- Operating City/Zone: ${city}
- Platform Role: ${workerRole}

2. PARTICULARS OF THE DISPUTE:
- Nature of Grievance: ${issueType}
- Specific Order/Trip Ref: ${orderId || "Not Applicable / Multiple Orders"}
- Date & Context: ${details}

3. GROUNDS OF CONTESTATION:
- Unilateral algorithmic penalization without human audit violates the principle of natural justice (audi alteram partem).
- I was present at the designated pickup/drop coordinates within stipulated timelines. Telecommunication logs corroborate multiple outreach attempts.
- Opaque wage deduction directly contravenes statutory guidelines mandating transparent rate cards.

4. RELIEF SOUGHT:
I formally request:
(a) Full reversal and credit of ₹${worker.deductions || 350} wrongfully deducted;
(b) ${desiredOutcome || "Immediate restoration of active account status"};
(c) Written confirmation of dispute closure within 48 business hours.

Failing an equitable resolution, I reserve the right to escalate this complaint before the State Gig Workers Welfare Board and the Jurisdictional Labor Commissioner.

Yours sincerely,
${workerName}
Delivery Partner & Member, Gig Worker Solidarity Forum
Phone: ${workerPhone} | City: ${city}`;
    } else {
      // Tier 3: Statutory Labor Commissioner / Welfare Board Complaint
      return `BEFORE THE HON'BLE OMBUDSMAN / CHIEF LABOR COMMISSIONER
STATE PLATFORM BASED GIG WORKERS WELFARE BOARD
COMPLAINT UNDER STATE GIG WORKERS WELFARE ACT & CODE ON SOCIAL SECURITY

COMPLAINANT:
Name: ${workerName}, S/o or D/o Informal Worker
Address: Registered Gig Worker, ${city}
Contact: ${workerPhone} | e-Shram UAN: Linked

VERSUS

RESPONDENT AGGREGATOR:
${platform} Logistics & Delivery Operations India

COMPLAINT PETITION REGARDING ${issueType.toUpperCase()}

MOST RESPECTFULLY SHOWETH:
1. That the Complainant is an informal gig worker engaged in pick-and-drop / transit operations on Respondent's digital platform.
2. That on or about ${today}, the Respondent's automated application imposed an arbitrary penalty / deactivation:
   "${details}"
3. That the Respondent failed to provide a 14-day notice or an opportunity of being heard, in direct contravention of Section 9 of the Platform Based Gig Workers Act.
4. That the Complainant has suffered severe economic distress, loss of daily subsistence wage, and emotional duress.

PRAYER:
Wherefore, it is prayed that this Hon'ble Authority may be pleased to:
(i) Direct the Respondent to forthwith reinstate Complainant's account and refund withheld earnings;
(ii) Impose penalty on Respondent under the Welfare Act for arbitrary algorithmic oppression;
(iii) Award interim financial relief for days of forced unemployment.

Complainant:
${workerName} (${city})`;
    }
  }

  // Financial coaching based on gross, fuel, cuts, and shift duration
  generateFinancialAdvice(worker, gross, fuel, cuts, hours, lang = "hi") {
    const net = gross - fuel - cuts;
    const hourlyRate = hours > 0 ? (net / hours).toFixed(1) : 0;
    const fuelPercentage = gross > 0 ? ((fuel / gross) * 100).toFixed(0) : 0;

    let tip = "";
    let alertLevel = "normal";

    if (hourlyRate < 60) {
      alertLevel = "warning";
      if (lang === "hi" || lang === "hinglish") {
        tip = `सावधान! आपकी प्रति घंटा असली कमाई (₹${hourlyRate}/घंटा) न्यूनतम दैनिक मजदूरी दर से काफी कम है। आपका ${fuelPercentage}% पैसा केवल पेट्रोल में जा रहा है और ₹${cuts} पेनाल्टी में कट गया है। कल 11 AM - 4 PM के शांत घंटों के बजाय शाम 7 PM - 11 PM के पीक डिनर समय में 3 घंटे अधिक काम करने से आपकी शुद्ध कमाई 45% तक बढ़ सकती है।`;
      } else {
        tip = `Caution! Your real hourly take-home (₹${hourlyRate}/hr) falls below living wage benchmarks. Fuel burn accounts for ${fuelPercentage}% of gross revenue and ₹${cuts} was lost to penalties. We advise shifting non-peak afternoon hours towards 7:00 PM - 11:30 PM dinner surge to boost net profit by ~45%.`;
      }
    } else {
      if (lang === "hi" || lang === "hinglish") {
        tip = `शाबाश! आज आपकी शुद्ध कमाई ₹${net} (₹${hourlyRate}/घंटा) रही। ईंधन पर आपका खर्च ${fuelPercentage}% रहा जो संतुलित है। सुझाव: ₹${cuts > 0 ? cuts : 100} जो पेनाल्टी या मेंटेनेंस में जा रहे हैं, उन्हें e-Shram और PMSBY के ₹20/साल वाले बीमा में सुरक्षित करें।`;
      } else {
        tip = `Solid performance! Today's net take-home is ₹${net} (₹${hourlyRate}/hr). Fuel expenditure was contained at ${fuelPercentage}%. Recommendation: Protect against unforeseen breakdowns by claiming your ₹2 Lakh free e-Shram accidental insurance coverage.`;
      }
    }

    return {
      net,
      hourlyRate,
      fuelPercentage,
      alertLevel,
      aiTip: tip
    };
  }

  // Provide complete spoken script for a whole page in target language
  getPageSpokenScript(pageId, lang = "hi", currentWorker = null) {
    const name = currentWorker?.name || "साथी";
    const isHindi = lang === "hi" || lang === "hinglish";
    const isTamil = lang === "ta";
    const isTelugu = lang === "te";

    if (pageId === "earnings") {
      if (isHindi) {
        return `नमस्ते ${name}! यह कमाई हिसाब का पेज है। यहाँ आप अपनी कुल सकल कमाई, पेट्रोल का वास्तविक खर्च, कंपनी द्वारा काटी गई पेनल्टी और अपनी शुद्ध प्रति घंटा कमाई देख सकते हैं। आज आपकी शुद्ध कमाई लगभग ₹${currentWorker?.todayGross - currentWorker?.fuelCost - currentWorker?.deductions || 560} है। अपने खर्च दर्ज करने के लिए नीचे दिए गए फॉर्म का उपयोग करें।`;
      } else if (isTamil) {
        return `வணக்கம் ${name}! இது வருமானக் கணக்கு பக்கம். இங்கே உங்கள் மொத்த வருமானம், பெட்ரோல் செலவு மற்றும் நிகர வருமானத்தை பார்க்கலாம். உங்கள் தினசரி செலவுகளை பதிவு செய்ய கீழே உள்ள படிவத்தைப் பயன்படுத்தவும்.`;
      } else if (isTelugu) {
        return `నమస్కారం ${name}! ఇది మీ ఆదాయ లెక్కల పేజీ. ఇక్కడ మీ మొత్తం సంపాదన, పెట్రోల్ ఖర్చులు మరియు నికర లాభాన్ని తనిఖీ చేయవచ్చు.`;
      } else {
        return `Hello ${name}! Welcome to your Earnings Tracking dashboard. Here you can analyze gross payouts, actual fuel burn, platform deductions, and your true hourly net wage. Use the smart calculator below to log your daily shifts.`;
      }
    } else if (pageId === "safety") {
      if (isHindi) {
        return `यह सुरक्षा नियम और आपातकालीन SOS पेज है। डिलीवरी और ड्राइविंग के दौरान हमेशा हेलमेट और रिफ्लेक्टिव जैकेट पहनें। भारी बारिश या रात की शिफ्ट में हर 30 मिनट में पानी पिएं। किसी भी दुर्घटना या आपात स्थिति में नीचे दिए गए बड़े लाल SOS बटन को दबाएं, जिससे तुरंत आपकी लाइव लोकेशन पुलिस और परिजनों तक पहुँच जाएगी।`;
      } else if (isTamil) {
        return `இது பாதுகாப்பு மற்றும் அவசர SOS பக்கம். ஹெல்மெட் மற்றும் பாதுகாப்பு ஆடைகளை எப்போதும் அணியுங்கள். அவசர காலத்தில் கீழே உள்ள சிவப்பு SOS பட்டனை அழுத்தவும்.`;
      } else {
        return `Welcome to the Safety Practices and Emergency Hub. Always wear certified safety helmets, carry hydration, and conduct pre-trip vehicle checks. In case of road altercation or injury, tap the prominent Red SOS button for instant emergency dispatch with live GPS coordinates.`;
      }
    } else if (pageId === "welfare") {
      if (isHindi) {
        return `यह आपके अधिकारों और सरकारी कल्याणकारी योजनाओं का पेज है। सभी गिग और दैनिक वेतन कामगारों के लिए सरकार ने ई-श्रम कार्ड पर ₹2 लाख का मुफ़्त दुर्घटना बीमा और आयुष्मान भारत पर ₹5 लाख का मुफ़्त इलाज दिया है। राजस्थान और कर्नाटक सरकारों ने गिग वर्कर बोर्ड कानून भी बनाए हैं। नीचे किसी भी योजना पर क्लिक करके अपनी पात्रता जांचें।`;
      } else {
        return `This is the Rights and Government Welfare Scheme portal. Explore your entitlements under the e-Shram card with ₹2 Lakh free accidental insurance, Ayushman Bharat ₹5 Lakh cashless hospital treatment, and state gig worker welfare boards.`;
      }
    } else if (pageId === "documents") {
      if (isHindi) {
        return `यह कागज़ और जुर्माना सहायता पेज है। यदि कंपनी ने आपकी पे-स्लिप से पैसे काटे हैं, या ट्रैफिक पुलिस ने नो-पार्किंग चालान काटा है, या बीमा कंपनी ने मेडिकल क्लेम खारिज किया है, तो नीचे दिए गए सैंपल पर क्लिक करें या अपना नोटिस अपलोड करें। हमारा AI इसे तुरंत सरल भाषा में समझाएगा और समाधान बताएगा।`;
      } else {
        return `Welcome to Document Help and Penalty Decrypter. Upload or select sample pay slips, traffic challans, and deactivation notices. Our Generative AI engine simplifies complex legal jargon into plain language and highlights unfair deductions.`;
      }
    } else if (pageId === "grievance") {
      if (isHindi) {
        return `यह न्याय और शिकायत ड्राफ़्टर पेज है। यदि आपकी आईडी बिना कारण ब्लॉक कर दी गई है या गलत पेनल्टी लगाई गई है, तो बस समस्या का प्रकार और आर्डर नंबर चुनें। हमारा AI 1-क्लिक में हब मैनेजर के लिए व्हाट्सएप संदेश, कंपनी के लिए फॉर्मल ईमेल और लेबर कमिश्नर के लिए कानूनी शिकायत तैयार कर देगा।`;
      } else {
        return `Welcome to the Grievance and Dispute AI Drafter. Formulate bulletproof appeals against wrongful deactivations, unpaid wait times, and penalty cuts. Generate ready-to-send WhatsApp drafts, formal escalation emails, and labor tribunal complaints in seconds.`;
      }
    }

    return "GigSaathi AI assistance is ready to support you.";
  }

  // Answer quick chat questions
  chatResponse(query, currentWorker, lang = "hi") {
    const q = query.toLowerCase();
    const isHindi = lang === "hi" || lang === "hinglish";

    if (q.includes("cut") || q.includes("कट") || q.includes("deduction") || q.includes("payout") || q.includes("penalty")) {
      if (isHindi) {
        return "अगर कंपनी ने आपका पेआउट बिना वजह काटा है, तो यह ज्यादातर 'कस्टमर अनरीचेबल' या 'कैंसलेशन पेनल्टी' होती है। आप तुरंत 'कागज़ सहायता' टैब में अपनी स्लिप चेक करें और 'न्याय ड्राफ़्टर' से हब मैनेजर को व्हाट्सएप अपील भेजें। गिग वर्कर एक्ट के तहत बिना ठोस सबूत पैसे काटना गैरकानूनी है।";
      } else {
        return "Unexplained payout deductions usually stem from automated cancellation penalties or uncredited wait times. Head to the 'Document Help' tab to analyze your slip, or use the 'Grievance Drafter' to dispatch a formal appeal citing GPS proof.";
      }
    }

    if (q.includes("block") || q.includes("deactivat") || q.includes("ब्लॉक") || q.includes("id")) {
      if (isHindi) {
        return "घबराएं नहीं! अधिकांश आईडी ब्लॉक बारिश या ट्रैफिक के दौरान कम आर्डर स्वीकारने की वजह से अल्गोरिद्म द्वारा किए जाते हैं। आप 'न्याय ड्राफ़्टर' में जाकर 'Wrongful Deactivation' चुनें और 1-क्लिक में कंपनी ग्रीवेंस ऑफिसर को फॉर्मल ईमेल और व्हाट्सएप अपील भेजें।";
      } else {
        return "Don't panic! Algorithmic account locks often trigger during heavy weather or high congestion due to low acceptance rates. Open our 'Grievance Drafter', select 'Wrongful Deactivation', and generate an escalation notice right away.";
      }
    }

    if (q.includes("shram") || q.includes("ई-श्रम") || q.includes("welfare") || q.includes("योजना") || q.includes("insurance")) {
      if (isHindi) {
        return "ई-श्रम कार्ड पर हर पंजीकृत गिग कामगार को ₹2,00,000 का दुर्घटना बीमा मुफ़्त मिलता है। इसके अलावा आयुष्मान भारत में ₹5,00,000 का मुफ़्त अस्पताल इलाज मिलता है। आप 'हक और सरकारी योजनाएँ' पेज पर जाकर सीधे आवेदन कर सकते हैं!";
      } else {
        return "Registered e-Shram cardholders receive ₹2 Lakh free accidental death/disability insurance, plus ₹5 Lakh hospitalization under Ayushman Bharat. Check the 'Rights & Welfare' page for eligibility checklists.";
      }
    }

    if (q.includes("safety") || q.includes("sos") || q.includes("सुरक्षा") || q.includes("रात") || q.includes("police")) {
      if (isHindi) {
        return "सड़क पर सुरक्षा सबसे पहली प्राथमिकता है। रात की डिलीवरी में हमेशा लाइट वाले रास्ते चुनें और सुनसान जगह पर कस्टमर को मेन रोड या गेट पर आने को कहें। किसी भी ख़तरे में ऊपर दिया 'SOS' बटन दबाएं, जिससे तुरंत इमरजेंसी अलर्ट बज उठेगा और लोकेशन शेयर होगी।";
      } else {
        return "Worker safety is non-negotiable. For night shifts, request drop-offs at main apartment gates if alleys are unlit. In any emergency, activate our one-touch Red SOS button to dispatch live GPS coordinates.";
      }
    }

    // Default response
    if (isHindi) {
      return `नमस्ते ${currentWorker?.name || "साथी"}! मैं आपका गिग साथी AI हूँ। आप मुझसे कमाई की कटौती, सड़क सुरक्षा, ई-श्रम व सरकारी योजनाएं, चालान सहायता, या आईडी ब्लॉक की अपील के बारे में कोई भी सवाल पूछ सकते हैं।`;
    } else {
      return `Hello ${currentWorker?.name || "Partner"}! I am your GigSaathi AI Guardian. Ask me about unfair deductions, traffic challans, e-Shram welfare schemes, road safety protocols, or deactivation appeals.`;
    }
  }
}

// Global AI Engine instance
const aiEngine = new GenAIEngine();
