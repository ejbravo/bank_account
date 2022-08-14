import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { Grid, TextField, Box, Link } from '@mui/material';
import {
  LockerIcon,
  CustomButton,
  CustomTitle,
  CustomForm,
  CustomLink,
} from './common';
import { PageLayout, SmallBox } from '../layouts';

interface Props {}

const SignUp = ({}: Props) => {
  const text = 'Sign Up';

  // link literals
  const to = '/signin';
  const linkText = 'Already have an account? Sign in';

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

export default SignUp;
