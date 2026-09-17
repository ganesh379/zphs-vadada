-- ==============================================================================
-- ZPHS VADADA - ROW LEVEL SECURITY (RLS) POLICIES
-- Role-Based Access Control: Admin, Staff, and Public
-- ==============================================================================

-- Enable RLS on all core tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE correction_requests ENABLE ROW LEVEL SECURITY;

-- Helper function to check current user role
CREATE OR REPLACE FUNCTION current_user_role()
RETURNS user_role AS $$
    SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 1. PROFILES POLICIES
-- Anyone authenticated can read user profiles
CREATE POLICY "Allow authenticated to view profiles"
    ON profiles FOR SELECT
    TO authenticated
    USING (true);

-- Only admins can insert or update staff profiles
CREATE POLICY "Allow admin to manage profiles"
    ON profiles FOR ALL
    TO authenticated
    USING (current_user_role() = 'admin');

-- 2. STUDENTS POLICIES
-- Public & Alumni can search verified student records
CREATE POLICY "Public can query verified students"
    ON students FOR SELECT
    TO anon, authenticated
    USING (record_status = 'Verified');

-- Staff and Admin can view all student records (including unverified / pending)
CREATE POLICY "Staff and Admin can view all students"
    ON students FOR SELECT
    TO authenticated
    USING (current_user_role() IN ('admin', 'staff'));

-- Staff and Admin can insert new student records
CREATE POLICY "Staff and Admin can insert students"
    ON students FOR INSERT
    TO authenticated
    WITH CHECK (current_user_role() IN ('admin', 'staff'));

-- Staff and Admin can update existing student records
CREATE POLICY "Staff and Admin can update students"
    ON students FOR UPDATE
    TO authenticated
    USING (current_user_role() IN ('admin', 'staff'))
    WITH CHECK (current_user_role() IN ('admin', 'staff'));

-- ONLY Admin can delete student records
CREATE POLICY "Only admin can delete students"
    ON students FOR DELETE
    TO authenticated
    USING (current_user_role() = 'admin');

-- 3. ANNOUNCEMENTS POLICIES
-- Public can view active announcements
CREATE POLICY "Public can view active announcements"
    ON announcements FOR SELECT
    TO anon, authenticated
    USING (is_active = TRUE);

-- Staff can view all announcements
CREATE POLICY "Staff can view all announcements"
    ON announcements FOR SELECT
    TO authenticated
    USING (current_user_role() IN ('admin', 'staff'));

-- Only Admin can manage announcements
CREATE POLICY "Only admin can manage announcements"
    ON announcements FOR ALL
    TO authenticated
    USING (current_user_role() = 'admin')
    WITH CHECK (current_user_role() = 'admin');

-- 4. GALLERY POLICIES
-- Public can view active gallery items
CREATE POLICY "Public can view active gallery"
    ON gallery FOR SELECT
    TO anon, authenticated
    USING (is_active = TRUE);

-- Staff can view all gallery items
CREATE POLICY "Staff can view all gallery"
    ON gallery FOR SELECT
    TO authenticated
    USING (current_user_role() IN ('admin', 'staff'));

-- Only Admin can manage gallery
CREATE POLICY "Only admin can manage gallery"
    ON gallery FOR ALL
    TO authenticated
    USING (current_user_role() = 'admin')
    WITH CHECK (current_user_role() = 'admin');

-- 5. SCHOOL SETTINGS POLICIES
-- Public can read school settings
CREATE POLICY "Public can read school settings"
    ON school_settings FOR SELECT
    TO anon, authenticated
    USING (true);

-- Only Admin can update school settings
CREATE POLICY "Only admin can update school settings"
    ON school_settings FOR ALL
    TO authenticated
    USING (current_user_role() = 'admin')
    WITH CHECK (current_user_role() = 'admin');

-- 6. CORRECTION REQUESTS POLICIES
-- Anyone can submit a correction request
CREATE POLICY "Public can submit correction requests"
    ON correction_requests FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Staff and Admin can view all correction requests
CREATE POLICY "Staff and Admin can view correction requests"
    ON correction_requests FOR SELECT
    TO authenticated
    USING (current_user_role() IN ('admin', 'staff'));

-- Only Admin can review/update correction requests
CREATE POLICY "Only admin can update correction requests"
    ON correction_requests FOR UPDATE
    TO authenticated
    USING (current_user_role() = 'admin')
    WITH CHECK (current_user_role() = 'admin');
