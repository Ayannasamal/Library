import React from 'react';
import { Calendar, MapPin, Video } from 'lucide-react';
import { format } from 'date-fns';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    event_date: string;
    location: string;
    is_virtual: boolean;
  };
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${
          event.is_virtual ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }`}>
          {event.is_virtual ? 'Virtual' : 'In-Person'}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{format(new Date(event.event_date), 'PPP p')}</span>
        </div>
        <div className="flex items-center">
          {event.is_virtual ? (
            <Video className="h-4 w-4 mr-2" />
          ) : (
            <MapPin className="h-4 w-4 mr-2" />
          )}
          <span>{event.location}</span>
        </div>
      </div>
    </div>
  );
}