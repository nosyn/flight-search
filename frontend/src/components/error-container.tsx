import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export const ErrorContainer = ({ message }: { message?: string }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      {message ? <p>{message}</p> : <p>We're sorry, but an error occurred.</p>}
      <Button onClick={handleGoHome}>Go to Home</Button>
    </div>
  );
};
