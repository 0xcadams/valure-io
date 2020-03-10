import { HookContext } from '@feathersjs/feathers';
import { IUser } from '@valure/core';

import logger from '../../../../logger';
import { sendVerifyMail } from '../../../../mailer';

const sendEmailToUser = () => async (context: HookContext) => {
  const user: IUser = context.data;

  const origin =
    context.params.headers && context.params.headers.origin
      ? context.params.headers.origin
      : 'https://valure.io';

  const verifyPath = `/verify?key=${user.verifyKey}`;

  logger.info({ user, message: `Sending sign-up email to user` });

  await sendVerifyMail({
    verifyPath,
    origin,
    name: user.name || 'there',
    to: user.email
  });
};

export { sendEmailToUser };
