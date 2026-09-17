import React, { useState } from 'react';
import { SearchFilterCard } from './SearchFilterCard';
import { ResultsSkeleton } from './ResultsSkeleton';
import { ResultsEmpty } from './ResultsEmpty';
import { ResultsList } from './ResultsList';
import { StudentDetailCard } from './StudentDetailCard';
import { CorrectionModal } from './CorrectionModal';
import { SAMPLE_STUDENTS } from '../../data/sampleStudents';
import { ShieldCheck, UserCheck } from 'lucide-react';

export function RecordSearchPortal({
  t,
  lang,
  onContactSchoolClick
}) {
  // State machine: 'LOADING' | 'EMPTY' | 'MULTIPLE' | 'DETAIL'
  const [viewState, setViewState] = useState('MULTIPLE');
  const [searchResults, setSearchResults] = useState(SAMPLE_STUDENTS);
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
    setViewState('MULTIPLE');
    setSearchResults(SAMPLE_STUDENTS);
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
              setViewState('MULTIPLE');
            }}
            onRequestCorrection={handleOpenCorrection}
            onContactSchool={onContactSchoolClick}
          />
        )}
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
