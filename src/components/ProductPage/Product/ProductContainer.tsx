import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ProductContainer = ({ children }: Props) => {
  return (
    <Box
      sx={{
        mixBlendMode: "multiply",
        "&:hover": {
          transform: "scale(1.03)",
          transition: "transform 0.15s ease-in",
        },
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
};

export default ProductContainer;
