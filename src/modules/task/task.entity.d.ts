import { ChildrenProfile, ParentProfile, Task } from '@prisma/client';

export type iTaskRepositoryInput = Omit<
  Task,
  'id' | 'createdAt' | 'updatedAt'
> & {
  parentId: ParentProfile['id'];
};

export type iTaskRepositoryReadManyInput = {
  childrenId: ChildrenProfile['id'];
  parentId: ParentProfile['id'];
};

export type iTaskRepositoryReadManyOutput = Omit<
  Task,
  'childrenId' | 'createdAt'
> & {
  category: {
    group: string;
  };
};
