import React from 'react';

import { Alert, AlertColor, AlertTitle, Box } from '@mui/material';

interface Props {
  type?: AlertColor;
  messages: string[];
}

const CustomAlert = ({ type, messages }: Props) => {
  return (
    <Box sx={{ mt: 2, width: 1 }} textAlign='left'>
      <Alert severity={type ?? 'error'}>
        <AlertTitle>{type ?? 'error'}</AlertTitle>
        <ul>
          {messages.map((message, key) => (
            <li key={key}>{message}</li>
          ))}
        </ul>
      </Alert>
    </Box>
  );
};

export default CustomAlert;
