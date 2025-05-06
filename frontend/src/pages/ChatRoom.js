import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import VideoChat from "./VideoChat";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Main = styled.main`
    flex: 1;
    padding: 20px;
    background: #fff;
`;

const TopRow = styled.div`
    display: flex;
    gap: 1rem;
    height: 35vh;
    margin-bottom: 1rem;
`;

const ChatArea = styled.div`
    flex: 2;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;

const MessageList = styled.div`
    flex: 1;
    overflow-y: auto;
    margin-bottom: 1rem;
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

const BottomRow = styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    background: #fff;
    padding: 0 0.5rem;
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
    padding: 0.75rem 1rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
    margin-left: 0.5rem;
    &:hover { background: #333; }
`;

export default function ChatRoom({ chatCode, userEmail, userName, isInitiator }) {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const endRef = useRef(null);

    // 채팅용 STOMP 연결
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

    // 메시지 전송
    const sendMsg = () => {
        if (!input.trim() || !stompClient?.connected) return;
        const dto = {
            chatCode,
            senderEmail: userEmail,
            senderName: userName,
            message: input,
            createdAt: new Date(),
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
            <Main>
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
                    <BottomRow>
                        <Input
                            placeholder="Enter Message"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={e => e.key === "Enter" && sendMsg()}
                        />
                        <SendButton onClick={sendMsg}>Send</SendButton>
                    </BottomRow>
                </ChatArea>
            </Main>
        </Container>
    );
}
