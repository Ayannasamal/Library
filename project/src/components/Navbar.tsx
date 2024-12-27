import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Book, Users, Calendar, User } from 'lucide-react';

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-xl">Community Library</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/library" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
              <Book className="h-5 w-5" />
              <span>Library</span>
            </Link>
            
            <Link to="/groups" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
              <Users className="h-5 w-5" />
              <span>Groups</span>
            </Link>
            
            <Link to="/events" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
              <Calendar className="h-5 w-5" />
              <span>Events</span>
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}