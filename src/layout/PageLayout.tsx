import { ReactNode } from "react";
import { NavBar } from "./NavBar";
import { CountrySelectOverlay } from "../components/CountrySelectOverlay";
import { SidebarMenu } from "./SidebarMenu";
import { CountryDetailsOverlay } from "../components/CountryDetailsOverlay";
import { SnackMessage } from "../components/SnackMessage";

type PageLayoutProps = {
  children: ReactNode;
};

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <SidebarMenu />
      {children}
      <CountryDetailsOverlay />
      <SnackMessage />
      {/* <CountrySelectOverlay /> */}
    </>
  );
};
