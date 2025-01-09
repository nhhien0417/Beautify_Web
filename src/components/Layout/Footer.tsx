import { Box, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Instagram, YouTube } from "@mui/icons-material";
import logo from "../../assets/AppIcon.jpg";
import Subscription from "./Subcription";

const Footer = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Subscription />
      <Box
        sx={{
          margin: "20px", // Thêm margin toàn bộ
          borderRadius: "30px", // Thêm border radius 30px
          backgroundColor: "#0B0B0B",
          display: "flex",
          flexDirection: "column",
          paddingX: "20px",
        }}
      >
        <Box
          sx={{
            paddingY: "10px",
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Logo Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Brand Logo"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "20px",
              }}
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginLeft: "10px", color: "#FF748B" }}
            >
              BEAUTIFY
            </Typography>
          </Box>

          {/* Social Media Icons */}
          <Box sx={{ display: "flex" }}>
            <IconButton>
              <YouTube
                sx={{
                  fontSize: "40px",
                  color: "#FF2929",
                  border: "2px solid #333",
                  aspectRatio: 1,
                  padding: "5px",
                  borderRadius: "50%",
                }}
              />
            </IconButton>
            <IconButton>
              <Facebook
                sx={{
                  fontSize: "40px",
                  color: "#0A5EB0",
                  border: "2px solid #333",
                  aspectRatio: 1,
                  padding: "5px",
                  borderRadius: "50%",
                }}
              />
            </IconButton>
            <IconButton>
              <Instagram
                sx={{
                  fontSize: "40px",
                  color: "#D91656",
                  border: "2px solid #333",
                  aspectRatio: 1,
                  padding: "5px",
                  borderRadius: "50%",
                }}
              />
            </IconButton>
          </Box>
        </Box>

        {/* Footer Text */}
        <Box
          sx={{
            paddingY: "10px",
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{
              textAlign: "left",
              color: "#FBFCD4",
              fontSize: "14px",
            }}
          >
            ©2025. Made with <span style={{ color: "#FF6347" }}>❤️</span> by
            HiHiDuDuDu
          </Typography>

          {/* Privacy Policy and Terms */}
          <Box>
            <Link href="#" color="#FBFCD4" underline="none">
              Privacy Policy
            </Link>{" "}
            | |{" "}
            <Link href="#" color="#FBFCD4" underline="none">
              Terms & Conditions
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
