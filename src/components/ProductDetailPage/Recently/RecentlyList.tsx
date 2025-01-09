import { Box, Grid2, Typography } from "@mui/material";
import RecentlyCard from "./RecentlyCard";

const RecentlyList = () => {
  return (
    <Box width="90%" margin="0 auto">
      <Typography variant="h4" fontWeight={700}>
        Recently Viewed Products
      </Typography>
      <Grid2
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingY: "50px",
          gap: "100px",
          flexWrap: "wrap",
        }}
      >
        <RecentlyCard />
        <RecentlyCard />
        <RecentlyCard />
      </Grid2>
    </Box>
  );
};

export default RecentlyList;
