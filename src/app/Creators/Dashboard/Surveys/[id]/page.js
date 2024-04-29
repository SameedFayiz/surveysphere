"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import wrapText from "@/utils/wrapText";
import RadioQuestion from "@/components/radioQuestion";
import ScaleQuestion from "@/components/scaleQuestion";
import TextQuestion from "@/components/textQuestion";
import AlertBox from "@/components/alertBox";
import { CircularProgress } from "@mui/material";
import { Check } from "@mui/icons-material";
import Link from "next/link";

export default function Page({ params }) {
  const router = useRouter();
  const path = usePathname();
  const [surveyData, setSurveyData] = useState(null);
  const linkEleRef = useRef();
  const [alert, setAlert] = useState({
    display: false,
    error: false,
    message: "",
  });

  useEffect(() => {
    if (!surveyData) {
      (async () => {
        setAlert({
          display: false,
          error: false,
          message: "",
        });
        try {
          let myRequest = await fetch(`/api/survey/${params.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          let res = await myRequest.json();

          if (res.error) {
            throw { status: myRequest.status, ...res };
          }
          setSurveyData(res.survey);
        } catch (error) {
          if (error.status == 404) {
            router.push("/Not_Found/404");
          } else {
            setAlert({
              display: true,
              error: true,
              message:
                error.message === "Failed to fetch"
                  ? "Connection error"
                  : "Some error happened fetching data. Reload page",
            });
          }
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, surveyData]);

  const copyLink = () => {
    let copyText = linkEleRef.current;

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.innerText);
  };

  if (surveyData) {
    return (
      <main className="flex w-full min-h-screen flex-col bg-white dark:bg-gray-800 dark:text-white">
        {alert.display ? (
          <AlertBox error={alert.error}>{alert.message}</AlertBox>
        ) : null}
        <section className="flex w-full py-5 md:py-10 bg-gray-700 items-center px-4 md:px-10">
          <p className="text-base md:text-3xl text-white font-bold tracking-wide uppercase">
            Survey form preview
          </p>
        </section>
        <section className="flex flex-col gap-4 w-full px-4 md:px-10 pt-5 text-gray-800 dark:text-white">
          <div className="flex items-center gap-x-2">
            <p className="text-gray-800 dark:text-yellow-500">Share:</p>
            <div className="border-gray-500 border flex items-center w-full h-full rounded overflow-hidden">
              <Link
                className="px-2 min-w text-sm dark:text-white hover:text-blue-600 dark:hover:text-yellow-500
                 transition-all duration-200 ease-in-out break-all"
                ref={linkEleRef}
                href={`${window?.location?.origin}/${path
                  .split("/")
                  .pop()}?title=${encodeURI(surveyData?.surveyTitle)}`}
              >
                {`${window?.location?.origin}/${path
                  .split("/")
                  .pop()}?title=${encodeURI(surveyData?.surveyTitle)}`}
              </Link>
              <button
                onClick={(e) => {
                  e.target.innerText = "Copied !";
                  copyLink();
                  setTimeout(() => {
                    e.target.innerText = "Copy link";
                  }, 2000);
                }}
                className="h-full ms-auto p-1 text-white bg-blue-600 dark:bg-gray-600 hover:bg-blue-700 dark:hover:bg-gray-700 dark:hover:text-yellow-500
                 transition-all duration-200 ease-in-out"
              >
                Copy link
              </button>
            </div>
          </div>
          <div className="text-lg md:text-2xl font-semibold">
            <span className="dark:text-yellow-500">Title: </span>{" "}
            {wrapText(surveyData?.surveyTitle)}
          </div>
          <div className="text-sm md:text-base">
            <span className="dark:text-yellow-500">Description: </span>
            {wrapText(surveyData?.description)}
          </div>
        </section>
        <section className="text-xl md:text-2xl text-gray-800 dark:text-yellow-500 font-semibold tracking-wide flex  w-full px-4 md:px-10 pt-4 md:pt-10">
          Questions
        </section>
        <section className="flex flex-col gap-8 md:gap-10 w-full p-6 md:p-10 !pt-2">
          {surveyData?.questions.map((i) => {
            return i.type === "radio" ? (
              <RadioQuestion
                disabled={true}
                key={i.qNo}
                qNo={i.qNo}
                question={i.question}
                options={i.options}
              />
            ) : i.type === "scale" ? (
              <ScaleQuestion
                disabled={true}
                key={i.qNo}
                qNo={i.qNo}
                question={i.question}
                range={i.range}
              />
            ) : (
              <TextQuestion
                disabled={true}
                key={i.qNo}
                qNo={i.qNo}
                question={i.question}
              />
            );
          })}
        </section>
      </main>
    );
  }
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <CircularProgress className="dark:[&_*]:!text-yellow-500" size={40} />
      <p className="dark:text-yellow-500">Loading</p>
    </div>
  );
}
