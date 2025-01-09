import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import { updateUserAdmin, getAllRolesActive } from "../../../config/api";

interface Role {
  id: number;
  name: string;
}
const UpdateUserForm = ({ open, onClose, user, onUpdated }: any) => {
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" hoặc "error"
  });

  useEffect(() => {
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email || "",
      role: user.role,
    });
  }, [user]);

  const [roles, setRoles] = useState<Role[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const fetchRoles = async () => {
    try {
      const response = await getAllRolesActive(1, 100);
      const rolesData = response.data?.result || [];
      setRoles(rolesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleSubmit = async () => {
    const { id, name, email, role } = formData;

    if (!name || !email || !role) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields and upload image.",
        severity: "error",
      });
      return;
    }

    if (!isValidEmail(email)) {
      setSnackbar({
        open: true,
        message: "Please enter a valid email address.",
        severity: "error",
      });
      return;
    }

    try {
      const res = await updateUserAdmin(+id, name, email, role);

      const statusCode = (res as unknown as { statusCode: number }).statusCode;
      if (statusCode === 400) {
        setSnackbar({
          open: true,
          message: "User already exists.",
          severity: "error",
        });
      } else if (statusCode === 200) {
        setSnackbar({
          open: true,
          message: "User updated successfully!",
          severity: "success",
        });
        setFormData({ id: "", name: "", email: "", role: "" });
        onClose();

        if (onUpdated) {
          onUpdated();
        }
      }
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle fontWeight={600}>Update User</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={3} width="300px" mt={1}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            select
            fullWidth
            required
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.name}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Update
        </Button>
      </DialogActions>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity as any}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default UpdateUserForm;
