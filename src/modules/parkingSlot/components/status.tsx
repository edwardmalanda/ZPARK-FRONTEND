// components/InvoiceStatus.tsx
import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export const Status = ({ status }: { status: string }) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === "occupied",
          "bg-green-500 text-white": status === "available",
        }
      )}
    >
      {status.toString().toLowerCase() === "occupied" ? (
        <>
          Occupied
          <ClockIcon className="ml-1 w-4 text-red-500" />
        </>
      ) : null}
      {status.toString().toLowerCase() === "available" ? (
        <>
          Available
          <CheckIcon className="bg-green-500 ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
};
