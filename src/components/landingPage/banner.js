"use client";
import Image from "next/image";
import Typed from "typed.js";
import { useEffect, useRef } from "react";
import Link from "next/link";

const BannerLandingPage = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Create Free surveys",
        "Build anonymous survey forms",
        "find out what people think",
      ],
      typeSpeed: 50,
      backSpeed: 40,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="flex-1 w-full flex mb-10 relative">
      <Image
        priority={80}
        src={"/landingPage.svg"}
        alt="Sign up as creator"
        className="-scale-x-100 absolute md:hidden z-0 opacity-15"
        fill
      />
      <div className="flex-1 w-full md:w-6/12 min-[1112px]:w-[55%] p-8 md:pr-2 lg:p-20 flex flex-col justify-center z-10">
        <div className="flex flex-col">
          <span className="text-center md:text-start text-2xl sm:text-3xl md:text-xl lg:text-3xl min-[1112px]:text-4xl font-bold uppercase text-gray-800 dark:text-white">
            Join now as a creator to
          </span>
          <div className="text-center md:text-start text-lg sm:text-2xl md:text-xl lg:text-xl min-[1112px]:text-2xl lg:font-medium text-yellow-500">
            <span className="" ref={el} />
          </div>
        </div>
        <div className="text-center md:text-start mt-4 md:mt-5 lg:mt-7 min-[1112px]:mt-10">
          <div className="md:text-sm lg:text-base min-[1112px]:text-lg font-medium text-black md:text-gray-600 dark:text-white mb-2 lg:mb-4">
            Unlock Insights, Unleash Growth with Our Free Survey Maker!
            <br />
            Ready to transform your business through valuable feedback?
            Introducing SurveySphere, your all-in-one solution for crafting
            engaging surveys that drive actionable results – all for free!
          </div>
        </div>
        <div className="flex gap-5 mt-4 justify-center md:justify-start">
          <Link
            href={"/Creators/Register"}
            className="w-24 lg:w-32 h-10 lg:h-12 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 hover:scale-105 text-base md:text-sm lg:text-base text-white rounded-lg transition-all
                duration-200 ease-in-out"
          >
            Join Now
          </Link>
          <Link
            href={"/Creators/Login"}
            className="w-24 lg:w-32 h-10 lg:h-12 flex items-center justify-center bg-gray-600 hover:bg-gray-700 hover:scale-105 text-base md:text-sm lg:text-base text-white rounded-lg transition-all
                duration-200 ease-in-out"
          >
            Sign In
          </Link>
        </div>
      </div>
      <div className="hidden md:block md:w-6/12 min-[1112px]:w-[45%] flex-1 ml-auto relative overflow-hidden rounded-bl-[200px] rounded-tl-[500px]">
        <Image
          priority={80}
          src={"/landingPage.svg"}
          alt="Sign up as creator"
          className="-scale-x-100"
          fill
        />
      </div>
    </div>
  );
};

export default BannerLandingPage;
