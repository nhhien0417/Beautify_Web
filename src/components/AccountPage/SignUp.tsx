import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
  styled,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import Animation from "../Animation/BackgroundAnimation";
import { slideInFromRight } from "../Animation/SlideAnimation";
import { Login } from "../../pages/AccountPage";
import { useNavigate } from "react-router-dom";

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

export default function SignUp({ toggleLogin }: Login) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" hoặc "error"
  });

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] =
    useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const navigate = useNavigate();
  const validateEmail = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }
  };

  const validatePassword = () => {
    const password = document.getElementById("password") as HTMLInputElement;
    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
  };

  const validateName = () => {
    const name = document.getElementById("name") as HTMLInputElement;
    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }
  };

  const validatePasswordConfirm = () => {
    const password = document.getElementById("password") as HTMLInputElement;
    const passwordConfirm = document.getElementById(
      "password-confirm"
    ) as HTMLInputElement;
    if (!passwordConfirm.value || passwordConfirm.value !== password.value) {
      setPasswordConfirmError(true);
      setPasswordConfirmErrorMessage(
        "Passwords do not match. Please try again."
      );
    } else {
      setPasswordConfirmError(false);
      setPasswordConfirmErrorMessage("");
    }
  };

  const handleBlur = () => {
    const name = document.getElementById("name") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const passwordConfirm = document.getElementById(
      "password-confirm"
    ) as HTMLInputElement;

    if (
      !email.value &&
      !password.value &&
      !name.value &&
      !passwordConfirm.value
    ) {
      setNameError(false);
      setNameErrorMessage("");
      setEmailError(false);
      setEmailErrorMessage("");
      setPasswordError(false);
      setPasswordErrorMessage("");
      setPasswordConfirmError(false);
      setPasswordConfirmErrorMessage("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nameError || emailError || passwordError || passwordConfirmError) {
      return;
    }

    setSnackbar({
      open: true,
      message: "Sign-up successful! Redirecting to Sign In...",
      severity: "success",
    });
    setTimeout(() => {
      navigate("/auth");
      toggleLogin();
    }, 2000);
  };

  return (
    <ThemeProvider theme={authTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#c4a589",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          sx={{
            animation: `${slideInFromRight} 0.5s ease-out`,
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
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              method="post"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl>
                <TextField
                  onChange={validateName}
                  onBlur={handleBlur}
                  name="name"
                  required
                  id="name"
                  label="Full name"
                  error={nameError}
                  helperText={nameErrorMessage}
                  color={nameError ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <TextField
                  onChange={validateEmail}
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  onBlur={handleBlur}
                  name="email"
                  error={emailError}
                  helperText={emailErrorMessage}
                  color={emailError ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <TextField
                  data-testid="password"
                  onChange={validatePassword}
                  onBlur={handleBlur}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <TextField
                  data-testid="passwordconfirm"
                  onChange={validatePasswordConfirm}
                  onBlur={handleBlur}
                  required
                  fullWidth
                  name="password-confirm"
                  label="Confirm"
                  type="password"
                  id="password-confirm"
                  error={passwordConfirmError}
                  helperText={passwordConfirmErrorMessage}
                  color={passwordConfirmError ? "error" : "primary"}
                />
              </FormControl>
              <Button type="submit" fullWidth variant="contained">
                Sign up
              </Button>
              <Box alignItems="center" display="flex" justifyContent="center">
                <Typography sx={{ textAlign: "center" }}>
                  Already have an account?
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
                  Sign in
                </Button>
              </Box>
            </Box>
          </Card>
        </Stack>
        <Animation type={2} />
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
      </Box>
    </ThemeProvider>
  );
}
