import { updateCrimeData, isLoading, notLoading, setAlert, resetDetails,deleteCrimeData } from 'state';
import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_BASE_URL + '/client';


export const createCrimeData = async (CrimeData, currentUser, dispatch) => {
  dispatch(isLoading());

  const result = await fetchData(
    { url, body: CrimeData, token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch(setAlert( {
        open: true,
        severity: 'success',
        message: 'The Data has been added successfully',
      },
    ));
    clearCrimeData(dispatch, currentUser);     
    dispatch(updateCrimeData(result));
    getCrimeDatas(dispatch)
  }

  dispatch(notLoading());
};

export const getCrimeDatas = async (dispatch) => {
  const result = await fetchData({ url: url + '/crimedata', method: 'GET' }, dispatch);
  if (result) {
    dispatch(updateCrimeData( result ));
  }
};
 
export const deleteCrimeDatas = async (CrimeData, currentUser, dispatch) => {
  dispatch(isLoading());
  const result = await fetchData(
    { url:`${url}/${CrimeData._id}`, method:'DELETE', token: currentUser?.token },
    dispatch
  ); 
  if (result) {
    dispatch(setAlert( {
        open: true,
        severity: 'success',
        message: 'The Data has been deleted successfully',
      },
    ));   
    //dispatch(deleteCrimeData(result._id));
  }
  getCrimeDatas(dispatch)
  dispatch(notLoading());
};

export const UpdateCrimeDatas = async (CrimeData, currentUser, dispatch, updatedCrimeData) => {
  dispatch(isLoading());
  console.log(updatedCrimeData);
  const result = await fetchData(
    { url:`${url}/${updatedCrimeData}`, method:'PATCH',body:CrimeData, token: currentUser?.token },
    dispatch
  ); 
  if (result) {
    dispatch(setAlert( {
        open: true,
        severity: 'success',
        message: 'The Data has been updated successfully',
      },
    ));   
    clearCrimeData(dispatch, currentUser, updateCrimeData);    
    dispatch(updateCrimeData(result));
    getCrimeDatas(dispatch)
  }
  dispatch(notLoading());
  
};

export const clearCrimeData = (dispatch, currentUser, updateCrimeData=null ) =>{
  dispatch(resetDetails());
}