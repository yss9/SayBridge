import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { userInfoApi } from "../api/userApi";

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
    const [nickname, setNickname] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentPwVerified, setCurrentPwVerified] = useState(false);
    const [pwError, setPwError] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await userInfoApi.userInfo();
                setProfile(response.data);
                setNickname(response.data.nickname);
            } catch (err) {
                console.error("프로필 가져오기 실패", err);
            }
        };
        fetchProfile();
    }, []);

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        // 모달 닫을 때 관련 상태 초기화
        setCurrentPassword('');
        setNewPassword('');
        setCurrentPwVerified(false);
        setPwError('');
        setProfileImage(null);
    };

    // 현재 비밀번호 확인 API 호출
    const handleCheckCurrentPassword = async () => {
        try {
            const res = await userInfoApi.verifyPassword({ password: currentPassword });
            if (res.data.success) {
                setCurrentPwVerified(true);
                setPwError(res.data.message);
            } else {
                setCurrentPwVerified(false);
                setPwError(res.data.message);
            }
        } catch (err) {
            setPwError('비밀번호 확인 중 오류가 발생했습니다.');
        }
    };

    // 새 비밀번호 유효성 검사 함수 (영문, 숫자, 특수문자 포함 8자 이상)
    const validateNewPassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    };

    // 파일 선택 핸들러
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    // 저장 버튼 클릭 시 처리
    const handleSaveChanges = async () => {
        let uploadedImageUrl = profile.imageUrl || null;

        // 프로필 이미지가 선택되었다면 별도의 업로드 API 호출 (업로드 후 URL 획득)
        if (profileImage) {
            try {
                const formData = new FormData();
                formData.append('profileImage', profileImage);
                const res = await userInfoApi.uploadProfileImage(formData);
                if (res.data.success) {
                    uploadedImageUrl = res.data.imageUrl;
                } else {
                    console.error('프로필 이미지 업로드 실패');
                }
            } catch (err) {
                console.error('프로필 이미지 업로드 중 오류 발생', err);
            }
        }

        // 새 비밀번호가 입력된 경우 유효성 검사 수행
        if (newPassword && !validateNewPassword(newPassword)) {
            setPwError('새 비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.');
            return;
        }

        // 비밀번호 업데이트가 필요한 경우 현재 비밀번호 확인 필수
        if (currentPassword && newPassword) {
            if (!currentPwVerified) {
                setPwError('먼저 현재 비밀번호를 확인해주세요.');
                return;
            }
        }

        // 백엔드에 전달할 업데이트 데이터 구성
        const updateData = {
            username: profile.username, // 변경하지 않을 경우 기존 값 전달
            nickname: nickname,
            imageUrl: uploadedImageUrl,
            password: (currentPassword && newPassword) ? currentPassword : null,
            newPassword: (currentPassword && newPassword) ? newPassword : null,
        };

        try {
            // PATCH /update 엔드포인트로 한 번에 업데이트 요청
            await userInfoApi.updateUserProfile(updateData);
            handleCloseEditModal();
        } catch (err) {
            console.error('프로필 업데이트 오류', err);
            setPwError('프로필 업데이트 중 오류가 발생했습니다.');
        }
    };

    return (
        <PageContainer>
            <Header />
            <Banner>
                <BannerContent>
                    <UserInfo>
                        <UserPhoto />
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
                        </ModalFormGroup>
                        <ModalFormGroup>
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                        </ModalFormGroup>
                        <ModalFormGroup>
                            <Label htmlFor="profileImage">Profile Image</Label>
                            <Input
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </ModalFormGroup>
                        {pwError && (
                            <div style={{ color: 'red', fontSize: '12px' }}>{pwError}</div>
                        )}
                        <SaveButton onClick={handleSaveChanges}>Save Changes</SaveButton>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageContainer>
    );
};

export default MyPage;
