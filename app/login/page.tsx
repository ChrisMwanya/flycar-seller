'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { authAPI } from '@/lib/api';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // Afficher un message si l'utilisateur vient de s'inscrire
    if (searchParams.get('registered') === 'true') {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      
      // Vérifier si l'email est vérifié
      if (!response.user.emailVerified) {
        setError('Veuillez vérifier votre email avant de vous connecter. Consultez votre boîte de réception.');
        setLoading(false);
        return;
      }

      // Rediriger vers la page d'accueil après connexion
      router.push('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Email ou mot de passe incorrect';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/Livrables-flycar-logo1.png"
              alt="Flycar"
              width={200}
              height={80}
              className="h-16 w-auto"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Connexion</h2>
          <p className="mt-2 text-sm text-gray-600">
            Accédez à votre compte Flycar
          </p>
        </div>

        {/* Message de succès après inscription */}
        {showSuccess && (
          <div className="mb-6 bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded">
            <p className="font-semibold">Inscription réussie !</p>
            <p className="text-sm">Veuillez vérifier votre email avant de vous connecter.</p>
          </div>
        )}

        {/* Message d'erreur */}
        {error && (
          <div className="mb-6 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-gray-900"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-gray-900"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Se souvenir de moi
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="text-secondary hover:text-secondary-dark font-medium">
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-3 px-6 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion...
              </span>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Nouveau sur Flycar ?</span>
            </div>
          </div>
        </div>

        {/* Lien d'inscription */}
        <div className="mt-6">
          <Link
            href="/register"
            className="w-full flex justify-center py-3 px-4 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold rounded transition-colors"
          >
            Créer un compte
          </Link>
        </div>

        {/* Lien vers l'accueil */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-secondary">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
