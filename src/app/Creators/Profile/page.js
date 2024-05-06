"use client";
import { useContext, useRef, useState } from "react";
import AlertBox from "@/components/alertBox";
import {
  CircularProgress,
  IconButton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { Cancel, Edit } from "@mui/icons-material";
import { DarkModeContext } from "@/components/Providers/darkModeTheme";
import Image from "next/image";

// Administrative controls page
export default function Page() {
  const { data, update } = useSession();
  const { darkMode } = useContext(DarkModeContext);
  const smallWidth = useMediaQuery("(max-width:640px)");
  const editBoxRef = useRef(null);
  const [editBox, setEditBox] = useState("");
  const [alert, setAlert] = useState({
    display: false,
    error: false,
    message: "",
  });

  const handleDataEdit = async () => {
    let { name, value } = editBoxRef.current;
    let sendData = {};
    if (name === "firstName") {
      sendData.firstName = value;
    } else if (name === "lastName") {
      sendData.lastName = value;
    } else {
      sendData.email = value;
    }
    console.log(sendData);
    try {
      let sendReq = await fetch(`/api/user/${data?.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      sendReq = await sendReq.json();
      if (sendReq.error) {
        throw sendReq;
      }
      let user = sendReq?.user;
      console.log(user);

      await update({
        name: user.firstName + " " + user.lastName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
      console.log(data);

      setAlert({
        display: true,
        error: false,
        message: "Information updated",
      });
      setEditBox("");
    } catch (error) {
      setAlert({
        display: true,
        error: true,
        message: "Could not updated the information",
      });
    }
    setAlert({
      display: false,
      error: false,
      message: "",
    });
    update({ name: data?.user.firstName + " " + data?.user.lastName });
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
            <div
              className="dark:bg-gray-800 shadow-lg shadow-gray-400 rounded-lg flex justify-between px-10 py-8 min-[480px]:px-20
             sm:p-16 md:p-16 md:px-20 lg:px-32 relative"
            >
              <Image
                className={`absolute top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-0 right-1/2 md:right-12 min-[940px]:right-20 lg:right-40 xl:right-60  md:block transition-all duration-500 ease-in-out opacity-20 md:opacity-100${
                  editBox ? "opacity-20" : ""
                }`}
                src={darkMode ? "/profilePageDark.svg" : "/profilePage.svg"}
                alt="Image"
                height={330}
                width={330}
              />
              <div className="w-full flex flex-col items-center sm:items-start gap-6">
                <p className="uppercase text-2xl text-gray-800 dark:text-yellow-500">
                  Account details
                </p>
                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 items-end z-10">
                  <TextField
                    size={smallWidth ? "small" : ""}
                    fullWidth
                    className="sm:w-1/2 md:w-60 lg:w-80 xl:w-96 pointer-events-none rounded dark:[&_*]:!text-white dark:!bg-gray-900 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
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
                    label={"Firstname"}
                    variant="outlined"
                    // variant={darkMode ? "outlined" : "standard"}
                    value={data ? data.user.firstName : ""}
                  />
                  {editBox === "firstName" ? (
                    <TextField
                      size={smallWidth ? "small" : ""}
                      fullWidth
                      inputProps={{
                        ref: editBox === "firstName" ? editBoxRef : null,
                      }}
                      name="firstName"
                      className="sm:w-1/2 md:w-60 lg:w-80 xl:w-96 rounded dark:[&_*]:!text-white focus-within:!bg-white focus-within:dark:!bg-gray-900 dark:!bg-gray-900 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
                 dark:[&>div.Mui-focused_fieldset]:!border-white [&_fieldset]:transition-all [&_fieldset]:duration-300"
                      // variant={darkMode ? "outlined" : "standard"}
                      variant="outlined"
                      label="New Firstname"
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
                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 items-end z-10">
                  <TextField
                    size={smallWidth ? "small" : ""}
                    fullWidth
                    className="sm:w-1/2 md:w-60 lg:w-80 xl:w-96 pointer-events-none rounded dark:[&_*]:!text-white dark:!bg-gray-900 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
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
                    // variant={darkMode ? "outlined" : "standard"}
                    variant="outlined"
                    value={data ? data.user.lastName : ""}
                  />
                  {editBox === "lastName" ? (
                    <TextField
                      size={smallWidth ? "small" : ""}
                      fullWidth
                      inputProps={{
                        ref: editBox === "lastName" ? editBoxRef : null,
                      }}
                      name="lastName"
                      className="sm:w-1/2 md:w-60 lg:w-80 xl:w-96 rounded dark:[&_*]:!text-white focus-within:!bg-white focus-within:dark:!bg-gray-900 dark:!bg-gray-900 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
                 dark:[&>div.Mui-focused_fieldset]:!border-white [&_fieldset]:transition-all [&_fieldset]:duration-300"
                      // variant={darkMode ? "outlined" : "standard"}
                      variant="outlined"
                      label="New Lastname"
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
                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 items-end z-10">
                  <TextField
                    size={smallWidth ? "small" : ""}
                    fullWidth
                    className="sm:w-1/2 md:w-60 lg:w-80 xl:w-96 pointer-events-none rounded dark:[&_*]:!text-white dark:!bg-gray-900 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
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
                    // variant={darkMode ? "outlined" : "standard"}
                    variant="outlined"
                    value={data ? data.user.email : ""}
                  />
                  {editBox === "email" ? (
                    <TextField
                      size={smallWidth ? "small" : ""}
                      fullWidth
                      inputProps={{
                        ref: editBox === "email" ? editBoxRef : null,
                      }}
                      name="email"
                      className="sm:w-1/2 md:w-60 lg:w-80 xl:w-96 rounded dark:[&_*]:!text-white focus-within:!bg-white focus-within:dark:!bg-gray-900 dark:!bg-gray-900 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
                 dark:[&>div.Mui-focused_fieldset]:!border-white [&_fieldset]:transition-all [&_fieldset]:duration-300"
                      // variant={darkMode ? "outlined" : "standard"}
                      variant="outlined"
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
                {editBox ? (
                  <div className="w-full flex flex-col z-10 sm:hidden">
                    <button
                      onClick={handleDataEdit}
                      className="text-sm p-2 rounded-md bg-green-600 text-white hover:bg-green-700 hover:scale-105 shadow-md shadow-gray-500 transition-all duration-200
             ease-in-out disabled:bg-green-400 disabled:hover:scale-100 disabled:pointer-events-none"
                    >
                      Confirm
                    </button>
                  </div>
                ) : null}
                <div className="w-full md:w-60 lg:w-80 xl:w-96 flex flex-col gap-6 sm:flex-row sm:justify-between z-10">
                  <button
                    className="text-sm sm:text-base p-2 rounded-md bg-red-600 text-white hover:bg-red-700 hover:scale-105 shadow-md shadow-gray-500 transition-all
                     duration-200
             ease-in-out disabled:bg-red-400 disabled:hover:scale-100 disabled:pointer-events-none"
                  >
                    Reset password
                  </button>
                  {editBox ? (
                    <button
                      onClick={handleDataEdit}
                      className="hidden sm:block p-2 rounded-md bg-green-600 text-white hover:bg-green-700 hover:scale-105 shadow-md shadow-gray-500 transition-all duration-200
             ease-in-out disabled:bg-green-400 disabled:hover:scale-100 disabled:pointer-events-none"
                    >
                      Confirm
                    </button>
                  ) : null}
                </div>
                <div className="w-full sm:w-auto flex flex-col md:hidden z-10">
                  <button
                    className="text-sm sm:text-base p-2 rounded-md bg-red-600 hover:bg-red-700 text-white hover:scale-105 transition-all duration-200 ease-in-out shadow-md shadow-gray-500"
                    onClick={() => {
                      signOut();
                      localStorage?.clear();
                    }}
                  >
                    Signout
                  </button>
                </div>
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
