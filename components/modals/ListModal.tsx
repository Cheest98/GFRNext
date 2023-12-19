"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { updateList } from "@/lib/actions/list.actions";
import { Session } from "next-auth";
import { Button } from "../ui/button";

interface ListModalProps {
    session: Session | null;
    id: string;
    list: string;
    status: string;
    onClose: () => void;
    onStatusUpdate: () => void; 
  }

 function ListModal({ id, list, status,  session,onStatusUpdate ,  onClose }: ListModalProps) {

    const handleStatusUpdate = async () => {
        // Logic to update status
        try {
          await updateList({ data: { id, status: "Completed" }, session });
          onStatusUpdate(); // Call the callback after updating the status
        } catch (error) {
          console.error("Failed to update status:", error);
        }
      };

    return (
        <Dialog open={true} onOpenChange={onClose}>
          <DialogContent className="rounded-lg bg-dark-4" >
            <DialogHeader>
              <DialogTitle className="text-1.5rem font-semibold text-light-1">{list} </DialogTitle>
               
            </DialogHeader>
            <DialogDescription>
                <p className="text-light-1"> Task1</p>
                <p className="text-light-1"> Task2</p>
                <p className="text-light-1"> Task3</p>
                <p className="text-light-1"> Task4</p>
            </DialogDescription>
            <div className="grid gap-4 py-4">
                <div className="mt-auto flex items-center gap-3" />
            </div>
            <DialogFooter>
                {status !== "Completed" && (
                    <Button onClick={handleStatusUpdate}> Completed </Button>        
                 )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }

export default ListModal;
