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
    flex-direction: column;
    align-items: center;
    padding: 5%;
    background-color: #f9f9f9;
    overflow-y: auto;
    width: 100%;
    box-sizing: border-box;
`;

const ProfileSection = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #4a4a4a;
    color: white;
    padding: 2%;
    width: 100%;
    box-sizing: border-box;
`;

const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2%;
`;

const ProfileName = styled.h1`
    font-size: 150%;
    font-weight: bold;
`;

const ProfileDescription = styled.p`
    font-size: 100%;
`;

const ViewProfileButton = styled.button`
    padding: 2%;
    background: black;
    color: white;
    border: none;
    border-radius: 2%;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #333;
    }
`;

const PostsSection = styled.section`
    width: 100%;
    max-width: 1000px;
    box-sizing: border-box;
    padding: 0;
    margin: 0 auto;
`;

const SectionTitle = styled.h2`
    font-size: 150%;
    font-weight: bold;
    margin-bottom: 2%;
    text-align: center;
`;

const SectionSubtitle = styled.p`
    font-size: 100%;
    margin-bottom: 5%;
    text-align: center;
`;

const CreatePostButton = styled.button`
    display: block;
    padding: 2%;
    background: black;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
    margin: 0 auto 5%;

    &:hover {
        background-color: #333;
    }
`;

const PostCard = styled.div`
    background: white;
    padding: 2%;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 5%;
    box-sizing: border-box;
    width: 100%;
`;

const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2%;
`;

const PostAuthor = styled.div`
    display: flex;
    flex-direction: column;
`;

const AuthorName = styled.span`
    font-weight: bold;
`;

const PostTime = styled.span`
    font-size: 90%;
    color: #555;
`;

const PostContent = styled.div`
    font-size: 100%;
    margin-bottom: 2%;
`;

const FileAttachment = styled.div`
    margin-top: 2%;
    padding: 1%;
    background: #f0f0f0;
    border-radius: 2%;
`;

const SubmitButton = styled.button`
    padding: 2%;
    background: black;
    color: white;
    border: none;
    border-radius: 2%;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #333;
    }
`;

const TeacherProfilePostsPage = () => {
    return (
        <Container>
            <Header />
            <ProfileSection>
                <ProfileDetails>
                    <ProfileName>Teacher Kim</ProfileName>
                    <ProfileDescription>Experienced teacher passionate about education</ProfileDescription>
                </ProfileDetails>
                <ViewProfileButton>View Profile</ViewProfileButton>
            </ProfileSection>
            <Main>

                <PostsSection>
                    <SectionTitle>Recent Posts</SectionTitle>
                    <SectionSubtitle>Engage with other students and share your thoughts</SectionSubtitle>
                    <CreatePostButton>Create Post</CreatePostButton>

                    {[1, 2, 3].map((post) => (
                        <PostCard key={post}>
                            <PostHeader>
                                <PostAuthor>
                                    <AuthorName>Teacher Kim</AuthorName>
                                    <PostTime>2 hours ago - Classroom</PostTime>
                                </PostAuthor>
                                <span>...</span>
                            </PostHeader>
                            <PostContent>반장에 맞는 문장을 작성해보세요!</PostContent>
                            <FileAttachment>Test.pdf</FileAttachment>
                            <SubmitButton>제출된 파일 확인</SubmitButton>
                        </PostCard>
                    ))}
                </PostsSection>
            </Main>
            <Footer />
        </Container>
    );
};

export default TeacherProfilePostsPage;
