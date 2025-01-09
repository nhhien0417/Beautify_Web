import React from "react";
import { TextField, IconButton, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useServiceStore from "../../zustand/useServiceStore";

const SearchFilter = () => {
  const { searchQuery, setSearchQuery } = useServiceStore();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 600,
        paddingY: 2,
      }}
    >
      <TextField
        label="Search for services..."
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        sx={{
          backgroundColor: "#FFFDEC",
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                sx={{
                  color: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchFilter;
