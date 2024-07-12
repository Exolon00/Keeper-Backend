const { User } = require("../db");
const jwt = require('jsonwebtoken');
const jwtPassword = 'Exolon13';



function suserMiddleware(req, res, next) {
    
    const userUsername = req.headers.username;
    const userPassword = req.headers.password;
    User.findOne({username: userUsername,password:userPassword})
    .then(function(data){
        if(data) next();
       else{
        res.json({
            msg: "User not found"
        })
        return;
       }
    })
    .catch(err =>{
        res.json({
            msg: "invalid credentials"
        })
    })
}

function userMiddleware(req,res,next){
    const token1 = req.headers.authorization;
    const token2 = token1.split(" ");
    const token = token2[1]
    const payload = jwt.verify(token, jwtPassword,function(err,decode){
        if(err){
            res.json({
                msg: "wrong user"
            })
        }
        return decode;
    });
    if(payload.username){
        req.username = payload.username;
        next()
    } 
    else {
        res.json({
            msg: "wrong user"
        })
    }
}


module.exports = {
    userMiddleware,
    suserMiddleware
}