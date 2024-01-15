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
import { createEvent } from "@/lib/actions/event.actions";
interface EventProps {
  id: string | null;
  title: string;
  description: string;
  date: string;
  allDay: boolean;
  label: string;
}

interface EventModalProps {
  session: Session | null;
  onClose: () => void;
  selectedDate: Date;
  eventData: EventProps;
}

function EventModal({ session, onClose, selectedDate }: EventModalProps) {
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
      title: "",
      description: "",
      date: selectedDate.toISOString().split("T")[0],
      time: selectedDate.toISOString().split("T")[1].slice(0, 5),
      allDay: false,
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
    // Update form 'allDay' value when isAllDay state changes
    form.setValue("allDay", isAllDay);
  }, [isAllDay, form]);

  useEffect(() => {
    console.log("Event Time Updated:", eventTime); // Log the updated time
    form.setValue("time", eventTime); // Update the form's time value
  }, [eventTime, form]);

  const handleCreateEvent = () => {
    const formData = form.getValues();

    // Checkpoint 2: Log formData to check if it has the updated values
    console.log("Form Data on Submission:", formData);

    // Combine date and time into a single DateTime string
    const combinedDateTime = `${formData.date}T${formData.time}:00.000Z`;

    console.log("Combined DateTime:", combinedDateTime); // Log the combined date and time

    // Prepare the data for your createEvent function
    const eventData = {
      ...formData,
      start: combinedDateTime,
      // Other necessary fields...
    };

    createEvent({ session, data: eventData });
  };

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
                data={form.getValues()}
                action={handleCreateEvent}
                label="Create Event"
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EventModal;
