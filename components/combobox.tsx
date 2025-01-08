"use client";

import type { Employee, Poster } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { AddPosterButton } from "./btn-add-poster";

export function Combobox({
  data,
  placeholder,
}: {
  data: (Employee | Poster)[];
  placeholder?: string;
}) {
  const searchParams = useSearchParams();

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inputTextValue, setInputTextValue] = useState("");
  const [value, setValue] = useState("");
  const [idValue, setIdValue] = useState("");

  useEffect(() => {
    const employee = searchParams.get("employee");
    const poster = searchParams.get("poster");
    if ("role" in data[0]) {
      router.replace(`/?employee=${idValue}&poster=${poster}`, {
        scroll: false,
      });
      return;
    }
    router.replace(`/?employee=${employee}&poster=${idValue}`, {
      scroll: false,
    });
  }, [idValue]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? data.find((item) => item.name === value)?.name
            : placeholder || "Choisir..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={placeholder || "Choisir..."}
            onValueChange={setInputTextValue}
          />
          <CommandList>
            <CommandEmpty>
              {/* <div>Aucun poster trouvé.</div> */}
              <AddPosterButton text={inputTextValue} />
            </CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.name}
                  value={item.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setIdValue(item.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
