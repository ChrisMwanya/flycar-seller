import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/about" className="text-gray-700 hover:text-secondary font-medium">
            À PROPOS
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-secondary font-medium">
            CONTACT
          </Link>
          <Link href="/cars" className="text-gray-700 hover:text-secondary font-medium">
            VOITURES
          </Link>
        </nav>

          <div className="flex justify-between items-center">
          <Image
            src="/images/Livrables-flycar-logo1.png"
            alt="Flycar"
            width={200}
            height={80}
            className="h-30 w-auto"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Link 
            href="/login"
            className="text-gray-700 hover:text-secondary font-medium px-4 py-2 rounded transition-colors"
          >
            Connexion
          </Link>
          
          <Link 
            href="/register"
            className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-2 rounded transition-colors"
          >
            Inscription
          </Link>
        </div>
      </div>
    </header>
  );
}
