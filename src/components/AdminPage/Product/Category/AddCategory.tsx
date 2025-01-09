import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import ShortTextIcon from "@mui/icons-material/ShortText";
import { createCategoryAdmin } from "../../../../config/api";

const AddNewCategory = ({ open, onClose, onCategoryAdded }: any) => {
  const [newCategory, setNewCategory] = useState({ name: "" });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // or "error"
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseAddNewCategory = () => {
    setNewCategory({
      name: "",
    });
    onClose();
  };

  const handleAdd = async () => {
    if (!newCategory.name) {
      setSnackbar({
        open: true,
        message: "Please fill in the category name.",
        severity: "error",
      });
      return;
    }

    try {
      const res = await createCategoryAdmin(newCategory.name);

      const statusCode = (res as unknown as { statusCode: number }).statusCode;
      if (statusCode === 400) {
        setSnackbar({
          open: true,
          message: "Category already exists.",
          severity: "error",
        });
      } else if (statusCode === 200) {
        setSnackbar({
          open: true,
          message: "Category created successfully!",
          severity: "success",
        });
        handleCloseAddNewCategory();
        if (onCategoryAdded) {
          onCategoryAdded();
        }
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle fontWeight={600}>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={newCategory.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ShortTextIcon />
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity as "success" | "error"}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddNewCategory;
