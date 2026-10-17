# GigSaathi AI (गिग साथी)
### GenAI-Powered Multilingual Co-pilot for Gig & Informal Workers

> An accessible, voice-first, multilingual Generative AI platform engineered for **pick-and-drop service partners (food/grocery delivery), drivers (cabs/autos/tempos), and daily-wage informal workers**, supporting up to **10 registered workers**.

---

## 🌟 Key Capabilities & Features

### 1. 👥 Login-Based Worker Portal (Max 10 Workers)
- Built with an enforced **10-worker maximum limit** with pre-configured personas across diverse occupations:
  1. **Raju Kumar**: Pick & Drop Delivery Partner (Zomato & Swiggy)
  2. **Sunita Devi**: Domestic & Daily-Wage Cleaning/Cook Worker
  3. **Ramesh Yadav**: Auto-Rickshaw & Cab Driver (Uber, Ola & Rapido)
  4. **Mohammed Arif**: E-commerce Logistics Courier & Pick-Drop (Amazon Flex & Porter)
  5. **Kavita Sharma**: 10-Min Quick-Commerce Rider (Zepto & Blinkit)
  6. **Amit Patel**: Skilled Daily Electrician (Urban Company)
  7. **Vikram Singh**: Dark-Store Picker & Heavy Courier Loader (Instamart)
  8. **Lakshmi Murugan**: Sanitation & Facility Maintenance Daily-Wage Worker
  9. **Gurpreet Singh**: Long-Haul Mini-Truck Driver (Porter & Uncle Delivery)
  10. **Pooja Verma**: Pick & Drop Weekend Partner (Swiggy Instamart)
- Includes 1-click instant login profile switcher and phone number authentication with quota enforcement.

---

### 2. 📄 Five Dedicated Single Topic Pages

#### Page 1: 💰 Earnings Tracking (कमाई हिसाब)
- **Gross vs. Real Net Wage Calculator**: Analyzes true take-home pay after fuel burn, vehicle maintenance, and platform deductions.
- **KPI Metrics**: Gross App Earnings, Platform Deductions & Penalties, Real Net Pay, and True Hourly Rate.
- **GenAI Financial Co-pilot**: Evaluates whether hourly earnings fall below statutory living wages, detects fuel inefficiency, and suggests high-yield peak shift hours (e.g. 7:30 PM – 11:30 PM dinner surge).
- **Shift History Log**: Visual breakdown of recent shifts across platforms.

#### Page 2: 🛡️ Safety Practices & Field Hub (सुरक्षा नियम)
- **Daily Pre-Shift Checklist**: Interactive safety verification covering helmets, reflective gear, tire pressure, brakes, phone mounts, and hydration.
- **Extreme Weather Guidance**: Hydration and heatwave/rain advisories.
- **One-Touch Emergency SOS**: Synthesized loud siren alarm via Web Audio API, GPS coordinate capture, and instant WhatsApp SOS dispatch link.
- **24/7 Helpline Quick Dials**: Police 112, Ambulance 108, Women Helpline 1091, National Labor Helpline 14434.

#### Page 3: 📜 Rights & Welfare Scheme Awareness (हक और सरकारी योजनाएँ)
- **Comprehensive Scheme Catalog**:
  - **e-Shram Card**: ₹2,00,000 free accidental death & permanent disability insurance.
  - **Ayushman Bharat PM-JAY**: ₹5,00,000 cashless family hospitalization.
  - **PM Suraksha Bima Yojana (PMSBY)**: ₹2 Lakh cover for ₹20/year.
  - **State Platform Gig Workers Welfare Acts**: Rajasthan 2023, Karnataka, and Telangana statutory welfare funds and tribunals.
  - **Platform In-App Partner Insurance**: On-trip hospital and emergency coverages.
- **Eligibility Checklists & Direct Portal Links** for hassle-free registration.

#### Page 4: 📑 Document Help & Penalty Decrypter (कागज़ सहायता)
- **Multimodal Document Understanding**: Upload pay slips, deactivation notices, police challans, or medical insurance rejections.
- **4 Realistic Pre-loaded Scenarios**:
  - Unfair Order Cancellation Penalty Slip (-₹675 deduction).
  - Algorithmic Account Deactivation Warning (low acceptance rate during rain).
  - Traffic Police No-Parking e-Challan (delivery pickup fine).
  - Medical Insurance Claim Rejection Notice (off-duty commute exclusion).
- **GenAI Breakdown**:
  - *What this actually means*: Plain 3rd-grade language explanation.
  - *Red Flags*: Highlights unfair platform penalties and abusive clauses.
  - *Action Plan*: Concrete counter-steps to resolve the issue.

#### Page 5: ⚖️ Grievance & Dispute Drafting (न्याय ड्राफ़्टर)
- Formulate high-impact appeals for:
  - Unfair Order Cancellation Penalties
  - Wrongful Account Deactivations / ID Block
  - Unpaid Wait Time & Surcharges
  - Customer False Complaints & Harassment
  - Accident Insurance Claim Denials
- **3 Output Tiers**:
  1. **Direct WhatsApp to Hub Lead / Fleet Manager**: Simple, respectful, yet firm conversational message with 1-click WhatsApp web dispatch.
  2. **Formal Escalation Email**: Professional legal appeal to Company Grievance Officer citing the Code on Social Security and natural justice.
  3. **State Labor Board Complaint**: Formal petition for the Labor Commissioner / Gig Workers Tribunal.
- 1-Click Copy and 1-Click WhatsApp Share.

---

### 3. 🌐 Multilingual Guidance & "Read Feature" (Text-to-Speech)
- **Translate Text Option**: Dropdown allowing workers to instantly translate page content into **9 regional languages**:
  - English (`en`)
  - हिन्दी (`hi` - Hindi)
  - Hinglish (`hinglish` - Conversational Roman Hindi)
  - தமிழ் (`ta` - Tamil)
  - తెలుగు (`te` - Telugu)
  - বাংলা (`bn` - Bengali)
  - मराठी (`mr` - Marathi)
  - ಕನ್ನಡ (`kn` - Kannada)
  - ગુજરાતી (`gu` - Gujarati)
- **Read Feature (`🔊 Listen to Page`)**:
  - A prominent top button that reads out the entire active page aloud using the browser's Web Speech API (`SpeechSynthesis`).
  - Animated speech wave visualizer while audio plays.
  - Dedicated section read buttons (`🔊 Listen to Section`, `🔊 Read Tip`, `🔊 Listen to Draft`) on individual cards.
  - Synthetic Web Audio cues for button clicks and the emergency SOS siren.

---

### 4. 🤖 Docked "Ask Saathi AI" Drawer
- Floating assistant button available across all pages.
- Real-time conversational guidance with empathetic advice tailored to gig and daily-wage workers.
- Automatic multilingual speech playback for responses.

---

## 🚀 How to Run Locally

1. **Start the local Python server**:
   ```bash
   python server.py
   ```
2. **Open in your browser**:
   Navigate to [http://localhost:8000](http://localhost:8000).

3. **Login**:
   - Click on any of the **10 pre-loaded worker profiles** (e.g. *Raju Kumar*).
   - Explore the 5 single topic pages, test language translation, and click **🔊 Listen to Page**!
