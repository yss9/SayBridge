import React, { useEffect, useState } from 'react';
import {userInfoApi} from "../api/authApi";

const Home = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    useEffect(() => {

        const fetchProfile = async () =>{
            try{
                const response = await userInfoApi.userInfo();
                setProfile(response.data);
            } catch (err){
                console.error("프로필가져오기 실패",err)
                setError('프로필 가져오기 실패');
            }

        };
        fetchProfile();
    }, []);
    if(error){
        return <div>{error}</div>
    }

    if(!profile){
        return <div>로딩중...</div>
    }

    return (
        <div>
            <h1>로그인 테스트</h1>
            <p>이메일:{profile.email}</p>
            <p>사용자명:{profile.username}</p>
            <p>닉네임:{profile.nickname}</p>
        </div>
    );
};

export default Home;