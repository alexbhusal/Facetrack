import Link from 'next/link';
import React from 'react';
import LogoNav from './logo';
import Profile from './Profile';

const Navbar = () => {
  return (
    <div className='mt-1 mx-2  flex'>
        <div className=" w-52 ">
            <LogoNav/>
        </div>
        <ul className='flex gap-20 justify-center items-center text-3xl font-semibold italic'>
            <li><Link href={"#"}>LINK !</Link></li>
            <li><Link href={"#"}>LINK !</Link></li>
            <li><Link href={"#"}>LINK !</Link></li>
            <li><Link href={"#"}>LINK !</Link></li>
            <li><Link href={"#"}>LINK !</Link></li>
            <li><Link href={"#"}>LINK !</Link></li>
        </ul>
        <div className="w-52 absolute  right-0">
            <Link href={"/profile"}>
            <Profile/>
            </Link>
        </div>
    </div>
  )
}

export default Navbar
