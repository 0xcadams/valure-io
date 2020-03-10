import { Application } from '../declarations';

import { lead } from './v1/lead/lead.service';
import { log } from './v1/log/log.service';
import { supportRequest } from './v1/supportRequest/support-request.service';
import { user } from './v1/user/user.service';

export default (app: Application) => {
  app.configure(user);
  app.configure(log);
  app.configure(lead);
  app.configure(supportRequest);
};
