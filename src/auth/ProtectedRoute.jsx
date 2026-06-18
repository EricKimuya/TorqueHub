import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Wraps a route that requires the user to be logged in.
 * Unauthenticated users are redirected to "/" with the path they
 * tried to visit preserved in location state, so you can optionally
 * send them back there after login.
 *
 * Usage in AppRoutes.jsx:
 *   <Route path="/tickets" element={
 *     <ProtectedRoute><MyTickets /></ProtectedRoute>
 *   } />
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    // Avoid a flash-redirect while Auth0 is still determining session state
    return null; // swap for a loading spinner/skeleton if you have one
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;