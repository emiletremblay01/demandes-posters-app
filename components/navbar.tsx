import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Settings } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
export default function Navbar() {
  return (
    <nav className="h-20 flex items-center p-2 w-full border-b">
      <div className="flex gap-2">
        <Button asChild size="icon">
          <Link href="/">
            <Home />
          </Link>
        </Button>
        <Button asChild size="icon">
          <Link href="/settings">
            <Settings />
          </Link>
        </Button>
        <ModeToggle />
      </div>
    </nav>
  );
}
