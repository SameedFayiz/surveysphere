export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-20 px-4 bg-white dark:bg-gray-900">
      <div
        className="flex flex-col gap-6 justify-center items-center text-gray-800 text-pretty bg-gray-100 dark:bg-slate-800 rounded-3xl shadow-xl
       shadow-gray-700 px-2 md:px-10 w-full md:w-[40%] h-60"
      >
        <span className="text-lg md:text-3xl font-semibold text-gray-800 dark:text-white">
          Survey Closed
        </span>
        <div className="text-sm sm:text-base text-center text-gray-800 dark:text-white">
          This survey is no longer taking responses
        </div>
      </div>
    </main>
  );
}
