"use client";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { joinGroup } from "@/lib/actions/group.actions";
import { JoinGroupValidation } from "@/lib/validations/group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import * as z from "zod";
import JoinButton from "../shared/JoinButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface GroupProps {
  joinGroupId: string;
  password: string;
  session: Session | null;
  onClose: () => void;
}

function GroupModal({ joinGroupId, session, password, onClose }: GroupProps) {
  const form = useForm<z.infer<typeof JoinGroupValidation>>({
    resolver: zodResolver(JoinGroupValidation),
    defaultValues: {
      password: "",
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
              name="password"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    Password
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
            <DialogFooter>
              <JoinButton
                session={session}
                joinGroupId={joinGroupId}
                password={data.password}
                action={joinGroup}
                label="Join"
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default GroupModal;
