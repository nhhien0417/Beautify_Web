import { useParams } from "react-router-dom";
import OrderDetail from "../components/OrderPage/OrderDetail";
import useSaleTicketStore from "../zustand/useSaleTicketStore";
import { Box, CircularProgress } from "@mui/material";

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const saleTickets = useSaleTicketStore((state) => state.saleTickets);
  const saleTicket = saleTickets.find((p) => Number(p.id) === Number(orderId));

  if (!saleTicket) {
    return (
      <Box
        sx={{
          textAlign: "center",
          marginTop: "20vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return <OrderDetail saleTicket={saleTicket} />;
};

export default OrderDetailPage;
