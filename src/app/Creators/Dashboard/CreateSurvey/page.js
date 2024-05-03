"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@mui/base";
import {
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";
import AddQuestionComponent from "@/components/addQuestion";
import AlertBox from "@/components/alertBox";
import { useSession } from "next-auth/react";

export default function Page() {
  const mediumWidth = useMediaQuery("(min-width:768px)");

  const { data } = useSession();

  // React-Hook-form
  const { control, handleSubmit } = useForm({
    reValidateMode: "onChange",
  });
  // Length for a survey's name
  const nameCharLimit = 120;
  // Length for survey's description
  const descCharLimit = 800;
  // Maximum no. of questions per survey
  const questionLimit = 50;

  // React Hooks
  const router = useRouter();
  // qLimit stores an array of uuid strings for generating questions
  const [qLimit, setQLimit] = useState([]);
  // formData stores an object of survey's data
  const [formData, setFormData] = useState({
    surveyTitle: "",
    description: "",
    category: "",
  });
  // qData stores an array of object of questions data
  const [qData, setQData] = useState([]);
  // Switch for displaying an error while submitting form without adding questions
  const [noValid, setNoValid] = useState(false);
  // State for displaying an alert
  const [alert, setAlert] = useState({
    display: false,
    error: false,
    message: "",
  });

  // Loading state
  const [loading, setLoading] = useState(false);
  // Scroll to top of the page
  const [scrollToTop, setScrollToTop] = useState(false);
  // Auth

  useEffect(() => {
    if (scrollToTop) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setScrollToTop(false);
    }
  }, [scrollToTop]);

  // Change event handler for survey name and desciption input fields
  const handleChange = (e) => {
    let { id, value, name } = e.target;
    if (name === "category") {
      id = "category";
    }
    if (id === "surveyTitle") {
      if (value.length > nameCharLimit) {
        value = value.slice(0, nameCharLimit);
      }
    } else if (id === "description") {
      if (value.length > descCharLimit) {
        value = value.slice(0, descCharLimit);
      }
    }
    let tmp = { ...formData, [id]: value };
    setFormData(tmp);
  };

  // Functionality for deleting a single question
  const handleDelete = (ele) => {
    let tmp1 = qLimit;
    let tmp2 = qData;
    let index = tmp2.findIndex((i) => {
      return i.qId === ele.id;
    });
    tmp1.splice(qLimit.indexOf(ele.id), 1);
    tmp2.splice(index, 1);
    setQLimit([...tmp1]);
    setQData([...tmp2]);
  };

  // Functionality for adding a single question
  const handleClick = () => {
    setNoValid(false);
    if (qLimit.length < questionLimit) {
      let uid = uuidv4();
      let tmp = qLimit;
      tmp.push(uid);
      setQLimit([...tmp]);
    }
  };

  // Functionality for submitting the form
  const handleFormSubmit = async () => {
    if (qData.length) {
      // after validation
      setLoading(true);
      let tmp = [...qData];
      tmp.forEach((ele, i) => {
        ele.qNo = i + 1;
      });
      let sendData = {
        ...formData,
        questions: tmp,
        user: data?.user?.id,
      };
      console.log(sendData);
      try {
        let sendReq = await fetch("/api/survey", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendData),
        });
        sendReq = await sendReq.json();
        if (sendReq.error) {
          throw sendReq;
        }
        setAlert({
          display: true,
          error: false,
          message: "Survey successfully created. Redirecting to Homepage",
        });
        setTimeout(() => {
          router.push("/Creators/Dashboard");
        }, 5000);
      } catch (error) {
        setAlert({
          display: true,
          error: true,
          message:
            error.message === "Failed to fetch"
              ? "Connection error"
              : "Error creating survey",
        });
      } finally {
        setScrollToTop(true);
        setLoading(false);
        setTimeout(() => {
          setAlert({
            display: false,
            error: false,
            message: "",
          });
        }, 5000);
      }
    } else {
      setNoValid(true);
    }
  };

  return (
    <form
      className="w-full flex flex-col items-center justify-start relative bg-white dark:bg-gray-800 dark:text-white dark:border-b-8 dark:border-b-gray-900"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {alert.display ? (
        <AlertBox error={alert.error}>{alert.message}</AlertBox>
      ) : null}
      <section className="flex w-full py-5 md:py-10 bg-gray-700 items-center px-4 md:px-10">
        <p className="text-base md:text-3xl text-white font-bold tracking-wide uppercase">
          Create survey
        </p>
      </section>
      <section className="w-full dark:border-t-8 dark:border-t-gray-900 px-4 md:px-10">
        <div className="flex justify-between pt-10 items-baseline">
          <div className="text-lg md:text-3xl font-semibold text-gray-800 dark:text-yellow-500">
            Survey details
          </div>
          <div className="flex items-end tracking-tighter md:tracking-normal text-[11px] md:text-sm text-red-500">
            Required fields are marked with *
          </div>
        </div>
        <FormControl onChange={handleChange} className="w-full">
          <div className="flex flex-col pt-2 pb-4 gap-4">
            <Controller
              name="surveyTitle"
              control={control}
              rules={{ required: true, minLength: 20 }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  size={`${mediumWidth ? "" : "small"}`}
                  className={`${
                    error
                      ? "dark:[&_input]:!text-white"
                      : "dark:[&_*]:!text-white dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black dark:[&>div.Mui-focused_fieldset]:!border-white"
                  } [&_fieldset]:transition-all [&_fieldset]:duration-300`}
                  {...field}
                  fullWidth
                  required
                  autoComplete="off"
                  value={formData.surveyTitle}
                  id="surveyTitle"
                  label="Survey title"
                  variant="outlined"
                  helperText={`${formData?.surveyTitle?.length}/${nameCharLimit} (minimum length is 20)`}
                  error={error != undefined}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{ required: true, minLength: 50 }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  size={`${mediumWidth ? "" : "small"}`}
                  className={`${
                    error
                      ? "dark:[&_textarea]:!text-white"
                      : "dark:[&_*]:!text-white dark:[&_fieldset]:!border-gray-500 dark:[&_fieldset]:hover:!border-black dark:[&>div.Mui-focused_fieldset]:!border-white"
                  } [&_fieldset]:transition-all [&_fieldset]:duration-300`}
                  {...field}
                  fullWidth
                  required
                  value={formData.description}
                  id="description"
                  multiline
                  label="Description"
                  variant="outlined"
                  minRows={3}
                  maxRows={9}
                  helperText={`${formData?.description?.length}/${descCharLimit} (minimum length is 50)`}
                  error={error != undefined}
                />
              )}
            />
            <FormControl
              required
              className="sm:w-[300px]"
              size={`${mediumWidth ? "" : "small"}`}
            >
              <InputLabel className="dark:!text-white" id="category-label">
                Category
              </InputLabel>
              <Select
                className="dark:text-white dark:[&>fieldset]:!border-white dark:[&>fieldset]:hover:!border-black
                     dark:[&_svg]:text-white [&>fieldset]:transition-all [&>fieldset]:duration-300"
                labelId="category-label"
                id="category"
                name="category"
                value={formData.category}
                label="Category"
                onChange={handleChange}
              >
                <MenuItem value={"Education"}>Education</MenuItem>
                <MenuItem value={"Lifestyle and Habits"}>
                  Lifestyle and Habits
                </MenuItem>
                <MenuItem value={"Health and Wellness"}>
                  Health and Wellness
                </MenuItem>
                <MenuItem value={"Consumer Preferences"}>
                  Consumer Preferences
                </MenuItem>
                <MenuItem value={"Technology Usage"}>Technology Usage</MenuItem>
                <MenuItem value={"Work and Career"}>Work and Career</MenuItem>
                <MenuItem value={"Environmental Practices"}>
                  Environmental Practices
                </MenuItem>
                <MenuItem value={"Social Engagement"}>
                  Social Engagement
                </MenuItem>
                <MenuItem value={"Entertainment Preferences"}>
                  Entertainment Preferences
                </MenuItem>
                <MenuItem value={"Financial Habits"}>Financial Habits</MenuItem>
                <MenuItem value={"Travel and Leisure"}>
                  Travel and Leisure
                </MenuItem>
                <MenuItem value={"Relationships and Family"}>
                  Relationships and Family
                </MenuItem>
                <MenuItem value={"Community Involvement"}>
                  Community Involvement
                </MenuItem>
                <MenuItem value={"General Demographics"}>
                  General Demographics
                </MenuItem>
                <MenuItem value={"Political Views"}>Political Views</MenuItem>
                <MenuItem value={"Cultural Interests"}>
                  Cultural Interests
                </MenuItem>
                <MenuItem value={"Personal Development"}>
                  Personal Development
                </MenuItem>
                <MenuItem value={"Media Consumption"}>
                  Media Consumption
                </MenuItem>
                <MenuItem value={"Food and Beverage Preferences"}>
                  Food and Beverage Preferences
                </MenuItem>
                <MenuItem value={"Sports and Recreation"}>
                  Sports and Recreation
                </MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </div>
        </FormControl>
      </section>
      <section className="w-full flex flex-col px-4 md:px-10 pb-8 gap-2 md:gap-4">
        <div className="text-lg md:text-3xl font-semibold text-gray-800 dark:text-yellow-500">
          Questions
        </div>
        {qLimit.length ? null : (
          <>
            <div className="text-xs md:text-base text-gray-400 dark:text-slate-400">
              No questions added yet.
            </div>
            {
              // Error message display
              noValid ? (
                <Alert severity="error" className="text-sm md:text-base">
                  Please add questions to create the survey.
                </Alert>
              ) : null
            }
          </>
        )}
        {
          // Rendering the added questions
          qLimit.map((ele, i) => {
            return (
              <AddQuestionComponent
                key={ele}
                id={ele}
                // qNo={i + 1}
                onDelete={handleDelete}
                data={qData}
                func={setQData}
                control={control}
              />
            );
          })
        }
        <Button
          disabled={qLimit.length < questionLimit ? false : true}
          onClick={handleClick}
          className="w-28 md:w-36 text-xs md:text-base p-2 bg-blue-500 text-white hover:bg-blue-700 hover:scale-105 rounded-lg disabled:bg-slate-400
           disabled:scale-100 transition-all duration-200 ease-in-out"
        >
          Add a question
        </Button>
      </section>
      <section className="w-full flex justify-end px-4 md:px-10 pb-10 gap-4">
        <Button
          disabled={loading}
          onClick={() => {
            // Navigate to "/admin" path on click
            router.push("/Creators/Dashboard");
          }}
          className="w-16 md:w-20 text-xs md:text-base text-white bg-red-600 hover:bg-red-700 hover:scale-105 rounded-lg
           disabled:bg-red-400 disabled:hover:scale-100 transition-all duration-200 ease-in-out"
        >
          Cancel
        </Button>
        <Button
          disabled={loading || alert.display}
          type="submit"
          className="flex items-center justify-center gap-x-2 w-16 md:w-20 disabled:w-24 text-xs md:text-base md:disabled:w-32 p-2 text-white bg-green-600 
          hover:bg-green-700 hover:scale-105 rounded-lg disabled:bg-[#88aa7a] disabled:hover:scale-100 
          transition-all duration-200 ease-in-out"
        >
          Create
          {loading ? (
            <CircularProgress className="text-white" size={20} />
          ) : null}
        </Button>
      </section>
    </form>
  );
}
