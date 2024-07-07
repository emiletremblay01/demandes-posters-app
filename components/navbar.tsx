import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";
export default function Navbar() {
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
        </div>
      </div>
    </nav>
  );
}
