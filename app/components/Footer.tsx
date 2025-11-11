import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image 
              src="/images/Livrables-flycar-logo1.png" 
              alt="Flycar" 
              width={120} 
              height={40}
              className="mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm mb-4">
              Votre marketplace de confiance pour acheter et vendre des véhicules en toute sécurité et simplicité.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="text-gray-400">contact@flycar.com</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">LIENS RAPIDES</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-secondary">À propos</Link></li>
              <li><Link href="/pricing" className="hover:text-secondary">Nos tarifs</Link></li>
              <li><Link href="/services" className="hover:text-secondary">Nos services</Link></li>
              <li><Link href="/features" className="hover:text-secondary">Fonctionnalités</Link></li>
              <li><Link href="/blog" className="hover:text-secondary">Blog & Actualités</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">SERVICES</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/dealer" className="hover:text-secondary">Concessionnaires</Link></li>
              <li><Link href="/booking" className="hover:text-secondary">Réservation</Link></li>
              <li><Link href="/sell" className="hover:text-secondary">Vendre une voiture</Link></li>
              <li><Link href="/showrooms" className="hover:text-secondary">Showrooms</Link></li>
              <li><Link href="/contact" className="hover:text-secondary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">MEILLEURES VENTES</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/suv" className="hover:text-secondary">SUV</Link></li>
              <li><Link href="/truck" className="hover:text-secondary">Pick-up</Link></li>
              <li><Link href="/compact" className="hover:text-secondary">Compacte</Link></li>
              <li><Link href="/sedan" className="hover:text-secondary">Berline</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>Copyright © 2024. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
