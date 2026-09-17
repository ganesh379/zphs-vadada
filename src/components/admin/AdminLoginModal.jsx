import React, { useState } from 'react';
import { Shield, Lock, Mail, AlertCircle, CheckCircle2, User, Key, X, Sparkles } from 'lucide-react';
import { authService, DEMO_USERS } from '../../services/authService';

export function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await authService.login(email, password);
      setIsLoading(false);
      onLoginSuccess(user);
      onClose();
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Login failed. Please check credentials.');
    }
  };

  const handleDemoLogin = async (demoUser) => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    setError('');
    setIsLoading(true);

    try {
      const user = await authService.login(demoUser.email, demoUser.password);
      setIsLoading(false);
      onLoginSuccess(user);
      onClose();
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Login failed.');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-linear-to-r from-emerald-900 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Institutional Staff Portal</h3>
          <p className="text-xs text-emerald-200 mt-1">
            Sign in to access ZPHS Vadada CMS & Student Record Management
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Staff Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., admin@zphs-vadada.edu.in"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter authorized password"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold rounded-lg shadow-md transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <Key className="w-4 h-4 text-amber-300" />
                <span>Secure Log In</span>
              </>
            )}
          </button>

          {/* Quick Demo Access Credentials */}
          <div className="pt-3 border-t border-slate-200">
            <div className="flex items-center space-x-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Institutional 1-Click Demo Logins</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin(DEMO_USERS[0])}
                className="p-2.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-left transition-colors group"
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[11px] font-bold text-emerald-900">Headmaster</span>
                  <span className="text-[9px] bg-emerald-800 text-amber-300 px-1.5 py-0.2 rounded font-mono font-bold">ADMIN</span>
                </div>
                <span className="text-[10px] text-slate-600 block truncate">Full CMS & Student Records</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin(DEMO_USERS[1])}
                className="p-2.5 rounded-lg border border-blue-300 bg-blue-50 hover:bg-blue-100 text-left transition-colors group"
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[11px] font-bold text-blue-900">Record Clerk</span>
                  <span className="text-[9px] bg-blue-800 text-white px-1.5 py-0.2 rounded font-mono font-bold">STAFF</span>
                </div>
                <span className="text-[10px] text-slate-600 block truncate">Add / Edit Student Data</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
