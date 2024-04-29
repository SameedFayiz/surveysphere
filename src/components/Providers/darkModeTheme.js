"use client";
import { createContext, useEffect, useState } from "react";
import DarkModeButton from "../darkModeButton";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@mui/material";

export const DarkModeContext = createContext();

const DarkModeTheme = ({ children }) => {
  const path = usePathname();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  useEffect(() => {
    setDarkMode(!!JSON.parse(localStorage.getItem("theme")));
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((themeMode) => {
      localStorage.setItem("theme", !themeMode);
      return !themeMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={`${darkMode ? "dark" : ""}  w-full h-full`}>
        <div
          className={`${
            !path.includes("/Creators/Login") &&
            !path.includes("/Creators/Register")
              ? "hidden"
              : ""
          } fixed top-3 right-3 z-40 bg-slate-400 rounded-full shadow-md shadow-white`}
        >
          <DarkModeButton
            checked={darkMode}
            onChange={() => {
              toggleDarkMode();
            }}
          />
        </div>
        {children}
      </div>
    </DarkModeContext.Provider>
  );
};

export default DarkModeTheme;
