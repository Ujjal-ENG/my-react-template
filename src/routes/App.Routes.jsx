import React from 'react';
import { Navigate } from 'react-router-dom';

// Layout components
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

// Auth pages
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

// Dashboard pages
import DashboardPage from './pages/dashboard/DashboardPage';
import CreateTaskPage from './pages/tasks/CreateTaskPage';
import EditTaskPage from './pages/tasks/EditTaskPage';
import TaskDetailsPage from './pages/tasks/TaskDetailsPage';
import TaskListPage from './pages/tasks/TaskListPage';

// Admin pages
import ActivityLogsPage from './pages/admin/ActivityLogsPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import UserManagementPage from './pages/admin/UserManagementPage';

// Profile pages
import ProfilePage from './pages/profile/ProfilePage';
import SettingsPage from './pages/profile/SettingsPage';

// Error pages
import NotFoundPage from './pages/errors/NotFoundPage';
import ServerErrorPage from './pages/errors/ServerErrorPage';

// Route guard component for protected routes
const ProtectedRoute = ({ children, requiredRole = null }) => {
    // Get authentication state from your auth context or store
    const isAuthenticated = localStorage.getItem('token') !== null;
    const userRole = localStorage.getItem('userRole') || 'user';

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
        // Redirect to dashboard if role doesn't match
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

// Define routes configuration
const routes = [
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            },
            {
                path: 'forgot-password',
                element: <ForgotPasswordPage />
            },
            {
                path: 'reset-password/:token',
                element: <ResetPasswordPage />
            }
        ]
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: 'dashboard',
                element: <DashboardPage />
            },
            {
                path: 'tasks',
                element: <TaskListPage />
            },
            {
                path: 'tasks/new',
                element: <CreateTaskPage />
            },
            {
                path: 'tasks/:taskId',
                element: <TaskDetailsPage />
            },
            {
                path: 'tasks/:taskId/edit',
                element: <EditTaskPage />
            },
            {
                path: 'profile',
                element: <ProfilePage />
            },
            {
                path: 'settings',
                element: <SettingsPage />
            }
        ]
    },
    {
        path: '/admin',
        element: (
            <ProtectedRoute requiredRole="admin">
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: '',
                element: <AdminDashboardPage />
            },
            {
                path: 'users',
                element: <UserManagementPage />
            },
            {
                path: 'activity-logs',
                element: <ActivityLogsPage />
            }
        ]
    },
    {
        path: '/500',
        element: <ServerErrorPage />
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
];

export default routes;
