'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { authAPI, RegisterBuyerData } from '@/lib/api';

export default function RegisterBuyerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<RegisterBuyerData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password_confirmation: '',
    phoneNumber: '',
    address: '',
  });

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
      await authAPI.registerBuyer(formData);
      setSuccess(true);
      
      // Rediriger vers la page de connexion après 3 secondes
      setTimeout(() => {
        router.push('/login?registered=true');
      }, 3000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0]?.message || 'Une erreur est survenue';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-light py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8 text-center">
          <div className="mb-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-success-100">
              <svg className="h-6 w-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Inscription réussie !</h2>
          <p className="text-gray-600 mb-4">
            Un email de vérification a été envoyé à <strong>{formData.email}</strong>.
          </p>
          <p className="text-sm text-gray-500">
            Veuillez vérifier votre boîte de réception et cliquer sur le lien pour activer votre compte.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          {/* Logo et titre */}
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
            <h2 className="text-3xl font-bold text-gray-900">Créer un compte</h2>
            <p className="mt-2 text-sm text-gray-600">
              Rejoignez Flycar pour trouver votre véhicule idéal
            </p>
          </div>
          {error && (
            <div className="mb-6 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Prénom */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom <span className="text-error-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
                placeholder="Jean"
              />
            </div>

            {/* Nom */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom <span className="text-error-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
                placeholder="Dupont"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-error-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
                placeholder="jean@example.com"
              />
            </div>

            {/* Téléphone */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone <span className="text-error-500">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
                placeholder="+243812345678"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe <span className="text-error-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
                placeholder="Min. 8 caractères"
              />
              <p className="mt-1 text-sm text-gray-500">Le mot de passe doit contenir au moins 8 caractères</p>
            </div>

            {/* Confirmation mot de passe */}
            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe <span className="text-error-500">*</span>
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                required
                minLength={8}
                value={formData.password_confirmation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
                placeholder="Confirmez votre mot de passe"
              />
            </div>

            {/* Adresse */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse complète <span className="text-error-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
                placeholder="123 Avenue de la Liberté, Kinshasa"
              />
            </div>

            {/* Bouton de soumission */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 px-6 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Inscription en cours...' : 'Créer mon compte acheteur'}
              </button>
            </div>

            {/* Lien vers connexion */}
            <div className="text-center text-sm text-gray-600">
              Vous avez déjà un compte ?{' '}
              <Link href="/login" className="text-secondary hover:text-secondary-dark font-semibold">
                Se connecter
              </Link>
            </div>
          </form>

          {/* Lien vers l'accueil */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-secondary">
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
