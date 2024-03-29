"use client";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { createEvent } from "@/lib/actions/event.actions";
import { EventValidation } from "@/lib/validations/event";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
interface EventProps {
  id: string | null;
  title: string;
  description: string;
  date: string;
  allDay: boolean;
  label: string;
  action: (data: any) => Promise<void>;
}

interface EventModalProps {
  session: Session | null;
  onClose: () => void;
  selectedDate: Date;
  eventInfo: EventProps;
  action: (data: any) => Promise<void>;
}

function EventModal({
  session,
  onClose,
  selectedDate,
  eventInfo,
  action,
}: EventModalProps) {
  const [isAllDay, setIsAllDay] = useState(eventInfo.allDay);

  const [eventDate, setEventDate] = useState(
    selectedDate.toISOString().split("T")[0]
  );
  const [eventTime, setEventTime] = useState(
    selectedDate.toISOString().split("T")[1].slice(0, 5)
  );

  const form = useForm({
    resolver: zodResolver(EventValidation),
    defaultValues: {
      id: eventInfo.id,
      title: eventInfo.title,
      description: eventInfo.description,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedDate.toISOString().split("T")[1].slice(0, 5),
      allDay: isAllDay,
    },
  });

  useEffect(() => {
    // Update form values when selectedDate changes
    const newDate = selectedDate.toISOString().split("T")[0];
    const newTime = selectedDate.toISOString().split("T")[1].slice(0, 5);
    form.setValue("date", newDate);
    form.setValue("time", newTime);
  }, [selectedDate, form]);

  useEffect(() => {
    form.setValue("allDay", isAllDay);
  }, [isAllDay, form]);

  useEffect(() => {
    form.setValue("time", eventTime);
  }, [eventTime, form]);

  async function onSubmit(values: z.infer<typeof EventValidation>) {
    console.log(values); // Debug log
    try {
      await eventInfo.action({
        data: {
          id: eventInfo.id,
          title: values.title,
          description: values.description,
          date: values.date,
          time: values.time,
          allDay: isAllDay,
        },
        session,
      });
      console.log("Event created successfully");
      onClose()
      form.reset();
    } catch (error: any) {
      console.error("Error creating event:", error.message);
      // Consider providing user feedback here
    }
  }

  const data = form.watch();
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="rounded-lg bg-dark-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-10 flex flex-col justify-start gap-10 rounded-lg"
          >
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
              <Button className="bg-primary-500" type="submit">
                {eventInfo.label}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EventModal;
