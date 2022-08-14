import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { LockerIcon, CustomTitle, CustomForm, CustomLink } from './common';
import { PageLayout, SmallBox } from '../layouts';
import { AuthDto, Token } from '../types';
import axios from 'axios';

const SignIn = () => {
  const text = 'Sign In';

  const navigate = useNavigate();

  // link literals
  const to = '/signup';
  const linkText = `Don't have an account? Sign Up`;

  const onSubmit = async (authDto: AuthDto) => {
    const signInUrl = `http://localhost:3001/auth/signin`;

    try {
      const { data } = await axios.post(signInUrl, authDto);
      const { accessToken } = data as Token;
      navigate('/movements');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout>
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
