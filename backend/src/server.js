import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import connectDB from './db/connect.mongo.js';
import ApiError from './utils/ApiError.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import {app,server,io} from './utils/socket.js';
import path from 'path';

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  });


  const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, 
};
app.use(cors(corsOptions))
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static('public'))
dotenv.config();
const __dirname=path.resolve();


app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use("/api/auth",authRoutes);
app.use('/api/messages',messageRoutes);
server.listen(process.env.PORT,()=>{
  connectDB();
  console.log('Server is running on port 5000');
});

if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname,'../frontend/dist')));
  app.get('*',(req,res)=>{
      res.sendFile(path.join(__dirname,'../frontend','dist',"index.html"));

})
}