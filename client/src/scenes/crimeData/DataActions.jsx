import { Delete, Edit, Preview } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ViewDetails from './viewDetails';
import {  updatecrime, updateDetails, UpdateUpdeatedCrimeData } from 'state';
import { clearCrimeData, deleteCrimeDatas } from 'actions/crimeData';
import { useNavigate } from 'react-router-dom';



function DataActions(params) {
    const dispatch = useDispatch();
    const { _id, date_rptd, date_occ, time_occ, area, area_name, crm_cd, crm_cd_desc, vict_age, vict_sex, premis_desc, weapon_desc, status_desc, crossStreet, lat, lon, uid} = params.params.row;
    const currentUser = useSelector((state)=> state.global.currentUser)
    const updatedCrimeData = useSelector((state)=> state.global.updatedCrimeData)
    const navigate = useNavigate();
   const handelUpdate=()=>{
    if(updatedCrimeData){
        clearCrimeData(dispatch, currentUser, updatedCrimeData); 
    }
    
    dispatch(updateDetails({date_rptd, date_occ, time_occ, area, area_name, crm_cd, crm_cd_desc, vict_age, vict_sex, premis_desc, weapon_desc, status_desc, crossStreet, lat, lon}));
    dispatch(UpdateUpdeatedCrimeData(_id, uid))
    navigate('/add')
    }
     
  return (
    <Box>
        <ViewDetails />
        <Tooltip title='view details'>
            <IconButton onClick={()=>dispatch(updatecrime( {...params.params.row}))}>
            <Preview />
            </IconButton>
        </Tooltip>
        <Tooltip title='Edit Data'>
            <IconButton onClick={handelUpdate}>
            <Edit />
            </IconButton>
        </Tooltip>
        <Tooltip title='Delete Data'>
            <IconButton onClick={()=>deleteCrimeDatas(params.params.row, currentUser, dispatch)}>
            <Delete />
            </IconButton>
        </Tooltip>
        
              
    </Box>
  )
}

export default DataActions