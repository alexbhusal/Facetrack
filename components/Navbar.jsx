"use client"
import Link from "next/link";
import React, { useState } from "react";
import LogoNav from "./logo";
import Profile from "./Profile";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="mt-1 mx-2 flex justify-between items-center">
      {/* Logo Section */}
      <div className="w-52">
        <LogoNav />
      </div>

      {/* Hamburger Menu for mobile */}
      <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <AiOutlineClose size={24} className="text-black cursor-pointer" />
        ) : (
          <GiHamburgerMenu size={20} className="text-black cursor-pointer" />
        )}
      </div>

      {/* Navbar Links for Desktop & Mobile */}
      <div className={`flex-1 md:flex justify-center items-center ${isOpen ? "block" : "hidden"} md:block`}>
        <ul className="flex gap-8 justify-center text-2xl font-semibold italic">
          <li>
            <Link href={"#"}>LINK 1</Link>
          </li>
          <li>
            <Link href={"#"}>LINK 2</Link>
          </li>
          <li>
            <Link href={"#"}>LINK 3</Link>
          </li>
          <li>
            <Link href={"#"}>LINK 4</Link>
          </li>
          <li>
            <Link href={"#"}>LINK 5</Link>
          </li>
          <li>
            <Link href={"#"}>LINK 6</Link>
          </li>
        </ul>
      </div>

      {/* Profile Section */}
      <div className="w-52">
        <Link href={"/profile"}>
          <Profile />
        </Link>
      </div>
    </div>

//     <>
// <div className="bg-white border-gray-200 dark:bg-gray-900">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
//           <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
//           <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
//         </a>
//         <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//           <button
//             type="button"
//             className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           >
//             <span className="sr-only">Open user menu</span>
//             <img className="w-8 h-8 rounded-full" src="https://imgs.search.brave.com/3wsOeG6SmRIFrU-ZOM2qY0DDqka17_qM-W2Rs7nN3jE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cuc29jaWFsbWVkaWFl/eGFtaW5lci5jb20vaW1hZ2VzLzExMTFz/aC1jb3B5cmlnaHQt/c3ltYm9sLmpwZw" alt="User" />
//           </button>
//           {isDropdownOpen && (
//             <div className="absolute right-4 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
//               <div className="px-4 py-3">
//                 <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
//                 <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
//               </div>
//               <ul className="py-2">
//                 <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a></li>
//                 <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a></li>
//                 <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a></li>
//                 <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a></li>
//               </ul>
//             </div>
//           )}
//           <button onClick={() => setIsNavOpen(!isNavOpen)} className="md:hidden p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700">
//             <span className="sr-only">Open main menu</span>
//             <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
//             </svg>
//           </button>
//         </div>
//         <div className={`${isNavOpen ? "block" : "hidden"} md:flex md:w-auto md:order-1`}>
//           <ul className="flex flex-col md:flex-row md:space-x-8 font-medium p-4 md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//             <li><a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">Home</a></li>
//             <li><a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700">About</a></li>
//             <li><a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700">Services</a></li>
//             <li><a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700">Pricing</a></li>
//             <li><a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700">Contact</a></li>
//           </ul>
//         </div>
//       </div>
//     </div>

//     </>
  );
};

export default Navbar;
