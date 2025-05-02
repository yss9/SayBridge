import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import styled, { keyframes, css } from 'styled-components';

const flashAnimation = keyframes`
    0% { border-color: transparent; }
    50% { border-color: red; }
    100% { border-color: transparent; }
`;

const VideoContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const LocalVideo = styled.video`
    width: 565px;
    height: 425px;
    border: 1px solid gray;
    background-color: #000;
    ${props => props.isSpeaking && css`
    animation: ${flashAnimation} 0.5s linear;
  `}
`;

const RemoteVideo = styled.video`
    width: 565px;
    height: 425px;
    border: 1px solid gray;
    background-color: #000;
`;

const InfoText = styled.p`
    font-size: 1rem;
    margin-bottom: 10px;
`;

const Button = styled.button`
    margin-top: 10px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
`;

const VideoChat = ({ chatCode, currentUser }) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [stompClient, setStompClient] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    // ICE candidate를 임시 저장할 큐
    const candidateQueueRef = useRef([]);

    // STUN 서버 설정
    const configuration = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    };

    // STOMP 클라이언트 초기화 및 연결
    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS(process.env.REACT_APP_API_URL+'/ws-chat'),
            reconnectDelay: 5000,
            debug: (str) => console.log(str),
        });

        client.onConnect = () => {
            console.log('Video WebSocket 연결 성공');
            // 채팅방 코드에 따른 토픽 구독
            client.subscribe(`/topic/video/${chatCode}`, (message) => {
                const data = JSON.parse(message.body);
                console.log('수신한 video 시그널:', data);
                handleSignal(data);
            });
        };

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, [chatCode]);

    // signaling 메시지 전송 함수
    const sendSignal = (data) => {
        if (stompClient) {
            console.log(">>> SEND", data);
            stompClient.publish({
                destination: '/app/video.signal',
                body: JSON.stringify(data),
            });
        }
    };

    // signaling 메시지 수신 및 처리
    const handleSignal = async (data) => {
        if (data.type === 'offer') {
            let pc = peerConnection;
            if (!pc) {
                pc = await createPeerConnection();
            }
            if (!data.sdp || !data.sdp.type) {
                console.error('유효하지 않은 offer SDP:', data.sdp);
                return;
            }
            try {
                await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
                console.log('offer setRemoteDescription 성공');
            } catch (error) {
                console.error('offer setRemoteDescription 에러:', error);
            }
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            console.log('answer 생성 및 setLocalDescription 완료');
            sendSignal({
                type: 'answer',
                sdp: { sdp: answer.sdp, type: answer.type },
                chatCode: chatCode,
                sender: currentUser ? currentUser.name : null,
            });
        } else if (data.type === 'answer') {
            if (!peerConnection) {
                console.error('peerConnection이 null입니다. answer 처리 불가');
                return;
            }
            if (!data.sdp || !data.sdp.type) {
                console.error('유효하지 않은 answer SDP:', data.sdp);
                return;
            }
            try {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
                console.log('answer setRemoteDescription 성공');
            } catch (error) {
                console.error('answer setRemoteDescription 에러:', error);
            }
        } else if (data.type === 'ice-candidate') {
            if (data.candidate) {
                if (!peerConnection) {
                    console.warn('peerConnection이 아직 생성되지 않음, candidate 큐에 저장:', data.candidate);
                    candidateQueueRef.current.push(data.candidate);
                } else {
                    try {
                        await peerConnection.addIceCandidate(data.candidate);
                        console.log('ICE candidate 추가 성공');
                    } catch (error) {
                        console.error('ICE candidate 추가 에러:', error);
                    }
                }
            }
        }
    };

    // RTCPeerConnection 생성 함수
    const createPeerConnection = async () => {
        const pc = new RTCPeerConnection(configuration);

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                console.log('생성된 ICE candidate:', event.candidate);
                sendSignal({
                    type: 'ice-candidate',
                    candidate: event.candidate,
                    chatCode: chatCode,
                    sender: currentUser ? currentUser.name : null,
                });
            }
        };

        pc.ontrack = (event) => {
            console.log('상대방 미디어 스트림 수신:', event);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
                remoteVideoRef.current
                    .play()
                    .then(() => console.log('remote stream play 성공'))
                    .catch((err) => console.error('remote stream play 에러:', err));
                console.log('수신된 오디오 트랙:', event.streams[0].getAudioTracks());
            }
        };

        if (localStream) {
            localStream.getTracks().forEach((track) => {
                console.log('로컬 트랙 추가:', track);
                pc.addTrack(track, localStream);
            });
        }

        // candidate 큐에 저장된 ICE candidate 추가
        while (candidateQueueRef.current.length > 0) {
            const candidate = candidateQueueRef.current.shift();
            try {
                await pc.addIceCandidate(candidate);
                console.log('큐의 ICE candidate 추가 성공');
            } catch (error) {
                console.error('큐에 저장된 ICE candidate 추가 에러:', error);
            }
        }

        setPeerConnection(pc);
        return pc;
    };

    // 통화 시작 함수: 오디오만 요청 (마이크)
    const startCall = async () => {
        try {
            // 오디오만 요청: video: false
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            console.log('로컬 미디어 스트림 획득:', stream);
            setLocalStream(stream);
            // 디버깅: 로컬 오디오 트랙 확인
            console.log('로컬 오디오 트랙:', stream.getAudioTracks());
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
            let pc = peerConnection;
            if (!pc) {
                pc = await createPeerConnection();
            }
            // 로컬 스트림의 모든 트랙을 추가
            stream.getTracks().forEach((track) => {
                pc.addTrack(track, stream);
            });
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            console.log('offer 생성 및 setLocalDescription 완료');
            sendSignal({
                type: 'offer',
                sdp: { sdp: offer.sdp, type: offer.type },
                chatCode: chatCode,
                sender: currentUser ? currentUser.name : null,
            });
        } catch (error) {
            console.error('통화 시작 에러:', error);
        }
    };

    // 마이크 입력 레벨 측정을 위한 AudioContext 설정
    useEffect(() => {
        if (localStream) {
            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaStreamSource(localStream);
            source.connect(analyser);
            analyser.fftSize = 256;
            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            const checkVolume = () => {
                analyser.getByteFrequencyData(dataArray);
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    sum += dataArray[i];
                }
                const average = sum / dataArray.length;
                // 임계값 조정: 예를 들어 20 이상이면 말하고 있다고 판단
                if (average > 20) {
                    setIsSpeaking(true);
                    // 0.5초 후에 효과를 제거
                    setTimeout(() => setIsSpeaking(false), 500);
                } else {
                    setIsSpeaking(false);
                }
                requestAnimationFrame(checkVolume);
            };
            requestAnimationFrame(checkVolume);

            return () => {
                audioContext.close();
            };
        }
    }, [localStream]);

    return (
        <div>
            <VideoContainer>
                <LocalVideo ref={localVideoRef} autoPlay muted isSpeaking={isSpeaking} />
                <RemoteVideo ref={remoteVideoRef} autoPlay />
            </VideoContainer>
            <Button onClick={startCall}>Start Call</Button>
        </div>
    );
};

export default VideoChat;
