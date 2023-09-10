import type { PasswordResetProps } from './templates/assets/types';

export type SendLinkToResetPassword = Omit<PasswordResetProps, 'appName'> & {
  to: string;
};
