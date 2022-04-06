const messages = require('../model/messageModel.js')
module.exports.sendMsg = async(req, res, next)=>{
    try{
    const {from, to, message} = req.body;
    const data = await messages.create({
        message: {text: message},
        Users: [from, to],
        sender: from,
    })
    if(data){
        return res.json({msg: "message was added"})
    }
    return res.json({msg: "message was not added"})
    }
    catch(err){
        next(err);
    }
}
module.exports.getMessages = async(req, res, next)=>{
    try{
        const {from, to} = req.body;
        const getMessages = await messages.find({
            Users: {
                $all: [from, to]
            }
        }).sort({updatedAt: 1});
        const sortedMessages = getMessages.map((message)=>{
            const the = JSON.stringify(message.createdAt)
            const created = the.slice(the.lastIndexOf('T')+1, the.lastIndexOf('.'));
            const dated = the.slice(1, the.lastIndexOf('T'));
            const date = JSON.stringify(new Date(Date.now()));
            const dates = date.slice(1, date.lastIndexOf('T'));
            return{
                writer: message.sender.toString() === from,
                message: message.message.text,
                createdAt: created,
                years: dated,
                today: dated === dates,
            }
        })
        return res.json(sortedMessages)
    }
    catch(err){
        next(err);
    }
}