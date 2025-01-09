import { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Typography,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import useProductStore from "../../../zustand/useProductStore";

const SortFilter = () => {
  const setSortOption = useProductStore((state) => state.setSortOption);
  const [sort, setSort] = useState<string>("featured");

  const handleSortChange = (event: SelectChangeEvent) => {
    const selectedSort = event.target.value;
    setSort(selectedSort);
    setSortOption(selectedSort);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        backgroundColor: "#FFFDEC",
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: "600" }}>
        Order by
      </Typography>
      <FormControl variant="outlined" size="small">
        <Select
          value={sort}
          onChange={handleSortChange}
          displayEmpty
          sx={{
            minWidth: 150,
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1px solid",
            },
            "& .MuiSelect-icon": {
              right: 8,
            },
            "& .MuiSelect-root": {
              paddingLeft: 1,
            },
          }}
        >
          {/* Placeholder */}
          <MenuItem value="featured">Featured</MenuItem>
          <MenuItem value="bestSelling">Best selling</MenuItem>
          <MenuItem value="alphabeticalAZ">Alphabetically, A-Z</MenuItem>
          <MenuItem value="alphabeticalZA">Alphabetically, Z-A</MenuItem>
          <MenuItem value="priceLowHigh">Price, low to high</MenuItem>
          <MenuItem value="priceHighLow">Price, high to low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortFilter;
