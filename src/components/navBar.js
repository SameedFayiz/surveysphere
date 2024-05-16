"use client";
import { useState, useEffect } from "react";
import DarkModeButton from "./darkModeButton";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { Close, Dehaze, Person2, Poll } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = ({ darkMode, toggleDarkMode }) => {
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
          isScrolled ? "bg-opacity-70 dark:bg-opacity-70" : ""
        }`} z-50 w-full py-4 bg-gray-600 transition-all duration-200 ease-in-out`}
      >
        <div className="container mx-auto px-10">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-lg font-bold text-yellow-400">
                SurveySphere
              </a>
            </div>
            <div className="hidden md:flex items-center">
              <div>
                <DarkModeButton
                  checked={darkMode}
                  onChange={() => {
                    toggleDarkMode();
                  }}
                />
              </div>

              <Link
                href="/Creators/Dashboard"
                className={`text-white hover:text-yellow-400 mx-4 transition-all
                 duration-300 ease-in-out group ${
                   path == "/Creators/Dashboard" ? "!text-yellow-400" : ""
                 }`}
              >
                My Surveys
                <p
                  className={`mx-auto w-0 !bg-yellow-400 group-hover:w-full text-[0.9px]
                 duration-300 transition-all ease-linear  ${
                   path == "/Creators/Dashboard" ? "w-full" : ""
                 }`}
                >
                  .
                </p>
              </Link>
              <Link
                href="/Creators/Profile"
                className={`text-white hover:text-yellow-400 mx-4 transition-all
                 duration-300 ease-in-out group ${
                   path == "/Creators/Profile" ? "!text-yellow-400" : ""
                 }`}
              >
                Profile
                <p
                  className={`mx-auto w-0 !bg-yellow-400 group-hover:w-full text-[0.9px]
                 duration-300 transition-all ease-linear  ${
                   path == "/Creators/Profile" ? "w-full" : ""
                 }`}
                >
                  .
                </p>
              </Link>
              <button
                className="p-2 ms-4 text-sm bg-red-600 hover:bg-red-700 text-white rounded hover:scale-105 transition-all duration-200 ease-in-out shadow-md shadow-gray-500"
                onClick={() => {
                  signOut();
                  localStorage?.clear();
                }}
              >
                Signout
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <>
        <div className="fixed top-3 right-3 z-40 bg-slate-400 rounded-full shadow-md shadow-white">
          <DarkModeButton
            checked={darkMode}
            onChange={() => {
              toggleDarkMode();
            }}
          />
        </div>
        <nav>
          <Paper
            className="fixed bottom-0 left-0 right-0 z-50 dark:bg-gray-800 dark:[&_*]:text-white border-t"
            elevation={3}
          >
            <BottomNavigation
              className="w-full bg-inherit dark:[&_.Mui-selected]:!text-yellow-500 dark:[&_.Mui-selected>svg]:!fill-yellow-500"
              showLabels
              value={path}
              onChange={(event, newValue) => {
                router.push(newValue);
              }}
            >
              <BottomNavigationAction
                label="SurveySphere"
                value={"/"}
                className="text-lg font-semibold dark:font-normal uppercase tracking-tight"
              />
              <BottomNavigationAction
                value={"/Creators/Dashboard"}
                label="Surveys"
                icon={<Poll />}
              />
              <BottomNavigationAction
                value={"/Creators/Profile"}
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

export const LandingNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {open ? (
        <Close
          className="cursor-pointer"
          onClick={() => {
            setOpen(false);
          }}
        />
      ) : (
        <Dehaze
          className="cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        />
      )}
      {open ? (
        <div className="absolute top-10 right-0 flex flex-col gap-4 w-32 text-right">
          <Link
            href="/Creators/Dashboard"
            className="text-sm text-gray-800 font-medium dark:text-white hover:text-yellow-500 dark:hover:text-yellow-400 transition-all
                 duration-300 ease-in-out"
          >
            Browse Surveys
          </Link>
          <Link
            href="/Creators/Dashboard"
            className="text-sm text-gray-800 font-medium dark:text-white hover:text-yellow-500 dark:hover:text-yellow-400 transition-all
                 duration-300 ease-in-out"
          >
            Contact us
          </Link>
          <Link
            href="/Creators/Dashboard"
            className="text-sm text-gray-800 font-medium dark:text-white hover:text-yellow-500 dark:hover:text-yellow-400 transition-all
                 duration-300 ease-in-out"
          >
            FAQs
          </Link>
        </div>
      ) : null}
    </div>
  );
};
