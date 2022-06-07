import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import UserCard, { UserCardSkeleton } from "../home/user_card";
import common_styles from "../common_styles";
import { useHomeContext } from "../../context_api/home_context";
import { CardMedia, IconButton } from "@mui/material";
import UserService from "../../services/user";
import searchImage from "../../assets/images/search.png";
import sadImage from "../../assets/images/sad.png";
import ErrorHandler from "../../models/ErrorModel";
import socket from "../../services/socket_services";
const CenterCard = common_styles.CenterCard;
const Text = common_styles.Text;

function AddFriend() {
  const { stateIndex, setstateIndex, apiState } = useHomeContext();
  const [search, setsearch] = useState("");
  const [users, setusers] = useState([]);

  const onheaderClick = (e) => {
    e.preventDefault();
    setsearch(e.target.value);
  };
  const onSearch = async (e) => {
    e.preventDefault();
    setstateIndex(1);
    var result = await UserService.searchUser(search);
    if (result instanceof ErrorHandler) {
      setstateIndex(3);
    }
    if (result.users.length === 0) {
      setstateIndex(-1);
    } else {
      setusers(result.users);
      setstateIndex(2);
    }
  };

  const renderSwitch = (param) => {
    switch (param) {
      case "initial":
        return initalImage;
      case "loading":
        return userCardSkeletons;
      case "success":
        return users.map((user, index) => (
          <UserCard key={index} user={user} type="add_friend" />
        ));
      case "error":
        return (
          <div
            style={{
              display: "flex",
              padding: "100px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3>Error. try again later</h3>
          </div>
        );
      default:
        return noUser;
    }
  };
  return (
    <CenterCard style={cardStyle}>
      <CenterCard style={searchStyle}>
        <form style={searchStyle} onSubmit={onSearch}>
          <MyTextField
            variant="filled"
            onChange={onheaderClick}
            placeholder="Search for a friend"
            value={search}
          ></MyTextField>
          <IconButton onClick={onSearch}>
            <BiSearchAlt size={23} color="#ffff  " />
          </IconButton>
        </form>
      </CenterCard>
      <div style={resultStyle}>{renderSwitch(apiState[stateIndex])}</div>
    </CenterCard>
  );
}

export default AddFriend;

//-------------Styles------------------

export const userCardSkeletons = (
  <>
    <UserCardSkeleton />
    <UserCardSkeleton />
    <UserCardSkeleton />
    <UserCardSkeleton />
    <UserCardSkeleton />
  </>
);

const MyTextField = common_styles.MyTextField;
const cardStyle = {
  width: "30vw",
  height: "75vh",
  marginLeft: "40px",
  marginTop: "30px",
  minWidth: "250px",
  minHeight: "60px",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};
const searchStyle = {
  width: "27vw",
  height: "10vh",
  minWidth: "220px",
  minHeight: "50px",
  backgroundColor: "#030e21",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
};
const resultStyle = {
  overflowY: "scroll",
  scrollbarWidth: "thin",
  width: "27vw",
  height: "60vh",
  minWidth: "220px",
  minHeight: "50px",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
};
const initalImage = (
  <div
    style={{
      display: "flex",
      padding: "100px",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CardMedia component="img" image={searchImage} />
  </div>
);

const noUser = (
  <div
    style={{
      display: "flex",
      padding: "100px",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <CardMedia component="img" image={sadImage} />

    <Text padding="10px" variant="h5">
      No user found
    </Text>
  </div>
);
