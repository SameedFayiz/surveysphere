"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import wrapText from "@/utils/wrapText";
import RadioQuestion from "@/components/radioQuestion";
import ScaleQuestion from "@/components/scaleQuestion";
import TextQuestion from "@/components/textQuestion";
import AlertBox from "@/components/alertBox";
import {
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Link from "next/link";

export default function Page({ params }) {
  const router = useRouter();
  const path = usePathname();
  const [surveyData, setSurveyData] = useState(null);
  const [open, setopen] = useState(false);
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

  const handleClick = async (id) => {
    try {
      let requestBody =
        surveyData?.status === "active"
          ? { status: "inactive" }
          : { status: "active" };
      let myRequest = await fetch(`/api/survey/${id}`, {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let res = await myRequest.json();

      if (res.error) {
        throw { status: myRequest.status, ...res };
      }
      setSurveyData(null);
      setTimeout(() => {
        setAlert({
          display: true,
          error: false,
          message: "Updated the survey status",
        });
      }, 1500);
    } catch (error) {
      setAlert({
        display: true,
        error: true,
        message: "Failed to update the status due to an error",
      });
    } finally {
      setTimeout(() => {
        setAlert({
          display: false,
          error: false,
          message: "",
        });
      }, 5000);
    }
  };

  return (
    <main className="flex w-full min-h-screen flex-col bg-white dark:bg-gray-800 dark:text-white">
      <Dialog
        open={open}
        onClose={() => {
          setopen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="text-base md:text-lg">
          Confirm action
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="text-sm md:text-base"
          >
            {` Please confirm if you want to ${
              surveyData?.status === "inactive" ? "close" : "open"
            } this survey?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white p-2 rounded-md text-sm md:text-base transition-all duration-200 ease-in-out"
            onClick={() => {
              setopen(false);
            }}
          >
            Cancel
          </button>
          <button
            className={`${
              surveyData?.status === "active"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-700 hover:bg-green-800"
            }  text-white p-2 rounded-md text-sm md:text-base transition-all duration-200
                   ease-in-out`}
            onClick={() => {
              handleClick(surveyData?._id);
              setopen(false);
            }}
          >
            {`${surveyData?.status === "active" ? "Close" : "Open"} Survey`}
          </button>
        </DialogActions>
      </Dialog>

      {alert.display ? (
        <AlertBox error={alert.error}>{alert.message}</AlertBox>
      ) : null}
      <section className="flex w-full py-5 md:py-10 bg-gray-700 items-center px-4 md:px-10">
        <p className="text-base md:text-3xl text-white font-bold tracking-wide uppercase">
          Survey form preview
        </p>
      </section>
      {surveyData ? (
        <>
          <section className="flex flex-col gap-2 w-full px-4 md:px-10 pt-5 text-gray-800 dark:text-white">
            <div className="flex flex-col md:flex-row my-4 gap-4">
              <button
                onClick={() => {
                  setopen(true);
                }}
                className={`${
                  surveyData?.status === "active"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-700 hover:bg-green-800"
                } flex justify-center items-center max-[450px]:w-full min-[450px]:w-28 md:w-40 h-12 lg:h-full text-xs md:text-base disabled:bg-gray-500 disabled:hover:bg-gray-500 text-white  hover:scale-105 disabled:hover:scale-100 transition-all duration-200
                   ease-in-out rounded-lg shadow-md shadow-gray-500`}
              >
                {`${surveyData?.status === "active" ? "Close" : "Open"} Survey`}
              </button>
              <Alert
                severity="info"
                className="w-full text-xs lg:text-sm tracking-tighter lg:tracking-normal"
              >
                Closing the survey involves making it inaccessible to the public
                and discontinuing the acceptance of further responses.
              </Alert>
            </div>
            <div className="flex items-center gap-x-2 mb-4">
              <p className="text-gray-800 dark:text-yellow-500 font-medium">
                Share:
              </p>
              <div className="border-gray-500 border flex items-center w-full h-full rounded overflow-hidden">
                <Link
                  className="px-2 min-w text-sm dark:text-white hover:text-blue-600 dark:hover:text-yellow-500
                 transition-all duration-200 ease-in-out break-all"
                  ref={linkEleRef}
                  href={`${window?.location?.origin}/${path
                    .split("/")
                    .pop()}?title=${encodeURIComponent(
                    surveyData?.surveyTitle
                  )}`}
                >
                  {`${window?.location?.origin}/${path
                    .split("/")
                    .pop()}?title=${encodeURIComponent(
                    surveyData?.surveyTitle
                  )}`}
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
              <span className="dark:text-yellow-500 font-semibold">
                Description:{" "}
              </span>
              {wrapText(surveyData?.description)}
            </div>
            <div className="text-sm md:text-base">
              <span className="dark:text-yellow-500 font-semibold">
                Category:{" "}
              </span>
              {surveyData?.category}
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
        </>
      ) : (
        <div className="w-full h-screen flex justify-center items-center flex-col">
          <CircularProgress className="dark:[&_*]:!text-yellow-500" size={40} />
          <p className="text-blue-600 dark:text-yellow-500">Loading</p>
        </div>
      )}
    </main>
  );
}
