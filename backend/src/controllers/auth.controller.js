import asyncHandler from "../utils/AsyncHandler.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadFile } from "../utils/Cloudinary.js";

export const signup =asyncHandler( async(req, res) => {

        const {fullName,username,password,confirmPassword,gender,email}   = req.body; 
        if(!email || !fullName || !username || !password || !confirmPassword || !gender ){
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

        const profilePicturePath= req.file ? req.file.path : '';
        let profileUrl='';
        if(profilePicturePath){
           profileUrl=await uploadFile(profilePicturePath);
        }

        const user = await User.create({
            email:email.toLowerCase(),
            fullName,
            username:username.toLowerCase(),
            gender,
            password,
            profilePicture:profileUrl.url

        });
        const createduser=await User.findById(user._id).select('-password');
        
        if(!createduser){
            throw new ApiError(400,'Somthing went wrong');
        }
        return res.status(201).json(
            new ApiResponse(201,'User created successfully',createduser)    
        )
})


export const login =asyncHandler( async(req, res) => {

const {email,username,password} = req.body;
if(!email && !username){
    throw new ApiError(400,'Email or username is required');
};

const user = await User.findOne({
    $or:[{email}, {username:username}]
});

if(!user){
    throw new ApiError(400,'User not found');
}
if(!password){
    throw new ApiError(400,'Password is required');
}

const isPasswordCorrect = await user.isPasswordCorrect(password);

if(!isPasswordCorrect){
    throw new ApiError(400,'Invalid credentials',['Password is incorrect']);
}
const accessToken = await user.generateAccessToken();
const refreshToken = await user.generateRefreshToken();

const options={
    httpOnly:true,
    secure:true
}

return res.status(200)
.cookie("accessToken",accessToken,options)
.cookie("refreshToken",refreshToken,options)
.json(
    new ApiResponse(200,'User logged in successfully',{user,accessToken,refreshToken})
)
})




export const logout =asyncHandler(async(req, res) => {   
    const user=req.user;
    const options={
        httpOnly:true,
        secure:true
    }
    await User.findByIdAndUpdate(user._id,{
        $set:{
            refreshToken:undefined
        }
    });
    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,'User logged out successfully')
    )
})


export const updateProfile = asyncHandler(async (req, res) => {
    try {
      const user = req.user;
  
      // Check if a file is uploaded
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }
  
      const profilePicturePath = req.file.path;
      console.log("File path:", profilePicturePath);
  
      // Upload file to storage (e.g., Cloudinary, S3)
      const profileUrl = await uploadFile(profilePicturePath);
      console.log("Uploaded URL:", profileUrl);
  
      // Update user profile in the database
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { profilePicture: profileUrl.url },
        { new: true }
      ).select("-password");
  
      if (!updatedUser) {
        throw new ApiError(400, "User not found or update failed.");
      }
  
      return res.status(200).json(
        new ApiResponse(200, "Profile updated successfully", updatedUser)
      );
    } catch (err) {
      console.error("Update profile error:", err);
      return res.status(500).json({ message: "Internal server error." });
    }
  });



export const checkUser =asyncHandler(async(req, res) => {
try{
    const user=req.user;
    return res.status(200).json(
        new ApiResponse(200,'User',{user:user})
    )}catch(err){
        throw new ApiError(500,'Internal Server Error');
    }
})