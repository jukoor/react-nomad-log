import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import CachedIcon from "@mui/icons-material/Cached";
import { fetchAllCountriesData } from "../../services/fetchCountryDataApiCall";

export const ApiErrorOverlay = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiError = useAppSelector((state) => state.Country.apiError);
  const dispatch = useAppDispatch();

  // Show Error Dialog when Api Fetch Error happens
  useEffect(() => {
    setOpen(apiError);
  }, [apiError]);

  // refetch country data from api
  const reFetchCountryDataFromApi = async () => {
    // disable click intervals of 5sec & lower
    setLoading(true);

    dispatch(fetchAllCountriesData());
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setLoading(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle id="apiError">{"Oops!"}</DialogTitle>
      <DialogContent>
        <Alert
          component={"span"}
          variant="filled"
          severity="error"
          sx={{ mt: 2.5 }}
        >
          Looks like we can't fetch the required country data.
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading}
          onClick={reFetchCountryDataFromApi}
          type="submit"
          endIcon={loading ? <CircularProgress size={24} /> : <CachedIcon />}
        >
          {loading ? "Loading..." : "Retry"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
