import { useEffect, useRef, useState } from "react";
import { Fab, FormControl, MenuItem, Select, TextField } from "@mui/material";
import { Button } from "@mui/base";
import { CancelOutlined } from "@mui/icons-material";
import { Controller } from "react-hook-form";

// Scale range component
const ScaleRangeComponent = (props) => {
  const data = props.data;

  // Change event handler for range
  const handleChange = (e) => {
    let ele = e.target.id;
    let value = parseInt(e.target.value);

    // Lower range is fixed to 1
    if (ele === "range2") {
      // Upper range validator
      if (value >= 5 && value <= 10) {
        props.func([data[0], value]);
      } else if (!value) {
        props.func([data[0], data[0] + 9]);
      }
    }
  };

  return (
    <FormControl onChange={handleChange} className="w-full">
      <div className="w-full text-base md:text-xl font-semibold mb-3">
        Scale&apos;s range
      </div>
      <div className="flex gap-4">
        <TextField
          disabled
          // inputProps={{
          //   sx: { WebkitTextFillColor: "white !important" },
          // }}
          className="dark:[&_*]:!text-white dark:[&_input]:![-webkit-text-fill-color:white] dark:[&_fieldset]:!border-gray-500
           dark:[&_fieldset]:hover:!border-black dark:[&>div.Mui-focused_fieldset]:!border-white w-56
            [&_fieldset]:transition-all [&_fieldset]:duration-300"
          type="number"
          required
          id="range1"
          size="small"
          value={data[0]}
          label={"Start"}
          variant="outlined"
          helperText={"Set to 1"}
        />
        <TextField
          className={`w-56 dark:[&_*]:!text-white dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black
           dark:[&>div.Mui-focused_fieldset]:!border-white [&_fieldset]:transition-all [&_fieldset]:duration-300`}
          type="number"
          required
          id="range2"
          size="small"
          value={data[1]}
          label={"End"}
          variant="outlined"
          helperText={"min = 5 & max = 10"}
        />
      </div>
    </FormControl>
  );
};

// Radio input's option component
const RadioOptionComponent = (props) => {
  // Length of option's text
  const optionCharLimit = 200;
  const optionsLimit = 10;
  const data = props.data;

  // optionNo stores an array of 2-5 elements for rendering options
  const [optionNo, setOptionNo] = useState([1, 2]);

  // Functionality for adding or removing an option
  const handleClick = (e) => {
    if (e.target.id === "addOption") {
      if (optionNo.length < optionsLimit) {
        let tmp = data;
        tmp["option" + (optionNo.length + 1)] = "";
        props.func({ ...tmp });
        setOptionNo([...optionNo, optionNo[optionNo.length - 1] + 1]);
      }
    } else {
      let tmp1 = optionNo;
      let tmp2 = data;
      let ele = tmp1.pop();
      delete tmp2["option" + ele];
      props.func({ ...tmp2 });
      setOptionNo([...tmp1]);
    }
  };

  // Change event handler for options
  const handleChange = (e) => {
    let ele = e.target.id;
    let value = e.target.value;
    if (value.length <= optionCharLimit) {
      props.func({ ...data, [ele]: value });
    } else {
      props.func({ ...data, [ele]: value.slice(0, optionCharLimit) });
    }
  };

  return (
    <FormControl onChange={handleChange} className="flex flex-col w-full gap-2">
      <div className="w-full text-base md:text-xl font-semibold">
        Radio Options
      </div>
      {
        // Rendering the options
        optionNo.map((i) => {
          return (
            <Controller
              name={`${props.qId}-option${i}`}
              key={i}
              control={props.control}
              rules={{ required: true }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  className={`${
                    error
                      ? "dark:[&_input]:!text-white"
                      : "dark:[&_*]:!text-white dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black dark:[&>div.Mui-focused_fieldset]:!border-white"
                  } [&_fieldset]:transition-all [&_fieldset]:duration-300`}
                  {...field}
                  required
                  id={"option" + i}
                  size="small"
                  value={data["option" + i]}
                  label={"Option " + i}
                  variant="outlined"
                  helperText={`${data["option" + i].length}/${optionCharLimit}`}
                  error={error != undefined}
                />
              )}
            />
          );
        })
      }
      <div className="flex gap-3">
        <Button
          id="addOption"
          size="small"
          disabled={optionNo.length >= optionsLimit ? true : false}
          onClick={handleClick}
          className="text-xs md:text-sm tracking-wide p-2 bg-blue-500 text-white hover:bg-blue-700 hover:scale-105 transition-all duration-200 
          ease-in-out rounded-lg disabled:bg-slate-400 disabled:text-white disabled:scale-100"
        >
          Add option
        </Button>
        <Button
          id="removeOption"
          size="small"
          disabled={optionNo.length <= 2 ? true : false}
          onClick={handleClick}
          className="text-xs md:text-sm tracking-wide p-2 bg-red-500 text-white hover:bg-red-700 hover:scale-105 transition-all duration-200 
          ease-in-out rounded-lg disabled:bg-slate-400 disabled:text-white disabled:scale-100"
        >
          Remove
        </Button>
      </div>
    </FormControl>
  );
};

// Question component
const AddQuestionComponent = (props) => {
  const data = props.data;
  // Length for question's length
  const characterLimit = 300;
  // React Hooks
  const componentRef = useRef();
  // Hook for managing the type of a question
  const [selection, setSelection] = useState("text");
  // Hook for managing the question's text
  const [question, setQuestion] = useState("");
  // Hook for managing radio options
  const [radioOptions, setRadioOptions] = useState({
    option1: "",
    option2: "",
  });
  // Hook for managing scale range
  const [scaleRange, setScaleRange] = useState([1, 10]);
  // Hook for managing CSS/tailwind classes for delete animation
  const [deleteClass, setDeleteClass] = useState("");

  // Hook for rerendering the components on inputs change
  useEffect(() => {
    let tmp = data;
    let index = tmp.findIndex((i) => {
      return i.qId === props.id;
    });
    let extra =
      selection === "radio"
        ? { options: radioOptions }
        : selection === "scale"
        ? { range: scaleRange }
        : null;
    if (index != -1) {
      tmp[index] = {
        qId: props.id,
        // qNo: props.qNo,
        question,
        type: selection,
        ...extra,
      };
    } else {
      tmp.push({
        qId: props.id,
        // qNo: props.qNo,
        question,
        type: selection,
        ...extra,
      });
    }
    props.func([...tmp]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question, radioOptions, scaleRange, selection]);

  // Change event handler for question text
  const handleChange1 = (e) => {
    let value = e.target.value;
    if (value.length <= characterLimit) {
      setQuestion(value);
    } else {
      setQuestion(value.slice(0, characterLimit));
    }
  };

  // Change event handler for question type
  const handleChange2 = (e) => {
    setSelection(e.target.value);
  };

  return (
    <div
      id={props.id}
      ref={componentRef}
      className={`flex flex-col md:flex-row gap-4 border-2 dark:border-yellow-500 p-5 rounded-xl ${deleteClass} relative transition-all duration-700 ease-in-out`}
    >
      <div className="flex flex-col container md:w-10/12 gap-4">
        <FormControl onChange={handleChange1}>
          <Controller
            name={`qId${props.id}`}
            control={props.control}
            rules={{ required: true, minLength: 10 }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                className={`${
                  error
                    ? "dark:[&_textarea]:!text-white"
                    : "dark:[&_*]:!text-white dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black dark:[&>div.Mui-focused_fieldset]:!border-white"
                } [&_fieldset]:transition-all [&_fieldset]:duration-300`}
                {...field}
                required
                multiline
                maxRows={5}
                size="small"
                value={question}
                label="Question"
                variant="outlined"
                helperText={`${
                  question.length
                }/${characterLimit} (minimum length is ${10})`}
                error={error != undefined}
              />
            )}
          />
        </FormControl>
        {
          // Rendering radio options, variable options or nothing based on question type
          selection === "scale" ? (
            <ScaleRangeComponent
              func={setScaleRange}
              data={scaleRange}
              control={props.control}
            />
          ) : selection === "radio" ? (
            <RadioOptionComponent
              qId={props.id}
              func={setRadioOptions}
              data={radioOptions}
              control={props.control}
            />
          ) : null
        }
      </div>
      <div className="md:w-3/12 lg:w-2/12 transition-all duration-700 ease-in-out">
        <Select
          className="w-full dark:text-white md:rounded-lg dark:[&>fieldset]:!border-white dark:[&>fieldset]:hover:!border-black dark:[&_svg]:text-white [&>fieldset]:transition-all [&>fieldset]:duration-300 text-xs md:text-base"
          size="small"
          value={selection}
          onChange={handleChange2}
        >
          <MenuItem value="text">Text Input</MenuItem>
          <MenuItem value="scale">Scale Input</MenuItem>
          <MenuItem value="radio">Radio Input</MenuItem>
        </Select>
      </div>
      <div className="absolute -top-3 -right-3 z-0">
        <Fab
          color="error"
          size="small"
          className="rounded-full bg-red-600 text-white text-center hover:bg-red-700 hover:scale-105 transition-colors duration-200 ease-in-out"
          onClick={() => {
            setDeleteClass("transition-all duration-500 ease-in scale-0");
            setTimeout(() => {
              setDeleteClass("");
              props.onDelete(componentRef.current);
            }, 500);
          }}
        >
          <CancelOutlined className="text-xl md:text-[24px]" />
        </Fab>
      </div>
    </div>
  );
};

export default AddQuestionComponent;
