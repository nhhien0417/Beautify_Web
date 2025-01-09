import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Box, Typography } from "@mui/material";

const Vision = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            width: "80%",
            padding: "40px",
            marginTop: "-100px",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Box
            width={{ xs: "100%", sm: "50%" }}
            sx={{ paddingRight: { xs: 0, sm: "20px" } }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                marginBottom: "0",
                textAlign: "left",
                lineHeight: "1.5",
                fontSize: { xs: "1.8rem", md: "2.65rem" },
                fontFamily: "Playfair Display",
                whiteSpace: "pre-wrap",
              }}
            >
              <span style={{ color: "#921A40" }}>
                Empowering You to Enhance Your Beauty
              </span>
              {"\n"}
              & Shine in Your Own Unique Way
            </Typography>
          </Box>
          <Box width={{ xs: "100%", sm: "50%" }}>
            <Box
              sx={{
                pt: 10,
              }}
            >
              <DotLottieReact
                src="https://lottie.host/6eb8c7c9-c7aa-4497-8007-9985cb757b56/BdIp7I4Czf.lottie"
                loop
                autoplay
                style={{
                  width: "500px", // Đặt chiều rộng
                  height: "200px", // Đặt chiều cao
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "15px", sm: "18px" },
                color: "#555",
                textAlign: "left",
                paddingBottom: 1,
              }}
            >
              Become your trusted online companion, offering every user a
              personalized experience to effortlessly enhance their beauty and
              confidently express their individual style.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box width="100%" sx={{ marginTop: "20px" }}>
        <img
          src="https://store.bandccamera.com/cdn/shop/articles/beauty-product-photography-154115.jpg?v=1660927590"
          alt="Vision Image"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>
    </>
  );
};

export default Vision;
