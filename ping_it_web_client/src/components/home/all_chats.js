import React, { useEffect } from "react";
import common_styles from "../common_styles";
import { socket } from "../../services/socket_services";
import { useHomeContext } from "../../context_api/home_context";
import { Button } from "@mui/material";
const CenterCard = common_styles.CenterCard;
function AllChats() {
  const { user } = useHomeContext();
  // useEffect(() => {
  //   var roomid = user._id;
  //   console.log(roomid);

  //   socket.emit("join_room", { roomid });

  //   socket.on("get_user", (data) => {
  //     console.log(data);
  //   });
  // }, [user._id]);

  const testOnclick = () => {


    
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
      <Button onClick={testOnclick} variant="contained" color="primary">
        hello
      </Button>
    </CenterCard>
  );
}

export default AllChats;
