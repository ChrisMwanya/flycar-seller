import React from 'react';
import Image from 'next/image';

interface CarCardProps {
  image: string;
  title: string;
  price: string;
  year: string;
  featured?: boolean;
}

export default function CarCard({ image, title, price, year, featured = false }: CarCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        {featured && (
          <span className="absolute top-3 left-3 bg-accent text-white px-3 py-1 rounded text-sm font-semibold z-10">
            EN VEDETTE
          </span>
        )}
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button className="text-gray-400 hover:text-red-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4 text-center">
          <div className="flex flex-col items-center">
            <svg className="w-5 h-5 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-gray-600">{year}</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-5 h-5 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-xs text-gray-600">AUTO</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-5 h-5 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-gray-600">DIESEL</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-5 h-5 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xs text-gray-600">4</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-accent font-bold text-lg">{price}</span>
          <button className="text-gray-600 hover:text-secondary text-sm font-medium">
            VOIR DÉTAILS →
          </button>
        </div>
      </div>
    </div>
  );
}
