import { Autocomplete, TextField, Box } from "@mui/material";

const BrandAutoComplete = ({ data, onUpdate, brands }: any) => {
  const handleBrandChange = (event: any, value: any) => {
    onUpdate("brand", value || "");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Combobox for category */}
      <TextField
        label="Category"
        value={data.category}
        onChange={(e) => onUpdate("category", e.target.value)}
        fullWidth
      />

      {/* Autocomplete with freeSolo for brand */}
      <Autocomplete
        freeSolo
        options={brands} // Danh sách thương hiệu
        value={data.brand}
        onChange={handleBrandChange}
        onInputChange={(event, value) => onUpdate("brand", value)} // Nhập liệu mới
        renderInput={(params) => (
          <TextField {...params} label="Brand" fullWidth />
        )}
      />
    </Box>
  );
};

export default BrandAutoComplete;
