import React, { useState } from 'react';
import { SearchFilterCard } from './SearchFilterCard';
import { ResultsInitial } from './ResultsInitial';
import { ResultsSkeleton } from './ResultsSkeleton';
import { ResultsEmpty } from './ResultsEmpty';
import { ResultsList } from './ResultsList';
import { StudentDetailCard } from './StudentDetailCard';
import { CorrectionModal } from './CorrectionModal';
import { SAMPLE_STUDENTS } from '../../data/sampleStudents';
import { ShieldCheck, Sparkles, UserCheck } from 'lucide-react';

export function RecordSearchPortal({
  t,
  lang,
  onContactSchoolClick
}) {
  // State machine: 'INITIAL' | 'LOADING' | 'EMPTY' | 'MULTIPLE' | 'DETAIL'
  const [viewState, setViewState] = useState('INITIAL');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Correction Modal
  const [isCorrectionOpen, setIsCorrectionOpen] = useState(false);
  const [correctionTargetStudent, setCorrectionTargetStudent] = useState(null);

  // Search Executor: Name (full or part) + Date of Birth + Pass-Out Year + Class (optional)
  const handleExecuteSearch = ({ nameQuery, dateOfBirth, passOutYear, selectedClass }) => {
    setViewState('LOADING');

    // Simulate search query latency (500ms)
    setTimeout(() => {
      let filtered = [...SAMPLE_STUDENTS];

      // 1. Filter by Name (full name or any part of name)
      if (nameQuery && nameQuery.trim()) {
        const cleanQuery = nameQuery.toLowerCase().trim();
        filtered = filtered.filter((s) =>
          s.fullName.toLowerCase().includes(cleanQuery) ||
          s.firstName.toLowerCase().includes(cleanQuery) ||
          s.lastName.toLowerCase().includes(cleanQuery)
        );
      }

      // 2. Filter by Date of Birth (DOB)
      if (dateOfBirth) {
        filtered = filtered.filter((s) => s.dateOfBirth === dateOfBirth);
      }

      // 3. Filter by Pass-Out Year
      if (passOutYear) {
        filtered = filtered.filter((s) => s.passOutYear === parseInt(passOutYear, 10));
      }

      // 4. Filter by Class (optional)
      if (selectedClass && selectedClass !== 'All') {
        filtered = filtered.filter((s) => s.classStudied === selectedClass);
      }

      setSearchResults(filtered);

      if (filtered.length === 0) {
        setViewState('EMPTY');
      } else if (filtered.length === 1) {
        setSelectedStudent(filtered[0]);
        setViewState('DETAIL');
      } else {
        setViewState('MULTIPLE');
      }
    }, 550);
  };

  const handleClear = () => {
    setViewState('INITIAL');
    setSearchResults([]);
    setSelectedStudent(null);
  };

  const handleSelectRecord = (student) => {
    setSelectedStudent(student);
    setViewState('DETAIL');
  };

  const handleOpenCorrection = (student = null) => {
    setCorrectionTargetStudent(student || selectedStudent);
    setIsCorrectionOpen(true);
  };

  const handleModifySearch = () => {
    const el = document.getElementById('search-portal');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="space-y-6">
      
      {/* Search Input Card */}
      <SearchFilterCard
        t={t}
        lang={lang}
        onSearch={handleExecuteSearch}
        onClear={handleClear}
        isLoading={viewState === 'LOADING'}
      />

      {/* Dynamic Results Area */}
      <div className="pt-2">
        {viewState === 'INITIAL' && (
          <ResultsInitial t={t} lang={lang} />
        )}

        {viewState === 'LOADING' && (
          <ResultsSkeleton t={t} lang={lang} />
        )}

        {viewState === 'EMPTY' && (
          <ResultsEmpty
            t={t}
            lang={lang}
            onModifySearch={handleModifySearch}
            onContactSchool={onContactSchoolClick}
          />
        )}

        {viewState === 'MULTIPLE' && (
          <ResultsList
            records={searchResults}
            t={t}
            lang={lang}
            onSelectRecord={handleSelectRecord}
          />
        )}

        {viewState === 'DETAIL' && selectedStudent && (
          <StudentDetailCard
            student={selectedStudent}
            t={t}
            lang={lang}
            onBack={() => {
              if (searchResults.length > 1) {
                setViewState('MULTIPLE');
              } else {
                setViewState('INITIAL');
              }
            }}
            onRequestCorrection={handleOpenCorrection}
            onContactSchool={onContactSchoolClick}
          />
        )}
      </div>

      {/* Demo Test Scenarios Helper Ribbon */}
      <div className="bg-slate-100 rounded-xl p-4 sm:p-5 border border-slate-200 text-xs text-slate-700 space-y-3">
        <div className="flex items-center space-x-2 text-emerald-900 font-bold">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Quick Prototype Test Matrix (Name + Date of Birth + Pass-Out Year)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={() => handleExecuteSearch({
              nameQuery: 'Lakshmi Devi',
              dateOfBirth: '1999-07-25',
              passOutYear: 2015,
              selectedClass: 'Class 10'
            })}
            className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-600 text-left transition-colors shadow-2xs group"
          >
            <span className="font-bold text-slate-900 group-hover:text-emerald-800 block">1. Full Name + DOB Match</span>
            <span className="text-[11px] text-slate-500">"Lakshmi Devi" • DOB: 25-Jul-1999 • 2015</span>
          </button>

          <button
            type="button"
            onClick={() => handleExecuteSearch({
              nameQuery: 'Suresh',
              dateOfBirth: '2002-04-18',
              passOutYear: 2018,
              selectedClass: 'All'
            })}
            className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-600 text-left transition-colors shadow-2xs group"
          >
            <span className="font-bold text-slate-900 group-hover:text-emerald-800 block">2. Part of Name + DOB</span>
            <span className="text-[11px] text-slate-500">"Suresh" • DOB: 18-Apr-2002 • 2018</span>
          </button>

          <button
            type="button"
            onClick={() => handleExecuteSearch({
              nameQuery: 'Vaddadi',
              dateOfBirth: '',
              passOutYear: 2018,
              selectedClass: 'All'
            })}
            className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-600 text-left transition-colors shadow-2xs group"
          >
            <span className="font-bold text-slate-900 group-hover:text-emerald-800 block">3. Surname / Part of Name</span>
            <span className="text-[11px] text-slate-500">Surname: "Vaddadi" • Year: 2018</span>
          </button>

          <button
            type="button"
            onClick={() => handleExecuteSearch({
              nameQuery: 'Unknown Student',
              dateOfBirth: '2000-01-01',
              passOutYear: 2020,
              selectedClass: 'All'
            })}
            className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-amber-600 text-left transition-colors shadow-2xs group"
          >
            <span className="font-bold text-slate-900 group-hover:text-amber-800 block">4. No-Results State</span>
            <span className="text-[11px] text-slate-500">Tests 0 matching records checklist</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200">
          <span>* Search secured with student full/partial name, DOB, and pass-out year authentication.</span>
          <span className="text-emerald-800 font-semibold font-mono">10 Sample Alumni Records Indexed</span>
        </div>
      </div>

      {/* Correction Request Modal */}
      <CorrectionModal
        isOpen={isCorrectionOpen}
        onClose={() => {
          setIsCorrectionOpen(false);
          setCorrectionTargetStudent(null);
        }}
        student={correctionTargetStudent}
        t={t}
        lang={lang}
      />

    </section>
  );
}
