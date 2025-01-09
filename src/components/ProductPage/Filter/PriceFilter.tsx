import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useProductStore from "../../../zustand/useProductStore";

const PriceFilter = () => {
  const { products, setPriceRangeFilter } = useProductStore();
  const highestPrice =
    Math.ceil(Math.max(...products.map((product) => product.price)) / 100) *
    100;
  const [price, setPrice] = useState<[number, number]>([0, highestPrice]);

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue) && newValue.length === 2) {
      setPrice(newValue as [number, number]);
    }
  };

  const handlePriceChangeCommitted = () => {
    setPriceRangeFilter(price);
  };

  return (
    <Accordion
      sx={{
        bgcolor: "transparent",
        boxShadow: "none",
      }}
      defaultExpanded
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600} fontSize={18}>
          Price: ${price[0]} - ${price[1]}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography gutterBottom>Price range:</Typography>
        <Slider
          value={price}
          onChange={handlePriceChange}
          onChangeCommitted={handlePriceChangeCommitted}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `$${value}`}
          min={0}
          max={highestPrice}
          step={1}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default PriceFilter;
