import userApi from "./api/userApi";
import React, { useEffect, useState } from 'react';

function App() {
    const [data, setData] = useState(''); // 상태로 문자열 관리

    // API 호출
    useEffect(() => {
        userApi
            .getUsers() // userApi에서 데이터를 가져오는 함수 호출
            .then((response) => {
                setData(response.data); // API 응답 데이터를 상태에 저장
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // 컴포넌트 마운트 시 한 번 실행


    return (
    <div>
      <h1>테스트 : {data}</h1>
    </div>
  );
}

export default App;
