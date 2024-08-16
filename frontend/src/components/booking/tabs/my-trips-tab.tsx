import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const MyTripsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Trips</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div>My Trips Tab</div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
