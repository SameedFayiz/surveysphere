"use client";
import { DarkModeContext } from "@/components/Providers/darkModeTheme";
import LoginForm from "@/components/loginForm";
import { CircularProgress, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { Suspense, useContext } from "react";

export default function Page() {
  const mediumWidth = useMediaQuery("(min-width:768px)");
  const { darkMode } = useContext(DarkModeContext);

  return (
    <main className="h-screen w-screen min-w-[312px] flex justify-center items-center relative p-2 sm:p-0">
      <Image
        className="-z-50"
        src={darkMode ? "/loginBackground2.jpg" : "/loginBackground1.jpg"}
        alt="Background"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
      <div
        className="min-h-[550px] h-[90%] lg:h-[75%] max-h-[600px] min-w-[300px] md:min-w-[512px] lg:min-w-[912px] flex justify-center 
        items-center shadow-lg shadow-black rounded-lg overflow-hidden"
      >
        <Suspense
          fallback={
            <div className="flex flex-col">
              <CircularProgress
                className="dark:[&_*]:!text-yellow-500"
                size={40}
              />
              <p className="text-blue-600 dark:text-yellow-500">Loading</p>
            </div>
          }
        >
          <section className="h-full w-full lg:w-1/2">
            <LoginForm mediumWidth={mediumWidth} />
          </section>
          <section className="hidden lg:flex lg:w-1/2 h-full relative overflow-hidden">
            <Image
              className={darkMode ? "bg-gray-800" : "bg-gray-100"}
              src={darkMode ? "/loginBannerDark.svg" : "/loginBanner.svg"}
              alt="Login banner"
              fill={true}
            />
          </section>
        </Suspense>
      </div>
    </main>
  );
}
