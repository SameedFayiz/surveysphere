import { Card, CardHeader, CardContent, CardActions } from "@mui/material";

const SurveyCard = ({ data, loading, handleClick, deleteAction }) => {
  return (
    <Card
      onClick={() => {
        handleClick(data._id);
      }}
      className="w-full p-3 dark:bg-gray-700 dark:[&_*]:text-white hover:scale-[1.03] transition-all duration-200 ease-in-out"
    >
      <CardHeader
        className="p-0 pb-2 sm:[&>div]:flex sm:[&>div]:justify-between"
        title={
          <p className="text-sm sm:text-base tracking-wide font-semibold">
            <span className="dark:!text-yellow-500">Survey: </span>
            {data?.surveyTitle}
          </p>
        }
        subheader={
          <p className="text-xs sm:text-sm">
            <span className="dark:!text-yellow-500">Created on: </span>
            {new Date(data?.createdAt).toLocaleString()}
          </p>
        }
      />
      <CardContent className="p-0 pb-2">
        <p className="text-sm sm:text-base">
          <span className="dark:!text-yellow-500">No. of Responses</span>
          {": " + (data?.responseCount || 0)}
        </p>
      </CardContent>
      <CardActions className="p-0">
        <button
          disabled={loading}
          onClick={(e) => {
            e.stopPropagation();
            deleteAction(data._id);
          }}
          className="text-xs sm:text-sm p-2 rounded-md bg-red-600 text-white hover:bg-red-700 hover:scale-105 transition-all duration-200 ease-in-out disabled:bg-red-400 disabled:hover:scale-100 disabled:pointer-events-none"
        >
          Delete
        </button>
      </CardActions>
    </Card>
  );
};

export default SurveyCard;
