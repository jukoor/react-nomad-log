import { ReactNode } from "react";
import NavBar from "./components/NavBar";
import { CountrySelectOverlay } from "./components/CountrySelectOverlay";
import { Box, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { CountryData } from "./store/countrySlice";

type PageLayoutProps = {
  children: ReactNode;
};

interface CountryState {
  Country: CountryData;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const loading = useSelector((state: CountryState) => state.Country.loading);

  return (
    <>
      <NavBar />
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {children}
      <CountrySelectOverlay />
    </>
  );
};
