import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = "http://localhost:5000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers:[0],
  socket:null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
        console.log(res.data.data.user);
        set({ authUser: res.data.data.user });
        get().connectSocket();  
    } catch (err) {
      console.error(err);
      set({ authUser: null });
      toast.error("Failed to verify authentication.");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      await axiosInstance.post("/auth/signup", data);
      toast.success("Signup successful!");
    } catch (err) {
      console.error(err);
      toast.error("Signup failed. Please try again.");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logged out successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to log out. Please try again.");
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("/auth/login", data);
      console.log(res.data.user);
      set({ authUser : res.data.data.user});
      get().connectSocket();
      toast.success("Login successful!");
    } catch (err) {
      toast.error("Login failed. Please try again.");
      throw err;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/auth/updateProfile", data);
      console.log(res.data.data)
      set({ authUser: res.data.data.user });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket:async()=>{
      const {authUser}=get();
      console.log("IN CONNECT SOCKET");
      if(!authUser || get().socket?.connected){
          return;
      } 
      const socket=io(BASE_URL,{
        query:{
          UserId:authUser._id
        }
      });

      socket.connect();
      set({socket:socket});
      socket.on("getOnlineUsers",(userIds)=>{
        console.log("Online Users",userIds);
        set({onlineUsers:userIds});
      })

  },
  disconnectSocket:async()=>{
      const {socket}=get();
      if(socket){
          socket.disconnect();
        }
  },

}));
