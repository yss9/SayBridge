import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { courseApplicationApi, courseEnrollmentApi } from '../api/courseApi';

// 모달 관련 Styled Components
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-height: 80vh;
    overflow-y: auto;
    width: 400px;
`;

const CloseButton = styled.button`
    background: #ccc;
    border: none;
    padding: 5px 10px;
    margin-bottom: 10px;
    cursor: pointer;
`;

// ===================================================
// EnrollmentApplicationModal (수강신청 리스트 모달)
// ===================================================
export const EnrollmentApplicationModal = ({ courseId, onClose }) => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        courseApplicationApi.getCourseApplicationList(courseId)
            .then(response => setApplications(response.data))
            .catch(error => console.error('수강신청 리스트 조회 실패', error));
    }, [courseId]);

    const handleAccept = (applicationId) => {
        courseApplicationApi.acceptCourseApplication(applicationId)
            .then(() => {
                setApplications(applications.filter(app => app.id !== applicationId));
            })
            .catch(error => console.error('수강신청 수락 실패', error));
    };

    const handleReject = (applicationId) => {
        courseApplicationApi.rejectCourseApplication(applicationId)
            .then(() => {
                setApplications(applications.filter(app => app.id !== applicationId));
            })
            .catch(error => console.error('수강신청 거절 실패', error));
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <CloseButton onClick={onClose}>닫기</CloseButton>
                <h3>수강신청 리스트</h3>
                {applications.length === 0 ? (
                    <p>신청된 수강신청이 없습니다.</p>
                ) : (
                    applications.map((app) => (
                        <div key={app.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                            <p>{app.studentName}</p>
                            <div>
                                <button onClick={() => handleAccept(app.id)}>수락</button>
                                <button onClick={() => handleReject(app.id)}>거절</button>
                            </div>
                        </div>
                    ))
                )}
            </ModalContent>
        </ModalOverlay>
    );
};

// ===================================================
// EnrolledStudentsModal (수강 인원 목록 모달)
// ===================================================
export const EnrolledStudentsModal = ({ courseId, onClose }) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        courseEnrollmentApi.getCourseEnrollmentList(courseId)
            .then(response => setStudents(response.data))
            .catch(error => console.error('수강 인원 조회 실패', error));
    }, [courseId]);

    const handleExpel = (enrollmentId) => {
        courseEnrollmentApi.expelCourseEnrollment(enrollmentId)
            .then(() => {
                setStudents(students.filter(student => student.id !== enrollmentId));
            })
            .catch(error => console.error('학생 강퇴 실패', error));
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <CloseButton onClick={onClose}>닫기</CloseButton>
                <h3>수강 인원 목록</h3>
                {students.length === 0 ? (
                    <p>현재 수강 중인 학생이 없습니다.</p>
                ) : (
                    students.map((student) => (
                        <div key={student.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                            <p>{student.studentName}</p>
                            <p>가입일: {new Date(student.joinedAt).toLocaleString()}</p>
                            <button onClick={() => handleExpel(student.id)}>강퇴</button>
                        </div>
                    ))
                )}
            </ModalContent>
        </ModalOverlay>
    );
};
