import { ReactNode } from "react";
import { NavBar } from "./NavBar.tsx";
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
    </>
  );
};
