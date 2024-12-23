const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    stars:{
        type:Number,
        required:true,
        min:1,
        max:5,
    },
    description:{
        type:String,
        // required:function(){
        //     return this.star<=3;
        // }
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})

module.exports=mongoose.model("Review",reviewSchema);