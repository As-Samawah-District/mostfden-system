require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const morgan = require("morgan");

app.use(morgan("dev"));

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    "Access-Control-Allow-Origin": "*",
  })
);

const db_url = process.env.DB_URI;

app.use(express.json());
const conect = async () => {
  await mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`database is connected URI::::${db_url}`);
};

conect();
//  console.log(process.env.URL);
const formRouter = require("./routes/formRoute");
const authRouter = require("./routes/authRoute");
const logRouter = require("./routes/logRoute");
const classRouter = require("./routes/classRoute");
const backRouter = require("./routes/backupRoute");
const archiveRouter = require("./routes/archiveRoute");
const { createAdmin, changeAdminPassword } = require("./controllers/authController");
const { addForLastFormsPendingTrue } = require("./controllers/formController");

// hostnamectl set-hostname smwback
app.use("/form", formRouter);
app.use("/auth", authRouter);
app.use("/logs", logRouter);
app.use("/class", classRouter);
app.use("/backup", backRouter);
app.use("/archive", archiveRouter);

// createAdmin
createAdmin();
// addForLastFormsPendingTrue();
// const randomPassword = "414Iraq585Iraq@SSS";
// changeAdminPassword(randomPassword);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
