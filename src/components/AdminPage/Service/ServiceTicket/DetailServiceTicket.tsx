import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { formatDate } from "../../../../services/date";

interface DetailServiceTicketProps {
  open: boolean;
  onClose: () => void;
  data: {
    listServices: any;
    serviceTicket: any;
  };
}

const DetailServiceTicket: React.FC<DetailServiceTicketProps> = ({
  open,
  onClose,
  data,
}) => {
  console.log(data);
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={2}>
          Service Ticket Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Service Ticket ID"
              value={data.serviceTicket.id}
              fullWidth
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Customer Name"
              value={data.serviceTicket.user.name}
              fullWidth
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date"
              value={formatDate(data.serviceTicket.date)}
              fullWidth
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Total Price"
              value={data.serviceTicket.total}
              fullWidth
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Status"
              value={data.serviceTicket.status ? "Done" : "Not Done"}
              fullWidth
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Paid"
              value={data.serviceTicket.checkout ? "Paid" : "Pending Payment"}
              fullWidth
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Typography variant="h6" mt={3}>
          Services
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Service Name</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.listServices.map((service: any) => (
                <TableRow key={service.id}>
                  <TableCell>{service.id}</TableCell>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={3} textAlign="right">
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DetailServiceTicket;
