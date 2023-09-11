import { createHash } from 'node:crypto';
import bcrypt from 'bcrypt';
import type { HashDataAsyncProps, EncryptDataAsyncProps } from './types';

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

export function encryptDataAsync(
  props: EncryptDataAsyncProps,
): Promise<string> {
  const { salt, unencryptedPassword } = props;

  return new Promise((resolve, reject) => {
    bcrypt.hash(unencryptedPassword, salt, function (error, encrypted) {
      if (error) {
        return reject(false);
      }

      return resolve(encrypted);
    });
  });
}
