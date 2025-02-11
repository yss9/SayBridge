import React from 'react';
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
`;

const PasswordButton = styled.button`
    background: #fff;
    color: #000;
    padding: 10px 16px;
    border: 1px solid #000;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
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

const ProfilePictureSection = styled.section`
    width: 100%;
    max-width: 1000px;
    padding: 40px 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
`;

const PictureInfo = styled.div`
    flex: 1 1 300px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const PictureLabel = styled.h2`
    font-size: 24px;
    margin: 0;
`;

const PictureSubtitle = styled.p`
    font-size: 14px;
    color: #555;
    margin: 0;
`;

const UploadWrapper = styled.div`
    flex: 1 1 300px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const UploadLabel = styled.label`
    font-size: 14px;
`;

const FileInput = styled.input`
    font-size: 14px;
`;

const UploadButton = styled.button`
    background: #000;
    color: #fff;
    border: none;
    padding: 10px 16px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
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

const MyPage = () => {
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
                        <PasswordButton>Change Password</PasswordButton>
                        <ProfileButton>Edit Profile</ProfileButton>
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
                <ProfilePictureSection>
                    <PictureInfo>
                        <PictureLabel>Change Profile Picture</PictureLabel>
                        <PictureSubtitle>Upload a new profile picture</PictureSubtitle>
                    </PictureInfo>
                    <UploadWrapper>
                        <UploadLabel>Choose Image</UploadLabel>
                        <FileInput type="file" />
                        <UploadButton>Upload</UploadButton>
                    </UploadWrapper>
                </ProfilePictureSection>
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
        </PageContainer>
    );
};

export default MyPage;
