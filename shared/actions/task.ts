"use server";

import { prisma } from "@/shared/lib/prisma";
import { createTaskSchemaType } from "@/shared/schema/createTask";
import { currentUser } from "@clerk/nextjs";

export async function createTask(
  data: createTaskSchemaType,
  newTaskId: string
) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  const { content, expiresAt, collectionId } = data;

  return await prisma.task.create({
    data: {
      id: newTaskId,
      userId: user.id,
      content,
      expiresAt,
      Collection: {
        connect: {
          id: String(collectionId),
        },
      },
    },
  });
}

export async function setTaskToDone(id: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  return await prisma.task.update({
    where: {
      id: id,
      userId: user.id,
    },
    data: {
      done: true,
    },
  });
}
