import { Server } from "socket.io";
import http from "http";
import express from "express";

const app=express();
const server=http.createServer(app);


const io=new Server(server,{cors:{origin:'http://localhost:5173',
                    credentials:true}});


const onlineUsersMap={}

 const getReceiverId=(UserId)=>{
    return onlineUsersMap[UserId]; 

}
io.on("connection",(socket)=>{
    console.log('User connected',socket.id);
    const UserId=socket.handshake.query.UserId;
    console.log('UserId',UserId);
    if(UserId){
        console.log('UserId',UserId);
        onlineUsersMap[UserId]=socket.id;
    } 
    io.emit("getOnlineUsers",Object.keys(onlineUsersMap));
    socket.on("disconnect",()=>{
        console.log('User disconnected',socket.id);
        delete onlineUsersMap[UserId];
        io.emit("getOnlineUsers",Object.keys(onlineUsersMap));
    })
})

export {io,server,app,getReceiverId};