import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControlLabel,
  FormLabel,
  Switch,
} from "@mui/material";
import useVoucherStore from "../zustand/useVoucherStore";
import Voucher from "../entities/Voucher";

const VoucherPage: React.FC = () => {
  const { vouchers, addVoucher, editVoucher, removeVoucher, restoreVoucher } =
    useVoucherStore();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentVoucher, setCurrentVoucher] = useState<Voucher | null>(null);
  const [newVoucher, setNewVoucher] = useState<Voucher | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [valueError, setValueError] = useState<string | null>(null);

  const handleToggleActive = (id: number) => {
    const voucher = vouchers.find((v) => v.id === id);

    if (voucher) {
      if (voucher.isActive) {
        removeVoucher(id);
      } else {
        restoreVoucher(id);
      }

      voucher.isActive = !voucher.isActive;
    }
  };

  const validateVoucherFields = (
    name: string,
    discountValue: number,
    isPercentage: boolean
  ): boolean => {
    let isValid = true;

    // Validate name
    if (!name.trim()) {
      setNameError("Name cannot be empty.");
      isValid = false;
    } else {
      setNameError(null);
    }

    // Validate discountValue
    if (discountValue <= 0) {
      setValueError("Discount value must be greater than 0.");
      isValid = false;
    } else if (isPercentage && (discountValue < 0 || discountValue > 100)) {
      setValueError("Percentage discount value must be between 0 and 100.");
      isValid = false;
    } else {
      setValueError(null);
    }

    return isValid;
  };

  const handleEditClick = (voucher: Voucher) => {
    setCurrentVoucher(voucher);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (currentVoucher) {
      const isValid = validateVoucherFields(
        currentVoucher.name,
        currentVoucher.discountValue,
        currentVoucher.isPercentage
      );
      if (!isValid) return;

      editVoucher(currentVoucher);
      setEditDialogOpen(false);
    }
  };

  const handleAddClick = () => {
    setNewVoucher({
      id: 0,
      name: "",
      isPercentage: true,
      discountValue: 0,
      isActive: true,
    });
    setAddDialogOpen(true);
  };

  const handleAddSave = () => {
    if (newVoucher) {
      const isValid = validateVoucherFields(
        newVoucher.name,
        newVoucher.discountValue,
        newVoucher.isPercentage
      );
      if (!isValid) return;

      addVoucher(newVoucher);
      setAddDialogOpen(false);
    }
  };

  return (
    <Box padding={2}>
      <Button
        variant="contained"
        onClick={handleAddClick}
        style={{ marginBottom: "16px" }}
      >
        Add Voucher
      </Button>
      <TableContainer
        sx={{
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#1976d2",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Type
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Discount Value
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Active
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vouchers.map((voucher, index) => (
              <TableRow
                key={voucher.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  "&:hover": {
                    backgroundColor: "#e0f7fa",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)", // Shadow on hover
                  },
                  transition: "box-shadow 0.3s ease-in-out", // Smooth shadow effect
                }}
              >
                <TableCell>{voucher.id}</TableCell>
                <TableCell>{voucher.name}</TableCell>
                <TableCell>
                  {voucher.isPercentage ? "Percentage" : "Flat Rate"}
                </TableCell>
                <TableCell>{voucher.discountValue}</TableCell>
                <TableCell>
                  <Switch
                    checked={voucher.isActive}
                    onChange={() => handleToggleActive(voucher.id)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleEditClick(voucher)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle fontWeight={600}>Edit Voucher</DialogTitle>
        <DialogContent>
          {currentVoucher && (
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                label="Name"
                value={currentVoucher.name}
                onChange={(e) =>
                  setCurrentVoucher({ ...currentVoucher, name: e.target.value })
                }
                fullWidth
                error={!!nameError}
                helperText={nameError}
              />
              <FormLabel>Type</FormLabel>
              <RadioGroup
                value={currentVoucher.isPercentage ? "percentage" : "flat"}
                onChange={(e) =>
                  setCurrentVoucher({
                    ...currentVoucher,
                    isPercentage: e.target.value === "percentage",
                  })
                }
              >
                <FormControlLabel
                  value="percentage"
                  control={<Radio />}
                  label="Percentage"
                />
                <FormControlLabel
                  value="flat"
                  control={<Radio />}
                  label="Flat Rate"
                />
              </RadioGroup>
              <TextField
                label="Discount Value"
                type="number"
                value={currentVoucher.discountValue}
                onChange={(e) =>
                  setCurrentVoucher({
                    ...currentVoucher,
                    discountValue: Number(e.target.value),
                  })
                }
                fullWidth
                error={!!valueError}
                helperText={valueError}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle fontWeight={600}>Add Voucher</DialogTitle>
        <DialogContent>
          {newVoucher && (
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                label="Name"
                value={newVoucher.name}
                onChange={(e) =>
                  setNewVoucher({ ...newVoucher, name: e.target.value })
                }
                fullWidth
                error={!!nameError}
                helperText={nameError}
              />
              <FormLabel>Type</FormLabel>
              <RadioGroup
                value={newVoucher.isPercentage ? "percentage" : "flat"}
                onChange={(e) =>
                  setNewVoucher({
                    ...newVoucher,
                    isPercentage: e.target.value === "percentage",
                  })
                }
              >
                <FormControlLabel
                  value="percentage"
                  control={<Radio />}
                  label="Percentage"
                />
                <FormControlLabel
                  value="flat"
                  control={<Radio />}
                  label="Flat Rate"
                />
              </RadioGroup>
              <TextField
                label="Discount Value"
                value={newVoucher.discountValue}
                onChange={(e) =>
                  setNewVoucher({
                    ...newVoucher,
                    discountValue: Number(e.target.value),
                  })
                }
                fullWidth
                error={!!valueError}
                helperText={valueError}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddSave}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VoucherPage;
