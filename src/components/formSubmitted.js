const FormSubmitted = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-20">
      <div className="flex flex-col gap-6 justify-center items-center text-pretty text-3xl bg-white rounded-3xl shadow-2xl shadow-white px-10 w-[40%] h-60">
        Response was submitted
        <div className="text-base text-center">
          You have responded to this survey. Only one response per person is
          allowed.
        </div>
      </div>
    </main>
  );
};

export default FormSubmitted;
