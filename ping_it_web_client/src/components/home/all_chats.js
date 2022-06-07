import React, { useEffect, useState } from "react";
import common_styles from "../common_styles";
import { socket } from "../../services/socket_services";
import { useHomeContext } from "../../context_api/home_context";
import { Button, CardMedia } from "@mui/material";
import UserService from "../../services/user";
import UserCard from "../home/user_card";
import { UserCardSkeleton } from "../home/user_card";
import startChat from "../../assets/images/chat.png";

const CenterCard = common_styles.CenterCard;

function AllChats() {
  const { user, addFriend, userFriends, setuserFriends } = useHomeContext();
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
    
    // setstateIndex(1);
    // UserService.getFriends()
    //   .then((res) => {
    //     res.friends.map((friend) => {
    //       var userx = {
    //         username: friend.name,
    //         email: friend.email,
    //         displayPictureUrl: friend.displayPictureUrl,
    //       };
    //       addFriend(userx);
    //     });
    //     // setstateIndex(2);
    //   })
    //   .catch((err) => {
    //     setstateIndex(3);
    //   });
    // console.log(userFriends);
  }, [addFriend, userFriends]);

  const testOnclick = async () => {
    var result = await UserService.getFriends();
    console.log(result.friends);
  };
  const renderSwitch = (param) => {
    switch (param) {
      case "initial":
        return initalImage;
      case "loading":
        return UserCardSkeleton;
      case "success":
        return userFriends.map((user, index) => (
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
      }}
    >
      {renderSwitch(apiState[stateIndex])}
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
