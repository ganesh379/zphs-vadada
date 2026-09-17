import { supabase, isSupabaseConfigured } from './supabaseClient';
import { SAMPLE_STUDENTS } from '../data/sampleStudents';
import { SCHOOL_INFO } from '../data/schoolData';
import { authService } from './authService';

const STUDENTS_STORAGE_KEY = 'zphs_students_db';
const ANNOUNCEMENTS_STORAGE_KEY = 'zphs_announcements_db';
const GALLERY_STORAGE_KEY = 'zphs_gallery_db';
const SETTINGS_STORAGE_KEY = 'zphs_settings_db';
const CORRECTIONS_STORAGE_KEY = 'zphs_corrections_db';

class DbService {
  constructor() {
    this.initLocalStore();
  }

  // Initialize local persistent store if empty or outdated
  initLocalStore() {
    const existing = this.getLocal(STUDENTS_STORAGE_KEY);
    if (!existing || existing.length < SAMPLE_STUDENTS.length) {
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(SAMPLE_STUDENTS));
    }
    if (!localStorage.getItem(ANNOUNCEMENTS_STORAGE_KEY)) {
      localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(SCHOOL_INFO.announcements || []));
    }
    if (!localStorage.getItem(GALLERY_STORAGE_KEY)) {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(SCHOOL_INFO.gallery || []));
    }
    if (!localStorage.getItem(SETTINGS_STORAGE_KEY)) {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({
        school_profile: {
          name: SCHOOL_INFO.name,
          teluguName: SCHOOL_INFO.teluguName,
          fullName: SCHOOL_INFO.fullName,
          tagline: SCHOOL_INFO.tagline,
          taglineTelugu: SCHOOL_INFO.taglineTelugu,
          estdYear: SCHOOL_INFO.estdYear,
          totalStudents: SCHOOL_INFO.totalStudents,
          teachingStaff: SCHOOL_INFO.teachingStaff,
          alumniRecordsAvailable: SCHOOL_INFO.alumniRecordsAvailable
        },
        principal: SCHOOL_INFO.principal,
        contact: SCHOOL_INFO.contact
      }));
    }
    if (!localStorage.getItem(CORRECTIONS_STORAGE_KEY)) {
      localStorage.setItem(CORRECTIONS_STORAGE_KEY, JSON.stringify([]));
    }
  }

  // Helper to read local JSON
  getLocal(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  setLocal(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // ============================================================================
  // STUDENTS CRUD
  // ============================================================================

  async getStudents() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .order('pass_out_year', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map(this.normalizeStudent);
        }
        if (error) {
          console.warn('Supabase query note:', error.message);
        }
      } catch (err) {
        console.warn('Supabase connection note:', err);
      }
    }
    return this.getLocal(STUDENTS_STORAGE_KEY);
  }

  async searchStudents({ nameQuery, dateOfBirth, passOutYear, selectedClass, mobileNumber }) {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('students').select('*');

        if (nameQuery && nameQuery.trim()) {
          query = query.ilike('full_name', `%${nameQuery.trim()}%`);
        }
        if (dateOfBirth) {
          query = query.eq('date_of_birth', dateOfBirth);
        }
        if (passOutYear) {
          query = query.eq('pass_out_year', parseInt(passOutYear, 10));
        }
        if (selectedClass && selectedClass !== 'All') {
          query = query.eq('class_studied', selectedClass);
        }
        if (mobileNumber && mobileNumber.trim()) {
          query = query.eq('mobile_number', mobileNumber.trim());
        }

        const { data, error } = await query.order('pass_out_year', { ascending: false });
        if (!error && data) {
          return data.map(this.normalizeStudent);
        }
        if (error) {
          console.warn('Supabase searchStudents note:', error.message);
        }
      } catch (err) {
        console.warn('Supabase search error:', err);
      }
    }

    // Local filter implementation
    let list = this.getLocal(STUDENTS_STORAGE_KEY);

    if (nameQuery && nameQuery.trim()) {
      const q = nameQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.fullName.toLowerCase().includes(q) ||
          s.firstName.toLowerCase().includes(q) ||
          s.lastName.toLowerCase().includes(q)
      );
    }
    if (dateOfBirth) {
      list = list.filter((s) => s.dateOfBirth === dateOfBirth);
    }
    if (passOutYear) {
      list = list.filter((s) => s.passOutYear === parseInt(passOutYear, 10));
    }
    if (selectedClass && selectedClass !== 'All') {
      list = list.filter((s) => s.classStudied === selectedClass);
    }
    if (mobileNumber && mobileNumber.trim()) {
      list = list.filter((s) => s.mobileNumber === mobileNumber.trim());
    }

    return list;
  }

  async addStudent(studentData) {
    if (!authService.isStaff()) {
      throw new Error('Unauthorized: Staff or Admin permissions required to add student records.');
    }

    const newStudent = {
      ...studentData,
      id: studentData.id || `std-${Date.now()}`,
      fullName: studentData.fullName || `${studentData.firstName} ${studentData.lastName}`,
      recordStatus: studentData.recordStatus || 'Verified',
      conduct: studentData.conduct || 'Exemplary',
      medium: studentData.medium || 'Telugu / English'
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('students')
        .insert([{
          admission_number: newStudent.admissionNumber,
          roll_number: newStudent.rollNumber,
          first_name: newStudent.firstName,
          last_name: newStudent.lastName,
          full_name: newStudent.fullName,
          father_name: newStudent.fatherName,
          mother_name: newStudent.motherName,
          date_of_birth: newStudent.dateOfBirth,
          formatted_dob: newStudent.formattedDob || newStudent.dateOfBirth,
          pass_out_year: parseInt(newStudent.passOutYear, 10),
          class_studied: newStudent.classStudied,
          mobile_number: newStudent.mobileNumber,
          medium: newStudent.medium,
          conduct: newStudent.conduct,
          record_status: newStudent.recordStatus
        }])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return this.normalizeStudent(data);
    }

    const list = this.getLocal(STUDENTS_STORAGE_KEY);
    list.unshift(newStudent);
    this.setLocal(STUDENTS_STORAGE_KEY, list);
    return newStudent;
  }

  async updateStudent(id, studentData) {
    if (!authService.isStaff()) {
      throw new Error('Unauthorized: Staff or Admin permissions required to update student records.');
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('students')
        .update({
          admission_number: studentData.admissionNumber,
          roll_number: studentData.rollNumber,
          first_name: studentData.firstName,
          last_name: studentData.lastName,
          full_name: studentData.fullName || `${studentData.firstName} ${studentData.lastName}`,
          father_name: studentData.fatherName,
          mother_name: studentData.motherName,
          date_of_birth: studentData.dateOfBirth,
          formatted_dob: studentData.formattedDob || studentData.dateOfBirth,
          pass_out_year: parseInt(studentData.passOutYear, 10),
          class_studied: studentData.classStudied,
          mobile_number: studentData.mobileNumber,
          medium: studentData.medium,
          conduct: studentData.conduct,
          record_status: studentData.recordStatus
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return this.normalizeStudent(data);
    }

    const list = this.getLocal(STUDENTS_STORAGE_KEY);
    const index = list.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Student record not found');
    list[index] = { ...list[index], ...studentData };
    this.setLocal(STUDENTS_STORAGE_KEY, list);
    return list[index];
  }

  async deleteStudent(id) {
    if (!authService.isAdmin()) {
      throw new Error('Unauthorized: Only Admin (Headmaster) can delete student records.');
    }

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('students').delete().eq('id', id);
      if (error) throw new Error(error.message);
      return true;
    }

    const list = this.getLocal(STUDENTS_STORAGE_KEY).filter((s) => s.id !== id);
    this.setLocal(STUDENTS_STORAGE_KEY, list);
    return true;
  }

  normalizeStudent(row) {
    return {
      id: row.id,
      admissionNumber: row.admission_number || row.admissionNumber,
      rollNumber: row.roll_number || row.rollNumber,
      firstName: row.first_name || row.firstName,
      lastName: row.last_name || row.lastName,
      fullName: row.full_name || row.fullName,
      fatherName: row.father_name || row.fatherName,
      motherName: row.mother_name || row.motherName,
      dateOfBirth: row.date_of_birth || row.dateOfBirth,
      formattedDob: row.formatted_dob || row.formattedDob,
      passOutYear: row.pass_out_year || row.passOutYear,
      classStudied: row.class_studied || row.classStudied,
      mobileNumber: row.mobile_number || row.mobileNumber,
      medium: row.medium,
      conduct: row.conduct,
      recordStatus: row.record_status || row.recordStatus
    };
  }

  // ============================================================================
  // ANNOUNCEMENTS CRUD
  // ============================================================================

  async getAnnouncements() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) return data;
        if (error) console.warn('Supabase announcements note:', error.message);
      } catch (err) {
        console.warn('Supabase announcements error:', err);
      }
    }
    return this.getLocal(ANNOUNCEMENTS_STORAGE_KEY);
  }

  async addAnnouncement(item) {
    if (!authService.isAdmin()) {
      throw new Error('Unauthorized: Only Admin can publish announcements.');
    }
    const newItem = {
      ...item,
      id: `ann-${Date.now()}`,
      isActive: true,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('announcements')
          .insert([{
            title: newItem.title,
            title_te: newItem.title_te,
            date: newItem.date,
            category: newItem.category,
            is_important: newItem.is_important || false,
            target_link: newItem.target_link || '#about',
            is_active: true
          }])
          .select()
          .single();

        if (!error && data) {
          const list = this.getLocal(ANNOUNCEMENTS_STORAGE_KEY);
          list.unshift(data);
          this.setLocal(ANNOUNCEMENTS_STORAGE_KEY, list);
          return data;
        }
        console.warn('Supabase addAnnouncement note:', error?.message);
      } catch (err) {
        console.warn('Supabase addAnnouncement error:', err);
      }
    }

    const list = this.getLocal(ANNOUNCEMENTS_STORAGE_KEY);
    list.unshift(newItem);
    this.setLocal(ANNOUNCEMENTS_STORAGE_KEY, list);
    return newItem;
  }

  async deleteAnnouncement(id) {
    if (!authService.isAdmin()) {
      throw new Error('Unauthorized: Only Admin can delete announcements.');
    }
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('announcements').delete().eq('id', id);
        if (error) console.warn('Supabase deleteAnnouncement note:', error.message);
      } catch (err) {
        console.warn('Supabase delete error:', err);
      }
    }
    const list = this.getLocal(ANNOUNCEMENTS_STORAGE_KEY).filter((a) => a.id !== id);
    this.setLocal(ANNOUNCEMENTS_STORAGE_KEY, list);
    return true;
  }

  // ============================================================================
  // GALLERY CRUD
  // ============================================================================

  async getGallery() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) return data;
        if (error) console.warn('Supabase gallery note:', error.message);
      } catch (err) {
        console.warn('Supabase gallery error:', err);
      }
    }
    return this.getLocal(GALLERY_STORAGE_KEY);
  }

  async addGalleryItem(item) {
    if (!authService.isAdmin()) {
      throw new Error('Unauthorized: Only Admin can add gallery photos.');
    }
    const newItem = {
      ...item,
      id: `gal-${Date.now()}`
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('gallery')
        .insert([{
          title: newItem.title,
          category: newItem.category,
          caption: newItem.caption,
          caption_te: newItem.caption_te,
          tag: newItem.tag,
          image_url: newItem.image,
          display_order: newItem.display_order || 99,
          is_active: true
        }])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    }

    const list = this.getLocal(GALLERY_STORAGE_KEY);
    list.push(newItem);
    this.setLocal(GALLERY_STORAGE_KEY, list);
    return newItem;
  }

  async deleteGalleryItem(id) {
    if (!authService.isAdmin()) {
      throw new Error('Unauthorized: Only Admin can delete gallery photos.');
    }
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) throw new Error(error.message);
      return true;
    }
    const list = this.getLocal(GALLERY_STORAGE_KEY).filter((g) => g.id !== id);
    this.setLocal(GALLERY_STORAGE_KEY, list);
    return true;
  }

  // ============================================================================
  // SCHOOL SETTINGS
  // ============================================================================

  async getSchoolSettings() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('school_settings').select('*');
        if (!error && data && data.length > 0) {
          const settings = {};
          data.forEach((row) => {
            settings[row.key] = row.value;
          });
          return settings;
        }
        if (error) console.warn('Supabase settings note:', error.message);
      } catch (err) {
        console.warn('Supabase settings error:', err);
      }
    }
    try {
      const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  async updateSchoolSettings(key, value) {
    if (!authService.isAdmin()) {
      throw new Error('Unauthorized: Only Admin can modify school settings.');
    }
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('school_settings')
          .upsert({ key, value, updated_at: new Date().toISOString() });
        if (error) console.warn('Supabase updateSchoolSettings note:', error.message);
      } catch (err) {
        console.warn('Supabase update settings error:', err);
      }
    }
    const current = await this.getSchoolSettings();
    current[key] = value;
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(current));
    return true;
  }

  // ============================================================================
  // CORRECTION REQUESTS
  // ============================================================================

  async getCorrectionRequests() {
    if (!authService.isStaff()) {
      throw new Error('Unauthorized: Staff access required to view tickets.');
    }
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('correction_requests')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data;
        if (error) console.warn('Supabase correction_requests note:', error.message);
      } catch (err) {
        console.warn('Supabase corrections error:', err);
      }
    }
    return this.getLocal(CORRECTIONS_STORAGE_KEY);
  }

  async submitCorrectionRequest(ticket) {
    const newTicket = {
      ...ticket,
      id: `req-${Date.now()}`,
      status: 'Pending Review',
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('correction_requests')
          .insert([{
            tracking_ref: newTicket.trackingRef,
            student_name: newTicket.studentName,
            admission_number: newTicket.admissionNumber,
            applicant_mobile: newTicket.applicantMobile,
            discrepancy_desc: newTicket.discrepancyDesc,
            status: 'Pending Review'
          }])
          .select()
          .single();
        if (!error && data) {
          const list = this.getLocal(CORRECTIONS_STORAGE_KEY);
          list.unshift(data);
          this.setLocal(CORRECTIONS_STORAGE_KEY, list);
          return data;
        }
        console.warn('Supabase submitCorrectionRequest note:', error?.message);
      } catch (err) {
        console.warn('Supabase submit ticket error:', err);
      }
    }

    const list = this.getLocal(CORRECTIONS_STORAGE_KEY);
    list.unshift(newTicket);
    this.setLocal(CORRECTIONS_STORAGE_KEY, list);
    return newTicket;
  }

  async updateCorrectionStatus(id, status, adminNotes = '') {
    if (!authService.isAdmin()) {
      throw new Error('Unauthorized: Only Admin can approve/reject correction tickets.');
    }
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('correction_requests')
        .update({ status, admin_notes: adminNotes, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw new Error(error.message);
      return true;
    }
    const list = this.getLocal(CORRECTIONS_STORAGE_KEY);
    const item = list.find((c) => c.id === id);
    if (item) {
      item.status = status;
      item.adminNotes = adminNotes;
      this.setLocal(CORRECTIONS_STORAGE_KEY, list);
    }
    return true;
  }
}

export const dbService = new DbService();
