import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export const InvoiceStatus = ({ status }: { status: string; }) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'Pending',
          'bg-green-500 text-white': status === 'Paid',
          'bg-blue-500 text-white': status === 'Active',
        }
      )}
    >
      {status === 'Pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-red-500" />
        </>
      ) : null}
      {status === 'Paid' ? (
        <>
          Paid
          <CheckIcon className="bg-green-500 ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'Active' ? (
        <>
          Active
          <CheckIcon className="bg-blue-500 ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
