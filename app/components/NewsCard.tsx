import React from 'react';
import Image from 'next/image';

interface NewsCardProps {
  image: string;
  date: string;
  title: string;
  category: string;
}

export default function NewsCard({ image, date, title, category }: NewsCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <div className="relative h-40">
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
          <span className="bg-secondary-light/20 text-secondary-dark px-2 py-1 rounded">{category}</span>
          <span>{date}</span>
        </div>
        
        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 hover:text-secondary cursor-pointer">
          {title}
        </h3>
      </div>
    </div>
  );
}
