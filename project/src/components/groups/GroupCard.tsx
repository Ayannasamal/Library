import React from 'react';
import { Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface GroupCardProps {
  group: {
    id: string;
    name: string;
    description: string;
    is_virtual: boolean;
    created_at: string;
    member_count?: number;
  };
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{group.name}</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${
          group.is_virtual ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }`}>
          {group.is_virtual ? 'Virtual' : 'In-Person'}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{group.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          <span>{group.member_count || 0} members</span>
        </div>
        <span>Created {formatDistanceToNow(new Date(group.created_at), { addSuffix: true })}</span>
      </div>
    </div>
  );
}