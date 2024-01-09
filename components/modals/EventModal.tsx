"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Session } from "next-auth";

interface Event {
  session: Session | null;
  onClose: () => void;
}

function EventModal({ session, onClose }: Event) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="rounded-lg bg-dark-4">
        <DialogHeader>
          <DialogTitle className="text-1.5rem font-semibold text-light-1">
            Event
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p className="text-light-1"> Event</p>
        </DialogDescription>
        <div className="grid gap-4 py-4">
          <div className="mt-auto flex items-center gap-3" />
        </div>
        <DialogFooter>
          <p className="text-light-1"> Delete Event</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EventModal;
