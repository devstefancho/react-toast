import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

export interface ToastType {
  message: string;
  onClose?: () => void;
}

interface Props {
  list: ToastType[];
  setList: (key: ToastType[]) => any;
  clearTime?: number;
}

export const Toast: React.FC<Props> = ({ list, setList }) => {
  const deleteOldToast = () => {
    if (list.length === 0) return;
    if (list.length === 1) return setList([]);
    if (list.length > 1) {
      const [old, ...rest] = list;
      console.log(rest);
      setList(rest);
    }
  };

  const clear = () => {
    setList([]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      clear();
    }, 3600);
    return () => clearTimeout(timeout);
  }, [list]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     deleteOldToast();
  //   }, 3600);
  //   return () => clearInterval(interval);
  // }, [list]);

  return (
    <StyledToastContainer>
      {list.map((toast, index) => {
        return (
          <StyledTextBox key={index} onClick={() => toast.onClose?.()}>
            {toast.message}
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
  100% { opacity: 1 }
`;

const fadeOut = keyframes`
  100% { 
    opacity: 0; 
    visibility: hidden;
  }
`;

const StyledTextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  width: 343px;
  height: 46px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  font-size: 20px;
  animation: 0.2s cubic-bezier(0.65, 0, 0.35, 1) 0.1s forwards ${fadeIn},
    0.3s cubic-bezier(0.65, 0, 0.35, 1) 3s forwards ${fadeOut};
`;
