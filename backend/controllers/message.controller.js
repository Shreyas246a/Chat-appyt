import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import asyncHandler from "../utils/AsyncHandler.js";
import Messages from "../models/message.model.js";
import { uploadFile } from "../utils/Cloudinary.js";

export const getAllUsers = asyncHandler(async (req, res) => {
const currUser=req.user;
const users = await User.find({_id:{$ne:currUser._id}}).select('-password');
console.log(users);
return res.status(200).json(
    new ApiResponse(200,'All users',users)
)
});

export const getUserById = asyncHandler(async (req, res) => {
const {reqId}=req.params;
const user = await User.findById(reqId).select('-password -refreshToken');

if(!user){
    throw new ApiError(404,'User not found');
}

return res.status(200).json(
    new ApiResponse(200,'User',user)
)
});

export const getMessages = asyncHandler(async (req, res) => {
try{
const {id:userToChatId}=req.params;
const myId=req.user._id;

const messsages=await Messages.find({
    $or:[
        {senderId:myId,receiverId:userToChatId},
        {senderId:userToChatId,receiverId:myId}
    ]
})
return res.status(200).json(
    new ApiResponse(200,'Messages',messsages)
)
}catch(err){   
    throw new ApiError(500,'Internal Server Error');
}

})

export const sendMessage = asyncHandler(async (req, res) => {  
    try{
        const {text}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        const image = req.file?.path;
        let imgUrl
        console.log(req.file);
        if(image){
            imgUrl=await uploadFile(image);
            console.log(imgUrl);
        }
        const newMessage=await Messages.create({
            senderId,
            receiverId,
            text,
            image:imgUrl?.url || ''
        })
        await newMessage.save();
        console.log(newMessage);
        res.status(201).json(
            new ApiResponse(201,'Message sent',newMessage)
        )
    }catch(err){
        console.log(err);   
        throw new ApiError(500,'Internal Server Error');
    }


 });