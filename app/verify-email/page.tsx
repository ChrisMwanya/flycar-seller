'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authAPI } from '@/lib/api';
import Image from 'next/image';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setMessage('Lien de vérification invalide. Token manquant.');
        return;
      }

      try {
        const response = await authAPI.verifyEmail(token);
        setStatus('success');
        setMessage(response.message || 'Email vérifié avec succès !');
        
        // Rediriger vers la page de connexion après 3 secondes
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } catch (err: any) {
        setStatus('error');
        const errorMessage = err.response?.data?.message || 'Erreur lors de la vérification de l\'email';
        setMessage(errorMessage);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/Livrables-flycar-logo1.png"
            alt="Flycar"
            width={150}
            height={50}
            className="h-12 w-auto"
          />
        </div>

        {/* Contenu selon le statut */}
        {status === 'loading' && (
          <div className="text-center">
            <div className="mb-4">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-secondary"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Vérification en cours...</h2>
            <p className="text-gray-600">Veuillez patienter pendant que nous vérifions votre email.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="mb-4">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-success-100">
                <svg className="h-10 w-10 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Email vérifié !</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <p className="text-sm text-gray-500">Redirection vers la page de connexion...</p>
              <Link
                href="/login"
                className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-6 rounded transition-colors"
              >
                Se connecter maintenant
              </Link>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="mb-4">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-error-100">
                <svg className="h-10 w-10 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Erreur de vérification</h2>
            <p className="text-error-600 mb-6">{message}</p>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Le lien de vérification est peut-être expiré ou invalide.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="inline-block bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 px-6 rounded transition-colors"
                >
                  Aller à la page de connexion
                </Link>
                <Link
                  href="/register"
                  className="inline-block border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded transition-colors"
                >
                  Créer un nouveau compte
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Lien d'aide */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Besoin d&apos;aide ?{' '}
            <a href="mailto:support@flycar.com" className="text-secondary hover:text-secondary-dark font-medium">
              Contactez-nous
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-light">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
