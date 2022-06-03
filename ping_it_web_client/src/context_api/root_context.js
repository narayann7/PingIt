import { createContext, useState, useContext } from "react";

export const RootContext = createContext();

export const useAuth = () => {
  const context = useContext(RootContext);
  return context;
};

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
