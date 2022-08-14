import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const SmallBox = ({ children }: Props) => {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );
};

export default SmallBox;
