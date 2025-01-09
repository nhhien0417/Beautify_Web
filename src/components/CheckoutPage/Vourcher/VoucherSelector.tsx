import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { FaTag } from "react-icons/fa";
import Voucher from "../../../entities/Voucher";
import useCheckoutStore from "../../../zustand/useCheckoutStore";
import { useEffect, useState } from "react";

interface VoucherSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelectVoucher: (voucher: Voucher) => void;
  vouchers: Voucher[];
}

interface SortVoucher {
  voucher: Voucher;
  value: number;
}

const VoucherSelector = ({
  open,
  onClose,
  onSelectVoucher,
  vouchers,
}: VoucherSelectorProps) => {
  const { getSelectedItemsTotal } = useCheckoutStore();
  const [displayVoucher, setDisplayVoucher] = useState<SortVoucher[]>([]);

  const formatDiscount = (value: number, isPercentage: boolean) =>
    isPercentage ? `${value}%` : `$${value.toLocaleString()}`;

  useEffect(() => {
    const selectedItemsTotal = getSelectedItemsTotal();
    const sortedVouchers = vouchers
      .map((voucher) => ({
        voucher,
        value: voucher.isPercentage
          ? selectedItemsTotal * (voucher.discountValue / 100)
          : voucher.discountValue,
      }))
      .sort((a, b) => b.value - a.value);
    setDisplayVoucher(sortedVouchers);
  }, [vouchers, getSelectedItemsTotal]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 8,
          width: 500,
          backgroundColor: "#fff",
          boxShadow: 3,
          padding: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          paddingBottom: 2,
          color: "#5F4B8B",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        <FaTag size={28} style={{ marginRight: 10 }} />
        Select a Voucher
      </DialogTitle>

      <DialogContent sx={{ paddingTop: 0 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 2,
            paddingTop: 2,
          }}
        >
          {displayVoucher.map((voucher, index) => (
            <Card
              key={voucher.voucher.id}
              sx={{
                borderRadius: 8,
                boxShadow: 2,
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                },
                backgroundColor: "#F9F5FF",
              }}
            >
              <CardActionArea onClick={() => onSelectVoucher(voucher.voucher)}>
                <CardContent sx={{ padding: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "600",
                      color: "#5F4B8B",
                      fontSize: "20px",
                      textAlign: "center",
                    }}
                  >
                    {voucher.voucher.name}
                  </Typography>
                  {index === 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "85%",
                        transform: "translate(-50%, -50%)",
                        width: 60,
                        height: 60,
                        backgroundColor: "rgba(255, 0, 0)",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        animation: "pulse 2s infinite",
                        "@keyframes pulse": {
                          "0%": {
                            transform: "translate(-50%, -50%) scale(1)",
                            boxShadow: "0 0 0px rgba(255, 0, 0, 1)",
                          },
                          "50%": {
                            transform: "translate(-50%, -50%) scale(1.2)",
                            boxShadow: "0 0 10px rgba(255, 0, 0, 1)",
                          },
                          "100%": {
                            transform: "translate(-50%, -50%) scale(1)",
                            boxShadow: "0 0 0px rgba(255, 0, 0, 1)",
                          },
                        },
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Best Offer
                      </Typography>
                    </Box>
                  )}

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#777",
                      fontSize: "18px",
                      textAlign: "center",
                      marginTop: 1,
                    }}
                  >
                    Discount:{" "}
                    {formatDiscount(
                      voucher.voucher.discountValue,
                      voucher.voucher.isPercentage
                    )}
                    {" "}
                    ({-voucher.value}$)
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{ justifyContent: "flex-end", paddingRight: 3, paddingBottom: 2 }}
      >
        <Button
          onClick={onClose}
          sx={{
            fontWeight: "600",
            color: "#5F4B8B",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#F1E6FF",
            },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VoucherSelector;
