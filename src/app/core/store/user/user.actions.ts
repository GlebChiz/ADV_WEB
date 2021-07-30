import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/core/models/user.model';

export const AuthUserActions = {
	SetUser: createAction('[User] Set User', props<{ user: IUser | null }>()),
};

export const UserActions = {
	NewUserModel: createAction('[User] New User Model'),
	GetUserModel: createAction('[User] Get User Model', props<{ id: number | null }>()),
	GetUserModelSuccess: createAction('[User] Get User Model Success', props<{ user: IUser }>()),
	GetUserModelFail: createAction('[User] Get User Model Fail'),
	UpdateUser: createAction('[User] Update User', props<IUser>()),
	UpdateUserComplete: createAction('[User] Update User Compete'),
	UpdateUserFail: createAction('[User] Update User Fail', props<{ errors: any }>()),
	CreateUser: createAction('[User] Create User', props<{ user: IUser }>()),
	CreateUserComplete: createAction('[User] Create User Compete', props<{ id: number }>()),
};
