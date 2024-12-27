/*
  # Fix profiles table RLS policies

  1. Changes
    - Add policy to allow users to insert their own profile
    - This is necessary for the registration process to work

  2. Security
    - Users can only insert their own profile (id must match auth.uid())
    - Maintains existing policies for viewing and updating profiles
*/

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);