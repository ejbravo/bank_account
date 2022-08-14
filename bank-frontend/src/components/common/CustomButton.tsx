import React from 'react';
import { Button } from '@mui/material';

interface Props {
  label: string;
}

const CustomButton = ({ label }: Props) => {
  return (
    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
      {label}
    </Button>
  );
};

export default CustomButton;
