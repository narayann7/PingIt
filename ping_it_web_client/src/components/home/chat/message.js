import { Box, Link } from "@mui/material";
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
          minWidth: "20px",

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
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        {validateUrl(message.content) ? (
          <Link
            href={message.content}
            onClick={(e) => {
              e.preventDefault();
              window.open(message.content, "_blank");
            }}
            variant="body2"
          >
            {message.content}
          </Link>
        ) : (
          <Text>{message.content}</Text>
        )}
      </Box>
      <Text paddingTop={0.5} fontSize={12}>
        {message.time}
      </Text>
    </div>
  );
}
function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}
export default Message;
