import { ReactNode } from "react";
import { NavBar } from "./NavBar.tsx";
import { SidebarMenu } from "./SidebarMenu";
import { CountryDetailsOverlay } from "../components/global/CountryDetailsOverlay.tsx";
import { SnackMessage } from "../components/global/SnackMessage.tsx";
import { ApiErrorOverlay } from "../components/global/ApiErrorOverlay.tsx";
import { useCheckAuth } from "../hooks/useCheckAuth.tsx";
import { useFetchCountryDataFromApi } from "../hooks/useFetchCountryDataFromApi.tsx";
import { useFetchUserData } from "../hooks/useFetchUserdata.tsx";

type PageLayoutProps = {
  children: ReactNode;
};

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  // Check if User is authenticated
  useCheckAuth();

  // Fetch  country data from API
  useFetchCountryDataFromApi();

  // Fetch user data from Firestore DB
  useFetchUserData();

  return (
    <>
      <NavBar />
      <SidebarMenu />
      {children}
      <CountryDetailsOverlay />
      <SnackMessage />
      <ApiErrorOverlay />
    </>
  );
};
