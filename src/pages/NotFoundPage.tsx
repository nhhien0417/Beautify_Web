import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dinosaur from "../assets/download.png";

const NotFoundPage: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
      bgcolor="#f7f8fa"
      textAlign="center"
    >
      {!showMessage ? (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "600px",
            height: "200px",
            overflow: "hidden",
          }}
        >
          {/* Khủng long */}
          <Box
            sx={{
              position: "absolute",
              bottom: "0",
              left: "10%",
              width: "50px",
              height: "50px",
              backgroundImage: `url(${dinosaur})`,
              backgroundSize: "cover",
              animation: "run 1.1s linear infinite",
            }}
          />
          {/* Chướng ngại vật */}
          <Box
            sx={{
              position: "absolute",
              bottom: "0",
              right: "30%",
              width: "30px",
              height: "30px",
              backgroundColor: "#8b0000",
              borderRadius: "5px",
            }}
          />
          {/* Đường chạy */}
          <Box
            sx={{
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              height: "5px",
              backgroundColor: "#333",
            }}
          />

          {/* CSS Animation */}
          <style>
            {`
              @keyframes run {
                0% { transform: translateX(0); }
                100% { transform: translateX(300px); }
              }
            `}
          </style>
        </Box>
      ) : (
        <>
          {/* Thông báo lỗi */}
          <Typography
            variant="h1"
            sx={{
              fontSize: "96px",
              fontWeight: "bold",
              color: "#ff5722",
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography variant="h5" sx={{ mb: 2, color: "#555" }}>
            Oops! The page you're looking for doesn't exist.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "#777" }}>
            It seems like the page you're trying to reach is unavailable or has
            been moved.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGoHome}
            sx={{
              padding: "10px 20px",
              fontSize: "16px",
              textTransform: "none",
            }}
          >
            Go to Homepage
          </Button>
        </>
      )}
    </Box>
  );
};

export default NotFoundPage;
