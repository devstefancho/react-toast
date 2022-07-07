import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

enum ToastMargin {
  SMALL = 60,
  LARGE = 104,
}

enum ToastAnimationTime {
  TIME_OUT = 2.3,
  FADE_IN_DELAY = 0.1,
  FADE_IN_DURATION = 0.2,
  FADE_OUT_DELAY = 2,
  FADE_OUT_DURATION = 0.3,
}

interface ToastMessageType {
  content: any;
  onClick?: () => void;
}

interface ToastProps {
  data: {
    message: ToastMessageType | null;
    getRect: () => DOMRect | undefined;
  };
  needMoreBottom?: boolean | undefined; // 페이지 하단에 버튼이 있는 경우, bottom 공간이 더 필요함
}

export const useToast = () => {
  const [message, open] = useState<ToastMessageType | null>(null);
  const getRect = () => {
    if (typeof document !== 'undefined') {
      return document.querySelector('main')?.getBoundingClientRect(); // 특정 element의 중앙값을 가져와야 하는 경우
    }
  };
  return {
    open,
    data: {
      message,
      getRect,
    },
  };
};

export const Toast: React.FC<ToastProps> = ({ data, needMoreBottom }) => {
  const [list, setList] = useState<ToastMessageType[] | []>([]);

  const clear = () => {
    setList([]);
  };

  // append message to list
  useEffect(() => {
    if (data.message) {
      setList((prev: ToastMessageType[]) => [...prev, data.message!]);
    }
  }, [data.message]);

  // clear container
  useEffect(() => {
    const timeout = setTimeout(() => {
      clear();
    }, ToastAnimationTime.TIME_OUT * 1000);
    return () => clearTimeout(timeout);
  }, [list.length]); // CAUTION: list를 넣으면 무한루프 발생하므로, list.length가 바뀔때만 실행

  return (
    <StyledToastContainer
      needMoreBottom={needMoreBottom}
      left={data.getRect()?.left}
    >
      {list.map((toast, index) => (
        <StyledTextBox key={index} onClick={() => toast.onClick?.()}>
          <StyledText>{toast.content}</StyledText>
        </StyledTextBox>
      ))}
    </StyledToastContainer>
  );
};

const StyledToastContainer = styled.div<{
  needMoreBottom: boolean | undefined;
  left: number | undefined;
}>`
  position: fixed;
  bottom: ${(props) =>
    props.needMoreBottom ? ToastMargin.LARGE : ToastMargin.SMALL}px;
  left: ${(props) => props.left}px;
  margin-inline-start: 16px;
  width: calc(100% - 32px);
  max-width: calc(576px - 32px);
`;

const fadeIn = keyframes`
  100% {
    opacity: 0.9;
  }
`;

const fadeOut = keyframes`
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;

const hide = keyframes`
  100% {
    position: absolute;
    bottom: -2000px;
  }
`;

const StyledTextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;

  margin-top: 8px;
  min-height: 46px;
  border-radius: 8px;

  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;

  animation: ${ToastAnimationTime.FADE_IN_DURATION}s
      cubic-bezier(0.65, 0, 0.35, 1) ${ToastAnimationTime.FADE_IN_DELAY}s
      forwards ${fadeIn},
    ${ToastAnimationTime.FADE_OUT_DURATION}s cubic-bezier(0.65, 0, 0.35, 1)
      ${ToastAnimationTime.FADE_OUT_DELAY}s forwards ${fadeOut},
    0s step-end ${ToastAnimationTime.TIME_OUT}s forwards ${hide};
`;

const StyledText = styled.div`
  padding: 14px 48px;
`;
