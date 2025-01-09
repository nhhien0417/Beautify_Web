import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.tsx";
import ScrollButton from "./components/Scroll/ScrollButton.tsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#BAB5AC",
      light: "#FBFCD4",
      dark: "#1A1A19",
    },
    secondary: {
      main: "#212A18",
      light: "#fffff7",
    },
    warning: {
      main: "#001A6E",
    },
    background: {
      default: "#D9D3C8 ",
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontWeightRegular: "500",
  },
  components: {
    MuiPopover: {
      defaultProps: {
        disableScrollLock: true,
      },
    },
    MuiModal: {
      defaultProps: {
        disableScrollLock: true,
      },
    },
    MuiDialog: {
      defaultProps: {
        disableScrollLock: true,
      },
    },
    MuiDrawer: {
      defaultProps: {
        disableScrollLock: true,
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <ScrollButton />
    </ThemeProvider>
  </StrictMode>
);
