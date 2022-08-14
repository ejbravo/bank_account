import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { Grid, TextField, Box, Link, Button } from '@mui/material';

import PageLayout from '../layouts/PageLayout';
import LockerIcon from './common/LockerIcon';
import SmallBox from '../layouts/SmallBox';

interface Props {}

const SignUp = ({}: Props) => {
  return (
    <PageLayout>
      <SmallBox>
        <LockerIcon />
        <h1>Sign Up</h1>
        <Box component='form' noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField name='cardId' label='Card number' required fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField name='pin' label='PIN' required fullWidth />
            </Grid>
          </Grid>
        </Box>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <RouterLink to='/signin'>
              <Link variant='body2'>Already have an account? Sign in</Link>
            </RouterLink>
          </Grid>
        </Grid>
      </SmallBox>
    </PageLayout>
  );
};

export default SignUp;
