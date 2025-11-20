'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CarDetailsGallery from '../../components/CarDetailsGallery';
import CarSpecifications from '../../components/CarSpecifications';
import ContactSellerForm from '../../components/ContactSellerForm';
import CarCard from '../../components/CarCard';
import { carsAPI, Car } from '@/lib/api';

export default function CarDetailsPage() {
  const params = useParams();
  const carId = params.id as string;
  const [car, setCar] = useState<Car | null>(null);
  const [similarCars, setSimilarCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCarDetails = async () => {
      setIsLoading(true);
      setError('');
      try {
        const carResponse = await carsAPI.getCarById(carId);
        setCar(carResponse.data || carResponse);

        // Fetch similar cars
        try {
          const similarResponse = await carsAPI.getSimilarCars(carId);
          setSimilarCars(similarResponse.data || similarResponse);
        } catch (err) {
          // Similar cars are optional, don't fail if they don't load
          console.error('Failed to load similar cars:', err);
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error && 'response' in err 
          ? (err as any).response?.data?.message || 'Erreur lors du chargement du véhicule'
          : 'Erreur lors du chargement du véhicule';
        setError(errorMessage);
        // Fallback to mock data for development
        const mockCar: Car = {
          id: carId,
          title: 'ROLLS-ROYCE PHANTOM',
          price: 58000,
          year: 2024,
          mileage: 5000,
          category: 'Berline',
          transmission: 'automatic',
          fuelType: 'essence',
          location: 'Paris, France',
          description: `Magnifique Rolls-Royce Phantom en excellent état. Ce véhicule de prestige offre un confort inégalé et des performances exceptionnelles.

Entretien complet effectué récemment. Historique d'entretien disponible. Véhicule non-fumeur, garage privé.

Possibilité de reprise et financement.`,
          images: ['/Screen.png', '/Screen.png', '/Screen.png'],
          featured: true,
          specifications: {
            engine: 'V12 6.75L',
            power: '563 ch',
            color: 'Noir Diamant',
            doors: 4,
            seats: 5,
            features: [
              'GPS Navigation',
              'Climatisation automatique',
              'Sièges en cuir premium',
              'Toit ouvrant panoramique',
              'Système audio Bose',
              'Caméra 360°',
              'Régulateur de vitesse adaptatif',
              'Sièges chauffants et ventilés',
              'Éclairage LED',
              'Jantes alliage 21 pouces',
              'Système de stationnement automatique',
              'Apple CarPlay / Android Auto',
            ],
          },
          seller: {
            id: '1',
            name: 'Luxury Cars Paris',
            phone: '+33 1 23 45 67 89',
            email: 'contact@luxurycars.fr',
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setCar(mockCar);

        // Mock similar cars
        const mockSimilarCars: Car[] = [
          {
            id: '2',
            title: 'BMW X5',
            price: 45000,
            year: 2023,
            mileage: 15000,
            category: 'SUV',
            transmission: 'automatic',
            fuelType: 'diesel',
            location: 'Lyon',
            description: 'SUV spacieux',
            images: ['/Screen.png'],
            featured: true,
            specifications: {
              engine: '3.0L',
              power: '265 ch',
              color: 'Blanc',
              doors: 5,
              seats: 7,
              features: ['GPS', 'Climatisation'],
            },
            seller: {
              id: '2',
              name: 'Auto Premium',
              phone: '+33 4 12 34 56 78',
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'MERCEDES-BENZ S-CLASS',
            price: 62000,
            year: 2024,
            mileage: 3000,
            category: 'Berline',
            transmission: 'automatic',
            fuelType: 'hybrid',
            location: 'Paris',
            description: 'Berline de luxe',
            images: ['/Screen.png'],
            featured: true,
            specifications: {
              engine: '3.0L Hybrid',
              power: '367 ch',
              color: 'Argent',
              doors: 4,
              seats: 5,
              features: ['GPS', 'Climatisation', 'Cuir'],
            },
            seller: {
              id: '3',
              name: 'Elite Motors',
              phone: '+33 1 98 76 54 32',
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '4',
            title: 'AUDI A8',
            price: 48000,
            year: 2023,
            mileage: 12000,
            category: 'Berline',
            transmission: 'automatic',
            fuelType: 'diesel',
            location: 'Marseille',
            description: 'Berline premium',
            images: ['/Screen.png'],
            featured: false,
            specifications: {
              engine: '3.0L TDI',
              power: '286 ch',
              color: 'Noir',
              doors: 4,
              seats: 5,
              features: ['GPS', 'Climatisation', 'Cuir', 'Toit ouvrant'],
            },
            seller: {
              id: '4',
              name: 'Premium Auto Sud',
              phone: '+33 4 91 23 45 67',
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];
        setSimilarCars(mockSimilarCars);
      } finally {
        setIsLoading(false);
      }
    };

    if (carId) {
      fetchCarDetails();
    }
  }, [carId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Véhicule non trouvé</h1>
          <p className="text-gray-600 mb-8">Le véhicule que vous recherchez n&apos;existe pas ou a été supprimé.</p>
          <Link
            href="/cars"
            className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
          >
            Retour aux véhicules
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-secondary hover:text-secondary-dark">
              Accueil
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/cars" className="text-secondary hover:text-secondary-dark">
              Voitures
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">{car.title}</span>
          </nav>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg">
            <p className="font-semibold">Note</p>
            <p className="text-sm">Affichage des données de démonstration. {error}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery and Specs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Car Title and Price */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.title}</h1>
                  <div className="flex items-center text-gray-600 space-x-4">
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {car.location}
                    </span>
                    <span>•</span>
                    <span>{car.mileage.toLocaleString()} km</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-accent">€{car.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Prix négociable</p>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <CarDetailsGallery images={car.images} title={car.title} />

            {/* Specifications */}
            <CarSpecifications car={car} />
          </div>

          {/* Right Column - Seller Info and Contact */}
          <div className="space-y-6">
            {/* Seller Information */}
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Informations Vendeur</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-secondary mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{car.seller.name}</span>
                </div>
                {car.seller.phone && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-secondary mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <a href={`tel:${car.seller.phone}`} className="text-secondary hover:text-secondary-dark">
                      {car.seller.phone}
                    </a>
                  </div>
                )}
              </div>

              {/* Share Buttons */}
              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">Partager cette annonce</p>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-semibold transition-colors">
                    Facebook
                  </button>
                  <button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded text-sm font-semibold transition-colors">
                    Twitter
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-semibold transition-colors">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactSellerForm
              carId={car.id}
              carTitle={car.title}
              sellerName={car.seller.name}
            />
          </div>
        </div>

        {/* Similar Cars Section */}
        {similarCars.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Véhicules Similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarCars.map((similarCar) => (
                <Link key={similarCar.id} href={`/cars/${similarCar.id}`}>
                  <CarCard
                    image={similarCar.images[0]}
                    title={similarCar.title}
                    price={`€${similarCar.price.toLocaleString()}`}
                    year={similarCar.year.toString()}
                    featured={similarCar.featured}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
