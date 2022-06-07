const express = require("express");
const Mongoose = require("mongoose");
const http = require("http");
const auth_routers = require("./routes/auth_routes");
const user_routers = require("./routes/user_routes");
const error_handler = require("./middlewares/error_handler");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", auth_routers);
app.use("/api/user", user_routers);
app.use(error_handler);
//--------------- TESTING -----------------
app.post("/test", (req, res) => {
  if (req.body) {
    res.json({
      message: "success",
      user: req.body,
    });
  } else {
    res.json({
      message: "fail",
    });
  }
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("add_user", (data) => {
    console.log("add_user", data);
    socket.to(data.roomid).emit("_user", data);
  });

  socket.on("join_room", (data) => {
    console.log("room--", data.roomid);
    socket.join(data.roomid);
  });

  socket.on("send_message", (data) => {
    console.log("data", data);
    socket.to(data.roomid).emit("receive_message", data);
  });
});

//-----------------------------------------------------------------------------------
Mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to mongo db.."))
  .catch((err) => console.log("error", err));

// app.listen(port, () => {
//   console.log(`Server started on port ${port}...`);
// });

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
