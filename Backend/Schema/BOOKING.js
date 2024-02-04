const mongoose=require('mongoose')

const BookingSchema = new mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"HOTEL"},
    name:{type:String,required:true},
    phone:{type:Number,required:true},
    guest:{type:Number,required:true},
    checkIn:{type:Date,required:true},
    checkOut:{type:Date,required:true},
    price:{type:Number,required:true},
    bookedBy:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"BOOKING"}
},{timestamps:true})


module.exports=mongoose.model("BOOKING",BookingSchema)