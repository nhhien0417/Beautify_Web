import { Box, Grid } from "@mui/material";
import MainInfo from "./MainInfo";
import MainImage from "./MainImage";
import Product from "../../../entities/Product";

interface Props {
  product: Product;
}

const MainLayout = ({ product }: Props) => {
  return (
    <Box
      sx={{
        padding: 3,
        width: "100%",
        margin: "0 auto",
        bgcolor: "#FAF6F3",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={7}>
          <Box
            sx={{
              height: "100%",
              padding: 2,
            }}
          >
            <MainInfo product={product} />
          </Box>
        </Grid>

        <Grid item md={5}>
          <Box
            sx={{
              height: "100%",
              padding: 2,
            }}
          >
            <MainImage images={product.images} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainLayout;
