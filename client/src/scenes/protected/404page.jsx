import { Alert, AlertTitle, Container } from '@mui/material';
import React from 'react';


const PageNotFound = () => {
  
  return (
    <Container sx={{ py: 5 }}>
      <Alert severity="error" variant="outlined">
        <AlertTitle>404</AlertTitle>
        Oops! Page Not Found
      </Alert>
    </Container>
  );
};

export default PageNotFound;