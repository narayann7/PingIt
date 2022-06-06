import React, { useState, useEffect, useCallback } from "react";
import common_styles from "../common_styles";
import {
  Alert,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { IoMdRefresh } from "react-icons/io";
import Auth from "../../services/auth";
import ErrorHandler from "../../models/ErrorModel";
import { useNavigate } from "react-router-dom";
import { useRoot } from "../../context_api/root_context";

function Otp({ email }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [alertMessage, setalertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);
  const [continueLoading, setcontinueLoading] = useState(false);
  const navigate = useNavigate();
  const { switchKeys, setswitchKeys } = useRoot();

  let temp = localStorage.getItem("otp_data");
  temp = JSON.parse(temp);
  const [user, setuser] = useState(temp);

  const setAlert = useCallback(
    ({ message, type, willActivate }) => {
      setOpenAlert(willActivate);
      setAlertType(type);
      setalertMessage(message);
    },
    [setOpenAlert, setAlertType, setalertMessage]
  );
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
      // element.previousSibling.focus();
    }
  };
  const [seconds, setseconds] = useState(10);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setseconds(seconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds]);

  const resendOtp = async () => {
    if (seconds <= 0) {
      const res = await Auth.sendOtp({
        email: user.email,
        password: user.password,
        username: user.username,
      });
      if (res instanceof ErrorHandler) {
        setAlert({
          message: res.message.error_message,
          type: "error",
          willActivate: true,
        });
      } else {
        setseconds(10);
        let temp = user;
        temp.otp_token = res.otp_token;
        setuser(temp);
      }
    }
  };

  const continueButton = async () => {
    let count = 0;
    otp.forEach((element) => {
      if (element === "") count++;
    });
    if (count === 0) {
      var otp_string = otp.join("");
      setcontinueLoading(true);

      var result = await Auth.signup({
        email: user.email,
        password: user.password,
        username: user.username,
        otp_token: user.otp_token,
        otp: otp_string,
      });

      if (result instanceof ErrorHandler) {
        setAlert({
          message: result.message.error_message,
          type: "error",
          willActivate: true,
        });
      } else {
        localStorage.removeItem("otp_data");
        let temp = switchKeys;
        temp.isLoggedIn = true;
        temp.otpReceived = false;
        setswitchKeys(temp);
        navigate("/home", {
          replace: true,
        });
      }
    } else {
      setAlert({
        message: "Please enter all the fields",
        type: "error",
        willActivate: true,
      });
    }
    setcontinueLoading(false);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <BackgroundBox>
      <CenterCard
        style={{
          height: "350px",
          width: "500px",
          minWidth: "500px",
          minHeight: "350px",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="just-center-r">
          <Typography>OTP has been sent to</Typography>
          <div
            style={{
              margin: "10px",
              paddingTop: "2px",
              paddingBottom: "2px",
              paddingLeft: "8px",
              paddingRight: "8px",
              borderRadius: "5px",
              backgroundColor: "#030e21",
            }}
          >
            <Typography>{user.email}</Typography>
          </div>
        </div>
        <Typography paddingBottom={2}>Enter the OTP here 👇</Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {otp.map((data, index) => {
            return (
              <input
                className="otp-input"
                type="text"
                name="otp"
                maxLength="1"
                autoFocus={index === 0}
                key={index}
                value={data}
                onKeyDown={(e) => {
                  console.log(e.target.value);

                  if (e.key === "Backspace") {
                    if (e.target.value === "") {
                      e.target.previousSibling.focus();
                      e.target.previousSibling.value = "";
                      setOtp([
                        ...otp.map((d, idx) =>
                          idx === index - 1 ? e.target.previousSibling.value : d
                        ),
                      ]);
                    }
                  }
                }}
                onChange={(e) => {
                  handleChange(e.target, index);
                }}
                onFocus={(e) => {
                  e.target.select();
                }}
              />
            );
          })}
        </div>

        {seconds > 0 ? (
          <Typography paddingTop={2}>0.{seconds}</Typography>
        ) : (
          <MyButton
            variant="contained"
            onClick={resendOtp}
            style={{
              backgroundColor: "#030e21",
              width: "150px",
              color: "#ecb75e",
            }}
            endIcon={<IoMdRefresh />}
          >
            resend
          </MyButton>
        )}

        <MyButton
          variant="contained"
          onClick={continueButton}
          style={{
            backgroundColor: "#030e21",
            width: "150px",
            color: "#ecb75e",
          }}
        >
          {continueLoading ? (
            <CircularProgress thickness={6} size={22} color="inherit" />
          ) : (
            "continue"
          )}
        </MyButton>
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
    </BackgroundBox>
  );
}

export default Otp;
const BackgroundBox = common_styles.BackgroundBox;
const CenterCard = common_styles.CenterCard;
const MyButton = common_styles.MyButton;
