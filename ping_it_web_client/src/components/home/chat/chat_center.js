import React from "react";
import common_styles from "../../common_styles";
import Message from "./message";

const CenterCard = common_styles.CenterCard;
function ChatCenter() {
  return (
    <CenterCard style={cardSytle}>
      <Message />
    </CenterCard>
  );
}

export default ChatCenter;
const cardSytle = {
  width: "60vw",
  height: "70vh",
  borderRadius: "0px",
  minWidth: "400px",
  minHeight: "400px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};
