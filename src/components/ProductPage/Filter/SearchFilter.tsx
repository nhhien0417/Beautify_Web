import React, { useState } from "react";
import { TextField, IconButton, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useProductStore from "../../../zustand/useProductStore";

const SearchFilter = () => {
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);
  const [query, setQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setSearchQuery(newQuery);
  };

  const handleSearch = () => {
    setSearchQuery(query);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: 600,
        margin: "0 auto",
        padding: 2,
        backgroundColor: "#FFFDEC",
      }}
    >
      <TextField
        label="Search for products..."
        variant="outlined"
        value={query}
        onChange={handleSearchChange}
        fullWidth
        sx={{
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
                onClick={handleSearch}
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
