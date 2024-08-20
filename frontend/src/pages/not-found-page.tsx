import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Click the button below to redirect to the home page</p>
      <Button
        onClick={() => {
          navigate('/');
        }}
      >
        Home
      </Button>
    </div>
  );
};
