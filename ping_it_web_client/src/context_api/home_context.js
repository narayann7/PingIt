import { createContext, useState, useContext } from "react";
import { socket } from "../services/socket_services";
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
  const addUser = (userx) => {
    var roomid = userx._id;
    socket.emit("join_room", { roomid });
    socket.emit("add_user", { user, roomid });
  };
  const values = {
    user,
    setUser,
    currentTab,
    setcurrentTab,
    stateIndex,
    setstateIndex,
    apiState,
    setapiState,
    addUser,
  };
  return (
    <HomeContext.Provider value={values}>{props.children}</HomeContext.Provider>
  );
}

export default HomeContextProvider;
