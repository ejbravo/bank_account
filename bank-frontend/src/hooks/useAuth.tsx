import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useSessionStorage from './useSessionStorage';

const defaultValue = '';
const initialContext = {
  token: defaultValue,
  singIn: (val: string) => {},
  logout: () => {},
};
const AuthContext = createContext(initialContext);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { storedValue: token, setValue: setToken } = useSessionStorage({
    key: 'token',
    defaultValue,
  });

  const navigate = useNavigate();

  const singIn = async (_token: string) => {
    setToken(_token);
    navigate('/movements');
  };

  const logout = () => {
    setToken(defaultValue);
    navigate('/signin');
  };

  const value = useMemo(() => ({ token, singIn, logout }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
