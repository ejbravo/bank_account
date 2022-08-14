import React from 'react';
import { Button } from '@mui/material';

type ButtonType = 'submit' | 'button' | 'reset';
type ButtonColor =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning';

interface Props {
  label: string;
  type?: ButtonType;
  color?: ButtonColor;
  onClick?: () => void;
}

const CustomButton = ({ label, type, color, onClick }: Props) => {
  return (
    <Button
      type={type ?? 'button'}
      color={color ?? 'primary'}
      fullWidth
      variant='contained'
      sx={{ mt: 3, mb: 2 }}
      onClick={(_event) => onClick && onClick()}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
