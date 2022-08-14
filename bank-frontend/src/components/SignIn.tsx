import React, { createContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { LockerIcon, CustomTitle, CustomForm, CustomLink } from './common';
import { PageLayout, SmallBox } from '../layouts';
import { AuthDto, Token } from '../types';
import useAuth from '../hooks/useAuth';

const SignIn = () => {
  const text = 'Sign In';

  const { singIn } = useAuth();

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
      console.error(error);
    }
  };

  return (
    <PageLayout width='xs'>
      <SmallBox>
        <LockerIcon />
        <CustomTitle text={text} />
        <CustomForm buttonText={text} onSubmit={onSubmit} />
        <CustomLink to={to} text={linkText} />
      </SmallBox>
    </PageLayout>
  );
};

export default SignIn;
