import { Box } from "@mui/material";
import React from "react";
import common_styles from "../../common_styles";
const Text = common_styles.Text;
function Message({ message }) {
  return (
    <div
      style={{
        marginBottom: "10px",
        width: "60vw",
        // height: "10vh",
        paddingLeft: "40px",
        paddingRight: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: message.isMe ? "flex-end" : "flex-start",
      }}
    >
      <Box
        style={{
          height: "8vh",
          backgroundColor: "#030e21",
          borderTopLeftRadius: "25px",
          borderTopRightRadius: "25px",
          borderBottomLeftRadius: message.isMe ? "25px" : "0px",
          borderBottomRightRadius: message.isMe ? "0px" : "25px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <Text>{message.content}</Text>
      </Box>
      <Text paddingTop={0.5} fontSize={12}>
        {message.time}
      </Text>
    </div>
  );
}

export default Message;
