const JWT = require("jsonwebtoken");
const { TokenExpiredError } = JWT;
const Users = require("../models/userModel");
require("dotenv").config();

//protected routes tokens base
const requireSignIn = async (req,res,next) => {
    try{
        const token = req.headers['authorization']?.replace("Bearer ", "").trim();
        if (!token) {
            return res.status(404).send({
                success : false,
                message : "Unauthorized HTTP, Token not provided!"
            })
        }
        JWT.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
                return (err instanceof TokenExpiredError)
                    ? res.status(201).send({
                        success : false,
                        message : "Token expired, please log in again!"
                    })
                    : res.status(201).send({
                        success : false,
                        message : "Authentication failed!"
                    })
            } else {
                req.user = decode;
                console.log(req.user)
                next();
            }
        });
    } 
    catch (error) {
        console.log(error);
    }    
};

module.exports = {requireSignIn};
