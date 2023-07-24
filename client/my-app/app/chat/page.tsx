"use client"
import React, { useState, useEffect, useContext } from 'react';
import "./chat.css"
import { io } from 'socket.io-client';
import axios from 'axios';
import { AuthContext } from '@/components/isAuth/authContext'
import ChatFooter from './chatFooter';
import ChatBody from './chatBody';
// import ChatBar from './chatBar';
let socket = io("http://localhost:8080", { transports: ["websocket"] })


const Chat: React.FC<ProfileProps> = () => {

    const [message, setMessage] = useState("")
    const [messageSend, setMessageSend] = useState("")
    const [arr, setArr] = useState([])
    const [state, setState] = useState(false)
    // const [sender,setSender]=useState(0)
    // const [reciever,setReciever]=useState(0)
    const user = sessionStorage.getItem("userId")
    const role = sessionStorage.getItem("userRole")
    let sender = 0
    let reciever = 0


    const roles = () => {
        if (role === "admin") {
            sender = 2
            reciever = 6
        }
        else {
            sender = 6
            reciever = 2
        }
    }
    roles()




    const sendMessage = (msg: string, send: number, recieve: number) => {
        socket.emit("send-message", { message: msg })
        axios.post(`http://127.0.0.1:3000/chat/post/${send}/${recieve}`, {
            content: msg
        })
            .then((res) => { setState(!state) })
            .catch((err) => console.log(err)
            )
    }

    console.log("arr", arr);

    

    useEffect(() => {
        socket.on("receive-message", (data: any) => {
            fetch(sender, reciever)
        });
        roles()
        fetch(sender, reciever)
    }, [state])

    const fetch = (send: number, recieve: number) => {
        axios.get(`http://127.0.0.1:3000/chat/all/${send}/${recieve}`)
            .then((res) => {
                setArr(res.data.filter((elem) => { return elem.senderId === sender && elem.recipientId === reciever || elem.senderId === reciever && elem.recipientId === sender })
                )
                setState(!state)
            })
            .catch((err) => console.log(err)
            )
    }

    return (
        <div className="chat">
            {/* <ChatBar /> */}
            <div className="chat__main">
                <ChatBody arr={arr} sender={sender} reciever={reciever} />
                <ChatFooter message={message} sender={sender} reciever={reciever} sendMessage={sendMessage} state={state}  setState={setState} setMessage={setMessage} />
            </div>
        </div>
    )
}



export default Chat;