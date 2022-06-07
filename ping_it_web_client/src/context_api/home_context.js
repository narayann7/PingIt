import { createContext, useState, useContext } from "react";

export const HomeContext = createContext();

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  return context;
};

function HomeContextProvider(props) {
  const [user, setUser] = useState({});
  const values = {
    user,
    setUser,
  };
  return (
    <HomeContext.Provider value={values}>{props.children}</HomeContext.Provider>
  );
}

export default HomeContextProvider;
