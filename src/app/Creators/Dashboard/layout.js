"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navBar";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import DataContextProvider from "@/components/Providers/dataContext";
import { NavigateBefore } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const router = useRouter();

  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  return (
    <>
      <DataContextProvider>
        <div
          className={`${
            darkMode ? "dark" : ""
          } min-w-[300px] min-h-screen dark:bg-gray-700 flex flex-col relative`}
        >
          <button
            onClick={() => {
              router.back();
            }}
            className="fixed top-20 left-0 z-50 text-2xl opacity-50 bg-black text-white rounded-e-2xl p-2 hover:scale-105 hover:opacity-100
           transition-all duration-200 ease-in-out"
          >
            <NavigateBefore />
          </button>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode}></Navbar>
          <div className="flex flex-1">{children}</div>
          <Footer />
        </div>
      </DataContextProvider>
    </>
  );
}
