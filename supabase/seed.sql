-- ==============================================================================
-- ZPHS VADADA - POSTGRESQL INITIAL SEED DATA
-- Seed data for students, announcements, gallery photos, and school settings
-- ==============================================================================

-- 1. SEED STUDENT RECORDS
INSERT INTO students (
    admission_number, roll_number, first_name, last_name, full_name,
    father_name, mother_name, date_of_birth, formatted_dob, pass_out_year,
    class_studied, mobile_number, medium, conduct, record_status
) VALUES
(
    'ADM-2015-0104', '15104', 'Lakshmi', 'Vaddadi', 'Lakshmi Devi Vaddadi',
    'V. Appala Naidu', 'V. Parvathi', '1999-07-25', '25-Jul-1999', 2015,
    'Class 10', '9848022334', 'Telugu / English', 'Exemplary', 'Verified'
),
(
    'ADM-2018-0242', '18042', 'Suresh', 'Terli', 'Suresh Kumar Terli',
    'T. Satyanarayana', 'T. Ramanamma', '2002-04-18', '18-Apr-2002', 2018,
    'Class 10', '9440188219', 'Telugu / English', 'Very Good', 'Verified'
),
(
    'ADM-2012-0089', '12089', 'Rajesh', 'Patnana', 'Rajesh Patnana',
    'P. Venkata Rao', 'P. Lakshmi', '1996-11-12', '12-Nov-1996', 2012,
    'Class 10', '9866541203', 'Telugu / English', 'Exemplary', 'Verified'
),
(
    'ADM-2005-0034', '05034', 'Venkata Ramana', 'Majji', 'Venkata Ramana Majji',
    'M. Suribabu', 'M. Varahalamma', '1989-03-05', '05-Mar-1989', 2005,
    'Class 10', '9989012345', 'Telugu', 'Good', 'Verified'
),
(
    'ADM-2020-0311', '20011', 'Bhavani', 'Kuppili', 'Kuppili Bhavani',
    'K. Rama Krishna', 'K. Saraswathi', '2004-09-30', '30-Sep-2004', 2020,
    'Class 10', '7989501234', 'English', 'Exemplary', 'Verified'
),
(
    'ADM-2022-0405', '22045', 'Kiran Kumar', 'Gorle', 'Kiran Kumar Gorle',
    'G. Narayana', 'G. Adilakshmi', '2006-12-14', '14-Dec-2006', 2022,
    'Class 10', '9492109876', 'Telugu / English', 'Very Good', 'Verified'
),
(
    'ADM-1998-0012', '98012', 'Prasad', 'Bammidi', 'Bammidi Prasad',
    'B. Krishna Murthy', 'B. Kanthamma', '1982-08-22', '22-Aug-1982', 1998,
    'Class 10', '9849234567', 'Telugu', 'Good', 'Verified'
),
(
    'ADM-2023-0488', '23018', 'Anusha', 'Rongali', 'Rongali Anusha',
    'R. Simhachalam', 'R. Satyavathi', '2007-05-19', '19-May-2007', 2023,
    'Class 10', '8919012345', 'English', 'Exemplary', 'Verified'
),
(
    'ADM-2019-0355', '19055', 'Dhanunjaya', 'Chintada', 'Chintada Dhanunjaya',
    'C. Jagannadham', 'C. Danamma', '2003-01-08', '08-Jan-2003', 2019,
    'Class 10', '9618234567', 'Telugu / English', 'Very Good', 'Verified'
),
(
    'ADM-1992-0005', '92005', 'Sanyasi Rao', 'Yalla', 'Yalla Sanyasi Rao',
    'Y. Apparao', 'Y. Guravamma', '1976-06-15', '15-Jun-1976', 1992,
    'Class 10', '9701234567', 'Telugu', 'Good', 'Verified'
)
ON CONFLICT (admission_number) DO NOTHING;

-- 2. SEED ANNOUNCEMENTS
INSERT INTO announcements (title, title_te, date, category, is_important, target_link) VALUES
(
    'Digitization of Historical Student Ledgers from 1982 to 2024 Completed',
    '1982 నుండి 2024 వరకు పూర్వ విద్యార్థుల రికార్డుల డిజిటలైజేషన్ పూర్తయింది',
    'March 15, 2026',
    'Academic Archive',
    TRUE,
    '#search-portal'
),
(
    'SSC Public Examination 2026 Hall Ticket Verification Notice',
    'ఎస్.ఎస్.సి పబ్లిక్ పరీక్షలు 2026 హాల్ టికెట్ పరిశీలన ప్రకటన',
    'March 10, 2026',
    'Examination',
    FALSE,
    '#about'
),
(
    'Alumni Association Formation & Golden Jubilee Preparatory Committee',
    'పూర్వ విద్యార్థుల సంఘం ఏర్పాటు & స్వర్ణోత్సవ సన్నాహక కమిటీ సమావేశం',
    'February 28, 2026',
    'Alumni Welfare',
    TRUE,
    '#contact'
);

-- 3. SEED GALLERY
INSERT INTO gallery (title, category, caption, caption_te, tag, image_url, display_order) VALUES
(
    'Main Academic Building & Assembly Ground', 'Campus',
    'Spacious classrooms, flag post, and verdant school grounds at Vadada.',
    'విశాలమైన తరగతి గదులు, జాతీయ జెండా స్తంభం, పచ్చని వాతావరణం.',
    'School Campus View', '/gallery/campus_building.jpg', 1
),
(
    'Digital IFP Smart Classroom', 'Academics',
    'Interactive Flat Panels installed for engaging multimedia learning in STEM subjects.',
    'డిజిటల్ ఇంటరాక్టివ్ ఫ్లాట్ ప్యానెల్స్‌తో ఆధునిక బోధన తరగతి గది.',
    'Digital Smart Class', '/gallery/smart_classroom.jpg', 2
),
(
    'Science & Innovation Laboratory', 'Laboratories',
    'Hands-on physics, chemistry, and biology experimental stations.',
    'భౌతిక, రసాయన, జీవశాస్త్ర ప్రయోగశాల పరికరాలు.',
    'Science Laboratory', '/gallery/science_laboratory.jpg', 3
),
(
    'School Library & Reading Room', 'Library',
    'Over 2,500 Telugu and English reference titles, journals, and encyclopedias.',
    'తెలుగు, ఆంగ్ల పుస్తకాలు, విజ్ఞాన గ్రంథాలయ విభాగం.',
    'Library & Reading Room', '/gallery/school_library.jpg', 4
),
(
    'Annual Sports & Athletic Meet', 'Sports',
    'Track events, kho-kho, volleyball, and physical fitness displays.',
    'ట్రాక్ పోటీలు, ఖో-ఖో, వాలీబాల్ మరియు క్రీడా సంబరాలు.',
    'Annual Sports Meet', '/gallery/sports_meet.jpg', 5
),
(
    'Mid-Day Meal Hygienic Dining Hall', 'Welfare',
    'Nutritious Jagananna Gorumudda meal program in a clean, sanitized dining environment.',
    'పరిశుభ్రమైన డైనింగ్ హాలులో పౌష్టికాహార మధ్యాహ్న భోజన పథకం.',
    'Dining Facility', '/gallery/dining_hall.jpg', 6
);

-- 4. SEED SCHOOL SETTINGS
INSERT INTO school_settings (key, value) VALUES
(
    'school_profile',
    '{
        "name": "ZPHS Vadada",
        "teluguName": "జిల్లా పరిషత్ ఉన్నత పాఠశాల, వడద",
        "fullName": "Zilla Parishad High School, Vadada",
        "tagline": "Empowering students through knowledge, discipline and values.",
        "taglineTelugu": "జ్ఞానం, క్రమశిక్షణ, నైతిక విలువల ద్వారా విద్యార్థుల సమగ్ర వికాసం.",
        "estdYear": 1982,
        "totalStudents": "450+ Enrolled",
        "teachingStaff": "18 Dedicated Faculty",
        "alumniRecords": "1,200+ Digitized Records",
        "schoolCode": "UDISE: 28010200501"
    }'::jsonb
),
(
    'principal_profile',
    '{
        "name": "Sri K. Nageswara Rao, M.Sc., B.Ed.",
        "role": "Headmaster / Principal",
        "experience": "24 Years in AP School Education",
        "message": "At ZPHS Vadada, our commitment is to provide qualitative, value-driven education to every child in our rural community. Digitizing our historical student ledgers bridges decades of our proud alumni network.",
        "messageTelugu": "వడద జిల్లా పరిషత్ ఉన్నత పాఠశాలలో ప్రతి గ్రామీణ విద్యార్థికి నాణ్యమైన, సంస్కారవంతమైన విద్యను అందించడమే మా ధ్యేయం. దశాబ్దాల పూర్వ విద్యార్థుల రికార్డులను డిజిటలైజ్ చేయడం ద్వారా మా పూర్వ విద్యార్థుల శ్రేయస్సును కాపాడుతున్నాము."
    }'::jsonb
),
(
    'contact_info',
    '{
        "phone": "+91 8942-248234 / +91 9440122334",
        "email": "hm.zphs.vadada@apschooledu.in",
        "address": "Vadada High School (ZPHS Vadada), Vadada Village, Andhra Pradesh, Pin: 535128",
        "officeHours": "Monday to Saturday: 9:00 AM – 4:30 PM"
    }'::jsonb
)
ON CONFLICT (key) DO NOTHING;
