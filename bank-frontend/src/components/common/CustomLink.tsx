import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { Grid, Link } from '@mui/material';

interface Props {
  to: string;
  text: string;
}

const CustomLink = ({ to, text }: Props) => {
  return (
    <Grid container justifyContent='flex-end'>
      <Grid item>
        <RouterLink to={to}>
          <Link variant='body2'>{text}</Link>
        </RouterLink>
      </Grid>
    </Grid>
  );
};

export default CustomLink;
