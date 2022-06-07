import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import UserService from "../services/user";
const socket = io("http://localhost:3001");

function TestComp() {
  const [value, setValue] = useState("");
  const [roomid, setRoomid] = useState(0);
  const [myid, setMyid] = useState(0);
  const [messages, setMessages] = useState([]);
  // { userId: "", message: "" }
  const onClick = async () => {
    // if (value.length !== 0) {
    //   socket.emit("join_room", {  roomid });
    //   var tempMessage = {
    //     userId: socket.id,
    //     key: Math.random().toString(),
    //     text: value,
    //   };
    //   const tempMessages = messages.concat(tempMessage);
    //   setMessages(tempMessages);
    //   socket.emit("send_message", {  tempMessage, roomid });
    //   setMyid(socket.id);
    // }
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onChangeRoom = (e) => {
    setRoomid(e.target.value);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      var tempMessagex = {
        userId: data.tempMessage.userId,
        key: Math.random().toString(),
        text: data.tempMessage.text,
      };

      const tempMessages = messages.concat(tempMessagex);
      setMessages(tempMessages);
    });
  }, [messages]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          bottom: "-90vh",
          justifyContent: "center",
        }}
      >
        <input
          onChange={onChangeRoom}
          style={{
            width: "100px",
            height: "40px",
          }}
          type="number"
          value={roomid}
          placeholder="room number"
        />
        <input
          onChange={onChange}
          style={{
            width: "400px",
            height: "40px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
          type="text"
          value={value}
          placeholder="send message"
        />
        <button
          onClick={onClick}
          style={{
            width: "100px",
            height: "46px",
          }}
        >
          send
        </button>
      </div>

      <div
        style={{
          width: "49vw",
          height: "80vh",
          position: "relative",
          // left: "0.5%",
          overflowY: "scroll",
        }}
      >
        {messages.map((message, index) => (
          <SingleMessage
            message={message.text}
            userId={message.userId}
            key={message.key}
            isMe={myid === message.userId}
          />
        ))}
      </div>
    </div>
  );
}
function SingleMessage({ message, userId, isMe }) {
  return (
    <div
      style={{
        width: "45vw",
        height: "5vh",
        display: "flex",
        marginTop: "50px",
        alignItems: "center",
        justifyContent: isMe === true ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          backgroundColor: "whitesmoke",
          display: "flex",
          height: "8vh",
          padding: "10px",
          alignItems: isMe === true ? "flex-end" : "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: "6px",
        }}
      >
        <h6
          style={{
            margin: "0px",
            padding: "0px",
          }}
        >
          {userId}
        </h6>
        <h4
          style={{
            margin: "0px",
            padding: "0px",
          }}
        >
          {message}
        </h4>
      </div>
    </div>
  );
}

export default TestComp;
