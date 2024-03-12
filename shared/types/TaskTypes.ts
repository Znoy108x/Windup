export type CreateTaskType = {
  content: string;
  userId: string;
  expiresAt?: Date | undefined;
  id: string;
  collectionId: string;
};
