import React from 'react';

import { Typography } from '@mui/material';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline'
  | 'inherit';
interface Props {
  text: string;
  variant?: Variant;
}

const CustomTitle = ({ text, variant }: Props) => {
  return (
    <Typography component='h1' variant={variant ?? 'h5'}>
      {text}
    </Typography>
  );
};

export default CustomTitle;
