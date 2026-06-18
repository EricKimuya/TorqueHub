import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import useRole from '../hooks/useRole';

/**
 * Wraps a route that requires the user to be both logged in AND
 * have the 'admin' role. Non-admins (including logged-out users)
 * are redirected to "/".
 *
 * Usage in AppRoutes.jsx:
 *   <Route path="/admin" element={
 *     <AdminRoute><AdminDashboard /></AdminRoute>
 *   } />
 */
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const isAdmin = useRole('admin');

  if (isLoading) {
    return null; // swap for a loading spinner/skeleton if you have one
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;