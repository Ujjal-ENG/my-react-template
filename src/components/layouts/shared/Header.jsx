import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ThemeToggle from '../ui/ThemeToggle';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                TaskManager
                            </Link>
                        </div>

                        {user && (
                            <nav className="ml-6 flex items-center space-x-4">
                                <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                                    Dashboard
                                </Link>
                                <Link to="/tasks" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                                    Tasks
                                </Link>
                                {user.is_admin && (
                                    <Link to="/reports" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                                        Reports
                                    </Link>
                                )}
                            </nav>
                        )}
                    </div>

                    <div className="flex items-center">
                        <ThemeToggle />

                        {user ? (
                            <div className="ml-4 relative flex items-center">
                                <div className="flex items-center">
                                    <div className="ml-3">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                        <button onClick={logout} className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="ml-4 flex items-center md:ml-6">
                                <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                                    Sign in
                                </Link>
                                <Link to="/register" className="ml-2 px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
