import React from 'react';
import { Box, Grid, TextField } from '@mui/material';

interface Props {}

const CustomForm = ({}: Props) => {
  return (
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
  );
};

export default CustomForm;
