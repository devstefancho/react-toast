import { useState } from 'react';
import Button from './Button';
import { Toast, ToastType } from './Toast';

function App() {
  const [list, setList] = useState<ToastType[] | []>([]);
  const onClick = (message: string) => {
    const newMessage = {
      message,
      onClose: () => console.log(message),
    };

    setList((prev: ToastType[]) => [...prev, newMessage]);
  };

  return (
    <div className='App'>
      <Button onClick={onClick} />
      <Toast list={list} setList={setList} />
    </div>
  );
}

export default App;
