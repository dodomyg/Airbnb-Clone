const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const cookieParser = require('cookie-parser')
const USER = require('../Schema/USER')
const verifyToken = require('../middleware/authToken')



router.get('/jwt',verifyToken,async(req,resp)=>{
    const userId = req.userId
    if(!userId){
       return resp.status(404).json({message:"No token , login first"})
    }
        try {
            const getUser =await USER.findById({_id:userId})
        resp.status(200).json({message:"Got logged in user",getUser})
        } catch (error) {
        resp.status(404).json({message:error.message})
        }
})




module.exports=router