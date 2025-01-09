import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  styled,
  Box,
  IconButton,
} from "@mui/material";
import { FaStar } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineFavorite } from "react-icons/md";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: "400px",
  borderTopLeftRadius: "250px",
  borderTopRightRadius: "250px",
  borderBottomLeftRadius: "30px",
  borderBottomRightRadius: "30px",
  transition: "0.3s",
  boxShadow: theme.shadows[5],
  backgroundColor: "#FFFFF7",
  "&:hover": {
    boxShadow: theme.shadows[10],
    backgroundColor: theme.palette.grey[50],
  },
}));

const RecentlyCard = () => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="300"
        image="https://linkstore.vn/wp-content/uploads/2024/08/Tinh-chat-Prettty-Skin-Vita-K-Cica-AC-Clear-Treatment-Serum-1.jpg"
        alt="Product"
        sx={{
          padding: "20px",
          borderRadius: "50%",
          aspectRatio: 1,
        }}
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography gutterBottom sx={{ fontWeight: 700, fontSize: "17px" }}>
            Serum duong trang da
          </Typography>
          <IconButton>
            <MdOutlineFavorite color="red" />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#F54C0F",
                fontWeight: 700,
              }}
            >
              $100
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: "grey",
                fontWeight: 700,
                textDecoration: "line-through",
              }}
            >
              $150
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            <FaStar color="#FFBE0D" />
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: "600",
                color: "#000",
              }}
            >
              5.0
            </Typography>
            <Typography
              sx={{
                marginLeft: "5px",
                fontSize: "13px",
                color: "grey",
                fontWeight: 500,
              }}
            >
              100 reviews
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <Box display="flex" justifyContent="center" pb={2}>
        <Button
          variant={"outlined"}
          endIcon={<FaCartShopping />}
          sx={{
            color: "#5f5a56",
            borderRadius: "35px",
            border: "2px solid ",
            width: "250px",
            height: "50px",
            fontWeight: 1000,
            fontSize: "12px",
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </StyledCard>
  );
};

export default RecentlyCard;
