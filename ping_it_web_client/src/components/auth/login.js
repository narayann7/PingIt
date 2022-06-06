import { React, useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import common_styles from "../common_styles";

import {
  Box,
  Snackbar,
  Backdrop,
  CircularProgress,
  Alert,
} from "@mui/material";
import { HiOutlineMail, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import api from "../../services/axios_api";
import Urls from "../../services/urls";
import Auth from "../../services/auth";
import ErrorHandler from "../../models/ErrorModel";
import common_utility_functions from "../../utility/common_fumctions";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginLoading, setloginLoading] = useState(false);
  const [isVisibile, setIsVisibile] = useState(false);
  const [searchParams] = useSearchParams();
  const [alertMessage, setalertMessage] = useState("hello");
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const navigate = useNavigate();
  const setAlert = useCallback(
    ({ message, type, willActivate }) => {
      setOpenAlert(willActivate);
      setAlertType(type);
      setalertMessage(message);
    },
    [setOpenAlert, setAlertType, setalertMessage]
  );
  useEffect(() => {
    //check if user is already logged in by google
    let refreshtoken = searchParams.get("user");

    if (!refreshtoken) {
      //check if user has refresh token in local storage
      let temp = Auth.getRefreshToken();

      if (temp) {
        refreshtoken = temp;
      }
    }

    if (refreshtoken) {
      setisLoading(true);

      api
        .post(Urls.getAccessTokenUrl, { refreshtoken })
        .then((response) => {
          console.log(response.data);

          if (response.status === 200) {
            setisLoading(false);
            setAlertType("success");
            setalertMessage("Login Successful");
            setOpenAlert(true);
            console.log(response.data);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            navigate("/home", { replace: true });
          }
        })
        .catch((error) => {
          setisLoading(false);
          setOpenAlert(true);
          setAlertType("error");
          setalertMessage("Login Failed. try again");
        });
    }
  }, [navigate, searchParams]);

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
    if (email === "") {
      setAlert({
        message: "Email is required",
        type: "error",
        willActivate: true,
      });
      return;
    } else if (!common_utility_functions.isEmail(email)) {
      setAlert({
        message: "Email is not valid",
        type: "error",
        willActivate: true,
      });
      return;
    } else if (password === "") {
      setAlert({
        message: "Password is required",
        type: "error",
        willActivate: true,
      });
      return;
    } else {
      setloginLoading(true);
      var result = await Auth.login({ email, password });
      if (result instanceof ErrorHandler) {
        setAlert({
          message: result.message.error_message,
          type: "error",
          willActivate: true,
        });
        console.log(result);
      } else {
        console.log(result);
        navigate("/home", { replace: true });
      }
      setloginLoading(false);
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
              // disabled={loginLoading}
              variant="filled"
              type="email"
              placeholder="Enter your email"
              onChange={handleChangeEmail}
              value={email}
            ></MyTextField>

            <Box>
              <HiOutlineMail size={25} style={iconProp}></HiOutlineMail>
            </Box>
          </MyTextFieldBg>
          <MyTextFieldBg>
            <MyTextField
              value={password}
              variant="filled"
              type={isVisibile ? "text" : "password"}
              onChange={handleChangePassword}
              placeholder="Enter your Password"
            ></MyTextField>

            <Box onClick={toggleVisibility}>
              {!isVisibile ? (
                <HiOutlineEye size={25} style={iconProp}></HiOutlineEye>
              ) : (
                <HiOutlineEyeOff size={25} style={iconProp}></HiOutlineEyeOff>
              )}
            </Box>
          </MyTextFieldBg>
          <MyButton id="login" onClick={loginOnClick} variant="contained">
            {loginLoading ? (
              <CircularProgress thickness={6} size={22} color="inherit" />
            ) : (
              "Login"
            )}
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
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
              }}
            >
              <Text
                style={{
                  color: "#FFC107",
                  cursor: "pointer",
                  marginLeft: "5px",
                }}
              >
                Sign up
              </Text>
            </Link>
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

const BackgroundBox = common_styles.BackgroundBox;
const CenterCard = common_styles.CenterCard;
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
