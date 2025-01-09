import React from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  primaryValue: string;
  primaryLabel: string;
  secondaryValue: string;
  secondaryLabel: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  icon,
  title,
  primaryValue,
  primaryLabel,
  secondaryValue,
  secondaryLabel,
}) => {
  return (
    <Card
      sx={{
        borderWidth: 1,
        borderRadius: 2,
        width: "95%",
        minWidth: "150px",
        boxShadow: 3,
        bgcolor: "background.paper", // Đặt màu nền phù hợp
        "&:hover": {
          boxShadow: 6, // Tăng bóng đổ khi hover
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main" }}>{icon}</Avatar>
          <Typography
            fontSize={14}
            fontWeight="bold"
            color="text.primary"
            ml={1}
            noWrap
          >
            {title}
          </Typography>
        </Box>

        <Box display={"flex"} justifyContent={"space-between"} mt={2} px={1}>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography textAlign={"center"} variant="h5" fontWeight="bold">
              {primaryValue}
            </Typography>
            <Typography
              textAlign={"center"}
              variant="body2"
              color="text.secondary"
            >
              {primaryLabel}
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography textAlign={"center"} variant="h5" fontWeight="bold">
              {secondaryValue}
            </Typography>
            <Typography
              textAlign={"center"}
              variant="body2"
              color="text.secondary"
            >
              {secondaryLabel}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
