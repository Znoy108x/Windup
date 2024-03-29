"use client";
import { Collection } from "@prisma/client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../../../../shared/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/shared/lib/utils";
import { CollectionColor, CollectionColors } from "@/shared/lib/constants";
import { useForm } from "react-hook-form";
import { createTaskSchema, createTaskSchemaType } from "@/shared/schema/createTask";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../shared/components/ui/form";
import { Textarea } from "../../../../shared/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../shared/components/ui/popover";
import { Calendar } from "../../../../shared/components/ui/calendar";
import { Button } from "../../../../shared/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { createTask } from "@/shared/actions/task";
import { toast } from "../../../../shared/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { useTaskContext } from "@/shared/context/TaskContext";
import { useAuth } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";

interface Props {
  open: boolean;
  collection: Collection;
  setOpen: (open: boolean) => void;
}

function CreateTaskDialog({ open, collection, setOpen }: Props) {

  const { userId } = useAuth()
  const form = useForm<createTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      collectionId: collection.id,
    },
  });

  const router = useRouter();

  const openChangeWrapper = (value: boolean) => {
    setOpen(value);
    form.reset();
  };

  const { addTaskToCollectionState, undoAddTaskToCollectionState } = useTaskContext()

  const onSubmit = async (data: createTaskSchemaType) => {
    const newTaskId = uuidv4()
    try {
      addTaskToCollectionState({ ...data, userId: userId as string, id: newTaskId })
      await createTask(data, newTaskId);
      toast({
        title: "Success",
        description: "Task created successfully!!",
      });
      openChangeWrapper(false);
      router.refresh();
    } catch (e) {
      undoAddTaskToCollectionState(data.collectionId, newTaskId)
      toast({
        title: "Error",
        description: "Cannot create task",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            Add task to collection:
            <span
              className={cn(
                "p-[1px] bg-clip-text text-transparent",
                CollectionColors[collection.color as CollectionColor]
              )}
            >
              {collection.name}
            </span>
          </DialogTitle>
          <DialogDescription>
            Add a task to your collection. You can add as many tasks as you want
            to a collection.
          </DialogDescription>
        </DialogHeader>
        <div className="gap-4 py-4">
          <Form {...form}>
            <form
              className="space-y-4 flex flex-col"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="Task content here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expires at</FormLabel>
                    <FormDescription>
                      When should this task expire?
                    </FormDescription>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value && format(field.value, "PPP")}
                            {!field.value && <span>No expiration</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            disabled={form.formState.isSubmitting}
            className={cn(
              "w-full dark:text-white text-white",
              CollectionColors[collection.color as CollectionColor]
            )}
            onClick={form.handleSubmit(onSubmit)}
          >
            Confirm
            {form.formState.isSubmitting && (
              <Loader className="animate-spin h-4 w-4 ml-2" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTaskDialog;
