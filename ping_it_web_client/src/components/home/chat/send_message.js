import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import common_styles from "../../common_styles";
import { useHomeContext } from "../../../context_api/home_context";
import { socket } from "../../../services/socket_services";
import UserService from "../../../services/user";
const CenterCard = common_styles.CenterCard;
const MyTextField = common_styles.MyTextField;

function SendMessage() {
  const [message, setmessage] = useState("");
  const { currentRoomId,messages, setMessages } = useHomeContext();

  const handleChangeMesage = (e) => {
    e.preventDefault();
    setmessage(e.target.value);
  };
  return (
    <CenterCard style={cardStyle}>
      <CenterCard style={cardStyle2}>
        <MyTextField
          onChange={handleChangeMesage}
          value={message}
          style={{
            width: "50vw",
            margin: "30px",
          }}
          variant="filled"
          placeholder="Enter your message"
        />
        <div
          onClick={() => {
            var time = getCurrentTime();
            var email = UserService.getMeFromLocalStorage().user.email;
            let temp = {
              time,
              email,
              text: message,
            };
            const tempMessages = messages.concat({
              time: temp.time,
              isMe: true,
              content: temp.text,
            });
            socket.emit("send_message", {
              messageData: temp,
              roomid: currentRoomId,
            });
            setMessages(tempMessages);
          }}
        >
          <Avatar
            style={{
              marginRight: "30px",
              backgroundColor: "#1a1a2b",
            }}
            className="add_friend"
          >
            <BiSend color="#d8a01f" />
          </Avatar>
        </div>
      </CenterCard>
    </CenterCard>
  );
}

export default SendMessage;
const cardStyle = {
  width: "62vw",
  height: "15vh",
  minWidth: "500px",
  minHeight: "60px",
  flexDirection: "row",
  display: "flex",

  justifyContent: "space-between",
};
const cardStyle2 = {
  width: "60vw",
  height: "10vh",
  minWidth: "500px",
  minHeight: "60px",
  flexDirection: "row",
  display: "flex",
  backgroundColor: "#030e21",
  margin: "50px",
  borderRadius: "50px",
};
const getCurrentTime = () => {
  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
};
