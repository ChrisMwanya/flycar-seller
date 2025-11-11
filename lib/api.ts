import axios from 'axios';

// Configuration de base de l'API
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalide ou expiré
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Types
export interface RegisterSellerData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  businessName: string;
  businessType: 'individual' | 'dealership' | 'company';
  taxId?: string;
}

export interface RegisterBuyerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirmation: string;
  phoneNumber: string;
  address: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'seller' | 'buyer';
  emailVerified: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Token {
  type: string;
  value: string;
  expiresAt: string;
}

// Fonctions d'authentification
export const authAPI = {
  // Inscription vendeur
  registerSeller: async (data: RegisterSellerData) => {
    const response = await api.post('/register/seller', data);
    return response.data;
  },

  // Inscription acheteur
  registerBuyer: async (data: RegisterBuyerData) => {
    const response = await api.post('/register/buyer', data);
    return response.data;
  },

  // Connexion
  login: async (data: LoginData) => {
    const response = await api.post('/login', data);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token.value);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Déconnexion
  logout: async () => {
    try {
      await api.post('/logout');
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },

  // Profil
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },

  // Renvoyer email de vérification
  resendVerification: async () => {
    const response = await api.post('/resend-verification');
    return response.data;
  },

  // Vérifier email
  verifyEmail: async (token: string) => {
    const response = await api.get(`/verify-email?token=${token}`);
    return response.data;
  },
};

// Helpers
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('authToken');
};

export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const clearAuth = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};
