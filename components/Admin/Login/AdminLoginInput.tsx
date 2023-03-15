import React from "react";

const AdminLoginInput = () => {
  return (
    <div className="mr-12 ml-12 sm:m-0 w-[100%]">
      <div className="grid   place-items-center ">
        <h1 className="font-bold text-3xl">Get Into Kira</h1>
        <p className="capitalize text-[#c5c5c5]">
          Admin page for kira social, to get to see all the userss
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-5">
        <input
          type="text"
          placeholder="Email"
          className="bg-primaryBlack focus:border-[#fff] transition-all duration-700 px-3 py-2 sm:px-3 sm:py-2 border-opacity-50  rounded-lg border border-borderBlack  text-white text-white outline-none "
        />

        <input
          type="text"
          placeholder="Password"
          className="bg-primaryBlack focus:border-[#fff] transition-all duration-700 px-3 py-2 sm:px-3 sm:py-2 border-opacity-50  rounded-lg border border-borderBlack  text-white text-white outline-none "
        />
      </div>
      <div className="mt-10">
        <button className="btn w-full">Login</button>
      </div>
      {/* or sign up with google */}
      <div className="mt-10 flex justify-center items-center">
        <p className="text-[#c5c5c5]">Sign up with credentials given</p>
      </div>
    </div>
  );
};

export default AdminLoginInput;
