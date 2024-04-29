import wrapText from "@/utils/wrapText";
import { FormControl } from "@mui/material";

const TextQuestion = (props) => {
  const { field, qNo, question, disabled, error } = props;

  return (
    <FormControl {...field} className="w-full">
      <div className="w-full flex gap-1 mb-2 text-sm md:text-base text-gray-500 dark:text-white font-medium">
        {`Q${qNo}.`}
        <div className="normal-case">{`${wrapText(question)}`}</div>
      </div>
      <div
        className="flex flex-col justify-center items-center w-full rounded-lg p-2 overflow-hidden ring-1 focus-within:ring-0
       ring-slate-300 dark:ring-white dark:bg-gray-900 dark:focus-within:bg-transparent transition-all duration-300 ease-in-out"
      >
        <textarea
          placeholder="Answer"
          className="h-[38px] max-h-96 focus:h-96 peer w-full p-1 md:p-2 outline-none text-sm md:text-base bg-transparent
           text-gray-800 dark:text-white transition-all duration-300 ease-in-out resize-none bg-scroll"
          disabled={disabled}
        />

        <p className="w-0 peer-focus:w-full bg-blue-500 dark:bg-yellow-500 !text-[0.8px] duration-300 transition-all ease-linear">
          .
        </p>
      </div>
      <div className="text-xs md:text-sm text-red-600 font-semibold mt-2 tracking-wide">
        {error ? "Required field!" : null}
      </div>
    </FormControl>
  );
};

export default TextQuestion;
