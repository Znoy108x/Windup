"use client";
import { Task } from "@prisma/client";
import React, { useTransition } from "react";
import { Checkbox } from "../../../../shared/components/ui/checkbox";
import { format } from "date-fns";
import { cn } from "@/shared/lib/utils";
import { setTaskToDone } from "@/shared/actions/task";
import { useRouter } from "next/navigation";
import { useTaskContext } from "@/shared/context/TaskContext";
import { toast } from "@/shared/components/ui/use-toast";

function getExpirationColor(expiresAt: Date) {
  const days = Math.floor(expiresAt.getTime() - Date.now()) / 1000 / 60 / 60;

  if (days < 0) return "text-gray-300 dark:text-gray-400";

  if (days <= 3 * 24) return "text-red-500 dark:text-red-400";
  if (days <= 7 * 24) return "text-orange-500 dark:text-orange-400";
  return "text-gree-500 dark:text-green-400";
}

function TaskCard({ task, collectionId }: { task: Task, collectionId: string }) {

  const router = useRouter();
  const { updateTaskStatus, undoTaskStatus } = useTaskContext()

  const handleTaskCheck = async () => {
    try {
      updateTaskStatus(collectionId, task.id)
      await setTaskToDone(task.id);
      router.refresh()
    } catch (err) {
      console.log(err)
      undoTaskStatus(collectionId, task.id)
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex gap-2 items-start">
      <Checkbox
        id={task.id.toString()}
        className="w-5 h-5"
        checked={task.done}
        disabled={task.done}
        onCheckedChange={handleTaskCheck}
      />
      <label
        htmlFor={task.id.toString()}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white",
          task.done && "line-through"
        )}
      >
        {task.content}
        {task.expiresAt && (
          <p
            className={cn(
              "text-xs text-neutral-500 dark:text-neutral-400",
              getExpirationColor(task.expiresAt)
            )}
          >
            {format(task.expiresAt, "dd/MM/yyyy")}
          </p>
        )}
      </label>
    </div>
  );
}

export default TaskCard;
