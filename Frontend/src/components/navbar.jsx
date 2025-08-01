import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, MapPin, Building, User, Settings, LogOut } from 'lucide-react';

export default function UserNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hostMenuOpen, setHostMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const hostMenuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
    setHostMenuOpen(false); // close other dropdown
  };

  const toggleHostMenu = () => {
    if (!user) {
      navigate('/login');
    } else {
      setHostMenuOpen(prev => !prev);
      setDropdownOpen(false); // close other dropdown
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        hostMenuRef.current && !hostMenuRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        setHostMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-blue-600 p-4 shadow-md relative z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center text-white text-xl font-bold">
          <Home className="mr-2" size={24} />
          <span>The Propto</span>
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center text-white font-medium hover:text-blue-200 transition-colors">
            <Home className="mr-1" size={18} />
            <span>Home</span>
          </Link>
          <Link to="/locations" className="flex items-center text-white font-medium hover:text-blue-200 transition-colors">
            <MapPin className="mr-1" size={18} />
            <span>Locations</span>
          </Link>
          <Link to="/properties" className="flex items-center text-white font-medium hover:text-blue-200 transition-colors">
            <Building className="mr-1" size={18} />
            <span>Properties</span>
          </Link>

          {user ? (
            <div className="relative flex items-center gap-4">
              {/* Become a host dropdown */}
              <div className="relative" ref={hostMenuRef}>
                <button
                  onClick={toggleHostMenu}
                  className=" text-white text-xl font-semibold px-4 py-1 rounded hover:bg-blue-500 transition-colors"
                >
                  Become a host
                </button>

                {hostMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg z-50">
                    <Link to="/locationform" className="block px-4 py-2 text-sm hover:bg-indigo-50 flex items-center gap-2 text-gray-700">
                      <MapPin size={16} /> Add New Location
                    </Link>
                    <Link to="/propertyform" className="block px-4 py-2 text-sm hover:bg-indigo-50 flex items-center gap-2 text-gray-700">
                      <Building size={16} /> Add New Property
                    </Link>
                  </div>
                )}
              </div>

              {/* Profile dropdown */}
              <div className="relative" ref={dropdownRef}>
                <img
                  src={user?.user?.profilePicture || 'https://via.placeholder.com/32'}
                  alt="profile"
                  className="w-10.5 h-10 rounded-full border-white border cursor-pointer"
                  onClick={toggleDropdown}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg z-50">
                    <Link to="/my-profile" className="block px-4 py-2 text-sm hover:bg-indigo-50 flex items-center gap-2 text-gray-700">
                      <User size={16} /> Profile
                    </Link>
                    <Link to="/my-courses" className="block px-4 py-2 text-sm hover:bg-indigo-50 flex items-center gap-2 text-gray-700">
                      <Building size={16} /> My Properties
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-indigo-50 flex items-center gap-2 text-gray-700">
                      <Settings size={16} /> Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Become a host (for guests) - redirects to login */}
              <button
                onClick={toggleHostMenu}
                className="bg-white text-blue-900 text-xl text-shadow-none font-semibold px-4 py-1 rounded hover:bg-blue-100 transition-colors"
              >
                Become a host
              </button>

              <Link
                to="/login"
                className="bg-white text-blue-900 font-semibold px-4 py-1 rounded hover:bg-blue-300 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-blue-900 font-semibold px-4 py-1 rounded hover:bg-yellow-200 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
