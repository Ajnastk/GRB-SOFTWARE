const mongoose=require('mongoose');
const express=require('express');
const dotenv=require('dotenv').config();
const cors = require('cors');
const AuthRoute=require('./routes/authRoutes');
const reviewRoutes = require('./routes/ReviewRoute') 
const { notFound, errorHandler } = require('./middlewares/errorhandler');

const app=express();
const PORT=process.env.PORT || 5000;
const MONGO_URL=process.env.MONGO_URI;

app.use(cors());

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
            console.log(`server running on https://localhost:${PORT}`);
        });
    })
    .catch((err)=>{
        console.error('Mongodb connection error:',err.message);
    })
    
