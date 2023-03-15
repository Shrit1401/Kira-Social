import AuthImage from "@/components/login/AuthImage";
import LoginInput from "@/components/login/LoginInput";
import Navbar from "@/components/Reusable/navbar";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";

const login = () => {
  const router = useRouter();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push("/");
    }
  });
  return (
    <div>
      <Navbar />

      <div className="flex sm:mt-0 mt-24 flex-col sm:flex-row justify-around items-center  h-[80vh]">
        <div className="left">
          <LoginInput />
        </div>
        <div className="mt-10 sm:mt-0">
          <AuthImage img="https://i.postimg.cc/sXHyLbCs/image.png" />
        </div>
      </div>
    </div>
  );
};

export default login;
