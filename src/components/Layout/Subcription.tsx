import { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
    fontWeightBold: 800,
  },
});

const Subscription = () => {
  const [email, setEmail] = useState(""); // Biến để lưu thông tin email
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setSubmitted(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "20px",
          padding: "25px 100px",
          borderRadius: "30px",
          background: "linear-gradient(90deg, #1A1A19, #C30E59,#ff9d9d)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
          color: "white",
          transition: "all 0.5s ease-in-out",
          position: "relative",
          flexWrap: "wrap",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.6)",
          },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: "700", fontSize: "30px" }}>
            SIGN UP FOR OUR BEAUTY NEWSLETTER
          </Typography>

          <Typography sx={{ fontSize: "18px" }}>
            Don't miss out on thousands of amazing products and exclusive
            offers.
          </Typography>
        </Box>

        {!submitted && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: "0.8",
              ml: 2,
              borderRadius: "50px",
              backgroundColor: "#EFF3EA",
              transition: "all 0.5s ease-in-out",
              opacity: submitted ? 0 : 1,
              pointerEvents: submitted ? "none" : "auto",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <TextField
              placeholder="Enter your email"
              variant="outlined"
              value={email} // Gắn giá trị của TextField
              onChange={(e) => setEmail(e.target.value)} // Cập nhật email khi người dùng nhập
              InputProps={{
                disableUnderline: true,
                style: {
                  color: "black",
                  padding: "6px 15px",
                  background: "transparent",
                  border: "none",
                },
              }}
              sx={{
                flex: 1,
                background: "transparent",
                borderRadius: "50px 0 0 50px",
                "& fieldset": { border: "none" },
                "&::placeholder": { color: "white" },
                "&:focus-within": {
                  outline: "none",
                  boxShadow: "0 0 8px 2px white",
                },
                transition: "box-shadow 0.3s ease-in-out",
              }}
            />
            <Button
              onClick={handleSubmit}
              sx={{
                color: "black",
                fontWeight: "bold",
                borderRadius: "0 50px 50px 0",
                padding: "6px 20px",
                background: "none",
                border: "none",
                "&:hover": {
                  color: "#C30E59",
                  background: "none",
                },
                "&:active": {
                  background: "rgba(255, 255, 255, 0.2)",
                },
                transition: "color 0.3s ease, background 0.3s ease",
              }}
            >
              SUBSCRIBE
            </Button>
          </Box>
        )}

        {submitted && (
          <Box
            sx={{
              opacity: 1,
              transition: "opacity 2s ease-in-out",
              textAlign: "center",
              background: "transparent",
              visibility: submitted ? "visible" : "hidden",
              transitionDelay: "1s",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "30px",
              }}
            >
              Thank you for subscribing!
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: "18px",
              }}
            >
              You will soon receive a confirmation email.
            </Typography>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Subscription;
