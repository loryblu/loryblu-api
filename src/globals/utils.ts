import { createHash } from 'node:crypto';
import type { HashDataAsyncProps, EncryptDataAsyncProps } from './entity';
import * as bcrypt from 'bcrypt';

const algorithm = 'sha256';
const digest = 'hex';

export function formatException(message: string, property?: string): object {
  return {
    details: [
      {
        property,
        message,
      },
    ],
  };
}

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
