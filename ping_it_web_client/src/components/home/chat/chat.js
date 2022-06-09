import React from "react";
import common_styles from "../../common_styles";
import Headers from "./header";
import ChatCenter from "./chat_center";
import SendMessage from "./send_message";

const CenterCard = common_styles.CenterCard;
function Chat() {
  return (
    <CenterCard style={cardStyle}>
      <Headers />
      <ChatCenter />
      <SendMessage />
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
  justifyContent: "start",
};
