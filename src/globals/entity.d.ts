export type HashDataAsyncProps = {
  unhashedData: string;
  salt: string;
};

export type EncryptDataAsyncProps = {
  unencryptedPassword: string;
  salt: number;
};
