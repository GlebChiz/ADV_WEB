import { ActionReducerMap } from '@ngrx/store';
import { payerReducers } from './reducers/payer.reducers';
import { userReducers } from './reducers/user.reducers';

export const appReducers: ActionReducerMap<any, any> = {
	userState: userReducers,
	payerState: payerReducers,
};
