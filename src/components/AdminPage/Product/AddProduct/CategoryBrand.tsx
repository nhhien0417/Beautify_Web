import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  SelectChangeEvent,
  Autocomplete,
  TextField,
} from "@mui/material";
import { getAllCategories } from "../../../../config/api";

interface CategoryProps {
  data: { category: string; brand: string };
  onUpdate: (key: string, value: string) => void;
  brands: string[];
}

interface CategoryItem {
  id: number;
  name: string;
}

const CategoryBrand: React.FC<CategoryProps> = ({ data, onUpdate, brands }) => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getAllCategories(1, 100);
      const categoriesData = response.data?.result || [];
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Corrected Type for SelectChangeEvent
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    onUpdate("category", event.target.value);
  };

  const handleBrandChange = (_: any, value: string | null) => {
    onUpdate("brand", value || "");
  };

  return (
    <Box sx={{ padding: 2, borderRadius: 2, border: "1px solid #e0e0e0" }}>
      <Typography variant="h6">Category & Brand</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* Category Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={data.category || ""}
              onChange={handleCategoryChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Brand Dropdown */}
          <FormControl fullWidth margin="normal">
            <Autocomplete
              freeSolo
              options={brands}
              value={data.brand}
              onChange={handleBrandChange} // When selecting from the list
              onInputChange={(_, value) => onUpdate("brand", value)} // When typing manually
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Brand"
                  margin="normal"
                  fullWidth
                />
              )}
            />
          </FormControl>
        </>
      )}
    </Box>
  );
};

export default CategoryBrand;
