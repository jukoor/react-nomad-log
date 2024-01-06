import React, { useContext, useState } from "react";

type ValueProp = {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
};

type ContextProp = {
  children: React.ReactNode;
};

export const AppContext = React.createContext({} as ValueProp); //create the context API

//function body
export default function Context({ children }: ContextProp) {
  const [userId, setUserId] = useState<string>("");

  return (
    <AppContext.Provider value={{ userId, setUserId }}>
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = (): ValueProp => {
  return useContext(AppContext);
};
