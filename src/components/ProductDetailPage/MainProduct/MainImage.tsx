import { useState } from "react";
import { Box, Grid } from "@mui/material";
import placeholder from "../../../assets/no-image.webp";

// Replace with image list later
interface Props {
  images: string[]; // Array of strings
}

const MainImage = ({ images }: Props) => {
  // Replace strings containing "null" with placeholder
  const processedImages = images.map((image) =>
    image.includes("null") ? placeholder : image
  );

  const [selectedIndex, setSelectedIndex] = useState(0); // Track selected index

  return (
    <Box sx={{ width: "85%", margin: "0 auto" }}>
      {/* Main Image Display */}
      <Box
        component="img"
        src={processedImages[selectedIndex]}
        alt="Selected Product"
        sx={{
          width: "100%",
          aspectRatio: 1,
          objectFit: "cover",
          borderRadius: 5,
          boxShadow: 3,
        }}
      />

      {/* Thumbnails */}
      <Grid container spacing={1} mt={2}>
        {processedImages.map((image, index) => (
          <Grid
            item
            xs={3}
            key={index}
            onClick={() => setSelectedIndex(index)} // Update selected index
            sx={{
              cursor: "pointer",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={image}
              alt={`Thumbnail ${index}`}
              sx={{
                border: selectedIndex === index ? "4px solid #FFB6C1" : "none", // Check by index
                aspectRatio: 1,
                width: "100%",
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainImage;
