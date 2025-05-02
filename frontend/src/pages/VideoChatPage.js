// src/pages/VideoChatPage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from '../component/Footer';
import Header from '../component/Header';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: Arial, sans-serif;
    overflow: hidden;
`;

const Main = styled.main`
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4a4a4a;
    color: white;
    text-align: center;
    padding: 2rem;
`;

const ContentWrapper = styled.div`
    max-width: 600px;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

const Subtitle = styled.p`
    font-size: 1rem;
    margin-bottom: 10%;
`;

const Input = styled.input`
    width: 94%;
    padding: 3%;
    margin-bottom: 2%;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
`;

const ButtonRow = styled.div`
    display: flex;
    gap: 4%;
    justify-content: space-between;
    width: 100%;

    button {
        flex: 1;
        padding: 2.5%;
        font-size: 1rem;
        font-weight: bold;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .create-room {
        background: white;
        color: black;
        border: 1px solid #ddd;

        &:hover {
            background: #f0f0f0;
        }
    }

    .join-room {
        background: black;
        color: white;

        &:hover {
            background: #333;
        }
    }
`;

const ErrorMessage = styled.p`
    color: red;
    margin-top: 1rem;
`;

const VideoChatPage = () => {
    const [roomId, setRoomId] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleCreateRoom = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL+"/chatrooms", null, {
                params: { maxParticipants: 5 },
                withCredentials:true
            });
            const chatRoom = response.data;
            navigate(`/chatroom/${chatRoom.chatCode}`);
        } catch (err) {
            console.error(err);
            setError("채팅방 생성에 실패했습니다.");
        }
    };

    const handleJoinRoom = () => {
        if (roomId.trim() === "") {
            setError("Room ID를 입력해주세요.");
            return;
        }
        navigate(`/chatroom/${roomId}`);
    };

    return (
        <Container>
            <Header />
            <Main>
                <ContentWrapper>
                    <Title>Welcome to the Video Chat Room</Title>
                    <Subtitle>Join the conversation with your friends and colleagues.</Subtitle>
                    <Input
                        type="text"
                        placeholder="Enter Room ID"
                        value={roomId}
                        onChange={(e) => {
                            setRoomId(e.target.value);
                            setError("");
                        }}
                    />
                    <ButtonRow>
                        <button className="create-room" onClick={handleCreateRoom}>
                            Create Room
                        </button>
                        <button className="join-room" onClick={handleJoinRoom}>
                            Join Room
                        </button>
                    </ButtonRow>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </ContentWrapper>
            </Main>
            <Footer />
        </Container>
    );
};

export default VideoChatPage;
