import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import CrimeData from "scenes/crimeData";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Admin from "scenes/admin";
import Login from "scenes/users/login";
import Notification from "components/Notification";
import Loading from "components/Loading";
import PageNotFound from "scenes/protected/404page";
//import Crimes from 'components/crimes';
import Map from "scenes/map";
import AddDetails from "scenes/crimeData/addDetails";
function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/> 
        <Login/>
        <Notification />
        <Loading />
       
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Navigate to="/home" repalce />}/>
            <Route path="/home" element={<Dashboard/>}/>
            <Route path="/crimedata" element={<CrimeData/>}/> 
            <Route path="/geography" element={<Geography />} /> 
            <Route path="/overview" element={<Overview />} />  
            <Route path="/daily" element={<Daily />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/users" element={<Admin />} />
            <Route path="/map" element={<Map />} />
            <Route path="/add" element={<AddDetails />} />
            <Route path="/*" element={<PageNotFound />} />                  
          </Route>       
        </Routes>      
      </ThemeProvider>
      </BrowserRouter>     
    </div>
  );
}

export default App;
