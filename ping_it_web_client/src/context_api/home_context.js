import { createContext, useState, useContext } from "react";

export const HomeContext = createContext();

export const useHome = () => {
  const context = useContext(HomeContext);
  return context;
};

function HomeContextProvider(props) {
  const values = {};
  return (
    <HomeContext.Provider value={values}>{props.children}</HomeContext.Provider>
  );
}

export default HomeContextProvider;
