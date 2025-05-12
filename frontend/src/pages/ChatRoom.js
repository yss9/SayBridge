// ChatRoom.jsx
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import VideoChat from "./VideoChat";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 70vh; 
    overflow: hidden;
`;

const TopRow = styled.div`
    flex: 0 0 35vh;
    overflow: hidden;
`;

const ChatArea = styled.div`
    flex: 0 0 calc(100vh - 65vh);
    display: flex;
    flex-direction: column;
    overflow: hidden;  
`;

const MessageList = styled.div`
    flex: 1;
    min-height: 0;   
    overflow-y: auto;  
    padding: 1rem;
    background: #f9f9f9;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
`;

const MessageBox = styled.div`
    background: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
`;

const MessageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
`;

const MessageSender = styled.div`
    font-weight: bold;
`;

const MessageTime = styled.div`
    font-size: 0.8rem;
    color: #666;
`;

const InputRow = styled.div`
    flex: 0 0 60px; 
    display: flex;
    align-items: center;
    padding: 0 1rem;
    background: #fff;
`;

const Input = styled.input`
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const SendButton = styled.button`
    background: #000;
    color: #fff;
    border: none;
    margin-left: 0.5rem;
    padding: 0.75rem 1rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
    &:hover {
        background: #333;
    }
`;

export default function ChatRoom({ chatCode, userEmail, userName, isInitiator }) {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const endRef = useRef(null);

    useEffect(() => {
        const socket = new SockJS(process.env.REACT_APP_API_URL + "/ws-chat");
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                client.subscribe(`/topic/chatroom/${chatCode}`, msg => {
                    setMessages(prev => [...prev, JSON.parse(msg.body)]);
                });
            },
        });
        client.activate();
        setStompClient(client);
        return () => client.deactivate();
    }, [chatCode]);

    const sendMsg = () => {
        if (!input.trim() || !stompClient?.connected) return;
        const dto = {
            chatCode,
            senderEmail: userEmail,
            senderName: userName,
            message: input,
            createdAt: new Date().toISOString(),
        };
        stompClient.publish({
            destination: "/app/chat.sendMessage",
            body: JSON.stringify(dto),
        });
        setInput("");
    };

    // 자동 스크롤
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <Container>
            <TopRow>
                <VideoChat
                    chatCode={chatCode}
                    currentUser={{ name: userName }}
                    isInitiator={isInitiator}
                />
            </TopRow>
            <ChatArea>
                <MessageList>
                    {messages.map((msg, idx) => (
                        <MessageBox key={idx}>
                            <MessageHeader>
                                <MessageSender>{msg.senderName}</MessageSender>
                                <MessageTime>
                                    {new Date(msg.createdAt).toLocaleTimeString()}
                                </MessageTime>
                            </MessageHeader>
                            <div>{msg.message}</div>
                        </MessageBox>
                    ))}
                    <div ref={endRef} />
                </MessageList>
                <InputRow>
                    <Input
                        placeholder="Enter Message"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyPress={e => e.key === "Enter" && sendMsg()}
                    />
                    <SendButton onClick={sendMsg}>Send</SendButton>
                </InputRow>
            </ChatArea>
        </Container>
    );
}
