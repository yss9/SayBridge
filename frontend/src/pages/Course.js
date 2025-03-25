import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../component/Footer';
import Header from '../component/Header';
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import {
    courseApi,
    coursePostApi,
    courseApplicationApi,
    courseEnrollmentApi
} from "../api/courseApi";
import { teacherApi } from "../api/userApi";
import { EnrollmentApplicationModal, EnrolledStudentsModal } from "./TeacherModals";

// ===================================================
// Styled Components
// ===================================================
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
    margin-left: 10px;
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

// ===================================================
// CoursePage Component
// ===================================================
const CoursePage = () => {
    const { user } = useContext(AuthContext);
    const { courseId } = useParams();
    const [teacher, setTeacher] = useState({});
    const [course, setCourse] = useState({});
    const [coursePosts, setCoursePosts] = useState([]);
    // 학생의 수강신청/수강등록 상태
    const [isApplied, setIsApplied] = useState(false);
    const [applicationId, setApplicationId] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const navigate = useNavigate();

    // 현재 로그인한 유저와 강좌의 강사가 일치하면 강사(Owner)
    const isOwner = user && teacher && (teacher.userId === user.id);

    // 페이지네이션 상태 (게시글)
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;
    const totalPages = Math.ceil(coursePosts.length / postsPerPage);

    // 드롭다운 메뉴 (강사용)
    const [openDropdown, setOpenDropdown] = useState(null);

    // 학생 제출 파일 상태
    const [submissions, setSubmissions] = useState({});

    // 선생님 전용 모달 상태 (별도 파일에서 분리)
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [showEnrolledStudentsModal, setShowEnrolledStudentsModal] = useState(false);

    // ===================================================
    // 수강신청/수강등록 상태 확인 (학생, 강사가 아닌 경우)
    // checkCourseApplication API는 { applied: boolean, applicationId: number|null } 형태를 반환한다고 가정합니다.
    useEffect(() => {
        if (courseId && !isOwner) {
            courseApplicationApi.checkApplication(courseId)
                .then(response => {
                    setIsApplied(response.data);
                })
                .catch(error => console.error('수강신청 상태 확인 실패', error));

            courseEnrollmentApi.checkCourseEnrollment(courseId)
                .then(response => {
                    setIsEnrolled(response.data);
                })
                .catch(error => console.error('수강 등록 상태 확인 실패', error));
        }
    }, [courseId, isOwner]);

    // ===================================================
    // 강좌, 강사, 게시글 데이터 호출
    // ===================================================
    useEffect(() => {
        courseApi.getCourse(courseId)
            .then(response => setCourse(response.data))
            .catch(error => console.error('강의 조회 실패', error));
    }, [courseId]);

    useEffect(() => {
        if (course && course.teacherId) {
            teacherApi.teacherInfo(course.teacherId)
                .then(response => setTeacher(response.data))
                .catch(error => console.error('강사 정보 조회 실패', error));
        }
    }, [course]);

    useEffect(() => {
        if (courseId) {
            coursePostApi.getCoursePosts(courseId)
                .then(response => setCoursePosts(response.data))
                .catch(error => console.error('게시글 조회 실패', error));
        }
    }, [courseId]);

    // ===================================================
    // 학생 관련 이벤트 핸들러
    // ===================================================
    // 수강신청: 아직 신청도, 수강 등록도 안 된 상태
    const handleEnroll = () => {
        courseApplicationApi.applyCourse(courseId)
            .then(response => {
                setIsApplied(true);
            })
            .catch(error => console.error('수강신청 실패', error));
    };

    // 수강신청 취소: 신청한 상태일 경우
    const handleCancelApplication = () => {
        if (!courseId) {
            console.error('취소할 강좌 번호가 없습니다.');
            return;
        }
        courseApplicationApi.deleteMyApplication(courseId)
            .then(() => {
                setIsApplied(false);
                setApplicationId(null);
            })
            .catch(error => console.error('수강신청 취소 실패', error));
    };

    // 수강취소: 이미 수강 등록된 경우
    const handleWithdraw = () => {
        courseEnrollmentApi.withdrawCourseEnrollment(courseId)
            .then(() => {
                setIsEnrolled(false);
            })
            .catch(error => console.error('수강취소 실패', error));
    };

    // ===================================================
    // 강사용 이벤트 핸들러 (모달 오픈/클로즈)
    // ===================================================
    const handleOpenApplicationModal = () => setShowApplicationModal(true);
    const handleCloseApplicationModal = () => setShowApplicationModal(false);
    const handleOpenEnrolledStudentsModal = () => setShowEnrolledStudentsModal(true);
    const handleCloseEnrolledStudentsModal = () => setShowEnrolledStudentsModal(false);

    // ===================================================
    // 게시글 관련 이벤트 핸들러 (강사용)
    // ===================================================
    const handleCreatePost = () => {
        navigate(`/posting/${courseId}`);
    };

    const toggleDropdown = (postId) => {
        setOpenDropdown(prev => (prev === postId ? null : postId));
    };

    const handleEditPost = (post) => {
        navigate(`/posting/${courseId}`, { state: post });
    };

    const handleDeletePost = (postId) => {
        coursePostApi.deleteCoursePost(postId)
            .then(() => {
                setCoursePosts(prev => prev.filter(post => post.postId !== postId));
            })
            .catch(error => console.error('게시글 삭제 실패', error));
    };

    // ===================================================
    // 학생 제출 관련 이벤트 핸들러 (게시글)
    // ===================================================
    const handleFileSubmit = (postId, event) => {
        const file = event.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setSubmissions(prev => ({ ...prev, [postId]: fileUrl }));
        }
    };

    const handleCheckSubmission = (postId) => {
        const submissionUrl = submissions[postId];
        if (submissionUrl) {
            window.open(submissionUrl, '_blank');
        }
    };

    const handleModifySubmission = (postId, event) => {
        const file = event.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setSubmissions(prev => ({ ...prev, [postId]: fileUrl }));
        }
    };

    const handleTeacherCheckSubmissions = (postId) => {
        console.log(`강사가 게시글 ${postId}의 제출 파일 확인`);
    };

    // ===================================================
    // 현재 페이지에 해당하는 게시글들 (페이지네이션)
    // ===================================================
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
                <div>
                    {isOwner ? (
                        <>
                            <EnrollmentListButton onClick={handleOpenApplicationModal}>
                                수강신청 리스트
                            </EnrollmentListButton>
                            <EnrollmentListButton onClick={handleOpenEnrolledStudentsModal}>
                                수강 인원 목록
                            </EnrollmentListButton>
                        </>
                    ) : (
                        <>
                            {(!isApplied && !isEnrolled) && (
                                <EnrollmentListButton onClick={handleEnroll}>
                                    수강신청
                                </EnrollmentListButton>
                            )}
                            {(isApplied && !isEnrolled) && (
                                <EnrollmentListButton onClick={handleCancelApplication}>
                                    수강신청취소
                                </EnrollmentListButton>
                            )}
                            {isEnrolled && (
                                <EnrollmentListButton onClick={handleWithdraw}>
                                    수강취소
                                </EnrollmentListButton>
                            )}
                        </>
                    )}
                </div>
            </ProfileSection>

            <Main>
                <PostsSection>
                    {(!isOwner && !isEnrolled) ? (
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            (수강신청 후, 선생님이 수락하면) 게시글을 확인할 수 있습니다.
                        </div>
                    ) : (
                        <>
                            <SectionTitle>Recent Posts</SectionTitle>
                            <SectionSubtitle>
                                Engage with other students and share your thoughts
                            </SectionSubtitle>
                            {isOwner && (
                                <CreatePostButton onClick={handleCreatePost}>
                                    Create Post
                                </CreatePostButton>
                            )}

                            {currentPosts.map((post) => {
                                const postId = post.postId;
                                return (
                                    <PostCard key={postId}>
                                        <PostHeader>
                                            <TitleText>{post.title}</TitleText>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <DateText>{new Date(post.created).toLocaleString()}</DateText>
                                                {isOwner && (
                                                    <div style={{ position: 'relative' }}>
                                                        <span
                                                            style={{ cursor: 'pointer', padding: '0 5px' }}
                                                            onClick={() => toggleDropdown(postId)}
                                                        >
                                                            ...
                                                        </span>
                                                        {openDropdown === postId && (
                                                            <HorizontalDropdownMenu>
                                                                <DropdownItem onClick={() => handleEditPost(post)}>
                                                                    수정하기
                                                                </DropdownItem>
                                                                <DropdownItem onClick={() => handleDeletePost(postId)}>
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

                                        {post?.attachmentUrl && (
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
                                        {(!isOwner && (isApplied || isEnrolled)) && (
                                            <div style={{ marginTop: '10px' }}>
                                                {submissions[postId] ? (
                                                    <>
                                                        <SubmitButton onClick={() => handleCheckSubmission(postId)}>
                                                            제출 파일 확인
                                                        </SubmitButton>
                                                        <FileInputLabel>
                                                            <SubmitButton as="span">
                                                                수정하기
                                                            </SubmitButton>
                                                            <input
                                                                type="file"
                                                                style={{ display: 'none' }}
                                                                onChange={(e) => handleModifySubmission(postId, e)}
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
                                                            onChange={(e) => handleFileSubmit(postId, e)}
                                                        />
                                                    </FileInputLabel>
                                                )}
                                            </div>
                                        )}

                                        {/* 강사용 제출 파일 확인 버튼 */}
                                        {isOwner && (
                                            <div style={{ marginTop: '10px' }}>
                                                <SubmitButton onClick={() => handleTeacherCheckSubmissions(postId)}>
                                                    제출된 파일 확인
                                                </SubmitButton>
                                            </div>
                                        )}
                                    </PostCard>
                                );
                            })}

                            {totalPages > 1 && (
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={index + 1}
                                            style={{
                                                padding: '5px 10px',
                                                border: '1px solid #ccc',
                                                background: currentPage === index + 1 ? '#333' : 'white',
                                                color: currentPage === index + 1 ? 'white' : 'black',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </PostsSection>
            </Main>

            <Footer />

            {/* 선생님 전용 모달 */}
            {showApplicationModal && (
                <EnrollmentApplicationModal courseId={courseId} onClose={handleCloseApplicationModal} />
            )}
            {showEnrolledStudentsModal && (
                <EnrolledStudentsModal courseId={courseId} onClose={handleCloseEnrolledStudentsModal} />
            )}
        </Container>
    );
};

export default CoursePage;
