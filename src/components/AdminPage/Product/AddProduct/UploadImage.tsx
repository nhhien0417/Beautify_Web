import { Box, IconButton, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";

const UploadImage = ({ data, onUpdate }: any) => {
  const [mainImage, setMainImage] = useState<File | string | null>(null);
  const [subImages, setSubImages] = useState<(File | string | null)[]>([]);

  useEffect(() => {
    if (data) {
      setMainImage(data[0] || null);
      setSubImages(data.slice(1) || []);
    }
  }, [data]);

  const handleMainImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFile = event.target.files?.[0];
    if (newFile) {
      setMainImage(newFile);
      onUpdate("images", [newFile, ...subImages]);
    }
  };

  const handleSubImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newFile = event.target.files?.[0];
    if (newFile) {
      setSubImages((prev) => {
        const updatedSubImages = [...prev];
        updatedSubImages[index] = newFile;
        onUpdate("images", [mainImage, ...updatedSubImages]);
        return updatedSubImages;
      });
    }
  };

  const baseURL = "http://localhost:8080";

  const getImageSrc = (img: any) => {
    if (typeof img === "string") {
      return img.startsWith("http") ? img : `${baseURL}${img}`;
    } else if (img instanceof File) {
      return URL.createObjectURL(img);
    }
    return "";
  };

  return (
    <Box sx={{ padding: 2, borderRadius: 2, border: "1px solid #e0e0e0" }}>
      <Typography variant="h6" gutterBottom>
        Product Images
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Main Image */}
        <Box
          sx={{
            width: "100%",
            height: 300,
            border: "1px dashed #e0e0e0",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
            backgroundColor: "#E4E0E1 ",
          }}
        >
          {mainImage ? (
            <img
              src={getImageSrc(mainImage)}
              alt="Main"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Typography variant="body2" color="textSecondary">
              Main Image
            </Typography>
          )}
          <IconButton
            color="primary"
            component="label"
            sx={{ position: "absolute", bottom: 4, right: 4 }}
          >
            <AddPhotoAlternateIcon fontSize="large" />
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleMainImageUpload}
            />
          </IconButton>
        </Box>

        {/* Sub Images */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            width: "100%",
          }}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                height: 100,
                border: "1px dashed #e0e0e0",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#E4E0E1",
              }}
            >
              {subImages[index] ? (
                <Box>
                  <img
                    src={getImageSrc(subImages[index])}
                    alt={`Sub ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    color="primary"
                    component="label"
                    sx={{ position: "absolute", bottom: 4, right: 4 }}
                  >
                    <AddPhotoAlternateIcon fontSize="small" />
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(event) => handleSubImageUpload(event, index)}
                    />
                  </IconButton>
                </Box>
              ) : (
                <IconButton color="primary" component="label">
                  <AddIcon fontSize="large" />
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(event) => handleSubImageUpload(event, index)}
                  />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UploadImage;
