import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Avatar,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { changePassword } from "../../config/api";
import { useUserStore } from "../../zustand/useUserStore";

const ChangePasswordPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const { account } = useUserStore();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setSnackbarMessage("New password must be at least 6 characters long.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setSnackbarMessage("New password and confirm password do not match.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      const res = await changePassword(
        account.email,
        currentPassword,
        confirmPassword
      );
      const statusCode = (res as unknown as { statusCode: number }).statusCode;
      if (statusCode === 200) {
        setSnackbarMessage("Password changed successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        navigate("/info");
      } else {
        setSnackbarMessage("Current password is incorrect.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("An error occurred. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error(error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Paper elevation={10} sx={{ padding: 4, maxWidth: 400, width: "100%" }}>
        <Box textAlign="center">
          <Avatar sx={{ bgcolor: "secondary.main", margin: "auto", mb: 2 }}>
            <Lock />
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            Change Password
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Current Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="New Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Confirm New Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="warning"
            fullWidth
            sx={{ mt: 2 }}
          >
            Change Password
          </Button>
          <Link to="..">
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Back
            </Button>
          </Link>
        </form>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ChangePasswordPage;
