import { ActionReducerMap } from '@ngrx/store';
import { userReducers } from './reducers/user.reducers';

export const appReducers: ActionReducerMap<any, any> = {
	userState: userReducers,
};
