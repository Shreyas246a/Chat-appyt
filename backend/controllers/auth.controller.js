import asyncHandler from "../utils/AsyncHandler.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
export const login = (req, res) => {
    res.send('Login Route');
};


export const signup =asyncHandler( async(req, res) => {
        const {fullName,username,password,confirmPassword,gender,email}   = req.body; 
        if(!email||!fullName || !username || !password || !confirmPassword ){
            return res.status(400).json({message:'All fields are required'});
        }
        if(password !== confirmPassword){
            return res.status(400).json({message:'Password do not match'});
        } 
        const existedUser= await User.findOne({
            $or:[{username,email}]
        })  
        if(existedUser){
            throw new ApiError(400,'User already exists');
        }

        


     
})

export const logout = (req, res) => {   
    res.send('Logout Route');
}       