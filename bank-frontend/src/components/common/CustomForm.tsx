import React, { FormEvent } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { AuthDto } from '../../types';

interface Props {
  buttonText: string;
  onSubmit: (authDto: AuthDto) => void;
}

const CustomForm = ({ buttonText, onSubmit }: Props) => {
  // submitHandler
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const cardId = data.get('cardId')?.toString();
    const pin = data.get('pin')?.toString();

    if (cardId && pin) onSubmit({ cardId, pin });
  };

  return (
    <Box component='form' noValidate sx={{ mt: 3 }} onSubmit={submitHandler}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField name='cardId' label='Card number' required fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField name='pin' label='PIN' required fullWidth />
        </Grid>
      </Grid>
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        {buttonText}
      </Button>
    </Box>
  );
};

export default CustomForm;
