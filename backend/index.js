const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/users");
const pinRouter = require("./routes/pins");

dotenv.config();
app.use(express.json());
mongoose
  .connect(process.env.MONGO__URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

app.use("/api/users", authRouter);
app.use("/api/pins", pinRouter);

app.listen(4000, () => {
  console.log("Backend is connect");
});
