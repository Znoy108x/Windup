import { Collection } from "@prisma/client";
import prismadb from "../prisma";

export async function getCollections(
  userId: string | undefined
): Promise<Collection[]> {
  return await prismadb.collection.findMany({
    where: {
      userId,
    },
  });
}
