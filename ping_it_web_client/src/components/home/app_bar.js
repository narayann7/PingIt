import { Avatar, CardMedia } from "@mui/material";
import { Box } from "@mui/system";
import { TiUserAddOutline } from "react-icons/ti";
import { BiSearchAlt, BiLogInCircle } from "react-icons/bi";
import React from "react";
import { Routes,Route } from "react-router-dom";
import common_styles from "../common_styles";
const CenterCard = common_styles.CenterCard;
const Text = common_styles.Text;

function AppBar() {
  var avatar =
    "data:image/jpeg;base64,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";
  var avatar2 =
    "https://lh3.googleusercontent.com/a-/AOh14Gi0L0DN7mqtaVCGXwnJdzMIdjq0CY7RkJDtKiTm1A=s96-c";

  return (
    <CenterCard style={cardStyle}>
      
      {Heading}

      <Avatar
        style={{
          backgroundColor: "#1a1a2b",
        }}
      >
        <CardMedia component="img" image={avatar2} />
      </Avatar>
      <Avatar
        style={{
          backgroundColor: "#030e21",
        }}
      >
        <TiUserAddOutline color="#d8a01f" />
      </Avatar>
      <Avatar
        style={{
          backgroundColor: "#030e21",
        }}
      >
        <BiSearchAlt color="#d8a01f" />
      </Avatar>
      <Avatar
        style={{
          backgroundColor: "#030e21",
        }}
      >
        <BiLogInCircle color="#d8a01f" />
      </Avatar>
    </CenterCard>
  );
}

export default AppBar;

//------------------- static componets -------------------
const Heading = (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
    }}
  >
    <Text
      sx={{
        fontSize: "1.8rem",
      }}
    >
      Ping
    </Text>
    <Text
      sx={{
        fontSize: "1.8rem",
        color: "#d8a01f",
      }}
    >
      It
    </Text>
  </div>
);

const cardStyle = {
  width: "30vw",
  height: "10vh",
  marginLeft: "40px",
  marginTop: "30px",
  minWidth: "250px",
  minHeight: "60px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
};
