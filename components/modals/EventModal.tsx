"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter
} from "@/components/ui/dialog";
import { createEvent } from "@/lib/actions/event.actions";
import { EventValidation } from "@/lib/validations/event";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import * as z from "zod";
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

interface EventModalProps {
  session: Session | null;
  onClose: () => void;
  selectedDate: Date | null;
}

function EventModal({ session, onClose, selectedDate }: EventModalProps) {

  const form = useForm({
    resolver: zodResolver(EventValidation),
    defaultValues: {
      title: '',
      description: '',
      startDate: selectedDate,
      endDate: selectedDate,
      startTime: '',
      endTime: '',
    },
  });

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
  name="startTime"
  render={({ field }) => (
    <FormItem className="flex w-full flex-col gap-3">
      <FormLabel className="text-base-semibold text-light-2">
        Start Time
      </FormLabel>
      <FormControl>
        <Input
          type="time"
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
  name="endTime"
  render={({ field }) => (
    <FormItem className="flex w-full flex-col gap-3">
      <FormLabel className="text-base-semibold text-light-2">
        End Time
      </FormLabel>
      <FormControl>
        <Input
          type="time"
          className="account-form_input no-focus"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
            <DialogFooter>
              <SharedButton
                session={session}
                data={data}
                action={createEvent}
                label="Add Event"
              />
              <p className="text-light-1"> Delete Event</p>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EventModal;
