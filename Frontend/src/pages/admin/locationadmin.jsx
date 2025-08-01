import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LocationAdmin() {
  const [formData, setFormData] = useState({
    cityPoster: '',
    cityName: '',
    streetName: '',
    totalProperties: ''
  });

  const [locations, setLocations] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await axios.get('http://localhost:5000/location');
        console.log("Fetched locations:", res.data);

        // ✅ Only accept data shaped like locations
        const locationData = res.data.filter(loc => loc.cityName); // crude filter
        setLocations(locationData);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    }

    fetchLocations();
  }, []);

  // DELETE location by ID
  const deleteLocation = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/location/${id}`);
      setLocations((prev) => prev.filter((loc) => loc._id !== id));
      alert('Location deleted successfully!');
    } catch (error) {
      console.error('Error deleting location:', error);
      alert('Failed to delete location.');
    }
  };

  // UPDATE location by ID
  const updateLocation = async (id, updatedData) => {
    try {
      const res = await axios.put(`http://localhost:5000/location/${id}`, updatedData);
      setLocations((prev) =>
        prev.map((loc) => (loc._id === id ? res.data : loc))
      );
      alert('Location updated successfully!');
    } catch (error) {
      console.error('Error updating location:', error);
      alert('Failed to update location.');
    }
  };


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
      setShowForm(false);
      // Refresh locations list
      setLocations(prev => [...prev, res.data]);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add location.');
    }
  };

  // Calculate total properties across all locations
  const totalProperties = locations.reduce((sum, loc) => sum + parseInt(loc.totalProperties || 0), 0);

  // Calculate average properties per location
  const avgProperties = locations.length > 0 ? Math.round(totalProperties / locations.length) : 0;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Location Management</h1>
          <p className="text-gray-600">Manage city locations and their properties</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <span>+</span> Add New Location
        </button>
      </div>

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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
          <p className="text-blue-600 font-medium mb-2">Total Locations</p>
          <h2 className="text-4xl font-bold text-blue-800">{locations.length}</h2>
        </div>

        <div className="bg-green-50 rounded-lg p-6 shadow-sm">
          <p className="text-green-600 font-medium mb-2">Total Properties</p>
          <h2 className="text-4xl font-bold text-green-800">{totalProperties}</h2>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6 shadow-sm">
          <p className="text-yellow-600 font-medium mb-2">Avg Properties/Location</p>
          <h2 className="text-4xl font-bold text-yellow-800">{avgProperties}</h2>
        </div>
      </div>

      {/* Location Table */}
      <div className="overflow-x-auto shadow-md rounded-lg border">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City Name</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Properties</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {locations.length > 0 ? (
              locations.map((loc) => (
                <tr key={loc._id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-500">{loc._id ? loc._id.substring(0, 8) + '...' : 'N/A'}</td>
                  <td className="py-4 px-4">
                    <img src={loc.cityPoster} alt={loc.cityName} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className="text-indigo-600 mr-2">📍</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{loc.cityName}</p>
                        <p className="text-xs text-gray-500">{loc.streetName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${(Array.isArray(loc.totalProperties) ? loc.totalProperties.length : parseInt(loc.totalProperties) || 0) > 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'}`}>
                      {(Array.isArray(loc.totalProperties) ? loc.totalProperties.length : loc.totalProperties || 0)} Properties
                    </span>

                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button onClick={() => {
                        setFormData({
                          cityPoster: loc.cityPoster,
                          cityName: loc.cityName,
                          streetName: loc.streetName,
                          totalProperties: loc.totalProperties._id
                        });
                        console.log(loc.totalProperties);
                        setEditingId(loc._id); // ✅ critical
                        setIsEditing(true);    // ✅ critical
                        setShowForm(true);
                      }}

                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        ✏️
                      </button>
                      <button onClick={() => deleteLocation(loc._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
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