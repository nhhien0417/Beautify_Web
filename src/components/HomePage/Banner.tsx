import { Typography, Box, Grid, Container, Button } from "@mui/material";
import model0 from "../../assets/logo2.jpg";
import model1 from "../../assets/34 Layered Shaggy Bob Hairstyles for All Hair Types_ from Short to Long, for Fine or Curly Hair.jpg";
import model2 from "../../assets/download.jpg";
import model3 from "../../assets/Beautiful Hairstyle girl.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const images = [model0, model1, model2, model3]; // Image list
  const offsets = ["-20px", "20px", "-10px", "10px"]; // Offset for each image

  return (
    <Box
      sx={{
        background:
          "radial-gradient(circle, rgba(30, 30, 30, 1), rgba(0, 0, 0, 1))",
        padding: "20px 20px",
        position: "relative",
        boxShadow: "inset 0 0 50px rgba(255, 255, 255, 0.25)",
      }}
    >
      <Container>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontStyle: "italic",
            color: "#FFC0CB",
            marginBottom: "30px",
            marginLeft: 35,
            textShadow: "0 4px 10px rgba(255, 255, 255, 0.3)",
            fontFamily: "Playfair Display",
            whiteSpace: "pre-wrap",
          }}
        >
          "Feel Beautiful,{"\n"}
          {"\t"}
          {"     "}Be Confident."
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#ccc",
            textAlign: "center",
            marginBottom: "50px",
            fontSize: "1.05rem",
            lineHeight: "1.8",
          }}
        >
          -Unlock the Secrets to Radiant Skin and Effortless Elegance with Our
          Handpicked Beauty Essentials.-
        </Typography>
        <Grid container spacing={4}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  overflow: "hidden",
                  borderRadius: "10px",
                  transform: `translateY(${offsets[index]})`, // Apply offset
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: "0 15px 40px rgba(255, 255, 255, 0.4)",
                }}
              >
                <img
                  src={image}
                  alt={`Ceramic Art ${index}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: "center", marginTop: "60px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              marginTop: "40px",
              "&::before, &::after": {
                content: '""',
                position: "absolute",
                height: "1px",
                backgroundColor: "#FFC0CB", // Màu của đường kẻ
                width: "40%",
                top: "50%",
                transform: "translateY(-50%)",
              },
              "&::before": {
                left: "0",
              },
              "&::after": {
                right: "0",
              },
            }}
          >
            <Link to="/products" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  color: "#fff",
                  padding: "10px 20px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  textTransform: "none",
                  border: "5px double rgba(255, 105, 180, 0.8)",
                  boxShadow: "0 4px 15px rgba(255, 105, 180, 0.5)",
                  transition: "background 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(45deg, #FFC0CB, #FF69B4)",
                    boxShadow: "0 6px 20px rgba(255, 105, 180, 0.8)",
                  },
                }}
              >
                Explore Our Products
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
