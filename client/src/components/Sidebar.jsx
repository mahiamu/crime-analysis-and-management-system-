import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  DatasetLinkedOutlined,  
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  Logout,
  LocationOnOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import {updateUser} from 'state';



const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state)=> state.global.currentUser)
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const handlelogout = () =>{
    dispatch(updateUser( null ));
    navigate('/');
 }


  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const navitem =()=>{

    
     let  navItem = [
        {
          text: "Home",
          icon: <HomeOutlined />,
        },
        /* {
          text: "About",
          icon: null,
        },
         {
          text: "About",
          icon: <Groups2Outlined/>,
        }*/        
      ];
  
    
  if(currentUser && currentUser.role === 'admin'){
     navItem = [
      {
        text: "Home",
        icon: <HomeOutlined />,
      },
      {
        text: "Crime Facing",
        icon: null,
      },
      
      {
        text: "CrimeData",
        icon: <DatasetLinkedOutlined />,
      },
      
      {
        text: "Geography",
        icon: <PublicOutlined />,
      },
      {
        text: "Map",
        icon: <LocationOnOutlined />,
      },
      {
        text: "Reports",
        icon: null,
      },
      {
        text: "Overview",
        icon: <PointOfSaleOutlined />,
      },
      {
        text: "Daily",
        icon: <TodayOutlined />,
      },
      {
        text: "Monthly",
        icon: <CalendarMonthOutlined />,
      },
     
      {
        text: "Management",
        icon: null,
      },
      {
        text: "Users",
        icon: <AdminPanelSettingsOutlined />,
      },
      
    ];

  }else
  if(currentUser && currentUser.role==='basic'){
    navItem = [
      {
        text: "Home",
        icon: <HomeOutlined />,
      },
      {
        text: "Crime Facing",
        icon: null,
      },
      
      {
        text: "CrimeData",
        icon: <DatasetLinkedOutlined />,
      },
      
      {
        text: "Geography",
        icon: <PublicOutlined />,
      },
      {
        text: "Map",
        icon: <LocationOnOutlined />,
      },
      {
        text: "Reports",
        icon: null,
      },
      {
        text: "Overview",
        icon: <PointOfSaleOutlined />,
      },
      {
        text: "Daily",
        icon: <TodayOutlined />,
      },
      {
        text: "Monthly",
        icon: <CalendarMonthOutlined />,
      },
          
    ];

  }
   return navItem;
  }

  const navItems= navitem();

  return (
    
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    CRIME ANALYSIS
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                   <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box  bottom="2rem">
            <Divider />
            {currentUser?(<FlexBetween textTransform="none" gap="0.2rem" m="1.5rem 3rem 0 4rem">
            <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
                 {currentUser?.name?.charAt(0).toUpperCase()}
             </Avatar>
              <Box textAlign="center">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {currentUser.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {currentUser.role}
                </Typography>
                             
              </Box>
              <Button
                sx={{ color: theme.palette.secondary[100] }}
                startIcon={<Logout fontSize="small" />}
                onClick={handlelogout}
              ></Button>
              
            </FlexBetween>):(null)}
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;