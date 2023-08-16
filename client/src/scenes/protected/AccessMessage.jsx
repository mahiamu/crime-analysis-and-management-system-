import { Lock } from '@mui/icons-material';
import { Alert, AlertTitle, Button, Container } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { isOpenLogin } from 'state'


const AccessMessage = () => {
  const dispatch = useDispatch();
  return (
    <Container sx={{ py: 5 }}>
      <Alert severity="error" variant="outlined">
        <AlertTitle>Forbidden Access</AlertTitle>
        Please login or register to access this page
        <Button
          variant="outlined"
          
          sx={{ ml: 2 , color: (theme) => theme.palette.secondary[200]}}
          
          startIcon={<Lock />}
          onClick={() => dispatch(isOpenLogin())}
        >
          login
        </Button>
      </Alert>
    </Container>
  );
};

export default AccessMessage;