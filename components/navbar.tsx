import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Settings } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
export default function Navbar() {
  return (
    <nav className="flex h-20 w-full items-center border-b p-2">
      <div className="flex w-full items-center justify-between">
        <Button asChild variant="ghost">
          <Link href="/" className="text-lg font-bold uppercase">
            Demandes Posters App
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button asChild size="icon" variant="outline">
            <Link href="/settings">
              <Settings />
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
