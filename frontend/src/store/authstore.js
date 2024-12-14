import { create } from "zustand";
import { axiosInstance } from "../axios";

export const useAuthStore = create((set, get) => ({
authUser: null,
isSigningUp: false,
isLoggingIn: false,
isUpdatingProfile: false,

isCheckingAuth: true,

checkAuth: async ()=>{
    try{
        const res=await axiosInstance.get('/auth/check');
        set({authUser:res.data.data.user,isCheckingAuth:false});
    }catch(err){
        console.log(err);
        set({authUser:null,isCheckingAuth:false});
    }
    finally{
        set({isCheckingAuth:false});
    }
}
}));
