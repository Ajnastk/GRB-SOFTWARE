const mongoose=require('mongoose');

const AdminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
    },
    password:{
        type:String,
        required:true,

    },
 },
  {timestamps:true},
);

module.exports = mongoose.model('Admin',AdminSchema);