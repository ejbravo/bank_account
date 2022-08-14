import React, { useState } from 'react';

interface Props {
  key: string;
  defaultValue: string;
}

const useSessionStorage = ({ key, defaultValue }: Props) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.sessionStorage.getItem(key);

      if (!value) {
        window.sessionStorage.setItem(key, defaultValue);
        return defaultValue;
      }

      return value;
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (value: string) => {
    window.sessionStorage.setItem(key, value);
    setStoredValue(value);
  };

  return { storedValue, setValue };
};

export default useSessionStorage;
