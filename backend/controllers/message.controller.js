import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import asyncHandler from "../utils/AsyncHandler.js";
import Messages from "../models/message.model.js";

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
        const {id:reciverId}=req.params;
        const senderId=req.user._id;
        const image = req.files?.image;

        let imgUrl
        if(image){
            imgUrl=await uploadFile(image);
        }
        const newMessage=await Messages.create({
            senderId,
            reciverId,
            text,
            image:imgUrl.url || ''
        })

        await newMessage.save();


    }catch(err){
        throw new ApiError(500,'Internal Server Error');
    }


 });