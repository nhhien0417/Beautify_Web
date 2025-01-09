import { Paper, Box, Typography } from "@mui/material";

interface Props {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const GuaranteeCard = ({ icon, title, subtitle }: Props) => (
  <Paper
    elevation={4}
    sx={{
      display: "flex",
      alignItems: "center",
      padding: "20px",
      borderRadius: "50px",
      background: "linear-gradient(135deg, #c2b067, #a28c57)", // Gradient nền
      marginX: "30px",
      width: "350px",
      transition: "transform 0.3s, box-shadow 0.3s", // Hiệu ứng hover mượt mà
      boxShadow: "0px 4px 20px rgba(245, 245, 220, 0.5)", // Beige shadow
    }}
  >
    <Box
      sx={{
        width: "60px",
        height: "60px",
        background: "linear-gradient(135deg, #E9E5D9, #d0c7b8)", // Gradient icon
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "15px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Shadow cho icon
        transition: "transform 0.3s", // Hiệu ứng mượt khi hover
        "&:hover": {
          transform: "rotate(15deg)", // Hiệu ứng quay nhẹ khi hover
        },
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          color: "#FEFDF8",
          transition: "color 0.3s", // Mượt mà khi thay đổi màu
          "&:hover": {
            color: "#FFEB85", // Màu chữ sáng hơn khi hover
          },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#FEFDF8",
          opacity: 0.8, // Làm chữ phụ nhẹ nhàng hơn
          "&:hover": {
            opacity: 1, // Rõ hơn khi hover
          },
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  </Paper>
);

export default GuaranteeCard;
