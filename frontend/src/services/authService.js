import api from './api';

export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  login,
  logout
};

export default authService;
