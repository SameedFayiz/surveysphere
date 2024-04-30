"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const search = useSearchParams();
  const callBackUrl = search.get("callBackUrl");

  useEffect(() => {
    if (!callBackUrl) {
      router.push("/Not_Found/404");
    }
  }, [callBackUrl, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-20">
      <div className="flex flex-col gap-6 justify-center items-center text-gray-800 text-pretty text-3xl bg-white rounded-3xl shadow-2xl shadow-gray-500 px-10 w-[40%] h-60">
        Response was submitted
        <div className="flex flex-col text-base text-center">
          You have responded to this survey
          <button
            onClick={() => {
              router.push(callBackUrl);
            }}
            className="text-blue-600 font-semibold"
          >
            Submit another response
          </button>
        </div>
      </div>
    </main>
  );
}
