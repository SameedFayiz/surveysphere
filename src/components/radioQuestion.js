import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import wrapText from "@/utils/wrapText";

const RadioQuestion = (props) => {
  const { field, qNo, question, options, disabled } = props;

  return (
    <div className="w-full">
      <div className="w-full flex gap-1 mb-2 text-sm md:text-base text-gray-500 dark:text-white font-medium">
        {`Q${qNo}.`}
        <div className="normal-case">{`${wrapText(question)}`}</div>
      </div>
      <div className="flex flex-col justify-center w-full ps-4 sm:ps-8 md:ps-10">
        <FormControl {...field}>
          <FormLabel className="text-sm dark:!text-yellow-500">
            Pick one option
          </FormLabel>
          <RadioGroup>
            {Object.entries(options).map((i) => {
              return (
                <FormControlLabel
                  disabled={disabled}
                  key={i[0]}
                  value={i[1]}
                  control={
                    <Radio
                      className={
                        disabled
                          ? "dark:!text-gray-400 "
                          : "dark:!text-yellow-500"
                      }
                    />
                  }
                  label={
                    <p
                      className={
                        disabled ? "dark:!text-gray-400 " : "dark:!text-white"
                      }
                    >
                      {wrapText(i[1])}
                    </p>
                  }
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
      <div className="text-sm text-red-600 font-semibold mt-2 tracking-wide">
        {props.error ? "Required field!" : null}
      </div>
    </div>
  );
};

export default RadioQuestion;
