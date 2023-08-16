import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  CalendarMonthOutlined,
  DatasetLinkedOutlined,
  LockOutlined,
  PointOfSaleOutlined,
  PublicOutlined,
  TodayOutlined
  } from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";


const Dashboard = () => {
  const theme = useTheme();
  const currentUser = useSelector((state)=> state.global.currentUser)
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
 
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="HOME" subtitle="Welcome to your Homepage" />

       {!currentUser ? (<Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <LockOutlined sx={{ mr: "10px" }} />
            Login to Access Pages
          </Button>
        </Box>):(<Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            WELCOME TO THIS SITE
          </Button>
        </Box>)}
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h1"  sx={{ color: theme.palette.secondary[100]  }}>
            Crime Analysis 
          </Typography>
         
          <Typography
            mt={1}
            p="0 0.6rem"
            fontSize="1rem"
            textAlign={"center"}
            sx={{ color: theme.palette.secondary[200] }}
          >
            Crime analysis has become more regularly used by police agencies, its development and utility can be found in other criminal justice agencies, as well as among the work of social scientists particularly in the field of criminology.
          </Typography>
        </Box>


        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h1" sx={{ color: theme.palette.secondary[100] }}>
          Data Collection
          </Typography>
          <Typography
          mt={2}
            p="0 0.6rem"
            fontSize="1rem"
            textAlign={"center"}
            sx={{ color: theme.palette.secondary[200] }}
          >
            Crime analysis begins with collecting information to analyze, the most commen ways are  calls for service, computerized records of written reports and computerized records of arrest reports
          </Typography>
        </Box>
     
        
       

        {/* ROW 2 */}
            
       
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h1" sx={{ color: theme.palette.secondary[100] }}>
            Reports
          </Typography>
          <Box
          sx={{
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            
          }}
        >
          <DatasetLinkedOutlined sx={{ height: 100, width: 100, opacity: 0.6, mr: 1, ml: 1,color: theme.palette.secondary[200]  }} />
          <PublicOutlined sx={{ height: 100, width: 100, opacity: 0.6, mr: 1,ml: 1,color: theme.palette.secondary[200] }} />          
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
             
          }}
        >
          <PointOfSaleOutlined sx={{ height: 100, width: 100, opacity: 0.6, mr: 0.3, ml: 0.3,color: theme.palette.secondary[200] }} />
          <TodayOutlined sx={{ height: 100, width: 100, opacity: 0.6, mr: 0.1,ml: 0.3,color: theme.palette.secondary[200] }} />
          <CalendarMonthOutlined sx={{ height: 100, width: 100, opacity: 0.6, mr: 0.3,ml: 0.3,color: theme.palette.secondary[200] }} />          
        </Box>
        
        </Box>            
       
         
      </Box>
    </Box>
  );
};

export default Dashboard;