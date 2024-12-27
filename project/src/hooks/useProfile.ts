import { useState, useEffect } from 'react';
import { Profile } from '../types/profile';
import { ProfileService } from '../services/profile.service';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    try {
      const data = await ProfileService.getProfile(user!.id);
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load profile'));
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return;

    try {
      await ProfileService.updateProfile(user.id, data);
      await loadProfile();
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
      throw err;
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    refreshProfile: loadProfile
  };
}