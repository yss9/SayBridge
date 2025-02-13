import React from 'react';
import styled from 'styled-components';
import Header from '../component/Header';
import Footer from '../component/Footer';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Main = styled.main`
    flex: 1;
    background: #fff;
`;

const RecommendationSection = styled.section`
    width: 100%;
    padding: 60px 20px;
    text-align: center;
`;

const PageTitle = styled.h1`
    font-size: 2rem;
    margin-bottom: 40px;
`;

const FilterArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const FilterContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 60px;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 16px;
`;

const LeftFilterColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
`;

const RightFilterColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
`;

const FilterLabel = styled.span`
    font-size: 14px;
    font-weight: bold;
`;

const LanguageGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
`;

const LevelRow = styled.div`
    display: flex;
    gap: 12px;
`;

const FilterButton = styled.button`
    width: 200px;
    padding: 10px;
    font-size: 14px;
    background: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background: #e6e6e6;
    }
`;

const ActionButtons = styled.div`
    width: 100%;
    display: flex;
    gap: 16px;
    justify-content: center;
`;

const ClearButton = styled.button`
    width: 200px;
    padding: 12px 28px;
    background: #fff;
    color: #000;
    font-size: 16px;
    border: 1px solid #000;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background: #f7f7f7;
    }
`;

const SubmitButton = styled.button`
    width: 200px;
    padding: 12px 28px;
    background: #000;
    color: #fff;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background: #333;
    }
`;

const Divider = styled.div`
    width: 100%;
    max-width: 1200px;
    height: 1px;
    background: #ccc;
    margin: 24px auto 0 auto;
`;

const TeacherSection = styled.section`
    width: 100%;
    padding: 60px 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    box-sizing: border-box;
    max-width: 1200px;
    margin: 0 auto;
`;

const TeacherInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 600px;
`;

const TeacherName = styled.h2`
    font-size: 2rem;
    margin: 0;
`;

const TeacherDesc = styled.p`
    font-size: 14px;
    color: #555;
    margin: 0 0 8px 0;
`;

const ViewAllButton = styled.button`
    padding: 12px 20px;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    width: fit-content;

    &:hover {
        background: #333;
    }
`;

const TeacherImage = styled.div`
    width: 160px;
    height: 160px;
    background: #ccc;
    border-radius: 4px;
`;

const CoursesSection = styled.section`
    width: 100%;
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

const CoursesGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const CourseCard = styled.div`
    flex: 1 1 280px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 16px;
    box-sizing: border-box;
    min-width: 220px;
`;

const BadgeRow = styled.div`
    margin-bottom: 8px;
    display: flex;
    gap: 6px;
`;

const Badge = styled.span`
    font-size: 12px;
    background: #eee;
    border-radius: 4px;
    padding: 2px 6px;
`;

const CourseImage = styled.div`
    width: 100%;
    height: 140px;
    background: #ccc;
    border-radius: 4px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #555;
    font-size: 14px;
`;

const CourseTitle = styled.h3`
  margin: 0 0 4px 0;
  font-size: 16px;
`;

const CourseLevel = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const RecommendationPage = () => {
    return (
        <PageContainer>
            <Header />
            <Main>
                <RecommendationSection>
                    <PageTitle>Get a teacher recommendation for you</PageTitle>

                    <FilterArea>
                        <FilterContainer>
                            <LeftFilterColumn>
                                <FilterLabel>Language</FilterLabel>
                                <LanguageGrid>
                                    <FilterButton>Korean</FilterButton>
                                    <FilterButton>English</FilterButton>
                                    <FilterButton>Japanese</FilterButton>
                                    <FilterButton>Chinese</FilterButton>
                                </LanguageGrid>
                            </LeftFilterColumn>

                            <RightFilterColumn>
                                <FilterLabel>Level</FilterLabel>
                                <LevelRow>
                                    <FilterButton>Beginner</FilterButton>
                                    <FilterButton>Intermediate</FilterButton>
                                    <FilterButton>Advanced</FilterButton>
                                </LevelRow>
                            </RightFilterColumn>
                        </FilterContainer>

                        <ActionButtons>
                            <ClearButton>Clear</ClearButton>
                            <SubmitButton>Submit</SubmitButton>
                        </ActionButtons>
                    </FilterArea>

                    <Divider />
                </RecommendationSection>

                <TeacherSection>
                    <TeacherInfo>
                        <TeacherName>Elsa</TeacherName>
                        <TeacherDesc>Explore our popular language learning courses</TeacherDesc>
                        <ViewAllButton>View All Courses</ViewAllButton>
                    </TeacherInfo>
                    <TeacherImage />
                </TeacherSection>

                <CoursesSection>
                    <CoursesGrid>
                        <CourseCard>
                            <BadgeRow>
                                <Badge>New</Badge>
                            </BadgeRow>
                            <CourseImage>Course Image 1</CourseImage>
                            <CourseTitle>Korean Conversation</CourseTitle>
                            <CourseLevel>Intermediate Level</CourseLevel>
                        </CourseCard>
                        <CourseCard>
                            <BadgeRow>
                                <Badge>Recommended</Badge>
                            </BadgeRow>
                            <CourseImage>Course Image 2</CourseImage>
                            <CourseTitle>Business English</CourseTitle>
                            <CourseLevel>Advanced Level</CourseLevel>
                        </CourseCard>
                        <CourseCard>
                            <BadgeRow>
                                <Badge>Popular</Badge>
                            </BadgeRow>
                            <CourseImage>Course Image 3</CourseImage>
                            <CourseTitle>TOPIK Preparation</CourseTitle>
                            <CourseLevel>Beginner to Advanced</CourseLevel>
                        </CourseCard>
                    </CoursesGrid>

                    <CoursesGrid style={{ marginTop: '20px' }}>
                        <CourseCard style={{ flex: '1 1 100%' }}>
                            <BadgeRow>
                                <Badge>Updated</Badge>
                            </BadgeRow>
                            <CourseImage>Course Image 4</CourseImage>
                            <CourseTitle>English Pronunciation</CourseTitle>
                            <CourseLevel>All Levels</CourseLevel>
                        </CourseCard>
                    </CoursesGrid>
                </CoursesSection>
            </Main>
            <Footer />
        </PageContainer>
    );
};

export default RecommendationPage;
