import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Mock role check using localStorage (backend will replace this with JWT)
  const userRole = localStorage.getItem('userRole') || 'user';
  if (userRole !== 'admin') {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;