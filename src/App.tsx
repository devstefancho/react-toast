import Button from './Button';
import { Toast, useToast } from './Toast';

function App() {
  const { message, open } = useToast();
  const onClick = (message: string) => {
    open({
      content: 'hello world!!',
      onClose: () => console.log(message),
    });
  };

  return (
    <div className='App'>
      <Button onClick={onClick} />
      <Toast message={message} />
    </div>
  );
}

export default App;
