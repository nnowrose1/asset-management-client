import React from 'react';
import useAuth from '../customHooks/useAuth';
import { useLocation } from 'react-router';
import Loader from '../components/Loader';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
  return <Loader></Loader>;
  }
  if (!user) {
 return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;