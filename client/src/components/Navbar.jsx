import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
 // Search,
 // SettingsOutlined,
  ArrowDropDownOutlined,
  Lock,
  Settings,
  Logout
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode, isOpenLogin, updateUser, updateprofile } from "state";
//import profileImage from "assets/profile.png";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  ListItemIcon,
  Avatar,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import Profile from "scenes/users/Profile";
import { useNavigate } from "react-router-dom";





const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state)=> state.global.currentUser)
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const navigate = useNavigate();

  const handlelogout = () =>{
     dispatch(updateUser( null ));
     navigate('/');
  }

  

  return (
    <>
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          {/*<FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>*/}
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>         

          <FlexBetween>
          {!currentUser ? (
          <Button
                sx={{ color: theme.palette.secondary[100] }}
                startIcon={<Lock />}
                onClick={() => dispatch(isOpenLogin())}
              >
                Login
              </Button>):(
                <>
              <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >            
              
              <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
                 {currentUser?.name?.charAt(0).toUpperCase()}
             </Avatar>
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                    {currentUser?.name.toUpperCase()}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                   {currentUser.role}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClick={handleClose}
              
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem
            onClick={() =>
              dispatch(updateprofile( {
                  open: true,
                  file: null,
                  photoURL: currentUser?.photoURL,
                },
              ))
            }
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem
          onClick={handlelogout}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>    
            </Menu></>)}
            
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
    <Profile /></>
  );
};

export default Navbar; 