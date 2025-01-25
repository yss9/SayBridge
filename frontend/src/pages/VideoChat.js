import React from 'react';
import styled from 'styled-components';
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
    font-size: 100%;
    margin-bottom: 10%;
`;

const Input = styled.input`
    width: 94%;
    padding: 3%;
    margin-bottom:2%;
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
        font-size: 100%;
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

const VideoChatPage = () => {
    return (
        <Container>
            <Header />
            <Main>
                <ContentWrapper>
                    <Title>Welcome to the Video Chat Room</Title>
                    <Subtitle>Join the conversation with your friends and colleagues.</Subtitle>
                    <Input type="text" placeholder="Enter Room ID" />
                    <ButtonRow>
                        <button className="create-room">Create Room</button>
                        <button className="join-room">Join Room</button>
                    </ButtonRow>
                </ContentWrapper>
            </Main>
            <Footer />
        </Container>
    );
};

export default VideoChatPage;