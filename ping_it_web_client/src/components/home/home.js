import React from "react";
import Auth from "../../services/auth";
import common_styles from "../common_styles";
import { useNavigate } from "react-router-dom";
import Chat from "./chat";
import AllChats from "./all_chats";
import AppBar from "./app_bar";
const BackgroundBox = common_styles.BackgroundBox;

const centerStyle = common_styles.centerStyle;
const MyButton = common_styles.MyButton;
function Home() {
  const navigate = useNavigate();
  return (
    <BackgroundBox
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div>
        <AppBar />
        <AllChats />
      </div>
      <Chat />
    </BackgroundBox>
  );
}

export default Home;
{
  /* <div style={centerStyle}>
<MyButton
  onClick={() => {
    Auth.deleteRefreshToken();
    navigate("/login", { replace: true });
  }}
  style={{
    backgroundColor: "#000000",
    color: "#ffffff",
    width: "15vw",
  }}
>
  Logout
</MyButton>
</div> */
}
