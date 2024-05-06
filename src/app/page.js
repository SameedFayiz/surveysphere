import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <Image
        className="absolute transition-all duration-500 ease-in-out"
        src={"/profilePageDark.svg"}
        alt="Image"
        fill
        priority
        quality={100}
      />
    </main>
  );
}
