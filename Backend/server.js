const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./router/userRoutes')
const extraRoutes = require('./router/extraRoute')
const placeRoutes=require('./router/placeRoutes')
const bookingRoutes = require('./router/bookingRoute')
const cors = require('cors')
// const multer = require('multer')
const imageDownloader = require('image-downloader')
const verifyToken = require('./middleware/authToken')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(cors({origin:"http://localhost:3000",credentials:true}))
app.use('/uploads',express.static(__dirname + '/uploads'))
app.use('/airbnb/users',userRoutes)
app.use('/airbnb/users',extraRoutes)
app.use('/airbnb/place',placeRoutes)
app.use('/airbnb/booking',bookingRoutes)

const PORT = 5000

app.post('/upload-by-link',verifyToken,async(req,resp)=>{
    const {link} = req.body
    try {
        const newName = 'photo' + Date.now() + '.jpeg'
       await imageDownloader.image({
            url:link,
            dest:__dirname + '/uploads/' + newName
        })
        resp.json(newName)
    } catch (error) {
        resp.json(error)
    }
})


app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(PORT,()=>{
        console.log('====================================');
        console.log(`Backend is running and mongodb connected ...`);
        console.log('====================================');
    })
}).catch((err)=>{
    console.log(err);
})
