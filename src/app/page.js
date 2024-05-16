import Link from "next/link";
import BannerLandingPage from "@/components/landingPage/banner";
import { LandingNav } from "@/components/navBar";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-gradient-radial dark:bg-none from-gray-100 from-15% via-70% to-95% via-white to-gray-100 dark:bg-gray-900">
      <nav className="w-full md:h-40 flex items-center py-4 transition-all duration-200 ease-in-out">
        <div className="w-full p-8 lg:px-20">
          <div className="flex justify-between items-center">
            <a
              href="/"
              className="text-xl sm:text-2xl md:text-4xl font-bold text-yellow-400"
            >
              SurveySphere
            </a>
            <div className="hidden sm:flex gap-4 md:gap-8 *:mr-0">
              <Link
                href="/Creators/Dashboard"
                className="text-sm md:text-base text-gray-800 font-medium dark:text-white hover:text-yellow-500 dark:hover:text-yellow-400 mx-4 transition-all
                 duration-300 ease-in-out group"
              >
                Browse Surveys
                <p
                  className={`mx-auto w-0 !bg-yellow-500 dark:hover:!text-yellow-400 group-hover:w-full [line-height:0.9px] !text-[0.9px]
                 duration-300 transition-all ease-linear`}
                >
                  .
                </p>
              </Link>
              <Link
                href="/Creators/Dashboard"
                className="text-sm md:text-base text-gray-800 font-medium dark:text-white hover:text-yellow-500 dark:hover:text-yellow-400 mx-4 transition-all
                 duration-300 ease-in-out group"
              >
                Contact us
                <p
                  className={`mx-auto w-0 !bg-yellow-500 dark:hover:!text-yellow-400 group-hover:w-full [line-height:0.9px] !text-[0.9px]
                 duration-300 transition-all ease-linear`}
                >
                  .
                </p>
              </Link>
              <Link
                href="/Creators/Dashboard"
                className="text-sm md:text-base text-gray-800 font-medium dark:text-white hover:text-yellow-500 dark:hover:text-yellow-400 mx-4 transition-all
                 duration-300 ease-in-out group"
              >
                FAQs
                <p
                  className={`mx-auto w-0 !bg-yellow-500 dark:hover:!text-yellow-400 group-hover:w-full [line-height:0.9px] !text-[0.9px]
                 duration-300 transition-all ease-linear`}
                >
                  .
                </p>
              </Link>
            </div>
            <div className="block sm:hidden">
              <LandingNav />
            </div>
          </div>
        </div>
      </nav>
      <BannerLandingPage />
    </main>
  );
}
