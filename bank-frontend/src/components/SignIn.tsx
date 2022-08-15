import React, { createContext, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

import {
  LockerIcon,
  CustomTitle,
  CustomForm,
  CustomLink,
  CustomAlert,
} from './common';
import { PageLayout, SmallBox } from '../layouts';
import { AuthDto, Token } from '../types';
import useAuth from '../hooks/useAuth';

const SignIn = () => {
  const text = 'Sign In';

  const { singIn } = useAuth();
  const [error, setError] = useState<string[]>([]);

  // link literals
  const to = '/signup';
  const linkText = `Don't have an account? Sign Up`;

  const onSubmit = async (authDto: AuthDto) => {
    const signInUrl = `http://localhost:3001/auth/signin`;

    try {
      const { data } = await axios.post(signInUrl, authDto);
      const { accessToken } = data as Token;
      singIn(accessToken);
    } catch (error) {
      if ((error as AxiosError).response) {
        const errorData = (error as AxiosError).response?.data;
        if (errorData) {
          const message = (errorData as any).message;
          const errors = typeof message === 'string' ? [message] : message;
          setError(errors);
        }
      } else {
        const message = (error as any).message;
        setError(message);
      }
    }
  };

  return (
    <PageLayout width='xs'>
      <SmallBox>
        <LockerIcon />
        <CustomTitle text={text} />
        <CustomForm buttonText={text} onSubmit={onSubmit} />
        <CustomLink to={to} text={linkText} />
        {!!error.length && <CustomAlert messages={error} />}
      </SmallBox>
    </PageLayout>
  );
};

export default SignIn;
