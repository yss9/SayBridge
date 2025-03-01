import React, {use, useState} from 'react';
import { uploadApi } from '../api/authApi';
import { userInfoApi } from '../api/userApi';
const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState('');
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setMessage('파일을 선택해주세요.');
            return;
        }

        try {
            const response = await uploadApi.fileUpload(selectedFile);
            setMessage(`파일 업로드 성공: ${response.data}`);
        } catch (error) {
            setMessage(`업로드 실패: ${error.response?.data || error.message}`);
        }
    };

    const verifyPassword = async () => {
        if (!password) {
            setMessages("비밀번호를 입력해주세요.");
            return;
        }

        let email = "hi";
        const request = { email, password };

        try {
            const response = await userInfoApi.verifyPassword(request);
            console.log("서버 응답 데이터:", response.data);

            // response.data.message 만 저장 (객체 전체가 아니라)
            setMessages(response.data.message);
        } catch (error) {
            console.error("비밀번호 검증 오류:", error.response?.data || error.message);
            setMessages("비밀번호 검증 실패");
        }
    };

    const handleSaveChanges = async (event) => {
        event.preventDefault();

        // Prepare update data
        try {
            const updateData = {
                username:"zxc",
                nickname:"good",
                imageUrl:"goodgood",
                password:"qwer1234!",
                newPassword:"asdf1234!"
            };
            console.log(updateData)
            await userInfoApi.updateUserProfile(updateData);
        } catch (err) {
            console.error('프로필 업데이트 오류', err);
        }
    };

    return (
        <div>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">업로드</button>
            </form>
            {message && <p>{message}</p>}
            <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={verifyPassword}>check</button>
                <div>hi -> {messages}</div>  {/* 이제 messages는 문자열이므로 오류 없음 */}
            </div>
            <div>
                <button onClick={handleSaveChanges}>바꾸기</button>
            </div>
        </div>
    );
};

export default FileUpload;