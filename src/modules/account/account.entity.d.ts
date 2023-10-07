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

export type RecoveryControllerOutput = {
  recoverLink?: string;
  message: string;
};

export type GetCredentialIdByEmailOutput = {
  id: Credential['id'];
  fullname: ParentProfile['fullname'];
  password: string;
} | void;

export type getCredentialIdByRecoveryTokenInput = {
  hashedToken: string;
  now: Date;
};

export type getCredentialIdByRecoveryTokenOutout = {
  id: Credential['id'];
} | void;

export type SavePasswordInput = {
  credentialId: Credential['id'];
  encryptedPassword: Credential['password'];
};

export type PasswordResetInput = Omit<ResetPasswordInfo, 'id'>;

export type PasswordResetOutput = {
  url: string;
  fullname: ParentProfile['fullname'];
};

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
