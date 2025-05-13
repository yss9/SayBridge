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
import TeacherSubmissionsModal from "./TeacherSubmissionsModal";
import { uploadApi } from "../api/fileUploadApi";
import { homeworkApi } from "../api/homeworkApi";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
    background: #f5f5f5;
`;

const Main = styled.main`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 5%;
    background-color: #ffffff;
    overflow-y: auto;
    width: 100%;
    box-sizing: border-box;
`;

const ProfileSection = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #343a40;
    color: #ffffff;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
`;

const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ProfileName = styled.h1`
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0;
`;

const ProfileDescription = styled.p`
    font-size: 1rem;
    margin: 0;
`;

const EnrollmentListButton = styled.button`
    padding: 10px 16px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
    font-size: 1rem;
    transition: background 0.3s;
    &:hover {
        background: #0056b3;
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
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 16px;
    text-align: center;
`;

const SectionSubtitle = styled.p`
    font-size: 1rem;
    margin-bottom: 24px;
    text-align: center;
    color: #666;
`;

const CreatePostButton = styled.button`
    display: block;
    padding: 12px 24px;
    background: #28a745;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
    margin: 0 auto 24px;
    font-size: 1rem;
    &:hover {
        background: #218838;
    }
`;

const PostCard = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;
    box-sizing: border-box;
    width: 100%;
    position: relative;
`;

const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

const TitleText = styled.h3`
    margin: 0;
    font-size: 1.5rem;
`;

const DateText = styled.span`
    font-size: 0.9rem;
    color: #555;
    margin-right: 10px;
`;

const HorizontalDropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
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
    font-size: 1rem;
    margin-bottom: 12px;
    color: #333;
    white-space: pre-line; 
`;

const ActionButton = styled.button`
    padding: 8px 16px;
    background: ${props => props.danger ? '#dc3545' : props.primary ? '#007bff' : '#6c757d'};
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
    font-size: 0.9rem;
    margin-right: 8px;
    &:hover {
        background: ${props => props.danger ? '#c82333' : props.primary ? '#0056b3' : '#5a6268'};
    }
`;

const FileInputLabel = styled.label`
    cursor: pointer;
    display: inline-block;
`;

const CoursePage = () => {
    const { user } = useContext(AuthContext);
    const { courseId } = useParams();
    const [teacher, setTeacher] = useState({});
    const [course, setCourse] = useState({});
    const [coursePosts, setCoursePosts] = useState([]);
    const [isApplied, setIsApplied] = useState(false);
    const [applicationId, setApplicationId] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const navigate = useNavigate();

    // 현재 로그인한 유저와 강좌의 강사가 일치하면 강사(Owner)
    const isOwner = user && teacher && (teacher.userId === user.id);

    // 페이지네이션 상태
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;
    const totalPages = Math.ceil(coursePosts.length / postsPerPage);

    // 드롭다운 메뉴 (강사용)
    const [openDropdown, setOpenDropdown] = useState(null);

    // 학생 제출 파일 URL 상태 (각 게시글별)
    const [submissions, setSubmissions] = useState({});

    // 모달 상태 (수강신청, 제출 확인)
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [showEnrolledStudentsModal, setShowEnrolledStudentsModal] = useState(false);
    const [teacherSubmissionsPostId, setTeacherSubmissionsPostId] = useState(null);

    // 수강신청/수강등록 상태 확인 (학생인 경우)
    useEffect(() => {
        if (courseId && !isOwner) {
            courseApplicationApi.checkApplication(courseId)
                .then(response => setIsApplied(response.data))
                .catch(error => console.error('수강신청 상태 확인 실패', error));

            courseEnrollmentApi.checkCourseEnrollment(courseId)
                .then(response => setIsEnrolled(response.data))
                .catch(error => console.error('수강 등록 상태 확인 실패', error));
        }
    }, [courseId, isOwner]);

    // 강좌 데이터 호출
    useEffect(() => {
        courseApi.getCourse(courseId)
            .then(response => setCourse(response.data))
            .catch(error => console.error('강의 조회 실패', error));
    }, [courseId]);

    // 강사 데이터 호출
    useEffect(() => {
        if (course && course.teacherId) {
            teacherApi.teacherInfo(course.teacherId)
                .then(response => setTeacher(response.data))
                .catch(error => console.error('강사 정보 조회 실패', error));
        }
    }, [course]);

    // 게시글 데이터 호출
    useEffect(() => {
        if (courseId) {
            coursePostApi.getCoursePosts(courseId)
                .then(response => setCoursePosts(response.data))
                .catch(error => console.error('게시글 조회 실패', error));
        }
    }, [courseId]);

    // 학생 제출 내역 자동 조회 (학생인 경우)
    useEffect(() => {
        if (!isOwner && (isApplied || isEnrolled) && coursePosts.length > 0) {
            const postIds = coursePosts.map(post => post.postId);
            homeworkApi.getStudentSubmissions(postIds)
                .then(response => {
                    // 예시 응답: { "27": "url", "28": "url", ... }
                    setSubmissions(response.data);
                })
                .catch(error => console.error('학생 제출 내역 조회 실패', error));
        }
    }, [coursePosts, isOwner, isApplied, isEnrolled]);

    // [학생] 관련 이벤트 핸들러
    const handleEnroll = () => {
        courseApplicationApi.applyCourse(courseId)
            .then(response => setIsApplied(true))
            .catch(error => console.error('수강신청 실패', error));
    };

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

    const handleWithdraw = () => {
        courseEnrollmentApi.withdrawCourseEnrollment(courseId)
            .then(() => setIsEnrolled(false))
            .catch(error => console.error('수강취소 실패', error));
    };

    // [강사] 모달 이벤트 핸들러
    const handleOpenApplicationModal = () => setShowApplicationModal(true);
    const handleCloseApplicationModal = () => setShowApplicationModal(false);
    const handleOpenEnrolledStudentsModal = () => setShowEnrolledStudentsModal(true);
    const handleCloseEnrolledStudentsModal = () => setShowEnrolledStudentsModal(false);
    // 강사 제출 확인 모달 열기
    const handleTeacherCheckSubmissions = (postId) => {
        setTeacherSubmissionsPostId(postId);
    };

    // [강사] 게시글 관련 이벤트 핸들러
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
            .then(() => setCoursePosts(prev => prev.filter(post => post.postId !== postId)))
            .catch(error => console.error('게시글 삭제 실패', error));
    };

    // [학생] 제출하기 (제출하지 않은 경우)
    const handleFileSubmit = (postId, event) => {
        const file = event.target.files[0];
        if (file) {
            uploadApi.homeworkFileUpload(file, postId)
                .then(uploadResponse => {
                    const fileUrl = uploadResponse.data;
                    // S3 업로드 후, 숙제 제출 API 호출 (업로드된 URL을 DB에 저장)
                    homeworkApi.submitHomework(postId, fileUrl)
                        .then(submitResponse => {
                            const submittedUrl = submitResponse.data.attachmentUrl;
                            setSubmissions(prev => ({ ...prev, [postId]: submittedUrl }));
                        })
                        .catch(submitError => console.error('숙제 제출 API 호출 실패', submitError));
                })
                .catch(uploadError => console.error('제출 실패', uploadError));
        }
    };

    // [학생] 제출 수정 (이미 제출한 경우)
    const handleModifySubmission = (postId, event) => {
        const file = event.target.files[0];
        if (file) {
            uploadApi.homeworkFileUpload(file, postId)
                .then(uploadResponse => {
                    const newFileUrl = uploadResponse.data;
                    homeworkApi.submitHomework(postId, newFileUrl)
                        .then(submitResponse => {
                            const updatedUrl = submitResponse.data.attachmentUrl;
                            setSubmissions(prev => ({ ...prev, [postId]: updatedUrl }));
                        })
                        .catch(submitError => console.error('숙제 제출 업데이트 실패', submitError));
                })
                .catch(uploadError => console.error('제출 수정 실패', uploadError));
        }
    };

    // [학생] 제출 취소하기
    const handleCancelSubmission = (postId) => {
        homeworkApi.cancelHomeworkSubmission(postId)
            .then(() => {
                setSubmissions(prev => {
                    const updated = { ...prev };
                    delete updated[postId];
                    return updated;
                });
            })
            .catch(error => console.error('제출 취소 실패', error));
    };

    // 페이지네이션 계산
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
                        <div style={{ textAlign: 'center', padding: '20px', fontSize: '1.2rem' }}>
                            (수강신청 후, 선생님이 승인하면) 게시글을 확인할 수 있습니다.
                        </div>
                    ) : (
                        <>
                            <SectionTitle>Recent Posts</SectionTitle>
                            <SectionSubtitle>
                                학생들이 작성한 게시글을 확인하세요.
                            </SectionSubtitle>
                            {isOwner && (
                                <CreatePostButton onClick={handleCreatePost}>
                                    게시글 생성
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
                                            <div style={{ marginTop: '2rem' }}>
                                                <a
                                                    href={post.attachmentUrl}
                                                    download
                                                    style={{ textDecoration: 'underline', color: '#007bff' }}
                                                >
                                                    {post.attachmentUrl.split('/').pop()}
                                                </a>
                                            </div>
                                        )}

                                        {(!isOwner && (isApplied || isEnrolled)) && (
                                            <div style={{ marginTop: '20px' }}>
                                                {submissions[postId] ? (
                                                    <>
                                                        <ActionButton primary onClick={() => window.open(submissions[postId], '_blank')}>
                                                            제출 확인
                                                        </ActionButton>
                                                        <FileInputLabel>
                                                            <ActionButton onClick={() => {}}>
                                                                수정하기
                                                            </ActionButton>
                                                            <input
                                                                type="file"
                                                                style={{ display: 'none' }}
                                                                onChange={(e) => handleModifySubmission(postId, e)}
                                                            />
                                                        </FileInputLabel>
                                                        <ActionButton danger onClick={() => handleCancelSubmission(postId)}>
                                                            제출 취소
                                                        </ActionButton>
                                                    </>
                                                ) : (
                                                    <FileInputLabel>
                                                        <ActionButton primary as="span">
                                                            제출하기
                                                        </ActionButton>
                                                        <input
                                                            type="file"
                                                            style={{ display: 'none' }}
                                                            onChange={(e) => handleFileSubmit(postId, e)}
                                                        />
                                                    </FileInputLabel>
                                                )}
                                            </div>
                                        )}

                                        {isOwner && (
                                            <div style={{ marginTop: '10px' }}>
                                                <ActionButton primary onClick={() => handleTeacherCheckSubmissions(postId)}>
                                                    제출 확인
                                                </ActionButton>
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
                                                background: currentPage === index + 1 ? '#007bff' : 'white',
                                                color: currentPage === index + 1 ? 'white' : 'black',
                                                cursor: 'pointer',
                                                borderRadius: '4px'
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
            {teacherSubmissionsPostId && (
                <TeacherSubmissionsModal
                    coursePostId={teacherSubmissionsPostId}
                    onClose={() => setTeacherSubmissionsPostId(null)}
                />
            )}
        </Container>
    );
};

export default CoursePage;
