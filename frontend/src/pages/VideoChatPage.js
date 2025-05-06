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
    overflow: hidden;
`;

const Main = styled.main`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #4a4a4a;
    color: white;
    padding: 2rem;
    text-align: center;
`;

const Content = styled.div`
    max-width: 600px;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 1rem;
`;

const Subtitle = styled.p`
    margin-bottom: 10%;
`;

const Input = styled.input`
    width: 94%;
    padding: 3%;
    margin-bottom: 2%;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 1rem;
`;

const Row = styled.div`
    display: flex;
    gap: 4%;
    button {
        flex: 1;
        padding: 2.5%;
        border: none;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
    }
    .create {
        background: white;
        color: black;
        &:hover { background: #f0f0f0; }
    }
    .join {
        background: black;
        color: white;
        &:hover { background: #333; }
    }
`;

const Error = styled.p`
    color: red;
    margin-top: 1rem;
`;

export default function VideoChatPage() {
    const [roomId, setRoomId] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleCreate = async () => {
        try {
            const response = await axios.post(
                process.env.REACT_APP_API_URL + "/chatrooms",
                null,
                {
                    params: { maxParticipants: 5 },
                    withCredentials: true
                }
            );
            const chatRoom = response.data;
            navigate(`/chatroom/${chatRoom.chatCode}`, { state: { isInitiator: true } });
        } catch (err) {
            console.error(err);
            setError("채팅방 생성에 실패했습니다.");
        }
    };

    const handleJoin = () => {
        if (!roomId.trim()) {
            setError("Room ID를 입력하세요");
            return;
        }
        navigate(`/chatroom/${roomId}`, { state: { isInitiator: false } });
    };

    return (
        <Container>
            <Header />
            <Main>
                <Content>
                    <Title>Welcome to Video Chat</Title>
                    <Subtitle>Enter or create a room to start</Subtitle>
                    <Input
                        placeholder="Enter Room ID"
                        value={roomId}
                        onChange={e => { setRoomId(e.target.value); setError(""); }}
                    />
                    <Row>
                        <button className="create" onClick={handleCreate}>Create Room</button>
                        <button className="join" onClick={handleJoin}>Join Room</button>
                    </Row>
                    {error && <Error>{error}</Error>}
                </Content>
            </Main>
            <Footer />
        </Container>
    );
}
