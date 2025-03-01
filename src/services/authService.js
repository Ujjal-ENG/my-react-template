import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to login');
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to register');
  }
};

export const logout = async () => {
  try {
    await api.post('/logout');
    localStorage.removeItem('token');
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to logout');
  }
};

export const checkAuth = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    throw new Error('Not authenticated');
  }
};
