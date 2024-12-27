import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../../types/book';
import { formatDistanceToNow } from 'date-fns';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          <Link to={`/books/${book.id}`} className="hover:text-indigo-600">
            {book.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4">by {book.author}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium mr-2">Condition:</span>
            <span>{book.condition}</span>
          </div>
          
          {book.genre && book.genre.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {book.genre.map((g) => (
                <span
                  key={g}
                  className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full"
                >
                  {g}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Added {formatDistanceToNow(new Date(book.created_at), { addSuffix: true })}
          </span>
          <Link
            to={`/books/${book.id}`}
            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}