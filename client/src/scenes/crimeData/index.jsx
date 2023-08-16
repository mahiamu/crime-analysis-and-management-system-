import React, { useEffect, useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetCrimeDataQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useDispatch, useSelector } from "react-redux";
import Protected from "scenes/protected/Protected";
import DataActions from "./DataActions";
import { getCrimeDatas } from "actions/crimeData";
import AddDetails from "./addDetails";


const CrimeData = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const crimeData = useSelector((state)=> state.global.crimeData);
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");
  const currentUser = useSelector((state)=> state.global.currentUser)
  const { data, isLoading } = useGetCrimeDataQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  
  useEffect(()=>{
    if (crimeData.length===0) getCrimeDatas(dispatch)
   },[]);
 // console.log('crimeData', crimeData );

  const columns = useMemo(()=> [
    {
      field: "crm_cd",
      headerName: "Crime Code",
      flex: 0.4,
    },
    {
      field: "date_occ",
      headerName: "Occurred Date",
      flex: 0.7,
    },
    {
      field: "area_name",
      headerName: "Area",
      flex: 0.5,
    },
    {
      field: "crm_cd_desc",
      headerName: "Type of Crime",
      flex: 1,
      //sortable: false,
     // renderCell: (params) => params.value.length,
    },
    {
      field: "vict_sex",
      headerName: "Vict sex",
      flex: 0.4,
      //renderCell: (params) => `${Number(params.value).toFixed(2)}`,
    },
    {
      field: "vict_age",
      headerName: "Vict age",
      flex: 0.4,      
    },
    {
      field: "premis_desc",
      headerName: "premis-discription",
      flex: 1,      
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => <DataActions {...{params}}/>
    },
  ],[])

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CRIME DATA" subtitle="Entire list of Crime from 2020" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        
       {currentUser?( <DataGrid
          loading={isLoading || !crimeData}
          rows={crimeData.crimeData||[]}        
          columns={columns}
          getRowId={row => row._id} 
          rowCount={(crimeData && crimeData.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />):(<Protected/>)}
      </Box>
    </Box>
  );
};

export default CrimeData;