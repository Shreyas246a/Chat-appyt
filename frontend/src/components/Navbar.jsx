import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { LogOut, MessageSquare, Settings } from "lucide-react";

export const Navbar = () => {

    const {authUser,logout} = useAuthStore();
 return(
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">

        <div className="container mx-auto flex px-4 h-16">
        <div className="flex items-center justify-between h-full"> 
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="size-9 text-primary"></MessageSquare>
            </div>
            <h1 className="text-lg font-bold">Chatty</h1>
        </Link>
        </div>
        <div className="flex items-center gap-2 h-16">   
            <Link to={"/settings"}
            className={'btn btn-sm gap-2 transition-colors'}>
                <Settings className="size-6 text-primary cursor-pointer"></Settings>
            </Link>
            {authUser && <>
            <Link to={"/profile"} className={'btn btn-sm gap-2'}>
            <span className="hidden sm:inline">Profile</span>
            </Link>
            <button onClick={logout} className={'btn btn-sm gap-2'}>
                <LogOut></LogOut>
            <span className="hidden sm:inline">Logout</span>
          </button>
            </>}
          
        </div>
        </div>

    </header>
 )
}