import {
  ChildrenProfile,
  ParentProfile,
  Task,
  TaskFrequency,
  TaskShift,
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
  categoryTitle?: string;
  category: {
    group: string;
    category: string;
  };
};

export type iTaskRepositoryUpadateInput = {
  id: number;
  categoryId?: string;
  shift?: TaskShift;
  frequency?: Array<TaskFrequency>;
  order?: number;
  childrenId: ChildrenProfile['id'];
  parentId: ParentProfile['id'];
};

export type iTaskRepositoryDeleteTaskInput = {
  taskId: number;
  parentId: string;
  childrenId: number;
};
