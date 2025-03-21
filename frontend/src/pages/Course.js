import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../component/Footer';
import Header from '../component/Header';
import EnrollmentListModal from './EnrollmentListModal';
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { courseApi, coursePostApi } from "../api/courseApi";
import { teacherApi } from "../api/userApi";

// Styled components
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
    position: relative;
`;

const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const TitleText = styled.h3`
    margin: 0;
`;

const DateText = styled.span`
    font-size: 0.9em;
    color: #555;
    margin-right: 10px;
`;

const HorizontalDropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    z-index: 10;
`;

const DropdownItem = styled.div`
    padding: 8px 12px;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
        background: #f0f0f0;
    }
`;

const PostContent = styled.div`
    font-size: 1em;
    margin-bottom: 1rem;
`;

const FileAttachment = styled.div`
    margin-top: 1rem;
    padding: 1%;
    background: #f0f0f0;
    border-radius: 2%;
    margin-bottom: 1rem;
`;

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
`;

const PageButton = styled.button`
    padding: 5px 10px;
    border: 1px solid #ccc;
    background: ${({ active }) => (active ? '#333' : 'white')};
    color: ${({ active }) => (active ? 'white' : 'black')};
    cursor: pointer;
`;

const SubmitButton = styled.button`
    padding: 0.5rem 1rem;
    background: black;
    color: white;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-right: 5px;
    &:hover {
        background-color: #333;
    }
`;

const FileInputLabel = styled.label`
    cursor: pointer;
`;

const CoursePage = () => {
    const { user } = useContext(AuthContext);
    const { courseId } = useParams();
    const [teacher, setTeacher] = useState({});
    const [course, setCourse] = useState({});
    const [coursePosts, setCoursePosts] = useState([]);
    const navigate = useNavigate();
    const isOwner = user && teacher && (teacher.userId === user.id);
    const isEnrolled = true; // 임시 값 (수강 여부)

    // 페이지네이션 상태
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;
    const totalPages = Math.ceil(coursePosts.length / postsPerPage);

    // 드롭다운 메뉴: 현재 열려있는 게시글의 식별자
    const [openDropdown, setOpenDropdown] = useState(null);

    // 학생 제출 상태: { [postIdentifier]: submissionFileUrl }
    const [submissions, setSubmissions] = useState({});

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

    useEffect(() => {
        if (courseId) {
            coursePostApi.getCoursePosts(courseId)
                .then(response => setCoursePosts(response.data))
                .catch(error => console.error('Failed to fetch course posts', error));
        }
    }, [courseId]);

    const handleOpenEnrollmentList = () => {
        // EnrollmentListModal 열기
    };

    const handleCreatePost = () => {
        navigate(`/posting/${courseId}`);
    };

    // 강의 작성자용 드롭다운 토글 (post.postId 사용)
    const toggleDropdown = (postIdentifier) => {
        setOpenDropdown(prev => (prev === postIdentifier ? null : postIdentifier));
    };

    const handleEditPost = (post) => {
        navigate(`/posting/${courseId}`,{state:post});
    };

    const handleDeletePost = (postIdentifier) => {
        coursePostApi.deleteCoursePost(postIdentifier)
            .then(() => {
                setCoursePosts(prev => prev.filter(post => post.postId !== postIdentifier));
            })
            .catch(error => console.error('Failed to delete post', error));
    };

    // 학생 제출 관련 함수
    const handleFileSubmit = (postIdentifier, event) => {
        const file = event.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setSubmissions(prev => ({ ...prev, [postIdentifier]: fileUrl }));
        }
    };

    const handleCheckSubmission = (postIdentifier) => {
        const submissionUrl = submissions[postIdentifier];
        if (submissionUrl) {
            window.open(submissionUrl, '_blank');
        }
    };

    const handleModifySubmission = (postIdentifier, event) => {
        const file = event.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setSubmissions(prev => ({ ...prev, [postIdentifier]: fileUrl }));
        }
    };

    const handleTeacherCheckSubmissions = (postIdentifier) => {
        console.log(`Teacher checking submissions for post ${postIdentifier}`);
    };

    // 현재 페이지에 해당하는 게시글들
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = coursePosts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <Container>
            <Header />

            <ProfileSection>
                <ProfileDetails>
                    <ProfileName>{course.title || 'Course Title'}</ProfileName>
                    <ProfileDescription>{course.description || 'Course description here.'}</ProfileDescription>
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

                    {currentPosts.map((post) => {
                        const postIdentifier = post.postId; // post.postId를 고유 식별자로 사용
                        return (
                            <PostCard key={postIdentifier}>
                                <PostHeader>
                                    <TitleText>{post.title}</TitleText>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <DateText>{new Date(post.created).toLocaleString()}</DateText>
                                        {isOwner && (
                                            <div style={{ position: 'relative' }}>
                        <span
                            style={{ cursor: 'pointer', padding: '0 5px' }}
                            onClick={() => toggleDropdown(postIdentifier)}
                        >
                          ...
                        </span>
                                                {openDropdown === postIdentifier && (
                                                    <HorizontalDropdownMenu>
                                                        <DropdownItem onClick={() => handleEditPost(post)}>
                                                            수정하기
                                                        </DropdownItem>
                                                        <DropdownItem onClick={() => handleDeletePost(postIdentifier)}>
                                                            삭제하기
                                                        </DropdownItem>
                                                    </HorizontalDropdownMenu>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </PostHeader>

                                <PostContent>
                                    <p>{post.content}</p>
                                </PostContent>

                                {post && post.attachmentUrl && (
                                    <div style={{ marginTop: '1rem' }}>
                                        <a
                                            href={post.attachmentUrl}
                                            download
                                            style={{ textDecoration: 'underline', color: 'blue' }}
                                        >
                                            {post.attachmentUrl.split('/').pop()}
                                        </a>
                                    </div>
                                )}

                                {/* 학생 제출 UI */}
                                {!isOwner && isEnrolled && (
                                    <div style={{ marginTop: '10px' }}>
                                        {submissions[postIdentifier] ? (
                                            <>
                                                <SubmitButton onClick={() => handleCheckSubmission(postIdentifier)}>
                                                    제출 파일 확인
                                                </SubmitButton>
                                                <FileInputLabel>
                                                    <SubmitButton as="span">
                                                        수정하기
                                                    </SubmitButton>
                                                    <input
                                                        type="file"
                                                        style={{ display: 'none' }}
                                                        onChange={(e) => handleModifySubmission(postIdentifier, e)}
                                                    />
                                                </FileInputLabel>
                                            </>
                                        ) : (
                                            <FileInputLabel>
                                                <SubmitButton as="span">
                                                    파일 제출하기
                                                </SubmitButton>
                                                <input
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    onChange={(e) => handleFileSubmit(postIdentifier, e)}
                                                />
                                            </FileInputLabel>
                                        )}
                                    </div>
                                )}

                                {/* 강의 작성자(teacher)가 제출 파일을 확인하는 버튼 */}
                                {isOwner && (
                                    <div style={{ marginTop: '10px' }}>
                                        <SubmitButton onClick={() => handleTeacherCheckSubmissions(postIdentifier)}>
                                            제출된 파일 확인
                                        </SubmitButton>
                                    </div>
                                )}
                            </PostCard>
                        );
                    })}

                    {/* 페이지네이션 컨트롤 */}
                    {totalPages > 1 && (
                        <PaginationWrapper>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <PageButton
                                    key={index + 1}
                                    active={currentPage === index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </PageButton>
                            ))}
                        </PaginationWrapper>
                    )}
                </PostsSection>
            </Main>

            <Footer />
        </Container>
    );
};

export default CoursePage;
