/*
  # Initial Schema for Community Library App

  1. New Tables
    - `profiles`
      - User profile information and preferences
    - `books`
      - Books available in the community library
    - `book_requests`
      - Book borrowing requests between users
    - `reviews`
      - Book reviews and ratings
    - `reading_groups`
      - Community reading groups/book clubs
    - `group_members`
      - Reading group membership
    - `events`
      - Book exchange and community events
    
  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
*/

-- Profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE NOT NULL,
  full_name text,
  bio text,
  reading_preferences text[],
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Books table
CREATE TABLE books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id) NOT NULL,
  title text NOT NULL,
  author text NOT NULL,
  isbn text,
  genre text[],
  condition text NOT NULL,
  description text,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Book requests table
CREATE TABLE book_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid REFERENCES books(id) NOT NULL,
  requester_id uuid REFERENCES profiles(id) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  request_date timestamptz DEFAULT now(),
  return_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reviews table
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid REFERENCES books(id) NOT NULL,
  reviewer_id uuid REFERENCES profiles(id) NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reading groups table
CREATE TABLE reading_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_by uuid REFERENCES profiles(id) NOT NULL,
  is_virtual boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Group members table
CREATE TABLE group_members (
  group_id uuid REFERENCES reading_groups(id) NOT NULL,
  member_id uuid REFERENCES profiles(id) NOT NULL,
  role text DEFAULT 'member',
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (group_id, member_id)
);

-- Events table
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_date timestamptz NOT NULL,
  location text,
  is_virtual boolean DEFAULT false,
  organizer_id uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Books policies
CREATE POLICY "Books are viewable by everyone"
  ON books FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own books"
  ON books FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own books"
  ON books FOR UPDATE
  USING (auth.uid() = owner_id);

-- Book requests policies
CREATE POLICY "Users can view their own requests and requests for their books"
  ON book_requests FOR SELECT
  USING (
    auth.uid() = requester_id OR 
    auth.uid() = (SELECT owner_id FROM books WHERE id = book_id)
  );

CREATE POLICY "Users can create requests"
  ON book_requests FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);

-- Reading groups policies
CREATE POLICY "Reading groups are viewable by everyone"
  ON reading_groups FOR SELECT
  USING (true);

CREATE POLICY "Users can create reading groups"
  ON reading_groups FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Group members policies
CREATE POLICY "Group members are viewable by everyone"
  ON group_members FOR SELECT
  USING (true);

CREATE POLICY "Users can join groups"
  ON group_members FOR INSERT
  WITH CHECK (auth.uid() = member_id);

-- Events policies
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Users can create events"
  ON events FOR INSERT
  WITH CHECK (auth.uid() = organizer_id);