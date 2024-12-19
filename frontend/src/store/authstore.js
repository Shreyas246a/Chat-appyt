import { create } from "zustand";
import { axiosInstance } from "../axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      console.log(res.data.data.user);
      set({ authUser: res.data.data.user });
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
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data});
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
      console.log(get().authUser);
      toast.success("Login successful!");
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
