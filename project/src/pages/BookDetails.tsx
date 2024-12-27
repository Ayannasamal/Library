import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Book } from '../types/book';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadBook();
  }, [id]);

  const loadBook = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from('books')
      .select('*, profiles(username)')
      .eq('id', id)
      .single();

    if (error) {
      toast.error('Failed to load book details');
      return;
    }

    setBook(data);
    setLoading(false);
  };

  const handleRequestBook = async () => {
    if (!book || !user) return;

    const { error } = await supabase.from('book_requests').insert({
      book_id: book.id,
      requester_id: user.id,
    });

    if (error) {
      toast.error('Failed to request book');
      return;
    }

    toast.success('Book requested successfully!');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h1>
        <div className="space-y-4">
          <p className="text-xl text-gray-600">by {book.author}</p>
          
          <div className="flex flex-wrap gap-2">
            {book.genre?.map((g) => (
              <span
                key={g}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
              >
                {g}
              </span>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-xl font-semibold mb-2">About this book</h2>
            <p className="text-gray-600">{book.description}</p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Condition</dt>
                <dd className="text-sm text-gray-900">{book.condition}</dd>
              </div>
              {book.isbn && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">ISBN</dt>
                  <dd className="text-sm text-gray-900">{book.isbn}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">Added</dt>
                <dd className="text-sm text-gray-900">
                  {formatDistanceToNow(new Date(book.created_at), { addSuffix: true })}
                </dd>
              </div>
            </dl>
          </div>

          {user && user.id !== book.owner_id && book.available && (
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={handleRequestBook}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
              >
                Request to Borrow
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}