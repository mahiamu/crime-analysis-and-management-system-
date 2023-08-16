import React, { useEffect, useState } from "react";
import { Avatar, Box, gridClasses, useTheme } from "@mui/material";
import { useGetAdminsQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import UsersActions from "./usersActions";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "actions";
import Protected from "scenes/protected/Protected";
import { getCrimeDatas } from "actions/crimeData";

const Admin = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const users = useSelector((state)=> state.global.users);
  const currentUser = useSelector((state)=> state.global.currentUser)
  const [rowId, setRowId] = useState(null)
  const { data, isLoading } = useGetAdminsQuery();
   useEffect(()=>{
    if (users.length===0) getUsers(dispatch)
   },[users])
  
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.75,
      hide: true,
    },
    {
      field: "photoURL",
      headerName: "Avator",
      flex: 0.3,
      renderCell: (params) =><Avatar src={params.row.photoURL}/>,
      sortable: false,
      filterable: false,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.3,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.4,
    },
    {
      field: "active",
      headerName: "Active",
      flex: 0.4,
      type:'boolean',       
      editable: true
    },
   {
      field: "role",
      headerName: "Role",
      flex: 0.4,
      type:'singleSelect', 
      valueOptions:['basic', 'admin'],
      editable: true
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      renderCell: (params) => <UsersActions {...{params, rowId , setRowId}}/>
    },
    
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="USERS" subtitle="Managing users and list of users" />
     {(currentUser&&currentUser.role==='admin')?( <Box
        mt="40px"
        height="75vh"
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
         <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={users|| []}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
          getRowSpacing={params=>({
            top: params.isFirstVisible ? 0: 5,
            bottom: params.isLastVisible ? 0:5
          })}
          sx={{[`&.${gridClasses.row}`]:{
            bgcolor:theme=>theme.palette.mode==='light'? grey[200]: grey[900]
          }}}
          onCellEditCommit={params=>setRowId(params.id)}
        />
      </Box>):(<Protected/>)}
    </Box>
  );
};

export default Admin;