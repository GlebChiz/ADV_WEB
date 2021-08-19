import { Action, createReducer, on } from '@ngrx/store';
import { AuthUserActions, UserActions } from '../actions/user.actions';
import { initialUserState, IUserState } from '../states/user.state';

export function userReducers(userState: IUserState | undefined, action: Action): IUserState {
	return createReducer(
		initialUserState,
		on(AuthUserActions.SignInComplete, (state, payload) => ({ ...state, user: payload.user })),
		on(AuthUserActions.LogOutComplete, (state) => ({ ...state, user: undefined })),
		on(UserActions.NewUserModel, (state) => ({ ...state, editing: undefined })),
		on(UserActions.GetUserModel, (state) => ({ ...state, editing: undefined })),
		on(UserActions.GetUserModelSuccess, (state, payload) => ({ ...state, editing: payload.user })),
		on(UserActions.GetUserAvatarSuccess, (state, payload) => {
			return {
				...state,
				urlAvatar: payload.url,
			};
		}),
	)(userState, action);
}
