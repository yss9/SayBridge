import React from 'react';
import styled from 'styled-components';

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
`;

const Nav = styled.nav`
    display: flex;
    gap: 2rem;
    align-items: center;

    a {
        text-decoration: none;
        color: #333;
        font-weight: bold;
        transition: color 0.2s ease, text-decoration 0.2s ease;

        &:hover {
            color: #007BFF;
            text-decoration: underline;
        }
    }
`;

const Header = () => {
    return (
        <HeaderContainer>
            <Logo>SayBridge</Logo>
            <Nav>
                <a href="#home">Home</a>
                <a href="#about">About Us</a>
                <a href="#sign-in">Sign In</a>
            </Nav>
        </HeaderContainer>
    );
};

export default Header;
