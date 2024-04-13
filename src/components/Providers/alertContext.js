"use client";
import { createContext, useState } from "react";

const AlertContext = createContext();

const AlertContextProvider = ({ children }) => {
  const [myAlert, setMyAlert] = useState({
    display: false,
    error: false,
    message: "",
  });

  const showAlert = (error, message) => {
    setMyAlert({
      display: true,
      error,
      message,
    });
  };

  const hideAlert = () => {
    setMyAlert({
      display: false,
      error: false,
      message: "",
    });
  };

  return (
    <AlertContext.Provider value={[myAlert, showAlert, hideAlert]}>
      {children}
    </AlertContext.Provider>
  );
};
export { AlertContext };
export default AlertContextProvider;
