import Navbar from "@/components/navbar";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:h-dvh">
      <Navbar />
      <div className="flex flex-1 flex-col items-center overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
