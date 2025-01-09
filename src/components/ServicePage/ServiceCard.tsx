import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Service from "../../entities/Service";

interface Props {
  service: Service;
}

export const ServiceCard = ({ service }: Props) => {
  return (
    <Link
      to={`/services/${service.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card
        sx={{
          width: 360, // Fixed width for the card
          height: 460, // Fixed height for the card
          margin: "auto",
          display: "flex",
          backgroundColor: "#FFFDEC",
          flexDirection: "column",
          borderRadius: 3,
          boxShadow: 3,
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-5px)", // Subtle lift on hover
            transition: "0.3s ease-in-out",
          },
        }}
      >
        {/* Image Section */}
        <CardMedia
          component="img"
          sx={{
            height: 280, // Fixed image height
            objectFit: "cover", // Ensure image scales nicely
          }}
          image={service.image}
          title={service.name}
        />

        {/* Content Section */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2 }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="div"
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              {service.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3, // Limit description to 3 lines
                WebkitBoxOrient: "vertical",
              }}
            >
              {service.description}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Link>
  );
};
