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
    background: #ccc;
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
    gap: 10px;
    flex-wrap: wrap;
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

const ReadMoreButton = styled.button`
    padding: 12px 24px;
    border: none;
    background: #000;
    color: #fff;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
`;

const BioSection = styled.section`
    width: 100%;
    max-width: 1000px;
    padding: 40px 20px;
    display: flex;
    align-items: center;
    gap: 40px;
`;

const BioImage = styled.div`
    width: 180px;
    height: 180px;
    background: #ccc;
`;

const BioContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const BioTitle = styled.h2`
    font-size: 28px;
    margin: 0;
`;

const BioText = styled.p`
    font-size: 14px;
    color: #555;
    margin: 0;
`;

const QualificationsButton = styled.button`
    padding: 12px 24px;
    border: none;
    background: #000;
    color: #fff;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
`;

const InfoGrid = styled.div`
    width: 100%;
    max-width: 1000px;
    padding: 40px 20px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
`;

const InfoCard = styled.div`
    flex: 1 1 300px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 20px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
`;

const InfoImage = styled.div`
    width: 60px;
    height: 60px;
    background: #ccc;
`;

const InfoTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const InfoCardTitle = styled.h3`
    margin: 0;
    font-size: 18px;
`;

const InfoCardSubtitle = styled.span`
    font-size: 14px;
    color: #666;
`;

const InfoCardDescription = styled.p`
    margin: 0;
    font-size: 14px;
    color: #333;
`;

const InfoBadge = styled.span`
    background: #eee;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
`;

const InfoIcon = styled.span`
    font-size: 18px;
`;

const TeacherProfile = () => {
    return (
        <PageContainer>
            <Header />
            <Main>
                <ProfileSection>
                    <TeacherInfo>
                        <TeacherPhoto />
                        <TeacherDetails>
                            <TeacherName>Teacher Name</TeacherName>
                            <TagContainer>
                                <Tag>Math Teacher</Tag>
                                <Tag>Science Lover</Tag>
                            </TagContainer>
                            <TeacherDescription>Passionate about educating young minds</TeacherDescription>
                        </TeacherDetails>
                    </TeacherInfo>
                    <ReadMoreButton>Read More</ReadMoreButton>
                </ProfileSection>
                <BioSection>
                    <BioImage />
                    <BioContent>
                        <BioTitle>Bio</BioTitle>
                        <BioText>Learn more about the teacher</BioText>
                        <QualificationsButton>View Qualifications</QualificationsButton>
                    </BioContent>
                </BioSection>
                <InfoGrid>
                    <InfoCard>
                        <InfoImage />
                        <InfoTextWrapper>
                            <InfoCardTitle>Education</InfoCardTitle>
                            <InfoCardSubtitle>Masters in Education</InfoCardSubtitle>
                            <InfoCardDescription>
                                Graduated with honors from University
                            </InfoCardDescription>
                            <InfoBadge>Certified Teacher</InfoBadge>
                            <InfoIcon>📚</InfoIcon>
                        </InfoTextWrapper>
                    </InfoCard>
                    <InfoCard>
                        <InfoImage />
                        <InfoTextWrapper>
                            <InfoCardTitle>Experience</InfoCardTitle>
                            <InfoCardSubtitle>10+ years of teaching</InfoCardSubtitle>
                            <InfoCardDescription>
                                Taught in various schools and programs
                            </InfoCardDescription>
                            <InfoBadge>Effective Communicator</InfoBadge>
                            <InfoIcon>🍎</InfoIcon>
                        </InfoTextWrapper>
                    </InfoCard>
                </InfoGrid>
            </Main>
            <Footer />
        </PageContainer>
    );
};

export default TeacherProfile;
