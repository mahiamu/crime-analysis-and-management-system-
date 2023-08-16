import fetchData from './utils/fetchData';
import { v4 as uuidv4 } from 'uuid';
import {
  isLoading,
  notLoading, 
  updateUsers,
  setAlert,
  updateUser,
  isCloseLogin,
  updateprofile
  } from 'state';
import uploadFile from '../firebase/uploadFile';

const url = process.env.REACT_APP_BASE_URL + '/user';



export const register = async (user, dispatch) => {
  dispatch(isLoading());

  const result = await fetchData(
    { url: url + '/register', body: user },
    dispatch
  );
  if (result) {
    dispatch(updateUser( result));
    dispatch(isCloseLogin());
    dispatch(setAlert(
       {
        open: true,
        severity: 'success',
        message: 'Your account has been created successfully',
      }));
  }

  dispatch(notLoading());
};

export const login = async (user, dispatch) => {
  dispatch(isLoading());

  const result = await fetchData({ url: url + '/login', body: user }, dispatch);
  if (result) {
    dispatch(updateUser(result ));
    dispatch(isCloseLogin());
  }

  dispatch(notLoading());
};

export const updateProfile = async (currentUser, updatedFields, dispatch) => {
  dispatch(isLoading());

  const { name, file } = updatedFields;
  let body = { name };
  try {
    if (file) {
      const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
      const photoURL = await uploadFile(
        file,
        `profile/${currentUser?.id}/${imageName}`
      );
      body = { ...body, photoURL };
    }
    const result = await fetchData(
      {
        url: url + '/updateProfile',
        method: 'PATCH',
        body,
        token: currentUser.token,
      },
      dispatch
    );
    if (result) {
      dispatch(updateUser({ ...currentUser, ...result }));
      dispatch(setAlert( {
          open: true,
          severity: 'success',
          message: 'Your profile has been updated successfully',
        }));
      dispatch(updateprofile( { open: false, file: null, photoURL: result.photoURL },
      ));
    }
  } catch (error) {
    dispatch(setAlert( {
        open: true,
        severity: 'error',
        message: error.message,
      }));
    console.log(error);
  }

  dispatch(notLoading());
};

export const getUsers = async (dispatch) => {
  const result = await fetchData({ url, method: 'GET' }, dispatch);
  if (result) {
    dispatch(updateUsers(result));
  }
};

export const updateStatus = (updatedFields, userId,dispatch) => {
  return fetchData({
     url:`${url}/updateStatus/${userId}`,
     method: 'PATCH',
     body:updatedFields 
    }, 
    dispatch,
    console.log(updatedFields)
      );
      
};