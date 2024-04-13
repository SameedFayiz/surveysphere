"use client";
import DataDisplay from "@/components/dataDisplay";
import { Alert } from "@mui/material";
import { AlertContext } from "@/components/Providers/alertContext";
import { DataContext } from "@/components/Providers/dataContext";
import { useContext, useEffect, useState } from "react";

// Administrative controls page
export default function Page() {
  const [data, setData] = useContext(DataContext);
  const [dataLoading, setDataLoading] = useState(false);
  const [myAlert, showAlert, hideAlert] = useContext(AlertContext);

  const getData = async () => {
    try {
      setDataLoading(true);
      let myRequest = await fetch("/api/surveys", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      myRequest = await myRequest.json();

      if (myRequest.error) {
        throw myRequest;
      }

      setData(myRequest.surveys);
    } catch (error) {
      setData([]);
      showAlert(
        true,
        error.message === "Failed to fetch"
          ? "Connection error"
          : "Some error happened fetching data. Reload page"
      );
      setTimeout(() => {
        hideAlert();
      }, 6000);
    }
    setDataLoading(false);
  };

  useEffect(() => {
    if (!data) {
      getData();
    }
    window.addEventListener("load", getData);
    return () => {
      window.removeEventListener("load", getData);
    };
  });

  return (
    <>
      {myAlert.display ? (
        <Alert
          className="absolute top-10 right-1 md:right-10 flex items-center animate-bounce tracking-tighter md:tracking-normal text-xs md:text-lg max-w-[85%]"
          severity={myAlert.error ? "error" : "success"}
        >
          {myAlert.message}
        </Alert>
      ) : null}
      <main className="flex flex-col w-full bg-white dark:bg-slate-600">
        <section className="flex w-full py-5 md:py-10 bg-gray-700 items-center px-4 md:px-10">
          <p className="text-base md:text-3xl text-white font-bold tracking-wide uppercase">
            Surveys
          </p>
        </section>
        <DataDisplay
          data={data}
          setData={setData}
          dataLoading={dataLoading}
          revalidateData={getData}
        />
      </main>
    </>
  );
}
