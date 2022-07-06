import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

export interface ToastType {
  content: any;
  onClose?: () => void;
}

interface Props {
  message: any;
}

export const useToast = () => {
  const [message, open] = useState<ToastType | null>(null);
  return {
    open,
    message,
  };
};

export const Toast: React.FC<Props> = ({ message }) => {
  const [list, setList] = useState<ToastType[] | []>([]);
  const clear = () => {
    setList([]);
  };

  // append message to list
  useEffect(() => {
    if (message) {
      setList((prev: ToastType[]) => [...prev, message]);
    }
  }, [message]);

  // clear container
  useEffect(() => {
    const timeout = setTimeout(() => {
      clear();
    }, 3600);
    return () => clearTimeout(timeout);
  }, [list]);

  return (
    <StyledToastContainer>
      {list.map((toast, index) => {
        return (
          <StyledTextBox key={index} onClick={() => toast.onClose?.()}>
            {toast.content}
          </StyledTextBox>
        );
      })}
    </StyledToastContainer>
  );
};

const StyledToastContainer = styled.div`
  position: fixed;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
`;

const fadeIn = keyframes`
  100% { 
    opacity: 1;
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
  margin-top: 15px;
  width: 343px;
  height: 46px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  font-size: 20px;
  animation: 0.2s cubic-bezier(0.65, 0, 0.35, 1) 0.1s forwards ${fadeIn},
    0.3s cubic-bezier(0.65, 0, 0.35, 1) 3s forwards ${fadeOut},
    0s step-end 3.3s forwards ${hide};
`;
