import { ReactNode } from "react";
import { NavBar } from "./NavBar.tsx";
import { SidebarMenu } from "./SidebarMenu";
import { CountryDetailsOverlay } from "../components/global/CountryDetailsOverlay.tsx";
import { SnackMessage } from "../components/global/SnackMessage.tsx";

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
