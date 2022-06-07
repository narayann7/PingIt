import { Typography } from "@mui/material";
import React from "react";
import common_styles from "../common_styles";
const CenterCard = common_styles.CenterCard;
function Profile() {
  return (
    <CenterCard
      style={{
        width: "30vw",
        height: "75vh",
        marginLeft: "40px",
        marginTop: "30px",
        minWidth: "250px",
        minHeight: "60px",
        backgroundColor: "#000000",
      }}
    >
      <Typography> Profile;</Typography>
    </CenterCard>
  );
}

export default Profile;
