import { useState } from 'react';
import { Button } from './components/ui/button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className='flex border-b-2 min-h-screen flex-col justify-center items-center gap-2'>
      <Button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </main>
  );
}

export default App;
