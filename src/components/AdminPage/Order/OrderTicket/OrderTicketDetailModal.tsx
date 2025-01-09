import React from "react";
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { formatDate } from "../../../../services/date";

type ImportTicketDetailProps = {
  open: boolean;
  onClose: () => void;
  data: {
    user: {
      name: string;
      phoneNumber: string;
    };
    date: string;
    total: number;
    status: string;
    discount?: {
      name: string;
      percentage?: boolean;
      discountValue: number;
    };
    details: {
      listProducts: {
        id: number;
        product: {
          id: number;
          name: string;
          unitPrice: number;
        };
        quantity: number;
      }[];
    };
  };
};

const OrderTicketDetailModal: React.FC<ImportTicketDetailProps> = ({
  open,
  onClose,
  data,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        {/* Header */}
        <Typography variant="h6" fontWeight={600} mb={3}>
          Order Ticket Details
        </Typography>

        {/* Fields Section */}
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={4}>
          <TextField
            label="Customer's Name"
            value={data.user.name}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Customer's Phone"
            value={data.user.phoneNumber}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Discount"
            value={
              data.discount
                ? `${data.discount.name} (- ${
                    data.discount.percentage
                      ? `${data.discount.discountValue}%`
                      : `$${data.discount.discountValue.toFixed(2)}`
                  })`
                : "No discount"
            }
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Total"
            value={`$${data.total.toFixed(2)}`}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Date"
            value={formatDate(data.date)}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Status"
            value={data.status}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Box>

        {/* Table Section */}
        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.details.listProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.product.id}</TableCell>
                  <TableCell>{product.product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.product.unitPrice}</TableCell>
                  <TableCell>
                    {product.quantity * product.product.unitPrice}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default OrderTicketDetailModal;
