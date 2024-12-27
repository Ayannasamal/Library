import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { GroupCard } from '../components/groups/GroupCard';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    const { data, error } = await supabase
      .from('reading_groups')
      .select(`
        *,
        group_members(count)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load groups');
      return;
    }

    setGroups(data || []);
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reading Groups</h1>
        {user && (
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            onClick={() => toast.error('Create group feature coming soon!')}
          >
            Create Group
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>

      {groups.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No reading groups available yet.</p>
        </div>
      )}
    </div>
  );
}