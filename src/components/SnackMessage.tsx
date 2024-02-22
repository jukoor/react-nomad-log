import { Alert, AlertColor, Snackbar } from "@mui/material";
import { FC } from "react";

export type SnackMessageProps = {
  message: string;
  severity: AlertColor;
  open: boolean;
  onClose: () => void;
};

export const SnackMessage: FC<SnackMessageProps> = ({
  message,
  severity,
  open,
  onClose,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
