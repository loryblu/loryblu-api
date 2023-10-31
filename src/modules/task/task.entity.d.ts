import { ParentProfile, Task } from '@prisma/client';

export type iTaskRepositoryInput = Omit<
  Task,
  'id' | 'createdAt' | 'updatedAt'
> & {
  parentId: ParentProfile['id'];
};
