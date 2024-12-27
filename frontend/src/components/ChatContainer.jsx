import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { MessageSkeleton } from "./skeletons/MessageSkeleton";
export const ChatContainer = () => {

const {messages,getMessages,isMessageLoading,selectedUser}=useChatStore();

useEffect(()=>{
    getMessages();
},[selectedUser,getMessages])

if(isMessageLoading)
    return (
        <div className="flex-1 flex-col overflow-auto">
            <ChatHeader/>
            <MessageSkeleton/>
            <MessageInput/> 
        </div>
    )


return(
    <div className="flex-1 flex-col overflow-auto">
        <ChatHeader/>
        <p>messages</p>
        <MessageInput/> 

    </div>
)


};