export type CreateTaskType = {
  content: string;
  userId: string;
  done: boolean;
  expiresAt?: Date;
};
