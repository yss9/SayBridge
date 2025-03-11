import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../component/Header';
import Footer from '../component/Footer';

import { teacherApi } from '../api/userApi';
import { courseApi } from '../api/courseApi';
import { reviewApi } from '../api/reviewApi';
import { AuthContext } from "../context/AuthContext";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    box-sizing: border-box;
    font-family: sans-serif;
`;

const Main = styled.main`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProfileSection = styled.section`
    width: 100%;
    max-width: 1000px;
    padding: 40px 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`;

const TeacherInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

// teacherImage가 있으면 해당 URL을 배경 이미지로 사용합니다.
const TeacherPhoto = styled.div`
    width: 120px;
    height: 120px;
    background: ${props => props.imageUrl ? `url(${props.imageUrl}) no-repeat center center` : '#ccc'};
    background-size: cover;
    border-radius: 100%;
`;

const TeacherDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TeacherName = styled.h1`
    font-size: 24px;
    margin: 0;
`;

const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const Tag = styled.span`
    background: #eee;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
`;

const TeacherDescription = styled.p`
    font-size: 14px;
    color: #555;
    margin: 0;
`;

const EditProfileButton = styled.button`
    padding: 12px 24px;
    border: none;
    background: #000;
    color: #fff;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    &:hover {
        background: #333;
    }
`;

const CoursesSection = styled.section`
    width: 100%;
    max-width: 1000px;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const SectionTitle = styled.h2`
    font-size: 24px;
    margin: 0;
`;

const CoursesGrid = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
`;

const CourseCard = styled.div`
    flex: 1 1 280px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 16px;
    display: flex;
    gap: 16px;
    align-items: center;
`;

const CourseImage = styled.div`
    width: 60px;
    height: 60px;
    background: #ccc;
    border-radius: 6px;
`;

const CourseText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const CourseName = styled.h3`
    font-size: 16px;
    margin: 0;
`;

const CourseDesc = styled.span`
    font-size: 14px;
    color: #666;
`;

const ReviewsSection = styled.section`
    width: 100%;
    max-width: 1000px;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ReviewSliderContainer = styled.div`
    position: relative;
    width: 1000px;
    margin: 0 auto;
    overflow: visible;
    box-sizing: border-box;
`;

const ReviewsList = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: nowrap;
    justify-content: ${props => props.$center ? 'center' : 'flex-start'};
`;

const ArrowButton = styled.button`
    background: #000;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
`;

const LeftArrow = styled(ArrowButton)`
    position: absolute;
    left: -6%;
    top: 50%;
    transform: translateY(-50%);
`;

const RightArrow = styled(ArrowButton)`
    position: absolute;
    right: -5%;
    top: 50%;
    transform: translateY(-50%);
`;

const ReviewCard = styled.div`
    flex: 1 1 200px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 16px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
`;

const ReviewPhoto = styled.div`
    width: 40px;
    height: 40px;
    background: #ccc;
    border-radius: 100%;
`;

const ReviewContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ReviewerName = styled.div`
    font-weight: bold;
    font-size: 14px;
`;

const ReviewRating = styled.div`
    font-size: 14px;
    color: #f5c518;
`;

const ReviewText = styled.div`
    font-size: 14px;
    color: #333;
`;

const TeacherProfile = () => {
    const { teacherId } = useParams();
    const [teacherName, setTeacherName] = useState('');
    const [tagString, setTagString] = useState('');
    const [teacherDescription, setTeacherDescription] = useState('');
    const [teacherLanguage, setTeacherLanguage] = useState('');
    const [teacherImage, setTeacherImage] = useState('');
    const [teacherUserId, setTeacherUserId] = useState('');
    const [courses, setCourses] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reviewsIndex, setReviewsIndex] = useState(0);
    const { user } = useContext(AuthContext);

    const isOwner = user && teacherUserId && (teacherUserId.toString() === user.id.toString());

    useEffect(() => {
        if (!teacherId) return;

        teacherApi.teacherInfo(teacherId)
            .then((res) => {
                const data = res.data;
                setTeacherName(data.teacherName || 'Teacher Name');
                setTagString(data.tag || '');
                setTeacherDescription(data.description || '');
                setTeacherLanguage(data.language || '');
                setTeacherImage(data.imageUrl || '');
                setTeacherUserId(data.userId || '');
            })
            .catch((err) => console.error('Teacher info fetch error:', err));

        courseApi.getCourseByTeacherId(teacherId)
            .then((res) => {
                setCourses(res.data);
            })
            .catch((err) => console.error('Teacher courses fetch error:', err));

        reviewApi.getTeacherReview(teacherId)
            .then((res) => {
                setReviews(res.data);
            })
            .catch((err) => console.error('Teacher reviews fetch error:', err));
    }, [teacherId]);

    const handleReviewsPrev = () => {
        setReviewsIndex(prev => Math.max(0, prev - 2));
    };

    const handleReviewsNext = () => {
        setReviewsIndex(prev => {
            const newIndex = prev + 2;
            return newIndex < reviews.length ? newIndex : prev;
        });
    };

    const isReviewsCenter = reviews.length < 3;
    const disableReviewsPrev = reviewsIndex === 0 || reviews.length <= 2;
    const disableReviewsNext = reviewsIndex + 2 >= reviews.length || reviews.length <= 2;

    const renderStars = (rating) => {
        return "★".repeat(rating) + "☆".repeat(5 - rating);
    };

    const tagArray = tagString.split(',').map(tag => tag.trim()).filter(tag => tag);

    return (
        <PageContainer>
            <Header />
            <Main>
                <ProfileSection>
                    <TeacherInfo>
                        <TeacherPhoto imageUrl={teacherImage} />
                        <TeacherDetails>
                            <TeacherName>{teacherName}</TeacherName>
                            <TagContainer>
                                {tagArray.map((tag, index) => (
                                    <Tag key={index}>{tag}</Tag>
                                ))}
                            </TagContainer>
                            <TeacherDescription>{teacherDescription}</TeacherDescription>
                        </TeacherDetails>
                    </TeacherInfo>
                    {isOwner && (
                        <EditProfileButton>Edit Profile</EditProfileButton>
                    )}
                </ProfileSection>

                <CoursesSection>
                    <SectionTitle>Teacher's Courses</SectionTitle>
                    <CoursesGrid>
                        {courses.map(course => (
                            <CourseCard key={course.id}>
                                <CourseText>
                                    <CourseName>{course.title}</CourseName>
                                    <CourseDesc>{course.description}</CourseDesc>
                                </CourseText>
                            </CourseCard>
                        ))}
                    </CoursesGrid>
                </CoursesSection>

                <ReviewsSection>
                    <SectionTitle>Reviews from Students</SectionTitle>
                    <ReviewSliderContainer>
                        <LeftArrow onClick={handleReviewsPrev} disabled={disableReviewsPrev}>
                            ◀
                        </LeftArrow>
                        <ReviewsList $center={isReviewsCenter}>
                            {reviews.slice(reviewsIndex, reviewsIndex + 2).map(review => (
                                <ReviewCard key={review.id}>
                                    <ReviewContent>
                                        <ReviewerName>{review.userNickname}</ReviewerName>
                                        <ReviewRating>{renderStars(review.rating)}</ReviewRating>
                                        <ReviewText>{review.content}</ReviewText>
                                    </ReviewContent>
                                </ReviewCard>
                            ))}
                        </ReviewsList>
                        <RightArrow onClick={handleReviewsNext} disabled={disableReviewsNext}>
                            ▶
                        </RightArrow>
                    </ReviewSliderContainer>
                </ReviewsSection>
            </Main>
            <Footer />
        </PageContainer>
    );
};

export default TeacherProfile;
