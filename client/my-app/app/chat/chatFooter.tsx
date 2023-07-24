import React, { useState, useRef } from 'react';

const ChatFooter: React.FC<ProfileProps> = ({ state,setState,sender, reciever, sendMessage, message, setMessage }) => {
  const bottomEl = useRef(null);


  const emptyMessageInput = () => {
    const messageInput = (document.getElementById("messageId") as HTMLInputElement);
    messageInput.value = ""    
  }
  return (
    <div className="chat__footer">
      <form ref={bottomEl} className="form">
        <input
          type="text"
          placeholder="Write message"
          className="message"
          id='messageId'
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn" onClick={(e) => { e.preventDefault(); sendMessage(message, sender, reciever);emptyMessageInput();setState(!state) }}>SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;