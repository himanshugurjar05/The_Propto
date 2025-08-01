import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import Footer from '../components/footer.jsx';

export default function Locations() {
  let [locations, setLocations] = useState([])

  useEffect(() => {
    async function getData() {
      try {
        let Res = await axios.get('http://localhost:5000/location');
        setLocations(Res.data);  // Set the location data
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    }
    getData()
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-2 text-center">Discover Our Locations</h1>
      <p className="text-gray-600 text-center mb-8">Browse through our premium properties in these exclusive neighborhoods</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {
          locations.map((location, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={location.cityPoster}
                  alt={location.cityName}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black/70 to-transparent w-full">
                  <h2 className="text-2xl font-bold">{location.cityName}</h2>
                  <div className="flex items-center mt-1">
                    <MapPin size={16} className="mr-1" />
                    <p className="text-sm">{location.streetName}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 mr-2 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span className="text-gray-700">{location.totalProperties ? location.totalProperties.length : 0} Property Available</span>
                </div>
                
                <Link to={`/locations/${location._id}`} 
                  className="block w-full py-3 text-center bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-300">
                  View Properties
                </Link>
              </div>
            </div>
          ))
        }
      </div>
      <Footer/>
    </div>
  )
}