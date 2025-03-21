import React, { useState } from 'react';
import { uploadApi } from '../api/fileUploadApi'; // API 함수 import

const CoursePostFileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const [coursePostId, setCoursePostId] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setMessage('파일을 선택해주세요.');
            return;
        }

        if (!coursePostId) {
            setMessage('Course Post ID를 입력해주세요.');
            return;
        }

        try {
            const response = await uploadApi.coursePostFileUpload(coursePostId, selectedFile);
            setMessage(`파일 업로드 성공: ${response.data}`);
        } catch (error) {
            setMessage(`업로드 실패: ${error.response?.data || error.message}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleUpload}>
                <input
                    type="text"
                    placeholder="Course Post ID"
                    value={coursePostId}
                    onChange={(e) => setCoursePostId(e.target.value)}
                />
                <input type="file" onChange={handleFileChange} />
                <button type="submit">업로드</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CoursePostFileUpload;
