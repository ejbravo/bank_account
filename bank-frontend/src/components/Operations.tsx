import React, { useState, ChangeEvent } from 'react';

import axios, { AxiosRequestConfig } from 'axios';

import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import CustomButton from './common/CustomButton';
import { Movement, MovementType, Operation } from '../types';
import useAuth from '../hooks/useAuth';

interface Props {
  onChange: (movement: Movement) => void;
}

const Operations = ({ onChange }: Props) => {
  const { token } = useAuth();

  const [amount, setAmount] = useState<number>(0);

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.stopPropagation();
    const { target } = event;
    const { value } = target;

    if (!value) setAmount(0);
    else setAmount(parseInt(value));
  };

  const onClickHandler = async (type: MovementType) => {
    console.log(type);
    const url = `http://localhost:3001/movements/${type}`;
    const operation: Operation = { amount };
    const axiosConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.post(url, operation, axiosConfig);
      console.log(data);
      onChange(data);
      setAmount(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ with: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor='outlined-adornment-amount'>Amount</InputLabel>
            <OutlinedInput
              id='outlined-adornment-amount'
              value={amount}
              onChange={(event) => onChangeHandler(event)}
              startAdornment={
                <InputAdornment position='start'>€</InputAdornment>
              }
              label='Amount'
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <CustomButton
            label='Income'
            color='primary'
            onClick={() => onClickHandler(MovementType.INCOME)}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomButton
            label='Withdraw'
            color='secondary'
            onClick={() => onClickHandler(MovementType.WITHDRAW)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Operations;
