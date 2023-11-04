require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    "Access-Control-Allow-Origin": "*",
  })
);

app.use(express.json());
const conect = async () => {
  await mongoose.connect("mongodb://0.0.0.0:27017/smv");
  console.log('database is connected');
};

conect();
//  console.log(process.env.URL);
const formRouter = require("./routes/formRoute");
const authRouter = require("./routes/authRoute");
const logRouter = require("./routes/logRoute");
const classRouter = require("./routes/classRoute");
const backRouter = require("./routes/backupRoute");
const archiveRouter = require("./routes/archiveRoute");

// hostnamectl set-hostname smwback
app.use("/form", formRouter);
app.use("/auth", authRouter);
app.use("/logs", logRouter);
app.use("/class", classRouter);
app.use("/backup", backRouter);
app.use("/archive", archiveRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
