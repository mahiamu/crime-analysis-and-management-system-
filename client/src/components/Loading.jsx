import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';


const Loading = () => {
  
  const loading = useSelector((state)=> state.global.loading);
  return (
    <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
      <CircularProgress sx={{ color: (theme) => theme.palette.secondary[200] }} />
    </Backdrop>
  );
};

export default Loading;