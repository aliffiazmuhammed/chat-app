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

module.exports.login = async(req,res,next)=>{
    const {username,password} = req.body;
    const usernameCheck = await User.find({username:username});

    if (usernameCheck.length > 0) {
        bcrypt.compare(password, usernameCheck[0].password).then((result)=>{
                if(result){
                    console.log('password correct')
                    return res.json({status:true,user:usernameCheck[0]});
                }else{
                    return res.json({msg:"invalid password",status:false});
                }
        })

      } else {
        
        return res.json({msg:"invalid user",status:false});
      }
    
    
}

module.exports.setAvatar = async(req,res,next)=>{
    const userId = req.params.id;
    const image = req.body.image;
    try {
        const UserFind = await User.findOneAndUpdate({_id:userId},{avatarImage:image,isAvatarImageSet:true})
        if(UserFind.isAvatarImageSet === true){
            return res.json({status:true})
        }else{
            return res.json({msg:"failed to set avatar",status:false})
        }
    } catch (error) {
        console.log(error)
    }
    

    
}