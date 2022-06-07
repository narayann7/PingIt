import { Avatar, CardMedia } from "@mui/material";
import { Box } from "@mui/system";
import { TiUserAddOutline } from "react-icons/ti";
import { BiSearchAlt, BiLogInCircle } from "react-icons/bi";
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import common_styles from "../common_styles";

import UserService from "../../services/user";
import Auth from "../../services/auth";
import { useHomeContext } from "../../context_api/home_context";
const CenterCard = common_styles.CenterCard;
const Text = common_styles.Text;

function AppBar() {
  const navigate = useNavigate();
  const { user } = useHomeContext();

  useEffect(() => {
    {
    }
  }, []);

  const logout = () => {
    Auth.deleteRefreshToken();
    UserService.deleteMeLocalStorage();
    navigate("/login", { replace: true });
  };
  return (
    <CenterCard style={cardStyle}>
      {Heading}

      <Avatar
        style={{
          backgroundColor: "#1a1a2b",
        }}
        alt="user"
      >
        <CardMedia component="img" image={user.displayPictureUrl} />
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
        className="logout"
        onClick={logout}
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
