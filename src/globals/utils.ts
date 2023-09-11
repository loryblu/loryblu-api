import { createHash } from 'node:crypto';
import { HashDataAsyncProps } from './types';

const algorithm = 'sha256';
const digest = 'hex';

export function hashDataAsync(props: HashDataAsyncProps): Promise<string> {
  const { unhashedData, salt } = props;

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
