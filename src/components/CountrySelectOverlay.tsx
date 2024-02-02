import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import styles from "../styles/CountrySelectOverlay.module.scss";
import { CountryList } from "./CountryList";
import { setCountrySelectDialogOpen } from "../store/appSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

interface DialogState {
  App: {
    countrySelectDialogIsOpen: boolean;
  };
}

export const CountrySelectOverlay = () => {
  const dispatch = useAppDispatch();
  const isDialogOpen = useAppSelector(
    (state) => state.App.countrySelectDialogIsOpen
  );

  const toggleDrawer = (open: boolean) => {};

  const handleClickOpen = () => {
    dispatch(setCountrySelectDialogOpen(true));
  };

  const handleClose = () => {
    dispatch(setCountrySelectDialogOpen(false));
  };

  return (
    <div className={styles.countrySelectOverlay}>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={isDialogOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "95vw",
            height: "95vh",
          },
        }}
      >
        <DialogTitle>
          Country Finder
          <IconButton
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Search and select all the countries you have already visited or want
            to visit.
          </Typography>

          <div style={{ overflowY: "scroll", maxHeight: "calc(90vh - 64px)" }}>
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                m: "auto",
                width: "100%",
              }}
            >
              <CountryList />
            </Box>
          </div>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button>Close</Button>
          <Button variant="contained" color="success" onClick={handleClose}>
            Add 7 Countries
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
