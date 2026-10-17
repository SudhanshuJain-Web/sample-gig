// ==========================================================================
// GigSaathi AI - Main Application Controller
// Handles login (max 10 workers), routing across 5 single pages,
// multilingual translation, audio page reading, and GenAI features.
// ==========================================================================

class GigSaathiApp {
  constructor() {
    this.currentWorker = WORKERS_LIST[0]; // Default Raju Kumar
    this.currentLang = "hi";
    this.currentPage = "earnings";
    this.selectedDoc = SAMPLE_DOCS[0];
    this.currentGrievanceTier = "whatsapp";

    this.init();
  }

  init() {
    this.setupAuth();
    this.setupNavigation();
    this.setupSpeechListeners();
    this.setupLanguageSelector();
    this.setupEarningsPage();
    this.setupSafetyPage();
    this.setupWelfarePage();
    this.setupDocumentHelpPage();
    this.setupGrievancePage();
    this.setupGenAIDrawer();

    // Render initial page & language
    this.switchLanguage(this.currentWorker.lang || "hi");
    this.navigateTo("earnings");
    this.renderWorkerProfile();
  }

  // --- AUTHENTICATION & MAX 10 USERS ENFORCEMENT ---
  setupAuth() {
    const authOverlay = document.getElementById("authOverlay");
    const quickUsersGrid = document.getElementById("quickUsersGrid");
    const customLoginForm = document.getElementById("customLoginForm");
    const profileBadge = document.getElementById("userProfileBadge");
    const logoutBtn = document.getElementById("logoutBtn");

    // Populate the 10 pre-registered gig and informal workers
    quickUsersGrid.innerHTML = "";
    WORKERS_LIST.slice(0, MAX_WORKERS_ALLOWED).forEach((worker, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "user-quick-btn";
      btn.dataset.workerId = worker.id;
      btn.innerHTML = `
        <div class="user-quick-avatar">${worker.avatar}</div>
        <div class="user-quick-info">
          <h5>${worker.name}</h5>
          <p>${worker.role}</p>
        </div>
      `;
      btn.addEventListener("click", () => {
        this.loginAsWorker(worker);
      });
      quickUsersGrid.appendChild(btn);
    });

    // Custom phone login with strict limit check
    customLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const phoneInput = document.getElementById("loginPhone").value.trim();
      const nameInput = document.getElementById("loginName").value.trim();
      const roleSelect = document.getElementById("loginRole").value;

      // Check if phone matches one of the 10 existing workers
      const found = WORKERS_LIST.find(w => w.phone === phoneInput);
      if (found) {
        this.loginAsWorker(found);
      } else {
        // Enforce maximum 10 workers limit
        if (WORKERS_LIST.length >= MAX_WORKERS_ALLOWED) {
          alert(`Worker registration quota reached! Maximum ${MAX_WORKERS_ALLOWED} workers allowed. Please select one of the 10 registered worker profiles.`);
          return;
        }

        const newWorker = {
          id: `worker-${WORKERS_LIST.length + 1}`,
          name: nameInput || "Gig Worker",
          phone: phoneInput || "9876543220",
          role: roleSelect,
          platform: "Multi-Platform",
          vehicle: "2-Wheeler",
          city: "New Delhi",
          avatar: "🛵",
          lang: this.currentLang,
          todayGross: 900,
          fuelCost: 200,
          deductions: 50,
          hoursWorked: 8,
          activeDisputes: 0
        };
        WORKERS_LIST.push(newWorker);
        this.loginAsWorker(newWorker);
      }
    });

    profileBadge.addEventListener("click", () => {
      authOverlay.classList.remove("hidden");
    });

    logoutBtn.addEventListener("click", () => {
      authOverlay.classList.remove("hidden");
    });
  }

  loginAsWorker(worker) {
    this.currentWorker = worker;
    this.currentLang = worker.lang || this.currentLang;
    document.getElementById("authOverlay").classList.add("hidden");
    this.renderWorkerProfile();
    this.switchLanguage(this.currentLang);
    this.showToast(`Logged in as ${worker.name} (${worker.role})`);
    voiceEngine.playAudioCue("chime");
  }

  renderWorkerProfile() {
    const badgeAvatar = document.getElementById("badgeAvatar");
    const badgeName = document.getElementById("badgeName");
    const badgeRole = document.getElementById("badgeRole");

    if (badgeAvatar) badgeAvatar.textContent = this.currentWorker.avatar;
    if (badgeName) badgeName.textContent = this.currentWorker.name;
    if (badgeRole) badgeRole.textContent = `${this.currentWorker.role} • ${this.currentWorker.city}`;

    // Update form defaults in grievance page
    const gWorkerName = document.getElementById("grievanceWorkerName");
    const gWorkerPhone = document.getElementById("grievanceWorkerPhone");
    if (gWorkerName) gWorkerName.value = this.currentWorker.name;
    if (gWorkerPhone) gWorkerPhone.value = this.currentWorker.phone;
  }

  // --- ROUTING: 5 DEDICATED TOPIC PAGES ---
  setupNavigation() {
    const tabs = document.querySelectorAll(".topic-tab-btn");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const targetPage = tab.dataset.page;
        this.navigateTo(targetPage);
      });
    });
  }

  navigateTo(pageId) {
    this.currentPage = pageId;

    // Update tab bar UI
    document.querySelectorAll(".topic-tab-btn").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.page === pageId);
    });

    // Update single page visibility
    document.querySelectorAll(".page-view").forEach(page => {
      page.style.display = page.id === `page-${pageId}` ? "block" : "none";
    });

    // Stop previous voice reading if navigating
    voiceEngine.stop();
  }

  // --- MULTILINGUAL TRANSLATION ENGINE ---
  setupLanguageSelector() {
    const langPicker = document.getElementById("globalLangPicker");
    langPicker.value = this.currentLang;

    langPicker.addEventListener("change", (e) => {
      const newLang = e.target.value;
      this.switchLanguage(newLang);
    });
  }

  switchLanguage(langCode) {
    this.currentLang = langCode;
    const langSelect = document.getElementById("globalLangPicker");
    if (langSelect) langSelect.value = langCode;

    const dict = TRANSLATIONS[langCode] || TRANSLATIONS.en;

    // Translate global UI elements
    document.querySelectorAll("[data-i18n]").forEach(elem => {
      const key = elem.dataset.i18n;
      if (dict[key]) {
        elem.textContent = dict[key];
      }
    });

    // Re-render current page specific AI content in chosen language
    if (this.currentPage === "earnings") {
      this.calculateAndRenderEarnings();
    } else if (this.currentPage === "documents") {
      this.renderDocumentAnalysis(this.selectedDoc);
    } else if (this.currentPage === "grievance") {
      this.generateCurrentGrievanceDraft();
    }

    this.showToast(`Language translated to: ${this.getLangDisplayName(langCode)}`);
  }

  getLangDisplayName(code) {
    const names = {
      en: "English",
      hi: "हिन्दी (Hindi)",
      hinglish: "Hinglish",
      ta: "தமிழ் (Tamil)",
      te: "తెలుగు (Telugu)",
      bn: "বাংলা (Bengali)",
      mr: "मराठी (Marathi)",
      kn: "ಕನ್ನಡ (Kannada)",
      gu: "ગુજરાતી (Gujarati)"
    };
    return names[code] || code;
  }

  // --- AUDIO READ FEATURE (LISTEN TO PAGE IN DIFFERENT LANGUAGES) ---
  setupSpeechListeners() {
    const globalReadBtn = document.getElementById("globalReadPageBtn");
    const stopAudioBtn = document.getElementById("stopAudioBannerBtn");
    const banner = document.getElementById("speechPlaybackBanner");
    const bannerText = document.getElementById("speechBannerText");

    // Connect voice engine status callbacks
    voiceEngine.registerStateListener((speaking, textSnippet) => {
      if (speaking) {
        banner.classList.add("active");
        globalReadBtn.classList.add("speaking");
        globalReadBtn.innerHTML = `⏹ Stop Listening`;
        if (bannerText) bannerText.textContent = `Reading in ${this.getLangDisplayName(this.currentLang)}: ${textSnippet}`;
      } else {
        banner.classList.remove("active");
        globalReadBtn.classList.remove("speaking");
        const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
        globalReadBtn.innerHTML = `🔊 ${dict.readPageBtn}`;
      }
    });

    // Global "🔊 Listen to Page" button click handler
    globalReadBtn.addEventListener("click", () => {
      if (voiceEngine.isSpeaking) {
        voiceEngine.stop();
      } else {
        this.readCurrentPageAloud();
      }
    });

    stopAudioBtn.addEventListener("click", () => {
      voiceEngine.stop();
    });

    // Individual section read buttons
    document.querySelectorAll(".btn-read-section").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.readTarget;
        const targetElem = document.getElementById(targetId);
        if (targetElem) {
          const textToSpeak = targetElem.innerText || targetElem.textContent;
          const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
          voiceEngine.speak(textToSpeak, dict.speechLangCode || "hi-IN");
        }
      });
    });
  }

  readCurrentPageAloud() {
    // Generates a tailored, natural multilingual spoken script for the page
    const script = aiEngine.getPageSpokenScript(this.currentPage, this.currentLang, this.currentWorker);
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
    voiceEngine.speak(script, dict.speechLangCode || "hi-IN");
  }

  // --- PAGE 1: EARNINGS TRACKING ---
  setupEarningsPage() {
    const calcForm = document.getElementById("earningsCalcForm");
    calcForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.calculateAndRenderEarnings();
      this.showToast("Earnings updated & AI financial insights refreshed!");
    });

    this.calculateAndRenderEarnings();
  }

  calculateAndRenderEarnings() {
    const grossIn = parseFloat(document.getElementById("calcGross").value) || this.currentWorker.todayGross || 980;
    const fuelIn = parseFloat(document.getElementById("calcFuel").value) || this.currentWorker.fuelCost || 280;
    const cutsIn = parseFloat(document.getElementById("calcDeductions").value) || this.currentWorker.deductions || 140;
    const hoursIn = parseFloat(document.getElementById("calcHours").value) || this.currentWorker.hoursWorked || 8.5;

    const analysis = aiEngine.generateFinancialAdvice(this.currentWorker, grossIn, fuelIn, cutsIn, hoursIn, this.currentLang);

    // Update KPI Numbers
    document.getElementById("kpiGrossVal").textContent = `₹${grossIn}`;
    document.getElementById("kpiDeductionsVal").textContent = `-₹${cutsIn}`;
    document.getElementById("kpiNetVal").textContent = `₹${analysis.net}`;
    document.getElementById("kpiHourlyVal").textContent = `₹${analysis.hourlyRate}/hr`;

    // Update AI Coach Tip
    const aiTipElem = document.getElementById("earningsAiCoachTip");
    if (aiTipElem) {
      aiTipElem.textContent = analysis.aiTip;
    }
  }

  // --- PAGE 2: SAFETY PRACTICES & SOS ---
  setupSafetyPage() {
    const sosBtn = document.getElementById("bigSosTrigger");
    const sosStatusText = document.getElementById("sosStatusText");
    let sosActive = false;

    sosBtn.addEventListener("click", () => {
      sosActive = !sosActive;
      if (sosActive) {
        sosBtn.classList.add("active-siren");
        voiceEngine.playAudioCue("sos");
        sosStatusText.innerHTML = `🚨 <strong style="color:#ef4444">EMERGENCY SOS BROADCASTED!</strong> Alert siren sounding & GPS coordinates sent via WhatsApp!`;

        // Generate emergency WhatsApp link with live coordinates
        const locationText = `EMERGENCY ALERT: I am ${this.currentWorker.name} (${this.currentWorker.phone}), ${this.currentWorker.role}. I need urgent assistance at GPS: 28.5355° N, 77.3910° E (Near Sector 62 Hub). Please alert nearest emergency response!`;
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(locationText)}`, "_blank");
      } else {
        sosBtn.classList.remove("active-siren");
        sosStatusText.textContent = "Tap SOS in emergency to activate siren and dispatch GPS coordinates.";
      }
    });

    // Checkbox sound effects
    document.querySelectorAll(".safety-check-item input").forEach(chk => {
      chk.addEventListener("change", () => {
        voiceEngine.playAudioCue("chime");
      });
    });
  }

  // --- PAGE 3: RIGHTS & WELFARE SCHEMES ---
  setupWelfarePage() {
    const schemesGrid = document.getElementById("schemesGrid");
    schemesGrid.innerHTML = "";

    WELFARE_SCHEMES.forEach(scheme => {
      const card = document.createElement("div");
      card.className = "scheme-item-card";
      card.innerHTML = `
        <div>
          <div class="scheme-card-top">
            <h4>${scheme.name}</h4>
            <span class="scheme-badge-cov">${scheme.benefit}</span>
          </div>
          <p>${scheme.description}</p>
          <ul class="scheme-checklist">
            <li><svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> <strong>पात्रता:</strong> ${scheme.eligibility}</li>
            <li><svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> <strong>ज़रूरी दस्तावेज़:</strong> ${scheme.docsRequired.join(", ")}</li>
          </ul>
        </div>
        <button class="btn-scheme-action" data-url="${scheme.officialUrl}">
          <span>🔗 आधिकारिक पोर्टल पर आवेदन करें</span>
        </button>
      `;

      card.querySelector(".btn-scheme-action").addEventListener("click", () => {
        window.open(scheme.officialUrl, "_blank");
      });

      schemesGrid.appendChild(card);
    });
  }

  // --- PAGE 4: DOCUMENT HELP & OCR ---
  setupDocumentHelpPage() {
    const docChips = document.querySelectorAll(".doc-sample-chip");
    const dropzone = document.getElementById("docDropzone");
    const fileInput = document.getElementById("docFileInput");

    docChips.forEach(chip => {
      chip.addEventListener("click", () => {
        docChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        const docId = chip.dataset.docId;
        const found = SAMPLE_DOCS.find(d => d.id === docId);
        if (found) {
          this.selectedDoc = found;
          this.renderDocumentAnalysis(found);
        }
      });
    });

    dropzone.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        this.showToast(`Uploaded document: ${file.name}`);
        // Create dynamic doc
        const customDoc = {
          id: "custom-upload",
          title: file.name,
          category: "Uploaded Receipt",
          platform: "Delivery App",
          rawText: `SCANNED RECEIPT: ${file.name}\nOrder Ref #992182\nAuto Cancellation Fee: ₹250.00\nPlatform Service Fee: ₹85.00\nNet Disbursed: ₹420.00`,
          simpleExplanation: "अपलोड किए गए दस्तावेज़ से पता चलता है कि ₹250 की कैंसलेशन फीस काटी गई है।",
          redFlags: ["₹250 की कटौती का कारण स्पष्ट नहीं किया गया है।"],
          recommendedAction: "'न्याय ड्राफ़्टर' से अपील तैयार करें।"
        };
        this.selectedDoc = customDoc;
        this.renderDocumentAnalysis(customDoc);
      }
    });

    this.renderDocumentAnalysis(this.selectedDoc);
  }

  renderDocumentAnalysis(doc) {
    const rawSnippet = document.getElementById("rawDocSnippet");
    const simpleBox = document.getElementById("docSimpleMeaning");
    const redFlagsList = document.getElementById("docRedFlagsList");
    const actionPlan = document.getElementById("docActionPlan");

    if (rawSnippet) rawSnippet.textContent = doc.rawText;

    const analysis = aiEngine.analyzeDocument(doc.rawText, this.currentLang);

    if (simpleBox) simpleBox.textContent = analysis.simplifiedMeaning;

    if (redFlagsList) {
      redFlagsList.innerHTML = "";
      analysis.redFlags.forEach(flag => {
        const li = document.createElement("li");
        li.style.cssText = "margin-bottom:0.35rem; display:flex; gap:0.4rem; color:#fca5a5;";
        li.innerHTML = `⚠️ <span>${flag}</span>`;
        redFlagsList.appendChild(li);
      });
    }

    if (actionPlan) {
      actionPlan.innerHTML = "";
      analysis.actionSteps.forEach(step => {
        const p = document.createElement("p");
        p.style.cssText = "margin-bottom:0.35rem; color:#cbd5e1;";
        p.textContent = step;
        actionPlan.appendChild(p);
      });
    }
  }

  // --- PAGE 5: GRIEVANCE & DISPUTE DRAFTING ---
  setupGrievancePage() {
    const form = document.getElementById("grievanceForm");
    const tierBtns = document.querySelectorAll(".tier-btn");
    const copyBtn = document.getElementById("copyDraftBtn");
    const whatsappBtn = document.getElementById("whatsappDraftBtn");

    tierBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tierBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentGrievanceTier = btn.dataset.tier;
        this.generateCurrentGrievanceDraft();
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.generateCurrentGrievanceDraft();
      this.showToast("Grievance appeal draft generated!");
      voiceEngine.playAudioCue("chime");
    });

    copyBtn.addEventListener("click", () => {
      const draftText = document.getElementById("grievanceDraftArea").innerText;
      navigator.clipboard.writeText(draftText);
      this.showToast("Draft copied to clipboard!");
    });

    whatsappBtn.addEventListener("click", () => {
      const draftText = document.getElementById("grievanceDraftArea").innerText;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(draftText)}`, "_blank");
    });

    this.generateCurrentGrievanceDraft();
  }

  generateCurrentGrievanceDraft() {
    const issueType = document.getElementById("grievanceIssueType")?.value || "Unfair Cancellation Penalty";
    const platform = document.getElementById("grievancePlatform")?.value || "Zomato / Swiggy";
    const orderId = document.getElementById("grievanceOrderId")?.value || "ZO-8991201";
    const details = document.getElementById("grievanceDetails")?.value || "Order canceled while I was waiting outside customer gate. Customer did not pick calls.";
    const desiredOutcome = document.getElementById("grievanceResolution")?.value || "Full refund of ₹350 penalty and score reset";

    const draft = aiEngine.draftGrievance(
      this.currentWorker,
      issueType,
      platform,
      orderId,
      details,
      desiredOutcome,
      this.currentGrievanceTier,
      this.currentLang
    );

    const draftBox = document.getElementById("grievanceDraftArea");
    if (draftBox) {
      draftBox.textContent = draft;
    }
  }

  // --- GENAI FLOATING COPILOT DRAWER ---
  setupGenAIDrawer() {
    const toggleBtn = document.getElementById("genaiDockBtn");
    const drawer = document.getElementById("genaiDrawer");
    const overlay = document.getElementById("genaiDrawerOverlay");
    const closeBtn = document.getElementById("closeDrawerBtn");
    const sendBtn = document.getElementById("drawerSendBtn");
    const textIn = document.getElementById("drawerTextInput");
    const msgList = document.getElementById("drawerMessagesList");

    const openDrawer = () => {
      drawer.classList.add("open");
      overlay.classList.add("active");
    };

    const closeDrawer = () => {
      drawer.classList.remove("open");
      overlay.classList.remove("active");
    };

    toggleBtn.addEventListener("click", openDrawer);
    closeBtn.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);

    const handleSend = () => {
      const q = textIn.value.trim();
      if (!q) return;

      // Add user bubble
      const uBubble = document.createElement("div");
      uBubble.className = "drawer-bubble user";
      uBubble.textContent = q;
      msgList.appendChild(uBubble);

      textIn.value = "";
      msgList.scrollTop = msgList.scrollHeight;

      // GenAI responds
      setTimeout(() => {
        const reply = aiEngine.chatResponse(q, this.currentWorker, this.currentLang);
        const aBubble = document.createElement("div");
        aBubble.className = "drawer-bubble ai";
        aBubble.textContent = reply;
        msgList.appendChild(aBubble);
        msgList.scrollTop = msgList.scrollHeight;

        // Auto speak if audio enabled
        const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
        voiceEngine.speak(reply, dict.speechLangCode || "hi-IN");
      }, 350);
    };

    sendBtn.addEventListener("click", handleSend);
    textIn.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleSend();
    });
  }

  showToast(msg) {
    const toast = document.getElementById("toastMsg");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }
}

// Bootstrap on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  window.gigApp = new GigSaathiApp();
});
