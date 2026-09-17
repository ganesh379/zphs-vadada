# PostgreSQL Database Integration Guide — ZPHS Vadada

This application is equipped with a complete **PostgreSQL database architecture** utilizing **Supabase** (or any standard PostgreSQL instance) to manage student records, campus announcements, photo gallery archives, school settings, and record correction requests.

---

## 1. PostgreSQL Architecture & Schema Overview

The database is defined in [`supabase/`](file:///d:/github%20apps/ZPHS%20Vadada/supabase/):

### Tables

| Table | Description | Access Permissions |
|---|---|---|
| **`students`** | Master ledger of former students (admission number, roll number, full name, DOB, pass-out year, class, mobile, conduct, medium, record status). | **Public**: Select (privacy masked)<br>**Staff**: Insert & Update<br>**Admin**: Insert, Update & Delete |
| **`announcements`** | Official circulars, academic notifications, and notice board updates. | **Public**: Read active<br>**Admin**: Full CRUD |
| **`gallery`** | Institutional campus photographs with categories, captions, and metadata tags. | **Public**: Read active<br>**Admin**: Full CRUD |
| **`school_settings`** | Key-value store (`JSONB`) for institution profile, headmaster info, and statistics. | **Public**: Read<br>**Admin**: Update |
| **`correction_requests`** | Digital tickets submitted by former students or parents requesting record rectification. | **Public**: Submit ticket<br>**Staff/Admin**: View & Update status |
| **`profiles`** | Authenticated staff and administrator accounts with role definitions (`admin` vs `staff`). | **Self**: Read/Update profile<br>**Admin**: Read all |

### Performance Indexes
- `idx_students_fullname_trgm`: PostgreSQL trigram index (`pg_trgm`) using GIN for partial and fuzzy name searches.
- B-tree indexes on `date_of_birth`, `pass_out_year`, `mobile_number`, `admission_number`, and `class_studied`.

---

## 2. Row Level Security (RLS) & Role-Based Access Control

Full RLS policies are codified in [`supabase/policies.sql`](file:///d:/github%20apps/ZPHS%20Vadada/supabase/policies.sql):

- **Headmaster (Admin Role)**:
  - Can create, read, update, and delete all records.
  - Can modify institutional settings.
  - Can resolve or reject correction tickets.
- **Record Clerk (Staff Role)**:
  - Can search all students (including mobile numbers and complete unmasked records).
  - Can add new student records and update existing records.
  - Cannot delete student records (deletion is restricted to Headmaster).
  - Can review correction tickets.
- **Public & Alumni**:
  - Can search students by **Full/Partial Name + Date of Birth + Pass-Out Year**.
  - Mobile numbers are masked for privacy protection.
  - Can submit digital correction tickets with tracking references.

---

## 3. Quick Setup Instructions (Supabase Managed PostgreSQL)

1. **Create a Supabase Project**:
   - Go to [https://database.new](https://database.new) and create a free project.
   - Choose your preferred region (e.g., India - Mumbai `ap-south-1`).

2. **Run the SQL Scripts**:
   - In your Supabase Dashboard, open the **SQL Editor** tab.
   - Run the scripts in the following order:
     1. [`supabase/schema.sql`](file:///d:/github%20apps/ZPHS%20Vadada/supabase/schema.sql) — Creates tables, enums, triggers, and trigram indexes.
     2. [`supabase/policies.sql`](file:///d:/github%20apps/ZPHS%20Vadada/supabase/policies.sql) — Configures Row Level Security (RLS).
     3. [`supabase/seed.sql`](file:///d:/github%20apps/ZPHS%20Vadada/supabase/seed.sql) — Seeds 10 verified student records, official notices, gallery media, and school profile.

3. **Configure Environment Variables**:
   - In Supabase Dashboard, navigate to **Project Settings > API**.
   - Copy `Project URL` and `Project API keys > anon public`.
   - In your local project directory, create a `.env` file:
     ```bash
     VITE_SUPABASE_URL=https://your-project-id.supabase.co
     VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

4. **Restart Vite Server**:
   ```bash
   npm run dev
   ```

---

## 4. Built-In Offline & Demo Fallback

If `VITE_SUPABASE_URL` is not yet configured, the application automatically runs on a **high-fidelity persistent local store** that mirrors PostgreSQL behavior, allowing full CRUD operations, multi-criteria searches, and role-based permissions immediately without setup friction.

### Default Admin & Staff Credentials (with 1-Click Demo Login)

| Role | Email | Password | Permissions |
|---|---|---|---|
| **Headmaster (Admin)** | `admin@zphs-vadada.edu.in` | `Password@123` | Full control (Add, Edit, Delete, CMS, Settings) |
| **Record Clerk (Staff)** | `staff@zphs-vadada.edu.in` | `Password@123` | Student records add & edit, ticket review |
