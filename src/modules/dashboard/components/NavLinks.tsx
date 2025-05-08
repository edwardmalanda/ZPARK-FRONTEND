import React from "react";
import { HomeIcon, TruckIcon } from "@heroicons/react/24/outline";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import { PiGarageBold } from "react-icons/pi";
import { RiPentagonLine } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";

const links = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Drivers",
    href: "/Drivers",
    icon: FaPeopleGroup,
  },
  { name: "Vehicle", href: "/Trucks", icon: TruckIcon },
  { name: "Parking-Slots", href: "/Parking", icon: PiGarageBold},
  { name: "Rentals", href: "/Rentals", icon: RiPentagonLine }
];

export const NavLinks: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = location.pathname === link.href;

        return (
          <NavLink
            key={link.name}
            to={link.href}
            className={clsx(
              "flex items-center gap-2 rounded-md p-2 transition-colors duration-300",
              {
                "bg-gradient-to-r from-blue-400 to-blue-100 text-white":
                  isActive,
                "bg-sky-100 text-blue-600": !isActive,
              }
            )}
           
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </NavLink>
        );
      })}
    </>
  );
};


