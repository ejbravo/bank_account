import React from 'react';

import axios, { AxiosRequestConfig } from 'axios';

import { Box, Grid } from '@mui/material';
import CustomButton from './common/CustomButton';
import { Movement, MovementType, Operation } from '../types';
import useAuth from '../hooks/useAuth';

interface Props {
  onChange: (movement: Movement) => void;
}

const Operations = ({ onChange }: Props) => {
  const { token } = useAuth();
  const onClickHandler = async (type: MovementType) => {
    console.log(type);
    const url = `http://localhost:3001/movements/${type}`;
    const operation: Operation = { amount: 100 };
    const axiosConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.post(url, operation, axiosConfig);
      console.log(data);
      onChange(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ with: 1 }}>
      <Grid container spacing={2}>
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
