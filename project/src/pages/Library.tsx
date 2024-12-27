import React, { useEffect, useState } from 'react';
import { Book } from '../types/book';
import { BookCard } from '../components/books/BookCard';
import { BookForm } from '../components/books/BookForm';
import { useAuth } from '../contexts/AuthContext';
import { BooksService } from '../services/books.service';
import toast from 'react-hot-toast';

export default function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showAddBook, setShowAddBook] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await BooksService.getBooks();
      setBooks(data);
    } catch (error) {
      toast.error('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (bookData: Partial<Book>) => {
    if (!user) {
      toast.error('Please sign in to add books');
      return;
    }

    try {
      await BooksService.addBook(bookData, user.id);
      toast.success('Book added successfully!');
      setShowAddBook(false);
      loadBooks();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to add book');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-600">Loading books...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community Library</h1>
        {user && (
          <button
            onClick={() => setShowAddBook(!showAddBook)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {showAddBook ? 'Cancel' : 'Add Book'}
          </button>
        )}
      </div>

      {showAddBook && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
          <BookForm onSubmit={handleAddBook} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No books available yet.</p>
        </div>
      )}
    </div>
  );
}