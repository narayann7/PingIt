import { createContext, useState } from "react";

export const RootContext = createContext();

const RootContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const value = {
    isAuthenticated,
    setIsAuthenticated,
  };
  return (
    <RootContext.Provider value={value}>{props.children}</RootContext.Provider>
  );
};

export default RootContextProvider;
