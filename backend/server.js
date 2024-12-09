import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import connectDB from './db/connect.mongo.js';
import ApiError from './utils/ApiError.js';
const app=express();
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  });


app.use(express.json());
app.use(cors());
dotenv.config();
app.listen(process.env.PORT,()=>{
    connectDB();
    console.log('Server is running on port 5000');
});


app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use("/api/auth",authRoutes);

