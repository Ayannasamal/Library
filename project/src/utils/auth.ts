import { AuthError } from '@supabase/supabase-js';

export function getAuthErrorMessage(error: AuthError | Error | unknown): string {
  if (!error) return 'An unknown error occurred';

  const message = error instanceof Error ? error.message : String(error);

  switch (message) {
    case 'Invalid login credentials':
      return 'Invalid email or password. Please try again.';
    case 'Email not confirmed':
      return 'Please verify your email address before signing in.';
    case 'User already registered':
      return 'This email is already registered. Please sign in instead.';
    case 'Rate limit exceeded':
      return 'Too many login attempts. Please try again later.';
    case 'Network error':
      return 'Unable to connect. Please check your internet connection.';
    default:
      return 'An error occurred. Please try again later.';
  }
}