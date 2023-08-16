import { useTheme } from '@emotion/react';
import { AddCircleOutline, Cancel } from '@mui/icons-material';
import {
     
  Box,
  Button,
    Stack,
  
  } from '@mui/material';
import { clearCrimeData, createCrimeData, UpdateCrimeDatas } from 'actions/crimeData';
import Header from 'components/Header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Protected from 'scenes/protected/Protected';
import InfoField from './InfoField';
  
  const AddDetails = () => {
    
    const theme = useTheme();
    const navigate = useNavigate();
    const [showAdd, setShowAdd] = useState(false)
    const dispatch = useDispatch();   
    const details= useSelector((state)=> state.global.details);
    const currentUser = useSelector((state)=> state.global.currentUser);
    const updatedCrimeData = useSelector((state)=> state.global.updatedCrimeData);
   const {date_rptd, date_occ, time_occ, area, area_name, crm_cd, crm_cd_desc, vict_age, vict_sex, premis_desc, weapon_desc, status_desc, crossStreet, lat, lon}=useSelector((state)=> state.global.details);
    
    
    const handleSubmit = () => {
    const CrimeData = {
      date_rptd: details.date_rptd,
      date_occ: details.date_occ,
      time_occ: details.time_occ,
      area: details.area,
      area_name: details.area_name,
      crm_cd: details.crm_cd,
      crm_cd_desc: details.crm_cd_desc,
      vict_age: details.vict_age,
      vict_sex: details.vict_sex,
      premis_desc: details.premis_desc,
      weapon_desc: details.weapon_desc,
      status_desc: details.status_desc,
      crossStreet: details.crossStreet,
      lon: details.lon,
      lat: details.lat,     
      
    };
    console.log(CrimeData)
    if(updatedCrimeData){
     UpdateCrimeDatas(CrimeData, currentUser, dispatch, updatedCrimeData)
     navigate('/crimedata')}
    
    createCrimeData(CrimeData, currentUser, dispatch) ;
  };

 
    if(area.length>1 && area_name.length>4 && crm_cd.length>2 && crm_cd_desc.length>5  && date_occ.length>10 && date_rptd.length>10 && lat.length>6 && lon.length>6 && time_occ.length>3 ){
      if(!showAdd)setShowAdd(false)
    }else{
      if(showAdd)setShowAdd(false)
    }
    console.log(showAdd, area, crm_cd)
    const handelCancel=()=>{
      
       navigate('/crimedata')
       clearCrimeData(dispatch, currentUser, updatedCrimeData);       
    }
 
    
    return (
      <>
      <Box m="1.5rem 2.5rem">
      {updatedCrimeData?(<Header title="UPDATE CRIME DATA" subtitle="Fill the following fields to Update a Crime data " />):(<Header title="ADD CRIME DATA" subtitle="Fill the following fields to record a Crime data " />)}
     {currentUser?( <> <Stack
        sx={{
          alignItems: 'right',
          '& .MuiTextField-root': { width: '100%', maxWidth: 500, m: 2 },
        }}
      >
        <Button  sx={{
              position: 'absolute',
              top: 98,
              right: 318,
              color: (theme) => theme.palette.secondary[200],
            }}  variant='outliend' endIcon={<Cancel/>} onClick={handelCancel}>Cancel</Button>
        <InfoField
          mainProps={{ name:'date_rptd', label:'Reported Date (YYYY-MM-DD)', value: date_rptd   }}
          minLength={10}
          optionalProps={{ required:true}}
        />
        <InfoField
          mainProps={{ name: 'date_occ', label: 'Occerred Date (YYYY-MM-DD)', value: date_occ }}
          minLength={10}
          optionalProps={{ required:true}}
        />
        <InfoField
          mainProps={{ name: 'time_occ', label: 'Occerred Time', value: time_occ }}
          minLength={3}
          optionalProps={{ required:true}}
        />
        <InfoField
          mainProps={{ name: 'area', label: 'Area Code(00)', value: area  }}
          minLength={1}
          optionalProps={{ required:true}}
        />
        <InfoField
          mainProps={{ name: 'area_name', label: 'Area Name', value: area_name  }}
          minLength={4}
          optionalProps={{ required:true}}          
        />
        <InfoField
          mainProps={{ name: 'crm_cd', label: 'Crime Code (000)', value: crm_cd  }}
          minLength={2}
          optionalProps={{ required:true}} 
        />
        <InfoField
          mainProps={{ name: 'crm_cd_desc', label: 'Crime description', value: crm_cd_desc  }}
          minLength={5}
          optionalProps={{ required:true}} 
        />
        <InfoField
          mainProps={{ name: 'vict_age', label: 'victem Age', value: vict_age  }}
          minLength={0}
        />
        <InfoField
          mainProps={{ name: 'vict_sex', label: 'victem Sex', value: vict_sex  }}
          minLength={0}
        />
        <InfoField
          mainProps={{ name: 'premis_desc', label: 'premis description', value: premis_desc  }}
          minLength={0}
        />
        <InfoField
          mainProps={{ name: 'weapon_desc', label: 'Weapon description', value: weapon_desc  }}
          minLength={0}
        />
        <InfoField
          mainProps={{ name: 'status_desc', label: 'status description', value: status_desc  }}
          minLength={0}
        />
        <InfoField
          mainProps={{ name: 'crossStreet', label: 'crossStreet', value: crossStreet  }}
          minLength={0}
        />
        <InfoField
          mainProps={{ name: 'lat', label: 'Latitiude (00.0000)', value: lat  }}
          minLength={7}
          optionalProps={{ required:true}} 
        />
        <InfoField
          mainProps={{ name: 'lon', label: 'Longtiude(-00.0000)', value: lon  }}
          minLength={7}
          optionalProps={{ required:true}} 
        />
                       
      </Stack>
      <Stack
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          '& .MuiTextField-root': { m: 1 },
        }}
        direction='row'
      >
      <Button type="submit" variant="outliend" endIcon={<AddCircleOutline />}
       onClick={handleSubmit}
       >
            {updatedCrimeData? 'Update': 'Add'} 
       </Button>
       <Button variant='outliend' endIcon={<Cancel/>} onClick={handelCancel}>Cancel</Button>
       
       </Stack></>):(<Protected/>)}
      </Box>
      </>
    );
  };
  
  export default AddDetails;
 