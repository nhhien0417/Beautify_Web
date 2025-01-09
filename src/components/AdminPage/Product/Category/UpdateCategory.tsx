import { useState, useEffect } from "react";
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
import { updateCategoryAdmin } from "../../../../config/api";

const UpdateCategory = ({
  open,
  onClose,
  category,
  onCategoryUpdated,
}: any) => {
  const [updatedName, setUpdatedName] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (category) {
      setUpdatedName(category.name);
    }
  }, [category]);

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const handleUpdate = async () => {
    if (!updatedName) {
      setSnackbar({
        open: true,
        message: "Please fill in the category name.",
        severity: "error",
      });
      return;
    }

    try {
      const res = await updateCategoryAdmin(category.id, updatedName);
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
        if (onCategoryUpdated) {
          onCategoryUpdated();
        }
        onClose();
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error updating category. Please try again.",
        severity: "error",
      });

      console.error("Error updating category:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight={600}>Update Category</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
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
        <Button onClick={handleUpdate} variant="contained" color="primary">
          Update
        </Button>
      </DialogActions>
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
    </Dialog>
  );
};

export default UpdateCategory;
