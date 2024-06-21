import { auth } from "@/actions/auth";

import { redirect } from "next/navigation";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await auth();
  console.log(isAuth);
  {/* 
    if (!isAuth) {
      redirect("/login");
    }
*/}
  return (
    <div className="flex flex-col lg:h-dvh">
      <Navbar />
      <div className="flex flex-1 flex-col items-center overflow-y-auto">
        {children}
      </div>
      <Footer />
    </div>
  );
}
