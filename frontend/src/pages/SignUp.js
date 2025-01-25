import React, { useState } from 'react';
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

const Form = styled.form`
    background: white;
    padding: 5%;
    border-radius: 2%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 50%;
    width: 100%;

    h2 {
        margin-bottom: 5%;
        font-size: 150%;
        text-align: center;
    }

    label {
        display: block;
        margin-bottom: 2%;
        font-weight: bold;
    }

    input {
        width: 100%;
        padding: 2%;
        margin-bottom: 5%;
        border: 1px solid #ddd;
        border-radius: 2%;
        font-size: 100%;
    }

    button {
        width: 100%;
        padding: 3%;
        font-size: 100%;
        background: black;
        color: white;
        border: none;
        border-radius: 2%;
        cursor: pointer;

        &:hover {
            background: #333;
        }
    }
`;

const CountryContainer = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 5%;
    justify-content: space-between;
`;

const CountryButton = styled.button`
    flex: 1 1 calc(25% - 12px);
    max-width: calc(25% - 12px);
    padding: 8px;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: ${(props) => (props.isActive ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)')};
    color: black; /* Black font color */
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.2s, border-color 0.2s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1); /* Slightly darker gray on hover */
        border-color: #ccc;
    }

    &:active {
        background-color: rgba(0, 0, 0, 0.2); /* Darker gray on active */
    }
`;

const ImageContainer = styled.div`
    background-image: url('/image/SignUpImage.jpg'); /* public/image/SignUpImage.jpg */
    background-size: cover; /* 이미지가 컨테이너를 가득 채우도록 설정 */
    background-position: center; /* 이미지를 가운데로 위치 */
    border-radius: 2%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 50%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 100%;
    color: #666;
`;

const DateContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 5%;
`;

const Select = styled.select`
    flex: 1;
    padding: 2%;
    border: 1px solid #ddd;
    border-radius: 2%;
    font-size: 100%;
    cursor: pointer;
`;

const SignUpPage = () => {
    const [activeCountry, setActiveCountry] = useState(null);
    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');

    const handleCountryClick = (country) => {
        setActiveCountry(country);
    };

    const handleYearChange = (e) => {
        setBirthYear(e.target.value);
    };

    const handleMonthChange = (e) => {
        setBirthMonth(e.target.value);
    };

    const handleDayChange = (e) => {
        setBirthDay(e.target.value);
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <Container>
            <Header/>
            <Main>
                <ContentWrapper>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <h2>Sign Up</h2>
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" required />

                        <label>Name</label>
                        <input type="text" placeholder="Enter your name" required />

                        <label>Birthdate</label>
                        <DateContainer>
                            <Select value={birthYear} onChange={handleYearChange} required>
                                <option value="" disabled>Select Year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </Select>
                            <Select value={birthMonth} onChange={handleMonthChange} required>
                                <option value="" disabled>Select Month</option>
                                {months.map((month) => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </Select>
                            <Select value={birthDay} onChange={handleDayChange} required>
                                <option value="" disabled>Select Day</option>
                                {days.map((day) => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </Select>
                        </DateContainer>

                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" required />

                        <label>Password Confirm</label>
                        <input type="password" placeholder="Confirm your password" required />

                        <label>Country</label>
                        <CountryContainer>
                            {['USA', 'Canada', 'UK', 'KR'].map((country) => (
                                <CountryButton
                                    key={country}
                                    isActive={activeCountry === country}
                                    onClick={() => handleCountryClick(country)}
                                >
                                    {country}
                                </CountryButton>
                            ))}
                        </CountryContainer>

                        <button type="submit">Sign Up</button>
                    </Form>
                    <ImageContainer/>
                </ContentWrapper>
            </Main>
            <Footer/>
        </Container>
    );
};

export default SignUpPage;