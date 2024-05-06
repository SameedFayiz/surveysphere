"use client";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "@/components/Providers/dataContext";
import AlertBox from "@/components/alertBox";
import { CircularProgress, IconButton, TextField } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { Cancel, Edit } from "@mui/icons-material";
import DarkModeTheme, {
  DarkModeContext,
} from "@/components/Providers/darkModeTheme";

// Administrative controls page
export default function Page() {
  const { data, update } = useSession();
  const { darkMode } = useContext(DarkModeContext);
  const editBoxRef = useRef(null);
  const [editBox, setEditBox] = useState("");
  const [alert, setAlert] = useState({
    display: false,
    error: false,
    message: "",
  });

  const handleDataEdit = async () => {
    let { name, value } = editBoxRef.current;
    console.log(name, value);
    let sendData = {};
    if (name === "firstName") {
      sendData.firstName = value;
    } else if (name === "lastName") {
      sendData.lastName = value;
    } else {
      sendData.email = value;
    }
    console.log(sendData);
    // try {
    //   let sendReq = await fetch(`/api/user/${data?.user.id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(sendData),
    //   });
    //   sendReq = await sendReq.json();
    //   if (sendReq.error) {
    //     throw sendReq;
    //   }
    //   setAlert({
    //     display: true,
    //     error: false,
    //     message: "Information updated",
    //   });
    // } catch (error) {
    //   setAlert({
    //     display: true,
    //     error: true,
    //     message: "Could not updated the information",
    //   });
    // }
    setAlert({
      display: false,
      error: false,
      message: "",
    });
  };

  return (
    <>
      {alert.display ? (
        <AlertBox error={alert.error}>{alert.message}</AlertBox>
      ) : null}
      <main className="flex flex-col w-full bg-white dark:bg-slate-900">
        <section className="flex w-full py-5 md:py-10 bg-gray-700 items-center px-4 md:px-10">
          <p className="text-base md:text-3xl text-white font-bold tracking-wide uppercase">
            Profile
          </p>
        </section>
        {data ? (
          <section className="p-4 md:p-10">
            <div className=" flex flex-col items-center sm:items-start gap-6 p-4 sm:ps-12 md:p-10 dark:bg-gray-800 shadow-lg shadow-gray-400 rounded-lg">
              <p className="uppercase text-2xl text-gray-800 dark:text-white">
                Account details
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <TextField
                  className="min-w-64 pointer-events-none rounded dark:[&_*]:!text-white dark:!bg-gray-900 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
                 dark:[&>div.Mui-focused_fieldset]:!border-white [&_fieldset]:transition-all [&_fieldset]:duration-300"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        className="!pointer-events-auto"
                        onClick={() => {
                          setEditBox("firstName");
                        }}
                      >
                        <Edit />
                      </IconButton>
                    ),
                  }}
                  label={"Fisrtname"}
                  variant={darkMode ? "outlined" : "standard"}
                  value={data ? data.user.firstName : ""}
                />
                {editBox === "firstName" ? (
                  <TextField
                    inputProps={{
                      ref: editBox === "firstName" ? editBoxRef : null,
                    }}
                    name="firstName"
                    className="w-full sm:w-auto rounded dark:[&_*]:!text-white dark:!bg-gray-900 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
                 dark:[&>div.Mui-focused_fieldset]:!border-white [&_fieldset]:transition-all [&_fieldset]:duration-300"
                    variant={darkMode ? "outlined" : "standard"}
                    label="New Username"
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          className="flex items-end  dark:pr-0"
                          onClick={() => {
                            setEditBox("");
                          }}
                        >
                          <Cancel className="dark:[&_*]:!text-red-600 !text-red-600" />
                        </IconButton>
                      ),
                    }}
                  />
                ) : null}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <TextField
                  className="min-w-64 pointer-events-none rounded dark:[&_*]:!text-white dark:!bg-gray-900 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
                 dark:[&>div.Mui-focused_fieldset]:!border-white [&_fieldset]:transition-all [&_fieldset]:duration-300"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        className="!pointer-events-auto"
                        onClick={() => {
                          setEditBox("lastName");
                        }}
                      >
                        <Edit />
                      </IconButton>
                    ),
                  }}
                  label={"Lastname"}
                  variant={darkMode ? "outlined" : "standard"}
                  value={data ? data.user.lastName : ""}
                />
                {editBox === "lastName" ? (
                  <TextField
                    inputProps={{
                      ref: editBox === "lastName" ? editBoxRef : null,
                    }}
                    name="lastName"
                    className="w-full sm:w-auto rounded dark:[&_*]:!text-white dark:!bg-gray-900 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
                 dark:[&>div.Mui-focused_fieldset]:!border-white [&_fieldset]:transition-all [&_fieldset]:duration-300"
                    variant={darkMode ? "outlined" : "standard"}
                    label="New Username"
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          className="flex items-end  dark:pr-0"
                          onClick={() => {
                            setEditBox("");
                          }}
                        >
                          <Cancel className="dark:[&_*]:!text-red-600 !text-red-600" />
                        </IconButton>
                      ),
                    }}
                  />
                ) : null}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <TextField
                  className="min-w-64 pointer-events-none rounded dark:[&_*]:!text-white dark:!bg-gray-900 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
                 dark:[&>div.Mui-focused_fieldset]:!border-white [&_fieldset]:transition-all [&_fieldset]:duration-300"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        className="!pointer-events-auto"
                        onClick={() => {
                          setEditBox("email");
                        }}
                      >
                        <Edit />
                      </IconButton>
                    ),
                  }}
                  label={"Email"}
                  variant={darkMode ? "outlined" : "standard"}
                  value={data ? data.user.email : ""}
                />
                {editBox === "email" ? (
                  <TextField
                    inputProps={{
                      ref: editBox === "email" ? editBoxRef : null,
                    }}
                    name="email"
                    className="w-full sm:w-auto rounded dark:[&_*]:!text-white dark:!bg-gray-900 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
                 dark:[&>div.Mui-focused_fieldset]:!border-white [&_fieldset]:transition-all [&_fieldset]:duration-300"
                    variant={darkMode ? "outlined" : "standard"}
                    label="New Email"
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          className="flex items-end  dark:pr-0"
                          onClick={() => {
                            setEditBox("");
                          }}
                        >
                          <Cancel className="dark:[&_*]:!text-red-600 !text-red-600" />
                        </IconButton>
                      ),
                    }}
                  />
                ) : null}
              </div>
              <div className="w-full flex justify-between">
                <button
                  className="p-2 rounded-md bg-red-600 text-white hover:bg-red-700 hover:scale-105 shadow-md shadow-gray-500 transition-all duration-200
             ease-in-out disabled:bg-red-400 disabled:hover:scale-100 disabled:pointer-events-none"
                >
                  Reset password
                </button>
                {editBox ? (
                  <button
                    onClick={handleDataEdit}
                    className="p-2 rounded-md bg-green-600 text-white hover:bg-green-700 hover:scale-105 shadow-md shadow-gray-500 transition-all duration-200
             ease-in-out disabled:bg-green-400 disabled:hover:scale-100 disabled:pointer-events-none"
                  >
                    Confirm
                  </button>
                ) : null}
              </div>
              <div className="block md:hidden">
                <button
                  className="p-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded hover:scale-105 transition-all duration-200 ease-in-out shadow-md shadow-gray-500"
                  onClick={() => {
                    signOut();
                    localStorage?.clear();
                  }}
                >
                  Signout
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="w-full h-full flex flex-col justify-center items-center my-60">
            <CircularProgress
              className="dark:[&_*]:!text-yellow-500"
              size={40}
            />
            <p className="text-blue-600 dark:text-yellow-500">Loading</p>
          </section>
        )}
      </main>
    </>
  );
}
