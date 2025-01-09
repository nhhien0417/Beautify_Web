import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import StatusTimeline from "./StatusTimeline";
import { formatDate } from "../../services/date";
import SaleTicket from "../../entities/SaleTicket";
import useSaleTicketStore from "../../zustand/useSaleTicketStore";

interface Props {
  saleTicket: SaleTicket;
}

const ordersTheme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
  },
});

const OrderDetail = ({ saleTicket }: Props) => {
  const { updateSaleTicketStatus } = useSaleTicketStore();

  const shippingFee = 5;
  const orderPrice = saleTicket.listProducts.reduce((total, product) => {
    return total + product.product.unitPrice * product.quantity;
  }, 0);

  const paymentMethod = "Cash on Delivery";

  const discountAmount = saleTicket?.discount?.isPercentage
    ? ((orderPrice ?? 0) * saleTicket.discount.discountValue) / 100
    : saleTicket?.discount?.discountValue;

  const steps = ["PREPARING", "DELIVERING", "COMPLETED"];
  const currentStep = steps.indexOf(saleTicket.status);

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleCompleteClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = async (confirmed: boolean) => {
    setDialogOpen(false);
    if (confirmed) {
      updateSaleTicketStatus(saleTicket.id, "COMPLETED");
    }
  };

  return (
    <ThemeProvider theme={ordersTheme}>
      <Box
        sx={{
          padding: 4,
          maxWidth: 900,
          margin: "0 auto",
          backgroundColor: "#f4f6f8",
          borderRadius: 2,
          marginTop: "80px",
        }}
      >
        {/* Order Header */}
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            marginBottom: 4,
            borderRadius: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Order ID: {saleTicket.id}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Order Date: {formatDate(saleTicket.date)}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Expected Delivery:{" "}
              {formatDate(
                new Date(
                  new Date(saleTicket.date).setDate(
                    new Date(saleTicket.date).getDate() + 5
                  )
                ).toLocaleDateString()
              )}
            </Typography>
          </Box>
        </Paper>

        {/* Status Timeline */}
        <StatusTimeline currentStep={currentStep} />

        {/* Order Items */}
        <Card sx={{ marginBottom: 4 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              Order Items
            </Typography>
            <List>
              {saleTicket.listProducts.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingY: 1,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={item.product.productImage}
                      alt={item.product.name}
                      sx={{ borderRadius: 1, width: 60, height: 60 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.product.name}
                    secondary={`Quantity: ${item.quantity}`}
                    sx={{ marginLeft: 2 }}
                  />
                  <Typography sx={{ fontWeight: "bold" }}>
                    ${item.product.unitPrice.toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Payment Info */}
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              Payment Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Order Price:</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography>${(orderPrice ?? 0).toFixed(2)}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>Shipping Fee:</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography>${shippingFee.toFixed(2)}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>
                  Voucher (
                  {saleTicket.discount ? saleTicket.discount.name : "None"}):
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography>
                  {saleTicket?.discount
                    ? !saleTicket.discount.isPercentage
                      ? `- $${discountAmount?.toFixed(2)}`
                      : `- $${discountAmount?.toFixed(2)} (${saleTicket.discount.discountValue}%)`
                    : "- $0"}
                </Typography>
              </Grid>

              <Divider sx={{ width: "100%", marginY: 1 }} />

              <Grid item xs={6}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Final Price:
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography sx={{ fontWeight: "bold", color: "green" }}>
                  ${saleTicket.total.toFixed(2)}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>Payment Method:</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography>{paymentMethod}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Confirm Completed Button */}
        {saleTicket.status === "DELIVERING" && (
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: 4,
              paddingX: 4, // Tăng khoảng cách ngang
              paddingY: 2, // Tăng khoảng cách dọc
              fontSize: "1.2rem", // Tăng kích thước chữ
              fontWeight: "bold", // Làm chữ đậm hơn
              borderRadius: 3, // Làm nút tròn hơn
              height: 60, // Tăng chiều cao nút
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Tạo hiệu ứng đổ bóng
            }}
            onClick={handleCompleteClick}
          >
            Confirm Completed
          </Button>
        )}

        {/* Confirmation Dialog */}
        <Dialog open={isDialogOpen} onClose={() => handleDialogClose(false)}>
          <DialogTitle>Confirm Completion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to mark this order as completed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDialogClose(false)}>Cancel</Button>
            <Button
              onClick={() => handleDialogClose(true)}
              color="primary"
              variant="contained"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default OrderDetail;
