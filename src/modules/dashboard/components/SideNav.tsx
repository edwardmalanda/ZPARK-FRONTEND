import React from 'react';
import { PowerIcon } from '@heroicons/react/24/outline';
import { Logo } from '../../../Utils/Logo';
import { NavLinks } from './NavLinks';
import { Link } from 'react-router-dom';

export const SideNav: React.FC = () => {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 md:flex-col">
     <a className="mb-2 flex h-40 items-end justify-start rounded-md bg-gradient-to-r from-blue-400 to-blue-500 p-4 md:h-40" href="/">
        <div className="w-32 text-white md:w-40">
          <Logo />
        </div>
      </a>
      <div className="flex-grow flex flex-row space-x-5 space-y-2 md:flex-col md:space-x-0">
        <NavLinks />
       <div className=" md:flex h-auto w-full rounded-md bg-gray-50 hover:bg-sky-100 hover:text-blue-600 " ></div>
        <div className="flex-grow bg-slate-50 rounded"></div>
        <form>
          <Link to="/Login" className="flex items-center justify-center w-full h-12 rounded-md bg-sky-200 p-3 text-sm font-medium text-blue-600 hover:bg-red-400 hover:text-white">
            <PowerIcon className="w-6" />
            <span className="hidden md:block ml-2">Sign Out</span>
          </Link>
        </form>
      </div>
    </div>
  );
};