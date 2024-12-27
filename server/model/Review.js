const mongoose = require('mongoose');
// const { default: Rating } = require('../../client/src/components/user/Rating');

const reviewSchema = new mongoose.Schema({
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5,
    },
    description:{
        type:String,
        // required:function(){
        //     return this.star<=3;
        // },
        // required:true,
        trim:true
    },
    adminId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Admin',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})

module.exports=mongoose.model("Review",reviewSchema);