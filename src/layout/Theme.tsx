import { createTheme } from "@mui/material";

export const theme = createTheme({
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
  },
});
