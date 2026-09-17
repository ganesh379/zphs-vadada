import React, { useState, useEffect } from 'react';
import { X, User, Save, AlertCircle, Calendar, Phone, Award, BookOpen } from 'lucide-react';

export function StudentFormModal({ isOpen, onClose, student, onSave }) {
  const isEditing = Boolean(student);

  const [formData, setFormData] = useState({
    admissionNumber: '',
    rollNumber: '',
    firstName: '',
    lastName: '',
    fullName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    passOutYear: new Date().getFullYear(),
    classStudied: 'Class 10',
    mobileNumber: '',
    medium: 'Telugu / English',
    conduct: 'Exemplary',
    recordStatus: 'Verified'
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({
        admissionNumber: student.admissionNumber || '',
        rollNumber: student.rollNumber || '',
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        fullName: student.fullName || '',
        fatherName: student.fatherName || '',
        motherName: student.motherName || '',
        dateOfBirth: student.dateOfBirth || '',
        passOutYear: student.passOutYear || 2024,
        classStudied: student.classStudied || 'Class 10',
        mobileNumber: student.mobileNumber || '',
        medium: student.medium || 'Telugu / English',
        conduct: student.conduct || 'Exemplary',
        recordStatus: student.recordStatus || 'Verified'
      });
    } else {
      const year = new Date().getFullYear();
      setFormData({
        admissionNumber: `ADM-${year}-${Math.floor(1000 + Math.random() * 9000)}`,
        rollNumber: `${year.toString().slice(-2)}${Math.floor(10 + Math.random() * 89)}`,
        firstName: '',
        lastName: '',
        fullName: '',
        fatherName: '',
        motherName: '',
        dateOfBirth: '',
        passOutYear: year,
        classStudied: 'Class 10',
        mobileNumber: '',
        medium: 'Telugu / English',
        conduct: 'Exemplary',
        recordStatus: 'Verified'
      });
    }
    setError('');
  }, [student, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'firstName' || field === 'lastName') {
        updated.fullName = `${updated.firstName} ${updated.lastName}`.trim();
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('First and last names are mandatory.');
      return;
    }
    if (!formData.dateOfBirth) {
      setError('Date of birth is required.');
      return;
    }
    if (!formData.admissionNumber.trim()) {
      setError('Admission number is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Calculate formatted DOB (e.g. 25-Jul-1999)
      const d = new Date(formData.dateOfBirth);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const formattedDob = isNaN(d.getTime()) 
        ? formData.dateOfBirth 
        : `${String(d.getDate()).padStart(2, '0')}-${months[d.getMonth()]}-${d.getFullYear()}`;

      await onSave({
        ...formData,
        formattedDob,
        passOutYear: parseInt(formData.passOutYear, 10)
      });
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Failed to save student record.');
    }
  };

  const years = [];
  for (let y = new Date().getFullYear(); y >= 1982; y--) {
    years.push(y);
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-scaleUp my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-linear-to-r from-emerald-900 to-slate-900 p-6 text-white flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">
              {isEditing ? 'Edit Former Student Record' : 'Register New Former Student'}
            </h3>
            <p className="text-xs text-emerald-200 mt-0.5">
              Historical Ledger Entry • ZPHS Vadada Archives
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Core Identification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admission Number *
              </label>
              <input
                type="text"
                required
                value={formData.admissionNumber}
                onChange={(e) => handleChange('admissionNumber', e.target.value)}
                placeholder="e.g., ADM-2015-0104"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Roll Number *
              </label>
              <input
                type="text"
                required
                value={formData.rollNumber}
                onChange={(e) => handleChange('rollNumber', e.target.value)}
                placeholder="e.g., 15104"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                First Name / Given Name *
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="e.g., Suresh Kumar"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Last Name / Surname *
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="e.g., Terli"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Parents */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Father's Name *
              </label>
              <input
                type="text"
                required
                value={formData.fatherName}
                onChange={(e) => handleChange('fatherName', e.target.value)}
                placeholder="e.g., T. Satyanarayana"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mother's Name *
              </label>
              <input
                type="text"
                required
                value={formData.motherName}
                onChange={(e) => handleChange('motherName', e.target.value)}
                placeholder="e.g., T. Ramanamma"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>
          </div>

          {/* DOB & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pass-Out Year *
              </label>
              <select
                value={formData.passOutYear}
                onChange={(e) => handleChange('passOutYear', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              >
                {years.map((yr) => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Class Studied
              </label>
              <select
                value={formData.classStudied}
                onChange={(e) => handleChange('classStudied', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              >
                <option value="Class 10">Class 10 (SSC)</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 6">Class 6</option>
              </select>
            </div>
          </div>

          {/* Contact, Medium & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Registered Mobile (Optional)
              </label>
              <input
                type="tel"
                maxLength={10}
                value={formData.mobileNumber}
                onChange={(e) => handleChange('mobileNumber', e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit number"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Medium of Instruction
              </label>
              <select
                value={formData.medium}
                onChange={(e) => handleChange('medium', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              >
                <option value="Telugu / English">Telugu / English</option>
                <option value="Telugu">Telugu Medium</option>
                <option value="English">English Medium</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ledger Status
              </label>
              <select
                value={formData.recordStatus}
                onChange={(e) => handleChange('recordStatus', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-bold"
              >
                <option value="Verified">Verified Official Record</option>
                <option value="Pending Verification">Pending Verification</option>
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold rounded-lg text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold rounded-lg shadow-md flex items-center space-x-1.5 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update Student' : 'Save Student Record'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
