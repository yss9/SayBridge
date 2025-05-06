// src/pages/VideoChat.js
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const VideoContainer = styled.div`
    display: flex;
    width: 100%;
    height: 95%;
    background: #000;
`;

const VideoWrapper = styled.div`
    flex: 1;
    position: relative;
`;

const StyledVideo = styled.video.attrs({ playsInline: true })`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default function VideoChat({ chatCode, isInitiator }) {
    const localRef = useRef(null);
    const remoteRef = useRef(null);
    const pcRef = useRef(null);
    const stompRef = useRef(null);

    const joinSentRef = useRef(false);
    const negotiatingRef = useRef(false);

    useEffect(() => {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        });
        pcRef.current = pc;

        pc.onicecandidate = (e) => {
            if (e.candidate && stompRef.current) {
                stompRef.current.publish({
                    destination: '/app/video.signal',
                    body: JSON.stringify({
                        type: 'candidate',
                        candidate: e.candidate,
                        chatCode,
                    }),
                });
            }
        };

        pc.ontrack = (e) => {
            const [stream] = e.streams.length
                ? e.streams
                : [new MediaStream([e.track])];
            remoteRef.current.srcObject = stream;
        };

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localRef.current.srcObject = stream;
                stream.getTracks().forEach((track) => {
                    if (pc.signalingState !== 'closed') {
                        pc.addTrack(track, stream);
                    }
                });
            })
            .then(connectStomp)
            .catch(console.error);

        function connectStomp() {
            const client = new Client({
                webSocketFactory: () =>
                    new SockJS(`${process.env.REACT_APP_API_URL}/ws-chat`),
                reconnectDelay: 5000,
            });

            client.onConnect = () => {
                stompRef.current = client;
                client.subscribe(`/topic/video/${chatCode}`, ({ body }) =>
                    handleSignal(JSON.parse(body))
                );

                if (!isInitiator && !joinSentRef.current) {
                    joinSentRef.current = true;
                    client.publish({
                        destination: '/app/video.signal',
                        body: JSON.stringify({ type: 'join', chatCode }),
                    });
                }
            };

            client.activate();
        }

        async function handleSignal(msg) {
            const pc = pcRef.current;
            if (!pc || pc.signalingState === 'closed') return;

            const { type, sdp, candidate } = msg;
            switch (type) {
                case 'join':
                    if (
                        isInitiator &&
                        !negotiatingRef.current &&
                        pc.signalingState === 'stable'
                    ) {
                        negotiatingRef.current = true;
                        try {
                            const offer = await pc.createOffer();
                            await pc.setLocalDescription(offer);
                            stompRef.current.publish({
                                destination: '/app/video.signal',
                                body: JSON.stringify({
                                    type: 'offer',
                                    sdp: pc.localDescription,
                                    chatCode,
                                }),
                            });
                        } catch (e) {
                            console.error('offer 실패', e);
                        }
                    }
                    break;

                case 'offer':
                    if (!isInitiator && pc.signalingState === 'stable') {
                        try {
                            await pc.setRemoteDescription(new RTCSessionDescription(sdp));
                            const answer = await pc.createAnswer();
                            await pc.setLocalDescription(answer);
                            stompRef.current.publish({
                                destination: '/app/video.signal',
                                body: JSON.stringify({
                                    type: 'answer',
                                    sdp: pc.localDescription,
                                    chatCode,
                                }),
                            });
                        } catch (e) {
                            console.error('answer 실패', e);
                        }
                    }
                    break;

                case 'answer':
                    if (isInitiator && pc.signalingState === 'have-local-offer') {
                        try {
                            await pc.setRemoteDescription(new RTCSessionDescription(sdp));
                        } catch (e) {
                            console.error('answer 적용 실패', e);
                        }
                        negotiatingRef.current = false;
                    }
                    break;

                case 'candidate':
                    try {
                        await pc.addIceCandidate(new RTCIceCandidate(candidate));
                    } catch (e) {
                        console.warn('ICE 후보 추가 실패', e);
                    }
                    break;

                default:
                    console.warn('Unknown signal:', type);
            }
        }

        return () => {
            stompRef.current?.deactivate();
            if (pcRef.current) {
                pcRef.current.getTransceivers().forEach((t) => t.stop());
                pcRef.current.close();
            }
            localRef.current?.srcObject
                ?.getTracks()
                .forEach((t) => t.stop());
        };
    }, [chatCode, isInitiator]);

    return (
        <VideoContainer>
            <VideoWrapper>
                <StyledVideo ref={remoteRef} autoPlay playsInline />
            </VideoWrapper>
            <VideoWrapper>
                <StyledVideo ref={localRef} autoPlay playsInline muted />
            </VideoWrapper>
        </VideoContainer>
    );
}
