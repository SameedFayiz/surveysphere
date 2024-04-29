import wrapText from "@/utils/wrapText";
import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const ScaleQuestion = (props) => {
  const { field, qNo, question, range, disabled } = props;

  function valuemark(value) {
    let tmp1 = [];
    for (let i = 1; i <= value; i++) {
      let tmp2 = { value: i, label: i };
      tmp1.push(tmp2);
    }
    return tmp1;
  }

  return (
    <div className="w-full">
      <div className="w-full flex gap-1 mb-2 text-sm md:text-base text-gray-500 dark:text-white font-medium">
        {`Q${qNo}.`}
        <div className="normal-case">{`${wrapText(question)}`}</div>
      </div>
      <FormControl className="w-full px-4 md:ps-10">
        <Box className="max-w-[500px]">
          <Slider
            className={
              disabled
                ? "dark:[&_span]:!text-gray-400"
                : "dark:[&_span]:!text-yellow-500"
            }
            disabled={disabled}
            step={1}
            min={1}
            max={range[1]}
            {...field}
            valueLabelDisplay="auto"
            marks={valuemark(range[1])}
          />
        </Box>
      </FormControl>
      <div className="text-xs md:text-sm text-red-600 font-semibold mt-2 tracking-wide">
        {props.error ? "Required field!" : null}
      </div>
    </div>
  );
};

export default ScaleQuestion;
