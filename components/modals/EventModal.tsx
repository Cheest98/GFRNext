"use client";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { EventValidation } from "@/lib/validations/event";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SharedButton from "../shared/SharedButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { updateEvent } from "@/lib/actions/event.actions";
interface EventProps {
  id: string | null;
  title: string;
  description: string;
  date: string;
  allDay: boolean;
}

interface EventModalProps {
  session: Session | null;
  onClose: () => void;
  selectedDate: Date;
  eventData: EventProps;
  action: (props: any) => void;

}

function EventModal({ session, onClose, selectedDate, eventData, action}: EventModalProps) {
  const [isAllDay, setIsAllDay] = useState(false);

  const [eventDate, setEventDate] = useState(
    selectedDate.toISOString().split("T")[0]
  );
  const [eventTime, setEventTime] = useState(
    selectedDate.toISOString().split("T")[1].slice(0, 5)
  );

  const form = useForm({
    resolver: zodResolver(EventValidation),
    defaultValues: {
      title: eventData.title ,
      description: eventData.description,
      date: eventDate,
      time: eventTime,
      allDay: isAllDay,
    },
  });

  useEffect(() => {
    setEventDate(selectedDate.toISOString().split("T")[0]);
    setEventTime(selectedDate.toISOString().split("T")[1].slice(0, 5));
  }, [selectedDate]);

  useEffect(() => {
    form.setValue("allDay", isAllDay);
  }, [isAllDay, form]);

  const data = form.watch();
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="rounded-lg bg-dark-4">
        <Form {...form}>
          <form className="mt-10 flex flex-col justify-start gap-10 rounded-lg">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="account-form_input no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    Desc
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="account-form_input no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allDay"
              render={() => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel className="text-base-semibold text-light-2">
                    All day
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="checkbox"
                      checked={isAllDay}
                      onChange={(e) => setIsAllDay(e.target.checked)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isAllDay && (
              <>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col gap-3">
                      <FormLabel className="text-base-semibold text-light-2">
                        Start Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col gap-3">
                      <FormLabel className="text-base-semibold text-light-2">
                        Start Time
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          value={eventTime}
                          onChange={(e) => setEventTime(e.target.value)}
                          // ... other props ...
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <DialogFooter>
              <SharedButton
                session={session}
                data={data}
                action={updateEvent}
                label= "Update Event"
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EventModal;
