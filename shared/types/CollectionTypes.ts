import { Collection, Task } from "@prisma/client";

export type CreateCollectionTypes = {
  name: string;
  color: string;
};

export type CollectionAndTasksType = Collection & {
  tasks: Task[];
};
