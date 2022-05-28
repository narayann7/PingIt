import React from "react";
import "./styles";
import { Card, Typography, Box } from "@mui/material";
import styles from "./styles";
const BackgroundBox = styles.BackgroundBox;

function login() {
  return (
    <BackgroundBox>
      <Card>
        <Typography>hello world</Typography>
      </Card>
    </BackgroundBox>
  );
}

export default login;
