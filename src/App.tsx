import Button from './Button';
import { Toast, useToast } from './Toast';

function App() {
  const { data, open } = useToast();
  const onClick = (message: string) => {
    open({
      content: 'hello world!!',
      onClick: () => {
        console.log(message);
      },
    });
  };

  return (
    <div className='App'>
      <Button onClick={onClick} />
      <Toast data={data} />
    </div>
  );
}

export default App;
