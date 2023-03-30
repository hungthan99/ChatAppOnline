const express = require("express");
const app = express();
const morgan = require("morgan"); //Thong bao cac request vao terminal
const mongoose = require("mongoose"); //Ket noi voi mongo
var bodyParser = require("body-parser"); //parse du lieu thanh chuoi Json
const cookieParser = require("cookie-parser");
var cors = require("cors");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log("Connected to MongoDB");
});

const port = process.env.PORT;

const userRoute = require("./routes/user");
const chatRoute = require("./routes/chat");
const authRoute = require("./routes/auth");
const requestRoute = require("./routes/request");

const server = require('http').createServer(app);
const io = require("socket.io")(server);

const socket = require("./socketio/socket");
socket.socketServer(io);

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" })); //Gioi han dung luong cua chuoi Json
app.use(morgan("common"));
app.use(cookieParser());

//User
app.use("/users", userRoute);

//Chat
app.use("/chats", chatRoute);

//auth
app.use("/auth", authRoute);

//request
app.use("/requests", requestRoute);

server.listen(port, () => {
    console.log("Server is runing at port " + port);
});