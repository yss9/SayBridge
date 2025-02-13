import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../component/Header';
import Footer from '../component/Footer';

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

const TeacherPhoto = styled.div`
    width: 120px;
    height: 120px;
    background: #ccc;
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

const TeacherReviewSection = styled.section`
    width: 100%;
    max-width: 1000px;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ReviewsGrid = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
`;

const ReviewCard = styled.div`
    flex: 1 1 280px;
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
    gap: 6px;
`;

const ReviewerName = styled.div`
    font-weight: bold;
    font-size: 14px;
`;

const ReviewerText = styled.div`
    font-size: 14px;
    color: #333;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;

const ModalContent = styled.div`
    background: #fff;
    border-radius: 8px;
    width: 400px;
    padding: 24px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 20px;
    background: none;
    border: none;
    cursor: pointer;
    &:hover {
        color: #888;
    }
`;

const ModalTitle = styled.h3`
    margin: 0;
    font-size: 20px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: bold;
`;

const Input = styled.input`
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Textarea = styled.textarea`
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
`;

const SaveButton = styled.button`
    background: #000;
    color: #fff;
    padding: 10px 16px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    align-self: flex-end;
    cursor: pointer;
    &:hover {
        background: #333;
    }
`;

const TeacherProfile = () => {
    const [isOwner] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [teacherName, setTeacherName] = useState('Teacher Name');
    const [tagString, setTagString] = useState('Math Teacher,Science Lover');
    const [teacherLanguage, setTeacherLanguage] = useState('English');
    const [teacherLevel, setTeacherLevel] = useState('Advanced');
    const [teacherDescription, setTeacherDescription] = useState('Passionate about educating young minds');

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSave = () => {
        // API 호출 등을 통해 서버에 변경사항을 반영
        setIsEditModalOpen(false);
    };

    const tagArray = tagString
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

    return (
        <PageContainer>
            <Header />
            <Main>
                <ProfileSection>
                    <TeacherInfo>
                        <TeacherPhoto />
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
                        <EditProfileButton onClick={handleOpenEditModal}>
                            Edit Profile
                        </EditProfileButton>
                    )}
                </ProfileSection>

                <CoursesSection>
                    <SectionTitle>Teacher's Courses</SectionTitle>
                    <CoursesGrid>
                        <CourseCard>
                            <CourseImage />
                            <CourseText>
                                <CourseName>Algebra 101</CourseName>
                                <CourseDesc>Basic Algebra for Beginners</CourseDesc>
                            </CourseText>
                        </CourseCard>
                        <CourseCard>
                            <CourseImage />
                            <CourseText>
                                <CourseName>Physics Fundamentals</CourseName>
                                <CourseDesc>Newton's Laws & More</CourseDesc>
                            </CourseText>
                        </CourseCard>
                    </CoursesGrid>
                </CoursesSection>

                <TeacherReviewSection>
                    <SectionTitle>Reviews from Students</SectionTitle>
                    <ReviewsGrid>
                        <ReviewCard>
                            <ReviewPhoto />
                            <ReviewContent>
                                <ReviewerName>Student1</ReviewerName>
                                <ReviewerText>
                                    Great explanations, really helped me understand Algebra.
                                </ReviewerText>
                            </ReviewContent>
                        </ReviewCard>
                        <ReviewCard>
                            <ReviewPhoto />
                            <ReviewContent>
                                <ReviewerName>Student2</ReviewerName>
                                <ReviewerText>
                                    Enjoyed the interactive experiments in Physics class!
                                </ReviewerText>
                            </ReviewContent>
                        </ReviewCard>
                    </ReviewsGrid>
                </TeacherReviewSection>
            </Main>
            <Footer />

            {isEditModalOpen && (
                <ModalOverlay onClick={handleCloseEditModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={handleCloseEditModal}>×</CloseButton>
                        <ModalTitle>Edit Profile</ModalTitle>
                        <FormGroup>
                            <Label htmlFor="teacherName">Name</Label>
                            <Input
                                id="teacherName"
                                type="text"
                                value={teacherName}
                                onChange={(e) => setTeacherName(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="tagString">Name Tags (comma-separated)</Label>
                            <Input
                                id="tagString"
                                type="text"
                                value={tagString}
                                onChange={(e) => setTagString(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="teacherLanguage">Language</Label>
                            <Input
                                id="teacherLanguage"
                                type="text"
                                value={teacherLanguage}
                                onChange={(e) => setTeacherLanguage(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="teacherLevel">Level</Label>
                            <Input
                                id="teacherLevel"
                                type="text"
                                value={teacherLevel}
                                onChange={(e) => setTeacherLevel(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="teacherDescription">Self Introduction</Label>
                            <Textarea
                                id="teacherDescription"
                                rows="3"
                                value={teacherDescription}
                                onChange={(e) => setTeacherDescription(e.target.value)}
                            />
                        </FormGroup>
                        <SaveButton onClick={handleSave}>Save Changes</SaveButton>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageContainer>
    );
};

export default TeacherProfile;
