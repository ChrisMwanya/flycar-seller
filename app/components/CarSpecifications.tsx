'use client';

import { Car } from '@/lib/api';

interface CarSpecificationsProps {
  car: Car;
}

export default function CarSpecifications({ car }: CarSpecificationsProps) {
  const mainSpecs = [
    { label: 'Année', value: car.year },
    { label: 'Kilométrage', value: `${car.mileage.toLocaleString()} km` },
    { label: 'Transmission', value: car.transmission === 'automatic' ? 'Automatique' : 'Manuelle' },
    { label: 'Carburant', value: car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1) },
    { label: 'Catégorie', value: car.category },
    { label: 'Localisation', value: car.location },
  ];

  const technicalSpecs = [
    { label: 'Moteur', value: car.specifications.engine },
    { label: 'Puissance', value: car.specifications.power },
    { label: 'Couleur', value: car.specifications.color },
    { label: 'Portes', value: car.specifications.doors },
    { label: 'Places', value: car.specifications.seats },
  ].filter(spec => spec.value !== undefined && spec.value !== null);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Spécifications</h2>

      {/* Main Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {mainSpecs.map((spec, index) => (
          <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-gray-600 font-medium">{spec.label}</span>
            <span className="text-gray-900 font-semibold">{spec.value}</span>
          </div>
        ))}
      </div>

      {/* Technical Specifications */}
      {technicalSpecs.length > 0 && (
        <>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Caractéristiques Techniques</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {technicalSpecs.map((spec, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">{spec.label}</span>
                <span className="text-gray-900 font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Features */}
      {car.specifications.features && car.specifications.features.length > 0 && (
        <>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Équipements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {car.specifications.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <svg className="w-5 h-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Description */}
      {car.description && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{car.description}</p>
        </div>
      )}
    </div>
  );
}
