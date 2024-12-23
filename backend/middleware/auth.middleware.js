import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const jwtAuth= asyncHandler(async (req,res,next)=>{
try{
    const token= req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ","");
    if(!token){
        throw new ApiError(401,"Unauthorized");
    }
    const decoded=jwt.verify(token,process.env.JWT_ACCESS_SECRET);
   
    const user= await User.findById(decoded._id).select("-password -refreshToken");

    if(!user){
        throw new ApiError(401,"Unauthorized");
    }
    req.user=user;  
    next();

}catch(err){
    throw new ApiError(401,"Unauthorized"); 
}
})