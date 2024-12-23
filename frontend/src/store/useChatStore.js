import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../axios";



export const useChatStore = create((set) => ({
messages: [],
users: [],
selectedUser: null,
isUserLoading: false,
isMessageLoading: false,


getUsers:async()=>{
    set({isUserLoading:true});
    try{
        const res= await axiosInstance.get('/messages/Users');
        console.log(res.data);

        set({users:res.data.data});
        
    }catch(err){
        toast.error("Failed to fetch users");
    }
    finally{
        set({isUserLoading:false});
    }
},
    getMessages:async()=>{
        set({isMessageLoading:true});
        try{
            const res=await axiosInstance.get(`/Messages/${selectedUser._id}`);
            set({messages:res.data.data});
        }catch{
            toast.error("Failed to fetch messages");
        }
        finally{
            set({isMessageLoading:false});
    }

},

setSelectedUser:(selectedUser)=>{   
    set({selectedUser});
},
}
))