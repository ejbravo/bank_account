import { Breakpoint } from '@mui/material';
import Container from '@mui/material/Container';
import React, { ReactNode } from 'react';

interface Props {
  width: Breakpoint;
  children: ReactNode;
}

const PageLayout = ({ width, children }: Props) => {
  return (
    <Container component='main' maxWidth={width}>
      {children}
    </Container>
  );
};

export default PageLayout;
