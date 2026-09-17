import React, { useState, useEffect } from 'react';
import { 
  Users, Bell, Image as ImageIcon, Settings, FileCheck, LogOut, 
  Plus, Search, Edit2, Trash2, Shield, Check, X, AlertTriangle, 
  ExternalLink, Save, RefreshCw, Eye
} from 'lucide-react';
import { dbService } from '../../services/dbService';
import { authService } from '../../services/authService';
import { StudentFormModal } from './StudentFormModal';

export function AdminDashboard({ isOpen, onClose, onDataChanged }) {
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [activeTab, setActiveTab] = useState('students');
  
  // Data states
  const [students, setStudents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [schoolSettings, setSchoolSettings] = useState({});
  const [corrections, setCorrections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Student Search / Filter inside CMS
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('All');
  const [filterYear, setFilterYear] = useState('All');

  // Modals inside CMS
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // New Announcement / Gallery item states
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnCategory, setNewAnnCategory] = useState('General');
  const [newAnnDate, setNewAnnDate] = useState('');
  const [newAnnImportant, setNewAnnImportant] = useState(false);

  const [newGalTitle, setNewGalTitle] = useState('');
  const [newGalCategory, setNewGalCategory] = useState('Campus');
  const [newGalCaption, setNewGalCaption] = useState('');
  const [newGalTag, setNewGalTag] = useState('');
  const [newGalUrl, setNewGalUrl] = useState('/gallery/campus_building.jpg');

  // Notification message
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const unsub = authService.subscribe((user) => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [stdData, annData, galData, settsData, corrData] = await Promise.all([
        dbService.getStudents(),
        dbService.getAnnouncements(),
        dbService.getGallery(),
        dbService.getSchoolSettings(),
        dbService.getCorrectionRequests()
      ]);
      setStudents(stdData);
      setAnnouncements(annData);
      setGallery(galData);
      setSchoolSettings(settsData);
      setCorrections(corrData);
    } catch (err) {
      showFeedback('error', err.message || 'Error loading records');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  if (!isOpen) return null;

  // Permissions
  const isAdmin = authService.isAdmin();
  const isStaff = authService.isStaff();

  // Filtered students in CMS
  const filteredStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || 
      s.fullName.toLowerCase().includes(q) ||
      s.admissionNumber.toLowerCase().includes(q) ||
      s.rollNumber.toLowerCase().includes(q) ||
      (s.mobileNumber && s.mobileNumber.includes(q));
    
    const matchesClass = filterClass === 'All' || s.classStudied === filterClass;
    const matchesYear = filterYear === 'All' || s.passOutYear.toString() === filterYear;

    return matchesQuery && matchesClass && matchesYear;
  });

  // Student Handlers
  const handleSaveStudent = async (studentData) => {
    try {
      if (editingStudent) {
        await dbService.updateStudent(editingStudent.id, studentData);
        showFeedback('success', `Student ${studentData.fullName} updated successfully.`);
      } else {
        await dbService.addStudent(studentData);
        showFeedback('success', `Student ${studentData.fullName} added successfully.`);
      }
      await loadAllData();
      if (onDataChanged) onDataChanged();
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  const handleDeleteStudent = async (student) => {
    if (!isAdmin) {
      showFeedback('error', 'Only Headmaster / Admin can delete student records.');
      return;
    }
    if (window.confirm(`Are you sure you want to permanently delete record for ${student.fullName} (${student.admissionNumber})?`)) {
      try {
        await dbService.deleteStudent(student.id);
        showFeedback('success', `Record deleted for ${student.fullName}.`);
        await loadAllData();
        if (onDataChanged) onDataChanged();
      } catch (err) {
        showFeedback('error', err.message);
      }
    }
  };

  // Announcement Handlers
  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    if (!newAnnTitle.trim()) return;
    try {
      await dbService.addAnnouncement({
        title: newAnnTitle,
        category: newAnnCategory,
        date: newAnnDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        is_important: newAnnImportant
      });
      setNewAnnTitle('');
      setNewAnnDate('');
      setNewAnnImportant(false);
      showFeedback('success', 'New announcement published successfully.');
      await loadAllData();
      if (onDataChanged) onDataChanged();
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!isAdmin) return;
    try {
      await dbService.deleteAnnouncement(id);
      showFeedback('success', 'Announcement removed.');
      await loadAllData();
      if (onDataChanged) onDataChanged();
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  // Gallery Handlers
  const handleAddGallery = async (e) => {
    e.preventDefault();
    if (!newGalTitle.trim()) return;
    try {
      await dbService.addGalleryItem({
        title: newGalTitle,
        category: newGalCategory,
        caption: newGalCaption,
        tag: newGalTag || `${newGalCategory} Facility`,
        image: newGalUrl
      });
      setNewGalTitle('');
      setNewGalCaption('');
      setNewGalTag('');
      showFeedback('success', 'Gallery facility item added.');
      await loadAllData();
      if (onDataChanged) onDataChanged();
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!isAdmin) return;
    try {
      await dbService.deleteGalleryItem(id);
      showFeedback('success', 'Photo item deleted.');
      await loadAllData();
      if (onDataChanged) onDataChanged();
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  // Correction Status Update
  const handleUpdateCorrection = async (id, status) => {
    try {
      await dbService.updateCorrectionStatus(id, status);
      showFeedback('success', `Ticket marked as ${status}.`);
      await loadAllData();
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-slate-50 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-300 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top App Bar */}
        <div className="bg-linear-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white px-6 py-4 flex items-center justify-between border-b border-emerald-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold">ZPHS Vadada CMS & Record Portal</h2>
                <span className={`px-2 py-0.2 rounded text-[10px] font-bold font-mono ${
                  isAdmin ? 'bg-amber-400 text-slate-950' : 'bg-blue-400 text-slate-950'
                }`}>
                  {currentUser?.role?.toUpperCase() || 'STAFF'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Logged in: <strong className="text-white">{currentUser?.fullName}</strong> ({currentUser?.designation})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                authService.logout();
                onClose();
              }}
              className="px-3 py-1.5 text-xs font-semibold bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800/50 rounded-lg flex items-center space-x-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`py-2 px-4 text-xs font-semibold text-center border-b ${
            feedback.type === 'error' 
              ? 'bg-red-500 text-white border-red-600' 
              : 'bg-emerald-600 text-white border-emerald-700'
          }`}>
            {feedback.message}
          </div>
        )}

        {/* CMS Navigation Tabs */}
        <div className="bg-white border-b border-slate-200 px-6 flex items-center space-x-1 sm:space-x-4 overflow-x-auto text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('students')}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 transition-colors ${
              activeTab === 'students' 
                ? 'border-emerald-700 text-emerald-900 font-extrabold' 
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Former Students ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 transition-colors ${
              activeTab === 'announcements' 
                ? 'border-emerald-700 text-emerald-900 font-extrabold' 
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Announcements ({announcements.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 transition-colors ${
              activeTab === 'gallery' 
                ? 'border-emerald-700 text-emerald-900 font-extrabold' 
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Campus Gallery ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('corrections')}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 transition-colors ${
              activeTab === 'corrections' 
                ? 'border-emerald-700 text-emerald-900 font-extrabold' 
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Correction Tickets ({corrections.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {/* ============================================================ */}
          {/* TAB 1: STUDENTS CMS */}
          {/* ============================================================ */}
          {activeTab === 'students' && (
            <div className="space-y-4">
              {/* Controls bar */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex-1 w-full flex flex-col sm:flex-row items-center gap-2">
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by Name, Mobile, Admission #, or Roll #..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>

                  <select
                    value={filterClass}
                    onChange={(e) => setFilterClass(e.target.value)}
                    className="w-full sm:w-36 px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-white font-medium"
                  >
                    <option value="All">All Classes</option>
                    <option value="Class 10">Class 10 (SSC)</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 6">Class 6</option>
                  </select>

                  <select
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="w-full sm:w-32 px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-white font-medium"
                  >
                    <option value="All">All Years</option>
                    {[2024, 2023, 2022, 2020, 2019, 2018, 2015, 2012, 2005, 1998, 1992].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
                  <button
                    onClick={() => {
                      setEditingStudent(null);
                      setStudentModalOpen(true);
                    }}
                    className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-xs flex items-center space-x-1.5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Register New Student</span>
                  </button>
                </div>
              </div>

              {/* Students Master Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Admission #</th>
                        <th className="py-3 px-4">Student Name</th>
                        <th className="py-3 px-4">Father / Mother</th>
                        <th className="py-3 px-4">DOB</th>
                        <th className="py-3 px-4">Batch</th>
                        <th className="py-3 px-4">Class</th>
                        <th className="py-3 px-4">Mobile</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="py-8 text-center text-slate-400">
                            No student records found matching filter.
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((s) => (
                          <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 font-mono font-semibold text-emerald-900">
                              {s.admissionNumber}
                            </td>
                            <td className="py-3 px-4 font-bold text-slate-900">
                              {s.fullName}
                            </td>
                            <td className="py-3 px-4 text-slate-600">
                              <div>{s.fatherName}</div>
                              <div className="text-[10px] text-slate-400">{s.motherName}</div>
                            </td>
                            <td className="py-3 px-4 font-mono text-slate-600">
                              {s.formattedDob || s.dateOfBirth}
                            </td>
                            <td className="py-3 px-4 font-bold text-slate-800">
                              {s.passOutYear}
                            </td>
                            <td className="py-3 px-4 text-slate-600">
                              {s.classStudied}
                            </td>
                            <td className="py-3 px-4 font-mono text-slate-600">
                              {s.mobileNumber || '—'}
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                {s.recordStatus}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end space-x-1">
                                <button
                                  onClick={() => {
                                    setEditingStudent(s);
                                    setStudentModalOpen(true);
                                  }}
                                  className="p-1 text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 rounded"
                                  title="Edit Student Record"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                {isAdmin && (
                                  <button
                                    onClick={() => handleDeleteStudent(s)}
                                    className="p-1 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded"
                                    title="Delete Student Record (Admin)"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: ANNOUNCEMENTS CMS */}
          {/* ============================================================ */}
          {activeTab === 'announcements' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add form */}
              {isAdmin ? (
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                    <Plus className="w-4 h-4 text-emerald-700" />
                    <span>Publish Announcement</span>
                  </h4>

                  <form onSubmit={handleAddAnnouncement} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Notice Title *</label>
                      <input
                        type="text"
                        required
                        value={newAnnTitle}
                        onChange={(e) => setNewAnnTitle(e.target.value)}
                        placeholder="e.g., Annual Alumni Meet 2026..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={newAnnCategory}
                        onChange={(e) => setNewAnnCategory(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="Academic Archive">Academic Archive</option>
                        <option value="Examination">Examination</option>
                        <option value="Alumni Welfare">Alumni Welfare</option>
                        <option value="General Notice">General Notice</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Notice Date</label>
                      <input
                        type="text"
                        value={newAnnDate}
                        onChange={(e) => setNewAnnDate(e.target.value)}
                        placeholder="e.g., March 20, 2026"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-1">
                      <input
                        type="checkbox"
                        id="ann-important"
                        checked={newAnnImportant}
                        onChange={(e) => setNewAnnImportant(e.target.checked)}
                        className="w-4 h-4 text-emerald-700 rounded border-slate-300"
                      />
                      <label htmlFor="ann-important" className="text-xs text-slate-700 font-semibold cursor-pointer">
                        Mark as High Priority / Important
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-sm"
                    >
                      Publish Announcement
                    </button>
                  </form>
                </div>
              ) : (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                  Staff role has read-only permission for school announcements. Headmaster Admin access required to publish or delete.
                </div>
              )}

              {/* Announcements List */}
              <div className="lg:col-span-2 space-y-3">
                <h4 className="font-bold text-sm text-slate-900">Active Circulars & Announcements</h4>
                {announcements.map((ann) => (
                  <div key={ann.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-3 shadow-2xs">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                          {ann.category}
                        </span>
                        <span className="text-[11px] text-slate-400">{ann.date}</span>
                        {ann.is_important && (
                          <span className="px-1.5 py-0.2 bg-amber-400 text-slate-950 font-bold text-[9px] rounded">
                            IMPORTANT
                          </span>
                        )}
                      </div>
                      <h5 className="text-sm font-bold text-slate-900">{ann.title}</h5>
                    </div>

                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteAnnouncement(ann.id)}
                        className="p-1 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded"
                        title="Delete Announcement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 3: GALLERY CMS */}
          {/* ============================================================ */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.map((g) => (
                  <div key={g.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="relative h-40 bg-slate-900">
                        <img src={g.image_url || g.image} alt={g.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-emerald-300 font-mono">
                          {g.category}
                        </span>
                      </div>
                      <div className="p-3.5 space-y-1">
                        <h5 className="text-xs font-bold text-slate-900 line-clamp-1">{g.title}</h5>
                        <p className="text-[11px] text-slate-600 line-clamp-2">{g.caption}</p>
                      </div>
                    </div>

                    {isAdmin && (
                      <div className="p-3 border-t border-slate-100 flex justify-end">
                        <button
                          onClick={() => handleDeleteGallery(g.id)}
                          className="text-[11px] text-red-600 hover:text-red-800 font-semibold flex items-center space-x-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Photo</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 4: CORRECTION TICKETS */}
          {/* ============================================================ */}
          {activeTab === 'corrections' && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900">Alumni Record Correction Submissions</h4>
              {corrections.length === 0 ? (
                <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500 text-xs">
                  No pending correction tickets submitted by alumni.
                </div>
              ) : (
                corrections.map((ticket) => (
                  <div key={ticket.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-emerald-900">
                          {ticket.trackingRef || ticket.tracking_ref}
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          {ticket.studentName || ticket.student_name}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ticket.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                        ticket.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-amber-100 text-amber-900'
                      }`}>
                        {ticket.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 bg-slate-50 p-2 rounded">
                      <strong>Discrepancy:</strong> {ticket.discrepancyDesc || ticket.discrepancy_desc}
                    </p>

                    {isAdmin && ticket.status === 'Pending Review' && (
                      <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => handleUpdateCorrection(ticket.id, 'Approved')}
                          className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold rounded"
                        >
                          Approve Request
                        </button>
                        <button
                          onClick={() => handleUpdateCorrection(ticket.id, 'Rejected')}
                          className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-bold rounded"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* Student Add / Edit Modal */}
        <StudentFormModal
          isOpen={studentModalOpen}
          onClose={() => {
            setStudentModalOpen(false);
            setEditingStudent(null);
          }}
          student={editingStudent}
          onSave={handleSaveStudent}
        />
      </div>
    </div>
  );
}
