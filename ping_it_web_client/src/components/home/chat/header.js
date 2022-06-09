import React from "react";
import common_styles from "../../common_styles";
import { CardMedia } from "@mui/material";
import { RiUser3Line } from "react-icons/ri";
import { Avatar } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
const CenterCard = common_styles.CenterCard;
const Text = common_styles.Text;

function Header() {
  let displayPictureUrl = null;
  return (
    <CenterCard style={cardStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Avatar
          style={{
            backgroundColor: displayPictureUrl ? "#1a1a2b" : "#030e21",
            color: "#fff",
          }}
          className="profile"
          // onClick={profile}
          alt="user"
        >
          {displayPictureUrl ? (
            <CardMedia component="img" image={displayPictureUrl} />
          ) : (
            <RiUser3Line color="#d8a01f" />
          )}
        </Avatar>
        <Text paddingLeft="25px">narayan</Text>
      </div>
      <BsThreeDotsVertical />
    </CenterCard>
  );
}

export default Header;
const cardStyle = {
  width: "60vw",
  height: "10vh",
  backgroundColor: "#030e21",
  minWidth: "500px",
  minHeight: "60px",
  flexDirection: "row",
  display: "flex",
  padding: "35px",
  justifyContent: "space-between",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
};
