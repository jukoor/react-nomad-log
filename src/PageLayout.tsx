import { ReactNode } from "react";
import NavBar from "./components/NavBar";
import { CountrySelectOverlay } from "./components/CountrySelectOverlay";

type PageLayoutProps = {
  children: ReactNode;
};

export const PageLayout = ({ children }: PageLayoutProps) => (
  <>
    <NavBar />
    {children}
    <CountrySelectOverlay />
  </>
);
