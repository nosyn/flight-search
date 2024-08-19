import { useFormContext } from 'react-hook-form';

export const LastStep = () => {
  const form = useFormContext();

  return (
    <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
      <code className='text-white'>
        {JSON.stringify(form.getValues(), null, 2)}
      </code>
    </pre>
  );
};
