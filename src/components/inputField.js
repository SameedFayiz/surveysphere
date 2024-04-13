"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function InputField(props) {
  const [hide, setHide] = useState(false);
  const [error, setError] = useState(false);

  if (props.type === "password") {
    return (
      <>
        <label htmlFor="password" className="text-sm md:text-base">
          Password
        </label>
        <div className="relative">
          <input
            autoComplete="off"
            type={hide ? "password" : "text"}
            id="password"
            name="password"
            className="w-full p-[4px] md:p-2 ps-4 rounded-lg border-2 border-slate-400 outline-0 focus:outline-2 outline-[#0073ff]"
          />
          <button
            type="button"
            onClick={() => {
              setHide(!hide);
            }}
            className="absolute top-1/2 right-1 -translate-y-1/2 z-50 bg-white p-[4px] md:p-2"
          >
            {hide ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <label htmlFor="email" className="text-sm md:text-base">
          Email
        </label>
        <input
          id="email"
          name="email"
          className="p-[4px] md:p-2 rounded-lg border-2 border-slate-400 outline-0 focus:outline-2 outline-[#0073ff]"
        />
      </>
    );
  }
}
