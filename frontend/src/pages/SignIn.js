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
    padding: 5%;
    background-color: #f9f9f9;
    overflow: hidden;
`;

const ContentWrapper = styled.div`
    display: flex;
    gap: 5%;
    max-width: 80%;
    width: 100%;
`;

const ImageContainer = styled.div`
    flex: 1;
    background-image: url('/image/SignUpImage.jpg'); /* Replace with the correct path */
    background-size: cover;
    background-position: center;
    border-radius: 2%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const LoginForm = styled.div`
    flex: 1;
    background: white;
    padding: 5%;
    border-radius: 2%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 50%;
    width: 100%;

    h2 {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    p {
        margin-bottom: 2rem;
        color: #555;
    }

    label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    input {
        width: 100%;
        padding: 0.75rem;
        margin-bottom: 1.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .button-row {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;

        button {
            flex: 1;
            padding: 0.75rem;
            font-size: 1rem;
            font-weight: bold;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .forgot-button {
            background: white;
            color: black;
            border: 1px solid #ddd;

            &:hover {
                background: #f0f0f0;
            }
        }

        .login-button {
            background: black;
            color: white;

            &:hover {
                background: #333;
            }
        }
    }

    .signup-button {
        width: 100%;
        background: white;
        color: black;
        border: 1px solid #ddd;
        padding: 0.75rem;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background: #f0f0f0;
        }
    }

    .social-login {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;

        button {
            flex: 1;
            padding: 0.75rem;
            margin: 0 0.25rem;
            background: white;
            color: black;
            border: 1px solid #ddd;
            border-radius: 4px;

            &:hover {
                background: #f0f0f0;
            }
        }
    }
`;

const SignInPage = () => {
    return (
        <Container>
            <Header />
            <Main>
                <ContentWrapper>
                    <ImageContainer />
                    <LoginForm>
                        <h2>Login</h2>
                        <p>Please login to access your account</p>
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" required />

                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" required />

                        <div className="button-row">
                            <button className="forgot-button">Forgot Password?</button>
                            <button className="login-button">Login</button>
                        </div>

                        <button className="signup-button">Sign Up</button>

                        <div className="social-login">
                            <button>네이버 로그인</button>
                            <button>구글 로그인</button>
                            <button>카카오 로그인</button>
                        </div>
                    </LoginForm>
                </ContentWrapper>
            </Main>
            <Footer />
        </Container>
    );
};

export default SignInPage;