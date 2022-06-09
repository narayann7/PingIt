import { React, useEffect } from "react";
import common_styles from "../../common_styles";
import Headers from "./header";
import ChatCenter from "./chat_center";
import SendMessage from "./send_message";
import { useHomeContext } from "../../../context_api/home_context";
import helloGif from "../../../assets/images/hello.gif";
import UserService from "../../../services/user";
import { socket } from "../../../services/socket_services";
const CenterCard = common_styles.CenterCard;
const Text = common_styles.Text;
function sortString(str) {
  var arr = str.split("");
  var tmp;
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      /* if ASCII code greater then swap the elements position*/
      if (arr[i] > arr[j]) {
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
    }
  }
  return arr.join("");
}

function Chat() {
  const { setcurrentRoomId, currentChat } = useHomeContext();

  useEffect(() => {
    if (currentChat) {
      var roomid = currentChat?._id;
      var roomid2 = UserService.getMeFromLocalStorage()?.user._id;
      roomid = roomid + roomid2;
      roomid = sortString(roomid);
      setcurrentRoomId(roomid);
      socket.emit("join_room", { roomid });
    }
  }, [currentChat, setcurrentRoomId]);
  return (
    <CenterCard style={cardStyle}>
      {!currentChat ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img style={{}} src={helloGif} alt="loading..." />
          <Text fontSize={20}>
            Now you can chat with your friends and family.
          </Text>
        </div>
      ) : (
        <>
          <Headers
            displayPictureUrl={currentChat.displayPictureUrl}
            name={currentChat.username}
          />
          <ChatCenter />
          <SendMessage />
        </>
      )}
    </CenterCard>
  );
}

export default Chat;
const cardStyle = {
  width: "60vw",
  height: "90vh",
  margin: "50px",
  minWidth: "300px",
  minHeight: "300px",
  border: "2px  solid #1a1a2b",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};
