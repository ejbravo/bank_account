import Container from '@mui/material/Container';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const PageLayout = ({ children }: Props) => {
  return (
    <Container component='main' maxWidth='xs'>
      {children}
    </Container>
  );
};

export default PageLayout;
