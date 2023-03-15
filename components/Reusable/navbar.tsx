import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const router = useRouter();
  const [user, setuser] = useState(null as any);
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user);
        setisUserLoggedIn(true);
      } else {
        setuser(null);
        setisUserLoggedIn(false);
      }
    });
  }, []);

  return (
    <>
      <div>
        <nav className="flex items-center justify-around px-5 py-5 backdrop-blur-sm">
          <div
            className="flex items-center gap-3 hover:opacity-80 cursor-pointer transition-all duration-150 ease-out"
            onClick={() => router.push("/")}
          >
            <div className="absolute w-[100px] opacity-90 h-[50px] bg-[white] bg-opacity-50 blur-2xl"></div>
            <img src="./logo.svg" alt="logo" />
            <h1 className="text-3xl font-[500]">Kira</h1>
          </div>

          <ul className="hidden sm:flex gap-5">
            <li>
              <img src="./icons/home.svg" alt="home" className="icons" />
            </li>
            <li>
              <img src="./icons/search.svg" alt="search" className="icons" />
            </li>
            <li>
              <img src="./icons/heart.svg" alt="heart" className="icons" />
            </li>
          </ul>

          {isUserLoggedIn ? (
            <a className=" gap-5 flex" href={`/${user?.uid}`}>
              <img
                className=" relative
          h-10 w-10 rounded-full border border-white hover:opacity-60 object-cover cursor-pointer"
                title={user?.displayName}
                src={user?.photoURL}
                alt="profile"
                // onClick={() => router.push(`/${user?.uid}`)}
              />
            </a>
          ) : (
            <div className="flex gap-2">
              <a href="#" onClick={() => router.push("/login")} className="btn">
                Login
              </a>
              <a
                href="#"
                onClick={() => router.push("/signup")}
                className="btn"
              >
                Sign Up
              </a>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
