import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  LockerIcon,
  CustomTitle,
  CustomForm,
  CustomLink,
  CustomAlert,
} from './common';
import { PageLayout, SmallBox } from '../layouts';
import { AuthDto } from '../types';
import axios, { AxiosError } from 'axios';

const SignUp = () => {
  const text = 'Sign Up';

  const navigate = useNavigate();
  const [error, setError] = useState<string[]>([]);

  // link literals
  const to = '/signin';
  const linkText = 'Already have an account? Sign in';

  // submit SignUp
  const onSubmit = async (authDto: AuthDto) => {
    setError([]);
    const signUpUrl = `http://localhost:3001/auth/signup`;

    try {
      await axios.post(signUpUrl, authDto);
      navigate('/signin');
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
    <PageLayout>
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

export default SignUp;
