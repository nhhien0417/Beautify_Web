import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Avatar,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useUserStore } from "../../zustand/useUserStore";
import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  maxWidth: 900,
  margin: "auto",
  borderRadius: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.8),
  fontSize: "1.1rem",
  textTransform: "none",
  background: "#FF6B6B",
  color: "white",
  ":hover": {
    background: "#FF4040",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  background: "#F7F7F7",
  borderRadius: theme.spacing(1),
}));

const EditProfile = () => {
  const { account } = useUserStore();

  const [formData, setFormData] = useState<{
    name: string;
    phoneNumber: string;
    birthday: Dayjs | null;
    address: string;
    image: File | string;
    preview: string | null;
  } | null>(null);

  const [isChanged, setIsChanged] = useState(false); // Track changes
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  useEffect(() => {
    setTimeout(() => {
      setFormData({
        name: account.name || "",
        phoneNumber: account.phoneNumber || "",
        birthday: dayjs(account.birthday),
        address: account.address || "",
        image: account.image || "",
        preview: `${account.image}` || null,
      });
    }, 500);
  }, [account]);

  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("changepassword")) {
      setIsChangingPassword(false);
    }
  }, [location.pathname]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const phoneRegex = /^[0-9]*$/;
      if (!phoneRegex.test(value)) {
        return;
      }
    }

    setFormData((prev) => {
      const newFormData = { ...prev!, [name]: value };
      setIsChanged(
        JSON.stringify(newFormData) !==
          JSON.stringify({
            ...account,
            birthday: dayjs(account.birthday),
            preview: `${account.image}`,
          })
      );
      return newFormData;
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => {
        const newFormData = {
          ...prev!,
          image: file,
          preview: URL.createObjectURL(file),
        };
        setIsChanged(true);
        return newFormData;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData!.phoneNumber.length !== 10) {
      setSnackbar({
        open: true,
        message: "The phone number must have exactly 10 digits.",
        severity: "error",
      });
      return;
    }

    setSnackbar({
      open: true,
      message: "Profile updated successfully!",
      severity: "success",
    });
    setIsChanged(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const [isChangingPassword, setIsChangingPassword] = useState(false);

  return (
    <Box padding={3}>
      {!isChangingPassword ? (
        <Container>
          {formData ? (
            <Box>
              <Box textAlign="center" mb={2}>
                <Box position="relative" display="inline-block">
                  <Avatar
                    sx={{ width: 150, height: 150, margin: "auto" }}
                    src={formData.preview || `${account.image}`}
                  />
                  <IconButton
                    component="label"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      bgcolor: "#FF6B6B",
                      color: "white",
                      ":hover": { bgcolor: "#FF4040" },
                      boxShadow: 1,
                    }}
                  >
                    <PhotoCamera />
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleAvatarChange}
                    />
                  </IconButton>
                </Box>
                <Typography variant="h5" component="h1" mt={3} fontWeight={600}>
                  Edit Profile
                </Typography>
              </Box>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <StyledTextField
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Birthday"
                        value={formData.birthday}
                        onChange={(newValue) => {
                          setFormData((prev) => {
                            const newFormData = {
                              ...prev!,
                              birthday: newValue,
                            };
                            setIsChanged(
                              JSON.stringify(newFormData) !==
                                JSON.stringify({
                                  ...account,
                                  birthday: dayjs(account.birthday),
                                  preview: `${account.image}`,
                                })
                            );
                            return newFormData;
                          });
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            variant: "outlined",
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      label="Phone Number"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      fullWidth
                      required
                      variant="outlined"
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    {isChanged && (
                      <StyledButton
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ maxWidth: 200, margin: "auto" }}
                      >
                        Save
                      </StyledButton>
                    )}
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <Link to="changepassword">
                      <Button
                        variant="outlined"
                        color="warning"
                        fullWidth
                        sx={{ mt: 2, maxWidth: 200, margin: "auto" }}
                        onClick={() => setIsChangingPassword(true)}
                      >
                        Change Password
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100vh"
            >
              <CircularProgress />
            </Box>
          )}
        </Container>
      ) : (
        <Outlet />
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditProfile;
