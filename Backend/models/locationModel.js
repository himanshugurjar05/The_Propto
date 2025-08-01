import mongoose from "mongoose";

let LocationSchema = new mongoose.Schema({
    cityPoster:{type:String, default:""},
    cityName:{
        type:String,
        unique:true
    },
    streetName:{type:String},
    totalProperties:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Property",
        default:[] 
    }]
})

export default mongoose.model('Location', LocationSchema)