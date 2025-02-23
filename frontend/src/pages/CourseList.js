import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { courseApi } from '../api/courseApi';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
`;

const Main = styled.main`
    flex: 1;
    background: #fff;
`;

const SectionContent = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
`;

const RecommendationSection = styled.section`
    width: 100%;
    padding: 60px 0;
    text-align: center;
`;

const PageTitle = styled.h1`
    font-size: 2rem;
    margin-bottom: 40px;
`;

/* 필터 관련 스타일 */
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

/* 버튼 스타일 (선택 여부에 따라 색상 변경) */
const FilterButton = styled.button`
    padding: 10px 20px;
    width: 150px;
    font-size: 14px;
    background: ${({ selected }) => (selected ? '#007BFF' : '#f0f0f0')};
    color: ${({ selected }) => (selected ? '#fff' : '#000')};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;

    &:hover {
        background: ${({ selected }) => (selected ? '#0056b3' : '#e6e6e6')};
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

const ActionButtons = styled.div`
    width: 100%;
    display: flex;
    gap: 16px;
    justify-content: center;
`;

const ClearButton = styled.button`
    padding: 12px 28px;
    width: 230px;
    background: #fff;
    color: #000;
    font-size: 16px;
    border: 1px solid #000;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background: #f7f7f7;
    }
    @media (max-width: 480px) {
        width: 100%;
    }
`;

const SubmitButton = styled.button`
    padding: 12px 28px;
    background: #000;
    color: #fff;
    width: 230px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background: #333;
    }
    @media (max-width: 480px) {
        width: 100%;
    }
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: #ccc;
    margin: 40px 0;
`;

/* Courses Section 스타일 */
const CoursesSection = styled.section`
    width: 100%;
    padding: 40px 0;
    box-sizing: border-box;
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
    @media (max-width: 480px) {
        flex: 1 1 100%;
    }
`;

const CourseTitle = styled.h3`
    margin: 0 0 8px 0;
    font-size: 18px;
    color: #000;
`;

const CourseInfo = styled.p`
    margin: 4px 0;
    font-size: 14px;
    color: #444;
`;

/* 무한 스크롤을 위한 sentinel 스타일 */
const Sentinel = styled.div`
    height: 1px;
`;

const CourseList = () => {
    const [featuredCourses, setFeaturedCourses] = useState([]);
    const [searchCourses, setSearchCourses] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);

    // 무한 스크롤 관련 상태
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef();
    const sentinelRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMore();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
        courseApi.getCourses(0, 3)
            .then(response => setFeaturedCourses(response.data.content || response.data))
            .catch(error => console.error('Failed to fetch featured courses', error));
    }, []);

    // 토글 기능: 이미 선택된 필터를 다시 클릭하면 해제
    const handleLanguageClick = (lang) => {
        if (selectedLanguage === lang) {
            setSelectedLanguage(null);
        } else {
            setSelectedLanguage(lang);
        }
    };

    const handleLevelClick = (level) => {
        if (selectedLevel === level) {
            setSelectedLevel(null);
        } else {
            setSelectedLevel(level);
        }
    };

    // 초기 검색: 기존 결과 초기화 후 첫 페이지 데이터 로드
    const handleSearch = () => {
        setSearchCourses([]);
        setCurrentPage(0);
        setHasMore(true);
        setSearchPerformed(true);
        setLoading(true);
        courseApi.getSearchCourses(selectedLanguage, selectedLevel, 0, 6)
            .then(response => {
                const initialCourses = response.data.content || response.data;
                setSearchCourses(initialCourses);
                if (initialCourses.length < 6) {
                    setHasMore(false);
                }
            })
            .catch(error => console.error('Failed to load search courses', error))
            .finally(() => setLoading(false));
    };

    // 무한 스크롤로 추가 데이터 로드
    const loadMore = () => {
        setLoading(true);
        courseApi.getSearchCourses(selectedLanguage, selectedLevel, currentPage + 1, 6)
            .then(response => {
                const newCourses = response.data.content || response.data;
                setSearchCourses(prev => [...prev, ...newCourses]);
                setCurrentPage(prev => prev + 1);
                if (newCourses.length < 6) {
                    setHasMore(false);
                }
            })
            .catch(error => console.error('Failed to load more courses', error))
            .finally(() => setLoading(false));
    };

    return (
        <PageContainer>
            <Header />
            <Main>
                <RecommendationSection>
                    <SectionContent>
                        <PageTitle>Get a course recommendation for you</PageTitle>
                        <FilterArea>
                            <FilterContainer>
                                <LeftFilterColumn>
                                    <FilterLabel>Language</FilterLabel>
                                    <LanguageGrid>
                                        {['KOREAN', 'ENGLISH', 'JAPANESE', 'CHINESE', 'SPANISH', 'FRENCH'].map(lang => (
                                            <FilterButton
                                                key={lang}
                                                onClick={() => handleLanguageClick(lang)}
                                                selected={selectedLanguage === lang}
                                            >
                                                {lang}
                                            </FilterButton>
                                        ))}
                                    </LanguageGrid>
                                </LeftFilterColumn>
                                <RightFilterColumn>
                                    <FilterLabel>Level</FilterLabel>
                                    <LevelRow>
                                        {['BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map(level => (
                                            <FilterButton
                                                key={level}
                                                onClick={() => handleLevelClick(level)}
                                                selected={selectedLevel === level}
                                            >
                                                {level}
                                            </FilterButton>
                                        ))}
                                    </LevelRow>
                                </RightFilterColumn>
                            </FilterContainer>
                            <ActionButtons>
                                <ClearButton
                                    onClick={() => {
                                        setSelectedLanguage(null);
                                        setSelectedLevel(null);
                                        setSearchCourses([]);
                                        setSearchPerformed(false);
                                        setCurrentPage(0);
                                        setHasMore(true);
                                    }}
                                >
                                    Clear
                                </ClearButton>
                                <SubmitButton onClick={handleSearch}>Submit</SubmitButton>
                            </ActionButtons>
                        </FilterArea>
                        <Divider />
                    </SectionContent>
                </RecommendationSection>

                <CoursesSection>
                    <SectionContent>
                        <h2>Featured Courses</h2>
                        <CoursesGrid>
                            {featuredCourses.map(course => (
                                <CourseCard key={course.id}>
                                    <CourseTitle>{course.title}</CourseTitle>
                                    <CourseInfo><strong>Teacher:</strong> {course.teacherId}</CourseInfo>
                                    <CourseInfo><strong>Description:</strong> {course.description}</CourseInfo>
                                    <CourseInfo><strong>Max Students:</strong> {course.maxStudents}</CourseInfo>
                                    <CourseInfo><strong>Language:</strong> {course.language}</CourseInfo>
                                    <CourseInfo><strong>Level:</strong> {course.level}</CourseInfo>
                                </CourseCard>
                            ))}
                        </CoursesGrid>
                    </SectionContent>
                </CoursesSection>

                {searchPerformed && (
                    <CoursesSection>
                        <SectionContent>
                            <h2>Search Results</h2>
                            <CoursesGrid>
                                {searchCourses.map(course => (
                                    <CourseCard key={course.id}>
                                        <CourseTitle>{course.title}</CourseTitle>
                                        <CourseInfo><strong>Teacher:</strong> {course.teacherName}</CourseInfo>
                                        <CourseInfo><strong>Description:</strong> {course.description}</CourseInfo>
                                        <CourseInfo><strong>Max Students:</strong> {course.maxStudents}</CourseInfo>
                                        <CourseInfo><strong>Language:</strong> {course.language}</CourseInfo>
                                        <CourseInfo><strong>Level:</strong> {course.level}</CourseInfo>
                                    </CourseCard>
                                ))}
                            </CoursesGrid>
                            {loading && <p>Loading...</p>}
                            {!loading && hasMore && <Sentinel ref={sentinelRef} />}
                        </SectionContent>
                    </CoursesSection>
                )}
            </Main>
            <Footer />
        </PageContainer>
    );
};

export default CourseList;
