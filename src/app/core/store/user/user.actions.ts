import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';

export const AuthUserActions = {
	SetUser: createAction('[User] Set User', props<{ user: User }>()),
};

export const UserActions = {
	NewUserModel: createAction('[User] New User Model'),
	GetUserModel: createAction('[User] Get User Model', props<{ id: number | null }>()),
	GetUserModelSuccess: createAction('[User] Get User Model Success', props<{ user: User }>()),
	GetUserModelFail: createAction('[User] Get User Model Fail'),
	UpdateUser: createAction('[User] Update User', props<User>()),
	UpdateUserComplete: createAction('[User] Update User Compete'),
	UpdateUserFail: createAction('[User] Update User Fail', props<{ errors: any }>()),
	CreateUser: createAction('[User] Create User', props<{ user: User }>()),
	CreateUserComplete: createAction('[User] Create User Compete', props<{ id: number }>()),
};
