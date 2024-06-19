"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";

const navItems = [
  {
    path: "/teams",
    child: <span>Team</span>,
  },
  {
    path: "/people",
    child: <span>Patrons</span>,
  },
  {
    path: "/events",
    child: <span>Events</span>,
  },
  {
    path: "/contact",
    child: <span>Contact</span>,
  },
  {
    path : "/login",
    child: <IoPersonOutline/>,
  }
];

export default function NavBar2() {
  let pathname = usePathname() || "/";


  const [hoveredPath, setHoveredPath] = useState(pathname);

  return (
    <div className=" p-[0.4rem] rounded-lg mb-12 sticky top-4 z-[100]  backdrop-blur-md">
      <nav className="flex justify-between items-center w-full z-[100] rounded-lg">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.jpg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-[22px] font-semibold whitespace-nowrap dark:text-white hidden sm:block">
            Enigma
          </span>
        </a>

        <div className="flex gap-2">
          {navItems.map((item, index) => {
            const isActive = item.path === pathname;

            return (
              <Link
                key={item.path}
                className={`px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in ${
                  isActive ? "text-zinc-100" : "text-zinc-400"
                }`}
                data-active={isActive}
                href={item.path}
                onMouseOver={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(pathname)}
              >
                {item.child}
                {item.path === hoveredPath && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-full bg-stone-800/80 rounded-md -z-10"
                    layoutId="navbar"
                    aria-hidden="true"
                    style={{
                      width: "100%",
                    }}
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      stiffness: 130,
                      damping: 9,
                      duration: 0.3,
                    }}
                  />
                )}
              </Link>
              
            );
            
          })}
          
        </div>
      </nav>
    </div>
  );
}
