"use client";

import { CircularProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full justify-center items-center flex flex-col">
          <CircularProgress className="dark:[&_*]:!text-yellow-500" size={40} />
          <p className="text-blue-600 dark:text-yellow-500">Loading</p>
        </div>
      }
    >
      <main className="flex min-h-screen flex-col items-center justify-start pt-20 px-4 bg-white dark:bg-gray-900">
        <div
          className="flex flex-col gap-6 justify-center items-center text-gray-800 text-pretty bg-gray-100 dark:bg-slate-800 rounded-3xl shadow-xl
       shadow-gray-700 px-2 md:px-10 w-full md:w-[60%] lg:w-[40%] h-60"
        >
          <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
            Response was submitted
          </span>
          <div className="flex flex-col text-base text-center">
            <span className="text-sm sm:text-base text-center text-gray-800 dark:text-white">
              You have responded to this survey
            </span>
            <LinkButton />
          </div>
        </div>
      </main>
    </Suspense>
  );
}

const LinkButton = () => {
  const router = useRouter();
  const search = useSearchParams();
  const callBackUrl = search.get("callBackUrl");

  useEffect(() => {
    if (!callBackUrl) {
      router.push("/Not_Found/404");
    }
  }, [callBackUrl, router]);

  return (
    <button
      onClick={() => {
        router.push(callBackUrl);
      }}
      className="text-sm sm:text-base text-blue-500 dark:text-yellow-500 underline underline-offset-2"
    >
      Submit another response
    </button>
  );
};
