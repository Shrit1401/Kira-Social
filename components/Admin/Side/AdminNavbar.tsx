import { useRouter } from "next/router";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const AdminNavbar = () => {
  const router = useRouter();
  return (
    <>
      <nav className="flex items-center justify-around px-5 py-5 backdrop-blur-sm">
        <div
          className="flex items-center gap-3 hover:opacity-80 cursor-pointer transition-all duration-150 ease-out"
          onClick={() => router.push("/admin/login")}
        >
          <img src=".././logo.svg" alt="logo" />
          <h1 className="text-3xl font-[500]">
            Kira<b className="text-[16px]">Admin</b>
          </h1>
        </div>

        <ul className="hidden sm:flex gap-5 opacity-0">
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

        <div className="flex">
          <a href="#" className="btn">
            Login | Signup
          </a>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
