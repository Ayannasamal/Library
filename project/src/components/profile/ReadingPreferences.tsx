import React from 'react';

const GENRE_OPTIONS = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Thriller',
  'Biography',
  'History',
  'Science',
  'Poetry',
  'Self-Help',
];

interface ReadingPreferencesProps {
  selectedPreferences: string[];
  onPreferencesChange: (preferences: string[]) => void;
}

export function ReadingPreferences({
  selectedPreferences,
  onPreferencesChange,
}: ReadingPreferencesProps) {
  const togglePreference = (genre: string) => {
    if (selectedPreferences.includes(genre)) {
      onPreferencesChange(selectedPreferences.filter((p) => p !== genre));
    } else {
      onPreferencesChange([...selectedPreferences, genre]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Reading Preferences
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {GENRE_OPTIONS.map((genre) => (
          <label
            key={genre}
            className="flex items-center space-x-2 text-sm"
          >
            <input
              type="checkbox"
              checked={selectedPreferences.includes(genre)}
              onChange={() => togglePreference(genre)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>{genre}</span>
          </label>
        ))}
      </div>
    </div>
  );
}