import { React, useState } from "react";
import "./styles";
import common_styles from "../common_styles";
import styles from "./styles";
import { Box } from "@mui/material";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isVisibile, setIsVisibile] = useState(false);
  const toggleVisibility = () => {
    setIsVisibile(!isVisibile);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  return (
    <BackgroundBox>
      <CenterCard>
        <Box display="flex" flexDirection="Row" alignItems="flex-end">
          <Text fontSize={"6vh"} marginTop={"5vh"}>
            Log in
          </Text>
          <div style={yellowDot}></div>
        </Box>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MyTextFieldBg>
            <MyTextField
              variant="filled"
              placeholder="Enter your email"
              onChange={handleChangeEmail}
              value={email}
            ></MyTextField>
            <HiOutlineMail size={25} style={iconProp}></HiOutlineMail>
          </MyTextFieldBg>
          <MyTextFieldBg>
            <MyTextField
              value={password}
              variant="filled"
              type={isVisibile ? "text" : "password"}
              onChange={handleChangePassword}
              placeholder="Enter your Password"
            ></MyTextField>

            <div onClick={toggleVisibility}>
              {!isVisibile ? (
                <AiOutlineEye size={25} style={iconProp}></AiOutlineEye>
              ) : (
                <AiOutlineEyeInvisible
                  size={25}
                  style={iconProp}
                ></AiOutlineEyeInvisible>
              )}
            </div>
          </MyTextFieldBg>
          <MyButton variant="contained"
          
          
          >Login</MyButton>
          <MyButton
            variant="contained"
            style={{
              backgroundColor: "#030e21",
            }}
          >
            <FcGoogle size={30}></FcGoogle>
          </MyButton>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: "2vh",
              justifyContent: "center",
            }}
          >
            <Text>Don't have an account? </Text>
            <Text
              style={{
                color: "#FFC107",
                cursor: "pointer",
                marginLeft: "5px",
              }}
            >
              Sign up
            </Text>
          </div>
        </form>
      </CenterCard>
    </BackgroundBox>
  );
}

//----------- EXTRA------------------

const BackgroundBox = styles.BackgroundBox;
const CenterCard = styles.CenterCard;
const Text = common_styles.Text;
const MyTextField = common_styles.MyTextField;
const MyTextFieldBg = common_styles.MyTextFieldBg;
const MyButton = common_styles.MyButton;
const yellowDot = {
  height: "1.5vh",
  width: "1.5vh",
  backgroundColor: "#d8a01f",
  borderRadius: "50%",
  marginBottom: "10px",
  marginLeft: "10px",
};
const iconProp = {
  marginTop: "10px",
  marginLeft: "12px",
};
export default Login;
