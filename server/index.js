const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoute = require('./Routes/userRoute')
const messageRoute = require('./Routes/messageRoute')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const socket = require("socket.io");

const app = express();

require("dotenv").config();

app.use(bodyParser.json());
app.use(cors())

//route setup
//userRuote->routes folder
app.use('/api/auth',userRoute)
app.use('/api/messages',messageRoute)


app.use(express.json())

//connect to database locally
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(
    console.log("connected to database successfully")
)

//server connection
const server = app.listen(process.env.PORT,()=>{
    console.log("port started")
})

//socket connection

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        console.log(data.msgs)
        socket.to(sendUserSocket).emit("msg-recieve", data.msgs);
      }
    });
  });