import { FeathersError } from '@feathersjs/errors';
import { createAsyncAction } from 'typesafe-actions';

import { ILead } from '@valure/core';

/*
 * CREATE LEAD
 */

export const createLead = createAsyncAction(
  'lead/CREATE_REQUEST',
  'lead/CREATE_SUCCESS',
  'lead/CREATE_FAILURE'
)<ILead, ILead, FeathersError>();
