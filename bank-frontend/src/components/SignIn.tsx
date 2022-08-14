import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { Box, Grid, Link, TextField } from '@mui/material';
import {
  LockerIcon,
  CustomButton,
  CustomTitle,
  CustomForm,
  CustomLink,
} from './common';
import { PageLayout, SmallBox } from '../layouts';

interface Props {}

const SignIn = ({}: Props) => {
  const text = 'Sign In';

  // link literals
  const to = '/signup';
  const linkText = `Don't have an account? Sign Up`;

  return (
    <PageLayout>
      <SmallBox>
        <LockerIcon />
        <CustomTitle text={text} />
        <CustomForm />
        <CustomButton label={text} />
        <CustomLink to={to} text={linkText} />
      </SmallBox>
    </PageLayout>
  );
};

export default SignIn;
