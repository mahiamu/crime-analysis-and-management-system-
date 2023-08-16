import React from 'react';
import { useSelector } from 'react-redux';
import AccessMessage from './AccessMessage';

const Protected = ({ children }) => {
    const currentUser = useSelector((state)=> state.global.currentUser);
  return currentUser ? children : <AccessMessage />;
};

export default Protected;