import React, { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

interface PricingProps {
  data: { price: string };
  onUpdate: (key: string, value: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ data, onUpdate }) => {
  const [pricing, setPricing] = useState(data.price || "");

  useEffect(() => {
    setPricing(data.price || "");
  }, [data]);

  const handlePricingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPricing(value);
    onUpdate("price", value);
  };

  return (
    <Box sx={{ padding: 2, borderRadius: 2, border: "1px solid #e0e0e0" }}>
      <Typography variant="h6">Pricing</Typography>
      <TextField
        fullWidth
        label="Base Pricing"
        margin="normal"
        value={pricing}
        onChange={handlePricingChange}
      />
    </Box>
  );
};

export default Pricing;
