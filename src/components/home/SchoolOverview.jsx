import React from 'react';
import { Calendar, Users, GraduationCap, Archive, Building2, CheckCircle } from 'lucide-react';
import { SCHOOL_INFO } from '../../data/schoolData';

export function SchoolOverview({ t, lang }) {
  const stats = [
    {
      id: 'estd',
      title: t.estdTitle,
      value: SCHOOL_INFO.estdYear,
      subtitle: lang === 'en' ? "Serving rural students since 1982" : "1982 నుండి నిరంతర విద్యా సేవ",
      icon: Calendar,
      color: "bg-emerald-50 text-emerald-800 border-emerald-200"
    },
    {
      id: 'students',
      title: t.totalStudentsTitle,
      value: SCHOOL_INFO.totalStudents,
      subtitle: lang === 'en' ? "Classes 6 to 10 co-educational" : "6 నుండి 10 తరగతుల విద్యార్థులు",
      icon: Users,
      color: "bg-blue-50 text-blue-800 border-blue-200"
    },
    {
      id: 'staff',
      title: t.staffTitle,
      value: SCHOOL_INFO.teachingStaff,
      subtitle: lang === 'en' ? "Qualified AP DSC appointed teachers" : "అర్హత గల ప్రభుత్వ ఉపాధ్యాయులు",
      icon: GraduationCap,
      color: "bg-amber-50 text-amber-800 border-amber-200"
    },
    {
      id: 'records',
      title: t.alumniTitle,
      value: SCHOOL_INFO.alumniRecordsAvailable,
      subtitle: lang === 'en' ? "Digitized alumni archive ledgers" : "డిజిటైజ్ చేసిన పూర్వ విద్యార్థి రికార్డులు",
      icon: Archive,
      color: "bg-teal-50 text-teal-800 border-teal-200"
    }
  ];

  return (
    <section id="about" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4 text-emerald-700" />
            <span>{lang === 'en' ? "Institutional Profile" : "పాఠశాల ప్రొఫైల్"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {lang === 'en' ? "School Overview & Key Statistics" : "పాఠశాల సారాంశం & గణాంకాలు"}
          </h2>
        </div>
        <p className="text-xs text-emerald-800 font-semibold mt-2 md:mt-0 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-center space-x-1">
          <span>{lang === 'en' ? "Verified Institutional Ledger" : "ధృవీకరించబడిన సంస్థాగత రికార్డులు"}</span>
        </p>
      </div>

      {/* Grid of 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                {item.title}
              </span>
              <div className={`p-2 rounded-lg border ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
            </div>
            
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {item.value}
            </div>
            
            <p className="text-xs text-slate-500 mt-1.5 leading-snug">
              {item.subtitle}
            </p>

            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center text-[10px] text-emerald-700 font-medium">
              <CheckCircle className="w-3 h-3 mr-1 text-emerald-600" />
              <span>Official School Record Metric</span>
            </div>
          </div>
        ))}
      </div>

      {/* School Highlights Brief */}
      <div className="bg-slate-100/80 rounded-xl p-5 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
        <p>
          <strong className="text-slate-900 font-semibold">
            {lang === 'en' ? "About ZPHS Vadada:" : "జడ్పీహెచ్ఎస్ వడద గురించి:"}
          </strong>{" "}
          {lang === 'en'
            ? "Established to serve the educational requirements of Vadada and surrounding rural habitations, Zilla Parishad High School Vadada delivers quality secondary education under the Andhra Pradesh State Syllabus. With upgraded digital classrooms, physical sciences and biological sciences laboratories, an expansive playground, and continuous remedial instruction, the school strives for all-round excellence."
            : "వడద మరియు చుట్టుపక్కల గ్రామాల విద్యార్థుల ఉన్నత విద్యావసరాలను తీర్చడానికి స్థాపించబడిన జడ్పీహెచ్ఎస్ వడద, నాణ్యమైన విద్యా బోధనతో పాటు డిజిటల్ తరగతి గదులు, ప్రయోగశాలలు, క్రీడా మైదానం వంటి అన్ని సదుపాయాలతో విద్యార్థుల సమగ్ర వికాసానికి కృషి చేస్తోంది."}
        </p>
      </div>
    </section>
  );
}
