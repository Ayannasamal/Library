import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Users, Calendar } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Community Library
        </h1>
        <p className="text-xl text-gray-600">
          Share books, connect with readers, and discover your next favorite read
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Book className="h-8 w-8 text-indigo-600" />
            <h2 className="text-xl font-semibold ml-3">Share Your Books</h2>
          </div>
          <p className="text-gray-600 mb-4">
            List your books and share them with the community. Help others discover great reads.
          </p>
          <Link
            to="/library"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Browse Library →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Users className="h-8 w-8 text-indigo-600" />
            <h2 className="text-xl font-semibold ml-3">Join Reading Groups</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Connect with fellow readers, join book discussions, and share recommendations.
          </p>
          <Link
            to="/groups"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Find Groups →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Calendar className="h-8 w-8 text-indigo-600" />
            <h2 className="text-xl font-semibold ml-3">Attend Events</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Participate in book exchange events and meetups with the community.
          </p>
          <Link
            to="/events"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            View Events →
          </Link>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Start Sharing?
        </h2>
        <p className="text-gray-600 mb-6">
          Join our community of book lovers and start sharing your collection today.
        </p>
        <Link
          to="/register"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}