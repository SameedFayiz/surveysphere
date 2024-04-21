"use client";
import { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import Footer from "@/components/footer";
import Navbar from "@/components/navBar";
import DataContextProvider from "@/components/Providers/dataContext";
import { DarkModeContext } from "@/components/Providers/darkModeTheme";
import { NavigateBefore } from "@mui/icons-material";

export default function DashboardLayout({ children }) {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const router = useRouter();
  const path = usePathname();

  if (path.includes("Login") || path.includes("Register")) {
    return <>{children}</>;
  }

  return (
    <>
      <DataContextProvider>
        <div
          className={`${
            darkMode ? "dark" : ""
          } min-w-[312px] min-h-screen dark:bg-gray-700 flex flex-col relative`}
        >
          {path != "/Creators/Dashboard" ? (
            <button
              onClick={() => {
                router.back();
              }}
              className="hidden fixed top-20 md:top-36 left-0 z-50 sm:flex justify-center items-center opacity-50 bg-black text-white rounded-e-2xl p-2 ps-0 hover:scale-105 hover:opacity-100
           transition-all duration-200 ease-in-out"
            >
              <NavigateBefore className="text-base md:text-[30px]" />
              <span className="text-xs md:text-base">Back</span>
            </button>
          ) : (
            <></>
          )}
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}></Navbar>
          <div className="flex flex-1">{children}</div>
          <Footer />
        </div>
      </DataContextProvider>
    </>
  );
}
