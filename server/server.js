const mongoose=require('mongoose');
const express=require('express');
const dotenv=require('dotenv').config();


const cors=require('cors');
const Authroute=require('./routes/authRoutes');
const reviewRoutes = require('./routes/ReviewRoute') 

const app=express();
const PORT=process.env.PORT || 5000;
const MONGO_URL=process.env.MONGO_URI;

app.use(cors());

app.use(express.json());
app.use('/api',Authroute);
app.use('/api',reviewRoutes);


mongoose.connect(MONGO_URL)
    .then(()=>{
        console.log(`Mongodb connection successfully`);
        app.listen(PORT,()=>{
            console.log(`server running on https://localhost:${PORT}`);
        });
    })
    .catch((err)=>{
        console.error('Mongodb connection error:',err.message);
    })
    