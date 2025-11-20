'use client';

import { useState } from 'react';
import { carsAPI, ContactSellerData } from '@/lib/api';

interface ContactSellerFormProps {
  carId: string;
  carTitle: string;
  sellerName: string;
}

export default function ContactSellerForm({ carId, carTitle, sellerName }: ContactSellerFormProps) {
  const [formData, setFormData] = useState({
    message: `Bonjour, je suis intéressé(e) par ${carTitle}. Pourriez-vous me fournir plus d'informations ?`,
    phone: '',
    preferredContact: 'email' as 'email' | 'phone',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const contactData: ContactSellerData = {
        carId,
        message: formData.message,
        phone: formData.phone || undefined,
        preferredContact: formData.preferredContact,
      };

      await carsAPI.contactSeller(contactData);
      setSubmitStatus('success');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          message: `Bonjour, je suis intéressé(e) par ${carTitle}. Pourriez-vous me fournir plus d'informations ?`,
          phone: '',
          preferredContact: 'email',
        });
        setSubmitStatus('idle');
      }, 3000);
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Contacter le Vendeur</h3>
      <p className="text-gray-600 mb-6">
        Vendeur: <span className="font-semibold text-gray-900">{sellerName}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Numéro de téléphone (optionnel)
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            placeholder="+33 6 12 34 56 78"
          />
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Méthode de contact préférée
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="email"
                checked={formData.preferredContact === 'email'}
                onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value as 'email' | 'phone' })}
                className="w-4 h-4 text-secondary focus:ring-secondary"
              />
              <span className="ml-2 text-gray-700">Email</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="phone"
                checked={formData.preferredContact === 'phone'}
                onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value as 'email' | 'phone' })}
                className="w-4 h-4 text-secondary focus:ring-secondary"
              />
              <span className="ml-2 text-gray-700">Téléphone</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
        </button>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            <p className="font-semibold">Message envoyé avec succès !</p>
            <p className="text-sm">Le vendeur vous contactera bientôt.</p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <p className="font-semibold">Erreur</p>
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
}
