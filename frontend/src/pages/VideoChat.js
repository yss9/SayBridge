// VideoChat.js
import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const VideoChat = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [stompClient, setStompClient] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [localStream, setLocalStream] = useState(null);

    // 테스트용 고정 chatCode (실제 서비스에서는 동적으로 관리)
    const chatCode = 'o5qztq4r';

    // ICE 서버 설정 (구글 STUN 서버 사용)
    const configuration = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    };

    // STOMP 클라이언트 설정 및 연결 (SockJS를 WebSocket 팩토리로 사용)
    useEffect(() => {
        const client = new Client({
            // native WebSocket 대신 SockJS 사용
            webSocketFactory: () => new SockJS('http://localhost:8080/ws-chat'),
            reconnectDelay: 5000,
            debug: (str) => {
                console.log(str);
            }
        });

        client.onConnect = () => {
            console.log('WebSocket 연결 성공');
            // 백엔드에서 발행하는 채널 (/topic/video/{chatCode}) 구독
            client.subscribe(`/topic/video/${chatCode}`, (message) => {
                const data = JSON.parse(message.body);
                console.log('수신한 시그널:', data);
                handleSignal(data);
            });
        };

        client.activate();
        setStompClient(client);
    }, []);

    // 백엔드로 시그널 전송 (offer, answer, candidate)
    const sendSignal = (data) => {
        if (stompClient) {
            stompClient.publish({
                destination: '/app/video.signal',
                body: JSON.stringify(data)
            });
        }
    };

    // 수신한 시그널 처리 (offer, answer, candidate)
    const handleSignal = async (data) => {
        if (data.type === 'offer') {
            // 상대방 offer 수신 시
            if (!peerConnection) {
                await createPeerConnection();
            }
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            sendSignal({
                type: 'answer',
                answer: answer,
                chatCode: chatCode
            });
        } else if (data.type === 'answer') {
            // 상대방 answer 수신 시
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
        } else if (data.type === 'candidate') {
            // ICE candidate 수신 시
            if (data.candidate) {
                try {
                    await peerConnection.addIceCandidate(data.candidate);
                } catch (error) {
                    console.error('ICE candidate 추가 에러:', error);
                }
            }
        }
    };

    // RTCPeerConnection 생성 및 이벤트 핸들러 등록
    const createPeerConnection = async () => {
        const pc = new RTCPeerConnection(configuration);

        // ICE candidate 생성 시 백엔드로 전송
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                sendSignal({
                    type: 'candidate',
                    candidate: event.candidate,
                    chatCode: chatCode
                });
            }
        };

        // 상대방 미디어 스트림 수신
        pc.ontrack = (event) => {
            console.log('상대방 미디어 스트림 수신:', event);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        // 이미 로컬 스트림이 있다면 트랙 추가
        if (localStream) {
            localStream.getTracks().forEach((track) => {
                pc.addTrack(track, localStream);
            });
        }

        setPeerConnection(pc);
        return pc;
    };

    const startCall = async () => {
        try {
            console.log('getUserMedia 시작 (오디오 전용)');
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            console.log('로컬 미디어 스트림 획득:', stream);
            setLocalStream(stream);
            // video 태그가 있더라도 오디오 전용 스트림이므로 영상은 표시되지 않음
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
            let pc = peerConnection;
            if (!pc) {
                console.log('새 peerConnection 생성');
                pc = await createPeerConnection();
            }
            // 로컬 스트림의 오디오 트랙을 PeerConnection에 추가
            stream.getTracks().forEach((track) => {
                console.log('트랙 추가:', track);
                pc.addTrack(track, stream);
            });

            console.log('offer 생성 시작');
            const offer = await pc.createOffer();
            console.log('offer 생성 완료:', offer);
            await pc.setLocalDescription(offer);
            console.log('로컬 설명 설정 완료');
            sendSignal({
                type: 'offer',
                offer: offer,
                chatCode: chatCode
            });
        } catch (error) {
            console.error('통화 시작 중 에러 발생:', error);
        }
    };

    return (
        <div>
            <h2>1:1 화상채팅 (테스트 버전)</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
                <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    style={{ width: '300px', border: '1px solid gray' }}
                />
                <video
                    ref={remoteVideoRef}
                    autoPlay
                    style={{ width: '300px', border: '1px solid gray' }}
                />
            </div>
            <button onClick={startCall} style={{ marginTop: '20px' }}>
                통화 시작
            </button>
        </div>
    );
};

export default VideoChat;
