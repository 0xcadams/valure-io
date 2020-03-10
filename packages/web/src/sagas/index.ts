import { all, fork } from 'redux-saga/effects';

import lead from './lead';
import search from './search';
import supportRequest from './supportRequest';
import user from './user';

export function* rootSaga() {
  yield all([fork(user), fork(search), fork(lead), fork(supportRequest)]);
}
