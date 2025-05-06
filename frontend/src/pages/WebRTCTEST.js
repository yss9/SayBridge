
import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
font-family: Arial, sans-serif;
padding: 20px;
background-color: #f5f5f5;
min-height: 100vh;
`;

const Title = styled.h1`
font-size: 2rem;
color: #333;
margin-bottom: 1rem;
text-align: center;
`;

const VideoRow = styled.div`
display: flex;
justify-content: center;
gap: 10px;
margin-bottom: 20px;
`;

const Video = styled.video.attrs({ playsInline: true })`
width: 300px;
height: 225px;
background: #000;
`;

const Section = styled.div`
border: 1px solid #ccc;
padding: 10px;
margin-bottom: 20px;
background: #fff;
`;

const Controls = styled.div`
margin-bottom: 5px;
`;

const TextArea = styled.textarea`
width: 100%;
height: 100px;
font-family: monospace;
margin-top: 5px;
`;

const Button = styled.button`
margin-right: 10px;
padding: 8px 16px;
font-size: 14px;
cursor: pointer;
background: #007bff;
color: #fff;
border: none;
border-radius: 4px;
&:hover { background: #0056b3; }
`;

const WebRtcTest = () => {
  const localRef = useRef();
  const remoteRef = useRef();
  const pcRef = useRef();
  const servers = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

  const [offerSDP, setOfferSDP] = useState('');
  const [answerSDP, setAnswerSDP] = useState('');

  const startLocal = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localRef.current.srcObject = stream;

    const pc = new RTCPeerConnection(servers);
    pcRef.current = pc;

    stream.getTracks().forEach(track => pc.addTrack(track, stream));

    pc.ontrack = event => {
      const [remoteStream] = event.streams;
      remoteRef.current.srcObject = remoteStream;
    };

    console.log('>> PeerConnection initialized');
  };

  const createOffer = async () => {
    const pc = pcRef.current;
    if (!pc) return;
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    await new Promise(resolve => {
      if (pc.iceGatheringState === 'complete') resolve();
      else {
        pc.addEventListener('icegatheringstatechange', function cb() {
          if (pc.iceGatheringState === 'complete') {
            pc.removeEventListener('icegatheringstatechange', cb);
            resolve();
          }
        });
      }
    });

    setOfferSDP(JSON.stringify(pc.localDescription, null, 2));
  };

  const setOffer = async () => {
    const pc = pcRef.current;
    if (!pc) return;
    const desc = JSON.parse(offerSDP);
    await pc.setRemoteDescription(new RTCSessionDescription(desc));
    console.log('>> Remote offer set');
  };

  const createAnswer = async () => {
    const pc = pcRef.current;
    if (!pc) return;
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    await new Promise(resolve => {
      if (pc.iceGatheringState === 'complete') resolve();
      else {
        pc.addEventListener('icegatheringstatechange', function cb() {
          if (pc.iceGatheringState === 'complete') {
            pc.removeEventListener('icegatheringstatechange', cb);
            resolve();
          }
        });
      }
    });

    setAnswerSDP(JSON.stringify(pc.localDescription, null, 2));
  };

  const setAnswer = async () => {
    const pc = pcRef.current;
    if (!pc) return;
    const desc = JSON.parse(answerSDP);
    await pc.setRemoteDescription(new RTCSessionDescription(desc));
    console.log('>> Remote answer set');
  };

  return (
    <Container>
      <Title>WebRTC Manual Signaling Test</Title>
      <VideoRow>
        <Video ref={localRef} autoPlay muted />
        <Video ref={remoteRef} autoPlay />
      </VideoRow>

      <Section>
        <h2>1. Initialize Local Stream</h2>
        <Controls>
          <Button onClick={startLocal}>Start Local</Button>
        </Controls>
      </Section>

      <Section>
        <h2>2. Offer</h2>
        <Controls>
          <Button onClick={createOffer}>Create Offer</Button>
          <Button onClick={setOffer}>Set Offer</Button>
        </Controls>
        <TextArea
          value={offerSDP}
          onChange={e => setOfferSDP(e.target.value)}
          placeholder="Offer SDP"
        />
      </Section>

      <Section>
        <h2>3. Answer</h2>
        <Controls>
          <Button onClick={createAnswer}>Create Answer</Button>
          <Button onClick={setAnswer}>Set Answer</Button>
        </Controls>
        <TextArea
          value={answerSDP}
          onChange={e => setAnswerSDP(e.target.value)}
          placeholder="Answer SDP"
        />
      </Section>
    </Container>
  );
};

export default WebRtcTest;

