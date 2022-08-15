import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { token } = useAuth();

  if (!token) return <Navigate to='/signin' />;

  return <>{children}</>;
};

export default PrivateRoute;
