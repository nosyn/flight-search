import { toast } from '@/components/ui/use-toast';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { Navigate } from 'react-router-dom';

export const ChooseFlightPage = () => {
  const query = useSearchQuery();
  const origin = query.get('origin');
  const destination = query.get('origin');
  const dateFrom = query.get('dateFrom');
  const dateTo = query.get('dateTo');

  if (!origin || !destination || !dateFrom || !dateTo) {
    toast({
      title:
        'Missing some query values in the URL. Navigate back to the home page.',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>
            {JSON.stringify({ origin, destination, dateFrom, dateTo }, null, 2)}
          </code>
        </pre>
      ),
    });

    return <Navigate to='/' replace={true} />;
  }

  return (
    <div>
      Choose Flight Page
      <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
        <code className='text-white'>
          {JSON.stringify(query.get('origin'), null, 2)}
        </code>
      </pre>
    </div>
  );
};
