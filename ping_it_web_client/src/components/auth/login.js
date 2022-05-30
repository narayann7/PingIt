import { React, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import common_styles from "../common_styles";
import styles from "./styles";
import {
  Box,
  Snackbar,
  Backdrop,
  CircularProgress,
  Alert,
} from "@mui/material";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import api from "../../services/axios_api";
import Urls from "../../services/urls";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isVisibile, setIsVisibile] = useState(false);
  const [searchParams] = useSearchParams();
  const [alertMessage, setalertMessage] = useState("hello");
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [alertType, setAlertType] = useState("success");

  useEffect(() => {
    // //check if user is already logged in by google
    // let refreshtoken = searchParams.get("user");

    // if (!refreshtoken) {
    //   //check if user has refresh token in local storage
    //   let temp = localStorage.getItem("refreshToken");

    //   if (temp) {
    //     refreshtoken = temp;
    //   }
    // }

    // if (refreshtoken) {
    //   setisLoading(true);
    //   api
    //     .post(Urls.getAccessTokenUrl, { refreshtoken })
    //     .then((response) => {
    //       console.log(response.data);

    //       if (response.status === 200) {
    //         setisLoading(false);
    //         setAlertType("success");
    //         setalertMessage("Login Successful");
    //         setOpenAlert(true);
    //         console.log(response.data);
    //         localStorage.setItem("refreshToken", response.data.refreshToken);
    //         window.open(`${Urls.clientBaseUrl}/home`, "_self");
    //       }
    //     })
    //     .catch((error) => {
    //       setisLoading(false);
    //       setOpenAlert(true);
    //       setAlertType("error");
    //       setalertMessage("Login Failed. try again");
    //     });
    // }
  }, [searchParams]);

  const toggleVisibility = () => {
    setIsVisibile(!isVisibile);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const googleSignIn = () => {
    window.open(`${Urls.severLoginWithGoogleUrl}`, "_self");
  };

  const loginOnClick = async () => {
    let token = localStorage.getItem("refreshToken");
    if (token) {
      console.log("token is present");
    } else {
      console.log("token is not present");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <BackgroundBox>
      <CenterCard>
        <Box display="flex" flexDirection="Row" alignItems="flex-end">
          <Text fontSize={"2.5rem"} marginTop={"5vh"}>
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
          <MyButton id="login" onClick={loginOnClick} variant="contained">
            Login
          </MyButton>
          <MyButton
            onClick={googleSignIn}
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
  marginBottom: "15px",
  marginLeft: "10px",
};
const iconProp = {
  marginTop: "10px",
  marginLeft: "12px",
};
export default Login;
