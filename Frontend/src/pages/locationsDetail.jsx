import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Home, ArrowLeft, ChevronDown } from 'lucide-react';

export default function Properties() {
  let navigate = useNavigate();
  let { id } = useParams();  // Get the location ID from the URL
  const [properties, setProperties] = useState([]);  // State to store the properties
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track any errors
  const [location, setLocation] = useState(null);  // State for location details

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        let res = await axios.get(`http://localhost:5000/location/${id}`);
        setProperties(res.data.totalProperties);  // Set properties from the totalProperties field
        setLocation(res.data);  // Assuming location details come in the response
        setLoading(false);
        console.log(res.data.totalProperties);
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Failed to load properties");
        setLoading(false);
      }
    }
    getData();
  }, [id]); // Dependency on id to re-fetch when it changes

  // Format price with commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 font-medium">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Back Navigation */}
         <div className="p-4">
            <button onClick={() => navigate(-1)}
              className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to All locations
            </button>
          </div>
    
      
      {/* Location Header Banner - Only show if location data exists */}
      {location && (
        <div className="relative w-11/12 max-w-6xl mx-auto">
          <div className="h-80 overflow-hidden rounded-lg">
            <img 
              src={location.cityPoster || "https://www.trawell.in/admin/images/upload/094484563Indore_Rajwada_Palace_Main.jpg"} 
              alt={location.cityName || "Location"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 rounded-lg"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h1 className="text-4xl font-bold">{location.cityName || "Indore"}</h1>
            
            <div className="flex items-center mt-2">
              <MapPin className="w-5 h-5 mr-1" />
              <p>{location.locationArea || "Area"}</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mt-4 inline-flex items-center">
              <Home className="w-5 h-5 mr-2" />
              <span>{properties.length} {properties.length === 1 ? 'Property' : 'Properties'} Available</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Properties Section */}
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Available Properties</h2>
        <p className="text-gray-600 text-center mb-8">Browse through our exclusive properties</p>
        
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img 
                    src={property.propertyPoster} 
                    alt={property.propertyName} 
                    className="w-full h-64 object-cover" 
                  />
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-md">
                    {property.propertyType}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{property.propertyName}</h3>
                  <p className="text-gray-600 mb-3">{property.locationAddress || "Address not available"}</p>
                  <p className="text-gray-600 mb-4">{property.description || "No description available"}</p>
                  <p className="text-2xl font-bold text-gray-800 mb-4">₹{formatPrice(property.propertyPrice)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-200 p-6 rounded-full inline-block">
              <Home className="h-12 w-12 text-gray-500" />
            </div>
            <h3 className="mt-4 text-xl font-medium">No properties available</h3>
            <p className="mt-2 text-gray-600">Check back later for new listings</p>
          </div>
        )}
      </div>
    </div>
  );
}