import React, { useState, useEffect } from "react";
import styles from "./styles";
import common_styles from "../common_styles";
import { Button, IconButton, Typography } from "@mui/material";
import { IoMdRefresh } from "react-icons/io";

function Otp({ email }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
      // element.previousSibling.focus();
    }
  };
  const [seconds, setseconds] = useState(5);

  useEffect(() => {
    if (seconds > 0) {
      console.log(seconds);
      const interval = setInterval(() => {
        setseconds(seconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds]);
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
            <Typography>testing@gmail.com</Typography>
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
          style={{
            backgroundColor: "#030e21",
            width: "150px",
            color: "#ecb75e",
          }}
        >
          continue
        </MyButton>
      </CenterCard>
    </BackgroundBox>
  );
}

export default Otp;
const BackgroundBox = styles.BackgroundBox;
const CenterCard = styles.CenterCard;
const MyTextFieldBg = common_styles.MyTextFieldBg;
const MyButton = common_styles.MyButton;
