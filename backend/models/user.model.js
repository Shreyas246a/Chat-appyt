import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({

    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        tolowercase:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },  
    password:{
        type:String,
        required:true
    },  
    gender:{
        type:String,
        required:true,
        enum:['male','female']
    },
    profilePicture:{
        type:String,
        default:''
    },
    refreshToken:{
        type:String,
        default:''
    },
},{
    timestamps:true
})


userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
      return next();
    }
    this.password = await bcrypt.hash(this.password,12);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken =async function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName,
    },process.env.JWT_ACCESS_SECRET,{ expiresIn: '15m' });
}

userSchema.methods.generateRefreshToken =async function(){
    return jwt.sign({
        _id:this._id,

},process.env.JWT_REFRESH_SECRET,{ expiresIn: '7d' });
}

export default mongoose.model('User',userSchema);