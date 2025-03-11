import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import Header from '../component/Header';
import Footer from '../component/Footer';
import {useNavigate} from "react-router-dom";
import {authApi} from "../api/authApi";
import {userInfoApi} from "../api/userApi";
import {AuthContext} from "../context/AuthContext";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: Arial, sans-serif;
    overflow: hidden;
`;

const MainSection = styled.main`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: #f9f9f9;
`;

const ContentWrapper = styled.div`
    display: flex;
    width: 90%;
    gap: 2rem;
    @media (max-width: 850px) {
        flex-direction: column;
    }
`;

const LeftContainer = styled.div`
    width: 50%;
    position: relative;
    overflow: hidden;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    @media (max-width: 850px) {
        width: 100%;
        height: 250px;
        border-radius: 8px;
    }
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

const RightContainer = styled.div`
    width: 50%;
    background: #fff;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    @media (max-width: 850px) {
        width: 100%;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: none;
    }
`;

const FormTitle = styled.h2`
    margin-bottom: 1.5rem;
    font-size: 2rem;
`;

const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    font-size: 1.1rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
`;

const Button = styled.button`
    flex: 1;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
`;

const ForgotButton = styled(Button)`
    background-color: #fff;
    color: #000;
    border: 1px solid #ddd;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const LoginButton = styled(Button)`
    background-color: #000;
    color: #fff;
    &:hover {
        background-color: #333;
    }
`;

const SignupButton = styled(Button)`
    width: 100%;
    background-color: #fff;
    color: #000;
    border: 1px solid #ddd;
    margin-top: 1rem;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const SocialLoginContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 1.5rem;
    justify-content: center;
    & > button {
        flex: 0 0 calc((100% - 20px) / 3);
        max-width: calc((100% - 20px) / 3);
    }
    @media (max-width: 600px) {
        & > button {
            flex: 0 0 100%;
            max-width: 100%;
        }
    }
`;

const SocialButton = styled.button`
    height: 50px;
    border: none;
    cursor: pointer;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 5px;
    flex-shrink: 0;
`;

const NaverButton = styled(SocialButton)`
    background-image: url(${process.env.PUBLIC_URL + '/image/NaverLoginBtn.png'});
`;

const GoogleButton = styled(SocialButton)`
    background-image: url(${process.env.PUBLIC_URL + '/image/GoogleLoginBtn.png'});
`;

const KakaoButton = styled(SocialButton)`
    background-image: url(${process.env.PUBLIC_URL + '/image/KakaoLoginBtn.png'});
`;

const SignInPage = () => {

    const navigate = useNavigate();
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useContext(AuthContext);

    const handleNaverLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/naver";

    };

    const handleKakaoLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/kakao";

    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const userData = {email, password};
        try {
            await authApi.login(userData);
            const response = await userInfoApi.userInfo();
            setUser(response.data);
            alert('로그인 성공');
            navigate('/')

        } catch (error) {
            console.error(error);
            alert('회원정보가 일치하지 않습니다.');
        }
    };

    const handleSignUp = (e) => {
        navigate('/signup')
    };

    const onEmailHandle = (e) =>{
        setEmail(e.currentTarget.value);
    }

    const onPasswordHandle = (e) =>{
        setPassword(e.currentTarget.value);
    }

    return (
        <PageContainer>
            <Header />
            <MainSection>
                <ContentWrapper>
                    <LeftContainer>
                        <StyledImage
                            src={process.env.PUBLIC_URL + '/image/SignUpImage.jpg'}
                            alt="Sign Up"
                        />
                    </LeftContainer>
                    <RightContainer>
                        <form onSubmit={handleLoginSubmit}>
                            <FormTitle>Login</FormTitle>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type="email" placeholder="Enter your email" onChange={onEmailHandle} value={email} required />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="password" placeholder="Enter your password" onChange={onPasswordHandle} value={password} required />
                            </FormGroup>
                            <ButtonGroup>
                                <ForgotButton type="button">Forgot Password?</ForgotButton>
                                <LoginButton type="submit">Login</LoginButton>
                            </ButtonGroup>
                            <SignupButton type="button" onClick={handleSignUp}>
                                Sign Up
                            </SignupButton>
                        </form>
                        <SocialLoginContainer>
                            <NaverButton type="button" onClick={handleNaverLogin} />
                            <GoogleButton type="button" onClick={handleGoogleLogin} />
                            <KakaoButton type="button" onClick={handleKakaoLogin} />
                        </SocialLoginContainer>
                    </RightContainer>
                </ContentWrapper>
            </MainSection>
            <Footer />
        </PageContainer>
    );
};

export default SignInPage;
