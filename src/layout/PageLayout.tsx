import { ReactNode } from "react";
import { NavBar } from "./NavBar";
import { CountrySelectOverlay } from "../components/CountrySelectOverlay";
import { SidebarMenu } from "./SidebarMenu";

type PageLayoutProps = {
  children: ReactNode;
};

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <SidebarMenu />
      {children}
      <CountrySelectOverlay />
    </>
  );
};
