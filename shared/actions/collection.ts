"use server";
import { prisma } from "@/shared/lib/prisma";
import { createCollectionSchemaType } from "@/shared/schema/createCollection";
import { currentUser } from "@clerk/nextjs";

export async function createCollection(
  form: createCollectionSchemaType,
  newCollectionId: string
) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  return await prisma.collection.create({
    data: {
      id: newCollectionId,
      userId: user.id,
      color: form.color,
      name: form.name,
    },
  });
}

export async function deleteCollection(id: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error("user not found");
  }
  return await prisma.collection.delete({
    where: {
      id: id,
      userId: user.id,
    },
  });
}
