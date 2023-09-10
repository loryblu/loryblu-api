import { Credential, ParentProfile, ChildrenProfile } from '@prisma/client';

export interface NewAccountRepositoryInput {
  credential: Omit<Credential, 'id' | 'createdAt' | 'updatedAt'>;
  parentProfile: Pick<ParentProfile, 'fullname'>;
  childrenProfile: Pick<ChildrenProfile, 'fullname' | 'birthdate' | 'gender'>;
}
