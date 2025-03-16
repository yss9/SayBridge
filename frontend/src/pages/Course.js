import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import Footer from '../component/Footer';
import Header from '../component/Header';
import EnrollmentListModal from './EnrollmentListModal';
import {AuthContext} from "../context/AuthContext";
import {useParams} from "react-router-dom";
import {courseApi} from "../api/courseApi";
import {teacherApi} from "../api/userApi";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
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

const EnrollmentListButton = styled.button`
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
    margin-right: 5px;

    &:hover {
        background-color: #333;
    }
`;

const CoursePage = () => {
    const { user } = useContext(AuthContext);
    const { courseId } = useParams();
    const [ teacher, setTeacher ] = useState([]);
    const [course, setCourse] = useState([]);

    const isOwner = user && teacher && (teacher.userId === user.id);

    const isEnrolled = true;


    useEffect(() => {
        courseApi.getCourse(courseId)
            .then(response => setCourse(response.data))
            .catch(error => console.error('Failed to fetch course', error));
    }, [courseId]);

    useEffect(() => {
        if (course && course.teacherId) {
            teacherApi.teacherInfo(course.teacherId)
                .then(response => setTeacher(response.data))
                .catch(error => console.error('Failed to fetch teacher info', error));
        }
    }, [course]);


    const [submissions, setSubmissions] = useState({
        1: false,
        2: true,
        3: false,
    });

    const [showEnrollmentList, setShowEnrollmentList] = useState(false);

    const handleOpenEnrollmentList = () => {
        setShowEnrollmentList(true);
    };

    const handleCloseEnrollmentList = () => {
        setShowEnrollmentList(false);
    };

    const handleCreatePost = () => {
        console.log("Navigate to Create Post page");
    };

    const handleFileSubmit = (postId) => {
        console.log(`Submit file for post ${postId}`);
        setSubmissions(prev => ({ ...prev, [postId]: true }));
    };

    const handleCheckSubmission = (postId) => {
        console.log(`Check submitted file for post ${postId}`);
    };

    const handleModifySubmission = (postId) => {
        console.log(`Modify submission for post ${postId}`);
    };

    const handleTeacherCheckSubmissions = (postId) => {
        console.log(`Teacher checking submissions for post ${postId}`);
    };

    return (
        <Container>
            <Header />

            <ProfileSection>
                <ProfileDetails>
                    <ProfileName></ProfileName>
                    <ProfileDescription>Experienced teacher passionate about education</ProfileDescription>
                </ProfileDetails>
                {isOwner ? (
                    <EnrollmentListButton onClick={handleOpenEnrollmentList}>
                        Enrollment List
                    </EnrollmentListButton>
                ) : (
                    isEnrolled && (
                        <EnrollmentListButton onClick={handleOpenEnrollmentList}>
                            수강신청
                        </EnrollmentListButton>
                    )
                )}
            </ProfileSection>

            <Main>
                <PostsSection>
                    <SectionTitle>Recent Posts</SectionTitle>
                    <SectionSubtitle>Engage with other students and share your thoughts</SectionSubtitle>
                    {isOwner && (
                        <CreatePostButton onClick={handleCreatePost}>
                            Create Post
                        </CreatePostButton>
                    )}

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
                            {isOwner ? (
                                <SubmitButton onClick={() => handleTeacherCheckSubmissions(post)}>
                                    제출된 파일 확인
                                </SubmitButton>
                            ) : (
                                isEnrolled && (
                                    submissions[post] ? (
                                        <>
                                            <SubmitButton onClick={() => handleCheckSubmission(post)}>
                                                내가 제출한 숙제 확인
                                            </SubmitButton>
                                            <SubmitButton onClick={() => handleModifySubmission(post)}>
                                                수정
                                            </SubmitButton>
                                        </>
                                    ) : (
                                        <SubmitButton onClick={() => handleFileSubmit(post)}>
                                            파일 제출하기
                                        </SubmitButton>
                                    )
                                )
                            )}
                        </PostCard>
                    ))}
                </PostsSection>
            </Main>

            <Footer />

            {showEnrollmentList && (
                <EnrollmentListModal onClose={handleCloseEnrollmentList} />
            )}
        </Container>
    );
};

export default CoursePage;
