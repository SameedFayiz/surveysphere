import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import Footer from "@/components/footer";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <nav className="w-full md:h-40 flex items-end py-4 bg-gray-600 transition-all duration-200 ease-in-out">
        <div className="container mx-auto px-10">
          <div className="flex justify-between items-end">
            <div className="flex-shrink-0">
              <a href="/" className="text-4xl font-bold text-yellow-400">
                SurveySphere
              </a>
            </div>
            <div className="hidden md:flex items-center">
              <Link
                href="/Creators/Dashboard"
                className={`text-white hover:text-yellow-400 mx-4 transition-all
                 duration-300 ease-in-out group`}
              >
                My Surveys
                <p
                  className={`mx-auto w-0 !bg-yellow-400 group-hover:w-full text-[0.9px]
                 duration-300 transition-all ease-linear`}
                >
                  .
                </p>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Footer />
    </main>
  );
}
