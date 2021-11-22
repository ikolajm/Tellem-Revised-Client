import { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import APIURL from "../../environment/urlSwitch";

export default (conversationId: number, receieveMessage: any) => {
    const socketRef: any = useRef();
    let roomId = conversationId ? conversationId : ''

    useEffect(() => {
      // Creates a WebSocket connection
      socketRef.current = socketIOClient(APIURL, {
        query: { roomId },
      });
      
      // Listens for incoming messages
      socketRef.current.on("NEW_MESSAGE", (feed: any) => {
        // newMessage = newMessage.message;
        // console.log("usechat, message receieved", newMessage)
        receieveMessage(feed.feed)
      });
      
      // Destroys the socket reference
      // when the connection is closed
      return () => {
        socketRef.current.disconnect();
      };
    }, [roomId]);
  
    // Sends a message to the server that
    // forwards it to all users in the same room
    const sendMessage = (feed: any) => {
        socketRef.current.emit("NEW_MESSAGE", {
            feed
        });
    };
  
    //  return functions and message (DONE: send message, | TODO: editMessage, deleteMessage)
    return { sendMessage };
}