import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../component/Header';
import Footer from '../component/Footer';

import { teacherApi } from '../api/userApi';
import { courseApi } from '../api/courseApi';
import { reviewApi } from '../api/reviewApi';
import { uploadApi } from '../api/authApi';
import { userInfoApi } from '../api/userApi';
import { AuthContext } from "../context/AuthContext";

// 기존 스타일들
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

const CoursesHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SectionTitle = styled.h2`
    font-size: 24px;
    margin: 0;
`;

const CreateCourseButton = styled.button`
    width: 40px;
    height: 40px;
    border: none;
    background: #000;
    color: #fff;
    font-size: 24px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background: #333;
    }
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
    color: #007bff;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
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

// 모달창 스타일 (기존 Edit 모달과 동일)
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 6px;
    width: 400px;
    max-width: 90%;
`;

const FormGroup = styled.div`
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 4px;
    font-size: 14px;
`;

const Input = styled.input`
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const TextArea = styled.textarea`
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Select = styled.select`
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const SaveButton = styled.button`
    padding: 10px 20px;
    background: #28a745;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-right: 8px;
`;

const CancelButton = styled.button`
    padding: 10px 20px;
    background: #dc3545;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
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

    // 모달 상태 및 폼 필드 상태 (프로필 수정)
    const [showEditModal, setShowEditModal] = useState(false);
    const [newLanguage, setNewLanguage] = useState(teacherLanguage);
    const [newDescription, setNewDescription] = useState(teacherDescription);
    const [newTag, setNewTag] = useState(tagString);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [pwError, setPwError] = useState('');

    // Course 생성 모달 상태 및 폼 필드 상태
    const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
    const [newCourseTitle, setNewCourseTitle] = useState('');
    const [newCourseDescription, setNewCourseDescription] = useState('');
    const [newCourseMaxStudents, setNewCourseMaxStudents] = useState('');
    const [newCourseLanguage, setNewCourseLanguage] = useState('');
    const [newCourseLevel, setNewCourseLevel] = useState('');
    const [courseMessage, setCourseMessage] = useState('');

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

                // 모달 폼의 초기값 설정
                setNewLanguage(data.language || '');
                setNewDescription(data.description || '');
                setNewTag(data.tag || '');
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

    // 프로필 수정 모달 열기/닫기
    const handleOpenEditModal = () => setShowEditModal(true);
    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setMessage('');
        setPwError('');
    };

    // Course 생성 모달 열기/닫기
    const handleOpenCreateCourseModal = () => setShowCreateCourseModal(true);
    const handleCloseCreateCourseModal = () => {
        setShowCreateCourseModal(false);
        // 폼 필드 초기화
        setNewCourseTitle('');
        setNewCourseDescription('');
        setNewCourseMaxStudents('');
        setNewCourseLanguage('');
        setNewCourseLevel('');
        setCourseMessage('');
    };

    // 프로필 업데이트 핸들러
    const handleSaveChanges = async (event) => {
        event.preventDefault();
        let updateFileUrl = teacherImage;
        if (file) {
            try {
                const response = await uploadApi.fileUpload(file);
                setMessage(`파일 업로드 성공: ${response.data}`);
                updateFileUrl = response.data;
            } catch (error) {
                setMessage(`업로드 실패: ${error.response?.data || error.message}`);
                return;
            }
        }

        const updateData = {
            language: newLanguage,
            description: newDescription,
            tag: newTag,
            imageUrl: updateFileUrl
        };

        try {
            await teacherApi.updateTeacherProfile(updateData);
            setMessage("프로필이 성공적으로 업데이트되었습니다.");
            setTeacherLanguage(newLanguage);
            setTeacherDescription(newDescription);
            setTagString(newTag);
            setTeacherImage(updateFileUrl);
            handleCloseEditModal();
            window.location.reload()
        } catch (err) {
            console.error("프로필 업데이트 오류", err);
            setPwError("프로필 업데이트 중 오류가 발생했습니다.");
        }
    };

    // Course 생성 핸들러
    const handleCreateCourse = async (event) => {
        event.preventDefault();
        const courseData = {
            title: newCourseTitle,
            description: newCourseDescription,
            maxStudents: parseInt(newCourseMaxStudents, 10),
            language: newCourseLanguage,
            level: newCourseLevel
        };

        try {
            const res = await courseApi.createCourse(courseData);
            // 새로 생성된 강좌를 목록에 추가
            setCourses(prev => [...prev, res.data]);
            setCourseMessage('Course created successfully!');
            handleCloseCreateCourseModal();
            window.location.reload()
        } catch (error) {
            setCourseMessage(`Course creation failed: ${error.response?.data || error.message}`);
        }
    };

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
                        <EditProfileButton onClick={handleOpenEditModal}>Edit Profile</EditProfileButton>
                    )}
                </ProfileSection>

                <CoursesSection>
                    <CoursesHeader>
                        <SectionTitle>Teacher's Courses</SectionTitle>
                        {isOwner && (
                            <CreateCourseButton onClick={handleOpenCreateCourseModal}>+</CreateCourseButton>
                        )}
                    </CoursesHeader>
                    <CoursesGrid>
                        {courses.map(course => (
                            <CourseCard key={course.id}>
                                <CourseText>
                                    <Link to={`/course/${course.id}`} style={{ textDecoration: 'none' }}>
                                        <CourseName>{course.title}</CourseName>
                                    </Link>
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

            {/* Edit Profile Modal */}
            {showEditModal && (
                <ModalOverlay>
                    <ModalContent>
                        <h2>Edit Profile</h2>
                        <form onSubmit={handleSaveChanges}>
                            <FormGroup>
                                <Label htmlFor="language">Language</Label>
                                <Select
                                    id="language"
                                    value={newLanguage}
                                    onChange={(e) => setNewLanguage(e.target.value)}
                                >
                                    <option value="">Select Language</option>
                                    <option value="ENGLISH">ENGLISH</option>
                                    <option value="KOREAN">KOREAN</option>
                                    <option value="JAPANESE">JAPANESE</option>
                                    <option value="CHINESE">CHINESE</option>
                                    <option value="SPANISH">SPANISH</option>
                                    <option value="FRENCH">FRENCH</option>
                                </Select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="description">Description</Label>
                                <TextArea
                                    id="description"
                                    rows="4"
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="tag">Tag (쉼표로 구분)</Label>
                                <Input
                                    id="tag"
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="file">Profile Image</Label>
                                <Input
                                    id="file"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </FormGroup>
                            {message && <p>{message}</p>}
                            {pwError && <p style={{ color: 'red' }}>{pwError}</p>}
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <SaveButton type="submit">Save Changes</SaveButton>
                                <CancelButton type="button" onClick={handleCloseEditModal}>Cancel</CancelButton>
                            </div>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}

            {/* Create Course Modal */}
            {showCreateCourseModal && (
                <ModalOverlay>
                    <ModalContent>
                        <h2>Create Course</h2>
                        <form onSubmit={handleCreateCourse}>
                            <FormGroup>
                                <Label htmlFor="courseTitle">Course Title</Label>
                                <Input
                                    id="courseTitle"
                                    type="text"
                                    value={newCourseTitle}
                                    onChange={(e) => setNewCourseTitle(e.target.value)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="courseDescription">Description</Label>
                                <TextArea
                                    id="courseDescription"
                                    rows="4"
                                    value={newCourseDescription}
                                    onChange={(e) => setNewCourseDescription(e.target.value)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="maxStudents">Max Students</Label>
                                <Input
                                    id="maxStudents"
                                    type="number"
                                    value={newCourseMaxStudents}
                                    onChange={(e) => setNewCourseMaxStudents(e.target.value)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="courseLanguage">Language</Label>
                                <Select
                                    id="courseLanguage"
                                    value={newCourseLanguage}
                                    onChange={(e) => setNewCourseLanguage(e.target.value)}
                                    required
                                >
                                    <option value="">Select Language</option>
                                    <option value="ENGLISH">ENGLISH</option>
                                    <option value="KOREAN">KOREAN</option>
                                    <option value="JAPANESE">JAPANESE</option>
                                    <option value="CHINESE">CHINESE</option>
                                    <option value="SPANISH">SPANISH</option>
                                    <option value="FRENCH">FRENCH</option>
                                </Select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="courseLevel">Course Level</Label>
                                <Select
                                    id="courseLevel"
                                    value={newCourseLevel}
                                    onChange={(e) => setNewCourseLevel(e.target.value)}
                                    required
                                >
                                    <option value="">Select Level</option>
                                    <option value="BEGINNER">Beginner</option>
                                    <option value="INTERMEDIATE">Intermediate</option>
                                    <option value="ADVANCED">Advanced</option>
                                </Select>
                            </FormGroup>
                            {courseMessage && <p>{courseMessage}</p>}
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <SaveButton type="submit">Create Course</SaveButton>
                                <CancelButton type="button" onClick={handleCloseCreateCourseModal}>Cancel</CancelButton>
                            </div>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageContainer>
    );
};

export default TeacherProfile;
