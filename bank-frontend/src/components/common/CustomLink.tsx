import React from 'react';

import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

interface Props {
  to: string;
  text: string;
}

const CustomLink = ({ to, text }: Props) => {
  return (
    <Grid container justifyContent='flex-end'>
      <Grid item>
        <Link to={to}>{text}</Link>
      </Grid>
    </Grid>
  );
};

export default CustomLink;
