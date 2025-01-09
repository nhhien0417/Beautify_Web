import { Box, Divider, Grid } from "@mui/material";
import { RiRefund2Fill } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import GuaranteeCard from "./GuaranteeCard";
import { Fragment } from "react/jsx-runtime";

const GuaranteeGrid = () => (
  <Fragment>
    <Divider
      sx={{
        height: "4px",
        backgroundColor: "#1A1A19",
        marginBottom: "2px",
      }}
    />
    <Box sx={{ backgroundColor: "#1A1A19", padding: "40px 30px" }}>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item>
          <GuaranteeCard
            icon={<FaShippingFast size="30px" color="#31603d" />}
            title="Free Shipping"
            subtitle="On Order Above $200"
          />
        </Grid>
        <Grid item>
          <GuaranteeCard
            icon={<RiRefund2Fill size="30px" color="#31603d" />}
            title="Easy Returns"
            subtitle="15 - Day Return Policy"
          />
        </Grid>
        <Grid item>
          <GuaranteeCard
            icon={<RiVerifiedBadgeFill size="30px" color="#31603d" />}
            title="100% Authentic"
            subtitle="Products Sourced Directly"
          />
        </Grid>
      </Grid>
    </Box>
    <Divider
      sx={{
        height: "4px",
        backgroundColor: "#1A1A19",
        marginTop: "3px",
      }}
    />
  </Fragment>
);

export default GuaranteeGrid;
