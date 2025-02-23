import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import {courseApi} from "../api/courseApi";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    box-sizing: border-box;
`;

const Introduce = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BannerSection = styled.section`
    width: 100%;
    padding: 80px 20px;
    background: #f0f0f0;
    text-align: center;
`;

const BannerContent = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;

    h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
    }
`;

const JoinButton = styled.button`
    padding: 0.8rem 1.6rem;
    border: none;
    background: #007bff;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 4px;
`;

const InstructorSection = styled.section`
    width: 100%;
    max-width: 1000px;
    padding: 60px 20px;
    margin: 0 auto;
    text-align: center;
    background: #fff;
`;

const InstructorTitle = styled.h2`
    font-size: 2rem;
    margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
    color: #888;
    margin-bottom: 1rem;
`;

const Description = styled.p`
    max-width: 600px;
    margin: 0 auto 2rem auto;
    line-height: 1.5;
`;

const MeetInstructorButton = styled.button`
    padding: 0.6rem 1.2rem;
    border: 1px solid #007bff;
    background: #fff;
    color: #007bff;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        background: #007bff;
        color: #fff;
    }
`;

const FeaturedCoursesSection = styled.section`
    width: 100%;
    padding: 60px 20px;
    background: #fafafa;
`;

const SectionHeader = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: 0 auto 2rem auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
        font-size: 1.8rem;
    }
`;

const ViewAllButton = styled.button`
    padding: 0.6rem 1rem;
    border: none;
    background: #007bff;
    color: #fff;
    cursor: pointer;
    border-radius: 4px;
`;

const CourseCards = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
`;

const CourseCard = styled.div`
    flex: 1 1 30%;
    min-width: 250px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 1rem;
    text-align: center;

    .img-placeholder {
        width: 100%;
        height: 120px;
        background: #ccc;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #555;
    }

    h3 {
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
    }
`;

const TopicsSection = styled.section`
    width: 100%;
    padding: 60px 20px;
    background: #fff;
`;

const ExploreButton = styled.button`
    padding: 0.6rem 1rem;
    border: 1px solid #28a745;
    background: #28a745;
    color: #fff;
    cursor: pointer;
    border-radius: 4px;
`;

const TopicsContainer = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const TopicCard = styled.div`
    background: #f9f9f9;
    padding: 1rem;
    border-radius: 4px;
`;

const TestimonialsSection = styled.section`
    width: 100%;
    padding: 60px 20px;
    background: #fafafa;
    text-align: center;

    h2 {
        margin-bottom: 1rem;
    }
`;

const ReadMoreButton = styled.button`
    margin-bottom: 2rem;
    padding: 0.6rem 1rem;
    border: 1px solid #007bff;
    background: #007bff;
    color: #fff;
    cursor: pointer;
    border-radius: 4px;
`;

const TestimonialCards = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
    justify-content: center;
`;

const TestimonialCard = styled.div`
    flex: 1 1 200px;
    min-width: 250px;
    background: #fff;
    padding: 1rem;
    border-radius: 6px;
    text-align: left;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const StudentName = styled.h3`
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const Review = styled.p`
    margin-bottom: 1rem;
    line-height: 1.4;
`;

const StarRating = styled.div`
    color: #ffbf00;
`;

const SubscribeSection = styled.section`
    width: 100%;
    padding: 60px 20px;
    text-align: center;
    background: #fff;

    h2 {
        margin-bottom: 1rem;
    }

    p {
        margin-bottom: 2rem;
        color: #555;
    }
`;

const SubscribeForm = styled.form`
    max-width: 400px;
    margin: 0 auto;
    display: grid;
    grid-gap: 0.8rem;

    label {
        text-align: left;
        font-weight: bold;
    }

    input, select {
        padding: 0.6rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
`;

const SubscribeButton = styled.button`
    padding: 0.8rem 1.2rem;
    border: none;
    background: #007bff;
    color: #fff;
    cursor: pointer;
    border-radius: 4px;
`;

const PerformanceSection = styled.section`
    width: 100%;
    padding: 60px 20px;
    background: #fafafa;
    text-align: center;

    h2 {
        margin-bottom: 1rem;
    }
`;

const ViewAnalysisButton = styled.button`
    margin-bottom: 2rem;
    padding: 0.6rem 1rem;
    background: #17a2b8;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 4px;
`;

const StatsContainer = styled.div`
    display: flex;
    gap: 20px;
    max-width: 800px;
    margin: 0 auto 2rem auto;
    justify-content: center;
`;

const StatBox = styled.div`
    flex: 1 1 200px;
    background: #fff;
    padding: 1rem;
    border-radius: 6px;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const StatNumber = styled.div`
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
    color: #666;
    margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
    color: #28a745;
    font-weight: bold;
`;

const ChartPlaceholder = styled.div`
    max-width: 600px;
    height: 250px;
    margin: 0 auto;
    background: #ddd;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        color: #555;
    }
`;

const CourseDetails = styled.div`
    display: flex;
    
    flex-direction: column;
    font-size: 0.9rem;
`;

const IntroducePage = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        courseApi.getCourses(0, 3)
            .then(response => {
                // 서버 응답이 Page 객체라면 content 배열에 실제 코스 데이터가 있음
                setCourses(response.data.content);
            })
            .catch(error => {
                console.error('Failed to fetch courses', error);
            });
    }, []);

    const handleGoLogin = () => {
        navigate('/signin');
    };

    const handleGoCourse  = () => {
       navigate('/home');
    };

    return (
        <Container>
            <Header />
            <Introduce>
                <BannerSection>
                    <BannerContent>
                        <h1>Improve Your English Speaking Skills</h1>
                        <p>Engage in interactive conversations and enhance your fluency.</p>
                        <JoinButton onClick={handleGoLogin}>Join Now</JoinButton>
                    </BannerContent>
                </BannerSection>

                <InstructorSection>
                    <InstructorTitle>Meet Our Instructors</InstructorTitle>
                    <Subtitle>Experienced | Passionate | Qualified</Subtitle>
                    <Description>
                        Learn from professionals who are passionate about teaching English.
                    </Description>
                    <MeetInstructorButton>Meet Instructors</MeetInstructorButton>
                </InstructorSection>

                <FeaturedCoursesSection>
                    <SectionHeader>
                        <h2>Featured Courses</h2>
                        <ViewAllButton onClick={handleGoCourse}>View All Courses</ViewAllButton>
                    </SectionHeader>
                    <CourseCards>
                        {
                            courses.map(course => (
                                <CourseCard key={course.id}>
                                    <h3>{course.title}</h3>
                                    <p>{course.description}</p>
                                    <CourseDetails>
                                        <div><strong>Capacity:</strong> {course.maxStudents} Students</div>
                                        <div><strong>Language:</strong> {course.language}</div>
                                        <div><strong>Level:</strong> {course.level}</div>
                                    </CourseDetails>
                                </CourseCard>
                            ))
                        }
                    </CourseCards>
                </FeaturedCoursesSection>

                <TopicsSection>
                    <SectionHeader>
                        <h2>Latest Conversational Topics</h2>
                        <ExploreButton>Explore Topics</ExploreButton>
                    </SectionHeader>
                    <TopicsContainer>
                        <TopicCard>Travel Conversations</TopicCard>
                        <TopicCard>Business Communication</TopicCard>
                        <TopicCard>Popular Idioms</TopicCard>
                    </TopicsContainer>
                </TopicsSection>

                <TestimonialsSection>
                    <h2>Student Testimonials</h2>
                    <ReadMoreButton>Read More</ReadMoreButton>
                    <TestimonialCards>
                        <TestimonialCard>
                            <StudentName>Jessica</StudentName>
                            <Review>
                                The course helped me gain confidence in speaking English fluently.
                            </Review>
                            <StarRating>★★★★★</StarRating>
                        </TestimonialCard>
                        <TestimonialCard>
                            <StudentName>David</StudentName>
                            <Review>
                                I enjoyed the interactive practice sessions and found the content very useful.
                            </Review>
                            <StarRating>★★★★★</StarRating>
                        </TestimonialCard>
                        <TestimonialCard>
                            <StudentName>Sara</StudentName>
                            <Review>Great instructors and flexible learning options.</Review>
                            <StarRating>★★★★★</StarRating>
                        </TestimonialCard>
                    </TestimonialCards>
                </TestimonialsSection>

                <SubscribeSection>
                    <h2>Subscribe for Updates</h2>
                    <p>Get notified about new courses, events, and resources.</p>
                    <SubscribeForm>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                        <label htmlFor="language">Preferred Language</label>
                        <select id="language">
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="french">French</option>
                        </select>
                        <SubscribeButton>Subscribe</SubscribeButton>
                    </SubscribeForm>
                </SubscribeSection>

                <PerformanceSection>
                    <h2>Performance Insights</h2>
                    <p>Track your progress and view your improvement over time.</p>
                    <ViewAnalysisButton>View Analysis</ViewAnalysisButton>
                    <StatsContainer>
                        <StatBox>
                            <StatNumber>10,000</StatNumber>
                            <StatLabel>Words Spoken</StatLabel>
                            <StatChange>+25%</StatChange>
                        </StatBox>
                        <StatBox>
                            <StatNumber>85%</StatNumber>
                            <StatLabel>Fluency Score</StatLabel>
                            <StatChange>+10%</StatChange>
                        </StatBox>
                    </StatsContainer>
                    <ChartPlaceholder>
                        <p>Speaking Progress Chart</p>
                    </ChartPlaceholder>
                </PerformanceSection>
            </Introduce>
            <Footer />
        </Container>
    );
};

export default IntroducePage;
