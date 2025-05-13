import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LogoNav from "./logo";
import Profile from "./Profile";

export default function UserNavbar({ handleLogOut, username, email,imgURL }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const fakeImageUrl = "https://imgs.search.brave.com/JAHeWxUYEwHB7KV6V1IbI9oL7wxJwIQ4Sbp8dHQL09A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjAx/MzkxNTc2NC9waG90/by91c2VyLWljb24t/aW4tZmxhdC1zdHls/ZS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9UEotMnZvUWZh/Q3hhZUNsdzZYYlVz/QkNaT3NTTjlIVWVC/SUg1Qk82VmRScz0"; 

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className=" border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3">
          <div className="hidden md:block h-20">
            <LogoNav />
          </div>
          <span className="text-2xl font-semibold">FaceTrack</span>
        </Link>
        <div className="flex items-center md:order-2 space-x-0 md:space-x-3 relative">
          <button
            type="button"
            className="flex text-xl  rounded-full focus:ring-4 focus:ring-gray-300"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className="w-32 h-auto md:w-32 md:h-auto">
              <Profile />
            </div>
          </button>
          {userMenuOpen && (
            <div
              ref={userMenuRef}
              className="absolute mt-32 right-0 w-auto bg-white border rounded shadow-md z-10"
            >
              <div className="w-auto h-32 mx-auto mt-12 flex justify-center items-center">  
                <img src={imgURL||fakeImageUrl } alt=""  className="mt-10 h-28 w-auto rounded-full" />
              </div>
              <div className="px-4 py-3">
                <span className="block text-xl text-center"> {username}</span>
                <span className="block text-sm text-gray-500 text-center">{email}</span>
              </div>

              <ul className="py-2">
                <li>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Edit Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/changepassword"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    ChangePassword
                  </Link>
                </li>
                <li>
                  <button
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
          <button
            className="md:hidden m-5 w-10 h-10 text-5xl text-gray-500 rounded-lg hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
        </div>
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
            <li>
              <Link href="#" className="block py-2 px-3 text-blue-700">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 hover:text-blue-700"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 hover:text-blue-700"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 hover:text-blue-700"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 hover:text-blue-700"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
