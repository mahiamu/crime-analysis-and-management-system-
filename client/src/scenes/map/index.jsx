import React/*, {useEffect, useState}*/ from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import './Map.css';
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import ShowCrimes from "./ShowCrimes";
import { useGetReportsQuery } from "state/api";
import { useSelector } from "react-redux";
import Protected from "scenes/protected/Protected";


function Map() {
    const theme = useTheme();
    const { data } = useGetReportsQuery();
    const currentUser = useSelector((state)=> state.global.currentUser)
   // console.log(data)
    
       
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MAP" subtitle="Crime clusters from 2020." />
    {currentUser?(  <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
    {data ?( <MapContainer center={[34.052235, -118.243683]} zoom={10}>
     <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <ShowCrimes crimeData={data} />
     
    </MapContainer>):(<>Loading...</>)}
    </Box>):(<Protected/>)}
    </Box> );
  
}
 export default Map;