"use client";
import { useState, useEffect } from "react";
import DarkModeButton from "./darkModeButton";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { Person2, Poll } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";

const Navbar = ({ darkMode, setDarkMode }) => {
  const mediumWidth = useMediaQuery("(min-width:768px)");
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (mediumWidth) {
    return (
      <nav
        className={`${`sticky top-0 ${
          isScrolled ? "bg-opacity-60 dark:bg-opacity-60" : ""
        }`} z-50 w-full py-4 bg-gradient-to-tr dark:[background-image:none] from-gray-300 via-white to-gray-300
         dark:bg-gray-600 transition-all duration-200 ease-in-out`}
      >
        <div className="container mx-auto px-10">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <a
                href="#"
                className="text-lg font-bold text-gray-800 dark:text-yellow-500"
              >
                SurveySphere
              </a>
            </div>
            <div className="hidden md:flex items-center">
              <div>
                <DarkModeButton
                  checked={darkMode}
                  onChange={() => {
                    setDarkMode((val) => !val);
                  }}
                />
              </div>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-yellow-400 mx-4 transition-all duration-300 ease-in-out group"
              >
                Home
                <p className="mx-auto w-0 bg-gray-900 dark:bg-yellow-400 group-hover:w-full text-[0.9px] duration-300 transition-all ease-linear">
                  .
                </p>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-yellow-400 mx-4 transition-all duration-300 ease-in-out group"
              >
                My Surveys
                <p className="mx-auto w-0 bg-gray-900 dark:bg-yellow-400 group-hover:w-full text-[0.9px] duration-300 transition-all ease-linear">
                  .
                </p>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-yellow-400 mx-4 transition-all duration-300 ease-in-out group"
              >
                Profile
                <p className="mx-auto w-0 bg-gray-900 dark:bg-yellow-400 group-hover:w-full text-[0.9px] duration-300 transition-all ease-linear">
                  .
                </p>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-yellow-400 mx-4 transition-all duration-300 ease-in-out group"
              >
                Contact
                <p className="mx-auto w-0 bg-gray-900 dark:bg-yellow-400 group-hover:w-full text-[0.9px] duration-300 transition-all ease-linear">
                  .
                </p>
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <>
        <div className="fixed top-3 right-3 z-50 bg-slate-400 rounded-full shadow-md shadow-white">
          <DarkModeButton
            checked={darkMode}
            onChange={() => {
              setDarkMode((val) => !val);
            }}
          />
        </div>
        <nav>
          <Paper
            className="fixed bottom-0 left-0 right-0 z-50 dark:bg-gray-800 dark:[&_*]:text-white border-t"
            elevation={3}
          >
            <BottomNavigation
              className="w-full bg-inherit"
              showLabels
              value={path}
              onChange={(event, newValue) => {
                router.push(newValue);
              }}
            >
              <BottomNavigationAction
                label="SurveySphere"
                className="text-lg font-semibold dark:font-normal uppercase tracking-tight"
              />
              <BottomNavigationAction
                value={"/Dashboard"}
                label="Surveys"
                icon={<Poll />}
              />
              <BottomNavigationAction
                value={"/Profile"}
                label="Profile"
                icon={<Person2 />}
              />
            </BottomNavigation>
          </Paper>
        </nav>
      </>
    );
  }
};

export default Navbar;
