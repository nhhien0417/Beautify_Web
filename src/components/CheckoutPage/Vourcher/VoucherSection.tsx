import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { FaTag } from "react-icons/fa";
import VoucherSelector from "./VoucherSelector"; // Import the VoucherSelector component
import useVoucherStore from "../../../zustand/useVoucherStore";
import Voucher from "../../../entities/Voucher";

interface VoucherSectionProps {
  voucherName?: string;
  discountValue?: number;
  isPercentage?: boolean;
  onChangeVoucher: (voucher: Voucher) => void;
}

const VoucherSection = ({
  voucherName = "No voucher selected", // Default to "No voucher selected"
  discountValue = 0,
  isPercentage = false,
  onChangeVoucher,
}: VoucherSectionProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const { vouchers } = useVoucherStore();
  const activeVouchers = vouchers.filter((voucher) => voucher.isActive);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleSelectVoucher = (voucher: Voucher) => {
    onChangeVoucher(voucher);
    handleCloseDialog();
  };

  const discountText = isPercentage
    ? `${discountValue}%`
    : `$${discountValue.toLocaleString()}`;

  return (
    <Box
      my={2}
      p={2}
      sx={{
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box display="flex" alignItems="center" mb={1}>
        <FaTag color="navy" />
        <Typography
          variant="subtitle1"
          sx={{ color: "#333", fontWeight: "bold", paddingLeft: 2 }}
        >
          Voucher
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />

      <Card
        sx={{
          backgroundColor: "#f2e3ff",
          borderRadius: 2,
          padding: 1,
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          mb: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="body1"
            sx={{
              pt: 1,
              color: "#6c63ff",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 20,
            }}
          >
            {voucherName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              pt: 1,
              color: "#555",
              textAlign: "center",
            }}
          >
            Discount:{" "}
            {voucherName === "No voucher selected" ? "-" : discountText}
          </Typography>
        </CardContent>
      </Card>

      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Button
          variant="outlined"
          size="small"
          color="primary"
          sx={{ fontWeight: "bold", textTransform: "none" }}
          onClick={handleOpenDialog}
        >
          Change
        </Button>
      </Box>

      {/* Open VoucherSelector when Change button is clicked */}
      <VoucherSelector
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSelectVoucher={handleSelectVoucher}
        vouchers={activeVouchers}
      />
    </Box>
  );
};

export default VoucherSection;
