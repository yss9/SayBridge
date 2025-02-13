import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
`;

const ModalContent = styled.div`
    position: relative;
    width: 600px;
    background: #fff;
    border-radius: 8px;
    padding: 24px;
    box-sizing: border-box;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    &:hover {
        color: #777;
    }
`;

const Title = styled.h2`
    margin: 0 0 16px 0;
    text-align: center;
`;

const ApplicantGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* 한 줄에 3명씩 */
    gap: 16px;
    margin-bottom: 16px;
`;

const ApplicantCard = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

const ProfileImage = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 70px;
    object-fit: cover;
    background: #ccc;
`;

const ApplicantName = styled.div`
    font-weight: bold;
`;

const ApplicantLevel = styled.div`
    font-size: 14px;
    color: #666;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;
`;

const AcceptButton = styled.button`
    border: none;
    background: #28a745;
    color: #fff;
    padding: 6px 10px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background: #218838;
    }
`;

const RejectButton = styled.button`
    border: none;
    background: #dc3545;
    color: #fff;
    padding: 6px 10px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background: #c82333;
    }
`;

const PaginationRow = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
`;

const PageButton = styled.button`
  border: 1px solid #ccc;
  background: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const dummyApplicants = [
    { id: 1, nickname: 'Alice', level: 'Intermediate', profileImage: 'https://via.placeholder.com/70?text=Alice' },
    { id: 2, nickname: 'Bob', level: 'Advanced', profileImage: 'https://via.placeholder.com/70?text=Bob' },
    { id: 3, nickname: 'Charlie', level: 'Beginner', profileImage: 'https://via.placeholder.com/70?text=Charlie' },
    { id: 4, nickname: 'Daisy', level: 'Advanced', profileImage: 'https://via.placeholder.com/70?text=Daisy' },
    { id: 5, nickname: 'Edward', level: 'Intermediate', profileImage: 'https://via.placeholder.com/70?text=Edward' },
    { id: 6, nickname: 'Fiona', level: 'Beginner', profileImage: 'https://via.placeholder.com/70?text=Fiona' },
    { id: 7, nickname: 'George', level: 'Advanced', profileImage: 'https://via.placeholder.com/70?text=George' },
    { id: 8, nickname: 'Helen', level: 'Intermediate', profileImage: 'https://via.placeholder.com/70?text=Helen' },
    { id: 9, nickname: 'Helen', level: 'Intermediate', profileImage: 'https://via.placeholder.com/70?text=Helen' },
    { id: 10, nickname: 'Helen', level: 'Intermediate', profileImage: 'https://via.placeholder.com/70?text=Helen' },
];

const itemsPerPage = 6;

const EnrollmentListModal = ({ onClose }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalItems = dummyApplicants.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const applicantsOnPage = dummyApplicants.slice(startIndex, endIndex);

    const handleAccept = (id) => {
        alert(`Accepted user with ID: ${id}`);
        // 실제 로직
    };

    const handleReject = (id) => {
        alert(`Rejected user with ID: ${id}`);
        // 실제 로직
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>×</CloseButton>
                <Title>수강 신청 목록</Title>
                <ApplicantGrid>
                    {applicantsOnPage.map((user) => (
                        <ApplicantCard key={user.id}>
                            <ProfileImage src={user.profileImage} alt="Profile" />
                            <ApplicantName>{user.nickname}</ApplicantName>
                            <ApplicantLevel>{user.level}</ApplicantLevel>
                            <ActionButtons>
                                <AcceptButton onClick={() => handleAccept(user.id)}>Accept</AcceptButton>
                                <RejectButton onClick={() => handleReject(user.id)}>Reject</RejectButton>
                            </ActionButtons>
                        </ApplicantCard>
                    ))}
                </ApplicantGrid>
                <PaginationRow>
                    <PageButton onClick={goToPrevPage} disabled={currentPage === 1}>
                        Prev
                    </PageButton>
                    <div>{currentPage} / {totalPages}</div>
                    <PageButton onClick={goToNextPage} disabled={currentPage === totalPages}>
                        Next
                    </PageButton>
                </PaginationRow>
            </ModalContent>
        </ModalOverlay>
    );
};

export default EnrollmentListModal;
