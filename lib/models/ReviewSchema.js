const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    adminId: {
         type: String, 
         required: true
         },
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
    linkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link',
        required: true
    },  
},
 { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review",reviewSchema);