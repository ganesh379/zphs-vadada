-- ==============================================================================
-- ZPHS VADADA - POSTGRESQL DATABASE SCHEMA (SUPABASE)
-- Official School Website & Digitized Alumni Records CMS
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

-- 2. USER PROFILES TABLE (Links with Supabase Auth or standalone)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'staff',
    designation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. FORMER STUDENT RECORDS (HISTORICAL LEDGER)
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
