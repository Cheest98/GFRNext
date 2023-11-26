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

interface Task {
    id: string;
    task: string;
    description: string;
    status: string;
    createdAt: string;
    author: {
      name: string;
      image: string;
      id: string;
    };
    onClose: () => void;
  }

 function TaskModal({ id, task, author, status, description, createdAt, onClose }: Task) {

    return (
        <Dialog open={true} onOpenChange={onClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{task}</DialogTitle>
              {/* Other task details */}
            </DialogHeader>
            <DialogDescription>
           {description}
          </DialogDescription>
        <div className="grid gap-4 py-4">
          {/* Your existing profile fields */}
        </div>
            <DialogFooter>
              {/* Actions like delete, edit, etc. */}
              <Button onClick={onClose}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }

export default TaskModal;
