import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { setSnackbarOptions } from "../store/appSlice";

export const SnackMessage = () => {
  const snackbarOptions = useAppSelector((state) => state.App.snackbarOptions);
  const dispatch = useAppDispatch();

  const handleClose = (
    // @ts-ignore
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setTimeout(() => {
      dispatch(setSnackbarOptions({ message: "", severity: "success" }));
    }, 750);

    if (reason === "clickaway") {
      setTimeout(() => {
        dispatch(setSnackbarOptions({ message: "", severity: "success" }));
      }, 750);
      return;
    }
  };

  return (
    <Snackbar
      open={!!snackbarOptions.message}
      // autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarOptions.severity}
        // variant="outlined"
        sx={{ width: "100%" }}
      >
        {snackbarOptions.message}
      </Alert>
    </Snackbar>
  );
};
