export interface Book {
  id: string;
  owner_id: string;
  title: string;
  author: string;
  isbn?: string;
  genre?: string[];
  condition: string;
  description?: string;
  available: boolean;
  created_at: string;
  updated_at: string;
}