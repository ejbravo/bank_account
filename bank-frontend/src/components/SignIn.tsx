import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { Box, Button, Grid, Link, TextField } from '@mui/material';
import PageLayout from '../layouts/PageLayout';
import SmallBox from '../layouts/SmallBox';
import LockerIcon from './common/LockerIcon';

interface Props {}

const SignIn = ({}: Props) => {
  return (
    <PageLayout>
      <SmallBox>
        <LockerIcon />
        <h1>Sign In</h1>
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
          Sign In
        </Button>
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <RouterLink to='/signup'>
              <Link variant='body2'>Don't have an account? Sign Up</Link>
            </RouterLink>
          </Grid>
        </Grid>
      </SmallBox>
    </PageLayout>
  );
};

export default SignIn;
