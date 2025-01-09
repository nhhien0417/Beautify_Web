import { Box } from "@mui/material";
import Banner from "../components/HomePage/Banner";
import BestSellerGrid from "../components/HomePage/BestSeller/BestSellerGrid";
import GuaranteeGrid from "../components/HomePage/Guarantee/GuaranteeGrid";
import ReviewGrid from "../components/HomePage/Review/ReviewGrid";

function HomePage() {
  return (
    <Box>
      <Banner />
      <BestSellerGrid />
      <GuaranteeGrid />
      <ReviewGrid />
    </Box>
  );
}

export default HomePage;
