import { ServiceAddons } from '@feathersjs/feathers';
import { v1LeadModel } from '@valure/core';
import { Lead } from './lead.class';
import { hooks } from './lead.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    lead: Lead & ServiceAddons<any>; // tslint:disable-line
  }
}

const lead = (app) => {
  const paginate = app.get('paginate');

  const options = {
    paginate,
    Model: v1LeadModel
  };

  // Initialize our service with any options it requires
  app.use('/v1/lead', new Lead(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/lead');

  service.hooks(hooks);
};

export { lead };
