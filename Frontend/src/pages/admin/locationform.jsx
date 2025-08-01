import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../components/footer';

export default function LocationAdmin() {
  const [formData, setFormData] = useState({
    cityPoster: '',
    cityName: '',
    streetName: '',
    totalProperties: ''
  });

  const [locations, setLocations] = useState([]);
  const [showForm, setShowForm] = useState(true); // ✅ Form open by default

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await axios.get('http://localhost:5000/location');
        const locationData = res.data.filter(loc => loc.cityName);
        setLocations(locationData);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    }

    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/location/create', formData);
      alert('Location added successfully!');
      setFormData({
        cityPoster: '',
        cityName: '',
        streetName: '',
        totalProperties: ''
      });
      setLocations(prev => [...prev, res.data]);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add location.');
    }
  };

  const totalProperties = locations.reduce((sum, loc) => sum + parseInt(loc.totalProperties || 0), 0);
  const avgProperties = locations.length > 0 ? Math.round(totalProperties / locations.length) : 0;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Location Management</h1>
        <p className="text-gray-600">Manage city locations and their properties</p>
      </div>

      {/* ✅ Form always shown */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Add New Location</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cityPoster" className="block text-sm font-medium text-gray-700 mb-1">City Poster URL</label>
                <input
                  id="cityPoster"
                  type="text"
                  name="cityPoster"
                  placeholder="Enter poster image URL"
                  value={formData.cityPoster}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="cityName" className="block text-sm font-medium text-gray-700 mb-1">City Name</label>
                <input
                  id="cityName"
                  type="text"
                  name="cityName"
                  placeholder="Enter city name"
                  value={formData.cityName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="streetName" className="block text-sm font-medium text-gray-700 mb-1">Street Name</label>
                <input
                  id="streetName"
                  type="text"
                  name="streetName"
                  placeholder="Enter street name"
                  value={formData.streetName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="totalProperties" className="block text-sm font-medium text-gray-700 mb-1">Total Properties</label>
                <input
                  id="totalProperties"
                  type="text"
                  name="totalProperties"
                  placeholder="Enter number of properties"
                  value={formData.totalProperties}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Save Location
              </button>
            </div>
          </form>
        </div>
      )}
      <Footer/>
    </div>
  );
}
