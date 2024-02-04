const mongoose=require('mongoose')

const HotelSchema = new mongoose.Schema({
    title:{type:String,required:true},
    address:{type:String,required:true},
    pics:[{type:String,required:true}],
    desc:{type:String,required:true},
    features:[{type:String}],
    extraInfo:{type:String},
    checkIn:{type:Number},
    checkOut:{type:Number},
    maxGuests:{type:Number},
    price:{type:Number,required:true},
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"USER"}
},{timestamps:true})


module.exports=mongoose.model("HOTEL",HotelSchema)