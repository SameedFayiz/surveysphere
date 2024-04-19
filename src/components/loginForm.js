import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { Alert, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({ mediumWidth, params }) {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    let formData = new FormData(e.target);

    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl: params.get("callbackUrl")
        ? params.get("callbackUrl")
        : "/Creators/Dashboard",
    }).then((res) => {
      if (res.status == 200 && !res.error) {
        router.push(res.url);
      } else if (res.error === "incorrectPassword") {
        setError("Incorrect password");
      } else if (res.error === "userNotFound") {
        setError("Email not found, please sign-up first");
      } else {
        console.log(res.error);
        setError("Internal server error");
      }
    });
  };

  return (
    <div className="w-full h-full flex px-10 justify-center items-center bg-white dark:bg-gray-900">
      <div className="flex flex-col">
        <div className="flex flex-col items-center mb-4 md:mb-8">
          <p className="w-full text-center text-2xl md:text-[34px] font-bold text-gray-800 dark:text-yellow-500 uppercase">
            welcome back
          </p>
          <p className="text-center text-xs md:text-base font-medium text-gray-500 dark:text-white">
            Please enter your credentials to continue
          </p>
        </div>
        <div className="mb-4">
          {error ? (
            <Alert className="py-0 mb-3" severity="error">
              {error}
            </Alert>
          ) : null}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-3">
              <TextField
                size={`${mediumWidth ? "" : "small"}`}
                className={`dark:[&_*]:!text-white dark:!bg-gray-800 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
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
                size={`${mediumWidth ? "" : "small"}`}
                className={`dark:[&_*]:!text-white dark:bg-gray-800 dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
                 dark:[&>div.Mui-focused_fieldset]:!border-white [&_fieldset]:transition-all [&_fieldset]:duration-300`}
                fullWidth
                type="password"
                autoComplete="off"
                required
                id="password"
                name="password"
                label="Password"
                variant="outlined"
              />
            </div>
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-1">
                <input id="remember" name="remember" type="checkbox" />
                <label
                  htmlFor="remember"
                  className="text-xs md:text-base text-gray-800 dark:text-white"
                >
                  Remember me
                </label>
              </div>
              <button className="text-xs md:text-base text-gray-800 hover:text-blue-600 dark:hover:text-yellow-600 dark:text-white transition-all duration-200 ease-in-out">
                Forget password
              </button>
            </div>
            <button
              type="submit"
              className="w-full p-2 text-sm md:text-base bg-blue-600 hover:bg-blue-800 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white
               dark:text-black font-medium border border-gray-500  dark:border-black rounded-lg hover:scale-[1.02] transition-all ease-in-out duration-200"
            >
              Login
            </button>
          </form>
        </div>
        <div className="mb-2">
          <button
            type="submit"
            className="w-full p-1 text-sm md:text-base bg-white text-gray-800 font-medium border-2 border-slate-300 rounded-lg hover:scale-[1.02] transition-all ease-in-out duration-200 flex justify-center items-center gap-2"
          >
            <FcGoogle style={{ fontSize: "30px" }} />
            Sign-In with Google
          </button>
        </div>
        <div className="flex justify-center">
          <p className="text-xs md:text-sm text-gray-800 dark:text-white">
            Dont have an account?{" "}
            <Link
              href={"/Creators/Register"}
              className="text-blue-600 hover:text-blue-800 dark:text-yellow-500 dark:hover:text-yellow-600 transition-all duration-200 ease-in-out"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
