import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 3%;
  background: #f0f0f0;
  font-size: 87.5%;
  overflow: hidden;
`;

const Footer = () => {
    return (
        <FooterContainer>
            &copy; 2025 Language Learning Hub. All Rights Reserved. Privacy Policy | Terms of Use
        </FooterContainer>
    );
};

export default Footer;
