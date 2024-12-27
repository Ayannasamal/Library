import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import { ReadingPreferences } from '../components/profile/ReadingPreferences';
import type { Profile } from '../types/profile';

export default function Profile() {
  const { user } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({});

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center text-gray-600">
            <p className="mb-4">Profile not found. Please try signing out and signing in again.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setEditing(false);
    } catch (error) {
      // Error is handled by useProfile hook
    }
  };

  const startEditing = () => {
    setFormData({
      username: profile.username,
      full_name: profile.full_name,
      bio: profile.bio,
      reading_preferences: profile.reading_preferences,
    });
    setEditing(true);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <button
            onClick={editing ? () => setEditing(false) : startEditing}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {editing ? (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={formData.username || ''}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.full_name || ''}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                value={formData.bio || ''}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <ReadingPreferences
              selectedPreferences={formData.reading_preferences || []}
              onPreferencesChange={(preferences) =>
                setFormData({ ...formData, reading_preferences: preferences })
              }
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Username</h2>
              <p className="mt-1 text-lg text-gray-900">{profile.username}</p>
            </div>

            {profile.full_name && (
              <div>
                <h2 className="text-sm font-medium text-gray-500">Full Name</h2>
                <p className="mt-1 text-lg text-gray-900">{profile.full_name}</p>
              </div>
            )}

            {profile.bio && (
              <div>
                <h2 className="text-sm font-medium text-gray-500">Bio</h2>
                <p className="mt-1 text-gray-900">{profile.bio}</p>
              </div>
            )}

            {profile.reading_preferences && profile.reading_preferences.length > 0 && (
              <div>
                <h2 className="text-sm font-medium text-gray-500">Reading Preferences</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.reading_preferences.map((preference) => (
                    <span
                      key={preference}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                    >
                      {preference}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}