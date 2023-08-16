import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
 // TextField,
  Typography,
  } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useEffect, useRef } from 'react';
//import { getCrimeDatas } from 'actions/crimeData';
import { updatecrime } from 'state';
import { useDispatch, useSelector } from 'react-redux';
  


  const ViewDetails = () => {
    const crime = useSelector((state)=> state.global.crime)
    const dispatch = useDispatch();  
    const nameRef = useRef();
    
    const handleClose = () => {
      dispatch(updatecrime(null));
    }; 
    


   /* useEffect(() => {
      if (filteredData) {
        const url = process.env.REACT_APP_BASE_URL + '/client/crimedata';
        fetch(url)
          .then((response) => response.json())
          
      }
    }, []);*/
  
    
    return (
      <Dialog open={Boolean(crime)}
      onClose={handleClose}
       >
        <DialogTitle>
          crime Details
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: (theme) => theme.palette.secondary[200],
            }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
               Details of selected crime 
            </DialogContentText>
           
            <><Box mt={2} >
             <Typography  variant="h6" component="span">
                {'Reported Date: '}
              </Typography>
              <Typography component="span">{crime?.date_rptd}</Typography>
            </Box>
            <Box mt={2} >
              <Typography  variant="h6" component="span">
                {'Occerred Date: '}
              </Typography>
              <Typography component="span">{crime?.date_occ}</Typography>
            </Box>
            <Box mt={2}>
             <Typography variant="h6"  component="span">
                {'Occerred Time: '}
              </Typography>
              <Typography component="span">{crime?.time_occ}</Typography>
            </Box>
             <Box mt={2} >
             <Typography variant="h6"  component="span">
                {'Area: '}
              </Typography>
              <Typography component="span">{crime?.area}</Typography>
            </Box>
             <Box mt={2}>
             <Typography variant="h6" component="span">
                {'Area Name: '}
              </Typography>
              <Typography component="span">{crime?.area_name}</Typography>
            </Box>
             <Box mt={2}>
             <Typography variant="h6" component="span">
                {'Crime Code: '}
              </Typography>
              <Typography component="span">{crime?.crm_cd}</Typography>
            </Box>
            <Box mt={2}>
             <Typography variant="h6" component="span">
                {'Crime Description: '}
              </Typography>
              <Typography component="span">{crime?.crm_cd_desc}</Typography>
            </Box>
            <Box mt={2}>
             <Typography variant="h6" component="span">
                {'victem Age: '}
              </Typography>
              <Typography component="span">{crime?.vict_age}</Typography>
            </Box>
            <Box mt={2}>
             <Typography variant="h6" component="span">
                {'victem Sex: '}
              </Typography>
              <Typography component="span">{crime?.vict_sex}</Typography>
            </Box>
            <Box mt={2}>
             <Typography variant="h6" component="span">
                {'Premis description: '}
              </Typography>
              <Typography component="span">{crime?.premis_desc}</Typography>
            </Box>
            <Box mt={2}>
             <Typography variant="h6" component="span">
                {'Weapon description: '}
              </Typography>
              <Typography component="span">{crime?.weapon_desc}</Typography>
            </Box>
            <Box mt={2}>
             <Typography variant="h6" component="span">
                {'Status description: '}
              </Typography>
              <Typography component="span">{crime?.status_desc}</Typography>
            </Box>
            <Box mt={2}>
             <Typography variant="h6" component="span">
                {'CrossStreet: '}
              </Typography>
              <Typography component="span">{crime?.crossStreet}</Typography>
            </Box>
            <Box mt={2}>
             <Typography variant="h6" component="span">
                {'Longtiude: '}
              </Typography>
              <Typography component="span">{crime?.lon}</Typography>
            </Box>
            <Box mt={2}>
             <Typography variant="h6" component="span">
                {'Latitiude: '}
              </Typography>
              <Typography component="span">{crime?.lat}</Typography>
            </Box>
            </>      
           
          </DialogContent>
          
          
      </Dialog>
    );
  };
  
  export default ViewDetails;