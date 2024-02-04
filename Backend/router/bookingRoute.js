const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const cookieParser = require('cookie-parser')
const verifyToken = require('../middleware/authToken')
const BOOKING = require('../Schema/BOOKING')



router.use(cookieParser())

router.post('/book',verifyToken,async(req,resp)=>{
    const userId=req.userId
    const { place,
    name,
    guest,
    phone,
    checkIn,
    checkOut,
    price}=req.body
    try {
        const newBooking = await BOOKING.create({place,
            name,
            phone,
            guest,
            checkIn,
            checkOut,
            bookedBy:userId,
            price })
        resp.status(201).json(newBooking)
    } catch (error) {
        resp.status(404).json({message:error.message})
    }
})


router.get('/myBookings',verifyToken,async(req,resp)=>{
    const userId = req.userId
    try {
        const myBookings = await BOOKING.find({bookedBy:userId}).populate('place')
        resp.status(200).json(myBookings)
    } catch (error) {
        resp.status(404).json({message:error.message})
        
    }
})


// router.get('/myBookings/:bookingId',verifyToken,async(req,resp)=>{
//     const {bookingId} = req.params
//     try {
//         const singleBooking = await BOOKING.findById(bookingId).populate('place')
//         resp.status(200).json(singleBooking)
//     } catch (error) {
//         resp.status(404).json({message:error.message})
//     }
// })







module.exports=router