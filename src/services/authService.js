import { supabase, isSupabaseConfigured } from './supabaseClient.js';

const AUTH_STORAGE_KEY = 'zphs_auth_session';

// Built-in verified demo accounts for institutional testing
export const DEMO_USERS = [
  {
    email: 'admin@zphs-vadada.edu.in',
    password: 'Password@123',
    fullName: 'Sri K. Nageswara Rao',
    role: 'admin',
    designation: 'Headmaster / Principal'
  },
  {
    email: 'staff@zphs-vadada.edu.in',
    password: 'Password@123',
    fullName: 'M. Venkata Ramana',
    role: 'staff',
    designation: 'Senior Record Assistant / Data Clerk'
  }
];

class AuthService {
  constructor() {
    this.currentUser = this.loadLocalSession();
    this.listeners = [];

    if (isSupabaseConfigured && supabase) {
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          // Fetch role from profiles table
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          this.currentUser = {
            id: session.user.id,
            email: session.user.email,
            fullName: profile?.full_name || session.user.email,
            role: profile?.role || 'staff',
            designation: profile?.designation || 'Staff Member'
          };
        } else {
          this.currentUser = null;
        }
        this.saveLocalSession(this.currentUser);
        this.notifyListeners();
      });
    }
  }

  loadLocalSession() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
      }
      return null;
    } catch {
      return null;
    }
  }

  saveLocalSession(user) {
    try {
      if (typeof localStorage !== 'undefined') {
        if (user) {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }
    } catch (err) {
      console.warn('Session save error:', err);
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return Boolean(this.currentUser);
  }

  isAdmin() {
    return this.currentUser?.role === 'admin';
  }

  isStaff() {
    return this.currentUser?.role === 'staff' || this.currentUser?.role === 'admin';
  }

  async login(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    const demo = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    // 1. If Supabase Auth is configured, attempt authentication
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password
        });

        if (!error && data?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          this.currentUser = {
            id: data.user.id,
            email: data.user.email,
            fullName: profile?.full_name || demo?.fullName || data.user.email,
            role: profile?.role || demo?.role || 'staff',
            designation: profile?.designation || demo?.designation || 'Staff Member'
          };

          this.saveLocalSession(this.currentUser);
          this.notifyListeners();
          return this.currentUser;
        }

        // If not a demo user, throw the Supabase error
        if (!demo) {
          throw new Error(error?.message || 'Invalid login credentials.');
        }
      } catch (err) {
        if (!demo) {
          throw err;
        }
        console.warn('Supabase Auth note for demo account:', err.message);
      }
    }

    // 2. Verified Demo Account Fallback (admin@zphs-vadada.edu.in / Password@123 or staff@zphs-vadada.edu.in)
    if (demo) {
      this.currentUser = {
        id: `usr-${demo.role}-01`,
        email: demo.email,
        fullName: demo.fullName,
        role: demo.role,
        designation: demo.designation
      };

      this.saveLocalSession(this.currentUser);
      this.notifyListeners();
      return this.currentUser;
    }

    throw new Error('Invalid email or password. Please use registered school credentials.');
  }

  async logout() {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    this.currentUser = null;
    this.saveLocalSession(null);
    this.notifyListeners();
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  notifyListeners() {
    this.listeners.forEach((cb) => cb(this.currentUser));
  }
}

export const authService = new AuthService();
