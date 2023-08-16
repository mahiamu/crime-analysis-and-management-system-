import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart"
import { useSelector } from "react-redux";
import Protected from "scenes/protected/Protected";

const Overview = () => {
  const currentUser = useSelector((state)=> state.global.currentUser)  
 
  

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="OVERVIEW"
        subtitle="Overview of general crime data by thier crime code"
      />
     {currentUser?( <Box height="75vh">
        
        <OverviewChart />
      </Box>):(<Protected/>)}
    </Box>
  );
};

export default Overview;