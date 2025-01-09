import { useState, useEffect } from "react";
import useProductStore from "../../../zustand/useProductStore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const BrandFilter = () => {
  const { filters, setBrandFilter } = useProductStore();
  const brands = useProductStore.getState().getAllBrands();

  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    Array.isArray(filters.brand) ? filters.brand : []
  );

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const brand = event.target.value;

    setSelectedBrands((prev) => {
      const updatedSelectedBrands = prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand];

      setBrandFilter(updatedSelectedBrands);
      return updatedSelectedBrands;
    });
  };

  useEffect(() => {
    setSelectedBrands(filters.brand || []);
  }, [filters.brand]);

  return (
    <Accordion
      sx={{ bgcolor: "transparent", boxShadow: "none" }}
      defaultExpanded
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600} fontSize={18}>
          Brand
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {brands.map((brand) => (
          <FormControlLabel
            key={brand}
            control={
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onChange={handleBrandChange}
                value={brand}
              />
            }
            label={brand}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default BrandFilter;
