import { useRouter } from "next/router";
import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const LoginInput = () => {
  const router = useRouter();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!email) return setError("please enter a email");
    if (!password) return setError("please enter a password");

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        if (errorCode === "auth/invalid-email") {
          setError("invalid email");
        }
        if (errorCode === "auth/user-not-found") {
          setError("user not found");
        }
        if (errorCode === "auth/wrong-password") {
          setError("wrong password");
        }
      });
  };

  if (error) {
    setTimeout(() => {
      setError("");
    }, 5000);
  }

  const handleGoogleLogin = async (e: any) => {
    e.preventDefault();

    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
        }
        const user = result.user;
        console.log("user", user);
      })
      .catch((error) => {
        console.log("error", error);
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode) {
          setError("error loging account");
        }
      });
  };

  return (
    <div className="mr-12 ml-12 sm:m-0">
      <div className="grid   place-items-center">
        <h1 className="font-bold text-3xl">Login Using Existing Account</h1>
        <p className="capitalize text-[#c5c5c5]">
          get to know what your loved one are up to!
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-5">
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setemail(e.target.value)}
          className="bg-primaryBlack focus:border-[#fff] transition-all duration-700 px-3 py-2 sm:px-3 sm:py-2 border-opacity-50  rounded-lg border border-borderBlack  text-white text-white outline-none "
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
          className="bg-primaryBlack focus:border-[#fff] transition-all duration-700 px-3 py-2 sm:px-3 sm:py-2 border-opacity-50  rounded-lg border border-borderBlack  text-white text-white outline-none "
        />
      </div>
      <div className="mt-10">
        <button className="btn w-full" onClick={handleLogin}>
          Login
        </button>
      </div>
      {error && (
        <div className="mt-3 bg-[#ff3e3e] rounded-lg p-3 text-white text-center">
          <p className="capitalize font-[500]">{error}</p>
        </div>
      )}
      <div
        className="mt-10 flex justify-center items-center"
        onClick={() => router.push("/signup")}
      >
        <p className="text-[#c5c5c5]">Don't have an account?</p>
        <a href="#" className="text-[#c5c5c5]font-bold hover:text-[#fff] ml-2">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default LoginInput;
