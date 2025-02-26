import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Settings, LockKeyholeOpen, LockKeyhole } from "lucide-react";
import { auth } from "@/actions/auth";
import Link from "next/link";

export default async function Navbar() {
  const isAuth = await auth();
  return (
    <nav className="flex max-h-16 min-h-16 w-full items-center px-2 py-1">
      <div className="flex w-full items-center justify-between">
        <Button asChild variant="ghost">
          <Link href="/" className="text-lg font-bold uppercase">
            Demandes Posters App
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">
          Développé par Émile Tremblay
        </div>
        <div className="flex gap-2 pr-4">
          <Button asChild size="icon" variant="outline">
            <Link href="/settings">
              <Settings />
            </Link>
          </Button>
          <ModeToggle />
          <div className="relative">
            <Button asChild size="icon" variant="outline">
              <Link href="/auth">{isAuth ? <LockKeyholeOpen /> : <LockKeyhole />}</Link>
            </Button>
            {!isAuth && (
              <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-red-500"></div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
