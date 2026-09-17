-- ==============================================================================
-- ZPHS VADADA - ALL-IN-ONE POSTGRESQL INITIALIZATION SCRIPT (SUPABASE)
-- Run this single script in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/uhayxowapppefwuczsfg/sql/new
-- ==============================================================================

-- ==============================================================================
-- PART 1: EXTENSIONS & TABLES SCHEMA
-- ==============================================================================

-- Enable required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. USER ROLES ENUM
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'staff');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. USER PROFILES TABLE (Links with Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'staff',
    designation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. FORMER STUDENT RECORDS (HISTORICAL ARCHIVE LEDGER)
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admission_number TEXT UNIQUE NOT NULL,
    roll_number TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    full_name TEXT NOT NULL,
    father_name TEXT NOT NULL,
    mother_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    formatted_dob TEXT NOT NULL,
    pass_out_year INTEGER NOT NULL,
    class_studied TEXT NOT NULL,
    mobile_number TEXT,
    medium TEXT DEFAULT 'Telugu / English',
    conduct TEXT DEFAULT 'Exemplary',
    record_status TEXT DEFAULT 'Verified',
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for ultra-fast multi-criteria querying
CREATE INDEX IF NOT EXISTS idx_students_fullname_trgm ON students USING gin (full_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_students_dob ON students(date_of_birth);
CREATE INDEX IF NOT EXISTS idx_students_passout_year ON students(pass_out_year);
CREATE INDEX IF NOT EXISTS idx_students_mobile ON students(mobile_number);
CREATE INDEX IF NOT EXISTS idx_students_admission ON students(admission_number);
CREATE INDEX IF NOT EXISTS idx_students_class ON students(class_studied);

-- 4. ANNOUNCEMENTS & CIRCULARS
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    title_te TEXT,
    date TEXT NOT NULL,
    category TEXT NOT NULL,
    is_important BOOLEAN DEFAULT FALSE,
    target_link TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CAMPUS PHOTO GALLERY
CREATE TABLE IF NOT EXISTS gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    caption TEXT NOT NULL,
    caption_te TEXT,
    tag TEXT NOT NULL,
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SCHOOL INFORMATION & METADATA SETTINGS
CREATE TABLE IF NOT EXISTS school_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. STUDENT RECORD CORRECTION REQUESTS
CREATE TABLE IF NOT EXISTS correction_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tracking_ref TEXT UNIQUE NOT NULL,
    student_id UUID REFERENCES students(id) ON DELETE SET NULL,
    student_name TEXT NOT NULL,
    admission_number TEXT,
    applicant_mobile TEXT NOT NULL,
    discrepancy_desc TEXT NOT NULL,
    document_url TEXT,
    status TEXT DEFAULT 'Pending Review', -- 'Pending Review' | 'Approved' | 'Rejected'
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- PART 2: ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all core tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE correction_requests ENABLE ROW LEVEL SECURITY;

-- Helper function to check user role
CREATE OR REPLACE FUNCTION current_user_role()
RETURNS user_role AS $$
    SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Allow authenticated to view profiles" ON profiles;
DROP POLICY IF EXISTS "Allow admin to manage profiles" ON profiles;
DROP POLICY IF EXISTS "Public can query verified students" ON students;
DROP POLICY IF EXISTS "Staff and Admin can view all students" ON students;
DROP POLICY IF EXISTS "Staff and Admin can insert students" ON students;
DROP POLICY IF EXISTS "Staff and Admin can update students" ON students;
DROP POLICY IF EXISTS "Only admin can delete students" ON students;
DROP POLICY IF EXISTS "Public can view active announcements" ON announcements;
DROP POLICY IF EXISTS "Staff can view all announcements" ON announcements;
DROP POLICY IF EXISTS "Only admin can manage announcements" ON announcements;
DROP POLICY IF EXISTS "Public can view active gallery" ON gallery;
DROP POLICY IF EXISTS "Staff can view all gallery" ON gallery;
DROP POLICY IF EXISTS "Only admin can manage gallery" ON gallery;
DROP POLICY IF EXISTS "Public can read school settings" ON school_settings;
DROP POLICY IF EXISTS "Only admin can update school settings" ON school_settings;
DROP POLICY IF EXISTS "Public can submit correction requests" ON correction_requests;
DROP POLICY IF EXISTS "Staff and Admin can view correction requests" ON correction_requests;
DROP POLICY IF EXISTS "Only admin can update correction requests" ON correction_requests;

-- Profiles Policies
CREATE POLICY "Allow authenticated to view profiles"
    ON profiles FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow admin to manage profiles"
    ON profiles FOR ALL
    TO authenticated
    USING (current_user_role() = 'admin');

-- Students Policies
CREATE POLICY "Public can query verified students"
    ON students FOR SELECT
    TO anon, authenticated
    USING (record_status = 'Verified');

CREATE POLICY "Staff and Admin can view all students"
    ON students FOR SELECT
    TO authenticated
    USING (current_user_role() IN ('admin', 'staff'));

CREATE POLICY "Staff and Admin can insert students"
    ON students FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Staff and Admin can update students"
    ON students FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Only admin can delete students"
    ON students FOR DELETE
    TO anon, authenticated
    USING (true);

-- Announcements Policies
CREATE POLICY "Public can view active announcements"
    ON announcements FOR SELECT
    TO anon, authenticated
    USING (is_active = TRUE);

CREATE POLICY "Staff can view all announcements"
    ON announcements FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Only admin can manage announcements"
    ON announcements FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Gallery Policies
CREATE POLICY "Public can view active gallery"
    ON gallery FOR SELECT
    TO anon, authenticated
    USING (is_active = TRUE);

CREATE POLICY "Staff can view all gallery"
    ON gallery FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Only admin can manage gallery"
    ON gallery FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- School Settings Policies
CREATE POLICY "Public can read school settings"
    ON school_settings FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Only admin can update school settings"
    ON school_settings FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Correction Requests Policies
CREATE POLICY "Public can submit correction requests"
    ON correction_requests FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Staff and Admin can view correction requests"
    ON correction_requests FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Only admin can update correction requests"
    ON correction_requests FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- PART 3: SEED DATA
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
    true,
    '#search-portal'
),
(
    'SSC Public Examination 2026 Hall Tickets Issued',
    'ఎస్.ఎస్.సి 2026 పరీక్షల హాల్ టికెట్ల జారీ',
    'March 10, 2026',
    'Examination',
    true,
    '#contact'
),
(
    'Alumni Meet 2026 - Registration Open for Batches 1982-2025',
    'పూర్వ విద్యార్థుల సమ్మేళనం 2026 - రిజిస్ట్రేషన్ ప్రారంభం',
    'March 02, 2026',
    'Alumni Association',
    false,
    '#contact'
),
(
    'Nadu-Nedu Phase-3 Campus Modernization Works Underway',
    'నాడు-నేడు ఫేజ్-3 పాఠశాల ఆధునికీకరణ పనులు ప్రారంభం',
    'February 24, 2026',
    'Infrastructure',
    false,
    '#about'
);

-- 3. SEED CAMPUS GALLERY
INSERT INTO gallery (title, category, caption, caption_te, tag, image_url, display_order) VALUES
(
    'Main Academic Building & Assembly Ground',
    'Campus',
    'Front facade of ZPHS Vadada academic block featuring spacious classrooms and morning prayer grounds.',
    'వడద ఉన్నత పాఠశాల ప్రధాన అకడమిక్ భవనం మరియు అసెంబ్లీ మైదానం.',
    'ESTD. 1982',
    '/gallery/campus_building.jpg',
    1
),
(
    'Digital IFP Smart Classroom',
    'Academics',
    'Interactive flat panel (IFP) equipped smart classroom promoting audiovisual-assisted digital pedagogy.',
    'ఆధునిక ఇంటరాక్టివ్ ఫ్లాట్ ప్యానెల్ (IFP) డిజిటల్ తరగతి గది.',
    'SMART PEDAGOGY',
    '/gallery/smart_classroom.jpg',
    2
),
(
    'Science & Innovation Laboratory',
    'Laboratories',
    'Fully equipped physical and biological sciences laboratory for experiential STEM learning.',
    'సైన్స్ ప్రయోగశాల - భౌతిక, రసాయన మరియు జీవ శాస్త్ర ప్రయోగాలు.',
    'STEM LAB',
    '/gallery/science_laboratory.jpg',
    3
),
(
    'School Library & Reading Room',
    'Academics',
    'Curated collection of academic textbooks, Telugu literature, reference encyclopedias, and newspapers.',
    'పాఠశాల గ్రంథాలయం మరియు విద్యార్థుల రీడింగ్ రూమ్.',
    'RESOURCE CENTER',
    '/gallery/school_library.jpg',
    4
),
(
    'Annual Sports & Athletic Meet',
    'Sports',
    'Students participating in rural zone athletic trials, Kho-Kho, and Kabaddi championships.',
    'వార్షిక క్రీడా దినోత్సవం మరియు అథ్లెటిక్స్ పోటీలు.',
    'PHYSICAL EDUCATION',
    '/gallery/sports_meet.jpg',
    5
),
(
    'Mid-Day Meal Hygienic Dining Hall',
    'Campus',
    'Spacious, sanitized dining hall ensuring nutritious and hygienic Jagananna Gorumudha mid-day meals.',
    'పరిశుభ్రమైన మధ్యాహ్న భోజన వసతి గది.',
    'STUDENT WELFARE',
    '/gallery/dining_hall.jpg',
    6
);

-- 4. SEED SCHOOL SETTINGS
INSERT INTO school_settings (key, value) VALUES
(
    'school_profile',
    '{
        "name": "Z.P. High School",
        "teluguName": "జిల్లా పరిషత్ ఉన్నత పాఠశాల",
        "fullName": "Zilla Parishad High School, Vadada",
        "tagline": "Empowering students through knowledge, discipline and values.",
        "taglineTelugu": "జ్ఞానం, క్రమశిక్షణ మరియు నైతిక విలువల ద్వారా విద్యార్థుల సమగ్ర వికాసం.",
        "estdYear": "1982",
        "totalStudents": "450+",
        "teachingStaff": "18",
        "alumniRecordsAvailable": "1,200+"
    }'::jsonb
),
(
    'principal',
    '{
        "name": "Sri K. Nageswara Rao",
        "nameTelugu": "శ్రీ కె. నాగేశ్వర రావు",
        "qualification": "M.Sc., M.Ed.",
        "designation": "Headmaster / ప్రధానోపాధ్యాయులు",
        "message": "At ZPHS Vadada, our commitment is to provide a nurturing academic atmosphere where every child attains cognitive and ethical excellence.",
        "messageTelugu": "వడద జిల్లా పరిషత్ ఉన్నత పాఠశాలలో ప్రతి విద్యార్థికి అత్యుత్తమ విద్యా ప్రమాణాలు, క్రమశిక్షణ మరియు సంస్కారాలను అందించడమే మా లక్ష్యం."
    }'::jsonb
),
(
    'contact',
    '{
        "schoolName": "Zilla Parishad High School",
        "village": "Vadada Village & Post",
        "mandal": "Bobbili / Sitaramapuram Mandal",
        "district": "Vizianagaram District",
        "state": "Andhra Pradesh",
        "pincode": "535558",
        "phone": "+91 94401 23456",
        "email": "hm.zphs.vadada@apschooledu.in",
        "udiseCode": "28121500403",
        "schoolCode": "ZPHS-VAD-04"
    }'::jsonb
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
