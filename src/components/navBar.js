import { useState, useEffect } from "react";
import DarkModeButton from "./darkModeButton";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { Person2, Poll } from "@mui/icons-material";
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
        }`} z-50 w-full py-4 bg-slate-200
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
                    toggleDarkMode();
                  }}
                />
              </div>

              <Link
                href="/Creators/Dashboard"
                className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-yellow-400 mx-4 transition-all duration-300 ease-in-out group"
              >
                My Surveys
                <p className="mx-auto w-0 bg-gray-900 dark:bg-yellow-400 group-hover:w-full text-[0.9px] duration-300 transition-all ease-linear">
                  .
                </p>
              </Link>
              <Link
                href="/Creators/Profile"
                className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-yellow-400 mx-4 transition-all duration-300 ease-in-out group"
              >
                Profile
                <p className="mx-auto w-0 bg-gray-900 dark:bg-yellow-400 group-hover:w-full text-[0.9px] duration-300 transition-all ease-linear">
                  .
                </p>
              </Link>
              <button
                className="p-2 ms-4 text-sm bg-red-600 hover:bg-red-700 text-white rounded hover:scale-105 transition-all duration-200 ease-in-out shadow-md shadow-gray-500"
                onClick={() => {
                  signOut();
                }}
              >
                Signout
              </button>
              {/* <div className="relative group">
                <Avatar className="bg-yellow-500"></Avatar>
                <div className="w-32 py-2 hidden hover:block group-hover:block absolute right-2 bg-white border-2 border-gray-300 rounded-md transition-all duration-500 ease-in-out">
                  <div className="w-3 h-3 border-s-2 border-t-2 border-gray-300 bg-white rotate-45 absolute -top-0 right-1 -translate-y-1/2 rounded"></div>
                  <div className="ps-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all duration-200 ease-in-out">
                    Profile
                  </div>
                  <Divider />
                  <div
                    onClick={() => {
                      signOut();
                    }}
                    className="ps-2 py-2 text-sm text-red-500 font-medium hover:bg-gray-100 transition-all duration-200 ease-in-out"
                  >
                    <p>Signout</p>
                  </div>
                </div>
              </div> */}
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

// bg-gradient-to-tr dark:[background-image:none] from-gray-300 via-white to-gray-300
