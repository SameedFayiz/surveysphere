import { useContext, useState } from "react";
import { SearchOutlined } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DataContext } from "@/components/Providers/dataContext";

const SearchInput = (props) => {
  const { val, func } = props;

  return (
    <div className="flex w-full md:w-52 md:focus-within:w-[70%] gap-x-2 p-[6px] md:p-2 dark:text-white border focus-within:border border-neutral-400 dark:border-white focus-within:border-blue-500 dark:focus-within:border-white hover:border-black hover:focus-within:border-blue-500 dark:hover:focus-within:border-white rounded-xl transition-all duration-300 ease-in-out">
      <SearchOutlined className="text-gray-600 dark:text-white" />
      <input
        className="outline-none w-full dark:placeholder-white bg-inherit text-sm md:text-base text-gray-800 dark:text-white"
        placeholder="Search for 'Surveys'"
        value={val}
        onChange={(e) => {
          func(e.target.value);
        }}
      />
    </div>
  );
};

const SortButton = () => {
  const [sort, setSort] = useState("");
  const [data, setData] = useContext(DataContext);

  const handleChange = (event) => {
    let value = event.target.value;
    setSort(value);
    if (data) {
      let tmp;
      if (value === "new") {
        tmp = data.sort((a, b) => {
          let date1 = new Date(a.createdAt);
          let date2 = new Date(b.createdAt);
          return date2 - date1;
        });
      } else if (value === "old") {
        tmp = data.sort((a, b) => {
          let date1 = new Date(a.createdAt);
          let date2 = new Date(b.createdAt);
          return date1 - date2;
        });
      }
      setData([...tmp]);
    }
  };

  return (
    <FormControl
      size="small"
      className="w-56 [&_div]:h-[34px] [&_div]:md:h-auto"
    >
      <InputLabel
        className="dark:!text-white text-sm md:text-base"
        id="simple-select-label"
      >
        Sort by
      </InputLabel>
      <Select
        className="text- dark:text-white rounded-xl dark:[&>fieldset]:!border-white dark:[&>fieldset]:hover:!border-black dark:[&_svg]:text-white [&>fieldset]:transition-all [&>fieldset]:duration-300"
        labelId="simple-select-label"
        value={sort}
        label="Sort by"
        onChange={handleChange}
      >
        <MenuItem className="text-sm" value={"new"}>
          Newest first
        </MenuItem>
        <MenuItem className="text-sm" value={"old"}>
          Oldest first
        </MenuItem>
      </Select>
    </FormControl>
  );
};

const ToolBar = (props) => {
  const { val, func } = props;

  return (
    <section className="flex flex-row w-full gap-2 items-center">
      <SortButton />
      <SearchInput func={func} val={val} />
    </section>
  );
};

export default ToolBar;
