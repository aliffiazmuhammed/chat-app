const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express();

require("dotenv").config();


app.use(cors())

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