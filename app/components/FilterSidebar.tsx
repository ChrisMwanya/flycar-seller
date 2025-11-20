'use client';

import { useState } from 'react';
import { CarFilters } from '@/lib/api';

interface FilterSidebarProps {
  onFilterChange: (filters: CarFilters) => void;
  initialFilters?: CarFilters;
}

export default function FilterSidebar({ onFilterChange, initialFilters = {} }: FilterSidebarProps) {
  const [filters, setFilters] = useState<CarFilters>(initialFilters);

  const categories = [
    'Cabriolet',
    'Berline',
    'Coupé Sport',
    'Break',
    'Compacte',
    'Pick-up',
  ];

  const transmissions = [
    { value: 'automatic', label: 'Automatique' },
    { value: 'manual', label: 'Manuelle' },
  ];

  const fuelTypes = [
    { value: 'essence', label: 'Essence' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'electric', label: 'Électrique' },
    { value: 'hybrid', label: 'Hybride' },
  ];

  const handleFilterChange = (key: keyof CarFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Filtres</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-secondary hover:text-secondary-dark font-semibold"
        >
          Réinitialiser
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Catégorie</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filters.category === category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-4 h-4 text-secondary focus:ring-secondary"
              />
              <span className="ml-2 text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Prix</h4>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Min (€)</label>
            <input
              type="number"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Max (€)</label>
            <input
              type="number"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="100000"
            />
          </div>
        </div>
      </div>

      {/* Year Range */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Année</h4>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Min</label>
            <input
              type="number"
              value={filters.minYear || ''}
              onChange={(e) => handleFilterChange('minYear', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="2000"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Max</label>
            <input
              type="number"
              value={filters.maxYear || ''}
              onChange={(e) => handleFilterChange('maxYear', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="2024"
            />
          </div>
        </div>
      </div>

      {/* Mileage Range */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Kilométrage</h4>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Min (km)</label>
            <input
              type="number"
              value={filters.minMileage || ''}
              onChange={(e) => handleFilterChange('minMileage', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Max (km)</label>
            <input
              type="number"
              value={filters.maxMileage || ''}
              onChange={(e) => handleFilterChange('maxMileage', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="200000"
            />
          </div>
        </div>
      </div>

      {/* Transmission */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Transmission</h4>
        <div className="space-y-2">
          {transmissions.map((transmission) => (
            <label key={transmission.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="transmission"
                value={transmission.value}
                checked={filters.transmission === transmission.value}
                onChange={(e) => handleFilterChange('transmission', e.target.value as 'automatic' | 'manual')}
                className="w-4 h-4 text-secondary focus:ring-secondary"
              />
              <span className="ml-2 text-gray-700">{transmission.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Carburant</h4>
        <div className="space-y-2">
          {fuelTypes.map((fuel) => (
            <label key={fuel.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="fuelType"
                value={fuel.value}
                checked={filters.fuelType === fuel.value}
                onChange={(e) => handleFilterChange('fuelType', e.target.value as any)}
                className="w-4 h-4 text-secondary focus:ring-secondary"
              />
              <span className="ml-2 text-gray-700">{fuel.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
