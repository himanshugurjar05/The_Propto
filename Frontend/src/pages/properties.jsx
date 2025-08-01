import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react'; // Ensure 'lucide-react' is installed
import Footer from '../components/footer.jsx';

export default function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get('http://localhost:5000/properties');
        setProperties(res.data);
      } catch (error) {
        console.error('Error fetching properties data:', error);
      }
    }
    getData();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-2 text-center">All Properties</h1>
      <p className="text-gray-600 text-center mb-8">Discover our exclusive properties</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img
                src={property.propertyPoster}
                alt={property.propertyName}
                className="w-full h-56 object-cover"
              />
              <div className="flex gap-26 absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black/70 to-transparent w-full">
                <h2 className="text-2xl font-bold">{property.propertyName}</h2>
                <div className="flex items-center mt-1">
                  <MapPin size={16} className="mr-1" />
                  <p className="text-sm">
                    {typeof property.totalLocation === 'string' ? property.totalLocation : 'Indore'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-4">
              <div>
                <p className="text-sm text-gray-950 mb-1">
                  <strong>Type:</strong> {property.propertyType}
                </p>
                <p className="text-sm text-gray-950 mb-1">
                  <strong>Price:</strong> ₹{property.propertyPrice}
                </p>
              </div>

               {/* View Details Button */}
               <Link to={`/properties/${property._id}`}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition">
                 View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}
