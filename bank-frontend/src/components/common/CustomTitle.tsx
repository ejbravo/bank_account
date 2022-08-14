import React from 'react';

import { Typography } from '@mui/material';

interface Props {
  text: string;
}

const CustomTitle = ({ text }: Props) => {
  return (
    <Typography component='h1' variant='h5'>
      {text}
    </Typography>
  );
};

export default CustomTitle;
