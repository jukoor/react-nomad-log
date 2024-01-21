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
import { useEffect } from "react";
import { CountryList } from "./CountryList";
import { useDispatch, useSelector } from "react-redux";
import { setCountrySelectDialogOpen } from "../store/appSlice";

interface DialogState {
  App: {
    countrySelectDialogIsOpen: boolean;
  };
}

export const CountrySelectOverlay = () => {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(
    (state: DialogState) => state.App.countrySelectDialogIsOpen
  );

  useEffect(() => {
    console.log(isDialogOpen);
  }, [isDialogOpen]);

  const toggleDrawer = (open: boolean) => {};

  const handleClickOpen = () => {
    dispatch(setCountrySelectDialogOpen(true));
  };

  const handleClose = () => {
    dispatch(setCountrySelectDialogOpen(false));
  };

  return (
    <div className={styles.countrySelectOverlay}>
      {isDialogOpen && (
        <Dialog
          fullWidth={true}
          maxWidth={"lg"}
          open={true}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: "95vw",
              maxWidth: "80%",
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
              Search and select all the countries you have already visited or
              want to visit.
            </Typography>

            <div
              style={{ overflowY: "scroll", maxHeight: "calc(90vh - 64px)" }}
            >
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
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};
