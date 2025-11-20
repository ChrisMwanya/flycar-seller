import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CarCard from "./components/CarCard";
import CategoryCard from "./components/CategoryCard";
import NewsCard from "./components/NewsCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-r from-gray-800 to-gray-700">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-70"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            {/* Fallback image si la vidéo ne charge pas */}
            <Image
              src="/Screen.png"
              alt="Hero Car"
              fill
              className="object-cover opacity-80"
              priority
            />
          </video>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl text-white">
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              LA MARKETPLACE<br />POUR VOS BESOINS AUTO
            </h1>
            <a href="/cars">
              <button className="bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded font-semibold transition-colors">
                COMMENCER
              </button>
            </a>
          </div>
        </div>

        {/* Search Bar */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 pb-8">
            <div className="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-4">
              <input
                type="text"
                placeholder="Que recherchez-vous ?"
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button className="bg-accent hover:bg-accent-dark text-white px-8 py-2 rounded font-semibold transition-colors">
                RECHERCHER
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Cars Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-secondary text-sm font-semibold mb-1">DÉCOUVREZ LES DERNIÈRES</p>
            <h2 className="text-3xl font-bold text-gray-900">VOITURES RÉCENTES</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <CarCard
            image="/Screen.png"
            title="ROLLS-ROYCE PHANTOM"
            price="$58,000"
            year="2024"
            featured={true}
          />
          <CarCard
            image="/Screen.png"
            title="BMW X5"
            price="$45,000"
            year="2023"
            featured={true}
          />
          <CarCard
            image="/Screen.png"
            title="BMW X7"
            price="$52,000"
            year="2024"
            featured={true}
          />
          <CarCard
            image="/Screen.png"
            title="GREAT HYUNDAI"
            price="$28,000"
            year="2023"
          />
          <CarCard
            image="/Screen.png"
            title="MERCEDES BEN"
            price="$65,000"
            year="2024"
          />
          <CarCard
            image="/Screen.png"
            title="AUDI A8"
            price="$48,000"
            year="2023"
          />
        </div>

        <div className="text-center">
          <a href="/cars">
            <button className="bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded font-semibold transition-colors">
              PARCOURIR TOUS LES VÉHICULES
            </button>
          </a>
        </div>
      </section>

      {/* Auto Categories Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-secondary text-sm font-semibold mb-1">TROUVEZ VOTRE VOITURE PARFAITE PAR</p>
            <h2 className="text-3xl font-bold text-gray-900">CATÉGORIES AUTO</h2>
          </div>
          <a href="/cars">
            <button className="text-secondary font-semibold hover:text-secondary-dark">
              VOIR TOUT →
            </button>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <CategoryCard name="CABRIOLET" count="(128)" icon="/images/Livrables-flycar-icone1.png" />
          <CategoryCard name="BERLINE" count="(241)" icon="/images/Livrables-flycar-Icone2.png" />
          <CategoryCard name="COUPÉ SPORT" count="(187)" icon="/images/Livrables-flycar-Icone3.png" />
          <CategoryCard name="BREAK" count="(156)" icon="/images/Livrables-flycar-Icone4.png" />
          <CategoryCard name="COMPACTE" count="(213)" icon="/images/Livrables-flycar-icone1.png" />
          <CategoryCard name="PICK-UP" count="(94)" icon="/images/Livrables-flycar-Icone2.png" />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/Screen.png"
                alt="Testimonial"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-gray-300 text-lg mb-6 italic">
                &ldquo;Une plateforme exceptionnelle pour acheter et vendre des véhicules. Interface intuitive et service client réactif.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent rounded-full mr-3"></div>
                <div>
                  <p className="font-bold">MARIE DUBOIS</p>
                  <p className="text-gray-400 text-sm">Cliente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <p className="text-secondary text-sm font-semibold mb-1">DEPUIS LE BLOG</p>
          <h2 className="text-3xl font-bold text-gray-900">DERNIÈRES ACTUALITÉS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NewsCard
            image="/Screen.png"
            date="23 MARS 2024"
            category="VOITURES"
            title="POURQUOI ACHETER VOTRE VOITURE SUR FLYCAR"
          />
          <NewsCard
            image="/Screen.png"
            date="20 MARS 2024"
            category="ACTUALITÉS"
            title="COMPRENDRE LES TECHNOLOGIES AUTOMOBILES MODERNES"
          />
          <NewsCard
            image="/Screen.png"
            date="18 MARS 2024"
            category="CONSEILS"
            title="CHOISIR LA BONNE VOITURE SELON VOTRE STYLE DE VIE"
          />
          <NewsCard
            image="/Screen.png"
            date="15 MARS 2024"
            category="ASTUCES"
            title="COMMENT OBTENIR LES MEILLEURES OFFRES SUR VOTRE PROCHAINE VOITURE"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">DÉCOUVREZ UNE MARKETPLACE AVEC DES VOITURES ADAPTÉES</h2>
            <p className="text-blue-100">Trouvez votre véhicule parfait aujourd&apos;hui</p>
          </div>
          <a href="/cars">
            <button className="bg-accent text-white px-8 py-3 rounded font-semibold hover:bg-accent-dark transition-colors">
              COMMENCER
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

