import { Avatar } from "@mui/material";
import React from "react";
import { BiSend } from "react-icons/bi";
import common_styles from "../../common_styles";
const CenterCard = common_styles.CenterCard;
const MyTextField = common_styles.MyTextField;

function SendMessage() {
  return (
    <CenterCard style={cardStyle}>
      <CenterCard style={cardStyle2}>
        <MyTextField
          style={{
            width: "50vw",
            margin: "30px",
          }}
          variant="filled"
          placeholder="Enter your message"
        />
        <Avatar
          style={{
            marginRight: "30px",
            backgroundColor: "#1a1a2b",
          }}
          className="add_friend"
        >
          <BiSend color="#d8a01f" />
        </Avatar>
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
