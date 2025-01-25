import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  flex: 0 0 4%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8%;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
`;

const Logo = styled.div`
  font-size: 150%;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20%;
  flex-wrap: nowrap;

  a {
    text-decoration: none;
    color: black;
    font-weight: bold;
    &:hover {
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