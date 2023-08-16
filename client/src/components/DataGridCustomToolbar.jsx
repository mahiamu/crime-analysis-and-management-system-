import React from "react";
import { AddBoxOutlined,  Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment, Button, Box } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
  

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const navigateToAdd = () => {
   
    navigate('/add');
  };
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        {/*<TextField
          label="Search..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                    setSearchInput("");
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />*/}<Box >
        <Button
                sx={{
                  color: theme.palette.background.alt,
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
                startIcon={<AddBoxOutlined />}
                onClick={navigateToAdd}
              >
                NEW
              </Button></Box>
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;