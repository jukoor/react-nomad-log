import { ReactNode } from "react";
import NavBar from "./components/NavBar";

type PageLayoutProps = {
  children: ReactNode;
};

export const PageLayout = ({ children }: PageLayoutProps) => (
  <div>
    <NavBar />
    {children}
  </div>
);
