import React, { FormEvent, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { AuthDto } from '../../types';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
  buttonText: string;
  onSubmit: (authDto: AuthDto) => void;
}

const CustomForm = ({ buttonText, onSubmit }: Props) => {
  const [showPin, setShowPin] = useState<boolean>(false);

  // submitHandler
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const cardId = data.get('cardId')?.toString();
    const pin = data.get('pin')?.toString();

    if (cardId && pin) onSubmit({ cardId, pin });
  };

  return (
    <Box
      component='form'
      sx={{ mt: 3, display: 'flex', flexWrap: 'wrap' }}
      onSubmit={submitHandler}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            name='cardId'
            label='Card number'
            helperText='Please, enter you card number (16 digits)'
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-pin'>PIN</InputLabel>
            <OutlinedInput
              id='outlined-adornment-pin'
              name='pin'
              type={showPin ? 'text' : 'password'}
              placeholder='Please, enter your PIN (4 digits)'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle pin visibility'
                    onClick={() => setShowPin(!showPin)}
                    onMouseDown={(event) => event.preventDefault()}
                    edge='end'
                  >
                    {showPin ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='PIN'
            />
          </FormControl>
        </Grid>
      </Grid>

      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        {buttonText}
      </Button>
    </Box>
  );
};

export default CustomForm;
