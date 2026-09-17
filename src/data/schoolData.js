/**
 * SCHOOL PROFILE & CONFIGURATION DATA (PLACEHOLDERS)
 * 
 * All values below are clearly labeled as editable placeholders for administrative setup.
 */

export const SCHOOL_INFO = {
  name: "ZPHS Vadada",
  teluguName: "జిల్లా పరిషత్ ఉన్నత పాఠశాల, వడద",
  fullName: "Zilla Parishad High School, Vadada",
  tagline: "Empowering students through knowledge, discipline and values.",
  taglineTelugu: "జ్ఞానం, క్రమశిక్షణ, నైతిక విలువల ద్వారా విద్యార్థుల సమగ్ర వికాసం.",
  
  // School Overview Metrics
  estdYear: "1982",
  estdYearValue: 1982,
  totalStudents: "450+ Enrolled",
  teachingStaff: "18 Dedicated Faculty",
  alumniRecordsAvailable: "1,200+ Digitized Records",
  mediums: "Telugu & English Mediums",
  affiliation: "Board of Secondary Education, Andhra Pradesh (BSEAP)",
  schoolCode: "UDISE: 28010200501",
  
  // Principal Profile
  principal: {
    name: "Sri K. Nageswara Rao, M.Sc., B.Ed.",
    role: "Headmaster / Principal",
    experience: "24 Years in AP School Education",
    message: "At ZPHS Vadada, our commitment is to provide qualitative, value-driven education to every child in our rural community. Digitizing our historical student ledgers bridges decades of our proud alumni network, ensuring every past student can authenticate their academic foundation effortlessly.",
    messageTelugu: "వడద జిల్లా పరిషత్ ఉన్నత పాఠశాలలో ప్రతి గ్రామీణ విద్యార్థికి నాణ్యమైన, సంస్కారవంతమైన విద్యను అందించడమే మా ధ్యేయం. దశాబ్దాల పూర్వ విద్యార్థుల రికార్డులను డిజిటలైజ్ చేయడం ద్వారా మా పూర్వ విద్యార్థుల శ్రేయస్సును కాపాడుతున్నాము.",
    photoPlaceholderLabel: "Headmaster Desk"
  },

  // Latest Announcements
  announcements: [
    {
      id: "ann-1",
      title: "Alumni Record Digitization Verification Phase-II Open",
      date: "September 12, 2026",
      category: "Digital Archives",
      summary: "Former students who passed out between 1985 and 2024 can verify their digitized academic records online or request corrections.",
      isNew: true
    },
    {
      id: "ann-2",
      title: "SSC Board Examination Special Remedial Classes Schedule",
      date: "September 05, 2026",
      category: "Academics",
      summary: "Special morning and evening study hours commenced for Class 10 students with focused doubt-clearing sessions.",
      isNew: false
    },
    {
      id: "ann-3",
      title: "Annual Science Exhibition & Dr. A.P.J. Abdul Kalam Science Fair",
      date: "August 28, 2026",
      category: "Activities",
      summary: "Students from Classes 6 to 10 will showcase eco-friendly innovations and rural science models next month.",
      isNew: false
    },
    {
      id: "ann-4",
      title: "National Means-cum-Merit Scholarship (NMMS) Guidance",
      date: "August 15, 2026",
      category: "Scholarships",
      summary: "Free coaching and application support initiated for eligible Class 8 students.",
      isNew: false
    }
  ],

  // Achievements
  achievements: [
    {
      id: "ach-1",
      title: "100% Pass Percentage in SSC Board",
      year: "2023-2024 Academic Year",
      badge: "Academic Honor",
      description: "School recorded outstanding 100% pass result with 14 students securing Grade Point Average above 9.5."
    },
    {
      id: "ach-2",
      title: "State Level Kho-Kho & Kabaddi Champions",
      year: "AP School Games Federation 2023",
      badge: "Sports Excellence",
      description: "Under-17 Girls & Boys teams represented the district at state-level rural games in Kakinada."
    },
    {
      id: "ach-3",
      title: "Inspire Award MANAK State Recognition",
      year: "DST Government of India 2022",
      badge: "Innovation Award",
      description: "Two student scientific models selected for national level round in sustainable agriculture irrigation."
    },
    {
      id: "ach-4",
      title: "Clean Green School & Eco-Club Award",
      year: "Swachh Vidyalaya Ranking",
      badge: "Campus Environment",
      description: "Recognized at mandal level for rooftop solar installation, organic kitchen garden, and water harvesting."
    }
  ],

  // Gallery
  gallery: [
    {
      id: "gal-1",
      title: "Main Academic Building & Assembly Ground",
      category: "Campus",
      caption: "Spacious classrooms, flag post, and verdant school grounds at Vadada.",
      tag: "School Campus View",
      image: "/gallery/campus_building.jpg"
    },
    {
      id: "gal-2",
      title: "Digital IFP Smart Classroom",
      category: "Academics",
      caption: "Interactive Flat Panels installed for engaging multimedia learning in STEM subjects.",
      tag: "Digital Smart Class",
      image: "/gallery/smart_classroom.jpg"
    },
    {
      id: "gal-3",
      title: "Science & Innovation Laboratory",
      category: "Laboratories",
      caption: "Hands-on physics, chemistry, and biology experimental stations.",
      tag: "Science Laboratory",
      image: "/gallery/science_laboratory.jpg"
    },
    {
      id: "gal-4",
      title: "School Library & Reading Room",
      category: "Library",
      caption: "Over 2,500 Telugu and English reference titles, journals, and encyclopedias.",
      tag: "Library & Reading Room",
      image: "/gallery/school_library.jpg"
    },
    {
      id: "gal-5",
      title: "Annual Sports & Athletic Meet",
      category: "Sports",
      caption: "Track events, kho-kho, volleyball, and physical fitness displays.",
      tag: "Annual Sports Meet",
      image: "/gallery/sports_meet.jpg"
    },
    {
      id: "gal-6",
      title: "Mid-Day Meal Hygienic Dining Hall",
      category: "Welfare",
      caption: "Nutritious Jagananna Gorumudda meal program in a clean, sanitized dining environment.",
      tag: "Dining Facility",
      image: "/gallery/dining_hall.jpg"
    }
  ],

  // Contact Information
  contact: {
    addressLine1: "Vadada High School (ZPHS Vadada)",
    village: "Vadada Village",
    mandal: "Andhra Pradesh",
    district: "Andhra Pradesh, India",
    state: "Andhra Pradesh, India",
    pinCode: "535128",
    phone: "+91 8942-248234 / +91 9440122334",
    email: "hm.zphs.vadada@apschooledu.in",
    officeHours: "Monday to Saturday: 9:00 AM – 4:30 PM (Second Saturday & Sunday Holiday)",
    mapUrl: "https://maps.app.goo.gl/oULqf9846NU3VfnTA",
    mapEmbedUrl: "https://maps.google.com/maps?q=18.5072028,83.4533293&hl=en&z=16&output=embed",
    coordinates: "18.5072° N, 83.4533° E",
    placeName: "Vadada High School"
  }
};
