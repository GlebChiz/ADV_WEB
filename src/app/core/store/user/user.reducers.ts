import { Action, createReducer, on } from '@ngrx/store';
import { AuthUserActions, UserActions } from './user.actions';
import { IUserState, initialUserState } from './user.state';

export function userReducers(userState: IUserState | undefined, action: Action): IUserState {
	return createReducer(
		initialUserState,
		on(AuthUserActions.SetUser, (state, payload) => ({ ...state, user: payload.user })),
		on(UserActions.NewUserModel, (state) => ({ ...state, editing: null })),
		on(UserActions.GetUserModel, (state) => ({ ...state, editing: null })),
		on(UserActions.GetUserModelSuccess, (state, payload) => ({ ...state, editing: payload.user })),
	)(userState, action);
}
