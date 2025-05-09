import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import VideoChat from "./VideoChat";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    font-family: Arial, sans-serif;
`;

const Main = styled.main`
    flex: 1;
    padding: 20px;
    background-color: #fff;
`;

const TopVideoRow = styled.div`
    display: flex;
    gap: 1rem;
    height: 35vh;
    margin-bottom: 1rem;
`;


const MiddleWrapper = styled.div`
    display: flex;
    gap: 1rem;
    height: 35vh;
    margin-bottom: 1rem;
`;

const ChatArea = styled.div`
    flex: 2;
    background-color: #f9f9f9;
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
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
`;

const MessageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
`;

const MessageSender = styled.div`
    font-weight: bold;
`;

const MessageTime = styled.div`
    font-size: 0.8rem;
    color: #666;
`;

const FileListArea = styled.div`
    flex: 1;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;

const FileListHeader = styled.div`
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const FileList = styled.div`
    flex: 1;
    overflow-y: auto;
    margin-bottom: 1rem;
`;

const FileItem = styled.div`
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
`;

const FileButton = styled.button`
    background-color: #000;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
    &:hover {
        background-color: #333;
    }
`;

const BottomInputRow = styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    background-color: #fff;
    padding: 0 0.5rem;
`;

const BottomInput = styled.input`
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const BottomSendButton = styled.button`
    background-color: #000;
    color: #fff;
    border: none;
    padding: 0.75rem 1rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
    margin-left: 0.5rem;
    &:hover {
        background-color: #333;
    }
`;

const ChatRoom = ({ chatCode, userEmail, userName }) => {
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const messageEndRef = useRef(null);

    useEffect(() => {
        // WebSocket 연결 생성
        const socket = new SockJS(process.env.REACT_APP_API_URL+"/ws-chat");
        const client = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
            onConnect: () => {
                setIsConnected(true);
                // 채팅방 코드에 따른 동적 토픽 구독
                client.subscribe(`/topic/chatroom/${chatCode}`, (message) => {
                    if (message.body) {
                        const receivedMessage = JSON.parse(message.body);
                        setMessages((prev) => [...prev, receivedMessage]);
                    }
                });
            },
            onStompError: (frame) => {
                console.error("Broker error: " + frame.headers["message"]);
                console.error("Details: " + frame.body);
            },
        });
        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, [chatCode]);

    // 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (!stompClient || !stompClient.connected) {
            console.error("STOMP client not connected");
            return;
        }
        if (inputMessage.trim() === "") return;

        const messageDto = {
            chatCode,
            senderEmail: userEmail,
            senderName: userName,
            message: inputMessage,
            createdAt: new Date(),
        };

        stompClient.publish({
            destination: "/app/chat.sendMessage",
            body: JSON.stringify(messageDto),
        });
        setInputMessage("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <Container>
            <Main>
                <TopVideoRow>
                    <VideoChat chatCode={chatCode} />
                </TopVideoRow>

                <MiddleWrapper>
                    <ChatArea>
                        <MessageList>
                            {messages.map((msg, index) => (
                                <MessageBox key={index}>
                                    <MessageHeader>
                                        <MessageSender>{msg.senderName}</MessageSender>
                                        <MessageTime>
                                            {new Date(msg.createdAt).toLocaleTimeString()}
                                        </MessageTime>
                                    </MessageHeader>
                                    <div>{msg.message}</div>
                                </MessageBox>
                            ))}
                            <div ref={messageEndRef} />
                        </MessageList>
                    </ChatArea>
                </MiddleWrapper>

                <BottomInputRow>
                    <BottomInput
                        placeholder="Enter Message"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <BottomSendButton onClick={handleSendMessage}>Send</BottomSendButton>
                </BottomInputRow>
            </Main>
        </Container>
    );
};

export default ChatRoom;
