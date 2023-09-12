import type { PasswordResetProps } from './templates/emails/types';

export type SendLinkToResetPassword = Omit<PasswordResetProps, 'appName'> & {
  to: string;
};
