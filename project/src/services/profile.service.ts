import { supabase } from '../lib/supabase';
import { Profile } from '../types/profile';

export class ProfileService {
  static async createProfile(profileData: Partial<Profile>): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .insert([{
        ...profileData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);
    
    if (error) throw error;
  }

  static async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  }

  static async updateProfile(userId: string, profileData: Partial<Profile>): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .update({
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);
    
    if (error) throw error;
  }
}