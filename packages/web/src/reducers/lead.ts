import { ActionType, getType } from 'typesafe-actions';

import * as actions from '@actions/LeadActions';
import { FeathersError } from '@feathersjs/errors';
import { ILead } from '@valure/core';

/**
 * INITIAL_STATE
 */
export interface ILeadState {
  readonly error?: FeathersError;
  readonly isFetching: boolean;

  readonly lead?: ILead;
}

export const initialLeadState: ILeadState = {
  error: undefined,
  isFetching: false,
  lead: undefined
};

/**
 * REDUCER
 */
export const LeadReducer = (
  state: ILeadState = initialLeadState,
  action: ActionType<typeof actions>
): ILeadState => {
  switch (action.type) {
    case getType(actions.createLead.request):
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    case getType(actions.createLead.success):
      return {
        ...state,
        error: undefined,
        isFetching: false,
        lead: action.payload
      };
    case getType(actions.createLead.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    default:
      return state;
  }
};
