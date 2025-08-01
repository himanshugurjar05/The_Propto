import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LocationAdmin() {
  const [formData, setFormData] = useState({
    propertyPoster: '',
    propertyName: '',
    propertyType: '',
    propertyPrice: '',
    totalProperties: ''
  });

  const [locations, setLocations] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await axios.get('http://localhost:5000/properties');
        const locationData = res.data.filter(loc => loc.propertyName);
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
      const res = await axios.post('http://localhost:5000/properties/create', formData);
      alert('Location added successfully!');
      setFormData({
        propertyPoster: '',
        propertyName: '',
        propertyType: '',
        propertyPrice: '',
        totalProperties: ''
      });
      setShowForm(false);
      setLocations(prev => [...prev, res.data]);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add location.');
    }
  };

  // Stats Calculations 3 Div Data
  const totalProperties = locations.length;

  const totalValue = locations.reduce(
    (sum, loc) => sum + parseInt(loc.propertyPrice || 0),
    0
  );

  const uniqueLocationNames = new Set(locations.map(loc => loc.propertyName));
  const totalLocations = uniqueLocationNames.size;


  return (
    <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Property Management</h1>
          <p className="text-gray-600">Manage property listings and details</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <span>+</span> Add New Property
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Add New Property</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="propertyPoster" className="block text-sm font-medium text-gray-700 mb-1">Property Poster URL</label>
                <input
                  id="propertyPoster"
                  type="text"
                  name="propertyPoster"
                  value={formData.propertyPoster}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
                <input
                  id="propertyName"
                  type="text"
                  name="propertyName"
                  value={formData.propertyName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <input
                  id="propertyType"
                  type="text"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="propertyPrice" className="block text-sm font-medium text-gray-700 mb-1">Property Price</label>
                <input
                  id="propertyPrice"
                  type="number"
                  name="propertyPrice"
                  value={formData.propertyPrice}
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
                  value={formData.totalProperties}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
          <p className="text-blue-600 font-medium mb-2">Total Properties</p>
          <h2 className="text-4xl font-bold text-blue-800">{totalProperties}</h2>
        </div>

        <div className="bg-green-50 rounded-lg p-6 shadow-sm">
          <p className="text-green-600 font-medium mb-2">Total Value</p>
          <h2 className="text-4xl font-bold text-green-800">₹{totalValue.toLocaleString()}</h2>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6 shadow-sm">
          <p className="text-yellow-600 font-medium mb-2">Locations</p>
          <h2 className="text-4xl font-bold text-yellow-800">{totalLocations}</h2>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg border">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Property Name</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Properties</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {locations.length > 0 ? (
              locations.map((loc) => (
                <tr key={loc._id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-500">{loc._id ? loc._id.substring(0, 8) + '...' : 'N/A'}</td>
                  <td className="py-4 px-4">
                    <img src={loc.propertyPoster} alt={loc.propertyName} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">{loc.propertyName}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">₹{parseInt(loc.propertyPrice).toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    <span className={`px-2 py-1 text-xs rounded-full ${parseInt(loc.totalProperties || 0) > 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                      }`}>
                      {loc.totalProperties || 0} Properties
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">✏️</button>
                      <button className="text-red-600 hover:text-red-900">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
                  No locations found. Add your first location.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
