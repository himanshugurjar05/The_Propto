import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdminNavbar from './pages/admin/navbaradmin.jsx';
import UserNavbar from './components/navbar.jsx';

import Home from './pages/home.jsx';
import Locations from './pages/locations.jsx';
import LocationsDetail from './pages/locationsDetail.jsx';
import Properties from './pages/properties.jsx';
import PropertyDetails from './pages/propertyDetails.jsx';
import LocationForm from './pages/admin/locationform.jsx';
import PropertyForm from './pages/admin/propertyform.jsx';
import AdminLocation from './pages/admin/locationadmin.jsx';
import AdminProperty from './pages/admin/propertyadmin.jsx';

import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import PrivateRoute from './components/privateRoute.jsx';

export default function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <BrowserRouter>
        {/* Show navbar based on login and role */}
        {user?.user?.role === 'admin' ? <AdminNavbar /> : <UserNavbar />}

        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/locations' element={<Locations />} />
          <Route path='/locations/:id' element={<LocationsDetail />} />
          <Route path='/properties' element={<Properties />} />
          <Route path='/properties/:id' element={<PropertyDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          {/* Location Form */}
          <Route path='/locationform' element={<LocationForm/>} />
          <Route path='/propertyform' element={<PropertyForm/>} />
          

          {/* Admin-only Private Routes */}
          <Route
            path='/locationadmin'
            element={
              <PrivateRoute allowedRole='admin'>
                <AdminLocation />
              </PrivateRoute>
            }
          />
          <Route
            path='/propertyadmin'
            element={
              <PrivateRoute allowedRole='admin'>
                <AdminProperty />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
