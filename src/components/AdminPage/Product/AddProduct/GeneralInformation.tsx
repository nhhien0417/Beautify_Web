import { Box, TextField, Typography } from "@mui/material";

const GeneralInformation = ({ data, onUpdate }: any) => {
  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    onUpdate(name, value);
  };

  return (
    <Box sx={{ padding: 2, borderRadius: 2, border: "1px solid #e0e0e0" }}>
      <Typography variant="h6">General Information</Typography>
      <TextField
        fullWidth
        label="Name Product"
        name="name"
        margin="normal"
        value={data.name || ""}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Description Product"
        name="description"
        multiline
        rows={8}
        margin="normal"
        value={data.description || ""} // Gán giá trị từ data vào
        onChange={handleChange}
      />
    </Box>
  );
};

export default GeneralInformation;
