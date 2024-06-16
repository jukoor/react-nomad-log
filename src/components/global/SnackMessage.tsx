import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setSnackbarOptions } from "../../store/appSlice";

// Global Alert Message System, controlled by value in redux store
export const SnackMessage = () => {
  const snackbarOptions = useAppSelector((state) => state.App.snackbarOptions);
  const dispatch = useAppDispatch();

  const handleClose = (
    // @ts-ignore
    event: React.SyntheticEvent | Event,
    // @ts-ignore
    reason?: string
  ) => {
    dispatch(setSnackbarOptions({ open: false }));
  };

  return (
    <Snackbar
      open={snackbarOptions.open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarOptions.severity}
        sx={{
          width: "100%",
          border: "1px solid darkgreen",
          borderRadius: "8px",
        }}
      >
        {snackbarOptions.message}
      </Alert>
    </Snackbar>
  );
};
