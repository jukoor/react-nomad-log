import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1f2937",
    },
    secondary: {
      main: "#f2a9ff",
    },
  },
  typography: {
    fontFamily: ["Raleway", '"Helvetica Neue"', "Arial", "sans-serif"].join(
      ","
    ),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: "10px 14px 8px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: " space-between",
        },
      },
    },
  },
});
