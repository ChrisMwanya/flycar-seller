'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CarCard from '../components/CarCard';
import FilterSidebar from '../components/FilterSidebar';
import { carsAPI, Car, CarFilters } from '@/lib/api';

function CarsPageContent() {
  const searchParams = useSearchParams();
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<CarFilters>({});
  const [sortBy, setSortBy] = useState('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setFilters({ category });
    }
  }, [searchParams]);

  // Fetch cars
  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await carsAPI.getCars(filters);
        setFilteredCars(response.data || response);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error && 'response' in err 
          ? (err as any).response?.data?.message || 'Erreur lors du chargement des voitures'
          : 'Erreur lors du chargement des voitures';
        setError(errorMessage);
        // Fallback to mock data for development
        const mockCars: Car[] = [
          {
            id: '1',
            title: 'ROLLS-ROYCE PHANTOM',
            price: 58000,
            year: 2024,
            mileage: 5000,
            category: 'Berline',
            transmission: 'automatic',
            fuelType: 'essence',
            location: 'Paris',
            description: 'Véhicule de luxe en excellent état',
            images: ['/Screen.png'],
            featured: true,
            specifications: {
              engine: 'V12 6.75L',
              power: '563 ch',
              color: 'Noir',
              doors: 4,
              seats: 5,
              features: ['GPS', 'Climatisation', 'Cuir', 'Toit ouvrant'],
            },
            seller: {
              id: '1',
              name: 'Luxury Cars Paris',
              phone: '+33 1 23 45 67 89',
              email: 'contact@luxurycars.fr',
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
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
            description: 'SUV spacieux et confortable',
            images: ['/Screen.png'],
            featured: true,
            specifications: {
              engine: '3.0L Diesel',
              power: '265 ch',
              color: 'Blanc',
              doors: 5,
              seats: 7,
              features: ['GPS', 'Climatisation', 'Caméra de recul', 'Sièges chauffants'],
            },
            seller: {
              id: '2',
              name: 'Auto Premium Lyon',
              phone: '+33 4 12 34 56 78',
              email: 'info@autopremium.fr',
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'BMW X7',
            price: 52000,
            year: 2024,
            mileage: 8000,
            category: 'SUV',
            transmission: 'automatic',
            fuelType: 'hybrid',
            location: 'Marseille',
            description: 'SUV hybride haut de gamme',
            images: ['/Screen.png'],
            featured: true,
            specifications: {
              engine: '3.0L Hybrid',
              power: '394 ch',
              color: 'Gris',
              doors: 5,
              seats: 7,
              features: ['GPS', 'Climatisation', 'Cuir', 'Toit panoramique', 'Système audio premium'],
            },
            seller: {
              id: '3',
              name: 'Elite Motors',
              phone: '+33 4 91 23 45 67',
              email: 'contact@elitemotors.fr',
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];
        setFilteredCars(mockCars);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [filters]);

  // Apply sorting
  useEffect(() => {
    setFilteredCars((currentCars) => {
      const sorted = [...currentCars];
      switch (sortBy) {
        case 'price-asc':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          sorted.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'oldest':
          sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          break;
      }
      return sorted;
    });
  }, [sortBy]);

  const handleFilterChange = (newFilters: CarFilters) => {
    setFilters(newFilters);
  };

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
            <span className="text-gray-700">Voitures</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Parcourir les Véhicules</h1>
          <p className="text-blue-100">Trouvez votre voiture idéale parmi notre sélection</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between"
            >
              <span className="font-semibold">Filtres</span>
              <svg
                className={`w-5 h-5 transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isMobileFilterOpen && (
              <div className="mt-4">
                <FilterSidebar onFilterChange={handleFilterChange} initialFilters={filters} />
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-1/4">
            <FilterSidebar onFilterChange={handleFilterChange} initialFilters={filters} />
          </aside>

          {/* Cars Grid */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-gray-700">
                <span className="font-semibold">{filteredCars.length}</span> véhicule{filteredCars.length !== 1 ? 's' : ''} trouvé{filteredCars.length !== 1 ? 's' : ''}
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-gray-700 text-sm">
                  Trier par:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <option value="newest">Plus récent</option>
                  <option value="oldest">Plus ancien</option>
                  <option value="price-asc">Prix: Croissant</option>
                  <option value="price-desc">Prix: Décroissant</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg">
                <p className="font-semibold">Note</p>
                <p className="text-sm">Affichage des données de démonstration. {error}</p>
              </div>
            )}

            {/* Cars Grid */}
            {!isLoading && filteredCars.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <Link key={car.id} href={`/cars/${car.id}`}>
                    <CarCard
                      image={car.images[0]}
                      title={car.title}
                      price={`€${car.price.toLocaleString()}`}
                      year={car.year.toString()}
                      featured={car.featured}
                    />
                  </Link>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredCars.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun véhicule trouvé</h3>
                <p className="text-gray-600 mb-4">
                  Essayez de modifier vos critères de recherche
                </p>
                <button
                  onClick={() => setFilters({})}
                  className="bg-secondary hover:bg-secondary-dark text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
        <Footer />
      </div>
    }>
      <CarsPageContent />
    </Suspense>
  );
}
