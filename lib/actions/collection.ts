"use server";
import { createCollectionSchemaType } from "@/app/(main)/_components/form-schemas/createCollection";
import { currentUser } from "@clerk/nextjs";
import prismadb from "../prisma";

export async function createCollection(formData: createCollectionSchemaType) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found!");
  }
  return await prismadb.collection.create({
    data: {
      userId: user.id,
      name: formData.name,
      color: formData.color,
    },
  });
}
