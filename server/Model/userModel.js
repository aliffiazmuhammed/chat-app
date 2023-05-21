const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required : true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        min:8,
        required:true
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:""
    }
})

module.exports = mongoose.model("users",userSchema)