import React from "react";
import "./styles";
import common_styles from "../common_styles";
import styles from "./styles";
import { Box } from "@mui/material";

function login() {
  return (
    <BackgroundBox>
      <CenterCard>
        <Box display="flex" flexDirection="Row" alignItems="flex-end">
          <Text fontSize={"5vh"} marginTop={"5vh"}>
            Log in
          </Text>
          <div style={yellowDot}></div>
        </Box>
        <MyTextFieldBg>
          <MyTextField></MyTextField>
        </MyTextFieldBg>
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
const yellowDot = {
  height: "1.5vh",
  width: "1.5vh",
  backgroundColor: "#d8a01f",
  borderRadius: "50%",
  marginBottom: "10px",
  marginLeft: "10px",
};

export default login;
