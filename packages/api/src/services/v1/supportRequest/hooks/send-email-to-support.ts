import { HookContext } from '@feathersjs/feathers';
import { ISupportRequest, IUser } from '@valure/core';

import { sendSupportMail } from '../../../../mailer';

const sendEmailToSupport = () => async (context: HookContext) => {
  const { params } = context;
  const supportRequest: ISupportRequest = context.data;

  const user: IUser = context.data.user;

  const origin =
    context.params.headers && context.params.headers.origin
      ? context.params.headers.origin
      : 'https://valure.io';

  await sendSupportMail({
    origin,
    type: supportRequest.type,
    issue: supportRequest.issue,
    email:
      (user && user.email) ||
      (params && params.clientIp && String(params.clientIp)) ||
      'Anonymous'
  });

  return context;
};

export { sendEmailToSupport };
