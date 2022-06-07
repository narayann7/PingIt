import { createContext, useState, useContext } from "react";

export const HomeContext = createContext();

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  return context;
};

function HomeContextProvider(props) {
  const [user, setUser] = useState({});
  const [currentTab, setcurrentTab] = useState(0);
  const [stateIndex, setstateIndex] = useState(0);
  const [apiState, setapiState] = useState([
    "initial",
    "loading",
    "success",
    "error",
  ]);
  const values = {
    user,
    setUser,
    currentTab,
    setcurrentTab,
    stateIndex,
    setstateIndex,
    apiState,
    setapiState,
  };
  return (
    <HomeContext.Provider value={values}>{props.children}</HomeContext.Provider>
  );
}

export default HomeContextProvider;
