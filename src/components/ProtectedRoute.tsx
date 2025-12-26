import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, admin, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRoles.length > 0 && admin) {
    const hasRequiredRole = requiredRoles.includes(admin.role);
    if (!hasRequiredRole) {
      // Redirect to appropriate dashboard based on admin's role
      if (admin.role === 'super-admin' || admin.role === 'administrator') {
        return <Navigate to="/admin-dashboard" replace />;
      } else {
        return <Navigate to="/admin-dashboard" replace />;
      }
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
