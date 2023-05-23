const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoute = require('./Routes/userRoute')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();

require("dotenv").config();

app.use(bodyParser.json());
app.use(cors())

//route setup
//userRuote->routes folder
app.use('/api/auth',userRoute)

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