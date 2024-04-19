import { useState } from "react";
import { useRouter } from "next/navigation";
import wrapText from "@/utils/wrapText";
import ToolBar from "@/components/toolBar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  useMediaQuery,
} from "@mui/material";
import { RefreshOutlined } from "@mui/icons-material";
import SurveyCard from "./surveyCard";
import Link from "next/link";

const DataDisplay = ({ data, setData, getData, dataLoading, setAlert }) => {
  const mediumWidth = useMediaQuery("(min-width:768px)");
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [spin, setSpin] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const DataRow = ({ row }) => {
    return (
      <TableRow
        className="group hover:scale-[0.98] transition-all duration-200 ease-in-out"
        onClick={() => {
          handleClick(row._id);
        }}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell
          className="pl-10 max-w-80 group-hover:text-blue-500"
          component="th"
          scope="row"
        >
          {wrapText(row.surveyTitle)}
        </TableCell>
        <TableCell className="group-hover:text-blue-500" align="center">
          0
        </TableCell>
        <TableCell className="group-hover:text-blue-500" align="center">
          {new Date(row.createdAt).toLocaleString()}
        </TableCell>
        <TableCell className="pr-10" align="right">
          <button
            disabled={deleteLoading}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(row._id);
            }}
            className="p-2 rounded-md bg-red-600 text-white hover:bg-red-700 hover:scale-105 transition-all duration-200
             ease-in-out disabled:bg-red-400 disabled:hover:scale-100 disabled:pointer-events-none"
          >
            Delete
          </button>
        </TableCell>
      </TableRow>
    );
  };

  const handleClick = (id) => {
    router.push("/Creators/Dashboard/Surveys/" + id);
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    try {
      let ack = await fetch(`/api/survey/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      ack = await ack.json();
      if (ack.error) {
        throw ack;
      }
      setAlert({
        display: true,
        error: false,
        message: "Survey successfully deleted",
      });
      getData();
    } catch (error) {
      setAlert({
        display: true,
        error: true,
        message: "Error deleting survey",
      });
    }
    setTimeout(() => {
      setAlert({
        display: false,
        error: false,
        message: "",
      });
    }, 5000);
    setDeleteLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={Boolean(open)}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please confirm if you want to delete this survey?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="bg-slate-400 text-white p-2 rounded-md"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white p-2 rounded-md"
            onClick={() => {
              handleDelete(open);
              handleClose();
            }}
          >
            Delete
          </button>
        </DialogActions>
      </Dialog>
      <div className="w-full flex flex-col sm:flex-row gap-2 px-4 md:px-10 dark:bg-gray-900 py-4">
        <ToolBar func={setSearchVal} val={searchVal} />
        <div className="flex justify-end items-center gap-6">
          <RefreshOutlined
            className={`hidden md:block text-blue-600 dark:text-white hover:cursor-pointer transition-all duration-700 ${spin}`}
            onClick={async (e) => {
              setSpin("animate-spin");
              getData();
              setTimeout(() => {
                setSpin("");
              }, 2000);
            }}
          />
          <Link
            className="flex justify-center items-center w-full sm:w-40 p-2 text-sm md:text-base bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition-all duration-200
                   ease-in-out rounded-lg uppercase"
            href={"/Creators/Dashboard/CreateSurvey"}
          >
            Create survey
          </Link>
        </div>
      </div>
      {mediumWidth ? (
        <TableContainer
          component={Paper}
          className="w-full h-full rounded-none dark:bg-gray-900 dark:p-2 dark:pt-0"
        >
          <Table className="dark:[&_*]:text-white dark:bg-gray-800 dark:border-b-2 dark:border-gray-900 rounded-lg">
            <TableHead>
              <TableRow className="dark:[&_*]:text-yellow-500">
                <TableCell className="text-lg font-semibold pl-10 ">
                  Surveys
                </TableCell>
                <TableCell className="text-lg font-semibold" align="center">
                  No. of Responses
                </TableCell>
                <TableCell className="text-lg font-semibold" align="center">
                  Created on
                </TableCell>
                <TableCell
                  className="!text-red-500 font-semibold pr-10 w-40"
                  align="right"
                >
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataLoading ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <div className="flex justify-center items-center my-[10%]">
                      <CircularProgress
                        className="dark:[&_*]:!text-yellow-500"
                        size={40}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ) : data?.length > 0 ? (
                (searchVal
                  ? data?.filter((i) => {
                      return i.surveyTitle
                        .toLowerCase()
                        .includes(searchVal.toLowerCase());
                    })
                  : data
                )?.map((data) => <DataRow key={data._id} row={data} />)
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    <div className="flex justify-center items-center my-[10%] text-lg !text-gray-400">
                      No survey found! Create a survey to view here
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="h-full flex flex-col gap-4 justify-center items-center px-4 md:px-10 dark:bg-gray-900">
          {dataLoading ? (
            <CircularProgress
              className="dark:[&_*]:!text-yellow-500"
              size={40}
            />
          ) : data?.length > 0 ? (
            (searchVal
              ? data?.filter((i) => {
                  return i.surveyTitle
                    .toLowerCase()
                    .includes(searchVal.toLowerCase());
                })
              : data
            )?.map((data) => (
              <SurveyCard
                key={data._id}
                data={data}
                handleClick={handleClick}
                loading={deleteLoading}
                deleteAction={setOpen}
              />
            ))
          ) : (
            <div className="text-sm md:text-lg !text-gray-400">
              No survey found! Create a survey to view here
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DataDisplay;
