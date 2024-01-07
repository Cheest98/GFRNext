"use client";
import { listsTabs } from "@/app/constants";
import ListCard from "@/components/cards/ListCard";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List } from "@prisma/client";
import { endOfYear, format, startOfYear } from "date-fns";
import { Session } from "next-auth";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface ListProps {
  session: Session | null;
  lists: List[];
}

const initialDateRange: DateRange = {
  from: startOfYear(new Date()),
  to: endOfYear(new Date()),
};

const ListTab = ({ session, lists }: ListProps) => {
  const [date, setDate] = useState<DateRange>(initialDateRange);

  const todoLists = lists.filter((lists) => lists.status === "Not Completed");
  const completedLists = lists.filter((lists) => lists.status === "Completed");

  const filteredCompletedLists = completedLists.filter((list) => {
    const listDate = new Date(list.updatedAt);
    return (
      (!date?.from || listDate >= date.from) &&
      (!date?.to || listDate <= date.to)
    );
  });

  const totalPrice = filteredCompletedLists.reduce(
    (acc, list) => acc + (list.price || 0),
    0
  );

  return (
    <main>
      <div className="mt-5">
        <Tabs defaultValue={listsTabs[0].value} className="w-full">
          <TabsList className="tab">
            {listsTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                {/* Assuming you have an image at tab.icon path */}
                <img src={tab.icon} alt={tab.label} width={24} height={24} />
                <p>{tab.label}</p>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            value="Not Completed"
            className=" mt-3 flex flex-col gap-5  w-full text-light-1"
          >
            {todoLists.map((list) => (
              <ListCard
                key={list.id}
                id={list.id}
                list={list.list}
                status={list.status}
                price={list.price}
                session={session}
              />
            ))}
          </TabsContent>

          <TabsContent
            value="Completed"
            className="mt-3 flex flex-col gap-5  w-full text-light-1"
          >
            <div className="mt-1 flex justify-between items-center rounded-lg bg-dark-3">
              <div className="text-subtle-medium text-gray-1 bg-dark-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button id="date-range-picker">
                      {date?.from && date?.to
                        ? `${format(date.from, "MMM dd, yyyy")} - ${format(
                            date.to,
                            "MMM dd, yyyy"
                          )}`
                        : "Select Date Range"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="bottom">
                    <Calendar
                      mode="range"
                      selected={date}
                      onSelect={(range) => setDate(range)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="px-4">
                <p className="text-subtle-medium text-gray-1">
                  {" "}
                  Total price: {totalPrice}
                </p>
              </div>
            </div>

            {filteredCompletedLists.map((list) => (
              <ListCard
                key={list.id}
                id={list.id}
                list={list.list}
                status={list.status}
                price={list.price}
                session={session}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};
export default ListTab;
