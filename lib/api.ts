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
    if (globalThis.window !== undefined) {
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
      if (globalThis.window !== undefined) {
        localStorage.removeItem('authToken');
        globalThis.window.location.href = '/login';
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
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  phoneNumber?: string;
  address?: string;
  role?: 'seller' | 'buyer';
  emailVerified?: boolean;
  statut?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Token {
  type: string;
  value: string;
  expiresAt: string;
}

export interface Car {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  category: string;
  transmission: 'automatic' | 'manual';
  fuelType: 'essence' | 'diesel' | 'electric' | 'hybrid';
  location: string;
  description: string;
  images: string[];
  featured?: boolean;
  specifications: {
    engine?: string;
    power?: string;
    color?: string;
    doors?: number;
    seats?: number;
    features?: string[];
  };
  seller: {
    id: string;
    name: string;
    phone?: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CarFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  minMileage?: number;
  maxMileage?: number;
  transmission?: 'automatic' | 'manual';
  fuelType?: 'essence' | 'diesel' | 'electric' | 'hybrid';
  search?: string;
}

export interface ContactSellerData {
  carId: string;
  message: string;
  phone?: string;
  preferredContact?: 'email' | 'phone';
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

// Fonctions pour les voitures
export const carsAPI = {
  // Récupérer la liste des voitures avec filtres optionnels
  getCars: async (filters?: CarFilters) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    const response = await api.get(`/cars?${params.toString()}`);
    return response.data;
  },

  // Récupérer les détails d'une voiture
  getCarById: async (id: string) => {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  },

  // Contacter le vendeur
  contactSeller: async (data: ContactSellerData) => {
    const response = await api.post('/contact-seller', data);
    return response.data;
  },

  // Récupérer les voitures similaires
  getSimilarCars: async (carId: string, limit: number = 4) => {
    const response = await api.get(`/cars/${carId}/similar?limit=${limit}`);
    return response.data;
  },
};

// Helpers
export const isAuthenticated = (): boolean => {
  if (globalThis.window === undefined) return false;
  return !!localStorage.getItem('authToken');
};

export const getUser = (): User | null => {
  if (globalThis.window === undefined) return null;
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const clearAuth = () => {
  if (globalThis.window !== undefined) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};
