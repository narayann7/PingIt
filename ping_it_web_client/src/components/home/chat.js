import React from "react";
import common_styles from "../common_styles";
const CenterCard = common_styles.CenterCard;
function Chat() {
  return (
    <CenterCard
      style={{
        width: "60vw",
        height: "90vh",
        margin: "50px",
        minWidth: "500px",
        minHeight: "500px",
      }}
    ></CenterCard>
  );
}

export default Chat;
