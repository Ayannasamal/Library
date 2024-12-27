import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ProfileService } from '../services/profile.service';
import toast from 'react-hot-toast';
import { ReadingPreferences } from '../components/profile/ReadingPreferences';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error('No user data returned');

      // 2. Create the profile
      await ProfileService.createProfile({
        id: authData.user.id,
        username,
        full_name: fullName,
        reading_preferences: preferences,
      });

      toast.success('Account created successfully! Please sign in to continue.');
      navigate('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.message?.includes('already registered')) {
        toast.error('This email is already registered. Please sign in instead.');
      } else if (error.message?.includes('duplicate key')) {
        toast.error('This username is already taken. Please choose another.');
      } else {
        toast.error('Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields remain the same */}
      </form>
    </div>
  );
}