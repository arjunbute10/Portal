import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const withAuthentication = (Component: any) => {
  return (props: any) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };
};

export default withAuthentication;

export const withNoAuth = (Component: any) => {
  const WithNoAuth = (props: any) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
      return <Navigate to="/" />; 
    }

    return <Component {...props} />;
  };

  return WithNoAuth;
};
