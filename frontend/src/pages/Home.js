import React, { useEffect, useState } from 'react';
import userApi from "../api/userApi";

const Home = () => {
    const [data, setUsers] = useState('');
    useEffect(() => {
        // 사용자 목록 가져오기
        userApi
            .getUsers()
            .then((response) => setUsers(response.data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);


    return (
        <div>
            <h1>API 테스트</h1>
            <p>{data}</p> {/* 상태 데이터를 화면에 출력 */}
        </div>
    );
};

export default Home;