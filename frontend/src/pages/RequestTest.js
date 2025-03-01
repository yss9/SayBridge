import React, { useEffect, useState } from "react";
import axios from "axios";
import { userInfoApi } from "../api/userApi";

const RequestTest = () => {
    const [formData, setFormData] = useState({
        username: "",
        nickname: "",
        imageUrl: "",
        password: "",
        newPassword: "",
    });

    const [message, setMessage] = useState("");
    const [user, setUser] = useState({});

    // 폼 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await userInfoApi.userInfo();
                setUser(response.data);
            } catch (err) {
                console.error("프로필 가져오기 실패", err);
            }
        };
        fetchProfile();
    }, []);

    // 폼 제출 시 빈 문자열인 필드를 제거하고 PATCH 요청 보내기
    const handleSubmit = async (e) => {
        e.preventDefault();
        // 빈 문자열("")인 필드를 제거한 새로운 객체 생성
        const filteredData = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value !== "")
        );
        try {
            const response = await axios.patch(
                "http://localhost:8080/api/user/update",
                filteredData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // CSRF 토큰 사용 시 "X-CSRF-TOKEN": "토큰값" 추가
                    },
                    withCredentials: true, // 쿠키 전송을 위해 설정
                }
            );
            console.log(filteredData);
            setMessage("프로필이 성공적으로 업데이트되었습니다.");
        } catch (error) {
            console.error("업데이트 실패", error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setMessage(`업데이트 실패: ${error.response.data.message}`);
            } else {
                setMessage("업데이트 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <div>
            <div>
                <p>{user.username}</p>
                <p>{user.imageUrl}</p>
                <p>{user.nickname}</p>
            </div>
            <h2>프로필 업데이트</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Nickname:</label>
                    <input
                        type="text"
                        name="nickname"
                        placeholder="Nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Image URL"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>현재 Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="현재 Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="새로운 Password"
                        value={formData.newPassword}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">업데이트</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RequestTest;
