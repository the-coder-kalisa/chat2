    const User = require('../model/usermodels.js')
const bcrypt = require('bcrypt')
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/thecoder"
module.exports.signup = async(req, res, next)=>{
    try{
        const {email, username, password} = req.body
        const usernameCheck = await User.findOne({username});
        if(usernameCheck){
        return res.json({msg: 'username already exists', status: false});
        }
        const emailCheck = await User.findOne({email});
        if(emailCheck){
        return res.json({msg: 'email already exists', status: false})
        }
        const hashedPasswod = await bcrypt.hash(password, 10)
        const user = await User.create({
            email,
            username,
            password: hashedPasswod
        })
        delete user.password;
        return res.json({status: true, user})
    }
    catch(err){
        next(err);
    }
}
module.exports.login = async(req, res, next)=>{
    const bcrypt =  require('bcrypt');
    try{
        const {email, password} = req.body;;
        const user = await User.findOne({email});
        if(!user){
            return res.json({msg: 'email does not exist', status: false})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid)
        return res.json({msg: 'password does not match', status: false});
        delete user.password
        return res.json({status: true, user})
    }
    catch(err){
        next(err)
    }
}
module.exports.users = async(req, res, next)=>{
    try{
        MongoClient.connect(url, (err, db)=>{
            if(err) throw err;
            const currentUserId = req.params.id;
            const col = db.db("thecoder").collection("users")
            const current = col.find({_id: new mongo.ObjectId(currentUserId)})
            const users = col.find({}).toArray((err, result)=>{
                current.toArray((err, results)=>{
                    const id = results[0]._id;
                    const final = [];
                    for(let i=0 ; i<=result.length-1; i++){
                        if(result[i]._id.equals(id)){
                            continue;
                        }
                        final.push(result[i]);
                    }
                    return res.send(final)
                })
            });
        })
    }
    catch(err){
        next(err)
    }
}