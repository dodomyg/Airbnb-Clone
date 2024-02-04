const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const cookieParser = require('cookie-parser')

const HOTEL = require('../Schema/HOTEL')
const verifyToken = require('../middleware/authToken')

router.use(cookieParser())


router.post('/newPlace',verifyToken,async(req,resp)=>{
    const {title,address,pics,desc,features,extraInfo,checkIn,checkOut,maxGuests,price}=req.body
    const userId = req.userId
    if(!userId){
        return resp.status(400).json({ message: 'User ID not found in cookies' });
    }
    // console.log(userId);
    try {
        const newHotel = await  HOTEL.create({title,address,pics,desc,price,features,extraInfo,checkIn,checkOut,maxGuests,owner:userId})
        resp.status(201).json(newHotel)

    } catch (error) {
        resp.status(404).json({message:error.message})
    }
})


router.get('/getMyPlace',verifyToken,async(req,resp)=>{
    const userId = req.userId
    try {
        const myPlaces = await HOTEL.find({owner:userId}).populate('owner',"-password")
        resp.status(200).json(myPlaces)
    } catch (error) {
        resp.status(404).json({message:error.message})
    }
})

router.get('/getMyPlace/:placeId',verifyToken,async(req,resp)=>{
    const {placeId}=req.params
    try {
        const findPlace = await HOTEL.findById(placeId)
        resp.status(200).json(findPlace)
    } catch (error) {
        resp.status(404).json({message:error.message})
    }
})


router.put('/updatePlace/:placeId',verifyToken,async(req,resp)=>{
    const {placeId} = req.params
    try {
        const upDatePlace = await HOTEL.findByIdAndUpdate({_id:placeId,owner:req.userId},req.body,{new:true,runValidators:true})
        if (!upDatePlace) {
            return resp.status(404).json({ message: 'Place not found' });
          }
      
          resp.status(200).json(upDatePlace);
    } catch (error) {
        resp.status(404).json({message:error.message})
    }
})


router.get("/allPlaces",async(req,resp)=>{
    try {
        const allPlaces = await HOTEL.find({})
        resp.status(200).json(allPlaces);
    } catch (error) {
        resp.status(404).json({message:error.message})
    }
})

//get single place 
router.get("/allPlaces/:placeId",async(req,resp)=>{
    const {placeId}=req.params
    try {
        const allPlaces = await HOTEL.findById(placeId)
        resp.status(200).json(allPlaces);
    } catch (error) {
        resp.status(404).json({message:error.message})
    }
})







module.exports=router