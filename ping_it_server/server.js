const express = require("express");
const Mongoose = require("mongoose");
const auth_routers = require("./routes/auth_routes");
const error_handler = require("./middlewares/error_handler");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/auth", auth_routers);
app.use(error_handler);

Mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to mongo db.."))
  .catch((err) => console.log("error", err));

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
