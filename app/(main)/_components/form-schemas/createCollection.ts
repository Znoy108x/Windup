import { CollectionColors, CollectionColorsKey } from "@/lib/constants";
import { z } from "zod";

export const createCollectionSchema = z.object({
  name: z.string().min(4, {
    message: "Collection name must be atleast 4 char long.",
  }),
  color: z
    .string()
    .refine((colorName) => CollectionColorsKey.includes(colorName)),
});

export type createCollectionSchemaType = z.infer<typeof createCollectionSchema>;
