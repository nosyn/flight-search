import { columns } from '@/components/flights/columns';
import { FlightsTable } from '@/components/flights/flights-table';
import { toast } from '@/components/ui/use-toast';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { Navigate } from 'react-router-dom';

function getData() {
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
  ];
}

export const ChooseFlightPage = () => {
  const query = useSearchQuery();
  const origin = query.get('origin');
  const destination = query.get('origin');
  const dateFrom = query.get('dateFrom');
  const dateTo = query.get('dateTo');

  const data = getData();

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
          {JSON.stringify(
            { origin, destination, dateFrom, dateTo, data },
            null,
            2
          )}
        </code>
      </pre>
      <FlightsTable columns={columns} data={data} />
    </div>
  );
};
