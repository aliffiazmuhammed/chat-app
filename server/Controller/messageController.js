const Message = require('../Model/messageModel')

module.exports.getallMessages = async(req,res,next)=>{
    try {
        const {from,to} = req.body;
        const messages = await Message.find({
            users:{
                $all:[from,to]
            }
        }).sort({updatedAt:1})

        const projectedMessages = messages.map((msg)=>{
            
            return{
                fromself:msg.sender.toString() === from,
                message:msg.message.text,
                id:msg._id.text
            }
        })
        res.json(projectedMessages);
    } catch (error) {
        next(error)
    }
    
    
}
module.exports.postMessages = async(req,res,next)=>{
    try {
        const {from,to,msg} = req.body
    const data = await Message.create({
        message:{text:msg},
        users:[from,to],
        sender:from
    })

    if(data){
        return res.json({msg:'message sent successfully'})
    }
    return res.json({msg:'message added unsuccessfully'})
    } catch (error) {
        next(error)
    }
}