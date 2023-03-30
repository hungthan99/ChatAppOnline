const express = require("express");
const app = express();
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
const http = require("http");
const morgan = require("morgan"); //Thong bao cac request vao terminal
const mongoose = require("mongoose"); //Ket noi voi mongo
var bodyParser = require("body-parser"); //parse du lieu thanh chuoi Json
const cookieParser = require("cookie-parser");

// const { socketServer } = require("./socketio/socket");
var cors = require('cors')
const userRoute = require("./routes/user");
const chatRoute = require("./routes/chat");
const authRoute = require("./routes/auth");
const requestRoute = require("./routes/request");
const { Server } = require('socket.io');
const socketio = require("./socketio/socket");
const multer = require("multer");
const { memoryStorage } = require("multer");
const middlewareController = require("./middleware/middlewareController");
//model
const { User, Chat, Request, Message } = require("./model/model");
const { uploadToS3, getImageKeyByUser, getUserPresignedUrls } = require("./s3.js");
require("dotenv").config();
// Cors
app.use(cors());
const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connected to MongoDB");
});

const port = process.env.PORT;
const storage = memoryStorage();
const upload = multer({ storage })

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


// Socket.io

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true,
  },
  allowEIO3: true
})

socketio.socketServer(io);
// post
app.post("/images", upload.single("image"), (req, res) => {
  const { file } = req;
  const userId = req.headers["x-user-id"];
  if (!file || !userId) return res.status(400).json({ message: "Bad request" });

  const { error, key } = uploadToS3({ file, userId });
  if (error) return res.status(500).json({ message: error.message });
  return res.status(201).json({ key });
});

app.get('/images', async (req, res) => {
  const userId = req.headers["x-user-id"];
  if (!userId) return res.status(400).json({ message: "Bad request" });

  const { error, presignedUrls } = await getUserPresignedUrls(userId)
  if (error) return res.status(400).json({ message: error.message })
  return res.json(presignedUrls);
})

server.listen(port, () => {
  console.log("Server is runing at port " + port);
});