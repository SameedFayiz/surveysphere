export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-20">
      <div className="flex flex-col gap-6 justify-center items-center text-gray-800 text-pretty text-3xl bg-white rounded-3xl shadow-2xl shadow-white px-10 w-[40%] h-60">
        Survey Closed
        <div className="text-base text-center">
          This survey is no longer taking responses
        </div>
      </div>
    </main>
  );
}
