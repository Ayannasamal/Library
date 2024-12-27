import { AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export class AuthService {
  static validateCredentials(credentials: LoginCredentials): ValidationResult {
    const errors: Record<string, string> = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    
    // Email validation
    if (!credentials.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(credentials.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!credentials.password) {
      errors.password = 'Password is required';
    } else if (credentials.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  static async login(credentials: LoginCredentials): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email.trim(),
      password: credentials.password
    });
    
    if (error) throw error;
  }

  static async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
}