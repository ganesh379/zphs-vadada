import React, { useState, useEffect } from 'react';
import { SearchFilterCard } from './SearchFilterCard';
import { ResultsSkeleton } from './ResultsSkeleton';
import { ResultsEmpty } from './ResultsEmpty';
import { ResultsList } from './ResultsList';
import { StudentDetailCard } from './StudentDetailCard';
import { CorrectionModal } from './CorrectionModal';
import { dbService } from '../../services/dbService';
import { ShieldCheck, UserCheck } from 'lucide-react';

export function RecordSearchPortal({
  t,
  lang,
  dataVersion = 0,
  onContactSchoolClick
}) {
  // State machine: 'LOADING' | 'EMPTY' | 'MULTIPLE' | 'DETAIL'
  const [viewState, setViewState] = useState('LOADING');
  const [allRecords, setAllRecords] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Correction Modal
  const [isCorrectionOpen, setIsCorrectionOpen] = useState(false);
  const [correctionTargetStudent, setCorrectionTargetStudent] = useState(null);

  // Load initial student database
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setViewState('LOADING');
      try {
        const students = await dbService.getStudents();
        if (isMounted) {
          setAllRecords(students);
          setSearchResults(students);
          setViewState(students.length > 0 ? 'MULTIPLE' : 'EMPTY');
        }
      } catch (err) {
        console.error('Error fetching students from DB:', err);
        if (isMounted) {
          setViewState('EMPTY');
        }
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, [dataVersion]);

  // Search Executor: Name (full or part) + Date of Birth + Pass-Out Year + Class (optional)
  const handleExecuteSearch = async ({ nameQuery, dateOfBirth, passOutYear, selectedClass }) => {
    setViewState('LOADING');

    try {
      const filtered = await dbService.searchStudents({
        nameQuery,
        dateOfBirth,
        passOutYear,
        selectedClass
      });

      setSearchResults(filtered);

      if (filtered.length === 0) {
        setViewState('EMPTY');
      } else if (filtered.length === 1) {
        setSelectedStudent(filtered[0]);
        setViewState('DETAIL');
      } else {
        setViewState('MULTIPLE');
      }
    } catch (err) {
      console.error('Search query failed:', err);
      setViewState('EMPTY');
    }
  };

  const handleClear = () => {
    setViewState('MULTIPLE');
    setSearchResults(allRecords);
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
