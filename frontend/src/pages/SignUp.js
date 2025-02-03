import React, { useState } from 'react';
import styled from 'styled-components';
import { userApi, checkApi } from '../api/userApi'; // 실제 API 모듈 경로로 수정하세요.
import Header from '../component/Header';
import Footer from '../component/Footer';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: sans-serif;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
`;

const FormContainer = styled.div`
  flex: 1;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  box-sizing: border-box;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 24px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 14px;
`;

const StyledInput = styled.input`
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 8px;
`;

const EmailWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const EmailInput = styled(StyledInput)`
  flex: 1;
  margin-bottom: 0;
`;


const EmailCheckButton = styled.button`
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  margin-left: 8px;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;


const ValidationMessage = styled.p`
  font-size: 12px;
  margin: 4px 0 12px 0;
  min-height: 16px;
  color: ${props => (props.valid ? 'green' : 'red')};
`;


const SubmitButton = styled.button`
  height: 40px;
  margin-top: 16px;
  font-size: 16px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;


const ImageContainer = styled.div`
  flex: 1;
  background-image: url('/image/SignUpImage.jpg'); 
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  min-height: 400px;
`;

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(null);
    const [emailDupValid, setEmailDupValid] = useState(null);
    const [emailMessage, setEmailMessage] = useState('');

    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState(null);
    const [nameMessage, setNameMessage] = useState('');

    const [nickname, setNickname] = useState('');
    const [nicknameValid, setNicknameValid] = useState(null);
    const [nicknameMessage, setNicknameMessage] = useState('');

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(null);
    const [passwordMessage, setPasswordMessage] = useState('');

    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordConfirmValid, setPasswordConfirmValid] = useState(null);
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');


    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            setEmailValid(false);
            setEmailMessage('이메일을 입력해주세요.');
        } else if (!emailRegex.test(value)) {
            setEmailValid(false);
            setEmailMessage('유효하지 않은 이메일 형식입니다.');
        } else {
            setEmailValid(true);
            setEmailMessage('올바른 이메일 형식입니다.');
        }
        setEmailDupValid(null);
    };


    const handleEmailDupCheck = async () => {
        if (!emailValid) {
            alert('유효한 이메일을 입력해주세요.');
            return;
        }
        try {
            const response = await checkApi.checkEmail(email);
            // API에서 response.data가 true이면 이미 사용 중인 경우
            if (response.data === true) {
                setEmailDupValid(false);
                setEmailMessage('이미 사용 중인 이메일입니다.');
            } else {
                setEmailDupValid(true);
                setEmailMessage('사용 가능한 이메일입니다.');
            }
        } catch (error) {
            console.error(error);
            setEmailDupValid(false);
            setEmailMessage('이메일 중복 확인 중 오류가 발생했습니다.');
        }
    };


    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        if (!value.trim()) {
            setNameValid(false);
            setNameMessage('이름을 입력해주세요.');
        } else {
            setNameValid(true);
            setNameMessage('올바른 이름입니다.');
        }
    };


    const handleNicknameChange = (e) => {
        const value = e.target.value;
        setNickname(value);
        if (!value.trim()) {
            setNicknameValid(false);
            setNicknameMessage('닉네임을 입력해주세요.');
        } else {
            setNicknameValid(true);
            setNicknameMessage('올바른 닉네임입니다.');
        }
    };


    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!value) {
            setPasswordValid(false);
            setPasswordMessage('비밀번호를 입력해주세요.');
        } else if (!passwordRegex.test(value)) {
            setPasswordValid(false);
            setPasswordMessage('비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.');
        } else {
            setPasswordValid(true);
            setPasswordMessage('사용 가능한 비밀번호입니다.');
        }

        if (passwordConfirm) {
            if (value === passwordConfirm) {
                setPasswordConfirmValid(true);
                setPasswordConfirmMessage('비밀번호가 일치합니다.');
            } else {
                setPasswordConfirmValid(false);
                setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
            }
        }
    };


    const handlePasswordConfirmChange = (e) => {
        const value = e.target.value;
        setPasswordConfirm(value);
        if (!value) {
            setPasswordConfirmValid(false);
            setPasswordConfirmMessage('비밀번호 확인을 입력해주세요.');
        } else if (value !== password) {
            setPasswordConfirmValid(false);
            setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordConfirmValid(true);
            setPasswordConfirmMessage('비밀번호가 일치합니다.');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !emailValid ||
            emailDupValid !== true ||
            !nameValid ||
            !nicknameValid ||
            !passwordValid ||
            !passwordConfirmValid
        ) {
            alert('모든 필드를 올바르게 입력해주세요.');
            return;
        }
        const userData = { email, name, nickname, password };
        try {
            await userApi.signup(userData);
            alert('회원가입 성공');

        } catch (error) {
            console.error(error);
            alert('회원가입 실패');
        }
    };

    return (
        <Container>
            <Header />
            <Main>
                <ContentWrapper>
                    <FormContainer>
                        <FormTitle>Sign Up</FormTitle>
                        <StyledForm onSubmit={handleSubmit}>

                            <Label>Email</Label>
                            <EmailWrapper>
                                <EmailInput
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                                <EmailCheckButton type="button" onClick={handleEmailDupCheck}>
                                    중복확인
                                </EmailCheckButton>
                            </EmailWrapper>
                            <ValidationMessage valid={emailValid && emailDupValid}>
                                {emailMessage}
                            </ValidationMessage>


                            <Label>Name</Label>
                            <StyledInput
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={handleNameChange}
                                required
                            />
                            <ValidationMessage valid={nameValid}>
                                {nameMessage}
                            </ValidationMessage>


                            <Label>Nickname</Label>
                            <StyledInput
                                type="text"
                                placeholder="Enter your nickname"
                                value={nickname}
                                onChange={handleNicknameChange}
                                required
                            />
                            <ValidationMessage valid={nicknameValid}>
                                {nicknameMessage}
                            </ValidationMessage>


                            <Label>Password</Label>
                            <StyledInput
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            <ValidationMessage valid={passwordValid}>
                                {passwordMessage}
                            </ValidationMessage>


                            <Label>Password Confirm</Label>
                            <StyledInput
                                type="password"
                                placeholder="Confirm your password"
                                value={passwordConfirm}
                                onChange={handlePasswordConfirmChange}
                                required
                            />
                            <ValidationMessage valid={passwordConfirmValid}>
                                {passwordConfirmMessage}
                            </ValidationMessage>

                            <SubmitButton type="submit">Sign Up</SubmitButton>
                        </StyledForm>
                    </FormContainer>
                    <ImageContainer />
                </ContentWrapper>
            </Main>
            <Footer />
        </Container>
    );
};

export default SignUpPage;
