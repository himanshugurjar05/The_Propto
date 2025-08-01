import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Home, ArrowLeft } from 'lucide-react';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await axios.get(`http://localhost:5000/properties/${id}`);
        setProperty(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('Failed to load property details.');
        setLoading(false);
      }
    }

    fetchProperty();
  }, [id]);

  const formatPrice = (price) =>
    price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Back Button */}
      <div className="p-4">
        <button onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-5 h-5 mr-1" />
           Back to Properties
        </button>
      </div>

      {/* Property Banner */}
      <div className="max-w-5xl mx-auto p-4">
        <div className="overflow-hidden rounded-lg mb-6">
          <img
            src={property.propertyPoster}
            alt={property.propertyName}
            className="w-full h-80 object-cover"
          />
        </div>

        {/* Property Info */}
        <h1 className="text-4xl font-bold mb-2">{property.propertyName}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-5 h-5 mr-1" />
          <p>{property.propertyAddress || 'No address provided'}</p>
        </div>

        <p className="text-lg mb-4">{property.description || 'No description available'}</p>

        <p className="text-2xl font-bold text-gray-800 mb-4">
          Price: ₹{formatPrice(property.propertyPrice)}
        </p>

        <div className="text-sm text-gray-700">
          <strong>Type:</strong> {property.propertyType}
        </div>
      </div>
    </div>
  );
}
