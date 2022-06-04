import { createContext, useState, useContext } from "react";

export const RootContext = createContext();

export const useRoot = () => {
  const context = useContext(RootContext);
  return context;
};

const RootContextProvider = (props) => {
  const [switchKeys, setswitchKeys] = useState({
    isLoggedIn: false,
    otpReceived: false,
  });

  const value = {
    switchKeys,
    setswitchKeys,
  };
  return (
    <RootContext.Provider value={value}>{props.children}</RootContext.Provider>
  );
};

export default RootContextProvider;
