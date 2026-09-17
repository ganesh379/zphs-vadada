import { supabase, isSupabaseConfigured } from './supabaseClient';

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
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  saveLocalSession(user) {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
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

    // 1. Try Supabase Auth if configured
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });

      if (error) {
        throw new Error(error.message);
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      this.currentUser = {
        id: data.user.id,
        email: data.user.email,
        fullName: profile?.full_name || data.user.email,
        role: profile?.role || 'staff',
        designation: profile?.designation || 'Staff Member'
      };

      this.saveLocalSession(this.currentUser);
      this.notifyListeners();
      return this.currentUser;
    }

    // 2. Local Demo fallback authentication
    const demo = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (!demo) {
      throw new Error('Invalid email or password. Please use registered school credentials.');
    }

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
