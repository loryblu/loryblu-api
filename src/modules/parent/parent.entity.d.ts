import {
  Credential,
  ParentProfile,
  ChildrenProfile,
  ResetPasswordInfo,
} from '@prisma/client';

export type NewAccountRepositoryInput = {
  credential: Omit<Credential, 'id' | 'createdAt' | 'updatedAt'>;
  parentProfile: Pick<ParentProfile, 'fullname'>;
  childrenProfile: Pick<ChildrenProfile, 'fullname' | 'birthdate' | 'gender'>;
};

export type GetCredentialIdByEmailOutput = {
  id: Credential['id'];
  fullname: ParentProfile['fullname'];
} | void;

export type PasswordResetInput = Omit<ResetPasswordInfo, 'id'>;

export type PasswordResetOutput = {
  url: string;
  fullname: ParentProfile['fullname'];
} | void;

export type FormatLinkProps = {
  token: string;
  date: Date;
};

export type RandomTokenProps = {
  hashToken?: boolean;
  bytes?: number;
  encoding?: 'hex' | 'base64' | 'base64url';
};

export type RandomTokenOutput = { original: string; hashed: string };
