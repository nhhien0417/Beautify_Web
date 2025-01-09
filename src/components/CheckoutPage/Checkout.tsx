import { SetStateAction, useState } from "react";
import { Alert, Box, Container, Snackbar } from "@mui/material";
import DeliveryAddress from "./Address/DeliveryAddress";
import CheckoutList from "./Product/CheckoutList";
import OrderSummary from "./Summary/OrderSummary";
import PaymentMethod from "./Payment/PaymentMethod";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VoucherSection from "./Vourcher/VoucherSection";
import { useUserStore } from "../../zustand/useUserStore";
import useCheckoutStore from "../../zustand/useCheckoutStore";
import { useNavigate } from "react-router-dom";
import useSaleTicketStore from "../../zustand/useSaleTicketStore";
import useCartStore from "../../zustand/useCartStore";

const checkoutTheme = createTheme({
  palette: {
    primary: {
      main: "#AF1740",
    },
    secondary: {
      main: "#A6AEBF",
    },
    background: {
      default: "#f9f9f9",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h6: {
      fontWeight: 600,
      color: "#6c63ff",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
      color: "#333",
    },
  },
});

const Checkout = () => {
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { addSaleTicket } = useSaleTicketStore();
  const { checkoutItems, selectedItemIds, resetCheckoutStore } =
    useCheckoutStore();
  const { removeSelectedItems, setSelectedItems } = useCartStore();
  const { account } = useUserStore();
  const [paymentMethod] = useState("Charge On Delivery (COD)");
  const navigate = useNavigate();

  const selectedCheckoutItems = checkoutItems.filter((item) =>
    selectedItemIds.includes(item.product.id)
  );

  const productList = selectedCheckoutItems.map((item) => ({
    product: {
      unitPrice: item.product.price,
      productImage: item.product.images[0],
      name: item.product.name,
    },
    quantity: item.amount,
  }));

  const [currentAddress, setCurrentAddress] = useState({
    id: account.id,
    name: account.name,
    phone: account.phoneNumber,
    address: account.address,
  });

  const [finalPrice, setPrice] = useState(0);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false); // Trạng thái Snackbar

  const [voucher, setVoucher] = useState({
    id: 0,
    discountValue: 0,
    isPercentage: false,
    name: "No voucher selected",
  });

  const handleAddressChange = (
    newAddress: SetStateAction<{
      id: string;
      name: string;
      phone: string;
      address: string;
    }>
  ) => {
    setCurrentAddress(newAddress);
  };

  const handleCheckOut = async () => {
    if (productList.length === 0) {
      setSnackbarMessage("Cart empty. Please add at least one product.");
      setSnackbarOpen(true); // Mở Snackbar nếu không có sản phẩm
      return;
    }

    if (!currentAddress.address) {
      setSnackbarMessage("Please add your address & phone number");
      setSnackbarOpen(true);
      return;
    }

    const newSaleTicket = {
      id: "",
      total: finalPrice,
      date: new Date().toISOString(),
      status: "PREPARING",
      discount: voucher,
      listProducts: productList,
    };
    addSaleTicket(newSaleTicket as any);
    navigate("/orders");

    setSelectedItems(selectedItemIds);
    resetCheckoutStore();
    removeSelectedItems();
  };

  return (
    <ThemeProvider theme={checkoutTheme}>
      <Box
        sx={{
          padding: 3,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            borderRadius: 2,
            padding: 3,
            background: "rgba(241, 240, 232,0.7)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            margin: "0 auto",
          }}
        >
          <DeliveryAddress
            id={currentAddress.id}
            name={currentAddress.name}
            phone={currentAddress.phone}
            address={currentAddress.address}
            onChangeAddress={handleAddressChange}
          />
          <CheckoutList />
          <VoucherSection
            voucherName={voucher.name}
            discountValue={voucher.discountValue}
            isPercentage={voucher.isPercentage}
            onChangeVoucher={setVoucher}
          />
          <PaymentMethod
            method={paymentMethod}
            onChangePaymentMethod={() => alert("Change Payment Method")}
          />
          <OrderSummary
            shippingFee={5}
            voucherDiscount={voucher.discountValue}
            isVoucherPercentage={voucher.isPercentage}
            onPlaceOrder={() => handleCheckOut()}
            setPrice={setPrice}
          />
        </Container>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            top: 50,
          }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default Checkout;
