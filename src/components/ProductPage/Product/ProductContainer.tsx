import { Box, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { defaultTheme } from "../../AdminPage/Admin/Sidebar";

interface Props {
  children: ReactNode;
}

const ProductContainer = ({ children }: Props) => {
  return (
    <ThemeProvider theme={defaultTheme}>
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
    </ThemeProvider>
  );
};

export default ProductContainer;
