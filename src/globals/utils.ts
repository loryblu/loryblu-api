import { createHash } from 'node:crypto';
import type { HashDataAsyncProps, EncryptDataAsyncProps } from './types';
import bcrypt from 'bcrypt';

const algorithm = 'sha256';
const digest = 'hex';

export async function hashDataAsync(
  props: HashDataAsyncProps,
): Promise<string> {
  const { salt, unhashedData } = props;

  return new Promise((resolve, reject) => {
    try {
      const hashedData = createHash(algorithm)
        .update(unhashedData + salt)
        .digest(digest);

      resolve(hashedData);
    } catch (error) {
      reject();
    }
  });
}

export async function encryptDataAsync(
  props: EncryptDataAsyncProps,
): Promise<string> {
  const { salt, unencryptedPassword } = props;
  return await bcrypt.hash(unencryptedPassword, salt);
}
