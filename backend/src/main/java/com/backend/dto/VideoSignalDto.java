package com.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VideoSignalDto {
    // "offer", "answer", "ice-candidate" 중 하나
    private String type;

    // offer나 answer일 경우 SDP 정보를 담습니다.
    private Object sdp;

    // ICE 후보 정보 (ice-candidate 타입일 때 사용)
    private Object candidate;

    // 해당 시그널이 전달될 채팅방의 고유 코드
    private String chatCode;

    // 메시지 발신자 (예: 사용자 이름)
    private String sender;
}