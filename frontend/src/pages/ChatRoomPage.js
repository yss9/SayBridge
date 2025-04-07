// src/pages/ChatRoomPage.js
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ChatRoom from "./ChatRoom";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Main = styled.main`
    flex: 1;
    background-color: #fff;
    padding: 20px;
`;

const InnerWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const ChatRoomTitle = styled.h2`
    margin-bottom: 20px;
    font-size: 1.25rem;
`;

const ChatRoomPage = () => {
    const { chatCode } = useParams();
    const { user } = useContext(AuthContext);
    return (
        <PageContainer>
            <Header />
            <Main>
                <InnerWrapper>
                    <ChatRoomTitle>채팅방: {chatCode}</ChatRoomTitle>
                    {user ? (
                        <ChatRoom
                            chatCode={chatCode}
                            userEmail={user.email}
                            userName={user.name}
                        />
                    ) : (
                        <p>로그인이 필요합니다.</p>
                    )}
                </InnerWrapper>
            </Main>
            <Footer />
        </PageContainer>
    );
};

export default ChatRoomPage;
