import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setAlert} from "state";


const Notification = () => {

  const dispatch = useDispatch();
  const alert = useSelector((state)=> state.global.alert);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    dispatch(setAlert({ ...alert, open: false } ));
  };
  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={alert.severity}
        sx={{ width: '100%' }}
        variant="filled"
        elevation={6}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;