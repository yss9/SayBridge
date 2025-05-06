import React, {use, useContext} from 'react';
import styled from 'styled-components';
import {authApi} from "../api/authApi";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px; 
    padding: 0 8%;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    cursor: pointer;
`;

const Nav = styled.nav`
    display: flex;
    gap: 2rem;
    align-items: center;

    button{
        text-decoration: none;
        border: none;
        background: transparent;
        font-weight: bold;
        cursor: pointer;
        &:hover {
            color: #007BFF;
            text-decoration: underline;
        }
    }
`;

const Header = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const isLoggedIn = !!user;
    const role = user?.role || '';
    const handleGoHome = () =>{
        navigate('/');
    }

    const handleGoMyPage = () =>{
        navigate('/MyPage');
    }

    const handleGoLogin = () =>{
        navigate('/signin');
    }

    const handleGoTeacherProfile = () => {
        navigate(`/teacher/${user.teacherId}`);
    };

    const handleGoVideoChat = () => {
        navigate(`/videochat`);
    };


    const handleLogout = async () => {
        try {
                await authApi.logout();
                setUser(null);
                navigate('/signin');
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }
    };

    return (
        <HeaderContainer>
            <Logo onClick={handleGoHome}>SayBridge</Logo>
            <Nav>
                {isLoggedIn ? (
                    <>
                        <button onClick={handleGoHome}>Home</button>
                        <button onClick={handleGoMyPage}>My Page</button>
                        <button onClick={handleGoVideoChat}>Video Chat</button>
                        {role === "TEACHER" && (
                            <button onClick={handleGoTeacherProfile}>Teacher Profile</button>
                        )}

                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <button onClick={handleGoLogin}>Sign In</button>
                        <button onClick={handleGoHome}>Home</button>
                    </>
                )}

            </Nav>
        </HeaderContainer>
    );
};

export default Header;
