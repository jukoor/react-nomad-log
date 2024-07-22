import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1f2937",
    },
    secondary: {
      main: "#ffc0cb",
    },
  },
  typography: {
    fontFamily: ["Raleway", '"Helvetica Neue"', "Arial", "sans-serif"].join(
      ","
    ),
  },
  components: {
    MuiCard: {
      defaultProps: {
        sx: {
          minWidth: 275,
          boxShadow: "0px 0px 20px 11px #00000012",
          borderRadius: "25px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px 0",
          backgroundColor: "#1f2937",
          boxShadow: "0 0 7px #00000069",
          fontWeight: "bold",
          color: "#ffc0cb",
          padding: "6px 20px",

          "&:hover": {
            backgroundColor: "#1f2937",
            color: "#ffffff",
          },
          "&.Mui-disabled": {
            color: "grey",
          },
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
