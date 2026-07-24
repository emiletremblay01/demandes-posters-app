"use client";

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
import type { Employee, Poster } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AddPosterButton } from "./btn-add-poster";

type ComboboxProps = {
  data: (Employee | Poster)[];
  type: "employee" | "poster";
  placeholder?: string;
};

export function Combobox({ data, type, placeholder }: ComboboxProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inputTextValue, setInputTextValue] = useState("");
  const [value, setValue] = useState("");

  const handleSelect = (item: Employee | Poster) => {
    const isSelected = item.name === value;
    const params = new URLSearchParams(searchParams.toString());

    if (isSelected) {
      params.delete(type);
      setValue("");
    } else {
      params.set(type, item.id);
      setValue(item.name);
    }

    const query = params.toString();
    router.replace(query ? `/?${query}` : "/", { scroll: false });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || placeholder || "Choisir..."}
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
              {type === "employee" ? (
                <div>Employé inexistant</div>
              ) : (
                <AddPosterButton text={inputTextValue} />
              )}
            </CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => handleSelect(item)}
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
