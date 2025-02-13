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

const Banner = styled.section`
    width: 100%;
    background: #5f5f5f;
    padding: 40px 20px;
    color: #fff;
    display: flex;
    justify-content: center;
`;

const BannerContent = styled.div`
    width: 100%;
    max-width: 1000px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const UserPhoto = styled.div`
    width: 100px;
    height: 100px;
    background: #ccc;
    border-radius: 100%;
`;

const UserName = styled.h1`
    font-size: 24px;
    margin: 0;
`;

const UserLevel = styled.span`
    font-size: 14px;
    background: #444;
    padding: 4px 8px;
    border-radius: 4px;
`;

const UserDescription = styled.p`
    font-size: 14px;
    margin: 0;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 16px;
`;

const ProfileButton = styled.button`
    background: #000;
    color: #fff;
    padding: 10px 16px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
        background: #333;
    }
`;

const Main = styled.main`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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

const CoursesList = styled.div`
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
`;

const CourseCard = styled.div`
    flex: 1 1 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 180px;
`;

const CourseImage = styled.div`
    width: 80px;
    height: 80px;
    background: #ccc;
    border-radius: 4px;
`;

const CourseName = styled.div`
    font-size: 16px;
    font-weight: bold;
`;

const CourseStatus = styled.div`
    font-size: 14px;
    color: #666;
`;

const CourseModules = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const ReviewsSection = styled.section`
    width: 100%;
    max-width: 1000px;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ReviewsList = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
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
    width: 380px;
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

const ModalFormGroup = styled.div`
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

const MyPage = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    return (
        <PageContainer>
            <Header />
            <Banner>
                <BannerContent>
                    <UserInfo>
                        <UserPhoto />
                        <div>
                            <UserName>User Name</UserName>
                            <UserLevel>Beginner</UserLevel>
                            <UserDescription>Update your profile information and settings</UserDescription>
                        </div>
                    </UserInfo>
                    <ButtonGroup>
                        <ProfileButton onClick={handleOpenEditModal}>Edit Profile</ProfileButton>
                    </ButtonGroup>
                </BannerContent>
            </Banner>
            <Main>
                <CoursesSection>
                    <SectionTitle>Current Courses</SectionTitle>
                    <CoursesList>
                        <CourseCard>
                            <CourseImage />
                            <CourseName>Course 1</CourseName>
                            <CourseStatus>In Progress</CourseStatus>
                            <CourseModules>3/8 Modules</CourseModules>
                        </CourseCard>
                        <CourseCard>
                            <CourseImage />
                            <CourseName>Course 2</CourseName>
                            <CourseStatus>Not Started</CourseStatus>
                            <CourseModules>0/6 Modules</CourseModules>
                        </CourseCard>
                    </CoursesList>
                </CoursesSection>
                <ReviewsSection>
                    <SectionTitle>User Reviews</SectionTitle>
                    <ReviewsList>
                        <ReviewCard>
                            <ReviewPhoto />
                            <ReviewContent>
                                <ReviewerName>User1</ReviewerName>
                                <ReviewRating>★★★★★</ReviewRating>
                                <ReviewText>Great platform to learn!</ReviewText>
                            </ReviewContent>
                        </ReviewCard>
                        <ReviewCard>
                            <ReviewPhoto />
                            <ReviewContent>
                                <ReviewerName>User2</ReviewerName>
                                <ReviewRating>★★★★☆</ReviewRating>
                                <ReviewText>Enjoying the courses</ReviewText>
                            </ReviewContent>
                        </ReviewCard>
                    </ReviewsList>
                </ReviewsSection>
            </Main>
            <Footer />

            {isEditModalOpen && (
                <ModalOverlay onClick={handleCloseEditModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={handleCloseEditModal}>×</CloseButton>
                        <ModalTitle>Edit Profile</ModalTitle>
                        <ModalFormGroup>
                            <Label htmlFor="nickname">Nickname</Label>
                            <Input id="nickname" type="text" placeholder="Enter new nickname" />
                        </ModalFormGroup>
                        <ModalFormGroup>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" placeholder="Enter new name" />
                        </ModalFormGroup>
                        <ModalFormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Enter new password" />
                        </ModalFormGroup>
                        <SaveButton>Save Changes</SaveButton>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageContainer>
    );
};

export default MyPage;
