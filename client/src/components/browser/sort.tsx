import {
  ArrowUpCircle,
  LucideIcon,
  HeartIcon,
  CalendarIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
//   CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { MdSort } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changeAscending, setSortValue } from "@/reducers/browserReducer";
import { BrowserState } from "@/types";
type Sorts = {
  value: BrowserState["sort"]["value"];
  label: string;
  icon: LucideIcon;
};

const sorts: Sorts[] = [
  {
    value: "likes",
    label: "Likes",
    icon: HeartIcon,
  },
    {
      value: "date",
      label: "Date",
      icon: CalendarIcon,
    },
];

export function SortPopover() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const {value, ascending} = useSelector(
    (state: { browser: BrowserState }) => state.browser.sort
  );
  const [selectedSort, setSelectedSort] = useState<Sorts | null>(value ? (sorts.find((sort) => sort.value === value) || null) : null);
  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="relative" size="icon">
            {selectedSort ? (
              <>
                <selectedSort.icon className="h-6 w-6 shrink-0" />
                <ArrowUpCircle
                  className={`h-[14px] w-[14px] bottom-0.5 right-0.5 absolute ${
                    !ascending && "rotate-180"
                  } `}
                />
              </>
            ) : (
              <MdSort size={24} />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Sort by: " />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {sorts.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value || undefined}
                    onSelect={(value) => {
                      const found = sorts.find(
                        (priority: Sorts) => priority.value === value
                      );
                      setSelectedSort(found || null);
                      found && dispatch(setSortValue(found.value));
                      setOpen(false);
                    }}
                  >
                    <status.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        status.value === selectedSort?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
                <CommandItem
                  value="ascending"
                  onSelect={() => {
                    dispatch(changeAscending());
                    dispatch(setSortValue(selectedSort?.value || null));
                  }}
                >
                  <span className="text-center w-full cursor-pointer">
                    {ascending ? "Ascending" : "Descending"}
                  </span>
                  <ArrowUpCircle
                    className={cn(
                      "mr-2 h-4 w-4",
                      ascending ? "" : "rotate-180"
                    )}
                  />
                </CommandItem>
                {/* <CommandSeparator />
                <CommandItem
                  value="clear"
                  onSelect={() => {
                    setSelectedSort(null);
                    dispatch(setSortValue(null));
                    setOpen(false);
                  }}
                >
                  <span className="text-center w-full cursor-pointer">
                    Clear
                  </span>
                </CommandItem> */}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
