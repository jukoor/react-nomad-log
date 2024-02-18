import { Alert, AlertColor, Snackbar } from "@mui/material";
import { FC } from "react";

export type SnackMessageProps = {
  message: string;
  severity: AlertColor;
};

export const SnackMessage: FC<SnackMessageProps> = ({ message, severity }) => {
  const handleClose = (
    // @ts-ignore
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <Snackbar
      open={message !== ""}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
