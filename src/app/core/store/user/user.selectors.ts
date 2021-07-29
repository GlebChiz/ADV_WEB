import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IUserState } from './user.state';

const userState = (state: IAppState) => state.userState;

export const selectUser = createSelector(userState, (state: IUserState) => state?.user);

export const selectPermissions = createSelector(userState, (state) => state.permissions);
