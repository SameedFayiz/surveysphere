"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import DataDisplay from "@/components/dataDisplay";
import { DataContext } from "@/components/Providers/dataContext";
import AlertBox from "@/components/alertBox";
import { useSession } from "next-auth/react";

// Administrative controls page
export default function Page() {
  const userData = useSession().data;
  const [data, setData] = useContext(DataContext);
  const [dataLoading, setDataLoading] = useState(true);
  const [alert, setAlert] = useState({
    display: false,
    error: false,
    message: "",
  });

  const getData = useCallback(async (id) => {
    try {
      setDataLoading(true);
      setAlert({
        display: false,
        error: false,
        message: "",
      });
      let myRequest = await fetch(`/api/surveys/${id}`, {
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

      setAlert({
        display: true,
        error: true,
        message:
          error.message === "Failed to fetch"
            ? "Connection error"
            : "Some error happened fetching data. Reload page",
      });
    }
    setDataLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userData?.user?.id) {
      getData(userData?.user?.id);
    }
  }, [getData, userData?.user?.id]);

  return (
    <>
      {alert.display ? (
        <AlertBox error={alert.error}>{alert.message}</AlertBox>
      ) : null}
      <main className="flex flex-col w-full bg-white dark:bg-slate-600">
        <section className="flex w-full py-5 md:py-10 bg-gray-700 items-center px-4 md:px-10">
          <p className="text-base md:text-3xl text-white font-bold tracking-wide uppercase">
            Surveys
          </p>
        </section>
        <DataDisplay
          userId={userData?.user?.id}
          data={data}
          setData={setData}
          dataLoading={dataLoading}
          getData={getData}
          setAlert={setAlert}
        />
      </main>
    </>
  );
}
