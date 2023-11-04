import {
  ChildrenProfile,
  ParentProfile,
  Task,
  TaskFrequency,
} from '@prisma/client';

export type iTaskRepositoryInput = Omit<
  Task,
  'id' | 'createdAt' | 'updatedAt'
> & {
  parentId: ParentProfile['id'];
};

export type iTaskRepositoryReadManyInput = {
  childrenId: ChildrenProfile['id'];
  parentId: ParentProfile['id'];
  frequency?: Array<TaskFrequency>;
  page?: number;
  perPage?: number;
};

export type iTaskRepositoryReadManyOutput = Omit<
  Task,
  'childrenId' | 'createdAt'
> & {
  category: {
    group: string;
  };
};
