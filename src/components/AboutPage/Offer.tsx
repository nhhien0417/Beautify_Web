import { Avatar, Box, Typography } from "@mui/material";
import avt from "../../assets/olli-the-polite-cat.jpg";

const Offer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
            paddingX: "40px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Box width={{ xs: "100%", sm: "45%" }} paddingRight={5}>
            <Typography
              sx={{
                fontWeight: "bold",
                textAlign: "left",
                lineHeight: "1.5",
                color: "#921A40",
                fontSize: { xs: "1.8rem", md: "2.65rem" },
                fontFamily: "Playfair Display",
              }}
            >
              The Ultimate <br />
              Beauty Shopping Platform
            </Typography>
          </Box>
          <Box
            width={{ xs: "100%", sm: "55%" }}
            sx={{
              display: "flex",
              paddingTop: { xs: "10px", sm: 0 },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "15px", md: "18px" },
                color: "#555",
                textAlign: "left",
                paddingTop: 2,
              }}
            >
              Beauty Product E-catalog combines modern features like product
              search and filtering, shopping cart and checkout, wishlists, and
              customer reviews, making your online shopping experience
              effortless and enjoyable.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: 8,
          paddingX: "40px",
          width: "80%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "45%",
            justifyContent: "flex-start",
            paddingTop: 1,
          }}
        >
          <Avatar
            sx={{
              width: 50,
              height: 50,
              marginRight: "10px",
            }}
            src={avt}
            alt="Profile Avatar"
          />
          <Box>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "2px",
              }}
            >
              Orange Cat
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: "#555",
              }}
            >
              CEO
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: "55%",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              textAlign: "left",
              lineHeight: "1.5",
              fontSize: { xs: "1.5rem", md: "2.2rem" },
              color: "#343131",
              fontFamily: "Playfair Display",
            }}
          >
            "Our platform caters to beauty lovers of all ages, whether you're a
            newcomer or an expert. We help you find the products that suit your
            needs and preferences. "
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Offer;
