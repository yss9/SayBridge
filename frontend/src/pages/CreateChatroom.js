import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateChatroom = () => {
    const [maxParticipants, setMaxParticipants] = useState(10);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleCreateChatroom = async () => {
        try {
            // 백엔드 엔드포인트에 maxParticipants 전달하여 채팅방 생성 요청
            const response = await axios.post("http://localhost:8080/chatrooms", null, {
                params: { maxParticipants },
            });
            const chatRoom = response.data;
            // 생성된 채팅방의 chatCode로 ChatRoomPage로 이동
            navigate(`/chatroom/${chatRoom.chatCode}`);
        } catch (err) {
            console.error(err);
            setError("채팅방 생성에 실패했습니다.");
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <h2>채팅방 생성</h2>
            <div style={{ marginBottom: "12px" }}>
                <label>
                    최대 참여 인원:
                    <input
                        type="number"
                        value={maxParticipants}
                        onChange={(e) => setMaxParticipants(Number(e.target.value))}
                        min="1"
                        style={{ marginLeft: "8px", width: "60px" }}
                    />
                </label>
            </div>
            <button onClick={handleCreateChatroom}>채팅생성하기</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default CreateChatroom;
