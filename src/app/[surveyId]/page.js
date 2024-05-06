"use client";
import RadioQuestion from "@/components/radioQuestion";
import ScaleQuestion from "@/components/scaleQuestion";
import TextQuestion from "@/components/textQuestion";
import wrapText from "@/utils/wrapText";
import { CircularProgress, useMediaQuery } from "@mui/material";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import AlertBox from "@/components/alertBox";

export default function Page() {
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const router = useRouter();
  const path = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [alert, setAlert] = useState({
    display: false,
    error: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [surveyData, setSurveyData] = useState(null);
  const { control, handleSubmit } = useForm({
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!surveyData) {
      (async () => {
        try {
          let myRequest = await fetch(
            `/api/client/survey/${params.surveyId}?title=${title}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (myRequest.status == 404) {
            router.push("/Not_Found/404");
            return null;
          }

          let res = await myRequest.json();
          if (res.message == "Survey closed" && myRequest.status == 401) {
            router.push("/SurveyClosed");
            return null;
          }
          if (res.error) {
            throw { status: myRequest.status, ...res };
          }

          let questions = res.survey.questions;
          questions.sort((a, b) => {
            return a.qNo - b.qNo;
          });
          res.survey.questions = questions;
          setSurveyData(res.survey);
        } catch (error) {
          setAlert({
            display: true,
            error: true,
            message:
              error.message === "Failed to fetch"
                ? "No internet connection"
                : "Some error happened fetching data. Reload page",
          });
          setTimeout(() => {
            setAlert({
              display: false,
              error: false,
              message: "",
            });
          }, 5000);
        }
      })();
    }
  }, [params.surveyId, path, router, surveyData, title]);

  const handleFormSubmit = async (answers) => {
    setLoading(true);
    try {
      let myRequest = await fetch("/api/client/survey/", {
        body: JSON.stringify({
          surveyId: surveyData._id,
          answers,
        }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      myRequest = await myRequest.json();

      if (myRequest.error) {
        throw myRequest;
      }

      router.push(`/FormSubmitted?callBackUrl=${path}?title=${title}`);
    } catch (error) {
      setAlert({
        display: true,
        error: true,
        message:
          error.message === "Failed to fetch"
            ? "Connection error"
            : error.message
            ? error.message
            : "Could not submit the survey, Please try again.",
      });
      setTimeout(() => {
        setAlert({
          display: false,
          error: false,
          message: "",
        });
      }, 5000);
    }
    setLoading(false);
  };

  if (surveyData) {
    return (
      <form
        className={darkMode ? "dark" : ""}
        onSubmit={handleSubmit(handleFormSubmit)}
        onKeyDown={(e) => {
          if (e.key == "Enter" && e.target.tagName != "TEXTAREA") {
            e.preventDefault();
          }
        }}
      >
        {alert.display ? (
          <AlertBox error={alert.error}>{alert.message}</AlertBox>
        ) : null}
        <main className="flex min-h-screen flex-col items-center justify-start bg-slate-300 dark:bg-gray-900 md:px-24 md:py-10 px-4 py-4">
          <section className="flex w-full h-24 bg-slate-700 items-center border-4 border-white dark:border-gray-800 rounded-t-2xl shadow-2xl ps-4 md:ps-10">
            <p className="text-base md:text-xl text-white dark:text-yellow-500 font-bold tracking-wide uppercase">
              {wrapText(surveyData?.surveyTitle)}
            </p>
          </section>
          <section className="flex flex-col gap-4 w-full p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white md:p-10">
            <div className="text-sm md:text-base">
              {wrapText(surveyData?.description)}
            </div>
            <div className="flex flex-col shadow md:shadow-lg dark:shadow-gray-300 p-4 rounded-xl">
              <p className="text-slate-700 dark:text-yellow-500 font-semibold text-base md:text-lg">
                Instructions:
              </p>
              <ol className="flex flex-col gap-2 text-xs md:text-sm tracking-wide text-slate-600 dark:text-gray-300 list-decimal list-inside px-4 md:px-5">
                <li>
                  Provide honest answers: Your responses should reflect your
                  genuine opinions and experiences. Avoid guessing or providing
                  answers you think the surveyor wants to hear.
                </li>
                <li>
                  Answer all questions: Complete all questions in the survey
                  unless otherwise instructed. If a question does not apply to
                  you, look for options such as &quot;N/A&quot; or &quot;Not
                  applicable.&quot;
                </li>
                <li>
                  Take your time: While it&apos;s important to complete the
                  survey in a timely manner, take sufficient time to consider
                  each question and provide thoughtful responses.
                </li>
                <li>
                  Follow the format: Pay attention to the format of the survey,
                  whether it&apos;s multiple choice, open-ended, rating scales,
                  etc., and respond accordingly.
                </li>
                <li>
                  Use appropriate language: Use clear and respectful language in
                  your responses. Avoid offensive or inappropriate language that
                  could detract from the survey&apos;s purpose.
                </li>
                <li>
                  Maintain confidentiality: Trust that your responses will be
                  kept confidential and used only for research purposes, unless
                  explicitly stated otherwise.
                </li>
                <li>
                  Contact for assistance: If you encounter any difficulties or
                  have questions about the survey, reach out to the survey
                  administrator for assistance.
                </li>
                <li>
                  Submit your responses: Once you have completed the survey,
                  follow the instructions for submitting your responses. Ensure
                  you have answered all required questions before submission.
                </li>
                <li>
                  Thank you for your participation: Your feedback is valuable
                  and contributes to the success of the survey. Thank you for
                  taking the time to participate and share your insights.
                </li>
              </ol>
            </div>
          </section>
          <section className="flex flex-col gap-10 w-full bg-white dark:bg-gray-800 p-4 md:p-10 rounded-b-2xl">
            {surveyData?.questions.map((i) => {
              return (
                <Controller
                  key={i.qNo}
                  name={String(i._id)}
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState: { error } }) =>
                    i.type === "radio" ? (
                      <RadioQuestion
                        qNo={i.qNo}
                        question={i.question}
                        options={i.options}
                        field={field}
                        error={error != undefined}
                      />
                    ) : i.type === "scale" ? (
                      <ScaleQuestion
                        qNo={i.qNo}
                        question={i.question}
                        range={i.range}
                        field={field}
                        error={error != undefined}
                      />
                    ) : (
                      <TextQuestion
                        qNo={i.qNo}
                        question={i.question}
                        field={field}
                        error={error != undefined}
                      />
                    )
                  }
                />
              );
            })}

            <button
              disabled={loading}
              className="w-16 md:w-20 px-4 py-2 bg-blue-600 hover:bg-blue-700 hover:scale-105 text-sm md:text-base text-white rounded-lg
               disabled:bg-slate-400 disabled:hover:bg-slate-400 disabled:hover:scale-100 transition-all
                duration-200 ease-in-out flex items-center justify-center gap-x-2 disabled:w-32"
              type="submit"
            >
              submit
              {loading ? (
                <CircularProgress className="text-white" size={20} />
              ) : null}
            </button>
          </section>
        </main>
      </form>
    );
  }
  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <CircularProgress className="dark:[&_*]:!text-yellow-500" size={40} />
      <p className="text-blue-600 dark:text-yellow-500">Loading</p>
    </div>
  );
}
