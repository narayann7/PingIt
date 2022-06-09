import { createContext, useState, useContext } from "react";
import { socket } from "../services/socket_services";
export const HomeContext = createContext();

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  return context;
};
const getCurrentTime = () => {
  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
};
function HomeContextProvider(props) {
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);

  const [userFriends, setuserFriends] = useState([]);
  const [currentChat, setcurrentChat] = useState(null);
  const [currentRoomId, setcurrentRoomId] = useState();

  const addFriend = (friend) => {
    let temp = userFriends;
    temp.push(friend);
    setuserFriends(temp);
  };

  const sendMessage = ({ message, roomId }) => {
    let temp = {
      time: getCurrentTime,
      soketid: socket.id,
      text: message,
    };
    socket.emit("sendMessage", { message: temp, roomId });
  };

  const [currentTab, setcurrentTab] = useState(0);
  const [stateIndex, setstateIndex] = useState(0);
  const [apiState, setapiState] = useState([
    "initial",
    "loading",
    "success",
    "error",
  ]);
  // const addUser = (userx) => {
  //   var roomid = userx._id;
  //   socket.emit("join_room", { roomid });
  //   socket.emit("add_user", { user, roomid });
  // };
  const values = {
    user,
    setUser,
    currentTab,
    setcurrentTab,
    stateIndex,
    setstateIndex,
    apiState,
    setapiState,
    // addUser,
    userFriends,
    addFriend,
    setuserFriends,
    currentChat,
    setcurrentChat,
    currentRoomId,
    setcurrentRoomId,
    sendMessage,
    messages,
    setMessages,
  };
  return (
    <HomeContext.Provider value={values}>{props.children}</HomeContext.Provider>
  );
}

export default HomeContextProvider;
