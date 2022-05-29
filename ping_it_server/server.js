const express = require("express");
const Mongoose = require("mongoose");
const auth_routers = require("./routes/auth_routes");
const error_handler = require("./middlewares/error_handler");
const cors = require("cors");

require("dotenv").config();

const app = express();
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
app.use(error_handler);

//--------------- TESTING -----------------
app.post("/test", (req, res) => {
  if(req.body){
    res.json({
      message: "success",
      user: req.body,
    });
  }
  else{
    res.json({
      message: "fail",
    });
  }
})
Mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to mongo db.."))
  .catch((err) => console.log("error", err));

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
