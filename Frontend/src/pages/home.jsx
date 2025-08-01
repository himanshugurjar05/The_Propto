import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MapPin, Building2 } from 'lucide-react';
import Footer from '../components/footer.jsx';

export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[85vh] flex items-center justify-center bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1570129477492-45c003edd2be')]">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to <span className="text-indigo-400">The Propto</span></h1>
          <p className="text-lg mb-6">
            Discover, explore, and find your perfect property with ease. From apartments to villas — we've got it all.
          </p>
          <Link to="/properties">
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition">
              View Properties
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose The Propto?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <Home className="mx-auto mb-4 text-indigo-600 w-10 h-10" />
            <h3 className="text-xl font-semibold mb-2">Wide Range of Listings</h3>
            <p className="text-gray-600">Browse hundreds of verified residential and commercial properties.</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <MapPin className="mx-auto mb-4 text-indigo-600 w-10 h-10" />
            <h3 className="text-xl font-semibold mb-2">Prime Locations</h3>
            <p className="text-gray-600">Find properties in the most desirable and growing neighborhoods.</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <Building2 className="mx-auto mb-4 text-indigo-600 w-10 h-10" />
            <h3 className="text-xl font-semibold mb-2">Trusted Platform</h3>
            <p className="text-gray-600">Safe, secure, and user-friendly platform trusted by thousands.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to find your dream property?</h2>
        <Link to="/properties">
          <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded hover:bg-gray-200 transition">
            Explore Now
          </button>
        </Link>
      </div>
      <Footer/>
    </div>
  );
}
