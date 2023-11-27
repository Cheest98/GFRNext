"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { UserValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import * as z from "zod";
import { GroupValidation, JoinGroupValidation } from "@/lib/validations/group";
import JoinButton from "../shared/JoinButton";
import { joinGroup } from "@/lib/actions/group.actions";

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
      password: "Password"
    },
  });

  
    const data = form.watch()
    return (
        <Dialog open={true} onOpenChange={onClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{joinGroupId}</DialogTitle>
              {/* Other task details */}
            </DialogHeader>
            <DialogDescription>
           {password}
          </DialogDescription>
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
                
              <Button onClick={onClose}>Close</Button>
            </DialogFooter>
            </form>
      </Form>
          </DialogContent>
        </Dialog>
      );
    }

export default GroupModal;
