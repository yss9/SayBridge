import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { userInfoApi } from "../api/userApi";
import { uploadApi, authApi } from "../api/authApi";
import { courseApi } from "../api/courseApi";
import { reviewApi } from "../api/reviewApi";

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
    border-radius: 100%;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
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

const SliderContainer = styled.div`
    position: relative;
    width: 1000px; /* 고정 폭 */
    margin: 0 auto;
    overflow: visible;
    box-sizing: border-box;
`;

const CoursesList = styled.div`
    display: flex;
    gap: 20px;
    justify-content: ${(props) => (props.$center ? 'center' : 'flex-start')};
`;

const CourseCard = styled.div`
    flex: none;
    width: 280px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: #fff;
`;

const CourseImage = styled.div`
    width: 100%;
    height: 120px;
    background: #ccc;
    border-radius: 4px;
`;

const CourseName = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const CourseInfo = styled.div`
    font-size: 14px;
    color: #666;
`;

const ReviewButton = styled.button`
    background: #007BFF;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
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

const ReviewSliderContainer = styled.div`
    position: relative;
    width: 1000px; /* 고정 폭 */
    margin: 0 auto;
    overflow: visible;
    box-sizing: border-box;
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
    justify-content: ${(props) => (props.$center ? 'center' : 'flex-start')};
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
    position: relative;
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

const DeleteButton = styled.button`
    background: none;
    border: none;
    font-size: 16px;
    color: red;
    cursor: pointer;
    position: absolute;
    top: 8px;
    right: 8px;
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

const CheckButton = styled.button`
    background: #007BFF;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
        background: #0056b3;
    }
`;

const MyPage = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [profile, setProfile] = useState({});
    const [file, setFile] = useState(null);
    const [nickname, setNickname] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [currentPwVerified, setCurrentPwVerified] = useState(false);
    const [pwError, setPwError] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState("");
    const [courses, setCourses] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [reviews, setReviews] = useState([]);
    const [reviewsIndex, setReviewsIndex] = useState(0);
    const [reviewMap, setReviewMap] = useState({});

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [currentCourseForReview, setCurrentCourseForReview] = useState(null);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewContent, setReviewContent] = useState("");


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileResponse = await userInfoApi.userInfo();
                setProfile(profileResponse.data);
                setNickname(profileResponse.data.nickname || "");
                setEmail(profileResponse.data.email || "");

                const coursesResponse = await courseApi.getCourseByUserId();
                setCourses(coursesResponse.data);
            } catch (err) {
                console.error("프로필 가져오기 실패", err);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        const fetchMyReviews = async () => {
            try {
                const response = await reviewApi.getMyReview();
                setReviews(response.data);
            } catch (err) {
                console.error("내 리뷰 가져오기 실패", err);
            }
        };
        fetchMyReviews();
    }, []);


    useEffect(() => {
        const newMap = {};
        reviews.forEach((r) => {
            newMap[r.courseId] = r;
        });
        setReviewMap(newMap);
    }, [reviews]);

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(0, prev - 3));
    };

    const handleNext = () => {
        setCurrentIndex(prev => {
            const newIndex = prev + 3;
            return newIndex < courses.length ? newIndex : prev;
        });
    };

    const handleReviewsPrev = () => {
        setReviewsIndex(prev => Math.max(0, prev - 2));
    };

    const handleReviewsNext = () => {
        setReviewsIndex(prev => {
            const newIndex = prev + 2;
            return newIndex < reviews.length ? newIndex : prev;
        });
    };

    const openReviewModal = (course) => {
        setCurrentCourseForReview(course);
        setIsReviewModalOpen(true);
    };

    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
        setCurrentCourseForReview(null);
        setReviewRating(5);
        setReviewContent("");
    };

    const handleSubmitReview = async (event) => {
        event.preventDefault();
        try {
            await reviewApi.createReview({
                courseId: currentCourseForReview.id,
                rating: reviewRating,
                content: reviewContent,
            });

            const response = await reviewApi.getMyReview();
            setReviews(response.data);
            closeReviewModal();
        } catch (err) {
            console.error("리뷰 작성 오류", err);
        }
    };


    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentPassword("");
        setNewPassword("");
        setCurrentPwVerified(false);
        setPwError("");
        setProfileImage("");
    };

    const handleCheckCurrentPassword = async () => {
        try {
            const request = { email, password: currentPassword };
            const res = await authApi.verifyPassword(request);
            if (res.data.success) {
                setCurrentPwVerified(true);
                setPwError("");
            } else {
                setCurrentPwVerified(false);
                setPwError(res.data.message);
            }
        } catch (err) {
            setPwError('비밀번호 확인 중 오류가 발생했습니다.');
        }
    };

    const validateNewPassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSaveChanges = async (event) => {
        event.preventDefault();
        let updateFileUrl = "";
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

        if (newPassword && !validateNewPassword(newPassword)) {
            setPwError("새 비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.");
            return;
        }

        let updateData = {
            nickname: nickname,
            imageUrl: updateFileUrl,
            password: currentPassword,
            newPassword: newPassword,
        };

        updateData = Object.fromEntries(
            Object.entries(updateData).filter(
                ([, value]) => value !== "" && value !== null && value !== undefined
            )
        );

        try {
            await userInfoApi.updateUserProfile(updateData);
            setMessage("프로필이 성공적으로 업데이트되었습니다.");
            handleCloseEditModal();
        } catch (err) {
            console.error("프로필 업데이트 오류", err);
            setPwError("프로필 업데이트 중 오류가 발생했습니다.");
        }
    };


    const isCenter = courses.length < 3;

    const isReviewsCenter = reviews.length < 3;

    const disablePrev = currentIndex === 0 || courses.length <= 3;
    const disableNext = currentIndex + 3 >= courses.length || courses.length <= 3;

    const disableReviewsPrev = reviewsIndex === 0 || reviews.length <= 2;
    const disableReviewsNext = reviewsIndex + 2 >= reviews.length || reviews.length <= 2;

    const renderStars = (rating) => {
        return "★".repeat(rating) + "☆".repeat(5 - rating);
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await reviewApi.deleteReview(reviewId);
            setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
        } catch (err) {
            console.error("리뷰 삭제 오류", err);
        }
    };

    return (
        <PageContainer>
            <Header />
            <Banner>
                <BannerContent>
                    <UserInfo>
                        <UserPhoto src={profile.profileImageUrl || 'https://via.placeholder.com/100'} />
                        <div>
                            <UserName>{profile.nickname}</UserName>
                            <UserLevel>{profile.username}</UserLevel>
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
                    <SliderContainer>
                        <LeftArrow onClick={handlePrev} disabled={disablePrev}>
                            ◀
                        </LeftArrow>
                        <CoursesList $center={isCenter}>
                            {courses.slice(currentIndex, currentIndex + 3).map(course => {
                                const hasReview = !!reviewMap[course.id];
                                return (
                                    <CourseCard key={course.id} id={`course-${course.id}`}>
                                        <CourseImage />
                                        <CourseName>{course.title}</CourseName>
                                        <CourseInfo>Teacher: {course.teacherId}</CourseInfo>
                                        <CourseInfo>Description: {course.description}</CourseInfo>
                                        <CourseInfo>Max Students: {course.maxStudents}</CourseInfo>
                                        <CourseInfo>Language: {course.language}</CourseInfo>
                                        <CourseInfo>Level: {course.level}</CourseInfo>

                                        {hasReview ? (
                                            <ReviewButton disabled>작성완료</ReviewButton>
                                        ) : (
                                            <ReviewButton onClick={() => openReviewModal(course)}>리뷰작성</ReviewButton>
                                        )}
                                    </CourseCard>
                                );
                            })}
                        </CoursesList>
                        <RightArrow onClick={handleNext} disabled={disableNext}>
                            ▶
                        </RightArrow>
                    </SliderContainer>
                </CoursesSection>

                {/* 리뷰 슬라이더 영역 (2개씩 표시) */}
                <ReviewsSection>
                    <SectionTitle>User Reviews</SectionTitle>
                    <ReviewSliderContainer>
                        <LeftArrow onClick={handleReviewsPrev} disabled={disableReviewsPrev}>
                            ◀
                        </LeftArrow>
                        <ReviewsList $center={isReviewsCenter}>
                            {reviews.slice(reviewsIndex, reviewsIndex + 2).map(review => (
                                <ReviewCard key={review.id}>
                                    <ReviewContent>
                                        <ReviewerName>{review.courseTitle}</ReviewerName>
                                        <ReviewRating>{renderStars(review.rating)}</ReviewRating>
                                        <ReviewText>{review.content}</ReviewText>
                                    </ReviewContent>
                                    <DeleteButton onClick={() => handleDeleteReview(review.id)}>×</DeleteButton>
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

            {/* 프로필 수정 모달 */}
            {isEditModalOpen && (
                <ModalOverlay onClick={handleCloseEditModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={handleCloseEditModal}>×</CloseButton>
                        <ModalTitle>Edit Profile</ModalTitle>
                        <ModalFormGroup>
                            <Label htmlFor="nickname">Nickname</Label>
                            <Input
                                id="nickname"
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="Enter new nickname"
                            />
                        </ModalFormGroup>
                        <ModalFormGroup>
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Enter current password"
                                />
                                <CheckButton onClick={handleCheckCurrentPassword}>Check</CheckButton>
                            </div>
                            {currentPassword && (
                                currentPwVerified ? (
                                    <div style={{ color: 'green', fontSize: '12px' }}>현재 비밀번호가 확인되었습니다.</div>
                                ) : (
                                    pwError && <div style={{ color: 'red', fontSize: '12px' }}>{pwError}</div>
                                )
                            )}
                        </ModalFormGroup>
                        <ModalFormGroup>
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                disabled={!currentPwVerified}
                            />
                        </ModalFormGroup>
                        <ModalFormGroup>
                            <Label>Profile Image</Label>
                            <Input
                                type="file"
                                onChange={handleFileChange}
                            />
                        </ModalFormGroup>
                        <SaveButton onClick={handleSaveChanges}>Save Changes</SaveButton>
                    </ModalContent>
                </ModalOverlay>
            )}

            {/* 리뷰 작성 모달 */}
            {isReviewModalOpen && (
                <ModalOverlay onClick={closeReviewModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={closeReviewModal}>×</CloseButton>
                        <ModalTitle>리뷰 작성</ModalTitle>
                        <ModalFormGroup>
                            <Label>별점 (0~5)</Label>
                            <Input
                                type="number"
                                min="0"
                                max="5"
                                value={reviewRating}
                                onChange={(e) => setReviewRating(Number(e.target.value))}
                            />
                        </ModalFormGroup>
                        <ModalFormGroup>
                            <Label>리뷰 내용</Label>
                            <Input
                                type="text"
                                value={reviewContent}
                                onChange={(e) => setReviewContent(e.target.value)}
                                placeholder="리뷰 내용을 입력하세요."
                            />
                        </ModalFormGroup>
                        <SaveButton onClick={handleSubmitReview}>리뷰 저장</SaveButton>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageContainer>
    );
};

export default MyPage;
