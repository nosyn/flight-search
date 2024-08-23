import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTicketsQuery } from '@/hooks/use-tickets-query';
import { Button } from '../ui/button';

export const MyTickets = () => {
  const { data: tickets, error, isLoading } = useTicketsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Table>
      <TableCaption>A list of your recent tickets.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Ticket ID</TableHead>
          <TableHead>Departure Flight ID</TableHead>
          <TableHead>Return Flight ID</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead className='text-right'>Total Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell className='font-medium'>{ticket.id}</TableCell>
            <TableCell>{ticket.departureFlightId}</TableCell>
            <TableCell>{ticket.returnFlightId}</TableCell>
            <TableCell>
              {ticket.payment.paymentStatus ? (
                <Button asChild variant='link' size='sm' className='p-0'>
                  <a href={`/ticket?ticketId=${ticket.id}`} target='_blank'>
                    Paid
                  </a>
                </Button>
              ) : (
                <Button asChild variant='link' size='sm' className='p-0'>
                  <a href={`/payment?ticketId=${ticket.id}`} target='_blank'>
                    Unpaid
                  </a>
                </Button>
              )}
            </TableCell>
            <TableCell className='text-right'>
              {new Intl.NumberFormat('th-TH', {
                style: 'currency',
                currency: 'THB',
              }).format(ticket.departureFlightPrice + ticket.returnFlightPrice)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Paid</TableCell>
          <TableCell className='text-right'>
            {new Intl.NumberFormat('th-TH', {
              style: 'currency',
              currency: 'THB',
            }).format(
              tickets.reduce(
                (acc, ticket) =>
                  ticket.payment.paymentStatus
                    ? acc +
                      ticket.departureFlightPrice +
                      ticket.returnFlightPrice
                    : acc,
                0
              )
            )}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
