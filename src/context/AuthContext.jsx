import React, { createContext, useEffect, useState } from 'react';
import { checkAuth, login, logout, register } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initAuth = async () => {
            try {
                setLoading(true);
                const userData = await checkAuth();
                setUser(userData);
            } catch (err) {
                setError(err.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const handleLogin = async (email, password) => {
        try {
            setLoading(true);
            const userData = await login(email, password);
            setUser(userData);
            setError(null);
            return userData;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (userData) => {
        try {
            setLoading(true);
            const newUser = await register(userData);
            setUser(newUser);
            setError(null);
            return newUser;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logout();
            setUser(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                login: handleLogin,
                register: handleRegister,
                logout: handleLogout,
                isAuthenticated: !!user
            }}>
            {children}
        </AuthContext.Provider>
    );
};
