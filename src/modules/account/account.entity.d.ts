import {
  Credential,
  ParentProfile,
  ChildrenProfile,
  ResetPasswordInfo,
} from '@prisma/client';

export type iAuthTokenSubject = 'access' | 'refresh' | 'recovery';

export type iAuthTokenPayload = {
  cid: string;
  pid: string;
};

export type NewAccountRepositoryInput = {
  credential: Omit<Credential, 'id' | 'createdAt' | 'updatedAt'>;
  parentProfile: Pick<ParentProfile, 'fullname'>;
  childrenProfile: Pick<ChildrenProfile, 'fullname' | 'birthdate' | 'gender'>;
};

export type RecoveryControllerOutput = {
  recoverLink?: string;
  message: string;
};

export type GetCredentialIdByEmailOutput = Pick<
  Credential,
  'id' | 'password'
> & {
  parentProfile: Pick<ParentProfile, 'id' | 'fullname'> & {
    childrens: Array<
      Pick<ChildrenProfile, 'id' | 'fullname' | 'birthdate' | 'gender'>
    >;
  };
};
export type GetCredential = Pick<Credential, 'email'> & {
  parentProfile: Pick<ParentProfile, 'fullname'> & {
    childrens: Array<
      Pick<ChildrenProfile, 'fullname' | 'birthdate' | 'gender'>
    >;
  };
};

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
