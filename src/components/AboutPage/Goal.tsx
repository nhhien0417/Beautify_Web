import { Box, Typography, Grid } from "@mui/material";
import { ShoppingCart, Info, CheckCircle } from "@mui/icons-material"; // Import icons
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Goal = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "80%" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 5,
            fontSize: { xs: "1.8rem", sm: "2.5rem" },
            color: "#921A40",
            fontFamily:"Montserrat",
          }}
        >
          Transforming Your Shopping Experience
        </Typography>

        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginBottom: "10px",
                color: "#343131",
              }}
            >
              Effortless Shopping at Your Fingertips
            </Typography>
            <Typography sx={{ color: "#555", marginBottom: "10px" }}>
              Enjoy a seamless, intuitive interface that makes finding and
              purchasing your favorite beauty products easy and quick.
            </Typography>
            <ShoppingCart sx={{ fontSize: "3rem", color: "#116A7B" }} />{" "}
            {/* Shopping cart icon */}
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginBottom: "10px",
                color: "#343131",
              }}
            >
              Transparent and Detailed Product Information
            </Typography>
            <Typography sx={{ color: "#555", marginBottom: "10px" }}>
              We provide you with all the essential details you need to make
              informed choices, including pricing, origin, and product benefits.
            </Typography>
            <Info sx={{ fontSize: "3rem", color: "#116A7B" }} />{" "}
            {/* Information icon */}
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginBottom: "10px",
                color: "#343131",
              }}
            >
              Streamlined Checkout for a Hassle-Free Experience
            </Typography>
            <Typography sx={{ color: "#555", marginBottom: "10px" }}>
              Our fast and simple checkout process ensures you can shop with
              ease and convenience, saving you time on every order.
            </Typography>
            <CheckCircle sx={{ fontSize: "3rem", color: "#116A7B" }} />{" "}
            {/* Checkout icon */}
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          width: "100%",
          marginTop: 8,
          display: "block",
          objectFit: "cover",
        }}
      />
      <DotLottieReact
        src="https://lottie.host/817ff052-e0fe-4110-9731-6c4184ade523/Sld7ArdVTK.lottie"
        loop
        autoplay
      />
    </Box>
  );
};

export default Goal;
