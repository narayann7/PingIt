import React, { useEffect, useState } from "react";
import common_styles from "../common_styles";
import { socket } from "../../services/socket_services";
import { useHomeContext } from "../../context_api/home_context";
import { Button, CardMedia } from "@mui/material";
import UserService from "../../services/user";
import UserCard, { UserCardSkeleton } from "../home/user_card";
import startChat from "../../assets/images/chat.png";
import userCardSkeletons from "../home/add_friend";

const CenterCard = common_styles.CenterCard;

function AllChats() {
  const { user, setcurrentChat } = useHomeContext();
  const [userFriends, setuserFriends] = useState([]);

  const [stateIndex, setstateIndex] = useState(0);
  const [apiState, setapiState] = useState([
    "initial",
    "loading",
    "success",
    "error",
  ]);
  // useEffect(() => {
  //   var roomid = user._id;
  //   console.log(roomid);

  //   socket.emit("join_room", { roomid });

  //   socket.on("get_user", (data) => {
  //     console.log(data);
  //   });
  // }, [user._id]);

  useEffect(() => {
    setstateIndex(1);

    UserService.getFriends()
      .then((result) => {
        let temp;
        setcurrentChat([]);
        result.map((friend) => {
          var userx = {
            _id: friend.friendId,
            username: friend.friendName,
            displayPictureUrl: friend.friendDisplayPictureUrl,
            email: friend.friendEmail,
          };
          console.log(userx);

          temp = userFriends;
          temp.push(userx);
        });
        setuserFriends(temp);
        setstateIndex(2);
      })
      .catch((error) => {
        // setstateIndex(3);
        console.log(error);
      });
  }, [setcurrentChat, userFriends]);

  const renderSwitch = (param) => {
    switch (param) {
      case "initial":
        return initalImage;
      case "loading":
        return (
          <>
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </>
        );

      case "success":
        var length = userFriends.length;
        var tempUserFriends = userFriends.slice(0, length / 2);
        return tempUserFriends.map((user, index) => (
          <UserCard key={index} user={user} type="friend" />
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
        return initalImage;
    }
  };
  return (
    <CenterCard
      style={{
        width: "30vw",
        height: "75vh",
        marginLeft: "40px",
        marginTop: "30px",
        minWidth: "250px",
        minHeight: "60px",
        overflowY: "scroll",
        scrollbarWidth: "thin",
      }}
    >
      {renderSwitch(apiState[stateIndex])}

      {/* <Button onClick={testOnclick}>THIS</Button> */}
    </CenterCard>
  );
}

export default AllChats;
const initalImage = (
  <div
    style={{
      display: "flex",
      padding: "90px",
      marginTop: "70px",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CardMedia component="img" image={startChat} />
  </div>
);
