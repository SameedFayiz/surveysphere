import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import {
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function RegisterForm({ mediumWidth, myAlert, setAlert }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [myError, setMyError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMyError(false);
    setLoading(true);
    setAlert({
      display: false,
      error: false,
      message: "",
    });
    let formData = new FormData(e.target);
    formData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    let sendReq = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    sendReq = await sendReq.json();

    if (sendReq.error) {
      if (sendReq.error === "User already exists") {
        setMyError(true);
      } else {
        setAlert({
          display: true,
          error: true,
          message: "Couldn't create account due to some error",
        });
      }
    } else {
      setAlert({
        display: true,
        error: false,
        message: "Account successfully created. Redirecting to sign-in page",
      });
      setTimeout(() => {
        router.push("/Creators/Login");
      }, 3000);
    }
    setTimeout(() => {
      setAlert({
        display: false,
        error: false,
        message: "",
      });
    }, 3000);
    setLoading(false);
  };

  return (
    <div className="w-full h-full flex px-10 justify-center items-center bg-white dark:bg-gray-900">
      <div className="flex flex-col">
        <div className="flex flex-col items-center mb-4 md:mb-8">
          <p className="w-full text-center text-2xl md:text-[34px] font-bold text-gray-800 dark:text-yellow-500 uppercase">
            new creator&rsquo;s account
          </p>
          <p className="text-center text-xs md:text-base font-medium text-gray-500 dark:text-white">
            Please enter your details to continue
          </p>
        </div>
        <div className="mb-4">
          <form onSubmit={handleSubmit}>
            {myError ? (
              <Alert
                className="p mb-2 text-sm tracking-tighter md:tracking-normal md:text-base"
                severity="error"
              >
                This email is already registered with another account
              </Alert>
            ) : null}
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <TextField
                disabled={loading}
                size={`${mediumWidth ? "" : "small"}`}
                className={`dark:[&_*]:!text-white dark:!bg-gray-800 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
                 dark:[&>div.Mui-focused_fieldset]:!border-white [&_fieldset]:transition-all [&_fieldset]:duration-300`}
                fullWidth
                type="text"
                required
                id="firstName"
                name="firstName"
                label="First name"
                variant="outlined"
                inputProps={{ minLength: 3 }}
              />

              <TextField
                disabled={loading}
                size={`${mediumWidth ? "" : "small"}`}
                className={`dark:[&_*]:!text-white dark:!bg-gray-800 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
                 dark:[&>div.Mui-focused_fieldset]:!border-white [&_fieldset]:transition-all [&_fieldset]:duration-300`}
                fullWidth
                type="text"
                required
                id="lastName"
                name="lastName"
                label="Last name"
                variant="outlined"
                inputProps={{ minLength: 3 }}
              />
            </div>
            <div className="flex flex-col mb-3">
              <TextField
                disabled={loading}
                size={`${mediumWidth ? "" : "small"}`}
                className={`dark:[&_*]:!text-white dark:bg-gray-800 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
                 dark:[&>div.Mui-focused_fieldset]:!border-white [&_fieldset]:transition-all [&_fieldset]:duration-300`}
                fullWidth
                type="email"
                required
                id="email"
                name="email"
                label="Email"
                variant="outlined"
              />
            </div>
            <div className="flex flex-col mb-3">
              <TextField
                disabled={loading}
                size={`${mediumWidth ? "" : "small"}`}
                className={`dark:[&_*]:!text-white dark:bg-gray-800 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
                 dark:[&>div.Mui-focused_fieldset]:!border-white [&_fieldset]:transition-all [&_fieldset]:duration-300`}
                fullWidth
                autoComplete="off"
                required
                type={show ? "text" : "password"}
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                inputProps={{
                  minLength: 8,
                  pattern: "^(?=.*[0-9])(?=.*[a-zA-Z]).+$",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShow((val) => !val);
                        }}
                        edge="end"
                      >
                        {show ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <button
              disabled={loading || (myAlert.display && myAlert.error)}
              type="submit"
              className="flex items-center justify-center gap-2 w-full p-2 text-sm md:text-base bg-opacity-100 disabled:bg-opacity-55 bg-yellow-500 hover:bg-yellow-600 text-white
               dark:text-black font-medium rounded-lg hover:scale-[1.02] transition-all ease-in-out duration-200"
            >
              Register
              {loading ? (
                <CircularProgress className="text-white" size={20} />
              ) : null}
            </button>
          </form>
        </div>
        <div className="mb-2">
          <button
            type="submit"
            className="w-full p-1 text-sm md:text-base bg-white text-gray-800 font-medium border-2 border-slate-300 rounded-lg hover:scale-[1.02] transition-all ease-in-out duration-200 flex justify-center items-center gap-2"
          >
            <FcGoogle style={{ fontSize: "30px" }} />
            Sign-Up with Google
          </button>
        </div>
        <div className="flex justify-center">
          <p className="text-xs md:text-sm text-gray-800 dark:text-white">
            Already have an account?{" "}
            <Link
              href={"/Creators/Login"}
              className="text-yellow-500 hover:text-yellow-600 transition-all duration-200 ease-in-out"
            >
              Sign in now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
