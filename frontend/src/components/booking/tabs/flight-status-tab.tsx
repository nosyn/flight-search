import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const FlightStatusTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Flight Status</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div>Flight Status Tab</div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
