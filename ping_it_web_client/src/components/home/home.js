import { React, useEffect, useState } from "react";
import Auth from "../../services/auth";
import common_styles from "../common_styles";
import { Route, Routes, useNavigate } from "react-router-dom";
import Chat from "./chat/chat";
import AllChats from "./all_chats";
import AppBar from "./app_bar";
import HomeContextProvider from "./../../context_api/home_context";
import AddFriend from "./add_friend";
import Profile from "./profile";
import Search from "./search";
import UserService from "../../services/user";
import ErrorHandler from "../../models/ErrorModel";
import { useHomeContext } from "../../context_api/home_context";
const BackgroundBox = common_styles.BackgroundBox;

function Home() {
  const navigate = useNavigate();
  const { setUser, currentTab } = useHomeContext();
  const [tabComponent, settabComponent] = useState([
    <AllChats />,
    <Profile />,
    <AddFriend />,
    <Search />,
  ]);

  useEffect(() => {
    UserService.getMe().then((result) => {
      if (result instanceof ErrorHandler) {
        navigate("/login");
      }
      UserService.setMeLocalStorage(result);
      setUser(result.user);
    });
  }, [navigate, setUser]);

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
        {tabComponent[currentTab]}
        {/* <Routes>
            <Route>
              <Route to="/home" element={<AllChats />} />
            </Route>
          </Routes> */}

        {/* <AllChats />
          <AddFriend />
          <Profile />
          <Search /> */}
      </div>
      <Chat />
    </BackgroundBox>
  );
}

export default Home;
// {
//   /* <div style={centerStyle}>
// <MyButton
//   onClick={() => {
//     Auth.deleteRefreshToken();
//     navigate("/login", { replace: true });
//   }}
//   style={{
//     backgroundColor: "#000000",
//     color: "#ffffff",
//     width: "15vw",
//   }}
// >
//   Logout
// </MyButton>
// </div> */
// }
