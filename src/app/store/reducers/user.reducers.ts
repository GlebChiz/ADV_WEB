import { Action, createReducer, on } from '@ngrx/store';
import { AuthUserActions, UserActions } from '../actions/user.actions';
import { initialUserState, IUserState } from '../states/user.state';

export function userReducers(userState: IUserState | undefined, action: Action): IUserState {
	return createReducer(
		initialUserState,
		on(AuthUserActions.SignInComplete, (state, payload) => ({ ...state, user: payload.user })),
		on(UserActions.NewUserModel, (state) => ({ ...state, editing: null })),
		on(UserActions.GetUserModel, (state) => ({ ...state, editing: null })),
		on(UserActions.GetUserModelSuccess, (state, payload) => ({ ...state, editing: payload.user })),
	)(userState, action);
}
