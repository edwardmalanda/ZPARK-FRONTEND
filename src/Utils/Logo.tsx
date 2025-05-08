
import { TruckIcon } from "@heroicons/react/24/solid";


export const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 text-white">
      <TruckIcon className="h-10 w-10 md:h-20 md:w-20 rotate-[1deg]" />
      <p className="text-lg md:text-[21px] font-['Lusitana']"> ZPARK </p>
    </div>
  );
}
