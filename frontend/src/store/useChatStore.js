import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios";
import { useAuthStore } from "./authstore";



export const useChatStore = create((set,get) => ({
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
            const {selectedUser}=get();
            const res=await axiosInstance.get(`messages/Messages/${selectedUser._id}`);
            set({messages:res.data.data});
        }catch(err){
            console.log(err);
            toast.error("Failed to fetch messages");
        }
        finally{
            set({isMessageLoading:false});
    }

},
sendMessage:async(messageData)=>{
    const {selectedUser,messages}=get();

    try{
        const res =await axiosInstance.post(`messages/SendMessage/${selectedUser._id}`,messageData);
        console.log(res.data.data);
        set({messages:[...messages,res.data.data]}); 
    }catch(err){
        toast.error("Failed to send message");
    }
},

subscribeToMessages:()=>{
    const {selectedUser}=get();
    const socket=useAuthStore.getState().socket;
    if(!selectedUser) return;
    socket.on("newMessage",(data)=>{
        if(data.senderId!==selectedUser._id)return;
        set({messages:[...get().messages,data]});
    })

},
unSubscribeToMessages:()=>{
    const socket=useAuthStore.getState().socket;
    socket.off("newMessage");
}
,
setSelectedUser:(selectedUser)=>{   
    set({selectedUser});
},
}
))