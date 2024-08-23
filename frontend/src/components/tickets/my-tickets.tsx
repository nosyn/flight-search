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

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];

export const MyTickets = () => {
  const { data: tickets, error, isLoading } = useTicketsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log('data: ', tickets);

  return (
    <Table>
      <TableCaption>A list of your recent tickets.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Ticket ID</TableHead>
          <TableHead>Departure Flight ID</TableHead>
          <TableHead>Return Flight ID</TableHead>
          <TableHead className='text-right'>Total Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((tickets) => (
          <TableRow key={tickets.id}>
            <TableCell className='font-medium'>{tickets.id}</TableCell>
            <TableCell>{tickets.departureFlightId}</TableCell>
            <TableCell>{tickets.returnFlightId}</TableCell>
            <TableCell className='text-right'>
              {new Intl.NumberFormat('th-TH', {
                style: 'currency',
                currency: 'THB',
              }).format(
                tickets.departureFlightPrice + tickets.returnFlightPrice
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className='text-right'>
            {new Intl.NumberFormat('th-TH', {
              style: 'currency',
              currency: 'THB',
            }).format(
              tickets.reduce(
                (acc, ticket) =>
                  acc + ticket.departureFlightPrice + ticket.returnFlightPrice,
                0
              )
            )}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
