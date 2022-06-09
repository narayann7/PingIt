import React, { useState, useEffect } from "react";
import common_styles from "../../common_styles";
import Message from "./message";
import { socket } from "../../../services/socket_services";
import { useHomeContext } from "../../../context_api/home_context";
import UserService from "../../../services/user";

const CenterCard = common_styles.CenterCard;
function ChatCenter() {
  const { messages, setMessages } = useHomeContext();

  useEffect(() => {
    var myEmail = UserService.getMeFromLocalStorage().user.email;
    socket.on("receive_message", (data) => {
      console.log("receive_message", data);
      var temp = data.messageData;

      const tempMessages = messages.concat({
        time: temp.time,
        isMe: myEmail === temp.email ? true : false,
        content: temp.text,
      });
      setMessages(tempMessages);
    });
  }, [messages, setMessages]);

  return (
    <CenterCard 
    
    style={cardSytle}>
      {messages.map((message, index) => {
        return <Message key={index} message={message} />;
      })}
    </CenterCard>
  );
}

export default ChatCenter;
const cardSytle = {
  width: "60vw",
  height: "70vh",
  overflowY: "scroll",
  
  scrollbarWidth: "thin",
  borderRadius: "0px",
  minWidth: "400px",
  minHeight: "400px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};
