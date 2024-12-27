import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { EventCard } from '../components/events/EventCard';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('event_date', new Date().toISOString())
      .order('event_date', { ascending: true });

    if (error) {
      toast.error('Failed to load events');
      return;
    }

    setEvents(data || []);
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
        {user && (
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            onClick={() => toast.error('Create event feature coming soon!')}
          >
            Create Event
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No upcoming events scheduled.</p>
        </div>
      )}
    </div>
  );
}