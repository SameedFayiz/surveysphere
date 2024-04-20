"use client";
import { DarkModeContext } from "@/components/Providers/darkModeTheme";
import AlertBox from "@/components/alertBox";
import RegisterForm from "@/components/registerForm";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useContext, useState } from "react";

export default function Page() {
  const mediumWidth = useMediaQuery("(min-width:768px)");
  const { darkMode } = useContext(DarkModeContext);
  const [myAlert, setAlert] = useState({
    display: false,
    error: false,
    message: "",
  });

  return (
    <main className="h-screen w-screen min-w-[312px] flex justify-center items-center relative p-2 sm:p-0">
      {myAlert.display ? (
        <AlertBox error={myAlert.error}>{myAlert.message}</AlertBox>
      ) : null}
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
        <section className="w-full h-full bg-white">
          <RegisterForm
            mediumWidth={mediumWidth}
            myAlert={myAlert}
            setAlert={setAlert}
          />
        </section>
      </div>
    </main>
  );
}
