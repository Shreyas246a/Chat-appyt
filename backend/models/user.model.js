import bcrypt from "bcryptjs";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
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

userSchema.methods.isPasswordcorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}



export default mongoose.model('User',userSchema);