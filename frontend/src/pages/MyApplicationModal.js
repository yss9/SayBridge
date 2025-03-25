import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { courseApplicationApi } from "../api/courseApi";

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
    width: 600px;
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
`;

const Title = styled.h3`
    margin: 0;
    font-size: 20px;
    text-align: center;
`;

const ApplicationItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
`;

const Info = styled.div`
    flex: 1;
`;

const CancelButton = styled.button`
    background: red;
    color: #fff;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
`;

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 16px;
    gap: 8px;
`;

const PageButton = styled.button`
    padding: 4px 8px;
    border: 1px solid #ccc;
    background: ${({ active }) => (active ? '#333' : 'white')};
    color: ${({ active }) => (active ? 'white' : 'black')};
    cursor: pointer;
`;

const MyApplicationModal = ({ onClose }) => {
    const [applications, setApplications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const applicationsPerPage = 3;

    const fetchApplications = async () => {
        try {
            // API 호출: 내 수강신청 내역(UserCourseApplicationDto 배열)을 반환한다고 가정
            const res = await courseApplicationApi.getMyApplicationList();
            setApplications(res.data);
            console.log(res.data)
        } catch (error) {
            console.error("내 수강신청 내역 조회 실패", error);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const totalPages = Math.ceil(applications.length / applicationsPerPage);
    const indexOfLast = currentPage * applicationsPerPage;
    const indexOfFirst = indexOfLast - applicationsPerPage;
    const currentApplications = applications.slice(indexOfFirst, indexOfLast);

    const handleCancel = async (courseId) => {
        try {
            await courseApplicationApi.deleteMyApplication(courseId);
            fetchApplications();
        } catch (error) {
            console.error("수강신청 취소 실패", error);
        }
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>×</CloseButton>
                <Title>내 수강신청 내역</Title>
                {currentApplications.map(app => (
                    <ApplicationItem key={app.id}>
                        <Info>
                            <div><strong>강좌:</strong> {app.courseName}</div>
                            <div><strong>강사:</strong> {app.teacherName}</div>
                            <div><strong>신청일:</strong> {new Date(app.appliedAt).toLocaleString()}</div>
                        </Info>
                        <CancelButton onClick={() => handleCancel(app.courseId)}>취소하기</CancelButton>
                    </ApplicationItem>
                ))}
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
            </ModalContent>
        </ModalOverlay>
    );
};

export default MyApplicationModal;
