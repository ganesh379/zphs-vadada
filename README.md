# ZPHS Vadada — Official School Website & Alumni Records Digitization Portal

A modern, professional, and responsive web portal for **ZPHS Vadada** (Zilla Parishad High School, Vadada, Andhra Pradesh).

Built with **React 19, Vite, and Tailwind CSS**, this portal allows alumni to verify and search historical digitized school records while ensuring privacy protection through data masking and OTP verification.

- **Live URL**: [https://zphs-vadada.web.app](https://zphs-vadada.web.app)
- **GitHub Repository**: [https://github.com/ganesh379/zphs-vadada](https://github.com/ganesh379/zphs-vadada)
- **Firebase Project**: `zphs-vadada`

---

## Key Features

### 1. Student Record Search (Name + Date of Birth + Pass-Out Year)
- **Search Criteria (No Mobile Number Based Search)**:
  - **Student Name**: Full name or any part of the name (e.g. *"Suresh"*, *"Lakshmi"*, *"Devi"*, *"Vaddadi"*).
  - **Date of Birth (DOB)**: Official date of birth as recorded in the physical school ledger (calendar date input).
  - **Pass-Out / Leaving Year**: Dynamically descending from 1982 to 2026.
  - **Class Studied / Passed (Optional)**: Filter by Class 6, 7, 8, 9, 10, or All Classes.
- **Privacy & Authentication**:
  - Secure verification using student Name + DOB + Pass-Out Year to eliminate public directory scraping.
  - Identification details remain masked (`ADM-****-0842`).
  - Interactive **CAPTCHA Challenge** with math verification.
  - Mandatory **Consent Checkbox**: *"I confirm that I am searching for my own record or have permission from the concerned person."*
- **Comprehensive State Machine**:
  - **Initial State**: Guidance illustration, archive tips, and search parameters.
  - **Loading State**: Animated skeleton loader with status feedback.
  - **No-Results State**: Actionable troubleshooting suggestions, "Modify Search", and "Contact School" buttons.
  - **Multiple-Results State**: Compact summary cards showing masked data and "View Details" action.
  - **Student-Details State**: Official certificate-style layout with photo placeholder, verified stamp, printable record slip, and correction request actions.
- **Record Correction Request Modal**:
  - Pre-populates student details, accepts description and document upload placeholder, and generates a unique tracking reference (e.g. `REQ-2026-VAD-4892`).

### 2. Progressive Web App (PWA) & Mobile First
- **Offline Shell & Caching**: Custom Service Worker (`sw.js`) with cache fallback enabling instant offline page loading and local student record search even in low/no connectivity areas.
- **Web App Manifest**: Full `manifest.webmanifest` with standalone mode, theme color (`#0F5132`), app shortcuts, and maskable vector icons.
- **Add to Home Screen (A2HS)**: In-app install banner with direct prompt on Android / desktop and iOS Safari instructions.
- **Mobile Bottom Navigation Bar**: Fixed one-thumb mobile bottom navigation (Home, About, Records, Map/Contact, and Telugu/English quick switch).
- **Mobile Touch Enhancements**:
  - Number keypad optimization (`inputMode="numeric"`, `pattern="[0-9]*"`) for phone numbers, CAPTCHA, and OTP fields.
  - 16px input font size preventing iOS Safari auto-zoom.
  - Safe-area inset padding (`safe-area-bottom`) for modern borderless iPhones and Android devices.
- **Government AP School Aesthetics**: Deep Forest Green (`#0F5132`), Navy Blue (`#1E3A8A`), White, and subtle Saffron/Amber accents.
- **Bilingual English / Telugu (తెలుగు) Language Selector**: Instant live toggle of labels, headers, and notices.
- **Sections**:
  1. **Hero Section** with high school building illustration placeholder and direct action buttons.
  2. **Principal’s Message Card** with photo placeholder, role, and formal message.
  3. **School Overview** with verified institutional indicators:
     - Year of Establishment: 1982
     - Total Students: 450+ Enrolled
     - Teaching Staff: 18 Dedicated Faculty
     - Alumni Records Available: 1,200+ Digitized Records
  4. **Latest Announcements** with category tags, dates, and direct links to the archive search.
  5. **Achievements Section** showcasing SSC board ranks, sports, and science honors.
  6. **Photo Gallery Preview** with category filters (Campus, Academics, Labs, Sports) and image preview dialog.
  7. **Contact & Location** with postal address, office timings, contact details, and inquiry form.
  8. **Footer** with AP government educational portal links, copyright, privacy policy, and terms of use modals.

---

## Demonstration Test Matrix (Fictional Sample Data)

The application includes built-in quick test buttons right beneath the search portal:

| Test Scenario | Input Data | Expected Result |
| :--- | :--- | :--- |
| **Exact Match** | Name: `Lakshmi Devi`<br>DOB: `1999-07-25`<br>Year: `2015` | Directly opens detailed certificate profile for **Lakshmi Devi Korada** (School Topper, 9.8 GPA). |
| **Part of Name + DOB** | Name: `Suresh`<br>DOB: `2002-04-18`<br>Year: `2018` | Accurately identifies and displays **Suresh Kumar Vaddadi**. |
| **Surname / Part of Name** | Name: `Vaddadi`<br>Year: `2018` | Demonstrates matching by surname / part of name. |
| **No Matches** | Name: `Unknown Student`<br>DOB: `2000-01-01` | Displays the empty state with suggested next steps and a "Modify Search" button. |
| **Correction Request** | Open any record & click *"Request Correction"* | Opens the correction modal to submit discrepancy requests with tracking number `REQ-2026-VAD-xxxx`. |

---

## Setup and Running Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm (version 9 or higher)

### 1. Install Dependencies
```bash
cd "d:\github apps\ZPHS Vadada"
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173/
```

### 3. Build for Production
To create an optimized production bundle in the `dist/` directory:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## Project Structure

```
d:/github apps/ZPHS Vadada/
├── public/
│   └── logo.svg                     # High school emblem SVG
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── CaptchaBox.jsx       # Interactive security verification challenge
│   │   │   ├── Footer.jsx           # School footer with AP govt links & address
│   │   │   ├── Header.jsx           # Official header with bilingual toggle & mobile menu
│   │   │   ├── Modal.jsx            # Accessible dialog wrapper
│   │   │   └── PolicyModals.jsx     # Privacy Policy & Terms of Use dialogs
│   │   ├── home/
│   │   │   ├── Achievements.jsx     # School honors and sports achievements
│   │   │   ├── Announcements.jsx    # Circulars and academic notices
│   │   │   ├── ContactSection.jsx   # School address, timings, and inquiry form
│   │   │   ├── HeroSection.jsx      # Welcome banner, CTAs, campus illustration
│   │   │   ├── PhotoGallery.jsx     # Campus facilities gallery with filters
│   │   │   ├── PrincipalMessage.jsx # Headmaster message card & photo placeholder
│   │   │   └── SchoolOverview.jsx   # Estd year, student count, faculty metrics
│   │   └── records/
│   │       ├── CorrectionModal.jsx  # Correction request form & tracking ID generator
│   │       ├── OtpVerificationModal.jsx # 4-digit OTP challenge for mobile queries
│   │       ├── RecordSearchPortal.jsx   # Main search coordinator & state machine
│   │       ├── ResultsEmpty.jsx     # No-results state with suggestions
│   │       ├── ResultsInitial.jsx   # Search guide and initial state
│   │       ├── ResultsList.jsx      # Multiple matching cards with masked data
│   │       ├── ResultsSkeleton.jsx  # Pulsing loading animation
│   │       ├── SearchFilterCard.jsx # Dynamic form (Name/Mobile, Class, Year, Captcha)
│   │       └── StudentDetailCard.jsx# Full certificate profile & print slip
│   ├── data/
│   │   ├── sampleStudents.js        # 10 fictional student records (1998-2024)
│   │   ├── schoolData.js            # School profile, stats placeholders, announcements
│   │   └── translations.js          # English and Telugu (తెలుగు) dictionaries
│   ├── App.jsx                      # Main app coordinator
│   ├── index.css                    # Tailwind CSS base and print media rules
│   └── main.jsx                     # React DOM root mount
├── index.html                       # Semantic HTML5 template with Inter & Telugu fonts
├── package.json                     # Dependencies and scripts
└── vite.config.js                   # Vite configuration with Tailwind CSS v4
```
