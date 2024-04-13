"use client";
import Link from "next/link";
import InputField from "./inputField";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn("credentials", {
      redirect: false,
      email: "s1@gmail.com",
      password: "12345678",
      callbackUrl: "http://localhost:3000/Creators/Dashboard",
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col">
        <div className="flex flex-col items-center mb-4 md:mb-8">
          <p className="text-2xl md:text-[34px] font-medium text-[#030303] uppercase">
            welcome back
          </p>
          <p className="text-xs md:text-base text-[#636364]">
            Welcome back! Please enter your details
          </p>
        </div>
        <div className="mb-4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <InputField />
            </div>
            <div className="flex flex-col mb-2">
              <InputField type="password" />
            </div>
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-1">
                <input id="remember" name="remember" type="checkbox" />
                <label htmlFor="remember" className="text-xs md:text-base">
                  Remember me
                </label>
              </div>
              <button className="text-xs md:text-base hover:text-[#0073ff]">
                Forget password
              </button>
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-[#EA454C] text-white font-medium border border-[#bb3b41] rounded-lg hover:scale-[1.02] transition-all ease-in-out duration-200"
            >
              Login
            </button>
          </form>
        </div>
        <div className="mb-2">
          <button
            type="submit"
            className="w-full p-1 bg-white font-medium border-2 border-slate-300 rounded-lg hover:scale-[1.02] transition-all ease-in-out duration-200 flex justify-center items-center gap-2"
          >
            <FcGoogle style={{ fontSize: "30px" }} />
            Sign-In with Google
          </button>
        </div>
        <div className="flex justify-center">
          <p className="text-xs md:text-sm">
            Dont have an account?{" "}
            <Link href={"/Register"} className="text-[#EA454C]">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
