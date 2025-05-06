import React, { useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ChatRoom from "./ChatRoom";

const Page = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Main = styled.main`
    flex: 1;
    background: #fff;
    padding: 20px;
`;

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 1.25rem;
`;

export default function ChatRoomPage() {
    const { chatCode } = useParams();
    const { state } = useLocation();
    const isInitiator = state?.isInitiator === true;
    const { user } = useContext(AuthContext);

    return (
        <Page>
            <Header />
            <Main>
                <Wrapper>
                    <Title>채팅방 코드: {chatCode}</Title>
                    {user ? (
                        <ChatRoom
                            chatCode={chatCode}
                            userEmail={user.email}
                            userName={user.name}
                            isInitiator={isInitiator}
                        />
                    ) : (
                        <p>로그인이 필요합니다.</p>
                    )}
                </Wrapper>
            </Main>
            <Footer />
        </Page>
    );
}
