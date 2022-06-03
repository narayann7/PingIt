import React from "react";
import Auth from "../../services/auth";
import common_styles from "../common_styles";
import { useNavigate } from "react-router-dom";
const centerStyle = common_styles.centerStyle;
const MyButton = common_styles.MyButton;
function Home() {
  const navigate = useNavigate();
  return (
    <div style={centerStyle}>
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
    </div>
  );
}

export default Home;
