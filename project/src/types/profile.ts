export interface Profile {
  id: string;
  username: string;
  full_name?: string;
  bio?: string;
  reading_preferences?: string[];
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}