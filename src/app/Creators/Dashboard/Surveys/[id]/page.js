"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import wrapText from "@/utils/wrapText";
import RadioQuestion from "@/components/radioQuestion";
import ScaleQuestion from "@/components/scaleQuestion";
import TextQuestion from "@/components/textQuestion";
import AlertBox from "@/components/alertBox";

export default function Page({ params }) {
  const [surveyData, setSurveyData] = useState(null);
  const [alert, setAlert] = useState({
    display: false,
    error: false,
    message: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (!surveyData) {
      (async () => {
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
            // setTimeout(() => {
            //   setAlert({
            //     display: false,
            //     error: false,
            //     message: "",
            //   });
            // }, 5000);
          }
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, surveyData]);

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
        <section className="flex flex-col gap-4 w-full px-4 md:px-10 pt-5">
          <div className="text-lg md:text-2xl font-semibold">
            <span className="dark:text-yellow-500">Title: </span>{" "}
            {wrapText(surveyData?.surveyTitle)}
          </div>
          <div className="text-sm md:text-base">
            <span className="dark:text-yellow-500">Description: </span>
            {wrapText(surveyData?.description)}
          </div>
        </section>
        <section className="text-xl md:text-2xl dark:text-yellow-500 font-semibold tracking-wide flex  w-full px-4 md:px-10 pt-4 md:pt-10">
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
}
