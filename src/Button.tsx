import React from 'react';

const Button: React.FC<{ onClick: (key: any) => any }> = ({ onClick }) => {
  return <button onClick={() => onClick('hello world!')}>open toast</button>;
};

export default Button;
