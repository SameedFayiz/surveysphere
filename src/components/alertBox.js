import { Alert } from "@mui/material";

const AlertBox = ({ children, error }) => {
  return (
    <>
      <Alert
        className="fixed top-20 right-1 z-50 md:right-10 flex items-center animate-bounce tracking-tighter md:tracking-normal text-xs md:text-lg max-w-[85%]"
        severity={error ? "error" : "success"}
      >
        {children}
      </Alert>
    </>
  );
};

export default AlertBox;
