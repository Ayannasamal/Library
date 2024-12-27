import { supabase } from '../lib/supabase';
import type { Book } from '../types/book';
import { ProfileService } from './profile.service';

export class BooksService {
  static async getBooks(): Promise<Book[]> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async addBook(bookData: Partial<Book>, ownerId: string): Promise<void> {
    try {
      // Verify profile exists using ProfileService
      const profile = await ProfileService.getProfile(ownerId);
      
      if (!profile) {
        throw new Error('Profile not found. Please complete your profile setup first.');
      }

      const { error } = await supabase
        .from('books')
        .insert([{
          ...bookData,
          owner_id: ownerId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);

      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to add book. Please try again.');
    }
  }
}