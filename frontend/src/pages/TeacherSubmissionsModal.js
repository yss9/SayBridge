import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { homeworkApi } from '../api/homeworkApi';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 80%;
    max-width: 600px;
`;

const CloseButton = styled.button`
    background: red;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    margin-top: 10px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
`;

const TableHeader = styled.th`
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
`;

const TableCell = styled.td`
    border: 1px solid #ccc;
    padding: 8px;
`;

const TeacherSubmissionsModal = ({ coursePostId, onClose }) => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        homeworkApi.getPostSubmissions(coursePostId)
            .then(response => {
                setSubmissions(response.data);
            })
            .catch(error => console.error("Error fetching submissions", error));
    }, [coursePostId]);

    return (
        <ModalOverlay>
            <ModalContent>
                <h2>제출된 파일 목록</h2>
                <Table>
                    <thead>
                    <tr>
                        <TableHeader>학생 이름</TableHeader>
                        <TableHeader>제출 날짜</TableHeader>
                        <TableHeader>파일</TableHeader>
                    </tr>
                    </thead>
                    <tbody>
                    {submissions.map(submission => (
                        <tr key={submission.submissionId}>
                            <TableCell>{submission.studentName}</TableCell>
                            <TableCell>{new Date(submission.submittedAt).toLocaleString()}</TableCell>
                            <TableCell>
                                <a href={submission.fileUrl} target="_blank" rel="noopener noreferrer">
                                    파일 다운로드
                                </a>
                            </TableCell>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <CloseButton onClick={onClose}>닫기</CloseButton>
            </ModalContent>
        </ModalOverlay>
    );
};

export default TeacherSubmissionsModal;
