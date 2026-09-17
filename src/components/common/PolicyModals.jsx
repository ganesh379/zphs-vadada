import React from 'react';
import { Modal } from './Modal';
import { ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export function PolicyModals({
  privacyOpen,
  termsOpen,
  onClosePrivacy,
  onCloseTerms,
  lang
}) {
  return (
    <>
      {/* Privacy Policy Modal */}
      <Modal
        isOpen={privacyOpen}
        onClose={onClosePrivacy}
        title={
          <div className="flex items-center space-x-2 text-white">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>{lang === 'en' ? "Privacy & Student Data Protection Policy" : "విద్యార్థి డేటా గోప్యతా విధానం"}</span>
          </div>
        }
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 font-semibold text-xs">
            ZPHS Vadada (Zilla Parishad High School) adheres to the Andhra Pradesh School Education Digital Governance and Data Privacy Framework.
          </div>

          <h4 className="font-bold text-slate-900 text-sm">1. Scope of Digitized Records</h4>
          <p>
            This website provides a digitized search interface for alumni historical records transcribed from the school's physical General Registers and Secondary School Certificate (SSC) registers from the year of establishment onwards.
          </p>

          <h4 className="font-bold text-slate-900 text-sm">2. Non-Disclosure & Data Masking</h4>
          <p>
            To prevent unauthorized harvesting, identity theft, or bulk data downloading:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Public browsing of the complete alumni ledger is strictly prohibited.</li>
            <li>Mobile numbers, complete admission numbers, residential addresses, and parents' contact details are permanently masked in public views.</li>
            <li>Searching via mobile number requires two-factor verification (OTP simulation) prior to unlocking detailed profile data.</li>
          </ul>

          <h4 className="font-bold text-slate-900 text-sm">3. Verification & Corrections</h4>
          <p>
            Records presented on this prototype are for preliminary academic verification and authentication purposes. Any discrepancies can be reported using the official online "Request Correction" feature or in person at the Headmaster's office.
          </p>

          <h4 className="font-bold text-slate-900 text-sm">4. Prototype Demonstration Notice</h4>
          <p className="text-slate-500 italic">
            This prototype operates strictly with fictional sample data for functional demonstrations. No real citizen or student PII (Personally Identifiable Information) is stored or exposed.
          </p>

          <div className="pt-3 text-right">
            <button
              onClick={onClosePrivacy}
              className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-900"
            >
              I Understand
            </button>
          </div>
        </div>
      </Modal>

      {/* Terms of Use Modal */}
      <Modal
        isOpen={termsOpen}
        onClose={onCloseTerms}
        title={
          <div className="flex items-center space-x-2 text-white">
            <FileText className="w-5 h-5 text-amber-400" />
            <span>{lang === 'en' ? "Terms of Use & Record Access" : "వినియోగ నిబంధనలు"}</span>
          </div>
        }
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
          <h4 className="font-bold text-slate-900 text-sm">1. Authorized Usage</h4>
          <p>
            Users are permitted to search solely for their own student records, or for records of individuals for whom they have explicit written or familial consent. Automated scraping, robotic harvesting, or automated querying is strictly prohibited.
          </p>

          <h4 className="font-bold text-slate-900 text-sm">2. Legal Status of Digital Record Slips</h4>
          <p>
            The digital record verification slip generated on this portal serves as an archival finding aid and unofficial reference. For certified legal copies (such as original Transfer Certificates or Duplicate Marks Memos), formal application must be submitted to the Board of Secondary Education, Andhra Pradesh (BSEAP) or through the school office with requisite headmaster counter-signatures.
          </p>

          <h4 className="font-bold text-slate-900 text-sm">3. Correction Requests</h4>
          <p>
            Submission of a correction request does not immediately alter official records. Changes are executed only after physical verification of original primary school ledgers, school inspection registers, and submission of supporting government documentation (Aadhaar, Gazette notification, or Birth Certificate).
          </p>

          <div className="pt-3 text-right">
            <button
              onClick={onCloseTerms}
              className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-900"
            >
              Accept & Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
