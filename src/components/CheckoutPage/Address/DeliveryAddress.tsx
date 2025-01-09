import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
}

interface DeliveryAddressProps {
  id: string;
  name: string;
  phone: string;
  address: string;
  onChangeAddress: (newAddress: Address) => void;
}

const DeliveryAddress = ({
  id,
  name,
  phone,
  address,
  onChangeAddress,
}: DeliveryAddressProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editedAddress, setEditedAddress] = useState<Address | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState<AlertColor>("error");

  const handleOpenDialog = () => {
    setEditedAddress({ id, name, phone, address });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveEditedAddress = () => {
    if (
      editedAddress &&
      editedAddress.name &&
      editedAddress.phone &&
      editedAddress.address
    ) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(editedAddress.phone)) {
        setSnackbarMessage(
          "Phone number must contain exactly 10 digits and no letters or special characters."
        );
        setSnackbarColor("error");
        setSnackbarOpen(true);
        return;
      }
      setSnackbarColor("info");
      setSnackbarMessage("Updated information successfully.");
      setSnackbarOpen(true);

      onChangeAddress(editedAddress);
      setDialogOpen(false);
    } else {
      setSnackbarColor("error");
      setSnackbarMessage("Please enter full information.");
      setSnackbarOpen(true); // Show snackbar if any field is missing
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ borderBottom: "1px solid #ddd", paddingBottom: 2 }}>
      <Typography
        variant="h6"
        sx={{ color: "brown", fontWeight: "bold", mb: 2 }}
      >
        Address
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={1}
      >
        <Box>
          <Typography variant="body1" fontWeight="bold">
            {name} ({phone})
          </Typography>
          <Typography variant="body2">{address}</Typography>
        </Box>
        <Button
          variant="text"
          size="small"
          color="primary"
          onClick={handleOpenDialog}
        >
          Edit
        </Button>
      </Box>

      {/* Dialog for editing the address */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Address</DialogTitle>
        <DialogContent>
          {editedAddress && (
            <Box mt={2}>
              <TextField
                fullWidth
                label="Name"
                value={editedAddress.name}
                onChange={(e) =>
                  setEditedAddress({ ...editedAddress, name: e.target.value })
                }
                margin="dense"
              />
              <TextField
                fullWidth
                label="Phone"
                value={editedAddress.phone}
                onChange={(e) =>
                  setEditedAddress({ ...editedAddress, phone: e.target.value })
                }
                margin="dense"
              />
              <TextField
                fullWidth
                label="Address"
                value={editedAddress.address}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    address: e.target.value,
                  })
                }
                margin="dense"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveEditedAddress} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for validation messages */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarColor}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DeliveryAddress;
