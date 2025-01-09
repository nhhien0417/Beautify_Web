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
import { createUserAdmin, getAllRolesActive } from "../../../config/api";

interface Role {
  id: number;
  name: string;
}

const NewUserForm = ({ open, onClose, onAdded }: any) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };
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
    const { name, email, role, password } = formData;

    if (!name || !email || !role || !password) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        severity: "error",
      });
      return;
    }

    // Kiểm tra tính hợp lệ của email
    if (!isValidEmail(email)) {
      setSnackbar({
        open: true,
        message: "Please enter a valid email address.",
        severity: "error",
      });
      return;
    }

    try {
      const res = await createUserAdmin(name, email, password, role);

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
          message: "User created successfully!",
          severity: "success",
        });
        setFormData({ name: "", email: "", role: "", password: "" });
        onClose();

        if (onAdded) {
          onAdded(); // Fetch lại danh sách sản phẩm
        }
      }
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle fontWeight={600}>Add New User</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} width="300px" mt={1}>
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
          <TextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            fullWidth
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add User
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

export default NewUserForm;
