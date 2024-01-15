import React, { ReactNode, createContext, useContext } from "react";

type ContextProviderProps = {
  children: ReactNode;
};
// Create a Context
const Context = createContext(null);

// Create a Provider Component
export const ContextProvider = ({ children }: ContextProviderProps) => {
  const future = "some value";
  return (
    //  <Context.Provider value={future}>
    //    {children}
    //  </Context.Provider>
    <div></div>
  );
};
