import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <Navigate to='/login' />;
  if (allowedRole && user.user.role !== allowedRole) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
