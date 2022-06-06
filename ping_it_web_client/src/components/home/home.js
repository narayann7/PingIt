import React from "react";
import Auth from "../../services/auth";
import common_styles from "../common_styles";
import { useNavigate } from "react-router-dom";
import Chat from "./chat";
import AllChats from "./all_chats";
import AppBar from "./app_bar";
import HomeContextProvider from "./../../context_api/home_context";
const BackgroundBox = common_styles.BackgroundBox;

function Home() {
  const navigate = useNavigate();
  return (
    <HomeContextProvider>
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
    </HomeContextProvider>
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
