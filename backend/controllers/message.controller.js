import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/User.js";
import asyncHandler from "../utils/AsyncHandler.js";

export const getAllUsers = asyncHandler(async (req, res) => {
const currUser=req.user;
const users = await User.find({_id:{$ne:currUser._id}}).select('-password');
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
