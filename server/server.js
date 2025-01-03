const mongoose=require('mongoose');
const express=require('express');
const dotenv =require('dotenv').config();
const cors = require('cors');
const AuthRoute=require('./routes/authRoutes');
const reviewRoutes = require('./routes/ReviewRoute') 
const { notFound, errorHandler } = require('./middlewares/errorhandler');

const app=express();
const PORT=process.env.PORT || 5000;
const MONGO_URL=process.env.MONGO_URI;
const FRONTEND_URL=process.env.FRONTEND_URL || "http://localhost:3001";


app.use(cors({
    origin:FRONTEND_URL,
    credentials:true,
    methods: ["GET", "POST"],

}));



require('dotenv').config();
console.log("Environment variables loaded:", process.env.CLOUDINARY_CLOUD_NAME);



app.use(express.json());
app.use('/api', AuthRoute);
app.use('/api', reviewRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Backend is running!' });
});


// Status route
app.get('/status', (req, res) => {
    res.json({ message: 'Backend is running and ready to accept requests!' });
});


// Error Handling Middleware (should be last)
app.use(notFound);
app.use(errorHandler);

mongoose.connect(MONGO_URL)
    .then(()=>{
        console.log(`Mongodb connection successfully`);
        app.listen(PORT,()=>{
            console.log(`server running on http://localhost/${PORT}`);
        });
    })
    .catch((err)=>{
        console.error('Mongodb connection error:',err.message);
    })
    
