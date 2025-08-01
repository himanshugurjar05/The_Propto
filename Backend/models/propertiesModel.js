import mongoose from "mongoose";

let PropertySchema = new mongoose.Schema({
    propertyPoster:{type:String, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7dec5Z0mPwFCnYkYd0m83tcwz450Q3DDPhw&s"},
    propertyName:{type:String, default:""},
    propertyType:{
        type:String,
        enum:["Plot","Flat","Independent Home"],
        default:"Flat"
    },
    propertyPrice:{type:Number},
    totalLocation:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Location",
          default:[]
      }]  
})

export default mongoose.model('Property', PropertySchema)