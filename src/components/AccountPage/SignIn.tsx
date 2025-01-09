import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  Stack,
  Link as MuiLink,
  Card as MuiCard,
  styled,
  Snackbar,
  Alert,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import ForgotPassword from "./ForgotPassword";
import Animation from "../Animation/BackgroundAnimation";
import { slideInFromLeft } from "../Animation/SlideAnimation";
import { Login } from "../../pages/AccountPage";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../zustand/useUserStore";
import avt from "../../assets/Users/1735619980418_91131bf3b61c0e42570d.jpg";

const Card = styled(MuiCard)(({ theme }) => ({
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  backgroundColor: "#f4f0e5",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 10px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const authTheme = createTheme({
  typography: {
    fontFamily: "Montserrat",
    fontWeightRegular: 550,
  },
});

export default function SignIn({ toggleLogin }: Login) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error", // Có thể là "success", "info", "warning", hoặc "error"
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailError || passwordError) {
      setSnackbar({
        open: true,
        message: "Please fix the highlighted errors before proceeding.",
        severity: "error",
      });
      return;
    }
    login({
      id: "1",
      email: "admin@gmail.com",
      name: "Admin",
      phoneNumber: "0985796809",
      birthday: "01/01/2004",
      address: "Viet Nam",
      image: avt,
    });
    navigate("/");
  };

  const validateEmail = () => {
    const email = document.getElementById("email") as HTMLInputElement;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      return false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
      return true;
    }
  };

  const validatePassword = () => {
    const password = document.getElementById("password") as HTMLInputElement;

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      return false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
      return true;
    }
  };

  const handleBlur = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    if (!email.value && !password.value) {
      setEmailError(false);
      setEmailErrorMessage("");
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
  };

  return (
    <ThemeProvider theme={authTheme}>
      <Box
        sx={{
          backgroundColor: "#c4a589",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            px: 10,
            width: "100%",
          }}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Animation type={1} />
          <Stack
            sx={{
              animation: `${slideInFromLeft} 0.5s ease-out`,
              minHeight: "100%",
              width: "100%",
              height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
            }}
            direction="column"
            justifyContent="space-between"
          >
            <Card variant="outlined">
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
              >
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                method="post"
                noValidate
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: 2,
                }}
              >
                <FormControl>
                  <TextField
                    onChange={validateEmail}
                    onBlur={handleBlur}
                    error={emailError}
                    helperText={emailErrorMessage}
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    required
                    fullWidth
                    color={emailError ? "error" : "primary"}
                    sx={{ ariaLabel: "email" }}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    onChange={validatePassword}
                    onBlur={handleBlur}
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    required
                    fullWidth
                    color={passwordError ? "error" : "primary"}
                  />
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    paddingTop={1}
                    gap={8}
                  >
                    <MuiLink
                      component="button"
                      type="button"
                      onClick={handleClickOpen}
                      variant="body2"
                    >
                      Forgot your password?
                    </MuiLink>
                  </Box>
                </FormControl>

                <ForgotPassword open={open} handleClose={handleClose} />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  data-testid="sign-in"
                >
                  Sign in
                </Button>
                <Box alignItems="center" display="flex" justifyContent="center">
                  <Typography sx={{ textAlign: "center" }}>
                    Don&apos;t have an account?
                  </Typography>
                  <Button
                    onClick={toggleLogin}
                    sx={{
                      fontSize: "15px",
                      fontStyle: "italic",
                      textTransform: "none",
                      color: "blue",
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      "&:hover": {
                        color: "darkblue",
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign up
                  </Button>
                </Box>
              </Box>
            </Card>
          </Stack>
        </Stack>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity as "error" | "success"}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
