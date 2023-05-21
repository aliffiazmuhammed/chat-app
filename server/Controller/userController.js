const User = require('../Model/userModel')
const bcrypt = require('bcrypt')

module.exports.register = async(req,res,next)=>{
    try {
        const {username,email,password} = req.body

    const userNameCheck = await User.findOne({ username })
    if(userNameCheck){
        return res.json({msg:'username already exist',status:false})
    }
    const emailCheck = await User.findOne({ email })
    if(emailCheck){
        return res.json({msg:'email already registered',status:false})
    }

    const hashedpassword = await bcrypt.hash(password,10)

    const user = await User.create({
        email,username,password:hashedpassword
    })

    delete user.password

    return res.json({status:true,user})
    } catch (error) {
        next(error)
    }
}