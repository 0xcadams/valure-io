import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import { LeadReducer } from './lead';
import { SearchReducer } from './search';
import { SnackbarReducer } from './snackbar';
import { SupportRequestReducer } from './supportRequest';
import { UserReducer } from './user';

// Configure Redux store & reducers
export const rootReducer = combineReducers({
  user: UserReducer,
  lead: LeadReducer,
  search: SearchReducer,
  snackbar: SnackbarReducer,
  supportRequest: SupportRequestReducer
});

export * from './search';
export * from './user';
export * from './lead';
export * from './snackbar';
export * from './supportRequest';

export type IStore = StateType<typeof rootReducer>;
