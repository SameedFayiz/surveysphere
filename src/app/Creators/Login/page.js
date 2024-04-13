import LoginForm from "@/components/loginForm";
import Image from "next/image";

export default function Login() {
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-[#565656]">
      <div className="h-[90%] lg:h-[75%] min-w-[312px] md:min-w-[512px] lg:min-w-[912px] flex justify-center items-center bg-white">
        <section id="loginForm" className="h-full lg:w-1/2">
          <LoginForm />
        </section>
        <section
          id="imageArea"
          className="hidden lg:flex h-full lg:w-1/2 relative overflow-hidden"
        >
          <Image
            // className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            src={"/LoginPage.jpg"}
            alt="Login Image"
            fill={true}
          />
        </section>
      </div>
    </main>
  );
}
