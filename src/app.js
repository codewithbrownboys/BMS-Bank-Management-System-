const express = require("express");
const authroutes = require("./routes/authroutes");
const accountroutes = require("./routes/account.routes")
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authroutes);
app.use("/api/acc",accountroutes);

module.exports = app;