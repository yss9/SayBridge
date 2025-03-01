import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { userInfoApi } from "../api/userApi";
import { uploadApi, authApi } from "../api/authApi";
import { courseApi } from "../api/courseApi";

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
    width: 1000px;    /* ★ 고정 폭 ★ */
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

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(0, prev - 3));
    };

    const handleNext = () => {
        setCurrentIndex(prev => {
            const newIndex = prev + 3;
            return newIndex < courses.length ? newIndex : prev;
        });
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

    // 코스가 3개 미만이면 가운데 정렬
    const isCenter = courses.length < 3;

    // 화살표 비활성화 조건
    const disablePrev = currentIndex === 0 || courses.length <= 3;
    const disableNext = currentIndex + 3 >= courses.length || courses.length <= 3;

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
                            {courses.slice(currentIndex, currentIndex + 3).map(course => (
                                <CourseCard key={course.id} id={`course-${course.id}`}>
                                    <CourseImage />
                                    <CourseName>{course.title}</CourseName>
                                    <CourseInfo>Teacher: {course.teacherId}</CourseInfo>
                                    <CourseInfo>Description: {course.description}</CourseInfo>
                                    <CourseInfo>Max Students: {course.maxStudents}</CourseInfo>
                                    <CourseInfo>Language: {course.language}</CourseInfo>
                                    <CourseInfo>Level: {course.level}</CourseInfo>
                                </CourseCard>
                            ))}
                        </CoursesList>

                        <RightArrow onClick={handleNext} disabled={disableNext}>
                            ▶
                        </RightArrow>
                    </SliderContainer>

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
        </PageContainer>
    );
};

export default MyPage;
