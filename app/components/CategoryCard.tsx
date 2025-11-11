import React from 'react';
import Image from 'next/image';

interface CategoryCardProps {
  name: string;
  count: string;
  icon: string;
}

export default function CategoryCard({ name, count, icon }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer border border-gray-100">
      <div className="flex justify-center mb-3">
        <Image 
          src={icon} 
          alt={name} 
          width={60} 
          height={60}
          className="opacity-60"
        />
      </div>
      <h3 className="font-bold text-gray-900 mb-1">{name}</h3>
      <p className="text-gray-500 text-sm">{count}</p>
    </div>
  );
}
